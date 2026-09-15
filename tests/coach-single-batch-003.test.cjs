'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {hash,readLedger,validPass,accepted}=require('../tools/coach-review-core.cjs');
const {readAmendments,validateSingle}=require('../tools/single-amendments.cjs');
const source=require('../examples/authoring/single-scenes.json').records,batch=require('../editorial/0.26.0-preview.5/single-batch-review.json');
const original=require('../editorial/batches/singles-003/batch.json'),manifest=require('../examples/manifest.json');
const runtime=JSON.parse(fs.readFileSync(path.resolve(__dirname,'..',manifest.files.singles.plainUrl),'utf8')).records;
const changed=['S21-single-b','S22-single-a','S22-single-b','S23-single-b','S24-single-a','S24-single-b','S25-single-b','S26-single-a','S26-single-b','S27-single-b','S28-single-b','S30-single-b'];
test('singles-003 preserves originals, distinct card mechanisms and both accepted passes for exactly twenty scenes',()=>{
 assert.deepEqual(batch.records.map(r=>r.exampleId),original.records.map(r=>r.exampleId));assert.equal(batch.records.length,20);
 assert.deepEqual(batch.records.filter(r=>r.decision==='revised').map(r=>r.exampleId),changed);
 for(const r of batch.records){
  assert.deepEqual(r.before,original.records.find(x=>x.exampleId===r.exampleId).before);
  assert.deepEqual(r.after,source[r.key].examples.find(x=>x.id===r.exampleId));assert.deepEqual(r.after,runtime[r.key].find(x=>x.id===r.exampleId));
  assert.equal(hash(r.before.beats),r.beforeBeatsSha256);assert.equal(hash(r.after.beats),r.afterBeatsSha256);
  assert.ok(validPass(r.firstPass)&&accepted(r.secondPass));assert.ok(Object.values(r.hardGates).every(v=>v===true));
  assert.deepEqual(r.mechanismDistinction.card,r.cards[0]);assert.ok(r.mechanismDistinction.distinguishingEvidenceRequired.length>30);
  assert.ok(r.remainingConcern.length>20&&r.alternativeComparison.length>50);assert.equal(r.independentHumanBlindRead,false);assert.equal(r.liveTested,false);
  if(changed.includes(r.exampleId)){assert.notEqual(r.beforeBeatsSha256,r.afterBeatsSha256);assert.equal(r.after.exampleVersion,batch.release);}else assert.deepEqual(r.after,r.before);
 }
});
test('twelve exact amendments extend both completed chains and reject omissions, broken links and new drift',()=>{
 const all=readAmendments(),reviews=readLedger();assert.equal(all.length,33+require('../tools/local-audit/progress.cjs').progress().localAmendments);assert.deepEqual(all.filter(a=>a.toVersion===batch.release).map(a=>a.exampleId),changed);
 for(const version of ['0.26.0-preview.3','0.26.0-preview.4'])assert.deepEqual(all.filter(a=>a.toVersion===version),require('../editorial/'+version+'/single-amendments.json').amendments);
 for(const r of batch.records)validateSingle(r.after,all,reviews);
 const e=source.S22.examples[0];assert.throws(()=>validateSingle(e,all.filter(a=>a.toVersion!==batch.release),reviews),/Unreviewed source drift/);
 const broken=structuredClone(all);broken.find(a=>a.exampleId===e.id).fromBeatsSha256='f'.repeat(64);assert.throws(()=>validateSingle(e,broken,reviews),/Broken amendment chain/);
 const drift=structuredClone(e);drift.beats[4].text+=' Unreviewed';assert.throws(()=>validateSingle(drift,all,reviews),/Unreviewed source drift/);
});
test('all preceding fifty reviews remain exact, including both S22 pairs, with separate current progress',()=>{
 const previous=[...require('../editorial/0.26.0-preview.4/single-batch-review.json').records,...require('../editorial/0.26.0-preview.3/single-batch-review.json').records,...require('../editorial/0.26.0-preview.2/pair-batch-review.json').records,...require('../editorial/0.26.0-preview.1/checkpoint-review.json').records];
 assert.equal(previous.length,50);const pairs=require('../examples/authoring/pair-scenes.json');
 for(const r of previous){const scenes=r.kind==='single'?source[r.key].examples:pairs[r.key];assert.deepEqual(scenes.find(e=>e.id===r.exampleId),r.kind==='single'?r.after:require('./helpers/pair-description-history.cjs').currentDescription(r.after));}
 const reviews=readLedger().filter(r=>r.status==='internal-second-pass'),extra=require('../tools/local-audit/progress.cjs').progress().localSingles;assert.equal(reviews.filter(r=>r.kind==='single').length,60+extra);assert.equal(reviews.filter(r=>r.kind==='combination').length,10);
 assert.equal(manifest.counts.singleExamples-60-extra,900-extra);assert.equal(manifest.counts.pairExamples-10,115190);assert.equal(manifest.counts.totalExamples-reviews.length,116090-extra);
});
test('three bespoke dependencies retain historical seed evidence without acquiring reviews; S06 stays pending',()=>{
 const review=require('../editorial/0.26.0-preview.5/transfer-binding-review.json'),pairs=require('../examples/authoring/pair-scenes.json');assert.equal(review.records.length,9);
 assert.deepEqual(review.bespokeDependencies.map(r=>r.exampleId),['S22+D14-a','S22+D14-b','S23+D163-b']);
 for(const r of review.bespokeDependencies){assert.equal(hash(r.historicalSeedDialogue),r.baselineSeedHash);assert.equal(hash(pairs[r.exampleId.split('-')[0]].find(e=>e.id===r.exampleId).beats),r.pairDialogueHash);assert.notEqual(r.baselineSeedHash,r.currentSeedHash);assert.ok(r.assessment.length>50);}
 assert.ok(!readLedger().some(r=>r.exampleId==='S23+D163-b'));const flag=review.pendingPairFlags.find(r=>r.exampleId==='S06+D49-b');assert.equal(flag.status,'pending');assert.equal(flag.separatelyScopedPairReviewRequired,true);
});
