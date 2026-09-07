"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const bible = require("../card-bible.js");
const pack = require("../cards/competition-consequences.js");
const cards = require("../cards.js");
const validator = require("../tools/card-validator.js");

assert.equal(pack.id, "competition-consequences");
assert.equal(pack.status, "playtest");
assert.equal(pack.version, "0.18.0");
assert.equal(pack.sequence, 9);
assert.equal(pack.stances.length, 24);
assert.equal(pack.drives.length, 24);
assert.deepEqual(pack.stances.map((card) => card.id), Array.from({ length: 24 }, (_, index) => `S${index + 193}`));
assert.deepEqual(pack.drives.map((card) => card.id), Array.from({ length: 24 }, (_, index) => `D${index + 193}`));

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

const poolPath = path.resolve(__dirname, "../cards/candidates/competition-consequences-candidate-pool.json");
const pool = JSON.parse(fs.readFileSync(poolPath, "utf8"));
assert.equal(pool.packId, "competition-consequences");
assert.equal(pool.candidates.length, 64);
assert.equal(pool.candidates.filter((item) => item.disposition === "selected").length, 48);
assert.equal(pool.candidates.filter((item) => item.disposition === "held").length, 8);
assert.equal(pool.candidates.filter((item) => item.disposition === "rejected").length, 8);
assert.equal(new Set(pool.candidates.map((item) => item.candidateId)).size, 64);

const selectedIds = new Set(pool.candidates.filter((item) => item.disposition === "selected").map((item) => item.reservedId));
for (const card of [...pack.stances, ...pack.drives]) {
  assert.ok(selectedIds.has(card.id), `Candidate pool must select ${card.id}`);
}

for (const role of ["contender", "scorekeeper", "referee", "dealmaker", "accountability-keeper", "stakes-raiser"]) {
  assert.ok(bible.getCoachRole(role), `Missing Competition & Consequences coach role: ${role}`);
}
for (const motif of ["accountability", "advantage", "ambition", "bargains", "commitment", "comparison", "concession", "cost", "defeat", "disadvantage", "losing", "nostalgia", "odds", "outcome", "penalty", "performance", "reward", "rivalry", "score", "stakes", "teamwork", "tradeoffs", "victory", "winning"]) {
  assert.ok(bible.motifs.includes(motif), `Missing Competition & Consequences motif: ${motif}`);
}

assert.equal(cards.libraryPlanVersion, "1.10.0");
assert.equal(cards.stances.length, 240);
assert.equal(cards.drives.length, 240);
assert.equal(cards.activePackCount, 10);
assert.equal(cards.playtestPackCount, 9);

console.log("✓ Competition & Consequences pack, 64-card candidate pool, quota matrix, and stakes metadata passed");
