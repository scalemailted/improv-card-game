'use strict';
// Validate exact amendments to immutable v0.25 evidence. No semantic scores are inferred.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {root,hash,readLedger,accepted}=require('./coach-review-core.cjs');
const baseline=require('../editorial/v0.25.0/single-dialogue-ledger.json').entries;
function readAmendments(){
 const records=[];
 for(const dir of fs.readdirSync(path.join(root,'editorial'),{withFileTypes:true})){
  if(!dir.isDirectory())continue;
  const file=path.join(root,'editorial',dir.name,'single-amendments.json');
  if(fs.existsSync(file))records.push(...JSON.parse(fs.readFileSync(file,'utf8')).amendments);
 }
 return records;
}
function validateSingle(scene,amendments=readAmendments(),reviews=readLedger()){
 const old=baseline.find(e=>e.exampleId===scene.id);assert.ok(old,'Missing baseline: '+scene.id);
 assert.equal(hash(old.before),old.beforeHash);assert.notEqual(old.beforeHash,old.afterHash);
 let expectedHash=old.afterHash,expectedVersion='0.25.0';
 const chain=amendments.filter(a=>a.exampleId===scene.id),seen=new Set([expectedHash]);
 for(const a of chain){
  assert.equal(a.baselineLedger,'editorial/v0.25.0/single-dialogue-ledger.json');
  assert.equal(a.fromBeatsSha256,expectedHash,'Broken amendment chain: '+scene.id);
  assert.equal(a.fromVersion,expectedVersion);assert.notEqual(a.toVersion,a.fromVersion);
  assert.ok(!seen.has(a.toBeatsSha256),'Duplicate/cyclic amendment: '+scene.id);seen.add(a.toBeatsSha256);
  const ledgerFile=path.resolve(root,a.reviewLedger);assert.ok(ledgerFile.startsWith(path.join(root,'editorial')+path.sep));
  const linked=JSON.parse(fs.readFileSync(ledgerFile,'utf8')).records;
  const review=linked.find(r=>r.exampleId===scene.id&&r.afterBeatsSha256===a.toBeatsSha256);
  assert.ok(review&&reviews.some(r=>r.exampleId===review.exampleId&&r.afterBeatsSha256===review.afterBeatsSha256),'Missing completed review: '+scene.id);
  assert.equal(review.status,'internal-second-pass');assert.ok(accepted(review.secondPass));
  assert.ok(Object.values(review.hardGates).every(v=>v===true));
  assert.equal(hash(review.before.beats),expectedHash);assert.equal(review.beforeBeatsSha256,expectedHash);
  assert.equal(hash(review.after.beats),a.toBeatsSha256);assert.equal(review.after.exampleVersion,a.toVersion);
  expectedHash=a.toBeatsSha256;expectedVersion=a.toVersion;
 }
 assert.equal(hash(scene.beats),expectedHash,'Unreviewed source drift: '+scene.id);
 assert.equal(scene.exampleVersion,expectedVersion,'Unacknowledged scene version: '+scene.id);
 return chain;
}
module.exports={readAmendments,validateSingle};
