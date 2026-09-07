"use strict";

const assert = require("node:assert/strict");
const cardBible = require("../card-bible.js");
const hintBible = require("../hint-bible.js");
const cardHints = require("../hints/card-hints.js");
const { validate } = require("../tools/hint-validator.js");

assert.equal(hintBible.HINT_SCHEMA_VERSION, 2);
assert.equal(hintBible.HINT_LIBRARY_VERSION, "2.1.0");
assert.equal(hintBible.DEFAULT_HINT_POLICY, "full");
assert.deepEqual(hintBible.policies.map((policy) => policy.id), ["full", "nudges", "after-attempt", "off"]);
assert.deepEqual(hintBible.combinationPatterns.map((pattern) => pattern.id), [
  "channel", "mask", "friction", "escalation", "reinterpretation", "counterweight"
]);

const subthemes = cardBible.categories.flatMap((category) => category.subthemes.map((subtheme) => subtheme.id));
assert.equal(subthemes.length, 48);
assert.equal(Object.keys(hintBible.subthemeGuidance).length, 48);
assert.equal(Object.keys(hintBible.packLenses).length, 10);
for (const pack of cardBible.packPlan) {
  const lens = hintBible.getPackLens(pack.id);
  assert.ok(lens, `Missing pack lens for ${pack.id}`);
  assert.equal(lens.manifestations.length, 2, `${pack.id} should have two manifestation lenses`);
}
for (const id of subthemes) {
  const guidance = hintBible.getSubthemeGuidance(id);
  assert.ok(guidance, `Missing ${id}`);
  assert.equal(guidance.manifestations.length, 2, `${id} should have two manifestation seeds`);
}

assert.equal(cardHints.cardCount, 480);
assert.equal(cardHints.seedCount, 960);
const resolvedSeedTexts = new Set();
for (const hint of Object.values(cardHints.byId)) {
  assert.equal(hint.manifestationSeeds.length, 2);
  assert.ok(hint.packId);
  assert.ok(hint.heighten);
  for (const seed of hint.manifestationSeeds) {
    assert.equal(resolvedSeedTexts.has(seed.text), false, `Duplicate resolved seed: ${seed.text}`);
    resolvedSeedTexts.add(seed.text);
  }
}
assert.equal(resolvedSeedTexts.size, 960);

const audit = validate({ exhaustive: false });
assert.equal(audit.result, "PASS", audit.errors.join("\n"));
assert.equal(audit.errors.length, 0);
assert.equal(audit.warnings.length, 0);

console.log("✓ Hint Bible taxonomy, pack lenses, 960 distinct card-specific seeds, policies, and holder-only acceptance rules passed");
