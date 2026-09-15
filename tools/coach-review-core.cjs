'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const rubric = require('../editorial/0.26.0-preview.1/rubric.json');
const hash = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
function readLedger() {
  const records = [];
  for (const entry of fs.readdirSync(path.join(root, 'editorial'), {withFileTypes:true})) {
    if (!entry.isDirectory()) continue;
    const directory = path.join(root, 'editorial', entry.name);
    for (const name of fs.readdirSync(directory)) {
      if (!name.endsWith('-review.json')) continue;
      const data = JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8'));
      if (data.rubricVersion === rubric.version && Array.isArray(data.records)) records.push(...data.records);
    }
  }
  return records;
}
function total(pass) { return rubric.criteria.reduce((n,c)=>n+c.weight*pass.ratings[c.id].score/5,0); }
function validPass(pass) {
  return Boolean(pass && rubric.criteria.every(c=>{
    const rating = pass.ratings?.[c.id];
    return rating && Number.isInteger(rating.score) && rating.score>=0 && rating.score<=5 &&
      typeof rating.evidence==='string' && rating.evidence.trim().length>=20;
  }) && Math.abs(total(pass)-pass.weightedTotal)<0.001);
}
function accepted(pass) {
  const g = rubric.internalAcceptance;
  return validPass(pass) && total(pass)>=g.minimumWeightedTotal &&
    rubric.criteria.every(c=>pass.ratings[c.id].score>=g.minimumEachDimension) &&
    pass.ratings.cardFidelity.score>=g.minimumCardFidelity &&
    pass.ratings.responseLogic.score>=g.minimumResponseLogic;
}
function blankPass() { return {ratings:Object.fromEntries(rubric.criteria.map(c=>[c.id,{score:null,evidence:''}])),weightedTotal:null}; }
module.exports = {root, rubric, hash, readLedger, total, validPass, accepted, blankPass};
