'use strict';
// A local recovery checkpoint, deliberately separate from distribution validation.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),c=require('./core.cjs');
function save(state,file){
 const queues=state.queueFiles.map(c.read),guard=c.fingerprint(state.root);
 for(const q of queues)assert.deepEqual(guard,q.guard,'Source checkpoint refuses unaccounted source drift');
 const folder=path.join(path.dirname(file),'source-checkpoints',Date.now()+'-'+require('node:crypto').randomUUID()),source=path.join(folder,'source');
 c.save(path.join(folder,'state.json'),{campaign:state,queues});c.copySource(state.root,source);
 assert.deepEqual(c.fingerprint(source),guard,'Source checkpoint copy mismatch');
 const manifest={schema:1,status:'saved-local-source',at:new Date().toISOString(),source,stopReason:state.stopReason,distributionZip:false,releaseVerified:false,
  files:Object.entries(guard).map(([file,sha256])=>({file,sha256,bytes:fs.statSync(path.join(source,file)).size})),
  evidence:'Integrated review/proof/amendment files are copied with source. Pending attempts and recovery history remain at the exact paths in state.json; preserve the campaign and queue directories together with this local checkpoint.',
  validation:queues.map(q=>({queue:q.id,batches:q.batches.map(b=>({id:b.id,status:b.status,validation:b.validation,integrationGroups:b.integrationGroups||[],pendingIntegration:b.pendingIntegration||null}))}))};
 c.save(path.join(folder,'manifest.json'),manifest);state.sourceCheckpoints||=[];state.sourceCheckpoints.push({manifest:path.join(folder,'manifest.json'),at:manifest.at,status:manifest.status});c.save(file,state);return manifest;
}
module.exports={save};
