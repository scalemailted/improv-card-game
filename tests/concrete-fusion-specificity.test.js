"use strict";

const assert = require("node:assert/strict");
const cards = require("../cards.js");
const cardHints = require("../hints/card-hints.js");
const fusionProfiles = require("../hints/fusion-profiles.js");
const concreteFusion = require("../hints/concrete-fusion.js");
const hintEngine = require("../hint-engine.js");

const allCards = [...cards.stances, ...cards.drives];
const byId = (id) => allCards.find((card) => card.id === id);

assert.equal(fusionProfiles.PROFILE_VERSION, "1.0.0");
assert.equal(concreteFusion.FUSION_VERSION, "2.1.0");
assert.equal(Object.keys(fusionProfiles.stanceProfiles).length, 24);
assert.equal(Object.keys(fusionProfiles.driveProfiles).length, 24);
assert.equal(Object.keys(fusionProfiles.packAnchors).length, 10);

for (const card of allCards) {
  const hint = cardHints.get(card);
  assert.ok(hint, `Missing card hint for ${card.id}`);
  for (const seed of hint.manifestationSeeds) {
    assert.ok(seed.context, `${card.id} seed is missing pack context`);
    assert.ok(seed.action, `${card.id} seed is missing concrete action`);
    assert.equal(seed.text, `${seed.context} ${seed.action}`);
  }
}

const genericPreface = /Keep the first move direct and easy to read|Play the central behavior plainly before adding complication/i;

const practicalAvoidance = hintEngine.getCombinationHint(byId("S22"), byId("D14"), 0, "full");
assert.equal(practicalAvoidance.patternId, "mask");
assert.match(practicalAvoidance.wayIn, /practical problem-solving as your escape route/i);
assert.match(practicalAvoidance.firstMove, /who is paying, when it starts, or what safety step is missing/i);
assert.match(practicalAvoidance.firstMove, /forbidden subject/i);
assert.doesNotMatch(practicalAvoidance.firstMove, genericPreface);

const policyRepair = hintEngine.getCombinationHint(byId("S192"), byId("D74"), 0, "full");
assert.equal(policyRepair.patternId, "reinterpretation");
assert.match(policyRepair.wayIn, /formal exit procedure/i);
assert.match(policyRepair.firstMove, /acknowledgment, agreement, or decision/i);
assert.match(policyRepair.repeatableLoop, /each new step more personal/i);

const authoritativeCulprit = hintEngine.getCombinationHint(byId("S01"), byId("D13"), 0, "full");
assert.equal(authoritativeCulprit.patternId, "mask");
assert.match(authoritativeCulprit.wayIn, /investigating the problem you caused/i);
assert.match(authoritativeCulprit.firstMove, /what should be examined first/i);
assert.match(authoritativeCulprit.firstMove, /responsibility seem less likely/i);

const directChannel = hintEngine.getCombinationHint(byId("S01"), byId("D01"), 0, "full");
assert.match(directChannel.firstMove, /Make one small decision before anyone asks/i);
assert.match(directChannel.firstMove, /create one concrete task/i);
assert.doesNotMatch(directChannel.firstMove, genericPreface);
assert.equal(directChannel.fusionVersion, "2.1.0");
assert.equal(directChannel.profileVersion, "1.0.0");
assert.ok(directChannel.stanceAction);
assert.ok(directChannel.driveAction);
assert.ok(directChannel.anchor);

const differentDrive = hintEngine.getCombinationHint(byId("S22"), byId("D13"), 0, "full");
assert.notEqual(practicalAvoidance.wayIn, differentDrive.wayIn);
assert.notEqual(practicalAvoidance.firstMove, differentDrive.firstMove);

const differentStance = hintEngine.getCombinationHint(byId("S21"), byId("D14"), 0, "full");
assert.notEqual(practicalAvoidance.wayIn, differentStance.wayIn);
assert.notEqual(practicalAvoidance.firstMove, differentStance.firstMove);

const angleOutputs = [];
for (let angle = 0; angle < 6; angle += 1) {
  const hint = hintEngine.getCombinationHint(byId("S22"), byId("D14"), angle, "full");
  assert.ok(hint.firstMove);
  assert.ok(hint.repeatableLoop);
  assert.ok(hint.adaptation);
  assert.doesNotMatch(hint.firstMove, genericPreface);
  angleOutputs.push(`${hint.patternId}\n${hint.wayIn}\n${hint.firstMove}`);
}
assert.equal(new Set(angleOutputs).size, 6, "Another angle must produce six materially different tactics");

console.log("✓ v0.21.2 restores card-specific actions, concrete pair synthesis, known-pair exemplars, and six distinct fusion tactics");
