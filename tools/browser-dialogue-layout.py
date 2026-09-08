#!/usr/bin/env python3
"""All authored-dialogue layout sweep using the actual renderer block and CSS.
Page and worker transport are fixtures; not native hosted service-worker testing.
"""
from pathlib import Path
import json,re,os
from playwright.sync_api import sync_playwright,expect
ROOT=Path(__file__).resolve().parents[1]
base=ROOT/'tools/browser-examples-smoke.py'
ns={'__file__':str(base)};exec(base.read_text().split('with sync_playwright() as p:')[0],ns)
source=json.loads((ROOT/'examples/authoring/single-scenes.json').read_text())['records']
pairs=json.loads((ROOT/'examples/authoring/pair-scenes.json').read_text())
cases=[{'key':e['id'],'title':c['title'],'example':e} for c in source.values() for e in c['examples']]
cases += [{'key':e['id'],'title':' + '.join(source[i]['title'] for i in key.split('+')),'example':e} for key,es in pairs.items() for e in es]
app=(ROOT/'app.js').read_text();start=app.index("      const panel=document.createElement('ol'); panel.className='scene-script';")
end=app.index('      elements.hintAngleCount.textContent=',start)
renderer=app[start:end]
results=[]
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium'),headless=True,args=['--no-sandbox'])
 for width,height in [(320,568),(320,760),(412,915),(1280,900)]:
  print('Sweep',width,height,flush=True)
  ctx,page,errs=ns['fixture'](browser,width,stance='S124');page.set_viewport_size({'width':width,'height':height});page.click('#stanceNudgeButton');expect(page.locator('.scene-line')).to_have_count(5)
  result=page.evaluate('''({cases,renderer})=>{
   const body=document.getElementById('hintDialogBody');
   const render=new Function('result','elements',renderer);
   let failures=[],scrollable=0;
   for(const c of cases){
    document.getElementById('hintDialogTitle').textContent=c.title;
    render({example:c.example},{hintDialogBody:body});
    const panel=document.getElementById('hintDialogPanel'),pr=panel.getBoundingClientRect();
    const done=document.getElementById('doneHintButton').getBoundingClientRect();
    if(body.scrollHeight>body.clientHeight+1)scrollable++;
    const script=body.querySelector('.scene-script');
    if(script.scrollHeight>script.clientHeight+1)failures.push({key:c.key,reason:'transcript-clips-spoken-turns'});
    for(const line of body.querySelectorAll('.scene-line'))if(line.scrollHeight>line.clientHeight+1)failures.push({key:c.key,reason:'line-clipped'});
    if(body.querySelectorAll('.scene-line').length!==5||body.querySelector('.scene-action'))failures.push({key:c.key,reason:'format'});
    if(document.documentElement.scrollWidth>innerWidth||body.scrollWidth>body.clientWidth+1)failures.push({key:c.key,reason:'horizontal-overflow'});
    if(pr.top< -1||pr.bottom>innerHeight+1||done.bottom>innerHeight+1)failures.push({key:c.key,reason:'modal-or-controls-outside-viewport'});
   }
   return {cases:cases.length,scrollable,failures,innerWidth,innerHeight,bodyHeight:body.clientHeight,bodyScrollHeight:body.scrollHeight,modalOpen:document.getElementById('hintDialog').open};
  }''',{'cases':cases,'renderer':renderer})
  assert not result['failures'],result['failures'][:10]
  assert result['innerWidth']==width and result['innerHeight']==height,result
  assert result['modalOpen'] and result['bodyHeight']>0,result
  assert not errs,errs
  results.append({'width':width,'height':height,**result});ctx.close()
 browser.close()
output={'scope':'1010 authored scenes through exact production renderer block and stylesheet per viewport, with simulated document/worker transport. No physical phone or hosted service-worker claim.','results':results}
(ROOT/'reports/dialogue-layout-results.json').write_text(json.dumps(output,indent=2)+'\n');print(json.dumps(output,indent=2))
