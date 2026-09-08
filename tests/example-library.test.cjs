'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{webcrypto}=require('node:crypto');
const client=require('../examples/library-client.js'),m=require('../examples/manifest.json'),cards=require('../cards.js'),bible=require('../hint-bible.js');
const root=path.resolve(__dirname,'..'),origin='https://test.example/improv-card-game/';
const card=id=>[...cards.stances,...cards.drives].find(c=>c.id===id);
const input=(ids,policy='full')=>({kind:ids.length===1?'single':'combination',entries:ids.map(id=>({card:card(id),revealed:true})),policy:bible.getPolicy(policy),unlocked:false});
function harness({decompression=true,storage=true}={}){
 let offline=false,fetches=0,serial=0;const stores=new Map(),replies=new Map();
 const caches={async open(name){if(!storage)throw Error('Disabled');if(!stores.has(name))stores.set(name,new Map());const map=stores.get(name);return {match:async k=>map.has(String(k))?new Response(map.get(String(k)).slice(0)):undefined,put:async(k,v)=>{map.set(String(k),await v.arrayBuffer());},delete:async k=>map.delete(String(k))};},delete:async name=>stores.delete(name)};
 const scope={location:{href:origin+'examples/library-worker.js?v=0.23.0'},postMessage(data){if(data.type==='progress')return;const p=replies.get(data.id);if(!p)return;replies.delete(data.id);data.type==='result'?p.resolve(data.result):p.reject(Object.assign(Error(data.error),{name:data.code}));}};
 const sandbox={self:scope,importScripts(){scope.IMPROMPT_EXAMPLE_MANIFEST=m;},URL,Response,Blob,TextDecoder,TextEncoder,AbortController,DOMException,crypto:webcrypto,caches,console,
 fetch:async(url,{signal}={})=>{fetches++;if(signal?.aborted)throw new DOMException('cancel','AbortError');if(offline)throw TypeError('offline');const u=new URL(url),rel=u.pathname.replace('/improv-card-game/','');try{return new Response(fs.readFileSync(path.join(root,rel)));}catch{return new Response('missing',{status:404});}}};
 if(decompression)sandbox.DecompressionStream=DecompressionStream;
 const ctx=vm.createContext(sandbox);vm.runInContext(fs.readFileSync(path.join(root,'examples/library-worker.js'),'utf8'),ctx);
 function call(command,payload){const id=++serial;const promise=new Promise((resolve,reject)=>{replies.set(id,{resolve,reject});scope.onmessage({data:{id,command,payload}});});return {id,promise};}
 return {call,offline(v){offline=v;},fetchCount:()=>fetches,scope,stores,caches,ctx};
}

