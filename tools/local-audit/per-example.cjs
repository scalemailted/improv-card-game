'use strict';
// Editorial acceptance is per example; source application remains journaled and atomic.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const c=require('./core.cjs'),reuse=require('./review-reuse.cjs');
function pendingCorrection(b){return b.technicalRecovery?.kind==='interrupted-phase'&&b.attempts?.length===b.technicalRecovery.startIndex;}
function interruptedCorrection(q,b){const last=b.attempts?.at(-1);return Boolean(b.correctionPolicy&&last?.status==='failed'&&/timedOut=true/.test(last.error||'')&&require('./editorial-policy.cjs').mayStart(q,b));}
function needsIntegration(b){if(b.pendingIntegration)return true;const done=new Set((b.scenes||[]).filter(s=>s.acceptedHash||s.status==='reference').map(s=>s.exampleId)),blocked=new Set((b.exception?.bindingIssues||[]).map(x=>x.key)),ids=b.perExampleFindings?.eligible||(b.exception?.acceptedStaged||[]).filter(id=>!blocked.has(id.split('-single-')[0]));return ids.some(id=>!done.has(id));}
function selection(input,writer,review,doneIds=[]){
 c.validateWriter(input,writer);c.validateReview(c.reviewerInput(input,writer),review);
 const done=new Set(doneIds),eligible=[],staged=[],unresolved=[];
 for(const r of review.records){if(done.has(r.exampleId))continue;const key=input.records.find(x=>x.exampleId===r.exampleId).key;
  if(!r.accept){unresolved.push(r.exampleId);continue;}
  const problems=[...writer.bindings.filter(b=>b.key===key&&!b.compatible).map(b=>({...b,source:'writer'})),...review.bindings.filter(b=>b.key===key&&!b.compatible).map(b=>({...b,source:'reviewer'}))];
  // Exact retentions apply review evidence only: prepare changes no seed or transfer.
  const retained=writer.records.find(w=>w.exampleId===r.exampleId).decision==='retained';
  if(problems.length&&!retained)staged.push({exampleId:r.exampleId,key,reason:'Unresolved card-specific seed/transfer binding',findings:problems});else eligible.push(r.exampleId);
 }
 return {eligible,staged,unresolved};
}
function assertSelection(input,writer,review,ids){const eligible=selection(input,writer,review).eligible;assert.ok(ids.length>0,'Empty integration group');assert.equal(new Set(ids).size,ids.length);for(const id of ids)assert.ok(eligible.includes(id),'Unaccepted example or unresolved binding: '+id);}
function saved(batchDir,b){const a=b.attempts.findLast(a=>a.reviewReference&&['rejected','accepted-artifacts'].includes(a.status));if(!a)return null;const dir=path.join(batchDir,a.id),input=c.read(path.join(dir,'writer.input.json')),writer=reuse.invocation(dir,'writer'),review=reuse.readReview(dir,input,writer.output);c.validateWriter(input,writer.output);c.validateReview(c.reviewerInput(input,writer.output),review);return {attempt:a.id,input,writer:writer.output,review,firstProof:writer.proof,secondProof:c.read(path.join(dir,'reviewer.proof.json'))};}
function verifyGroups(q,b){const d=c.discover(q.root);for(const group of b.integrationGroups||[]){const v=c.read(path.join(q.root,group.completion)),proof=c.read(path.join(q.root,path.dirname(group.completion),'validation.json'));assert.equal(v.status,'complete');assert.deepEqual([...v.newlyRewrittenSceneIds,...v.unchangedReviewedSceneIds].sort(),group.ids.slice().sort());assert.equal(proof.status,'passed');assert.deepEqual(proof.results,group.validation);assert.equal(group.validation.length,3);for(const r of group.validation){assert.equal(r.code,0);assert.equal(r.timedOut,false);}for(const id of group.ids){const s=b.scenes.find(s=>s.exampleId===id);assert.equal(d.done.get(id)?.afterBeatsSha256,s.acceptedHash,'Integrated example drift '+id);assert.ok(['revised','retained'].includes(s.status));}}return d;}
function assertSources(q,b,input){const d=verifyGroups(q,b);for(const s of b.scenes){const actual=d.single[s.key].examples.find(r=>r.id===s.exampleId);if(s.acceptedHash){assert.equal(c.hash(actual.beats),s.acceptedHash);continue;}assert.equal(c.hash(actual),s.sourceRecordHash,'Pending source conflict '+s.exampleId);const original=input?.records.find(r=>r.exampleId===s.exampleId);if(original)assert.equal(c.hash(original.before),s.sourceRecordHash);}}
function transferBase(root,raw,writer){
 const current=c.read(path.join(root,'examples/authoring/stance-transfers.json')).records[raw.key],links=[];
 if(c.hash(current)!==c.hash(raw.transfer)){const strip=t=>{const x=structuredClone(t);delete x.seedBindingHashes;return x;};assert.deepEqual(strip(current),strip(raw.transfer),'Transfer wording changed since review '+raw.key);const d=c.discover(root);
 for(let n=0;n<current.seedBindingHashes.length;n++){if(current.seedBindingHashes[n]===raw.transfer.seedBindingHashes[n])continue;const id=raw.key+'-single-'+(n?'b':'a'),r=d.done.get(id);assert.ok(r,'Unreviewed seed drift '+id);assert.equal(r.beforeBeatsSha256,raw.transfer.seedBindingHashes[n]);assert.equal(r.afterBeatsSha256,current.seedBindingHashes[n]);assert.equal(c.hash(writer.records.find(w=>w.exampleId===id)?.beats),r.afterBeatsSha256,'Reviewed companion changed '+id);links.push({exampleId:id,from:r.beforeBeatsSha256,to:r.afterBeatsSha256,reviewReference:r.reviewReference});}
 }
 return {before:structuredClone(current),reviewedSourceTransfer:raw.transfer,priorIntegratedSeedAmendments:links};
}
function finish(q,b,pending,applied){q.guard=applied.after;b.integrationGroups||=[];if(!b.integrationGroups.some(g=>g.id===pending.id))b.integrationGroups.push(pending);for(const r of pending.records){const s=b.scenes.find(s=>s.exampleId===r.exampleId);s.acceptedHash=r.afterBeatsSha256;s.decision=r.decision;s.status=r.decision;s.reviewReference=pending.review;}delete b.pendingIntegration;
 const complete=b.scenes.every(s=>s.status==='reference'||s.acceptedHash);b.status=complete?'complete':'partial';b.partialTerminal=!complete;if(!complete&&(pendingCorrection(b)||interruptedCorrection(q,b))){b.status='active';b.partialTerminal=false;}b.remainingSceneIds=b.scenes.filter(s=>s.status!=='reference'&&!s.acceptedHash).map(s=>s.exampleId);verifyGroups(q,b);
}
async function integrate(q,b,queueFile,deadline,adapters={}){
 const i=require('./integration.cjs'),batchDir=path.join(path.dirname(queueFile),b.id),persist=adapters.persist||(()=>c.save(queueFile,q));
 if(b.pendingIntegration){const p=b.pendingIntegration;if(!fs.existsSync(p.journal))i.makeTransaction(q.root,p.stage,p.journal,p.folder,q.guard);finish(q,b,p,i.applyTransaction(p.journal,adapters.interruptAfter));persist();return p.ids;}
 const evidence=adapters.evidence||saved(batchDir,b);if(!evidence)return [];assertSources(q,b,evidence.input);
 const chosen=selection(evidence.input,evidence.writer,evidence.review,b.scenes.filter(s=>s.acceptedHash||s.status==='reference').map(s=>s.exampleId));b.perExampleFindings={...chosen,at:new Date().toISOString(),reviewAttempt:evidence.attempt};for(const s of b.scenes){if(s.acceptedHash||s.status==='reference')continue;s.status=chosen.eligible.includes(s.exampleId)||chosen.staged.some(x=>x.exampleId===s.exampleId)?'accepted-staged':chosen.unresolved.includes(s.exampleId)?'unresolved':s.status;}persist();if(!chosen.eligible.length)return [];
 assert.ok(Date.now()<deadline,'Elapsed-time limit before per-example integration');assert.deepEqual(c.fingerprint(q.root),q.guard,'Source drift before per-example integration');
 const part='part-'+String((b.integrationGroups?.length||0)+1).padStart(3,'0'),id=b.id+'-'+part,stage=i.stagePath(),groupDir=path.join(batchDir,part),journal=path.join(groupDir,'integration.json');
 b.stagingHistory||=[];b.stagingHistory.push({stage,group:id,ids:chosen.eligible,startedAt:new Date().toISOString()});persist();
 const prepared=i.prepare(q.root,stage,q,{...b,id},evidence.input,evidence.writer,evidence.review,{ids:chosen.eligible,parentBatch:b.id});
 c.save(path.join(stage,prepared.folder,'worker-evidence.json'),{writer:evidence.writer,reviewer:evidence.review,writerProof:evidence.firstProof,reviewerProof:evidence.secondProof,attempts:b.attempts,perExample:{attempt:evidence.attempt,ids:chosen.eligible,parentBatch:b.id,remaining:chosen.staged.map(x=>x.exampleId).concat(chosen.unresolved)}});
 for(const a of b.attempts){const source=path.join(batchDir,a.id);if(fs.existsSync(source))fs.cpSync(source,path.join(stage,prepared.folder,'attempts',a.id),{recursive:true,filter:p=>!p.endsWith('.workspace.json')});}
 const results=await (adapters.validate||i.validate)(stage,path.join(groupDir,'validation-'+Date.now()),deadline),comparison=c.compareDataset(q.root,stage,chosen.eligible,prepared.folder);
 for(const r of results)if(r.log){r.archivedLog=prepared.folder+'/validation-logs/'+r.script.replace(':','-');for(const suffix of ['.stdout.log','.stderr.log','.process.json']){const target=path.join(stage,r.archivedLog+suffix);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(r.log+suffix,target);}}
 c.save(path.join(stage,prepared.folder,'dependency-comparison.json'),comparison);c.save(path.join(stage,prepared.folder,'validation.json'),{status:'passed',scope:'Accepted per-example atomic group; build, all audits and full tests. Scheduling batch may remain partial.',results});fs.writeFileSync(path.join(stage,prepared.folder,'applied-before-after.md'),c.batchReport(prepared.records));
 const pending={id,folder:prepared.folder,ids:chosen.eligible,records:prepared.records.map(r=>({exampleId:r.exampleId,afterBeatsSha256:r.afterBeatsSha256,decision:r.decision})),completion:prepared.folder+'/completion.json',review:prepared.folder+'/single-batch-review.json',validation:results,journal,stage};b.pendingIntegration=pending;persist();i.makeTransaction(q.root,stage,journal,prepared.folder,q.guard);finish(q,b,pending,i.applyTransaction(journal,adapters.interruptAfter));persist();return chosen.eligible;
}
module.exports={interruptedCorrection,pendingCorrection,needsIntegration,transferBase,selection,assertSelection,saved,verifyGroups,assertSources,finish,integrate};
