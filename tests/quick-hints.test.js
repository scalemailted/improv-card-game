"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const cards = require("../cards");
const quick = require("../hints/quick-hints");
const engine = require("../hint-engine");
assert.equal(Object.keys(quick.examples).length, 48);
for (const card of [...cards.stances, ...cards.drives]) {
  for (const angle of [0,1]) {
    const example=quick.single(card,angle);
    assert.ok(example && example!==card.instruction, `${card.id} needs an example, not its description`);
    assert.ok(example.split(/\s+/).length<=40, `${card.id} is too wordy`);
  }
  assert.notEqual(quick.single(card,0),quick.single(card,1));
}
const stance=cards.stances.find(c=>c.id==='S22'), drive=cards.drives.find(c=>c.id==='D14');
assert.match(quick.pair(stance,drive,engine.getCombinationHint(stance,drive),0),/paying/);
assert.notEqual(quick.pair(stance,drive,engine.getCombinationHint(stance,drive),0),quick.pair(stance,drive,engine.getCombinationHint(stance,drive),1));
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
assert.doesNotMatch(html,/hintDialogIntro|hint-pattern-pill/);
for(const id of ['exampleSettingsDialog','downloadExamplesButton','clearExamplesButton']) assert.ok(html.includes(`id="${id}"`));
assert.doesNotMatch(html, /src="[^"]*(?:quick-hints|local-models|local-hints)/);
console.log("✓ Legacy hint baseline retained for comparison; NOT loaded by the v0.23 browser UI");
