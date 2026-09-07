"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const bible = require("../card-bible.js");
const pack = require("../cards/power-games.js");
const cards = require("../cards.js");
const validator = require("../tools/card-validator.js");

assert.equal(pack.id, "power-games");
assert.equal(pack.status, "playtest");
assert.equal(pack.version, "0.18.0");
assert.equal(pack.stances.length, 24);
assert.equal(pack.drives.length, 24);
assert.deepEqual(pack.stances.map((card) => card.id), Array.from({ length: 24 }, (_, index) => `S${index + 49}`));
assert.deepEqual(pack.drives.map((card) => card.id), Array.from({ length: 24 }, (_, index) => `D${index + 49}`));

const packAudit = validator.validatePack(pack);
assert.deepEqual(packAudit.errors, []);
assert.deepEqual(packAudit.warnings, []);

for (const category of bible.categories) {
  const packCards = [...pack.stances, ...pack.drives].filter((card) => card.categoryId === category.id);
  const expected = category.deck === "stance" ? 6 : category.id === "direct-objectives" ? 12 : 6;
  assert.equal(packCards.length, expected, `${category.label} quota`);
  for (const subtheme of category.subthemes) {
    assert.equal(packCards.filter((card) => card.subthemeId === subtheme.id).length, 1, `${category.label} / ${subtheme.label}`);
  }
}

const candidatePath = path.resolve(__dirname, "../cards/candidates/power-games-candidate-pool.json");
const pool = JSON.parse(fs.readFileSync(candidatePath, "utf8"));
assert.equal(pool.counts.total, 64);
assert.equal(pool.counts.selected, 48);
assert.equal(pool.counts.held, 8);
assert.equal(pool.counts.rejected, 8);
assert.equal(pool.counts.stanceCandidates, 32);
assert.equal(pool.counts.driveCandidates, 32);
assert.equal(pool.candidates.length, 64);
assert.equal(pool.candidates.filter((item) => item.disposition === "selected").length, 48);
assert.equal(new Set(pool.candidates.map((item) => item.candidateId)).size, 64);

const selectedIds = new Set(pool.candidates.filter((item) => item.disposition === "selected").map((item) => item.reservedId));
for (const card of [...pack.stances, ...pack.drives]) {
  assert.ok(selectedIds.has(card.id), `Candidate pool must select ${card.id}`);
}

for (const role of ["broker", "challenger", "claimant", "enforcer", "gatekeeper", "patron", "successor"]) {
  assert.ok(bible.getCoachRole(role), `Missing Power Games coach role: ${role}`);
}
for (const motif of ["access", "allegiance", "autonomy", "compliance", "hierarchy", "influence", "leverage", "legitimacy", "patronage", "reputation", "succession", "territory"]) {
  assert.ok(bible.motifs.includes(motif), `Missing Power Games motif: ${motif}`);
}

assert.equal(cards.libraryPlanVersion, "1.10.0");
assert.equal(cards.stances.length, 240);
assert.equal(cards.drives.length, 240);
assert.equal(cards.activePackCount, 10);
assert.equal(cards.playtestPackCount, 9);

console.log("✓ Power Games pack, 64-card candidate pool, quota matrix, and power metadata passed");
