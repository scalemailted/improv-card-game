#!/usr/bin/env python3
"""DOM/touch tests with actual packaged records and a clearly marked worker transport
fixture. Restricted CI browsers can run this without navigating an HTTP origin.
Real production worker gzip/hash/cache logic is tested separately in Node. This is
not a deployed GitHub Pages or physical-phone offline-install test.
"""
from pathlib import Path
import json,re,os,base64
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parents[1]
OUT=Path(os.environ.get('PREVIEW_DIR',str(ROOT/'reports/browser-previews')));OUT.mkdir(parents=True,exist_ok=True)
HTML=(ROOT/'index.html').read_text()
SCRIPTS=re.findall(r'<script src="\./([^"?]+)[^"]*"></script>',HTML)
HTML=re.sub(r'<script src="[^"]*"></script>','',HTML)
HTML=re.sub(r'<link\b[^>]*>','',HTML)
HTML=HTML.replace('</head>','<style>'+(ROOT/'styles.css').read_text()+'</style></head>')
M=json.loads((ROOT/'examples/manifest.json').read_text())
DATA={k:json.loads((ROOT/f['plainUrl']).read_text()) for k,f in M['files'].items() if k in ['singles','S67','S124','S22','S01']}
def fixture(b,w=412,policy='full',stance='S67',drive='D101'):
 ctx=b.new_context(viewport={'width':w,'height':915 if w>360 else 760},has_touch=w<700,is_mobile=w<700)
 page=ctx.new_page();page.set_default_timeout(6000);errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content(HTML)
 page.evaluate('''data=>{
  const store=new Map(); Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)}});
  window.fixtureStore=store; window.fixtureData=data; window.fixtureMode='normal'; window.fixtureRequests=[];
  window.fixtureWorker=()=>({terminate(){},postMessage(m){const self=this;fixtureRequests.push(m);
   if(m.command==='cancel')return;
   setTimeout(()=>{let result;
    if(m.command==='get'){
     if(fixtureMode==='failed'){self.onmessage({data:{id:m.id,type:'error',error:'This example is not saved yet. Connect once.'}});return;}
     const cs=m.payload.cards,key=m.payload.kind==='single'?'singles':cs[0].id,id=m.payload.kind==='single'?cs[0].id:cs[1].id;
     result={records:fixtureData[key].records[id],key:cs.map(c=>c.id).join('+'),datasetId:IMPROMPT_EXAMPLE_MANIFEST.datasetId};
    }else {if(m.command==='install')window.fixtureInstalled=true;result={complete:!!window.fixtureInstalled,savedFiles:window.fixtureInstalled?241:2,totalFiles:241,compression:true,storageAvailable:true};}
    self.onmessage({data:{id:m.id,type:'result',result}});
   },fixtureMode==='slow'?700:15);
  }});
 }''',DATA)
 bundle=[]
 for file in SCRIPTS:
  text=(ROOT/file).read_text()
  if file=='app.js':
   settings=json.dumps({'s':stance,'d':drive,'p':policy})
   bundle.append("((x)=>{const s=ImpromptEngine.createState(IMPROMPT_CARDS);s.stanceQueue=[x.s,...s.stanceQueue.filter(id=>id!==x.s)];s.driveQueue=[x.d,...s.driveQueue.filter(id=>id!==x.d)];ImpromptEngine.startSession(s,IMPROMPT_CARDS,{name:'Open Play',mode:'open',source:'open',hintPolicy:x.p});localStorage.setItem('imprompt:deck-state:v1',JSON.stringify(s));})("+settings+");")
   text=text.replace("workerFactory: () => new Worker(new URL('./examples/library-worker.js?v=0.25.0', document.baseURI))","workerFactory: () => window.fixtureWorker()")
   text=text.replace('  registerServiceWorker();','  /* Transport fixture: deployment tested separately. */')
  bundle.append(text)
 page.add_script_tag(content=';\n'.join(bundle))
 page.click('#enterButton');page.click('#startSessionButton');page.click('#stanceCard');page.click('#driveCard')
 return ctx,page,errors

def check_width(page):
 assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'), 'Horizontal overflow'
 for w in ['stance','drive']:
  cr=page.locator('#'+w+'Card').bounding_box()
  for a in ['VetoButton','NudgeButton']:
   el=page.locator('#'+w+a)
   if el.is_visible():
    br=el.bounding_box();assert br['x']>=cr['x'] and br['x']+br['width']<=cr['x']+cr['width']+1
    assert br['y']+br['height']<=cr['y']+cr['height']+1

