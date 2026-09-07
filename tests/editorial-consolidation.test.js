"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const cards = require("../cards.js");
const bible = require("../card-bible.js");
const engine = require("../deck-engine.js");
const exercises = require("../exercises.js");
const editorial = require("../tools/editorial-audit.js");
const ledger = require("../editorial/v0.18.0/revision-ledger.json");
const overlap = require("../editorial/v0.18.0/overlap-resolution.json");
const amber = require("../editorial/v0.18.0/amber-subtheme-review.json");
const publication = require("../editorial/v0.18.0/publication-waves.json");
const subthemeReadiness = require("../editorial/v0.18.0/subtheme-readiness.json");

const audit = editorial.auditEditorial();
assert.equal(audit.passed, true);
assert.deepEqual(audit.errors, []);
assert.deepEqual(audit.warnings, []);
assert.equal(audit.summary.semanticRevisions, 24);
assert.equal(audit.summary.generalizedTitles, 4);
assert.equal(audit.summary.resolvedClusters, 23);
assert.equal(audit.summary.amberSubthemesReviewed, 20);
assert.equal(audit.summary.pairingsAssessed, 1200);
assert.equal(audit.summary.stagedPacks, 9);
assert.equal(audit.summary.subthemesLiveValidationReady, 48);

const allCards = [...cards.stances, ...cards.drives];
const byId = new Map(allCards.map((card) => [card.id, card]));
const revisedIds = new Set(ledger.entries.map((entry) => entry.id));
assert.equal(revisedIds.size, 28);
assert.equal(allCards.filter((card) => card.contentVersion === "0.18.0").length, 28);

const candidatePoolCache = new Map();
function candidateFor(entry) {
  if (!candidatePoolCache.has(entry.packId)) {
    const candidatePath = path.resolve(__dirname, `../cards/candidates/${entry.packId}-candidate-pool.json`);
    candidatePoolCache.set(entry.packId, JSON.parse(fs.readFileSync(candidatePath, "utf8")));
  }
  return candidatePoolCache.get(entry.packId).candidates.find((item) => item.reservedId === entry.id);
}

for (const entry of ledger.entries) {
  const current = byId.get(entry.id);
  assert.ok(current, entry.id);
  assert.equal(current.id, entry.id, "Stable IDs must not be reassigned");
  assert.equal(current.title, entry.newTitle);
  assert.equal(current.instruction, entry.newInstruction);
  assert.equal(current.contentVersion, "0.18.0");
  assert.ok(editorial.semverGreater(current.contentVersion, entry.oldContentVersion));
  const candidate = candidateFor(entry);
  assert.ok(candidate, `${entry.id} must remain represented in its candidate pool`);
  assert.equal(candidate.title, entry.newTitle);
  assert.equal(candidate.instruction, entry.newInstruction);
}

assert.deepEqual(
  ["S130", "S209", "S221", "D177"].map((id) => byId.get(id).title),
  ["First to Solve It", "Worth Keeping Around", "I Meant to Teach That", "Record My Contribution"]
);
assert.equal(overlap.clusters.length, 23);
assert.equal(overlap.clusters.reduce((sum, cluster) => sum + cluster.revisedCardIds.length, 0), 24);
assert.equal(amber.reviews.length, 20);
assert.equal(publication.packs.length, 9);
assert.equal(subthemeReadiness.subthemes.length, 48);
assert.equal(subthemeReadiness.counts.internallyLiveValidationReady, 48);

for (const pack of cards.cardPacks) {
  const plan = bible.getPack(pack.id);
  assert.equal(pack.publicationStage, plan.publicationStage);
  assert.equal(pack.publicationWave, plan.publicationWave);
  assert.equal(pack.editorialReviewVersion, "0.18.0");
  assert.deepEqual(pack.remainingPublicationGates, plan.remainingPublicationGates);
  if (pack.id === "core-foundations") {
    assert.equal(pack.version, "1.0.0");
    assert.equal(pack.publicationStage, "published");
  } else {
    assert.equal(pack.version, "0.18.0");
    assert.equal(pack.publicationStage, "live-validation");
    assert.ok([1, 2, 3].includes(pack.publicationWave));
    assert.equal(pack.remainingPublicationGates.length, 4);
  }
}


for (const record of publication.packs) {
  const candidatePath = path.resolve(__dirname, `../cards/candidates/${record.packId}-candidate-pool.json`);
  const pool = JSON.parse(fs.readFileSync(candidatePath, "utf8"));
  assert.equal(pool.candidatePoolVersion, "0.18.0");
  assert.match(pool.releaseTarget, /v0\.18\.0/i);
}

// Historical Scene Log snapshots retain the exact wording that was played before a card revision.
const random = () => 0.314159;
const state = engine.createState(cards, "EDITOR18", random);
const selection = exercises.createSessionSelection(exercises.OPEN_PLAY, "all");
engine.startSession(state, cards, selection, random);
engine.startScene(state, cards, random);
engine.drawPair(state, cards, random);
const entry = engine.completeScene(state, cards);
assert.ok(entry);
const s53Revision = ledger.entries.find((item) => item.id === "S53");
entry.stanceId = "S53";
entry.stanceSnapshot = {
  ...engine.snapshotCard(byId.get("S53")),
  title: s53Revision.oldTitle,
  instruction: s53Revision.oldInstruction,
  contentVersion: s53Revision.oldContentVersion
};
const historicalSnapshot = JSON.parse(JSON.stringify(entry.stanceSnapshot));
assert.equal(engine.isStateUsable(state, cards, "EDITOR18"), true);
engine.reconcileStateWithLibrary(state, cards, random);
assert.deepEqual(entry.stanceSnapshot, historicalSnapshot);
assert.notEqual(entry.stanceSnapshot.title, byId.get("S53").title);
assert.notEqual(entry.stanceSnapshot.instruction, byId.get("S53").instruction);
assert.equal(engine.isStateUsable(state, cards, "EDITOR18"), true);

console.log("✓ v0.18 editorial consolidation, Amber review, staged publication, and immutable history passed");