test('all hints are policy-gated before any worker starts',()=>{
 assert.throws(()=>client.prepare(input(['S124'],'off')));assert.throws(()=>client.prepare(input(['S124'],'after-attempt')));
 const q=input(['S124']);q.entries[0].revealed=false;assert.throws(()=>client.prepare(q));
 assert.equal(client.prepare(input(['S124'])).cards[0].instruction,card('S124').instruction);
 assert.throws(()=>client.prepare(input(['D14','S22'])));
});
test('only selected card fields enter request; no deck, notes or unrevealed hand',()=>{
 const q=input(['S124']);q.deck={private:'data'};q.entries[0].card={...q.entries[0].card,secretHistory:'private'};
 assert.deepEqual(Object.keys(client.prepare(q)),['kind','cards']);assert.equal(client.prepare(q).cards[0].secretHistory,undefined);
});
test('shuffle bag exhausts examples before repeats and avoids a cycle-boundary repeat',()=>{
 const rs=[{id:'a'},{id:'b'},{id:'c'}];let history=null,out=[];
 for(let i=0;i<30;i++){let r=client.selectNext(rs,history,()=>0.1);history=r.history;out.push(r.example.id);if(i)assert.notEqual(out[i],out[i-1]);}
 for(let i=0;i<30;i+=3)assert.equal(new Set(out.slice(i,i+3)).size,3);
});
test('worker performs real gzip decompression, JSON parsing and SHA-256 checks',async()=>{
 const h=harness(),r=await h.call('get',client.prepare(input(['S124']))).promise;
 assert.equal(r.records.length,2);assert.match(r.records[0].beats.map(b=>b.text).join(" "),/insider|unredacted/i);
 assert.doesNotMatch(r.records[0].beats.map(b=>b.text).join(" "),/copy a small routine|right to be here/);
});
test('exact paired fixture, with both cards, not two generic instructions',async()=>{
 const h=harness(),r=await h.call('get',client.prepare(input(['S67','D101']))).promise;
 assert.equal(r.records.length,2);assert.match(r.records[0].beats.map(b=>b.text).join(" "),/chair.*cancelled.*refund/);
 assert.equal(r.records[0].provenance,'authored-pair');
});
test('changed instruction or version cannot silently retrieve stale examples',async()=>{
 const h=harness(),q=client.prepare(input(['S124']));q.cards[0].instruction='New meaning';
 await assert.rejects(h.call('get',q).promise,/updating/);
 assert.equal(h.fetchCount(),0);
});
test('a cached selected pair is available with simulated network disabled',async()=>{
 const h=harness(),q=client.prepare(input(['S22','D14']));const first=await h.call('get',q).promise;h.offline(true);
 const next=await h.call('get',q).promise;assert.equal(JSON.stringify(next.records[0].beats),JSON.stringify(first.records[0].beats));assert.equal(h.fetchCount(),1);
});
test('missing offline pair gives an explicit error, not a generic fallback',async()=>{
 const h=harness();h.offline(true);await assert.rejects(h.call('get',client.prepare(input(['S22','D14']))).promise,/not saved/);
});
test('older-browser plain JSON fallback uses identical examples',async()=>{
 const h=harness({decompression:false});const r=await h.call('get',client.prepare(input(['S67','D101']))).promise;
 assert.match(r.records[0].beats.map(b=>b.text).join(" "),/chair/);const status=await h.call('status').promise;assert.equal(status.compression,false);assert.equal(status.savedFiles,1);
});
test('entire dataset installs, resumes without downloads, and reports only saved files',async()=>{
 const h=harness();const r=await h.call('install').promise;assert.equal(r.complete,true);assert.equal(r.savedFiles,241);
 const n=h.fetchCount();h.offline(true);const verify=await h.call('install').promise;assert.equal(verify.complete,true);assert.equal(h.fetchCount(),n);
 const q=await h.call('get',client.prepare(input(['S240','D240']))).promise;assert.equal(q.records.length,2);
});
test('corrupt cached partition is evicted then repaired, never displayed',async()=>{
 const h=harness(),cache=await h.caches.open('imprompt-examples-'+m.datasetId);
 const url=new URL(m.files.S124.url,origin).href;await cache.put(url,new Response('not json'));
 const r=await h.call('get',client.prepare(input(['S124','D101']))).promise;assert.match(r.records[0].beats.map(b=>b.text).join(" "),/public version|one of us|organizer/i);assert.equal(h.fetchCount(),1);
});
test('invalid cached file plus offline network is explicit, not silently accepted',async()=>{
 const h=harness(),cache=await h.caches.open('imprompt-examples-'+m.datasetId);
 await cache.put(new URL(m.files.S124.url,origin).href,new Response('not json'));h.offline(true);
 await assert.rejects(h.call('get',client.prepare(input(['S124','D101']))).promise,/damaged/);
});
test('storage disabled still permits online reading but rejects offline-install claim',async()=>{
 const h=harness({storage:false});assert.ok((await h.call('get',client.prepare(input(['S124']))).promise).records);
 await assert.rejects(h.call('install').promise,/disabled offline storage/);
});
test('worker bounds parsed pair partitions rather than retaining full corpus',async()=>{
 const h=harness();for(let i=1;i<=9;i++)await h.call('get',client.prepare(input(['S'+String(i).padStart(2,'0'),'D01']))).promise;
 assert.equal(vm.runInContext("[...parsed.keys()].filter(k=>k!=='singles').length",h.ctx),4);
});
test('clearing examples targets only current library, not old model or unrelated caches',async()=>{
 const h=harness();await h.caches.open('other-site-cache');await h.caches.open('imprompt-llm-runtime-3.6.1');await h.call('get',client.prepare(input(['S124']))).promise;
 await h.call('clear').promise;assert.ok(h.stores.has('other-site-cache'));assert.ok(h.stores.has('imprompt-llm-runtime-3.6.1'));
 assert.equal((await h.call('status').promise).savedFiles,0);
});
test('deployment has no model-loading runtime and keeps request-specific data out of sharing',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),app=fs.readFileSync(path.join(root,'app.js'),'utf8');
 assert.doesNotMatch(html,/<script[^>]+(?:wllama|local-hints|quick-hints|hint-engine)/);assert.doesNotMatch(app,/import\(.*wllama|createChatCompletion|getCombinationHint|getSingleHint/);
 assert.match(app,/examples\/library-worker/);assert.match(html,/Save all examples offline/);assert.doesNotMatch(html,/id="hintDialogIntro"|id="localModelSelect"/);
});
