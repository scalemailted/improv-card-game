'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const c=require('../tools/local-audit/core.cjs'),checkpoint=require('../tools/local-audit/source-checkpoint.cjs');
test('source-only pause preserves source, accepted queue evidence and explicit unverified release status',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'imprompt-source-fixture-'));fs.writeFileSync(path.join(root,'scene.txt'),'FIXTURE accepted scene');
 const file=path.join(root,'.audit-runs/campaign/campaign.json'),qfile=path.join(root,'.audit-runs/queue.json'),q={guard:c.fingerprint(root),id:'fixture',batches:[{id:'batch-001',status:'partial',validation:[{code:0}],integrationGroups:[{ids:['FIXTURE-accepted']}]}]};c.save(qfile,q);
 const state={root,queueFiles:[qfile],status:'stopped',stopReason:'elapsed-time-limit'};c.save(file,state);const before=c.hash(q),m=checkpoint.save(state,file);
 assert.equal(m.distributionZip,false);assert.equal(m.releaseVerified,false);assert.equal(m.stopReason,'elapsed-time-limit');assert.deepEqual(c.fingerprint(m.source),q.guard);assert.equal(c.hash(c.read(qfile)),before);assert.deepEqual(m.validation[0].batches[0].integrationGroups,q.batches[0].integrationGroups);assert.equal(state.sourceCheckpoints.length,1);
 fs.writeFileSync(path.join(root,'scene.txt'),'FIXTURE unaccounted drift');assert.throws(()=>checkpoint.save(state,file),/unaccounted source drift/);assert.equal(c.hash(c.read(qfile)),before);
});
