#!/usr/bin/env python3
"""Actual viewer source and real packaged records; explicitly mocked worker transport.
No claim of native HTTP, installed service-worker or physical Pixel testing.
"""
import json,re,os
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
R=Path(__file__).resolve().parents[1]
M=json.loads((R/'examples/manifest.json').read_text(encoding="utf-8"))
keys=['S67','S22','S124','S192','S01','singles']
data={k:json.loads((R/M['files'][k]['plainUrl']).read_text(encoding="utf-8")) for k in keys}
html=(R/'tools/checkpoint-example.html').read_text(encoding="utf-8")
html=re.sub(r'<script\b[^>]*></script>','',html)
html=re.sub(r'<link\b[^>]*>','',html)
html=html.replace('<head>','<head><base href="http://127.0.0.1:8765/tools/">')
html=html.replace('</head>','<style>'+(R/'styles.css').read_text(encoding="utf-8")+'</style></head>')
out=Path(os.environ.get('PREVIEW_DIR',str(R/'reports/preview.5/batch-browser-previews')));out.mkdir(parents=True,exist_ok=True)
results=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium'),headless=True,args=['--no-sandbox'])
 for width in [320,412,1280]:
  ctx=b.new_context(viewport={'width':width,'height':915 if width>320 else 760},has_touch=width<700,is_mobile=width<700)
  page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(html);page.evaluate('''({data,dataset})=>{
   window.fixtureData=data;window.fixtureDataset=dataset;
   window.Worker=class {terminate(){} postMessage(m){setTimeout(()=>{const [s,d]=m.payload.cards;this.onmessage({data:{id:m.id,type:'result',result:{records:d?fixtureData[s.id].records[d.id]:fixtureData.singles.records[s.id],datasetId:fixtureDataset}}});},5);}};
  }''',{'data':data,'dataset':M['datasetId']})
  page.add_script_tag(content=(R/'tools/checkpoint-example.js').read_text(encoding="utf-8"))
  for key in ['S67+D101','S22+D14','S124+D06','S192+D74','S01+D13']+[f'S{i:02}' for i in range(1,31)]:
   page.select_option('#pairChoice',key)
   sid,did=key.split('+') if '+' in key else ('singles',key)
   for i in [0,1]:
    expect(page.locator('.scene-line').first).to_have_text(data[sid]['records'][did][i]['beats'][0]['text'])
    assert page.locator('.scene-line').all_text_contents()==[x['text'] for x in data[sid]['records'][did][i]['beats']]
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    if key=='S01+D13' and i==1:page.screenshot(path=str(out/f'{width}-fern-reviewed.png'),full_page=True)
    results.append({'width':width,'scene':data[sid]['records'][did][i]['id'],'pass':True})
    if not i:page.click('#another')
  assert not errors,errors;ctx.close()
 b.close()
(R/'reports/preview.5/coach-batch-browser-results.json').write_text(json.dumps({'scope':'Actual viewer JS, renderer/styles and packaged records; worker-message transport explicitly simulated. Not a hosted/native-worker test.','checks':results},indent=2)+'\n')
print('PASS:',len(results),'real records/viewports via explicit transport fixture')
