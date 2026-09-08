'use strict';
// Verify review coverage and source integrity, never pretend to measure wit.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const source=require('../examples/authoring/single-scenes.json'),ledger=require('../editorial/v0.25.0/single-dialogue-ledger.json'),m=require('../examples/manifest.json');
const sha=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
const records=Object.values(source.records),entries=ledger.entries,ids=new Set(),openings=new Set(),exchanges=new Set();let actions=0;const counts=[];
assert.equal(records.length,480);assert.equal(entries.length,960);
for(const card of records){
 assert.equal(card.fingerprint,m.fingerprints[card.cardId]);
 assert.ok(card.editorialNote?.length>35,'Missing card-specific editorial explanation: '+card.cardId);
 for(const scene of card.examples){
  assert.equal(scene.beats.map(b=>b.speaker).join(''),'ABABA');
  assert.equal(scene.exampleVersion,'0.25.0');assert.equal(scene.editorialStatus,'internal-editorial-pass');
  assert.ok(!ids.has(scene.id));ids.add(scene.id);
  assert.ok(!openings.has(scene.beats[0].text),'Repeated opening: '+scene.id);openings.add(scene.beats[0].text);
  const joined=scene.beats.map(b=>b.text).join(' ');assert.ok(!exchanges.has(joined));exchanges.add(joined);
  assert.doesNotMatch(joined, /\b(?:your stance|your drive|the card holder|as an ai|then heighten)\b/i);
  assert.ok(scene.beats.every(b=>typeof b.text==='string'&&b.text.trim()));
  const count=joined.trim().split(/\s+/).length;assert.ok(count<=75);counts.push(count);
  actions+=scene.beats.filter(b=>Object.hasOwn(b,'action')).length;
  const evidence=entries.find(x=>x.exampleId===scene.id);assert.ok(evidence);
  assert.equal(evidence.afterHash,sha(scene.beats));assert.equal(evidence.beforeHash,sha(evidence.before));
  assert.notEqual(evidence.beforeHash,evidence.afterHash);assert.equal(evidence.rationale,card.editorialNote);
  assert.equal(evidence.independentReview,false);assert.equal(evidence.liveTested,false);
 }
}
assert.equal(actions,0);counts.sort((a,b)=>a-b);
const report={result:'PASS',meaning:'Coverage, exact source bindings, rewrite ledger, uniqueness and form checks. Not an automated score for humour, logic or playability.',cards:480,rewrittenSingleScenes:960,spokenTurnsPerScene:5,stageBlocks:0,medianWords:counts[480],maximumWords:counts.at(-1),uniqueOpenings:openings.size,reviewedBespokePairScenes:50,compiledPairScenesPendingIndividualReview:115150,editorialPass:'Internal model-authored rewrite with card-specific rationale',independentHumanReview:false,physicalTroupeTest:false};
fs.writeFileSync(path.join(root,'reports/dialogue-audit.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
