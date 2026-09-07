'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const cards = require('../cards.js');
const request = require('../ai/hint-request.js');
const quick = require('../hints/quick-examples.js');
const config = require('../ai/config.js');
const { LocalCoach } = require('../ai/local-coach.js');
const s = id => cards.stances.find(c => c.id === id);
const d = id => cards.drives.find(c => c.id === id);
const selected = [s('S67'), d('D101')];
const payload = request.createPayload({ kind: 'combination', cards: selected, plan: 'Use hierarchy to postpone personally starting a difficult subject.', revealed: selected.map(c => c.id), allowed: true });
assert.throws(() => request.createPayload({kind:'single',cards:[s('S01')],revealed:[],allowed:true}),/Unrevealed/);
assert.throws(() => request.createPayload({kind:'single',cards:[s('S01')],revealed:['S01'],allowed:false}),/policy/);
assert.throws(() => request.createPayload({kind:'combination',cards:[d('D101'),s('S67')],revealed:['S67','D101'],allowed:true}),/Stance then Drive/);
assert.deepEqual(Object.keys(payload).sort(), ['angle','cards','kind','plan','previous']);
for (const c of selected) assert.ok(request.buildPrompt(payload).includes(c.instruction));
assert.notEqual(request.buildPrompt(payload),request.buildPrompt({...payload,angle:1}));
assert.ok(!request.buildPrompt(request.createPayload({kind:'single',cards:[s('S67')],revealed:['S67'],allowed:true})).includes(d('D101').instruction));
const good = 'Ask who authorized the difficult announcement, then pass its opening sentence up the hierarchy while volunteering to handle the follow-up questions.';
assert.equal(request.validateOutput(good,payload).ok,true);
assert.equal(request.validateOutput(good,{...payload,previous:[good]}).ok,false);
assert.equal(request.validateOutput('Your partner must confess and will accept your authority immediately.',payload).ok,false);
assert.equal(request.validateOutput('The stance and drive can combine to create an interesting scene.',payload).ok,false);
assert.equal(request.validateOutput(selected[0].instruction,payload).ok,false);
assert.equal(request.validateOutput('Ask about supplies and',payload).ok,false);
assert.equal(Object.keys(quick.familyExamples).length,48);
for (const c of [...cards.stances,...cards.drives]) {
 const opts=quick.options('single',[c]); assert.ok(opts.length>=2,c.id);
 for(const text of opts) {assert.ok(text.split(/\s+/).length<=40,c.id);assert.notEqual(text,c.instruction,c.id);}
 const a=quick.next('single',[c]).text,b=quick.next('single',[c]).text;
 assert.notEqual(a,b,c.id+' immediate repeat');
}
assert.ok(quick.options('combination',selected).every(t=>/authoriz|rank|approv/.test(t)));
assert.equal(config.sampling.do_sample,true);
assert.equal(config.sampling.num_beams,1);
assert.ok(config.sampling.temperature>0);
assert.ok(/^[a-f0-9]{40}$/.test(config.revision));
assert.equal(config.files.length,10);
assert.ok(config.files.every(f=>f.url.startsWith('https://')));
assert.ok(!['imprompt-','two-secrets-'].some(p=>config.cacheName.startsWith(p)));
assert.notEqual(config.settingsKey,'imprompt:deck-state:v1');
const app=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const worker=fs.readFileSync(path.join(__dirname,'../ai/coach-worker.js'),'utf8');
assert.doesNotMatch(html,/id="hintDialogIntro"|id="hintAngleCount"/);
assert.match(app,/sequence !== hintRequestSequence/);
assert.match(worker,/local_files_only: true/);
assert.match(worker,/env.allowLocalModels = true/);
assert.match(worker,/env.allowRemoteModels = false/);
assert.match(worker,/numThreads = 1/);
assert.match(worker,/for \(let attempt = 0; attempt < 2; attempt\+\+\)/);
assert.doesNotMatch(worker,/api\.openai|api-inference|chat\/completions|method:\s*['"]POST/);
assert.match(worker,/credentials: 'omit'/);
assert.match(app,/hintCardsForContext/);
assert.match(fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8'),/if \(!isAppEntry\)/);
(async()=>{
 const data=new Map([['imprompt:deck-state:v1','unchanged-deck-snapshot']]);
 const storage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};
 let constructed=0, terminated=0, commands=[], deleted=[];
 const cacheStorage={open:async()=>({match:async()=>null}),delete:async(name)=>{deleted.push(name);return true;}};
 class MockWorker {
  constructor(){constructed++;}
  postMessage(m){commands.push(m.command);setTimeout(()=>this.onmessage({data:{id:m.id,type:'result',...(m.command==='install'?{installed:true}:m.command==='generate'?{text:good,source:'local-ai'}:{ready:true})}}),1);}
  terminate(){terminated++;}
 }
 const coach=new LocalCoach({workerFactory:()=>new MockWorker(),storage,cacheStorage});
 assert.equal(constructed,0,'no eager worker');await coach.inspect();assert.equal(constructed,0);
 await assert.rejects(coach.generate(payload),/off/);
 await coach.install();assert.equal(coach.enabled,true);
 assert.deepEqual(commands,['install']);
 const result=await coach.generate(payload);assert.equal(result.text,good);
 assert.deepEqual(commands,['install','load','generate']);
 coach.release();assert.equal(coach.ready,false);
 await coach.remove();assert.deepEqual(deleted,[config.cacheName]);assert.equal(coach.enabled,false);
 assert.equal(data.get('imprompt:deck-state:v1'),'unchanged-deck-snapshot');
 let late;
 const slow=new LocalCoach({storage,cacheStorage,workerFactory:()=>({postMessage(m){late=m;},terminate(){}})});
 const pending=slow.send('load',null,10000);slow.cancel();await assert.rejects(pending,{name:'AbortError'});
 assert.equal(slow.pending,null);assert.equal(slow.worker,null);
 console.log('✓ Local AI payload privacy, concise fallbacks, sampling configuration, heuristic gates, isolated cache, cancellation, and mocked controller lifecycle passed');
})().catch(e=>{console.error(e);process.exitCode=1;});
