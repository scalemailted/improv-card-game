'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {hash,readLedger,validPass,accepted}=require('../tools/coach-review-core.cjs');
const {readAmendments,validateSingle}=require('../tools/single-amendments.cjs');
const source=require('../examples/authoring/single-scenes.json').records;
const batch=require('../editorial/0.26.0-preview.3/single-batch-review.json');
const original=require('../editorial/batches/singles-001/batch.json');
const m=require('../examples/manifest.json');
const runtime=JSON.parse(fs.readFileSync(path.resolve(__dirname,'..',m.files.singles.plainUrl),'utf8')).records;
const changed=['S03-single-a','S03-single-b','S04-single-a','S04-single-b','S05-single-b','S06-single-b','S07-single-a','S07-single-b','S08-single-a','S08-single-b','S09-single-a'];
test('twenty originals, actual edits and retained alternatives match canonical and shipped sources',()=>{
 assert.equal(batch.records.length,20);assert.deepEqual(batch.records.map(r=>r.exampleId),original.records.map(r=>r.exampleId));
 assert.deepEqual(batch.records.filter(r=>r.decision==='revised').map(r=>r.exampleId),changed);
 for(const r of batch.records){
  assert.deepEqual(r.before,original.records.find(x=>x.exampleId===r.exampleId).before);
  assert.deepEqual(r.after,source[r.key].examples.find(x=>x.id===r.exampleId));
  assert.deepEqual(r.after,runtime[r.key].find(x=>x.id===r.exampleId));
  assert.equal(r.beforeBeatsSha256,hash(r.before.beats));assert.equal(r.afterBeatsSha256,hash(r.after.beats));
  assert.equal(r.after.exampleVersion,changed.includes(r.exampleId)?'0.26.0-preview.3':'0.25.0');
  if(r.decision==='retained')assert.deepEqual(r.after,r.before);
  assert.ok(validPass(r.firstPass)&&accepted(r.secondPass));assert.ok(Object.values(r.hardGates).every(x=>x===true));
  assert.ok(r.remainingConcern.length>20&&r.alternativeComparison.length>50);
  assert.equal(r.independentHumanBlindRead,false);assert.equal(r.liveTested,false);
 }
});
test('exact baseline amendments reject omitted, broken, duplicate, unreviewed and tampered changes',()=>{
 const amendments=readAmendments(),reviews=readLedger();assert.equal(amendments.filter(a=>a.toVersion===batch.release).length,11);
 for(const a of amendments){const e=source[a.exampleId.split('-')[0]].examples.find(e=>e.id===a.exampleId);validateSingle(e,amendments,reviews);}
 const e=source.S03.examples[0];
 assert.throws(()=>validateSingle(e,[],reviews),/Unreviewed source drift/);
 const bad=structuredClone(amendments);bad[0].fromBeatsSha256='0'.repeat(64);assert.throws(()=>validateSingle(e,bad,reviews),/Broken amendment chain/);
 assert.throws(()=>validateSingle(e,[...amendments,amendments[0]],reviews),/Broken amendment chain/);
 assert.throws(()=>validateSingle(e,amendments,[]),/Missing completed review/);
 const drift=structuredClone(e);drift.beats[4].text+=' Unreviewed.';assert.throws(()=>validateSingle(drift,amendments,reviews),/Unreviewed source drift/);
 const version=structuredClone(e);version.exampleVersion='0.25.0';assert.throws(()=>validateSingle(version,amendments,reviews),/Unacknowledged scene version/);
});
test('new review counts distinguish singles, prior pairs and pending corpus',()=>{
 const reviews=readLedger().filter(r=>r.status==='internal-second-pass');
 const extra=require('../tools/local-audit/progress.cjs').progress().localSingles;
 assert.equal(reviews.filter(r=>r.kind==='single').length,60+extra);assert.equal(reviews.filter(r=>r.kind==='combination').length,10);
 assert.equal(m.counts.totalExamples-reviews.length,116090-extra);
 assert.equal(m.counts.singleExamples-60-extra,900-extra);assert.equal(m.counts.pairExamples-10,115190);
});
