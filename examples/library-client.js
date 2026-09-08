/* Browser and Node-testable client for static act-it-out records. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.IMPROMPT_EXAMPLE_LIBRARY=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const CYCLE_KEY='imprompt:example-cycles:v1';
 function prepare({kind,entries,policy,unlocked}){
  if(!policy||(!policy.allowsSingle&&!policy.allowsCombination)||(policy.requiresUnlock&&!unlocked))throw Error('Hints are not available for this exercise yet.');
  if(kind==='single'&&!policy.allowsSingle||kind==='combination'&&!policy.allowsCombination)throw Error('This hint type is disabled.');
  if(!['single','combination'].includes(kind)||!Array.isArray(entries)||entries.length!==(kind==='single'?1:2))throw Error('Invalid selection.');
  const cs=entries.map(e=>{const c=e?.card;if(e?.revealed!==true||!c?.id||!c.instruction)throw Error('Unrevealed cards cannot enter a hint request.');return {id:c.id,type:c.type,title:c.title,instruction:c.instruction,contentVersion:c.contentVersion};});
  if(kind==='combination'&&(cs[0].type!=='stance'||cs[1].type!=='drive'))throw Error('A combination requires Stance then Drive.');
  return {kind,cards:cs};
 }
 function selectNext(records,history,random=Math.random){
  const ids=records.map(r=>r.id);let remaining=Array.isArray(history?.remaining)?history.remaining.filter(id=>ids.includes(id)):[];
  if(!remaining.length){remaining=ids.slice();for(let i=remaining.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[remaining[i],remaining[j]]=[remaining[j],remaining[i]];}
   if(remaining.length>1&&remaining[0]===history?.last)[remaining[0],remaining[1]]=[remaining[1],remaining[0]];
  }
  const id=remaining.shift();return {example:records.find(r=>r.id===id),history:{remaining,last:id},count:records.length,index:ids.indexOf(id)+1};
 }
 function create({manifest,storage,workerFactory=()=>new Worker(new URL('./library-worker.js?v=0.23.0',document.currentScript?.src||new URL('./examples/',document.baseURI)).href),random=Math.random}={}){
  let worker=null,serial=0;const pending=new Map();let cycles={};
  try{const parsed=JSON.parse(storage?.getItem(CYCLE_KEY)||'{}');if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed))cycles=parsed;}catch{}
  function spawn(){if(worker)return;worker=workerFactory();worker.onmessage=({data})=>{const p=pending.get(data.id);if(!p)return;if(data.type==='progress'){p.onProgress?.(data);return;}pending.delete(data.id);clearTimeout(p.timer);data.type==='result'?p.resolve(data.result):p.reject(Object.assign(Error(data.error),{name:data.code||'Error'}));};
   worker.onerror=()=>{const current=worker;worker=null;current?.terminate();for(const p of pending.values()){clearTimeout(p.timer);p.reject(Error('The example reader could not start. Reload after deployment completes.'));}pending.clear();};
  }
  function rpc(command,payload,onProgress){spawn();const id=++serial;
   const promise=new Promise((resolve,reject)=>{const timer=setTimeout(()=>{worker?.postMessage({command:'cancel',payload:{target:id}});pending.delete(id);reject(Error('Example loading timed out. Check the connection and retry.'));},command==='install'?300000:60000);pending.set(id,{resolve,reject,onProgress,timer});worker.postMessage({id,command,payload});});
   return {promise,cancel(){worker?.postMessage({command:'cancel',payload:{target:id}});}};
  }
  async function next(input){const request=prepare(input);const result=await rpc('get',request).promise;
   const key=manifest.datasetId+':'+result.key;const choice=selectNext(result.records,cycles[key],random);delete cycles[key];cycles[key]=choice.history;
   const keys=Object.keys(cycles);while(keys.length>96)delete cycles[keys.shift()];
   try{storage?.setItem(CYCLE_KEY,JSON.stringify(cycles));}catch{}
   return {...choice,key:result.key,datasetId:result.datasetId};
  }
  function dispose(){worker?.terminate();worker=null;for(const p of pending.values()){clearTimeout(p.timer);p.reject(Error('Example reader stopped.'));}pending.clear();}
  return {next,status:()=>rpc('status').promise,install:onProgress=>rpc('install',null,onProgress),clear:()=>rpc('clear').promise,dispose};
 }
 return Object.freeze({CYCLE_KEY,prepare,selectNext,create});
});
