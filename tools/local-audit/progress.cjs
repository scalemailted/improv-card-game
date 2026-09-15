'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {discover,read,hash}=require('./core.cjs');
// Counts come from complete ledgers. Historical assertions belong to their own
// release; future reviews must have their own completion and amendment evidence.
function progress(root=path.resolve(__dirname,'../..')){const d=discover(root);let localSingles=0,localAmendments=0;
 for(const e of fs.readdirSync(path.join(root,'editorial'),{withFileTypes:true})){if(!e.isDirectory()||!e.name.startsWith('local-'))continue;const dir=path.join(root,'editorial',e.name);if(!fs.existsSync(path.join(dir,'single-batch-review.json')))continue;const completion=read(path.join(dir,'completion.json')),review=read(path.join(dir,'single-batch-review.json')),amendments=read(path.join(dir,'single-amendments.json')).amendments;assert.equal(completion.status,'complete');assert.equal(completion.sceneCount,review.records.length);assert.deepEqual([...completion.newlyRewrittenSceneIds,...completion.unchangedReviewedSceneIds].sort(),review.records.map(r=>r.exampleId).sort());assert.deepEqual(amendments.map(a=>a.exampleId).sort(),completion.newlyRewrittenSceneIds.slice().sort());for(const r of review.records){assert.equal(hash(r.after.beats),d.done.get(r.exampleId).afterBeatsSha256);assert.equal(r.freshModelReviewer,true);}localSingles+=review.records.length;localAmendments+=amendments.length;}
 return {...d.progress,localSingles,localAmendments};}
module.exports={progress};
