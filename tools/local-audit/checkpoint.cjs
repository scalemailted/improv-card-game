'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const c=require('./core.cjs'),i=require('./integration.cjs'),{command}=require('./worker.cjs');
function includeReport(src){return !/(?:^|[\\/])(?:campaign-snapshot|local-queue-snapshot|extracted|source|node_modules|__pycache__)(?:[\\/]|$)|\.zip$|\.workspace\.json$/.test(src);}
async function checkpoint(queueFile,options){
 const {lock,verifyCompleted}=require('../local-audit-runner.cjs'),q=c.read(queueFile);assert.ok(options['exclusive-editor']===true,'Close other editors and pass --exclusive-editor');assert.ok(['complete','stopped'].includes(q.status),'Checkpoint requires a stopped runner');const release=lock(q.root,q.id);
 try{
  for(const b of q.batches){if(b.status==='complete')verifyCompleted(q,b);else if(b.integrationGroups?.length)require('./per-example.cjs').verifyGroups(q,b);}assert.deepEqual(c.fingerprint(q.root),q.guard,'Checkpoint source drift');
  const out=path.resolve(options.out||path.join(q.root,'releases','Imprompt-'+q.publicVersion+'-local-'+q.id+'.zip'));assert.ok(!fs.existsSync(out),'Checkpoint output occupied');const attestation=out+'.verification.json';assert.ok(!fs.existsSync(attestation));
  const work=fs.mkdtempSync(path.join(os.tmpdir(),'imprompt-release-')),stage=path.join(work,'source'),extracted=path.join(work,'extracted'),deadline=Date.now()+Number(options['max-minutes']||60)*60000;c.copySource(q.root,stage);
  if(fs.existsSync(path.join(q.root,'reports')))fs.cpSync(path.join(q.root,'reports'),path.join(stage,'reports'),{recursive:true,filter:src=>includeReport(path.relative(path.join(q.root,'reports'),src))});
  // Version changes are deliberately outside this internal runner. One local
  // checkpoint package is built only at this explicit boundary.
  const queueSnapshot=path.join(stage,'reports','local-queue-snapshot');fs.mkdirSync(queueSnapshot,{recursive:true});fs.copyFileSync(queueFile,path.join(queueSnapshot,'queue.json'));c.save(path.join(queueSnapshot,'scope.json'),{scope:'Queue state only. Completed model proofs remain in editorial ledgers; original attempts, recovery histories and working snapshots are preserved locally.',excluded:['previous release ZIPs','prior extraction directories','redundant queue snapshots','temporary dependencies']});
  const sourceTests=await i.validate(stage,path.join(work,'source-validation'),deadline);const sourceGuard=c.fingerprint(stage);assert.deepEqual(sourceGuard,q.guard,'Release rebuild must reproduce integrated source');
  const python=options.python||'python';const pending=path.join(work,'checkpoint.zip');const pack=await command(python,[path.join(q.root,'tools/local-audit/package.py'),stage,pending,extracted],q.root,path.join(work,'package'),deadline-Date.now());assert.equal(pack.code,0,'ZIP creation/extraction failed');
  assert.deepEqual(c.fingerprint(extracted),sourceGuard,'Fresh extraction differs from source');const extractedTests=await i.validate(extracted,path.join(work,'extraction-validation'),deadline);assert.deepEqual(c.fingerprint(extracted),sourceGuard,'Extracted rebuild is not reproducible');
  let browser={status:'not-run',reason:'No --browser flag supplied; native/offline checks unavailable for this checkpoint. This is recorded, not treated as a browser pass.'};
  if(options.browser===true){const keys=q.batches.flatMap(b=>b.keys).join(','),envKeys=process.env.NATIVE_KEYS,envOut=process.env.NATIVE_OUT;try{process.env.NATIVE_KEYS=keys;process.env.NATIVE_OUT=path.join(work,'native-browser');const r=await command(python,['tools/browser-single-batch-native.py'],extracted,path.join(work,'native-browser-check'),deadline-Date.now());assert.equal(r.code,0,'Native/offline check failed');browser={status:'passed',keys,process:r,report:c.read(path.join(work,'native-browser','results.json'))};}finally{if(envKeys===undefined)delete process.env.NATIVE_KEYS;else process.env.NATIVE_KEYS=envKeys;if(envOut===undefined)delete process.env.NATIVE_OUT;else process.env.NATIVE_OUT=envOut;}}
  assert.deepEqual(c.fingerprint(q.root),q.guard,'Repository changed during checkpoint');fs.mkdirSync(path.dirname(out),{recursive:true});fs.copyFileSync(pending,out,fs.constants.COPYFILE_EXCL);
  const report={status:'verified-local-checkpoint',queue:q.id,publicVersion:q.publicVersion,zip:out,zipSha256:c.sha(fs.readFileSync(out)),files:Object.keys(sourceGuard).length,sourceTests,extractedTests,browser,work,progress:c.discover(q.root).progress,summary:c.summary(q),noPublicVersionChange:true};c.save(attestation,report);q.checkpoint={zip:out,attestation,sha256:report.zipSha256};c.save(queueFile,q);return report;
 }finally{release();}
}
module.exports={checkpoint,includeReport};
