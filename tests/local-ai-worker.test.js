'use strict';
// Offline control-flow test. The runtime and model below are explicit test doubles,
// not ONNX inference. Deploy tools/local-ai-benchmark.html for a real model test.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const config=require('../ai/config.js');
const requests=require('../ai/hint-request.js');
const cards=require('../cards.js');
const memory=new Map(), events=[], fetches=[], calls=[];
let failFile=config.files[2].url, pipelineOptions, badDraft=true;
const good='Ask who authorized the difficult announcement, then pass its opening sentence up the hierarchy while volunteering to handle the follow-up questions.';
const cache={
 async match(url){const r=memory.get(String(url));return r?.clone();},
 async put(url,response){memory.set(String(url),new Response(await response.arrayBuffer(),{headers:response.headers}));}
};
const env={backends:{onnx:{wasm:{}}}};
const runtime={env,pipeline:async(task,model,opts)=>{
 assert.equal(task,'text2text-generation'); assert.equal(model,config.modelId);
 assert.equal(env.allowLocalModels,true,'Required by Transformers.js when local_files_only=true');
 assert.equal(env.allowRemoteModels,false); assert.equal(opts.local_files_only,true);
 assert.equal(opts.revision,config.revision); assert.equal(opts.dtype,'q8');
 assert.equal(env.backends.onnx.wasm.numThreads,1);
 pipelineOptions=opts;
 assert.ok(await env.customCache.match(config.files.find(f=>f.id==='config.json').url));
 return async(prompt,settings)=>{calls.push({prompt,settings});
   if(badDraft){badDraft=false;return [{generated_text:'The stance and drive create a scene.'}];}
   return [{generated_text:good}];};
}};
const context={console,URL,Blob,Response,Headers,ReadableStream,performance,
 self:{IMPROMPT_AI_CONFIG:config,IMPROMPT_AI_REQUEST:requests,postMessage:m=>events.push(m)},
 importScripts(){},caches:{open:async()=>cache},
 fetch:async(url,options)=>{fetches.push({url,options});if(url===failFile)throw new Error('test interrupted download');return new Response('fixture-bytes',{headers:{'content-length':'13'}});},
 __loadRuntime:async()=>runtime};
vm.createContext(context);
let source=fs.readFileSync(require.resolve('../ai/coach-worker.js'),'utf8');
source=source.replace('await import(moduleURL)','await __loadRuntime(moduleURL)');
vm.runInContext(source,context);
async function command(id,name,payload){await context.self.onmessage({data:{id,command:name,payload}});return events.filter(e=>e.id===id&&['result','error'].includes(e.type)).at(-1);}
(async()=>{
 assert.equal((await command(1,'inspect')).installed,false); assert.equal(fetches.length,0);
 assert.equal((await command(2,'install')).type,'error');
 assert.equal(memory.size,2,'completed files retained after interruption');
 failFile=null;
 assert.equal((await command(3,'install')).installed,true);
 assert.equal(memory.size,10);
 const n=fetches.length;
 assert.equal((await command(4,'load')).ready,true);assert.ok(pipelineOptions);
 const selected=[cards.stances.find(c=>c.id==='S67'),cards.drives.find(c=>c.id==='D101')];
 const payload=requests.createPayload({kind:'combination',cards:selected,allowed:true,revealed:selected.map(c=>c.id),plan:'Use hierarchy to defer opening the difficult subject.'});
 const result=await command(5,'generate',payload);
 assert.equal(result.text,good);assert.equal(result.attempts,2);assert.equal(calls.length,2);
 assert.equal(calls[0].settings.do_sample,true);assert.notEqual(calls[0].prompt,calls[1].prompt);
 assert.equal(fetches.length,n,'model generation adds no asset or inference requests');
 const failed=await command(6,'generate',{...payload,previous:[good]});
 assert.equal(failed.source,'fallback');assert.equal(failed.reason,'quality-check');
 assert.ok(failed.rejected.length===2);
 assert.equal((await command(7,'unexpected')).type,'error');
 assert.ok(fetches.every(f=>f.options.credentials==='omit'&&f.options.referrerPolicy==='no-referrer'));
 for (const url of vm.runInContext('objectURLs',context)) URL.revokeObjectURL(url);
 console.log('✓ Mocked worker test: partial-download retry, cache-only load configuration, stochastic retry, rejection fallback, no generation network calls');
})().catch(e=>{console.error(e);process.exitCode=1;});
