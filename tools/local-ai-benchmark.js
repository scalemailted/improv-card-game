/* Real on-device benchmark: no mocked model and no automatic downloads.
   This tool uses fixed public cards, not the performer's current private hand. */
'use strict';
const $ = id => document.getElementById(id);
const selectedPairs = [['S67','D101'],['S22','D14'],['S192','D74'],['S01','D13'],['S114','D97'],['S240','D218']];
const all = [...IMPROMPT_CARDS.stances, ...IMPROMPT_CARDS.drives];
const results = [];
let stopped = false, running = false;
const coach = new IMPROMPT_LOCAL_COACH.LocalCoach({onChange: s => {
  if (s.phase === 'download') $('status').textContent = `Downloading ${s.fileIndex}/${s.totalFiles}: ${s.file} ${s.progress ? Math.round(s.progress)+'%' : ''}`;
  else if(s.message) $('status').textContent = s.message;
}});
const write = text => { const p=document.createElement('p'); p.textContent=text; $('results').appendChild(p); };
async function refresh() {
  try {
    const info = await coach.inspect();
    $('download').disabled = !IMPROMPT_LOCAL_COACH.LocalCoach.supported() || running;
    $('run').disabled = !info.installed || running;
    $('download').textContent = info.installed ? 'Verify installed files' : 'Download optional model (~120 MB)';
    $('status').textContent = info.installed ? 'Files cached. Ready for a real inference test.' : 'Model not installed. Drawing cards never requires this download.';
  } catch(error) { $('status').textContent=error.message; }
}
$('download').onclick=async()=>{
  running=true;$('download').disabled=true;$('run').disabled=true;$('cancel').disabled=false;
  try { await coach.install(); } catch(error) { write(`Install error: ${error.message}`); }
  finally { running=false;$('cancel').disabled=true;await refresh(); }
};
$('run').onclick=async()=>{
  stopped=false;running=true;coach.preference(true);
  $('run').disabled=true;$('download').disabled=true;$('cancel').disabled=false;
  const previous=new Map();
  for(const ids of selectedPairs){
    for(let angle=0;angle<2;angle++){
      if(stopped)break;
      const selected=ids.map(id=>all.find(c=>c.id===id));
      const key=ids.join('+');
      const plan=IMPROMPT_QUICK_EXAMPLES.next('combination',selected).text;
      const payload=IMPROMPT_AI_REQUEST.createPayload({kind:'combination',cards:selected,plan,angle,
        previous:previous.get(key)||[],revealed:ids,allowed:true});
      const begin=performance.now();
      try {
        const result=await coach.generate(payload);
        const record={pair:ids,titles:selected.map(c=>c.title),angle,totalMs:Math.round(performance.now()-begin),...result,
          humanReview:{bothCards:null,concrete:null,holderOnly:null,concise:null,useful:null},modelRevision:IMPROMPT_AI_CONFIG.revision,promptVersion:IMPROMPT_AI_CONFIG.promptVersion};
        results.push(record);
        if(result.text)previous.set(key,[...(previous.get(key)||[]),result.text]);
        write(`${key} · ${result.source} · ${record.totalMs} ms\n${result.text||'Rejected by heuristic checks; no AI hint displayed.'}`);
      } catch(error) {
        results.push({pair:ids,angle,source:'error',message:error.message,totalMs:Math.round(performance.now()-begin)});
        write(`${key} · error: ${error.message}`);
      }
    }
    if(stopped)break;
  }
  running=false;coach.release();$('cancel').disabled=true;$('export').disabled=!results.length;await refresh();
};
$('cancel').onclick=()=>{stopped=true;coach.cancel();};
$('export').onclick=()=>{
  const blob=new Blob([JSON.stringify({appVersion:'0.22.0',date:new Date().toISOString(),userAgent:navigator.userAgent,
    description:'Actual on-device generation results. Heuristic acceptance is not human quality approval.',results},null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='imprompt-local-ai-device-test.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
};
window.addEventListener('pagehide',()=>coach.cancel());
void refresh();
