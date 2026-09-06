"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const bible = require("../card-bible.js");
const pack = require("../cards/relationship-knots.js");
const cards = require("../cards.js");
const validator = require("../tools/card-validator.js");

assert.equal(pack.id, "relationship-knots");
assert.equal(pack.status, "playtest");
assert.equal(pack.version, "0.11.0");
assert.equal(pack.stances.length, 24);
assert.equal(pack.drives.length, 24);
assert.deepEqual(pack.stances.map((card) => card.id), Array.from({ length: 24 }, (_, index) => `S${index + 73}`));
assert.deepEqual(pack.drives.map((card) => card.id), Array.from({ length: 24 }, (_, index) => `D${index + 73}`));

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

const candidatePath = path.resolve(__dirname, "../cards/candidates/relationship-knots-candidate-pool.json");
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

for (const role of ["attachment-seeker", "boundary-keeper", "confidant", "loyalist", "memory-keeper", "peacemaker", "reconciler"]) {
  assert.ok(bible.getCoachRole(role), `Missing Relationship Knots coach role: ${role}`);
}
for (const motif of ["abandonment", "affection", "attachment", "boundaries", "closeness", "connection", "distance", "forgiveness", "intimacy", "jealousy", "memory", "promise", "reconciliation", "resentment", "sacrifice"]) {
  assert.ok(bible.motifs.includes(motif), `Missing Relationship Knots motif: ${motif}`);
}

assert.equal(cards.libraryPlanVersion, "1.6.0");
assert.equal(cards.stances.length, 168);
assert.equal(cards.drives.length, 168);
assert.equal(cards.activePackCount, 7);
assert.equal(cards.playtestPackCount, 6);

console.log("✓ Relationship Knots pack, 64-card candidate pool, quota matrix, and relationship metadata passed");
