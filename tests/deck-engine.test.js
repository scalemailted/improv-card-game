"use strict";

const assert = require("node:assert/strict");
const cards = require("../cards.js");
const engine = require("../deck-engine.js");

function seededRandom(seed = 123456789) {
  let value = seed >>> 0;
  return function random() {
    value = (1664525 * value + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

assert.equal(cards.stances.length, 24, "Expected 24 Stance cards");
assert.equal(cards.drives.length, 24, "Expected 24 Drive cards");
assert.equal(new Set(cards.stances.map((card) => card.id)).size, 24, "Stance IDs must be unique");
assert.equal(new Set(cards.drives.map((card) => card.id)).size, 24, "Drive IDs must be unique");

const random = seededRandom();
const state = engine.createState(cards, "ABCDEFGH", random);
assert.equal(state.instanceId, "ABCDEFGH");
assert.equal(engine.isStateUsable(state, cards, "ABCDEFGH"), true);
assert.deepEqual(engine.remaining(state), { stances: 24, drives: 24 });

const seenStances = new Set();
const seenDrives = new Set();
for (let i = 0; i < 24; i += 1) {
  const pair = engine.drawPair(state, cards, random);
  assert.equal(seenStances.has(pair.stanceId), false, `Repeated Stance during cycle: ${pair.stanceId}`);
  assert.equal(seenDrives.has(pair.driveId), false, `Repeated Drive during cycle: ${pair.driveId}`);
  seenStances.add(pair.stanceId);
  seenDrives.add(pair.driveId);
  assert.equal(engine.completeScene(state), true);
}

assert.equal(seenStances.size, 24);
assert.equal(seenDrives.size, 24);
assert.deepEqual(engine.remaining(state), { stances: 0, drives: 0 });

const firstNextCycle = engine.drawPair(state, cards, random);
assert.ok(firstNextCycle.stanceId);
assert.ok(firstNextCycle.driveId);
assert.deepEqual(state.cycles, { stance: 2, drive: 2 }, "Both decks should start a new cycle");
assert.deepEqual(engine.remaining(state), { stances: 23, drives: 23 });

assert.equal(engine.keepCard(state, "stance"), true);
assert.equal(state.current.stanceKept, true);
assert.equal(state.current.driveKept, false);

const originalStance = state.current.stanceId;
const originalDrive = state.current.driveId;
const beforeVeto = engine.remaining(state);
const stanceVeto = engine.vetoCard(state, cards, "stance", random);
assert.equal(stanceVeto.rejectedId, originalStance);
assert.notEqual(stanceVeto.replacementId, originalStance, "A veto must produce a different card");
assert.equal(state.current.driveId, originalDrive, "Vetoing Stance must not replace Drive");
assert.equal(state.current.stanceKept, false, "Replacement begins unconfirmed");
assert.equal(state.stanceQueue.includes(originalStance), true, "Rejected Stance returns to its deck");
assert.deepEqual(engine.remaining(state), beforeVeto, "Individual veto should preserve deck size");
assert.deepEqual(state.vetoes, { stance: 1, drive: 0 });

const acceptedStance = state.current.stanceId;
const driveVeto = engine.vetoCard(state, cards, "drive", random);
assert.notEqual(driveVeto.replacementId, originalDrive, "Drive veto must produce a different card");
assert.equal(state.current.stanceId, acceptedStance, "Vetoing Drive must not replace Stance");
assert.equal(state.driveQueue.includes(originalDrive), true, "Rejected Drive returns to its deck");
assert.deepEqual(state.vetoes, { stance: 1, drive: 1 });

// Exercise the edge case where a deck has no unused cards left. The rejected
// card must still be replaced with a different card and returned to the new cycle.
const edgeRandom = seededRandom(987654321);
const edgeState = engine.createState(cards, "HGFEDCBA", edgeRandom);
for (let i = 0; i < 24; i += 1) {
  engine.drawPair(edgeState, cards, edgeRandom);
  if (i < 23) {
    engine.completeScene(edgeState);
  }
}
assert.equal(edgeState.stanceQueue.length, 0);
const finalStance = edgeState.current.stanceId;
const edgeResult = engine.vetoCard(edgeState, cards, "stance", edgeRandom);
assert.notEqual(edgeResult.replacementId, finalStance);
assert.equal(edgeState.stanceQueue.includes(finalStance), true);
assert.equal(edgeState.stanceQueue.length, 23);
assert.equal(edgeState.cycles.stance, 2);

const badState = { ...state, stanceQueue: ["NOPE"] };
assert.equal(engine.isStateUsable(badState, cards, "ABCDEFGH"), false);

console.log("✓ Two Secrets deck-engine v2 tests passed");
