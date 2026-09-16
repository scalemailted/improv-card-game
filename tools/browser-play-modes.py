import json, os, subprocess, socket, time, urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright, expect
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'reports/basic-advanced-play';OUT.mkdir(exist_ok=True)
with socket.socket() as sock:
 sock.bind(('127.0.0.1',0));port=sock.getsockname()[1]
server=subprocess.Popen(['node','tools/serve-local.cjs'],cwd=ROOT,env={**os.environ,'PORT':str(port)},stdout=subprocess.DEVNULL,stderr=subprocess.PIPE,creationflags=subprocess.CREATE_NO_WINDOW)
url=f'http://127.0.0.1:{port}/';results=[]
def state(page):return page.evaluate("JSON.parse(localStorage.getItem('imprompt:deck-state:v1'))")
def openmenu(page):page.goto(url);page.click('#enterButton')
try:
 for i in range(100):
  try:urllib.request.urlopen(url,timeout=1).close();break
  except OSError:time.sleep(.1)
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True)
  for width in [320,412,1280]:
   for mode in ['stance','drive','advanced']:
    ctx=browser.new_context(viewport={'width':width,'height':900},has_touch=width<700,is_mobile=width<700)
    page=ctx.new_page();errors=[];requests=[];page.on('pageerror',lambda e:errors.append(str(e)));page.on('request',lambda r:requests.append(r.url))
    openmenu(page);initial=state(page)
    if mode=='advanced':page.click('#advancedPlayButton');types=['stance','drive']
    else:
     page.click('#basicPlayButton');assert state(page)==initial
     page.locator('#basic'+mode.title()+'Button').focus();page.keyboard.press('Enter');types=[mode]
    for t in types:page.click('#'+t+'Card')
    for t in ['stance','drive']:
     if t in types:expect(page.locator('#'+t+'CardWrap')).to_be_visible()
     else:expect(page.locator('#'+t+'CardWrap')).to_be_hidden();assert state(page)[t+'Queue']==initial[t+'Queue']
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    for t in types:
     box=page.locator('#'+t+'Card').bounding_box();v=page.locator('#'+t+'VetoButton').bounding_box();n=page.locator('#'+t+'NudgeButton').bounding_box()
     assert v['x']<n['x'] and v['y']>=box['y'] and n['y']+n['height']<=box['y']+box['height']+1
    page.screenshot(path=str(OUT/f'{mode}-{width}.png'),full_page=True)
    page.click('#'+types[0]+'NudgeButton');expect(page.locator('.scene-line')).to_have_count(5);page.click('#doneHintButton')
    if mode!='advanced':assert not any('/pairs-' in u or '/pairs.' in u for u in requests)
    if mode=='advanced':
     page.click('#combinationHintButton');expect(page.locator('.scene-line')).to_have_count(5);page.click('#doneHintButton')
    saved=state(page);page.reload();page.click('#enterButton');page.click('#startSessionButton');assert state(page)['current']==saved['current']
    # Set next setup without replacing current, then resume it.
    page.click('#playMenuButton');page.click('#basicPlayButton');page.click('#basicDriveButton');assert state(page)['current']==saved['current'];page.click('#startSessionButton');page.click('#completeButton');assert len(state(page)['history'])==1
    entry=state(page)['history'][0]
    if mode!='advanced':assert entry['basicDeck']==mode and ('driveSnapshot' if mode=='stance' else 'stanceSnapshot') not in entry
    page.click('#historyButton');expect(page.locator('.history-prompt')).to_have_count(len(types));page.click('#historyBackButton')
    page.click('#startSessionButton');assert state(page)['current']['basicDeck']=='drive';assert state(page)['current']['playMode']=='basic'
    # Native service worker + cached singles offline.
    page.evaluate('navigator.serviceWorker.ready');page.reload();ctx.set_offline(True);page.reload();page.click('#enterButton');page.click('#startSessionButton');page.click('#driveCard');page.click('#driveNudgeButton');expect(page.locator('.scene-line')).to_have_count(5)
    assert not errors,errors;results.append({'mode':mode,'width':width,'nativeChromium':True,'offline':True,'pass':True});ctx.close()
  # Two independent devices may both choose Stance.
  contexts=[browser.new_context() for _ in range(2)];pages=[c.new_page() for c in contexts]
  for page in pages:openmenu(page);page.click('#basicPlayButton');page.click('#basicStanceButton')
  before=state(pages[1]);pages[0].click('#stanceCard');pages[0].click('#stanceVetoButton');assert state(pages[1])==before
  assert state(pages[0])['instanceId']!=before['instanceId'];results.append({'independentSameDeckContexts':True,'pass':True})
  for c in contexts:c.close()
  # Every stored hint policy, single-card first-attempt gate.
  for policy in ['full','nudges','after-attempt','off']:
   ctx=browser.new_context();page=ctx.new_page();page.goto(url)
   page.evaluate('''policy=>{const s=ImpromptEngine.createState(IMPROMPT_CARDS);ImpromptEngine.startSession(s,IMPROMPT_CARDS,{playMode:'basic',basicDeck:'stance',hintPolicy:policy});localStorage.setItem('imprompt:deck-state:v1',JSON.stringify(s));}''',policy)
   page.reload();page.click('#enterButton');page.click('#startSessionButton');page.click('#stanceCard');expect(page.locator('#combinationHintButton')).to_be_hidden()
   if policy=='after-attempt':expect(page.locator('#stanceNudgeButton')).to_be_hidden();page.click('#unlockHintsButton')
   if policy=='off':expect(page.locator('#stanceNudgeButton')).to_be_hidden()
   else:page.click('#stanceNudgeButton');expect(page.locator('.scene-line')).to_have_count(5)
   results.append({'policy':policy,'pass':True});ctx.close()
  browser.close()
finally:
 server.terminate();server.wait(timeout=10)
 (OUT/'native-results.json').write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps(results))