with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium'),headless=True,args=['--no-sandbox'])
 results=[]
 for width in [320,412,1280]:
  print("Viewport",width,flush=True)
  ctx,page,errors=fixture(browser,width)
  check_width(page);page.screenshot(path=str(OUT/f'{width}-cards.png'),full_page=True)
  page.click('#combinationHintButton');expect(page.locator('.scene-line').first).to_be_visible();expect(page.locator('.scene-line')).to_have_count(5);assert page.locator('.scene-action').count()==0
  before=page.locator('.scene-line').first.inner_text();assert any(t in page.locator('#hintDialogBody').inner_text().lower() for t in ['chair','eldest','cancelled'])
  box=page.locator('#hintDialogPanel').bounding_box(); assert box['y'] >= -1 and box['y']+box['height'] <= page.evaluate('innerHeight')+1, box
  page.screenshot(path=str(OUT/f'{width}-pair.png'),full_page=False)
  page.click('#anotherHintAngleButton');expect(page.locator('.scene-line').first).not_to_have_text(before)
  page.click('#flagExampleButton');assert 'S67+D101' in page.evaluate('localStorage.getItem("imprompt:example-feedback:v1")')
  page.click('#doneHintButton');d=page.locator('#driveTitle').inner_text();page.click('#stanceVetoButton');assert page.locator('#driveTitle').inner_text()==d
  assert page.locator('#stanceNudgeButton').is_hidden()
  assert not errors,errors;results.append({'viewport':width,'flow':'pair, another, flag, close, single veto','pass':True});ctx.close()
 print('Single and history',flush=True)
 print('Create single fixture',flush=True);ctx,page,errors=fixture(browser,412,stance='S124');print('Single fixture ready',flush=True);page.click('#stanceNudgeButton');expect(page.locator('.scene-line').first).to_be_visible();expect(page.locator('.scene-line')).to_have_count(5);assert page.locator('.scene-action').count()==0;assert any(x in page.locator('.scene-line').first.inner_text().lower() for x in ['unredacted','visitor','public','briefing'])
 print('Single hint loaded',flush=True);page.screenshot(path=str(OUT/'412-single-cleared-to-know.png'),full_page=False);print('Single screenshot ready',flush=True)
 before=page.locator('.scene-line').first.inner_text();page.click('#anotherHintAngleButton');expect(page.locator('.scene-line').first).not_to_have_text(before)
 print('Single alternative ready',flush=True);page.click('#doneHintButton');page.click('#completeButton');page.click('#historyButton');print('History ready',flush=True);assert 'Cleared to Know' in page.locator('#historyList').inner_text()
 page.click('#historyBackButton');page.click('#exampleSettingsButton');print('Storage ready',flush=True);expect(page.locator('#exampleStorageStatus')).to_contain_text('2 of 241')
 page.screenshot(path=str(OUT/'412-storage.png'),full_page=False)
 page.click('#downloadExamplesButton');expect(page.locator('#exampleStorageStatus')).to_contain_text('All 241')
 assert not errors,errors;ctx.close();results.append({'flow':'single exact ID, alternate, completion snapshot, storage UI (fixture)','pass':True})
 for policy in ['off','after-attempt','nudges']:
  print('Policy',policy,flush=True)
  ctx,page,errors=fixture(browser,320,policy=policy)
  if policy=='off':assert page.locator('#stanceNudgeButton').is_hidden() and page.locator('#combinationHintButton').is_hidden();assert not page.evaluate('fixtureRequests')
  elif policy=='after-attempt':assert page.locator('#combinationHintButton').is_hidden();page.click('#unlockHintsButton');page.click('#combinationHintButton');expect(page.locator('.scene-line').first).to_be_visible();expect(page.locator('.scene-line')).to_have_count(5);assert page.locator('.scene-action').count()==0
  else:page.click('#stanceNudgeButton');expect(page.locator('.scene-line').first).to_be_visible();expect(page.locator('.scene-line')).to_have_count(5);assert page.locator('.scene-action').count()==0
  assert not errors,errors;ctx.close();results.append({'policy':policy,'pass':True})
 ctx,page,errors=fixture(browser);page.evaluate("fixtureMode='failed'");page.click('#combinationHintButton');expect(page.locator('#hintFeedback')).to_contain_text('not saved');assert page.locator('.scene-line').first.count()==0
 page.evaluate("fixtureMode='normal'");page.click('#anotherHintAngleButton');expect(page.locator('.scene-line').first).to_be_visible();expect(page.locator('.scene-line')).to_have_count(5);assert page.locator('.scene-action').count()==0;page.click('#doneHintButton')
 page.evaluate("fixtureMode='slow'");page.click('#combinationHintButton');page.click('#doneHintButton');page.wait_for_timeout(800);assert not page.locator('#hintDialog').is_visible();assert not errors
 # Native Chromium gzip decoding of the shipped compressed file, independent of DOM fixture records.
 compressed=base64.b64encode((ROOT/M['files']['singles']['url']).read_bytes()).decode()
 decoded=page.evaluate('''async b64=>{const bytes=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));const raw=await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text();return Object.keys(JSON.parse(raw).records).length;}''',compressed)
 assert decoded==480;ctx.close();results.append({'flow':'missing-data error, retry, stale-dialog result, native browser gzip decode','pass':True})
 browser.close();(OUT/'browser-results.json').write_text(json.dumps({'scope':'Actual DOM and native gzip; worker transport and browser storage use explicit fixtures. HTTP navigation is blocked by this environment.','checks':results},indent=2));print(json.dumps(results,indent=2))
