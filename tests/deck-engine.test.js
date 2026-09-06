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
assert.equal(state.version, 4);
assert.equal(state.instanceId, "ABCDEFGH");
assert.equal(engine.isStateUsable(state, cards, "ABCDEFGH"), true);
assert.deepEqual(state.drawFilters, { stance: "all", drive: "all" });
assert.deepEqual(state.history, []);
assert.deepEqual(engine.remaining(state), { stances: 24, drives: 24 });

const sceneShell = engine.startScene(state);
assert.deepEqual(
  { stanceId: sceneShell.stanceId, driveId: sceneShell.driveId },
  { stanceId: null, driveId: null },
  "Starting a scene should not pre-draw either card"
);
assert.equal(engine.completeScene(state), false, "An incomplete scene must not be logged");

const firstStance = engine.drawCard(state, cards, "stance", random);
assert.ok(firstStance);
assert.equal(state.current.driveId, null);
assert.equal(engine.completeScene(state), false, "Both cards are required to complete a scene");
const firstDrive = engine.drawCard(state, cards, "drive", random);
assert.ok(firstDrive);
assert.equal(engine.completeScene(state), true);
assert.equal(state.history.length, 1);
assert.equal(state.history[0].sceneNumber, 1);
assert.equal(state.history[0].stanceId, firstStance);
assert.equal(state.history[0].driveId, firstDrive);

// Random All must avoid repeats until each 24-card deck is exhausted.
const cycleRandom = seededRandom(2222);
const cycleState = engine.createState(cards, "CYCLE123", cycleRandom);
const seenStances = new Set();
const seenDrives = new Set();
for (let i = 0; i < 24; i += 1) {
  const pair = engine.drawPair(cycleState, cards, cycleRandom);
  assert.equal(seenStances.has(pair.stanceId), false, `Repeated Stance during Random All cycle: ${pair.stanceId}`);
  assert.equal(seenDrives.has(pair.driveId), false, `Repeated Drive during Random All cycle: ${pair.driveId}`);
  seenStances.add(pair.stanceId);
  seenDrives.add(pair.driveId);
  assert.equal(engine.completeScene(cycleState), true);
}
assert.equal(seenStances.size, 24);
assert.equal(seenDrives.size, 24);
assert.deepEqual(engine.remaining(cycleState), { stances: 0, drives: 0 });
assert.equal(cycleState.history.length, 24);

const firstNextCycle = engine.drawPair(cycleState, cards, cycleRandom);
assert.ok(firstNextCycle.stanceId);
assert.ok(firstNextCycle.driveId);
assert.deepEqual(cycleState.cycles, { stance: 2, drive: 2 });
assert.deepEqual(engine.remaining(cycleState), { stances: 23, drives: 23 });

// Focused category draws must stay in the selected category and cycle only that category when exhausted.
const focusedRandom = seededRandom(3333);
const focusedState = engine.createState(cards, "FOCUSED1", focusedRandom);
engine.startScene(focusedState);
engine.setDrawFilter(focusedState, cards, "stance", "Emotional Assumptions");
engine.setDrawFilter(focusedState, cards, "drive", "Repeatable Behaviors");
assert.deepEqual(focusedState.drawFilters, {
  stance: "Emotional Assumptions",
  drive: "Repeatable Behaviors"
});

const focusedStances = [];
const focusedDrives = [];
for (let i = 0; i < 6; i += 1) {
  if (!focusedState.current) {
    engine.startScene(focusedState);
  }
  const pair = engine.drawPair(focusedState, cards, focusedRandom);
  const stance = engine.findCard(cards, "stance", pair.stanceId);
  const drive = engine.findCard(cards, "drive", pair.driveId);
  assert.equal(stance.category, "Emotional Assumptions");
  assert.equal(drive.category, "Repeatable Behaviors");
  focusedStances.push(pair.stanceId);
  focusedDrives.push(pair.driveId);
  engine.completeScene(focusedState);
}
assert.equal(new Set(focusedStances).size, 6, "All six focused Stances should appear before a repeat");
assert.equal(new Set(focusedDrives).size, 6, "All six focused Drives should appear before a repeat");

