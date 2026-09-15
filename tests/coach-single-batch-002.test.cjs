'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {hash,readLedger,validPass,accepted}=require('../tools/coach-review-core.cjs');
const {readAmendments,validateSingle}=require('../tools/single-amendments.cjs');
const source=require('../examples/authoring/single-scenes.json').records,batch=require('../editorial/0.26.0-preview.4/single-batch-review.json');
const original=require('../editorial/batches/singles-002/batch.json'),manifest=require('../examples/manifest.json');
const runtime=JSON.parse(fs.readFileSync(path.resolve(__dirname,'..',manifest.files.singles.plainUrl),'utf8')).records;
const changed=['S11-single-b','S12-single-a','S13-single-a','S14-single-b','S15-single-b','S17-single-a','S17-single-b','S18-single-a','S19-single-a','S20-single-b'];
test('singles-002 preserves all twenty originals and installs exactly ten accepted revisions',()=>{
 assert.deepEqual(batch.records.map(r=>r.exampleId),original.records.map(r=>r.exampleId));assert.equal(batch.records.length,20);
 assert.deepEqual(batch.records.filter(r=>r.decision==='revised').map(r=>r.exampleId),changed);
 for(const r of batch.records){
  assert.deepEqual(r.before,original.records.find(x=>x.exampleId===r.exampleId).before);
  assert.deepEqual(r.after,source[r.key].examples.find(x=>x.id===r.exampleId));assert.deepEqual(r.after,runtime[r.key].find(x=>x.id===r.exampleId));
  assert.equal(hash(r.before.beats),r.beforeBeatsSha256);assert.equal(hash(r.after.beats),r.afterBeatsSha256);
  assert.ok(validPass(r.firstPass)&&accepted(r.secondPass));assert.ok(Object.values(r.hardGates).every(v=>v===true));
  assert.ok(r.remainingConcern.length>20&&r.alternativeComparison.length>50);
  assert.equal(r.independentHumanBlindRead,false);assert.equal(r.liveTested,false);
  if(changed.includes(r.exampleId)){assert.notEqual(r.beforeBeatsSha256,r.afterBeatsSha256);assert.equal(r.after.exampleVersion,'0.26.0-preview.4');}else assert.deepEqual(r.after,r.before);
 }
});
test('new amendments extend the immutable baseline without removing the eleven preceding amendments',()=>{
 const all=readAmendments(),reviews=readLedger(),current=all.filter(a=>a.toVersion===batch.release);
 assert.equal(all.filter(a=>['0.26.0-preview.3','0.26.0-preview.4'].includes(a.toVersion)).length,21);assert.deepEqual(current.map(a=>a.exampleId),changed);
 assert.deepEqual(all.filter(a=>a.toVersion==='0.26.0-preview.3'),require('../editorial/0.26.0-preview.3/single-amendments.json').amendments);
 for(const r of batch.records)validateSingle(r.after,all,reviews);
 const e=source.S11.examples[1];assert.throws(()=>validateSingle(e,all.filter(a=>a.toVersion!==batch.release),reviews),/Unreviewed source drift/);
 const broken=structuredClone(all);broken.find(a=>a.exampleId===e.id).fromBeatsSha256='f'.repeat(64);assert.throws(()=>validateSingle(e,broken,reviews),/Broken amendment chain/);
 const drift=structuredClone(e);drift.beats[4].text+=' Unreviewed';assert.throws(()=>validateSingle(drift,all,reviews),/Unreviewed source drift/);
});
test('preceding thirty reviewed scenes remain exact and separate progress remains honest',()=>{
 const previous=[...require('../editorial/0.26.0-preview.3/single-batch-review.json').records,...require('../editorial/0.26.0-preview.2/pair-batch-review.json').records,...require('../editorial/0.26.0-preview.1/checkpoint-review.json').records];
 const pairs=require('../examples/authoring/pair-scenes.json');
 for(const r of previous){const scenes=r.kind==='single'?source[r.key].examples:pairs[r.key];assert.deepEqual(scenes.find(e=>e.id===r.exampleId),r.kind==='single'?r.after:require('./helpers/pair-description-history.cjs').currentDescription(r.after));}
 const reviews=readLedger().filter(r=>r.status==='internal-second-pass'),extra=require('../tools/local-audit/progress.cjs').progress().localSingles;assert.equal(reviews.filter(r=>r.kind==='single').length,60+extra);assert.equal(reviews.filter(r=>r.kind==='combination').length,10);
 assert.equal(manifest.counts.singleExamples-60-extra,900-extra);assert.equal(manifest.counts.pairExamples-10,115190);assert.equal(manifest.counts.totalExamples-reviews.length,116090-extra);
});
test('affected bespoke seed provenance is explicit and the S06 flag stays pending',()=>{
 const review=require('../editorial/0.26.0-preview.4/transfer-binding-review.json'),pairs=require('../examples/authoring/pair-scenes.json');
 assert.equal(review.records.length,9);assert.equal(review.bespokeDependencies.length,5);
 for(const r of review.bespokeDependencies){assert.equal(hash(r.historicalSeedDialogue),r.baselineSeedHash);assert.equal(hash(pairs[r.exampleId.split('-')[0]].find(e=>e.id===r.exampleId).beats),r.pairDialogueHash);assert.notEqual(r.baselineSeedHash,r.currentSeedHash);assert.ok(r.assessment.length>50);}
 const flag=review.pendingPairFlags.find(r=>r.exampleId==='S06+D49-b');assert.equal(flag.status,'pending');assert.equal(flag.separatelyScopedPairReviewRequired,true);
});
