'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {root,hash,readLedger,validPass,accepted}=require('../tools/coach-review-core.cjs');
const {readAmendments,validateSingle}=require('../tools/single-amendments.cjs');
const batch=require('../editorial/0.26.0-preview.2/pair-batch-review.json');
const original=require('../editorial/batches/pairs-001/batch.json');
const overrides=require('../examples/authoring/pair-scenes.json');
const singles=require('../examples/authoring/single-scenes.json').records;
const m=require('../examples/manifest.json');
const expected=['S67+D101-b','S22+D14-a','S22+D14-b','S124+D06-a','S124+D06-b','S192+D74-a','S192+D74-b','S01+D13-a','S01+D13-b'];

const {applyDescriptionChain,currentDescription}=require('./helpers/pair-description-history.cjs');

test('nine explicit revisions, not merely ratings or appended prose',()=>{
 assert.deepEqual(batch.records.map(r=>r.exampleId),expected);
 for(const r of batch.records){
  const prior=original.records.find(x=>x.exampleId===r.exampleId);
  assert.deepEqual(r.before,prior.before,'Original evidence must remain exact');
  assert.notEqual(hash(r.before.beats),hash(r.after.beats));
  assert.equal(r.after.exampleVersion,'0.26.0-preview.2');
  assert.equal(r.after.id,r.before.id);
  assert.deepEqual(r.after.beats.map(b=>b.speaker),['A','B','A','B','A']);
  assert.ok(r.after.beats.every(b=>!Object.hasOwn(b,'action')));
  assert.deepEqual(overrides[r.key].find(e=>e.id===r.exampleId),currentDescription(r.after));
  const doc=JSON.parse(fs.readFileSync(path.join(root,m.files[r.key.split('+')[0]].plainUrl),'utf8'));
  assert.deepEqual(doc.records[r.key.split('+')[1]].find(e=>e.id===r.exampleId).beats,r.after.beats);
 }
});
test('description amendment chains cannot alter reviewed dialogue, references or historical versions',()=>{
 const historical=batch.records.find(r=>r.exampleId==='S124+D06-a').after,after={...historical,seedUse:'FIXTURE ONLY: explicit historical source attribution, not a production review.'};
 const change={exampleId:historical.id,beforeSeedUse:historical.seedUse,afterSeedUse:after.seedUse,beforeSeedRefs:historical.seedRefs,afterSeedRefs:historical.seedRefs,beforeRecordHash:hash(historical),afterRecordHash:hash(after),reason:'FIXTURE ONLY: documented description mismatch recovery.'};
 assert.deepEqual(applyDescriptionChain(historical,[change]),after);assert.deepEqual(applyDescriptionChain(historical,[]),historical);
 assert.throws(()=>applyDescriptionChain(historical,[{...change,beforeRecordHash:'stale'}]),/Unanchored/);
 assert.throws(()=>applyDescriptionChain(historical,[{...change,afterRecordHash:hash({...after,beats:[]})}]),/after-record/);
 assert.throws(()=>applyDescriptionChain(historical,[{...change,afterRecordHash:hash({...after,exampleVersion:'changed'})}]),/after-record/);
 assert.throws(()=>applyDescriptionChain(historical,[{...change,afterSeedRefs:['S124-single-b','D06-single-a']}]),/separate review/);
});
test('both score passes preserve evidence and arithmetic, not automatic semantic certification',()=>{
 for(const r of batch.records){
  assert.ok(validPass(r.firstPass));assert.ok(validPass(r.secondPass));assert.ok(accepted(r.secondPass));
  assert.equal(r.rubricVersion,'coach-1.0');
  assert.ok(Object.values(r.hardGateEvidence).every(x=>typeof x==='string'&&x.length>35));
  assert.ok(r.recommendedEdit.length>40);assert.ok(r.alternativeComparison.length>60);assert.ok(r.remainingConcern.length>20);
  assert.equal(r.independentHumanBlindRead,false);assert.equal(r.liveTested,false);assert.equal(r.ownerEndorsement.endorsedTranscript,false);
 }
 assert.equal(readLedger().filter(r=>r.status==='internal-second-pass'&&r.kind==='combination').length,10);
});
test('actual source scene references need not have the same alternative suffix',()=>{
 const binding=require('../editorial/0.26.0-preview.5/transfer-binding-review.json');
 const amendments=readAmendments(),reviews=readLedger();
 for(const r of batch.records){
  const [sid,did]=r.key.split('+');
  r.seedEvidence.forEach((e,i)=>{
   const seed=singles[i===0?sid:did].examples.find(x=>x.id===e.exampleId);
   assert.ok(seed);assert.equal(hash(e.beats),e.beatsSha256);
   if(['S22-single-a','S22-single-b'].includes(e.exampleId)){
    // These two historical pair seeds have explicit preview.5 amendments.
    // Preserve the reviewed snapshot and prove its path to the current source.
    const dependency=binding.bespokeDependencies.find(d=>d.exampleId===r.exampleId&&d.seedRef===e.exampleId);
    assert.ok(dependency);assert.deepEqual(dependency.historicalSeedDialogue,e.beats);
    assert.equal(dependency.baselineSeedHash,e.beatsSha256);
    assert.equal(dependency.currentSeedHash,hash(seed.beats));
    assert.equal(dependency.pairDialogueHash,hash(r.after.beats));
    const chain=validateSingle(seed,amendments,reviews);
    assert.ok(chain.some(a=>a.fromBeatsSha256===e.beatsSha256&&a.toBeatsSha256===dependency.currentSeedHash&&a.toVersion==='0.26.0-preview.5'));
   }else if(hash(seed.beats)!==e.beatsSha256){
    const dependencies=fs.readdirSync(path.join(root,'editorial'),{withFileTypes:true}).filter(d=>d.isDirectory()&&d.name.startsWith('local-')).flatMap(d=>{const file=path.join(root,'editorial',d.name,'transfer-binding-review.json');return fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')).bespokeDependencies:[];});
    const dependency=dependencies.find(d=>d.exampleId===r.exampleId&&d.seedRef===e.exampleId&&d.baselineSeedHash===e.beatsSha256&&d.currentSeedHash===hash(seed.beats));
    assert.ok(dependency,'Changed historical seed requires an explicit dependency assessment');assert.deepEqual(dependency.historicalSeedDialogue,e.beats);assert.equal(dependency.pairDialogueHash,hash(r.after.beats));assert.equal(dependency.individuallyReviewed,false);
    assert.ok(validateSingle(seed,amendments,reviews).some(a=>a.fromBeatsSha256===e.beatsSha256&&a.toBeatsSha256===hash(seed.beats)));
   }else{
    assert.deepEqual(seed.beats,e.beats);assert.equal(hash(seed.beats),e.beatsSha256);
   }
   assert.equal(r.after.seedRefs[i],e.exampleId);
  });
 }
 assert.deepEqual(overrides['S192+D74'][0].seedRefs,['S192-single-b','D74-single-b']);
});
test('pending scenes are not promoted when a small batch passes',()=>{
 const completion=require('../editorial/batches/pairs-001/completion.json');
 assert.equal(completion.sceneCount,10);assert.equal(completion.newlyRewrittenSceneIds.length,9);
 assert.deepEqual(completion.unchangedReferenceSceneIds,['S67+D101-a']);
 assert.equal(m.counts.totalExamples,116160);
 assert.equal(readLedger().filter(r=>r.kind==='combination').length,10);
 assert.equal(m.counts.pairExamples-readLedger().filter(r=>r.kind==='combination').length,115190);
});
test('specific before/after problems have regression fixtures',()=>{
 const p=(key,variant)=>overrides[key][variant].beats.map(b=>b.text);
 assert.match(p('S124+D06',0)[1],/balcony/);assert.doesNotMatch(p('S124+D06',0)[0],/balcony/);
 assert.match(p('S124+D06',0)[3],/where you were/);assert.match(p('S124+D06',0)[4],/police version/);
 assert.match(p('S01+D13',1)[3],/While you were pouring/);assert.match(p('S01+D13',1)[4],/could have intervened/);
 assert.match(p('S192+D74',0)[3],/taxi/);assert.match(p('S192+D74',0)[4],/moving.*meeting/);
});
