#!/usr/bin/env node
/* Export only. Never auto-score, auto-approve, modify cards, or rewrite examples. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {root,rubric,hash,readLedger,blankPass} = require('./coach-review-core.cjs');
function parse(argv) {
  const opts={kind:'single',limit:10};
  for(let i=0;i<argv.length;i++) {
    const flag=argv[i]; if(flag==='--help'){opts.help=true;continue;}
    if(!['--kind','--limit','--start','--keys','--out'].includes(flag) || !argv[i+1] || argv[i+1].startsWith('--')) throw Error('Unknown or incomplete argument: '+flag);
    opts[flag.slice(2)]=argv[++i];
  }
  opts.limit=Number(opts.limit);
  if(!['single','pair'].includes(opts.kind) || !Number.isInteger(opts.limit)||opts.limit<1||opts.limit>25) throw Error('Use --kind single|pair and --limit 1..25.');
  if(opts.start&&opts.keys)throw Error('Use --start or --keys, not both.');
  return opts;
}
function run(argv) {
  const o=parse(argv);
  if(o.help){console.log('node tools/export-coach-batch.cjs --kind single|pair --limit 10 [--start S01|S01+D01] [--keys S67+D101,S22+D14] [--out NEW_DIRECTORY]\nExported ratings are blank. Review complete exchanges and edit source, not generated shards.');return;}
  const catalog=require('../cards.js'),singles=require('../examples/authoring/single-scenes.json').records;
  const overrides=require('../examples/authoring/pair-scenes.json'),manifest=require('../examples/manifest.json');
  const all=[...catalog.stances,...catalog.drives],byId=Object.fromEntries(all.map(c=>[c.id,c]));
  let keys=o.kind==='single'?all.map(c=>c.id):catalog.stances.flatMap(s=>catalog.drives.map(d=>s.id+'+'+d.id));
  const validKeys=new Set(keys);
  if(o.keys){keys=o.keys.split(',');if(new Set(keys).size!==keys.length)throw Error('Duplicate keys.');for(const key of keys)if(!validKeys.has(key))throw Error('Invalid '+o.kind+' key: '+key);if(keys.length>25)throw Error('At most 25 selections in a batch.');o.limit=keys.length;}
  if(o.start){const i=keys.indexOf(o.start);if(i<0)throw Error('Unknown start key: '+o.start);keys=keys.slice(i);}
  const completed=new Map(readLedger().filter(r=>r.status==='internal-second-pass').map(r=>[r.exampleId,r.afterBeatsSha256]));
  const docs=new Map();const output=[];let selections=0;
  const cardSnapshot=id=>{const c=byId[id];return {id:c.id,type:c.type,title:c.title,instruction:c.instruction,contentVersion:c.contentVersion};};
  for(const key of keys){
    const [sid,did]=key.split('+');let scenes;
    if(o.kind==='single')scenes=singles[key].examples;
    else if(overrides[key])scenes=overrides[key];
    else {if(!docs.has(sid)){docs.clear();docs.set(sid,JSON.parse(fs.readFileSync(path.join(root,manifest.files[sid].plainUrl),'utf8')));}scenes=docs.get(sid).records[did];}
    const pending=scenes.filter(s=>completed.get(s.id)!==hash(s.beats));
    if(!pending.length&&!o.keys)continue;
    const seeds=o.kind==='pair'?{stance:singles[sid].examples,drive:singles[did].examples}:null;
    for(const scene of scenes){
      const reviewed=completed.get(scene.id)===hash(scene.beats);
      output.push({key,exampleId:scene.id,kind:o.kind==='pair'?'combination':'single',status:reviewed?'reference-already-reviewed':'pending',cards:key.split('+').map(cardSnapshot),before:scene,beforeBeatsSha256:hash(scene.beats),seedExamples:seeds,firstPass:blankPass(),recommendedEdits:[],after:null,secondPass:blankPass(),hardGateEvidence:{b2CausesA3:'',b4CausesA5:'',cardContribution:'',sameGameHeightened:''},independentHumanBlindRead:false,liveTested:false});
    }
    if(++selections>=o.limit)break;
  }
  const packet={schema:1,type:'unreviewed-coach-batch',release:require('../package.json').version,datasetId:manifest.datasetId,rubricVersion:rubric.version,sourceHashes:manifest.sourceHashes,kind:o.kind,selectionCount:selections,sceneCount:output.length,notice:'Exported text is not an audit. Scores intentionally null. Review independently before and after rewriting. Reference records must not be overwritten accidentally.',rubric,records:output};
  if(!o.out){console.log(JSON.stringify(packet,null,2));return;}
  const dest=path.resolve(o.out);if(fs.existsSync(dest))throw Error('Output already exists; refusing to overwrite a review batch: '+dest);
  fs.mkdirSync(dest,{recursive:true});fs.writeFileSync(path.join(dest,'batch.json'),JSON.stringify(packet,null,2)+'\n');
  const md=['# Coach review batch','','Status: **pending**. No editorial ratings have been assigned.','',`Selections: ${selections}; scenes: ${output.length}.`,''];
  for(const r of output){md.push(`## ${r.exampleId} (${r.status})`,'');for(const c of r.cards)md.push(`**${c.id} — ${c.title}:** ${c.instruction}`,'');for(const b of r.before.beats)md.push(`**${b.speaker}:** ${b.text}`,'');md.push('First-pass findings:','', 'Recommended edit:','', 'Second-pass findings:','', '---','');}
  fs.writeFileSync(path.join(dest,'batch.md'),md.join('\n'));
  console.log(`Exported ${selections} selections / ${output.length} scenes to ${dest}. No scores assigned or application files changed.`);
}
try{run(process.argv.slice(2));}catch(e){console.error(e.message);process.exitCode=1;}
