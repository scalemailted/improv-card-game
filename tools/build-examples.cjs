/* Build-only scene compiler. Runtime reads these finished exchanges, never an LLM
 * or a coaching template. Composition is not a claim of individual human review. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'examples/data');
const catalog = require('../cards.js');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const fingerprint = card => sha(JSON.stringify([card.id, card.type, card.contentVersion, card.title, card.instruction]));
const sourceDir = path.join(root, 'examples/authoring');
const read = file => JSON.parse(fs.readFileSync(path.join(sourceDir, file), 'utf8'));
const singlesSource = read('single-scenes.json');
const transfers = read('stance-transfers.json');
const bespoke = read('pair-scenes.json');
const overrides = bespoke.records || bespoke;
const sourceNames = ['single-scenes.json', 'stance-transfers.json', 'pair-scenes.json'];
const sourceHashes = Object.fromEntries(sourceNames.map(name => [name, sha(fs.readFileSync(path.join(sourceDir, name)))]));
const allCards = [...catalog.stances, ...catalog.drives];
assert.equal(allCards.length, 480);
assert.equal(Object.keys(singlesSource.records).length, 480);
assert.equal(Object.keys(transfers.records).length, 240);
for (const card of allCards) {
  const source = singlesSource.records[card.id];
  assert.ok(source, 'Missing authored scene: ' + card.id);
  assert.equal(source.fingerprint, fingerprint(card), 'Card wording changed; review and acknowledge its scenes before rebuilding: ' + card.id);
  assert.equal(source.title,card.title,'Authoring title snapshot differs: '+card.id);
  assert.equal(source.instruction,card.instruction,'Authoring instruction snapshot differs: '+card.id);
  assert.equal(source.contentVersion,card.contentVersion,'Authoring content version differs: '+card.id);
  assert.equal(source.examples.length, 2, 'Two authored single scenes required: ' + card.id);
  if (card.type === 'stance') {
    assert.equal(transfers.records[card.id].fingerprint, source.fingerprint, 'Stance transfer review needed: ' + card.id);
    assert.deepEqual(transfers.records[card.id].reviewedSeedHashes, source.examples.map(e=>sha(JSON.stringify(e.beats))), 'Single scene changed; recheck its pair transfer and acknowledge reviewedSeedHashes: ' + card.id);
  }
}
const manifest = {
  schema: 2, version: '0.24.0',
  datasetId: 'acted-scenes-0.24.0-' + sha(JSON.stringify([sourceHashes, allCards.map(fingerprint)])).slice(0, 12),
  entryStatus: 'editorial-preview',
  formats: ['ABA', 'ABABA'],
  actorConvention: 'A holds the requested card(s). B is an illustrative response, not another player’s assigned behavior.',
  fingerprints: {}, contentVersions: {}, files: {}, sourceHashes,
  counts: { singleCards: 480, singleExamples: 0, pairs: 57600, pairExamples: 0, bespokePairs: Object.keys(overrides).length, bespokePairExamples: Object.values(overrides).flat().length }
};
for (const card of allCards) {
  manifest.fingerprints[card.id] = fingerprint(card);
  manifest.contentVersions[card.id] = card.contentVersion;
}
const ids = new Set();
let maxWords = 0, maxSingleWords = 0;
const wordCounts = { ABA: [], ABABA: [] };
function validate(record, key, single = false) {
  assert.ok(!ids.has(record.id), 'Duplicate scene ID: ' + record.id); ids.add(record.id);
  assert.equal(record.format, record.beats.map(beat => beat.speaker).join(''), key);
  assert.ok(['ABA', 'ABABA'].includes(record.format), key);
  if (single) assert.equal(record.format, 'ABA', key);
  const text = record.beats.map(beat => {
    assert.ok(typeof beat.text === 'string' && beat.text.trim().length > 2, 'Empty spoken line: ' + key);
    if (beat.action) assert.match(beat.action, /^I\s/, 'Stage action must be first-person: ' + key);
    return (beat.action || '') + ' ' + beat.text;
  }).join(' ');
  assert.doesNotMatch(text, /[<>{}]|\b(?:your stance|your drive|the card holder|one concrete choice|then heighten|as an ai)\b/i, key);
  const count = text.trim().split(/\s+/).length;
  maxWords = Math.max(maxWords, count); if (single) maxSingleWords = Math.max(maxSingleWords, count);
  wordCounts[record.format].push(count);
  assert.ok(count <= (record.format === 'ABA' ? 110 : 155), 'Scene too long: ' + key + ' (' + count + ')');
}
function write(key, document) {
  const raw = Buffer.from(JSON.stringify(document) + '\n');
  const gzip = zlib.gzipSync(raw, { level: 9, mtime: 0 });
  const base = `${key}.${sha(raw).slice(0,12)}.json`;
  fs.writeFileSync(path.join(output, base), raw); fs.writeFileSync(path.join(output, base + '.gz'), gzip);
  manifest.files[key] = { url: `./examples/data/${base}.gz`, plainUrl: `./examples/data/${base}`, bytes: gzip.length, plainBytes: raw.length, sha256: sha(raw), gzipSha256: sha(gzip) };
}
function runtimeSingle(source) {
  return { id: source.id, format: source.format, beats: source.beats, provenance: 'authored-single' };
}
function fill(template, value, token) {
  assert.equal(template.split(token).length, 2, 'Expected one ' + token + ' in transfer');
  return template.replace(token, value);
}
function compose(stance, drive, variant) {
  const t = transfers.records[stance.id];
  const d = singlesSource.records[drive.id].examples[variant];
  assert.ok(d.transferProp, 'Drive needs a concrete transferable object: ' + drive.id);
  const beats = [
    { speaker: 'A', action: fill(t.action, d.transferProp, '{prop}'), text: fill(t.opening, d.beats[0].text, '{request}') },
    { speaker: 'B', text: d.beats[1].text },
    { speaker: 'A', text: fill(t.response, d.beats[2].text, '{counter}') }
  ];
  if (variant === 1) beats.push({ speaker:'B', text:t.challenge }, { speaker:'A', text:t.closing });
  return { id: `${stance.id}+${drive.id}-${variant ? 'b':'a'}`, format: variant ? 'ABABA' : 'ABA', beats,
    provenance: 'composed-from-authored-scenes', seedRefs: [`${stance.id}-single-${variant?'b':'a'}`, d.id] };
}
fs.mkdirSync(output, { recursive:true });
for (const name of fs.readdirSync(output)) if (/\.(json|gz)$/.test(name)) fs.unlinkSync(path.join(output, name));
const singlesDoc = { schema:2, datasetId:manifest.datasetId, records:{} };
for (const card of allCards) {
  const examples = singlesSource.records[card.id].examples.map(runtimeSingle);
  examples.forEach(record => validate(record, card.id, true));
  singlesDoc.records[card.id] = examples;
  manifest.counts.singleExamples += examples.length;
}
write('singles', singlesDoc);
for (const stance of catalog.stances) {
  const doc = { schema:2, datasetId:manifest.datasetId, stanceId:stance.id, records:{} };
  for (const drive of catalog.drives) {
    const key = stance.id + '+' + drive.id;
    if(overrides[key])for(const scene of overrides[key])assert.deepEqual(scene.reviewedCardFingerprints,[fingerprint(stance),fingerprint(drive)],'Bespoke pair needs a wording review: '+key);
    const examples = overrides[key] ? overrides[key].map(({reviewedCardFingerprints,...scene})=>scene) : [compose(stance, drive, 0), compose(stance, drive, 1)];
    assert.ok(examples.some(scene => scene.format === 'ABA'), 'Every pair needs a short option: ' + key);
    assert.equal(new Set(examples.map(scene => JSON.stringify(scene.beats))).size, examples.length, 'Identical alternatives: ' + key);
    for (const scene of examples) {
      assert.equal(scene.seedRefs?.length, 2, 'Exact single-scene references required: ' + key);
      assert.ok(scene.seedRefs[0].startsWith(stance.id+'-single-') && scene.seedRefs[1].startsWith(drive.id+'-single-'), key);
      validate(scene, key);
    }
    doc.records[drive.id] = examples;
    manifest.counts.pairExamples += examples.length;
  }
  write(stance.id, doc);
}
manifest.counts.totalExamples = manifest.counts.singleExamples + manifest.counts.pairExamples;
manifest.compressedBytes = Object.values(manifest.files).reduce((total,file)=>total+file.bytes,0);
manifest.uncompressedBytes = Object.values(manifest.files).reduce((total,file)=>total+file.plainBytes,0);
manifest.maxWords = maxWords; manifest.maxSingleWords = maxSingleWords;
manifest.wordCounts = Object.fromEntries(Object.entries(wordCounts).map(([kind,counts])=>{counts.sort((a,b)=>a-b);return [kind,{count:counts.length,median:counts[Math.floor(counts.length/2)],max:counts.at(-1)}];}));
fs.writeFileSync(path.join(root,'examples/manifest.json'),JSON.stringify(manifest,null,2)+'\n');
fs.writeFileSync(path.join(root,'examples/manifest.js'),'/* Generated by tools/build-examples.cjs. */\n(function(root){\n"use strict";\nconst value='+JSON.stringify(manifest)+';\nif(typeof module==="object"&&module.exports)module.exports=value;else root.IMPROMPT_EXAMPLE_MANIFEST=value;\n})(typeof globalThis!=="undefined"?globalThis:this);\n');
console.log(JSON.stringify({counts:manifest.counts,compressedBytes:manifest.compressedBytes,uncompressedBytes:manifest.uncompressedBytes,wordCounts:manifest.wordCounts,maxSingleWords},null,2));

// Keep the app-shell singleton precache synchronized with this content-addressed build.
const swPath=path.join(root,'sw.js');
if(fs.existsSync(swPath)){
 let sw=fs.readFileSync(swPath,'utf8');
 sw=sw.replace(/"\.\/examples\/data\/singles\.[a-f0-9]+\.json\.gz"/,JSON.stringify(manifest.files.singles.url));
 sw=sw.replace(/"\.\/examples\/data\/singles\.[a-f0-9]+\.json"/,JSON.stringify(manifest.files.singles.plainUrl));
 fs.writeFileSync(swPath,sw);
}
