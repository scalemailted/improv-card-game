/* Build-time authoring compiler. Browsers only retrieve complete records; they
   never concatenate these source frames or call a language model. */
'use strict';
const fs=require('node:fs'), path=require('node:path'), crypto=require('node:crypto'), zlib=require('node:zlib');
const root=path.resolve(__dirname,'..'), out=path.join(root,'examples/data');
const cards=require('../cards.js');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const fingerprint=c=>sha(JSON.stringify([c.id,c.type,c.contentVersion,c.title,c.instruction]));
const sourceRows=name=>fs.readFileSync(path.join(root,'examples/source',name),'utf8').split(/\r?\n/).filter(l=>l.trim()&&!l.startsWith('#')).map(l=>l.split('|'));
const srows=sourceRows('stance-performances.txt'),drows=sourceRows('drive-performances.txt');
const overrides=require('../examples/source/pair-overrides.json');
function indexed(rows,count){const map={}; for(const row of rows){if(row.length!==count||map[row[0]])throw Error('Invalid/duplicate source row '+row[0]);map[row[0]]=row;}return map;}
const st=indexed(srows,6),dr=indexed(drows,5);
if(srows.length!==240||drows.length!==240)throw Error('Expected exactly 240 individual source entries per deck');
const upper=t=>t.charAt(0).toUpperCase()+t.slice(1);
const record=(id,action,line,provenance='compiled-from-card-specific-material',tactic='')=>({id,action,line:upper(line),provenance,...(tactic?{tactic}:{})});
const manifest={schema:1,version:'0.23.0',datasetId:'act-it-out-0.23.0-'+sha(JSON.stringify([st,dr,overrides,[...cards.stances,...cards.drives].map(fingerprint)])).slice(0,12),entryStatus:'editorial-preview',fingerprints:{},contentVersions:{},files:{},counts:{singleCards:480,singleExamples:0,pairs:57600,pairExamples:0,bespokePairs:Object.keys(overrides).length,bespokePairExamples:Object.values(overrides).flat().length}};
for(const c of [...cards.stances,...cards.drives]){manifest.fingerprints[c.id]=fingerprint(c);manifest.contentVersions[c.id]=c.contentVersion;}
fs.mkdirSync(out,{recursive:true});
for(const f of fs.readdirSync(out)){if(/\.(json|gz)$/.test(f))fs.unlinkSync(path.join(out,f));}
function write(key,doc){const raw=Buffer.from(JSON.stringify(doc)+'\n'),gzip=zlib.gzipSync(raw,{level:9,mtime:0});const tag=sha(raw).slice(0,12),base=`${key}.${tag}.json`;fs.writeFileSync(path.join(out,base),raw);fs.writeFileSync(path.join(out,base+'.gz'),gzip);manifest.files[key]={url:`./examples/data/${base}.gz`,plainUrl:`./examples/data/${base}`,bytes:gzip.length,plainBytes:raw.length,sha256:sha(raw),gzipSha256:sha(gzip)};}
const singles={schema:1,datasetId:manifest.datasetId,records:{}};
for(const c of cards.stances){const row=st[c.id];if(!row)throw Error('Missing '+c.id);const [,a1,f1,a2,f2,ask]=row;if(!f1.includes('{ask}')||!f2.includes('{ask}'))throw Error('Missing request slot '+c.id);singles.records[c.id]=[record(`${c.id}-single-a`,a1,f1.replace('{ask}',upper(ask)),'individually-drafted'),record(`${c.id}-single-b`,a2,f2.replace('{ask}',upper(ask)),'individually-drafted')];}
for(const c of cards.drives){const [,a1,q1,a2,q2]=dr[c.id]||[];if(!a1)throw Error('Missing '+c.id);singles.records[c.id]=[record(`${c.id}-single-a`,a1,q1,'individually-drafted'),record(`${c.id}-single-b`,a2,q2,'individually-drafted')];}
manifest.counts.singleExamples=Object.values(singles.records).flat().length; write('singles',singles);
let maxWords=0,wordy=[];const sources=new Set();
function validateRecord(r,key){if(!/^I\s/.test(r.action)||!r.line||/[<>{}]/.test(r.action+r.line))throw Error('Invalid performance '+key);let n=(r.action+' '+r.line).split(/\s+/).length;maxWords=Math.max(n,maxWords);if(n>65)wordy.push([key,n]);if(sources.has(r.id))throw Error('Duplicate record ID '+r.id);sources.add(r.id);}
for(const [id,rs] of Object.entries(singles.records))rs.forEach(r=>validateRecord(r,id));
for(const s of cards.stances){const [,a1,f1,a2,f2]=st[s.id];const doc={schema:1,datasetId:manifest.datasetId,stanceId:s.id,records:{}};
 for(const d of cards.drives){const [,da1,q1,da2,q2]=dr[d.id],key=s.id+'+'+d.id; // da1/da2 are for standalone Drives; combination acts THROUGH the Stance.
  const rs=overrides[key]||[record(`${key}-a`,a1,f1.replace('{ask}',upper(q1))),record(`${key}-b`,a2,f2.replace('{ask}',upper(q2)))];
  if(new Set(rs.map(r=>r.action+r.line)).size!==rs.length)throw Error('Duplicate angle '+key);
  rs.forEach(r=>validateRecord(r,key));doc.records[d.id]=rs;manifest.counts.pairExamples+=rs.length;
 }write(s.id,doc);
}
if(wordy.length)throw Error('Over word budget: '+JSON.stringify(wordy.slice(0,10)));
manifest.counts.totalExamples=manifest.counts.singleExamples+manifest.counts.pairExamples;
manifest.compressedBytes=Object.values(manifest.files).reduce((n,f)=>n+f.bytes,0);manifest.uncompressedBytes=Object.values(manifest.files).reduce((n,f)=>n+f.plainBytes,0);manifest.maxWords=maxWords;
manifest.sourceHashes={};for(const f of fs.readdirSync(path.join(root,'examples/source')))manifest.sourceHashes[f]=sha(fs.readFileSync(path.join(root,'examples/source',f)));
fs.writeFileSync(path.join(root,'examples/manifest.json'),JSON.stringify(manifest,null,2)+'\n');
fs.writeFileSync(path.join(root,'examples/manifest.js'),'/* Generated by tools/build-examples.cjs. */\n(function(root){\n"use strict";\nconst value='+JSON.stringify(manifest)+';\nif(typeof module==="object"&&module.exports)module.exports=value;else root.IMPROMPT_EXAMPLE_MANIFEST=value;\n})(typeof globalThis!=="undefined"?globalThis:this);\n');
console.log(JSON.stringify({counts:manifest.counts,compressedBytes:manifest.compressedBytes,uncompressedBytes:manifest.uncompressedBytes,maxWords},null,2));
