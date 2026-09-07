"""DOM/control-flow smoke test, NOT a real inference or network test.
Uses in-memory source injection because URL navigation is blocked in the build
sandbox. Model/CacheStorage fixtures are explicit mocks. Previews use Quick mode.
Requires Python playwright and Chromium; not part of npm test.
"""
from pathlib import Path
import re,json,argparse
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--out',default=str(root/'reports/browser-previews'));args=parser.parse_args();out=Path(args.out);out.mkdir(parents=True,exist_ok=True)
base=root.joinpath('index.html').read_text()
base=re.sub(r'<link[^>]*>', '', base)
base=base.replace('</head>','<style>'+root.joinpath('styles.css').read_text()+'</style></head>')
base=re.sub(r'<script src="\./([^?]+)\?[^\"]+"></script>',lambda m:'<script>'+root.joinpath(m[1]).read_text().replace('</script','<\\/script')+'</script>',base)
marker='<script>'+root.joinpath('app.js').read_text().replace('</script','<\\/script')+'</script>'
assert marker in base
fixture='''<script>
window.__aiCommands=[]; window.__workers=0;
const store=new Map();window.__store=store;
Object.defineProperty(window,'localStorage',{value:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)}});
const state=ImpromptEngine.createState(IMPROMPT_CARDS,'ABCDEFGH');
state.stanceQueue=['S67',...state.stanceQueue.filter(x=>x!=='S67')];
state.driveQueue=['D101',...state.driveQueue.filter(x=>x!=='D101')];
ImpromptEngine.startSession(state,IMPROMPT_CARDS,{name:'Open Play',mode:'open',source:'open',hintPolicy:POLICY});
ImpromptEngine.startScene(state,IMPROMPT_CARDS);store.set('imprompt:deck-state:v1',JSON.stringify(state));
MOCK
</script>'''
mock='''
Object.defineProperty(document,'baseURI',{value:'https://test.invalid/improv-card-game/'});
store.set('imprompt:local-ai:v1',JSON.stringify({enabled:true}));
Object.defineProperty(window,'Worker',{value:class{
 constructor(){window.__workers++;this.dead=false;}
 postMessage(m){window.__aiCommands.push(m);setTimeout(()=>{if(!this.dead)this.onmessage({data:{id:m.id,type:'result',...(m.command==='generate'?{text:'Ask who authorized the difficult announcement, then offer to pass its opening sentence up the hierarchy.',source:'local-ai'}:{ready:true})}});},m.command==='generate'?250:10);}
 terminate(){this.dead=true;}
}});
'''
report=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 def new(width,height,policy='full',ai=False):
  page=browser.new_page(viewport={'width':width,'height':height},has_touch=width<600,is_mobile=width<600)
  page.set_default_timeout(5000)
  print("START",width,policy,ai,flush=True)
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  html=base.replace(marker,fixture.replace('POLICY',json.dumps(policy)).replace('MOCK',mock if ai else '')+marker)
  page.set_content(html,wait_until='domcontentloaded')
  page.locator('#enterButton').click();page.locator('#startSessionButton').click()
  page.locator('#stanceCard').click();page.locator('#driveCard').click();page.wait_for_timeout(350)
  return page,errors
 for width,height in [(320,760),(412,915),(1280,900)]:
  page,errors=new(width,height)
  assert page.locator('#stanceTitle').inner_text()=='Chain of Command'
  assert page.locator('#driveTitle').inner_text()=='Start the Hard Part'
  assert not page.locator('#stanceAction').is_visible()
  assert not page.locator('#driveAction').is_visible()
  for typ in ['stance','drive']:
   card=page.locator('#'+typ+'Card').bounding_box()
   veto=page.locator('#'+typ+'VetoButton').bounding_box();nudge=page.locator('#'+typ+'NudgeButton').bounding_box()
   assert veto['x']<nudge['x']
   for box in (veto,nudge):
    assert box['height']>=44-0.5
    assert box['x']>=card['x']-1 and box['x']+box['width']<=card['x']+card['width']+1
    assert box['y']>=card['y']-1 and box['y']+box['height']<=card['y']+card['height']+1
  assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth+1')
  page.screenshot(path=str(out/f'{width}-cards.png'),full_page=True)
  page.locator('#stanceNudgeButton').click()
  t=page.locator('#hintDialogBody').inner_text();assert len(t.split())<=40
  assert page.locator('#hintSource').inner_text()=='Quick example'
  page.screenshot(path=str(out/f'{width}-single-quick-example.png'),full_page=True)
  page.locator('#anotherHintAngleButton').click();assert page.locator('#hintDialogBody').inner_text()!=t
  page.locator('#doneHintButton').click();page.locator('#combinationHintButton').click()
  t=page.locator('#hintDialogBody').inner_text();assert re.search('rank|authoriz|approv',t)
  page.screenshot(path=str(out/f'{width}-pair-quick-example.png'),full_page=True)
  page.locator('#anotherHintAngleButton').click();assert page.locator('#hintDialogBody').inner_text()!=t
  page.locator('#doneHintButton').click()
  drive=page.locator('#driveTitle').inner_text();page.locator('#stanceVetoButton').click()
  assert page.locator('#driveTitle').inner_text()==drive
  assert not page.locator('#stanceNudgeButton').is_visible()
  page.locator('#stanceCard').click();page.locator('#completeButton').click()
  saved=page.evaluate("JSON.parse(localStorage.getItem('imprompt:deck-state:v1'))")
  assert len(saved['history'])==1
  assert not errors,errors
  report.append({'case':f'UI {width}px','result':'PASS','screenshots':'Quick examples, not AI outputs'})
  page.close()
 for policy in ['off','after-attempt','nudges']:
  page,errors=new(412,915,policy)
  if policy in ['off','after-attempt']:
   assert not page.locator('#stanceNudgeButton').is_visible()
   assert not page.locator('#combinationHintButton').is_visible()
  if policy=='after-attempt':
   page.locator('#unlockHintsButton').click();assert page.locator('#stanceNudgeButton').is_visible()
  if policy=='nudges':assert page.locator('#stanceNudgeButton').is_visible()
  assert not errors,errors;report.append({'case':f'Policy {policy}','result':'PASS'});page.close()
 print('MOCK AI UI',flush=True)
 page,errors=new(412,915,ai=True)
 assert page.evaluate('__workers')==0
 print('OPEN MOCK HINT',flush=True);page.locator('#stanceNudgeButton').click();page.wait_for_function("document.getElementById('hintSource').textContent === 'Local AI · experimental' && document.getElementById('hintDialogBody').getAttribute('aria-busy')==='false'")
 commands=page.evaluate('__aiCommands');payload=next(x['payload'] for x in commands if x['command']=='generate')
 assert len(payload['cards'])==1 and payload['cards'][0]['id']=='S67'
 page.locator('#anotherHintAngleButton').click();page.locator('#doneHintButton').click();page.wait_for_timeout(350)
 assert not page.locator('#hintDialog').is_visible()
 page.locator('#combinationHintButton').click();page.locator('#quickHintNowButton').click();page.wait_for_timeout(350)
 assert page.locator('#hintSource').inner_text()=='Quick example'
 commands=page.evaluate('__aiCommands');assert all(len(x['payload']['cards'])==1 for x in commands if x['command']=='generate' and x['payload']['kind']=='single')
 assert not errors,errors;report.append({'case':'Mocked worker UI: no eager model, single-card privacy, cancel/late result, quick fallback','result':'PASS','actualInference':False});page.close()
 browser.close()
(out/'dom-results.json').write_text(json.dumps({'scope':'In-memory Chromium DOM tests; mocked worker for asynchronous UI only. No actual downloads, service worker, or ONNX inference.', 'results':report},indent=2))
print(json.dumps(report,indent=2))
