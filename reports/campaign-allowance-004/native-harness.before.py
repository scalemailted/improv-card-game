"""Native localhost app, production worker/cache/gzip and actual hint renderer.
Requires Python Playwright plus an installed browser (CHROMIUM_PATH optional).
No transport mocks. Browser offline mode is not a physical-phone install test.
"""
import json, os, subprocess, socket, time, urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT=Path(__file__).resolve().parents[1]
OUT=Path(os.environ.get('NATIVE_OUT',str(ROOT/'reports/preview.5/native-browser')))
OUT.mkdir(parents=True,exist_ok=True)
MANIFEST=json.loads((ROOT/'examples/manifest.json').read_text(encoding='utf-8'))
DATA=json.loads((ROOT/MANIFEST['files']['singles']['plainUrl']).read_text(encoding='utf-8'))['records']
KEYS=os.environ.get('NATIVE_KEYS',','.join(f'S{i:02}' for i in range(21,31))).split(',')
WIDTHS=[int(w) for w in os.environ.get('NATIVE_WIDTHS','320,412,1280').split(',')]
with socket.socket() as sock:
    sock.bind(('127.0.0.1',0));port=sock.getsockname()[1]
url=f'http://127.0.0.1:{port}/'
server=subprocess.Popen(['node','tools/serve-local.cjs'],cwd=ROOT,env={**os.environ,'PORT':str(port)},stdout=subprocess.DEVNULL,stderr=subprocess.PIPE,creationflags=subprocess.CREATE_NO_WINDOW if os.name=='nt' else 0)
results=[]

def seed(page,key,policy='full'):
    page.evaluate("""({key,policy})=>{
      const s=ImpromptEngine.createState(IMPROMPT_CARDS);
      const stance=key.startsWith('S')?key:'S67',drive=key.startsWith('D')?key:'D101';
      s.stanceQueue=[stance,...s.stanceQueue.filter(id=>id!==stance)];
      s.driveQueue=[drive,...s.driveQueue.filter(id=>id!==drive)];
      ImpromptEngine.startSession(s,IMPROMPT_CARDS,{name:'Open Play',mode:'open',source:'open',hintPolicy:policy});
      localStorage.setItem('imprompt:deck-state:v1',JSON.stringify(s));
    }""",{'key':key,'policy':policy})
    page.reload()
    page.click('#enterButton');page.click('#startSessionButton');page.click('#stanceCard');page.click('#driveCard')

def verify_dialog(page,key,width,another=True):
    expect(page.locator('#hintDialogBody')).to_have_attribute('aria-busy','false')
    expect(page.locator('.scene-line')).to_have_count(5)
    lines=page.locator('.scene-line').all_text_contents()
    scene=next((e for e in DATA[key] if [b['text'] for b in e['beats']]==lines),None)
    assert scene, (key,lines)
    assert page.locator('.scene-action').count()==0
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    assert page.locator('#hintDialogBody').evaluate('(e)=>e.scrollWidth<=e.clientWidth')
    panel=page.locator('#hintDialogPanel').bounding_box()
    assert panel['y']>=-1 and panel['y']+panel['height']<=page.evaluate('innerHeight')+1
    page.locator('.scene-line').last.scroll_into_view_if_needed()
    expect(page.locator('.scene-line').last).to_be_in_viewport()
    controls=['#doneHintButton']
    if another:controls.insert(0,'#anotherHintAngleButton')
    else:expect(page.locator('#anotherHintAngleButton')).to_be_hidden()
    for control in controls:
        page.locator(control).scroll_into_view_if_needed();expect(page.locator(control)).to_be_in_viewport()
    results.append({'width':width,'scene':scene['id'],'nativeReaderAndRenderer':True,'pass':True})
    return scene['id']

def nudge(key):
    return '#stanceNudgeButton' if key.startswith('S') else '#driveNudgeButton'

try:
    for attempt in range(100):
        try:
            urllib.request.urlopen(url,timeout=1).close();break
        except OSError:time.sleep(.1)
    else:raise RuntimeError('Local server did not start')
    with sync_playwright() as p:
        options={'headless':True}
        if os.environ.get('CHROMIUM_PATH'):options['executable_path']=os.environ['CHROMIUM_PATH']
        browser=p.chromium.launch(**options)
        for width in WIDTHS:
            ctx=browser.new_context(viewport={'width':width,'height':760 if width==320 else 915},has_touch=width<700,is_mobile=width<700)
            page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            page.goto(url);page.wait_for_function('typeof ImpromptEngine!=="undefined"')
            for key in KEYS:
                seed(page,key)
                page.click(nudge(key))
                first=verify_dialog(page,key,width)
                page.click('#anotherHintAngleButton')
                second=verify_dialog(page,key,width)
                assert first!=second
                if key in ['S22','S24','S26','S30']:page.screenshot(path=str(OUT/f'{width}-{key}.png'),full_page=False)
                page.click('#doneHintButton')
            print('Native batch viewport passed:',width,flush=True)
            if width==412:
                page.evaluate("Promise.race([navigator.serviceWorker.ready,new Promise((_,reject)=>setTimeout(()=>reject(new Error('Service worker ready timed out at 15 seconds')),15000))])")
                page.wait_for_function('navigator.serviceWorker.controller!==null')
                ctx.set_offline(True)
                seed(page,KEYS[-1]);page.click(nudge(KEYS[-1]))
                first=verify_dialog(page,KEYS[-1],width);page.click('#anotherHintAngleButton');assert verify_dialog(page,KEYS[-1],width)!=first
                page.click('#doneHintButton');results.append({'flow':'Native service-worker offline reload and cached singles with both alternatives','pass':True})
                ctx.set_offline(False)
            for policy in ['off','after-attempt','nudges']:
                seed(page,KEYS[0],policy)
                if policy=='off':expect(page.locator(nudge(KEYS[0]))).to_be_hidden()
                else:
                    if policy=='after-attempt':
                        expect(page.locator(nudge(KEYS[0]))).to_be_hidden();page.click('#unlockHintsButton')
                    page.click(nudge(KEYS[0]));selected=verify_dialog(page,KEYS[0],width,another=policy!='nudges')
                    if policy=='nudges':
                        count=lambda e:len(' '.join(b['text'] for b in e['beats']).split())
                        assert count(next(e for e in DATA[KEYS[0]] if e['id']==selected))==min(map(count,DATA[KEYS[0]]))
                    page.click('#doneHintButton')
                results.append({'width':width,'policy':policy,'native':True,'pass':True})
            assert not errors,errors
            ctx.close()
        browser.close()
    (OUT/'results.json').write_text(json.dumps({'scope':'Installed desktop Chromium on localhost, production worker, native gzip/hash/cache, app renderer and service-worker offline reload. Emulated widths/touch; not a physical device or deployed-site test.','selectedCards':KEYS,'widths':WIDTHS,'checks':results},indent=2)+'\n',encoding='utf-8')
    print('PASS:',len(results),'native checks',flush=True)
finally:
    server.terminate();server.wait(timeout=10)
