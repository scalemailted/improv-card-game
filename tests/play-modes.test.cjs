const {test}=require('node:test'),assert=require('node:assert/strict');
const E=require('../deck-engine.js'),cards=require('../cards.js');
function fresh(type,policy='full'){const s=E.createState(cards);E.startSession(s,cards,{playMode:'basic',basicDeck:type,hintPolicy:policy,source:'open',mode:'open'});E.startScene(s,cards);return s}
for(const type of ['stance','drive'])test(`Basic ${type}: isolated queue, filtering, veto, exhaustion, completion and reload`,()=>{
 const s=fresh(type),other=type==='stance'?'drive':'stance';const inactive=()=>JSON.stringify([s[other+'Queue'],s.cycles[other],s.vetoes[other],s.drawFilters[other]]);const before=inactive();
 assert.equal(E.drawCard(s,cards,other),null);assert.equal(E.setDrawFilter(s,cards,other,E.categoriesFor(cards,other)[0]),false);
 s[type+'Queue']=[];const category=E.categoriesFor(cards,type)[0];E.setDrawFilter(s,cards,type,category);E.drawCard(s,cards,type);E.vetoCard(s,cards,type);assert.equal(inactive(),before);assert.equal(E.canComplete(s),true);
 const copy=JSON.parse(JSON.stringify(s));assert(E.isStateUsable(copy,cards,copy.instanceId));assert.equal(copy.current[type+'Id'],s.current[type+'Id']);
 const entry=E.completeScene(s,cards);assert.equal(entry.playMode,'basic');assert.equal(entry.basicDeck,type);assert(entry[type+'Snapshot']);assert(!Object.hasOwn(entry,other+'Snapshot'));assert(!Object.hasOwn(entry,other+'Id'));assert.equal(inactive(),before);assert(E.isStateUsable(s,cards,s.instanceId));
 const queue=JSON.stringify(s[type+'Queue']);E.startSession(s,cards,{playMode:'basic',basicDeck:other});E.drawCard(s,cards,other);assert.equal(JSON.stringify(s[type+'Queue']),queue);
});
test('preferences never change a current hand; legacy v5 current and frozen history stay Advanced',()=>{
 const s=E.createState(cards);E.drawPair(s,cards);E.completeScene(s,cards);E.drawCard(s,cards,'stance');s.version=5;delete s.playPreference;delete s.current.playMode;delete s.current.basicDeck;for(const e of s.history){delete e.playMode;delete e.basicDeck;}const history=JSON.stringify(s.history),current=JSON.stringify(s.current),queue=JSON.stringify(s.driveQueue);const m=E.migrateLegacyState(s,cards);assert(m);assert.equal(JSON.stringify(m.history),history);assert.equal(JSON.stringify(m.current),current);assert.deepEqual(E.requiredTypes(m.current),['stance','drive']);assert(!E.completeScene(m,cards));E.setPlayPreference(m,'basic','drive');assert.equal(JSON.stringify(m.current),current);assert.equal(JSON.stringify(m.driveQueue),queue);E.drawCard(m,cards,'drive');assert(E.completeScene(m,cards));
});
for(const policy of E.HINT_POLICIES)test(`Basic completion/unlock under ${policy}`,()=>{const s=fresh('stance',policy);assert.equal(E.unlockHints(s),false);E.drawCard(s,cards,'stance');assert(E.unlockHints(s));assert(E.completeScene(s,cards));});
