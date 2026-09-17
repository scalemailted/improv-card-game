import json, os, subprocess, socket, time, urllib.request, sys
from pathlib import Path
from playwright.sync_api import sync_playwright, expect
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'reports/menu-new-game-fix'; OUT.mkdir(exist_ok=True)
phase='before' if '--before' in sys.argv else 'after'
with socket.socket() as sock:
 sock.bind(('127.0.0.1',0)); port=sock.getsockname()[1]
server=subprocess.Popen(['node','tools/serve-local.cjs'],cwd=ROOT,env={**os.environ,'PORT':str(port)},stdout=subprocess.DEVNULL,stderr=subprocess.PIPE,creationflags=subprocess.CREATE_NO_WINDOW)
url=f'http://127.0.0.1:{port}/'; results=[]
def state(p): return p.evaluate("JSON.parse(localStorage.getItem('imprompt:deck-state:v1'))")
try:
 for i in range(100):
  try: urllib.request.urlopen(url,timeout=1).close(); break
  except OSError: time.sleep(.1)
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,executable_path=os.environ.get('CHROMIUM_PATH'))
  for width in [320,412,1280]:
   ctx=browser.new_context(viewport={'width':width,'height':900},reduced_motion='reduce'); p=ctx.new_page(); errors=[]
   p.on('pageerror',lambda e:errors.append(str(e)))
   p.goto(url); p.click('#enterButton'); p.wait_for_timeout(300); p.screenshot(path=str(OUT/f'{phase}-menu-{width}.png'),full_page=True)
   copy=p.locator('#basicPlayButton .menu-option-copy').bounding_box()
   p.click('#advancedPlayButton'); p.click('#stanceCard'); p.click('#driveCard'); old=state(p)
   p.click('#playMenuButton')
   if phase=='after':
    for destination,back in [('galleryButton','galleryBackButton'),('learnButton','learnBackButton'),('historyButton','historyBackButton'),('inviteButton','inviteBackButton'),('exercisesButton','exercisesBackButton')]:
     p.click('#'+destination); assert state(p)==old; p.click('#'+back); assert state(p)==old
    p.click('#exampleSettingsButton'); assert state(p)==old; p.click('#closeExampleSettingsButton'); assert state(p)==old
   p.click('#basicPlayButton'); p.screenshot(path=str(OUT/f'{phase}-chooser-{width}.png'),full_page=True)
   p.click('#closeBasicChooser'); assert state(p)==old
   p.click('#startSessionButton'); assert state(p)==old
   p.click('#playMenuButton'); p.click('#basicPlayButton'); p.click('#basicStanceButton'); new=state(p)
   if phase=='before': assert new['current']==old['current']
   else:
    assert copy['width']>180
    assert new['current']['playMode']=='basic' and new['current']['basicDeck']=='stance'
    assert new['activeSessionId']!=old['activeSessionId'] and new['current']['sceneNumber']==1
    assert new['history']==old['history']; expect(p.locator('#driveCardWrap')).to_be_hidden()
    p.screenshot(path=str(OUT/f'after-advanced-to-basic-{width}.png'),full_page=True)
    p.click('#stanceCard'); p.click('#stanceNudgeButton'); expect(p.locator('.scene-line')).to_have_count(5); p.click('#flagExampleButton'); p.click('#doneHintButton')
    flags=p.evaluate("localStorage.getItem('imprompt:example-feedback:v1')"); assert flags
    cache_entries=p.evaluate('''async()=>{const result=[];for(const name of await caches.keys()){const cache=await caches.open(name);for(const req of await cache.keys())result.push([name,req.url]);}return result}''')
    p.click('#completeButton'); completed=state(p)
    p.click('#basicPlayButton'); p.click('#basicDriveButton'); assert state(p)['history']==completed['history']
    p.click('#driveCard'); saved=state(p); p.reload(); p.click('#enterButton'); p.click('#startSessionButton'); assert state(p)==saved
    p.click('#playMenuButton'); p.click('#exercisesButton'); p.locator('#mirrorExerciseList button').first.click(); assert state(p)==saved
    p.get_by_role('button',name='Start on this phone',exact=True).click(); guided=state(p); assert guided['activeSessionId']!=saved['activeSessionId']; assert guided['history']==saved['history']; expect(p.locator('#sessionConflictDialog')).not_to_be_visible()
    p.click('#playMenuButton'); p.click('#advancedPlayButton'); assert state(p)['activeSessionId']!=guided['activeSessionId']; assert state(p)['current']['playMode']=='advanced'
    p.click('#playMenuButton'); p.click('#basicPlayButton'); p.click('#basicDriveButton'); p.click('#driveCard'); saved=state(p)
    assert p.evaluate("localStorage.getItem('imprompt:example-feedback:v1')")==flags
    assert p.evaluate('''async entries=>{for(const [name,url] of entries)if(!await(await caches.open(name)).match(url))return false;return true}''',cache_entries)
    p.evaluate('navigator.serviceWorker.ready'); p.reload(); ctx.set_offline(True); p.reload(); p.click('#enterButton'); p.click('#startSessionButton'); assert state(p)['current']==saved['current']
    p.click('#driveNudgeButton'); expect(p.locator('.scene-line')).to_have_count(5)
    assert p.evaluate('document.documentElement.scrollWidth<=innerWidth')
   assert not errors,errors
   results.append({'width':width,'textWidth':copy['width'],'oldSession':old['activeSessionId'],'newSession':new['activeSessionId'],'pass':True,'offline':phase=='after'}); ctx.close()
  if phase=='after':
   ctx=browser.new_context(); p=ctx.new_page(); p.goto(url)
   legacy=p.evaluate('''()=>{const s=ImpromptEngine.createState(IMPROMPT_CARDS);ImpromptEngine.drawPair(s,IMPROMPT_CARDS);ImpromptEngine.completeScene(s,IMPROMPT_CARDS);ImpromptEngine.drawPair(s,IMPROMPT_CARDS);s.version=5;delete s.playPreference;delete s.current.playMode;delete s.current.basicDeck;localStorage.setItem('imprompt:deck-state:v1',JSON.stringify(s));return s;}''')
   p.reload(); p.click('#enterButton'); p.click('#startSessionButton'); migrated=state(p); assert migrated['current']==legacy['current']; assert migrated['history']==legacy['history']
   p.click('#playMenuButton'); p.click('#basicPlayButton'); p.click('#basicDriveButton'); assert state(p)['history']==legacy['history']; assert state(p)['current']['basicDeck']=='drive'
   results.append({'legacyV5ResumeThenFreshStart':True,'pass':True}); ctx.close()
  browser.close()
 (OUT/f'{phase}-native-results.json').write_text(json.dumps(results,indent=2)); print(json.dumps(results))
finally: server.terminate(); server.wait(timeout=10)
