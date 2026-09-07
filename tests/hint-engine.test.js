"use strict";

const assert = require("node:assert/strict");
const cards = require("../cards.js");
const hintBible = require("../hint-bible.js");
const hintEngine = require("../hint-engine.js");
const engine = require("../deck-engine.js");
const exercises = require("../exercises.js");
const { validate } = require("../tools/hint-validator.js");

const stance = cards.stances.find((card) => card.id === "S01");
const drive = cards.drives.find((card) => card.id === "D01");

const first = hintEngine.getSingleHint(stance, 0, "full");
const second = hintEngine.getSingleHint(stance, 1, "full");
assert.equal(first.kind, "single");
assert.notEqual(first.manifestation, second.manifestation);
assert.ok(first.heighten);
assert.equal(hintEngine.getSingleHint(stance, 0, "nudges").heighten, null);
assert.equal(hintEngine.getSingleHint(stance, 0, "off"), null);

const patterns = new Set();
for (let angle = 0; angle < hintBible.combinationPatterns.length; angle += 1) {
  const hint = hintEngine.getCombinationHint(stance, drive, angle, "full");
  patterns.add(hint.patternId);
  assert.match(hint.wayIn, /Top of the Ladder/);
  assert.match(hint.wayIn, /Admit You Need Me/);
  assert.ok(hint.firstMove);
  assert.ok(hint.repeatableLoop);
  assert.ok(hint.adaptation);
}
assert.equal(patterns.size, 6);
const concise = hintEngine.getCombinationHint(stance, drive, 0, "nudges");
assert.ok(concise.wayIn);
assert.ok(concise.firstMove);
assert.equal(concise.repeatableLoop, null);
assert.equal(concise.adaptation, null);

assert.equal(hintEngine.isAvailable("after-attempt", false), false);
assert.equal(hintEngine.isAvailable("after-attempt", true), true);
assert.equal(hintEngine.isAvailable("off", true), false);

const state = engine.createState(cards, () => 0.5);
const exercise = exercises.getPreset("status-clash");
exercise.hintPolicy = "after-attempt";
const selection = exercises.createSessionSelection(exercise, "all");
engine.startSession(state, cards, selection);
engine.startScene(state, cards);
assert.equal(state.current.hintsUnlocked, false);
assert.equal(engine.unlockHints(state), true);
assert.equal(state.current.hintsUnlocked, true);

const audit = validate({ exhaustive: true });
assert.equal(audit.result, "PASS", audit.errors.slice(0, 10).join("\n"));
assert.equal(audit.metrics.personalHands, 57600);
assert.equal(audit.metrics.generatedStructuralAngles, 345600);

console.log("✓ Local single-card nudges, all 57,600 two-card hands, six concrete fusion angles, and coach policy gating passed");