engine.startScene(focusedState);
const seventhFocusedStance = engine.drawCard(focusedState, cards, "stance", focusedRandom);
assert.equal(engine.findCard(cards, "stance", seventhFocusedStance).category, "Emotional Assumptions");
assert.ok(focusedStances.includes(seventhFocusedStance), "The seventh focused draw should begin a new category cycle");
assert.equal(focusedState.current.stanceFilter, "Emotional Assumptions");

// Individual vetoes must preserve the other card and honor the original draw filter.
engine.drawCard(focusedState, cards, "drive", focusedRandom);
assert.equal(engine.keepCard(focusedState, "stance"), true);
assert.equal(focusedState.current.stanceKept, true);
const originalStance = focusedState.current.stanceId;
const originalDrive = focusedState.current.driveId;
const beforeVeto = engine.remaining(focusedState);
const stanceVeto = engine.vetoCard(focusedState, cards, "stance", focusedRandom);
assert.equal(stanceVeto.rejectedId, originalStance);
assert.notEqual(stanceVeto.replacementId, originalStance);
assert.equal(engine.findCard(cards, "stance", stanceVeto.replacementId).category, "Emotional Assumptions");
assert.equal(focusedState.current.driveId, originalDrive, "Vetoing Stance must not replace Drive");
assert.equal(focusedState.current.stanceKept, false);
assert.equal(focusedState.stanceQueue.includes(originalStance), true, "Rejected Stance returns to its deck");
assert.deepEqual(engine.remaining(focusedState), beforeVeto, "Individual veto preserves total queue size");
assert.equal(focusedState.current.stanceVetoes, 1);
assert.equal(focusedState.vetoes.stance, 1);

const finalStance = focusedState.current.stanceId;
assert.equal(engine.completeScene(focusedState), true);
const logged = focusedState.history.at(-1);
assert.equal(logged.stanceId, finalStance, "Scene Log should contain the accepted replacement, not the vetoed card");
assert.equal(logged.driveId, originalDrive);
assert.equal(logged.stanceFilter, "Emotional Assumptions");
assert.equal(logged.driveFilter, "Repeatable Behaviors");
assert.equal(logged.stanceVetoes, 1);

// Changing a filter after one card is drawn may only affect an undrawn slot.
engine.startScene(focusedState);
engine.drawCard(focusedState, cards, "stance", focusedRandom);
const lockedStanceFilter = focusedState.current.stanceFilter;
engine.setDrawFilter(focusedState, cards, "stance", "Status & Authority");
assert.equal(focusedState.drawFilters.stance, "Status & Authority");
assert.equal(focusedState.current.stanceFilter, lockedStanceFilter, "A drawn card keeps the filter that produced it");
engine.setDrawFilter(focusedState, cards, "drive", "Secrets & Avoidance");
assert.equal(focusedState.current.driveFilter, "Secrets & Avoidance", "An undrawn card should adopt the new filter");

// v2/v3 states migrate without fabricating scene history.
const legacyRandom = seededRandom(4444);
const legacySource = engine.createState(cards, "LEGACY34", legacyRandom);
engine.drawPair(legacySource, cards, legacyRandom);
const legacyState = {
  version: 3,
  instanceId: legacySource.instanceId,
  stanceQueue: legacySource.stanceQueue,
  driveQueue: legacySource.driveQueue,
  current: {
    stanceId: legacySource.current.stanceId,
    driveId: legacySource.current.driveId,
    stanceKept: false,
    driveKept: false,
    drawnAt: legacySource.current.stanceDrawnAt
  },
  scenesCompleted: 5,
  vetoes: { stance: 1, drive: 2 },
  cycles: { stance: 1, drive: 1 },
  createdAt: legacySource.createdAt,
  updatedAt: legacySource.updatedAt
};
const migrated = engine.migrateLegacyState(legacyState, cards);
assert.ok(migrated, "A valid v3 state should migrate");
assert.equal(migrated.version, 4);
assert.deepEqual(migrated.history, []);
assert.deepEqual(migrated.drawFilters, { stance: "all", drive: "all" });
assert.equal(engine.isStateUsable(migrated, cards, migrated.instanceId), true);

const badState = { ...state, stanceQueue: ["NOPE"] };
assert.equal(engine.isStateUsable(badState, cards, "ABCDEFGH"), false);
assert.equal(engine.migrateLegacyState({ ...legacyState, stanceQueue: ["NOPE"] }, cards), null);

console.log("✓ Imprompt deck-engine v4 scene-log and category-filter tests passed");
