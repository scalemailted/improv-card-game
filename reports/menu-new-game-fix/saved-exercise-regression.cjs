const assert=require('node:assert/strict');
const E=require('../../deck-engine.js'),X=require('../../exercises.js'),cards=require('../../cards.js');
const s=E.createState(cards);
const exercise=X.normalizeExercise({...X.OPEN_PLAY,mode:'mirror',id:'custom-preservation-test',source:'custom',name:'Saved exercise'}, {forceSource:'custom'});
assert(exercise);assert(E.upsertSavedExercise(s,exercise));
E.drawPair(s,cards);E.completeScene(s,cards);E.drawPair(s,cards);
const saved=JSON.stringify(s.savedExercises),history=JSON.stringify(s.history),sessions=JSON.stringify(s.sessions);
for(const selection of [{playMode:'basic',basicDeck:'stance'},{playMode:'basic',basicDeck:'drive'},{playMode:'advanced'},X.createSessionSelection(exercise,'all')]){
 E.startNewGame(s,cards,selection);assert.equal(JSON.stringify(s.savedExercises),saved);assert.equal(JSON.stringify(s.history),history);assert.equal(JSON.stringify(s.sessions.slice(0,1)),sessions);assert(E.isStateUsable(s,cards,s.instanceId));
}
console.log('PASS: nonempty custom exercise, completed snapshots and historical session unchanged across four explicit new games.');
