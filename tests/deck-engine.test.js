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
assert.equal(state.cycle, 2, "Deck should reshuffle after exhausting a cycle");
assert.deepEqual(engine.remaining(state), { stances: 23, drives: 23 });

const previous = { ...state.current };
const replacement = engine.vetoAndRedraw(state, cards, random);
assert.notDeepEqual(replacement, previous, "Veto should consume and replace the current pair");
assert.equal(state.vetoes, 1);

const badState = { ...state, stanceOrder: ["NOPE"] };
assert.equal(engine.isStateUsable(badState, cards, "ABCDEFGH"), false);

console.log("✓ Two Secrets deck-engine tests passed");
