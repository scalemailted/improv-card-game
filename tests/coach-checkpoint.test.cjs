'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),cp=require('node:child_process');
const {root,hash,total,validPass,accepted}=require('../tools/coach-review-core.cjs');
const records=require('../editorial/0.26.0-preview.1/checkpoint-review.json').records;
const pairs=require('../examples/authoring/pair-scenes.json');
test('owner-endorsed hamster scene is in source and retains its stable ID',()=>{
 const r=records[0],scene=pairs['S67+D101'][0];
 assert.equal(scene.id,'S67+D101-a');assert.deepEqual(scene.beats,r.after.beats);
 assert.equal(hash(scene.beats),r.afterBeatsSha256);assert.notEqual(r.beforeBeatsSha256,r.afterBeatsSha256);
 assert.match(scene.beats[0].text,/lost the class hamster/);assert.match(scene.beats[3].text,/appoint you deputy head/);
 assert.equal(scene.beats[4].text,'My first recommendation is that we hear from the headteacher.');
 assert.equal(scene.exampleVersion,r.after.exampleVersion); // Retained scene revisions do not follow app releases.
});
test('same weighted rubric applied twice; arithmetic is not a quality certificate',()=>{
 const r=records[0];assert.ok(validPass(r.firstPass));assert.ok(accepted(r.secondPass));assert.equal(total(r.firstPass),69);assert.equal(total(r.secondPass),95);
 const weak=structuredClone(r.secondPass);weak.ratings.cardFidelity.score=2;weak.weightedTotal=total(weak);assert.equal(accepted(weak),false);
 assert.equal(r.independentHumanBlindRead,false);assert.equal(r.liveTested,false);
});
test('exporter supplies actual instructions, both examples, blank scores, and exact seed dialogues',()=>{
 const result=cp.execFileSync(process.execPath,['tools/export-coach-batch.cjs','--kind','pair','--keys','S67+D101'],{cwd:root,encoding:'utf8'});
 const p=JSON.parse(result);assert.equal(p.records.length,2);assert.equal(p.records[0].status,'reference-already-reviewed');assert.equal(p.records[1].status,'reference-already-reviewed');
 assert.equal(p.records[0].cards[0].title,'Chain of Command');assert.equal(p.records[0].cards[1].title,'Start the Hard Part');
 for(const r of p.records){assert.equal(r.firstPass.ratings.cardFidelity.score,null);assert.equal(r.secondPass.weightedTotal,null);assert.equal(r.after,null);assert.equal(r.seedExamples.stance.length,2);}
});
test('single batch export is bounded and uses unmodified source',()=>{
 const p=JSON.parse(cp.execFileSync(process.execPath,['tools/export-coach-batch.cjs','--kind','single','--limit','10'],{cwd:root,encoding:'utf8'}));
 const pending=require('../tools/local-audit/core.cjs').discover(root).pendingKeys;
 assert.equal(p.selectionCount,Math.min(10,pending.length));assert.equal(p.sceneCount,p.selectionCount*2);assert.equal(p.records[0]?.key,pending[0]);
});
test('checkpoint does not claim to have recovered unavailable audit files',()=>{
 const r=require('../editorial/0.26.0-preview.1/recovery-manifest.json');assert.equal(r.recoveredFromInterruptedAudit.length,0);assert.equal(r.unavailableDrafts.length,3);
 assert.deepEqual(r.newlyIntegratedFromVisibleConversation,['S67+D101-a']);
});
