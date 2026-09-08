/* Static example reader. No inference and no run-time text composition. */
'use strict';
importScripts('./manifest.js?v=0.24.0');
const manifest=self.IMPROMPT_EXAMPLE_MANIFEST;
const BASE=new URL('../',self.location.href);
const CACHE='imprompt-examples-'+manifest.datasetId;
const parsed=new Map(), tasks=new Map();
const sha=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
const urlFor=(f,plain=false)=>new URL(plain?f.plainUrl:f.url,BASE).href;
const send=(id,type,data)=>self.postMessage({id,type,...data});
function checkAbort(signal){if(signal?.aborted)throw new DOMException('Cancelled','AbortError');}
async function openCache(){try{return await caches.open(CACHE);}catch{return null;}}
function isGzip(bytes){return bytes[0]===31&&bytes[1]===139;}
async function decode(buffer,f){
 let bytes=new Uint8Array(buffer);
 if(isGzip(bytes)){
  if(typeof DecompressionStream==='undefined')throw Error('This compressed copy needs a newer browser. Connect once to save the plain-text edition.');
  const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  bytes=new Uint8Array(await new Response(stream).arrayBuffer());
 }
 if(bytes.length!==f.plainBytes||await sha(bytes)!==f.sha256)throw Error('Example file failed its integrity check.');
 return bytes;
}
async function loadFile(key,{signal,persistRequired=false}={}){
 const f=manifest.files[key];if(!f)throw Error('Example partition does not exist.');
 const cache=await openCache(), plain=typeof DecompressionStream==='undefined';
 let problem=null;
 for(const candidate of (plain?[urlFor(f,true)]:[urlFor(f),urlFor(f,true)])){
  const hit=await cache?.match(candidate);
  if(hit){try{return await decode(await hit.arrayBuffer(),f);}catch(err){problem=err;await cache.delete(candidate);}}
 }
 checkAbort(signal);
 const chosen=urlFor(f,plain);
 let response;
 try{response=await fetch(chosen,{signal,cache:'no-store',credentials:'same-origin',referrerPolicy:'no-referrer'});}
 catch(err){if(err.name==='AbortError')throw err;throw Error(problem?'A damaged example file needs a connection to repair.':'This example is not saved yet. Connect once, or download the library before rehearsal.');}
 if(!response.ok)throw Error('Example download failed ('+response.status+'). Retry after deployment completes.');
 const data=await response.arrayBuffer(); checkAbort(signal);
 if(data.byteLength>Math.max(f.bytes,f.plainBytes)+1024)throw Error('Unexpected example file size.');
 const raw=await decode(data,f);
 if(cache){try{await cache.put(chosen,new Response(data,{headers:{'Content-Type':plain?'application/json':'application/gzip'}}));}
  catch(err){if(persistRequired)throw Error('Storage is full or disabled. Previously saved files are kept; free space and resume.');}}
 else if(persistRequired)throw Error('This browser has disabled offline storage. Online examples still work.');
 return raw;
}
async function loadDoc(key,signal){
 if(parsed.has(key)){const doc=parsed.get(key);parsed.delete(key);parsed.set(key,doc);return doc;}
 const f=manifest.files[key],raw=await loadFile(key,{signal});checkAbort(signal);
 const doc=JSON.parse(new TextDecoder().decode(raw));
 if(doc.schema!==2||doc.datasetId!==manifest.datasetId||!doc.records)throw Error('Incompatible example file.');
 parsed.set(key,doc);
 // Keep singles plus at most four Stance partitions parsed, never the entire corpus.
 const shards=[...parsed.keys()].filter(k=>k!=='singles');while(shards.length>4)parsed.delete(shards.shift());
 return doc;
}
async function get(request,signal){
 if(!request||!['single','combination'].includes(request.kind))throw Error('Invalid example request.');
 const cs=request.cards;if(!Array.isArray(cs)||cs.length!==(request.kind==='single'?1:2))throw Error('Wrong number of cards.');
 for(const c of cs){
  const fp=await sha(new TextEncoder().encode(JSON.stringify([c.id,c.type,c.contentVersion,c.title,c.instruction])));
  if(fp!==manifest.fingerprints[c.id])throw Error('Examples need updating for this card revision. No older wording was substituted.');
 }
 if(request.kind==='combination'&&(cs[0].type!=='stance'||cs[1].type!=='drive'))throw Error('A pair needs Stance then Drive.');
 const key=request.kind==='single'?'singles':cs[0].id,recordId=request.kind==='single'?cs[0].id:cs[1].id;
 const doc=await loadDoc(key,signal), records=doc.records[recordId];
 if(!records?.length)throw Error('No scene has been authored for this exact selection.');
 for(const record of records){
  if(!Array.isArray(record.beats)||!['ABA','ABABA'].includes(record.format)||record.beats.map(beat=>beat.speaker).join('')!==record.format||record.beats.some(beat=>typeof beat.text!=='string'||!beat.text.trim()))throw Error('The scene record is incomplete. Reconnect to update the library.');
 }
 return {records,key:cs.map(c=>c.id).join('+'),datasetId:manifest.datasetId};
}
async function status(){
 const cache=await openCache(), savedKeys=[];let bytes=0;
 if(cache)for(const [k,f] of Object.entries(manifest.files)){
  const compressed=typeof DecompressionStream!=='undefined'&&await cache.match(urlFor(f));
  const plain=!compressed&&await cache.match(urlFor(f,true));
  if(compressed||plain){savedKeys.push(k);bytes+=compressed?f.bytes:f.plainBytes;}
 }
 return {cacheName:CACHE,savedFiles:savedKeys.length,totalFiles:Object.keys(manifest.files).length,complete:savedKeys.length===Object.keys(manifest.files).length,bytes,downloadBytes:typeof DecompressionStream==='undefined'?manifest.uncompressedBytes:manifest.compressedBytes,compression:typeof DecompressionStream!=='undefined',storageAvailable:Boolean(cache)};
}
async function install(id,signal){
 const entries=Object.keys(manifest.files);let done=0;
 for(const key of entries){checkAbort(signal);await loadFile(key,{signal,persistRequired:true});
  send(id,'progress',{done:++done,total:entries.length,message:`Saved ${done} of ${entries.length} files`});}
 return status();
}
self.onmessage=async({data})=>{
 const {id,command,payload}=data||{};
 if(command==='cancel'){tasks.get(payload?.target)?.abort();return;}
 const controller=new AbortController();tasks.set(id,controller);
 try{
  let result;
  if(command==='get')result=await get(payload,controller.signal);
  else if(command==='status')result=await status();
  else if(command==='install')result=await install(id,controller.signal);
  else if(command==='clear'){for(const [k,t]of tasks)if(k!==id)t.abort();parsed.clear();await caches.delete(CACHE);result=await status();}
  else throw Error('Unknown library command.');
  checkAbort(controller.signal);send(id,'result',{result});
 }catch(err){send(id,'error',{error:err.message,code:err.name});}finally{tasks.delete(id);}
};
