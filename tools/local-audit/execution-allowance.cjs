'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),c=require('./core.cjs');
function elapsed(state,queues){return (state.overheadMs||0)+queues.reduce((n,q)=>n+q.elapsedMs,0);}
function remaining(state,queues,now=Date.now()){
 const total=elapsed(state,queues),window=state.executionAllowances?.at(-1);
 if(!window)return Math.max(0,state.maxMinutes*60000-total);
 assert.ok(total>=window.priorElapsedMs,'Cumulative execution history moved backwards');
 return Math.max(0,Math.min(window.minutes*60000-(total-window.priorElapsedMs),Date.parse(window.deadlineAt)-now));
}
function authorize(state,queues,{minutes,authorizationHash,snapshot,now=Date.now()}){
 assert.equal(state.status,'stopped');assert.equal(remaining(state,queues,now),0,'An existing allowance still has time');
 assert.ok(Number.isFinite(minutes)&&minutes>0&&minutes<=240,'Explicit additional window is capped at 240 minutes');
 assert.match(authorizationHash,/^[a-f0-9]{64}$/);assert.ok(snapshot);
 assert.ok(!(state.executionAllowances||[]).some(w=>w.authorizationHash===authorizationHash),'This authorization was already consumed');
 const window={id:'allowance-'+String((state.executionAllowances?.length||0)+1).padStart(3,'0'),minutes,authorizedAt:new Date(now).toISOString(),deadlineAt:new Date(now+minutes*60000).toISOString(),priorElapsedMs:elapsed(state,queues),authorizationHash,snapshot,policy:'Explicit wall-clock recovery window; cumulative queue time and usage are never reset.'};
 state.executionAllowances||=[];state.executionAllowances.push(window);if(state.recoveryGate?.status!=='verified')state.recoveryGate={status:'pending',reason:'Investigate existing blockers and verify a real saved-batch integration before scheduling new authoring.'};state.stopReason='authorized-recovery-window';return window;
}
function grant(file,authorization,minutes,exclusive){
 assert.ok(exclusive,'Use --exclusive-editor');const runner=require('../local-audit-runner.cjs'),state=c.read(file),release=runner.lock(path.dirname(file),state.id);
 let sourceRelease;try{sourceRelease=runner.lock(state.root,state.id);const queues=state.queueFiles.map(c.read),bytes=fs.readFileSync(authorization),snapshot=path.join(path.dirname(file),'allowance-history','before-'+Date.now()+'.json');
 const next=structuredClone(state),window=authorize(next,queues,{minutes,authorizationHash:c.sha(bytes),snapshot});c.save(snapshot,{campaign:state,queues});fs.copyFileSync(authorization,snapshot+'.authorization.txt',fs.constants.COPYFILE_EXCL);c.save(file,next);return window;
 }finally{sourceRelease?.();release();}
}
module.exports={elapsed,remaining,authorize,grant};
