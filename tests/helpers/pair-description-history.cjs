'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {root,hash}=require('../../tools/coach-review-core.cjs');
// A reviewed transcript stays exact. Later description-only amendments need
// their original invocation evidence, fresh binding review and full hash chain.
function applyDescriptionChain(historical,changes){
 let current=structuredClone(historical);const pending=changes.slice();
 while(pending.length){const index=pending.findIndex(x=>x.beforeRecordHash===hash(current));assert.ok(index>=0,'Unanchored historical pair description amendment');const change=pending.splice(index,1)[0];assert.equal(change.exampleId,historical.id);assert.deepEqual(change.beforeSeedRefs,change.afterSeedRefs,'Reviewed pair references require separate review, not description recovery');current=require('../../tools/local-audit/provenance-amendment.cjs').changedPairs([current],[change])[0];assert.deepEqual({...current,seedUse:historical.seedUse},historical,'A description amendment cannot change reviewed dialogue or metadata');}
 return current;
}
function currentDescription(historical){
 const changes=[];
 for(const dir of fs.readdirSync(path.join(root,'editorial'),{withFileTypes:true}).filter(d=>d.isDirectory()&&d.name.startsWith('local-'))){const folder=path.join(root,'editorial',dir.name),file=path.join(folder,'binding-recovery.json');if(!fs.existsSync(file))continue;const spec=JSON.parse(fs.readFileSync(file,'utf8'));if(spec.schema!==2)continue;const matching=spec.repairs.flatMap(r=>r.changes).filter(x=>x.exampleId===historical.id);if(!matching.length)continue;const evidence=JSON.parse(fs.readFileSync(path.join(folder,'worker-evidence.json'),'utf8'));assert.ok(evidence.bindingRecovery);require('../../tools/local-audit/binding-recovery.cjs').verify(folder,evidence.bindingRecovery);changes.push(...matching);}
 return applyDescriptionChain(historical,changes);
}

module.exports={applyDescriptionChain,currentDescription};
