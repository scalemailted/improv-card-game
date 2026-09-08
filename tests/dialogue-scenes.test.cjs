'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),singles=require('../examples/authoring/single-scenes.json').records,m=require('../examples/manifest.json'),pairs=require('../examples/authoring/pair-scenes.json');
const text=file=>fs.readFileSync(path.join(root,file),'utf8');
test('all 960 internally rewritten singles have five self-contained spoken turns and a per-card review note',()=>{
 assert.equal(Object.keys(singles).length,480);const seen=new Set();
 for(const c of Object.values(singles)){assert.ok(c.editorialNote.length>35);for(const e of c.examples){
  assert.equal(e.format,'ABABA');assert.deepEqual(e.beats.map(b=>b.speaker),['A','B','A','B','A']);
  assert.ok(e.beats.every(b=>!Object.hasOwn(b,'action')));assert.ok(e.beats.reduce((n,b)=>n+b.text.split(/\s+/).length,0)<=75);
  assert.ok(!seen.has(e.beats[0].text));seen.add(e.beats[0].text);assert.equal(e.exampleVersion,'0.25.0');
 }}assert.equal(seen.size,960);
});
test('the renderer shows only dialogue; it never hides required setup in a stage direction',()=>{
 assert.doesNotMatch(text('app.js'),/scene-action|if\(beat\.action\)/);assert.doesNotMatch(text('styles.css'),/\.scene-action/);
 assert.match(text('app.js'),/line\.textContent=beat\.text/);
});
test('compiled pairs preserve both responsive B lines and the final Drive turn; retain pending-review status',()=>{
 for(const sid of ['S02','S22','S67','S124','S192','S240']){
  const doc=JSON.parse(text(m.files[sid].plainUrl));
  for(const did of ['D01','D14','D101','D163','D217','D240']){
   if(pairs[sid+'+'+did])continue;
   doc.records[did].forEach((scene,i)=>{
    assert.equal(scene.editorialStatus,'pair-review-pending');
    for(const n of [1,3,4])assert.deepEqual(scene.beats[n],singles[did].examples[i].beats[n]);
    assert.deepEqual(scene.seedRefs,[singles[sid].examples[i].id,singles[did].examples[i].id]);
   });
  }
 }
});
test('bespoke combinations join both cards and retain exact current seed references',()=>{
 assert.equal(Object.keys(pairs).length,25);
 for(const [key,es]of Object.entries(pairs))for(const [i,e]of es.entries()){
  assert.equal(e.format,'ABABA');assert.equal(e.editorialStatus,'internal-editorial-pass');assert.ok(e.seedUse.length>50);
  assert.deepEqual(e.seedRefs,key.split('+').map(id=>singles[id].examples[i].id));
 }
 // Fixed writing regressions, not a supposed semantic validator for the full corpus.
 assert.match(pairs['S67+D101'][0].beats[2].text,/upward.*outward/);
 assert.match(pairs['S23+D163'][0].beats[0].text,/paperclip.*flying tray/);
 assert.match(pairs['S22+D14'][0].beats[0].text,/ceiling.*floods.*pipe.*maintenance/);
});
test('brief policy measures complete dialogues, never drops A final response to make ABA',()=>{
 assert.doesNotMatch(text('examples/library-client.js'),/format==='ABA'|\.slice\(0,3\)/);
 assert.match(text('examples/library-client.js'),/minimum = Math\.min/);
 assert.match(text('hint-bible.js'),/shorter available five-turn/);
});
test('short viewports scroll the full transcript rather than shrinking and clipping its fifth turn',()=>{
 assert.match(text('styles.css'), /#hintDialogBody\s*\{\s*display:\s*block;/);
 assert.match(text('styles.css'), /#hintDialogBody\s*\{[^}]*overflow-y:\s*auto/);
});
