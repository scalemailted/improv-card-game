'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),zlib=require('node:zlib'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),m=require('../examples/manifest.json'),cards=require('../cards.js');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const source=require('../examples/authoring/single-scenes.json');
let singles=0,pairs=0,records=0,maxWords=0;const ids=new Set(),formats={ABA:0,ABABA:0},provenance={};
for(const card of [...cards.stances,...cards.drives])assert.equal(m.fingerprints[card.id],sha(JSON.stringify([card.id,card.type,card.contentVersion,card.title,card.instruction])));
for(const [key,f] of Object.entries(m.files)){
 const plain=fs.readFileSync(path.resolve(root,f.plainUrl)),gz=fs.readFileSync(path.resolve(root,f.url));
 assert.equal(plain.length,f.plainBytes);assert.equal(gz.length,f.bytes);assert.equal(sha(plain),f.sha256);assert.equal(sha(gz),f.gzipSha256);assert.deepEqual(zlib.gunzipSync(gz),plain);
 const doc=JSON.parse(plain);assert.equal(doc.schema,2);assert.equal(doc.datasetId,m.datasetId);
 assert.equal(Object.keys(doc.records).length,key==='singles'?480:240);
 for(const [id,rs]of Object.entries(doc.records)){
  key==='singles'?singles++:pairs++;
  assert.ok(m.fingerprints[id]);assert.equal(rs.length,2);assert.ok(rs.some(r=>r.format==='ABA'));
  assert.equal(new Set(rs.map(r=>JSON.stringify(r.beats))).size,rs.length);
  for(const r of rs){
   records++;assert.ok(!ids.has(r.id));ids.add(r.id);
   assert.equal(r.format,r.beats.map(b=>b.speaker).join(''));assert.ok(['ABA','ABABA'].includes(r.format));formats[r.format]++;
   if(key==='singles')assert.equal(r.format,'ABA');
   const text=r.beats.map(b=>{assert.ok(typeof b.text==='string'&&b.text.length>2);if(b.action)assert.match(b.action,/^I\s/);return (b.action||'')+' '+b.text;}).join(' ');
   assert.doesNotMatch(text,/[<>{}]|your stance|your drive|your cards|one concrete choice|then heighten/i);
   const words=text.trim().split(/\s+/).length;maxWords=Math.max(words,maxWords);assert.ok(words<=(r.format==='ABA'?110:155));
   assert.ok(['authored-single','authored-pair','composed-from-authored-scenes'].includes(r.provenance));provenance[r.provenance]=(provenance[r.provenance]||0)+1;
   if(key!=='singles'){
    assert.equal(r.seedRefs.length,2);
    assert.ok(source.records[key].examples.some(s=>s.id===r.seedRefs[0]));
    assert.ok(source.records[id].examples.some(s=>s.id===r.seedRefs[1]));
   }
  }
 }
}
for(const [name,hash]of Object.entries(m.sourceHashes))assert.equal(sha(fs.readFileSync(path.join(root,'examples/authoring',name))),hash,'Changed source: rebuild examples');
assert.equal(singles,480);assert.equal(pairs,57600);assert.equal(records,m.counts.totalExamples);
const report={result:'PASS',checks:'Complete 480-card and 57,600-pair coverage; turn order; real gzip bytes and hashes; exact card revisions and authored-seed references; text format and length; unique alternatives. These are structural tests, not a semantic-quality certification.',singleCards:singles,exactPairs:pairs,examples:records,formats,provenance,maxWords,compressedBytes:m.compressedBytes,plainBytes:m.uncompressedBytes,wordCounts:m.wordCounts,independentHumanOrLiveReview:false};
console.log(JSON.stringify(report,null,2));fs.mkdirSync(path.join(root,'reports'),{recursive:true});fs.writeFileSync(path.join(root,'reports/acted-scene-audit.json'),JSON.stringify(report,null,2)+'\n');
