'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),m=require('../examples/manifest.json'),src=require('../examples/authoring/single-scenes.json'),pair=require('../examples/authoring/pair-scenes.json'),client=require('../examples/library-client.js'),policies=require('../hint-bible.js'),cards=require('../cards.js');
const read=n=>fs.readFileSync(path.join(root,n),'utf8');
const c=id=>[...cards.stances,...cards.drives].find(c=>c.id===id);
test('960 exact-card examples are actual A-B-A exchanges',()=>{
 assert.equal(Object.keys(src.records).length,480);
 for(const record of Object.values(src.records))for(const e of record.examples){assert.equal(e.beats.map(b=>b.speaker).join(''),'ABA');assert.ok(e.beats.every(b=>b.text));assert.notEqual(e.beats[0].text,e.beats[2].text);}
});
test('reference examples demonstrate reported problems with dialogue and responsive follow-through',()=>{
 const clue=src.records.S124.examples[0].beats;assert.match(clue[0].text,/unredacted|inside/i);assert.match(clue[1].text,/private/i);assert.match(clue[2].text,/visitor|insider/i);
 const x=pair['S67+D101'][0];assert.equal(x.format,'ABA');assert.match(x.beats[0].text,/chair.*cancelled.*minutes/i);assert.match(x.beats[1].text,/cancelled/i);assert.match(x.beats[2].text,/authorized/i);
 assert.match(pair['S22+D14'][0].beats[0].text,/prophecies.*maintenance/i);
 assert.match(pair['S23+D163'][0].beats[0].text,/chair.*table/i);
});
test('no model controls, generation calls or explanatory coaching inside nudge dialog',()=>{
 const html=read('index.html'),app=read('app.js');const modal=html.slice(html.indexOf('id="hintDialog"'),html.indexOf('id="exampleSettingsDialog"'));
 assert.doesNotMatch(html,/id="(?:localModelSelect|removeOldModelsButton|hintDialogIntro)"|FULL COACHING/);
 assert.doesNotMatch(app,/createChatCompletion|localModel|\.example\.action|\.example\.line/);
 assert.doesNotMatch(modal,/<details|coaching|first move|heighten|interpretation/i);
 assert.match(modal,/A holds your card\(s\)/);assert.match(app,/result\.example\.beats/);assert.match(app,/textContent=`“\$\{beat.text\}”`/);
});
test('short-scenes policy limits requests to ABA and never launches inference',async()=>{
 const records=pair['S67+D101'];let spawned=0;
 const workerFactory=()=>{spawned++;return {terminate(){},postMessage(message){queueMicrotask(()=>this.onmessage({data:{id:message.id,type:'result',result:{records,key:'S67+D101',datasetId:m.datasetId}}}));}};};
 const lib=client.create({manifest:m,workerFactory,random:()=>.1});
 const req={kind:'combination',entries:['S67','D101'].map(id=>({card:c(id),revealed:true})),policy:policies.getPolicy('nudges'),unlocked:false};
 for(let i=0;i<4;i++){const result=await lib.next(req);assert.equal(result.example.format,'ABA');assert.equal(result.count,1);}
 assert.equal(spawned,1);lib.dispose();
});
test('all versioned runtime assets and singleton precache point to this exact edition',()=>{
 const html=read('index.html'),sw=read('sw.js');const paths=[...html.matchAll(/<script src="\.\/([^"?]+)\?v=([^\"]+)"/g)];
 for(const match of paths){assert.equal(match[2],'0.24.0');assert.ok(fs.existsSync(path.join(root,match[1])));assert.ok(sw.includes(match[1]+'?v=0.24.0'));}
 assert.ok(sw.includes(m.files.singles.url));assert.ok(sw.includes(m.files.singles.plainUrl));assert.doesNotMatch(sw,/skipWaiting\(/);
});
