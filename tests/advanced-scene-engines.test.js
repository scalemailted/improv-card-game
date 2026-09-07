"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const bible = require("../card-bible.js");
const pack = require("../cards/advanced-scene-engines.js");
const cards = require("../cards.js");
const validator = require("../tools/card-validator.js");

assert.equal(pack.id, "advanced-scene-engines");
assert.equal(pack.status, "playtest");
assert.equal(pack.version, "0.17.0");
assert.equal(pack.sequence, 10);
assert.equal(pack.stances.length, 24);
assert.equal(pack.drives.length, 24);
assert.deepEqual(pack.stances.map((card) => card.id), Array.from({ length: 24 }, (_, index) => `S${index + 217}`));
assert.deepEqual(pack.drives.map((card) => card.id), Array.from({ length: 24 }, (_, index) => `D${index + 217}`));

const packAudit = validator.validatePack(pack);
assert.deepEqual(packAudit.errors, []);
assert.deepEqual(packAudit.warnings, []);

for (const category of bible.categories) {
  const packCards = [...pack.stances, ...pack.drives].filter((card) => card.categoryId === category.id);
  const expected = category.deck === "stance" ? 6 : category.id === "direct-objectives" ? 12 : 6;
  assert.equal(packCards.length, expected, `${category.label} quota`);
  for (const subtheme of category.subthemes) {
    assert.equal(packCards.filter((card) => card.subthemeId === subtheme.id).length, 1, `${category.label} / ${subtheme.label} quota`);
  }
}

const poolPath = path.resolve(__dirname, "../cards/candidates/advanced-scene-engines-candidate-pool.json");
const pool = JSON.parse(fs.readFileSync(poolPath, "utf8"));
assert.equal(pool.packId, "advanced-scene-engines");
assert.equal(pool.candidates.length, 64);
assert.equal(pool.candidates.filter((item) => item.disposition === "selected").length, 48);
assert.equal(pool.candidates.filter((item) => item.disposition === "held").length, 8);
assert.equal(pool.candidates.filter((item) => item.disposition === "rejected").length, 8);
assert.equal(new Set(pool.candidates.map((item) => item.candidateId)).size, 64);

const selectedIds = new Set(pool.candidates.filter((item) => item.disposition === "selected").map((item) => item.reservedId));
for (const card of [...pack.stances, ...pack.drives]) {
  assert.ok(selectedIds.has(card.id), `Candidate pool must select ${card.id}`);
}

for (const role of ["scene-architect", "callback-builder", "reversal-maker", "delayed-revealer", "double-binder", "pattern-weaver"]) {
  assert.ok(bible.getCoachRole(role), `Missing Advanced Scene Engines coach role: ${role}`);
}
for (const motif of ["ambiguity", "callback", "contradiction", "delay", "delayed-reveal", "double-bind", "echo", "escalation", "foreshadowing", "perspective", "recontextualization", "repetition", "reversal", "structure", "subtext", "symmetry", "turning-point"]) {
  assert.ok(bible.motifs.includes(motif), `Missing Advanced Scene Engines motif: ${motif}`);
}

assert.equal(cards.libraryPlanVersion, "1.9.0");
assert.equal(cards.stances.length, 240);
assert.equal(cards.drives.length, 240);
assert.equal(cards.activePackCount, 10);
assert.equal(cards.playtestPackCount, 9);

console.log("✓ Advanced Scene Engines pack, 64-card candidate pool, quota matrix, and structural metadata passed");
