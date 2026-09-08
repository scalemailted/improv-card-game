'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),zlib=require('node:zlib'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),m=require('../examples/manifest.json'),cards=require('../cards.js');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
let singles=0,pairs=0,records=0,maxWords=0;const ids=new Set();
for(const card of [...cards.stances,...cards.drives])assert.equal(m.fingerprints[card.id],sha(JSON.stringify([card.id,card.type,card.contentVersion,card.title,card.instruction])));
for(const [key,f] of Object.entries(m.files)){
 const plain=fs.readFileSync(path.resolve(root,f.plainUrl)),gz=fs.readFileSync(path.resolve(root,f.url));
 assert.equal(plain.length,f.plainBytes);assert.equal(gz.length,f.bytes);assert.equal(sha(plain),f.sha256);assert.equal(sha(gz),f.gzipSha256);assert.deepEqual(zlib.gunzipSync(gz),plain);
 const doc=JSON.parse(plain);assert.equal(doc.datasetId,m.datasetId);
 assert.equal(Object.keys(doc.records).length,key==='singles'?480:240);
 for(const [id,rs]of Object.entries(doc.records)){
  key==='singles'?singles++:pairs++;
  assert.ok(m.fingerprints[id]);assert.ok(rs.length>=2);
  assert.equal(new Set(rs.map(r=>r.action+r.line)).size,rs.length);
  for(const r of rs){records++;assert.ok(!ids.has(r.id));ids.add(r.id);assert.match(r.action,/^I\s/);assert.doesNotMatch(r.action+r.line,/[<>{}]|your stance|your drive|your cards|one concrete choice/i);assert.ok(r.line.length>8);
   const words=(r.action+' '+r.line).split(/\s+/).length;maxWords=Math.max(words,maxWords);assert.ok(words<=65);assert.ok(['individually-drafted','compiled-from-card-specific-material'].includes(r.provenance));
  }
 }
}
assert.equal(singles,480);assert.equal(pairs,57600);assert.equal(records,m.counts.totalExamples);
const report={result:'PASS',checks:'Structural coverage, hashes, parsing, exact card-version mapping, format, length, ID uniqueness and per-selection variety. Not a semantic-quality certification.',singleCards:singles,exactPairs:pairs,examples:records,maxWords,compressedBytes:m.compressedBytes,plainBytes:m.uncompressedBytes,bespokePairs:m.counts.bespokePairs,independentHumanOrLiveReview:false};
console.log(JSON.stringify(report,null,2));
fs.writeFileSync(path.join(root,'reports/offline-example-audit.json'),JSON.stringify(report,null,2)+'\n');
