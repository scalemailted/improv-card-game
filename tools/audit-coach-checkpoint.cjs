'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {root,rubric,hash,readLedger,validPass,accepted}=require('./coach-review-core.cjs');
const manifest=require('../examples/manifest.json');
const singles=require('../examples/authoring/single-scenes.json').records;
const pairs=require('../examples/authoring/pair-scenes.json');
const records=readLedger(),ids=new Set();let singleCount=0,pairCount=0;
for(const r of records){
 assert.ok(!ids.has(r.exampleId),'Conflicting review records: '+r.exampleId);ids.add(r.exampleId);
 assert.equal(r.rubricVersion,rubric.version);
 assert.equal(hash(r.before.beats),r.beforeBeatsSha256);
 assert.equal(hash(r.after.beats),r.afterBeatsSha256);
 assert.ok(validPass(r.firstPass),'Invalid first-pass scores: '+r.exampleId);
 assert.ok(validPass(r.secondPass),'Invalid second-pass scores: '+r.exampleId);
 if(r.status!=='internal-second-pass')continue;
 assert.ok(accepted(r.secondPass),'Recorded acceptance thresholds not met: '+r.exampleId);
 assert.ok(r.hardGates&&Object.values(r.hardGates).every(x=>x===true));
 const source=r.kind==='single'?singles[r.key]?.examples:pairs[r.key];
 const current=source?.find(s=>s.id===r.exampleId);assert.ok(current,'Missing reviewed source');
 assert.deepEqual(current.beats,r.after.beats,'Reviewed dialogue drifted: '+r.exampleId);
 const [sid,did]=r.key.split('+'),file=manifest.files[r.kind==='single'?'singles':sid];
 const doc=JSON.parse(fs.readFileSync(path.join(root,file.plainUrl),'utf8'));
 const runtime=doc.records[r.kind==='single'?sid:did].find(s=>s.id===r.exampleId);
 assert.deepEqual(runtime.beats,r.after.beats,'Dataset needs rebuild: '+r.exampleId);
 r.kind==='single'?singleCount++:pairCount++;
}
const report={result:'PASS',scope:'Review-record integrity, supplied score arithmetic, source and runtime agreement. Not independent semantic evaluation or an automated humour score.',release:require('../package.json').version,rubricVersion:rubric.version,internallyReauditedSingleScenes:singleCount,internallyReauditedPairScenes:pairCount,totalScenes:manifest.counts.totalExamples,pendingUnderThisRubric:manifest.counts.totalExamples-singleCount-pairCount,fullCorpusEditorialAuditComplete:false,independentHumanOrLiveReview:false};
fs.writeFileSync(path.join(root,'reports/coach-checkpoint-audit.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
