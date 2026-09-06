"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const bible = require("../card-bible.js");
const pack = require("../cards/secrets-schemes.js");
const cards = require("../cards.js");
const validator = require("../tools/card-validator.js");

assert.equal(pack.id, "secrets-schemes");
assert.equal(pack.status, "playtest");
assert.equal(pack.version, "0.13.0");
assert.equal(pack.stances.length, 24);
assert.equal(pack.drives.length, 24);
assert.deepEqual(pack.stances.map((card) => card.id), Array.from({ length: 24 }, (_, index) => `S${index + 121}`));
assert.deepEqual(pack.drives.map((card) => card.id), Array.from({ length: 24 }, (_, index) => `D${index + 121}`));

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

const candidatePath = path.resolve(__dirname, "../cards/candidates/secrets-schemes-candidate-pool.json");
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

for (const role of ["conspirator", "informant", "skeptic", "witness", "decoy", "strategist"]) {
  assert.ok(bible.getCoachRole(role), `Missing Secrets & Schemes coach role: ${role}`);
}
for (const motif of ["alibi", "clues", "confession", "conspiracy", "deception", "evidence", "information", "investigation", "misdirection", "motive", "mystery", "recruitment", "strategy", "suspicion", "witness"]) {
  assert.ok(bible.motifs.includes(motif), `Missing Secrets & Schemes motif: ${motif}`);
}

assert.equal(cards.libraryPlanVersion, "1.7.0");
assert.equal(cards.stances.length, 192);
assert.equal(cards.drives.length, 192);
assert.equal(cards.activePackCount, 8);
assert.equal(cards.playtestPackCount, 7);

console.log("✓ Secrets & Schemes pack, 64-card candidate pool, quota matrix, and secrecy metadata passed");
