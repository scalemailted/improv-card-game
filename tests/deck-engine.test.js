"use strict";

const assert = require("node:assert/strict");
const cards = require("../cards.js");
const exercises = require("../exercises.js");
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

const random = seededRandom(1001);
const state = engine.createState(cards, "ABCDEFGH", random);
assert.equal(state.version, 5);
assert.equal(state.instanceId, "ABCDEFGH");
assert.equal(engine.isStateUsable(state, cards, "ABCDEFGH"), true);
assert.deepEqual(state.drawFilters, { stance: "all", drive: "all" });
assert.deepEqual(state.history, []);
assert.deepEqual(state.sessions, []);
assert.equal(state.activeSessionId, null);
assert.deepEqual(engine.remaining(state), { stances: 24, drives: 24 });

// Open Play creates a session, but starting a scene never pre-draws a card.
const openSelection = exercises.createSessionSelection(exercises.OPEN_PLAY, "all");
const openSession = engine.startSession(state, cards, openSelection, random);
assert.equal(openSession.exercise.mode, "open");
assert.equal(openSession.scenesCompleted, 0);
const sceneShell = engine.startScene(state, cards, random);
assert.equal(sceneShell.sceneNumber, 1);
assert.equal(sceneShell.sessionId, openSession.id);
assert.deepEqual(
  { stanceId: sceneShell.stanceId, driveId: sceneShell.driveId },
  { stanceId: null, driveId: null },
  "Starting a scene should not pre-draw either card"
);
assert.equal(engine.completeScene(state, cards), false, "An incomplete scene must not be logged");

const firstStanceId = engine.drawCard(state, cards, "stance", random);
assert.ok(firstStanceId);
assert.equal(state.current.driveId, null);
assert.equal(engine.completeScene(state, cards), false, "Both cards are required to complete a scene");
const firstDriveId = engine.drawCard(state, cards, "drive", random);
const firstEntry = engine.completeScene(state, cards);
assert.ok(firstEntry);
assert.equal(state.history.length, 1);
assert.equal(firstEntry.sceneNumber, 1);
assert.equal(firstEntry.globalSceneNumber, 1);
assert.equal(firstEntry.stanceId, firstStanceId);
assert.equal(firstEntry.driveId, firstDriveId);
assert.deepEqual(firstEntry.stanceSnapshot, engine.snapshotCard(engine.findCard(cards, "stance", firstStanceId)));
assert.deepEqual(firstEntry.driveSnapshot, engine.snapshotCard(engine.findCard(cards, "drive", firstDriveId)));
assert.equal(firstEntry.exerciseSnapshot.name, "Open Play");
assert.equal(engine.activeSession(state).scenesCompleted, 1);
assert.equal(state.current, null);

// A new session resets its local scene counter while preserving the private deck queues and global history.
const queueBeforeNewSession = {
  stance: [...state.stanceQueue],
  drive: [...state.driveQueue]
};
const statusPreset = exercises.getPreset("status-clash");
const statusSelection = exercises.createSessionSelection(statusPreset, "all");
const statusSession = engine.startSession(state, cards, statusSelection, random);
assert.equal(statusSession.exercise.mode, "mirror");
assert.equal(statusSession.exercise.locked, true);
assert.deepEqual(state.stanceQueue, queueBeforeNewSession.stance);
assert.deepEqual(state.driveQueue, queueBeforeNewSession.drive);
const statusScene = engine.startScene(state, cards, random);
assert.equal(statusScene.sceneNumber, 1, "Every new session should begin at Scene 1");
assert.equal(statusScene.stanceFilter, "Status & Authority");
assert.equal(statusScene.driveFilter, "Direct Objectives");
assert.equal(engine.setDrawFilter(state, cards, "stance", "Emotional Assumptions"), false, "Locked guided sessions must reject local filter changes");
assert.equal(statusScene.stanceFilter, "Status & Authority");

const statusPair = engine.drawPair(state, cards, random);
assert.equal(engine.findCard(cards, "stance", statusPair.stanceId).category, "Status & Authority");
assert.equal(engine.findCard(cards, "drive", statusPair.driveId).category, "Direct Objectives");
const statusEntry = engine.completeScene(state, cards);
assert.equal(statusEntry.sceneNumber, 1);
assert.equal(statusEntry.globalSceneNumber, 2);
assert.equal(statusEntry.exerciseSnapshot.exerciseId, "status-clash");
assert.equal(state.history.length, 2);

// Paired assignments apply different local category rules without sharing a deck.
const pairedPreset = exercises.getPreset("crown-and-heart");
const heartSelection = exercises.createSessionSelection(pairedPreset, "b");
const heartSession = engine.startSession(state, cards, heartSelection, random);
assert.equal(heartSession.exercise.roleLabel, "Heart");
const heartPair = engine.drawPair(state, cards, random);
assert.equal(engine.findCard(cards, "stance", heartPair.stanceId).category, "Emotional Assumptions");
assert.equal(engine.findCard(cards, "drive", heartPair.driveId).category, "Secrets & Avoidance");
engine.completeScene(state, cards);

// Random All must avoid repeats until each complete 24-card deck is exhausted.
const cycleRandom = seededRandom(2222);
const cycleState = engine.createState(cards, "CYCLE123", cycleRandom);
engine.startSession(cycleState, cards, openSelection, cycleRandom);
const seenStances = new Set();
const seenDrives = new Set();
for (let index = 0; index < 24; index += 1) {
  const pair = engine.drawPair(cycleState, cards, cycleRandom);
  assert.equal(seenStances.has(pair.stanceId), false, `Repeated Stance during Random All cycle: ${pair.stanceId}`);
  assert.equal(seenDrives.has(pair.driveId), false, `Repeated Drive during Random All cycle: ${pair.driveId}`);
  seenStances.add(pair.stanceId);
  seenDrives.add(pair.driveId);
  assert.ok(engine.completeScene(cycleState, cards));
}
assert.equal(seenStances.size, 24);
assert.equal(seenDrives.size, 24);
assert.deepEqual(engine.remaining(cycleState), { stances: 0, drives: 0 });
assert.equal(cycleState.history.length, 24);
const nextCyclePair = engine.drawPair(cycleState, cards, cycleRandom);
assert.ok(nextCyclePair.stanceId);
assert.ok(nextCyclePair.driveId);
assert.deepEqual(cycleState.cycles, { stance: 2, drive: 2 });
assert.deepEqual(engine.remaining(cycleState), { stances: 23, drives: 23 });

// Unlocked Open Play filters can focus a category and cycle that category independently.
const focusedRandom = seededRandom(3333);
const focusedState = engine.createState(cards, "FOCUSED1", focusedRandom);
engine.startSession(focusedState, cards, openSelection, focusedRandom);
engine.startScene(focusedState, cards, focusedRandom);
assert.equal(engine.setDrawFilter(focusedState, cards, "stance", "Emotional Assumptions"), true);
assert.equal(engine.setDrawFilter(focusedState, cards, "drive", "Repeatable Behaviors"), true);
assert.deepEqual(focusedState.drawFilters, {
  stance: "Emotional Assumptions",
  drive: "Repeatable Behaviors"
});

const focusedStances = [];
const focusedDrives = [];
for (let index = 0; index < 6; index += 1) {
  if (!focusedState.current) {
    engine.startScene(focusedState, cards, focusedRandom);
  }
  const pair = engine.drawPair(focusedState, cards, focusedRandom);
  const stance = engine.findCard(cards, "stance", pair.stanceId);
  const drive = engine.findCard(cards, "drive", pair.driveId);
  assert.equal(stance.category, "Emotional Assumptions");
  assert.equal(drive.category, "Repeatable Behaviors");
  focusedStances.push(pair.stanceId);
  focusedDrives.push(pair.driveId);
  engine.completeScene(focusedState, cards);
}
assert.equal(new Set(focusedStances).size, 6);
assert.equal(new Set(focusedDrives).size, 6);
engine.startScene(focusedState, cards, focusedRandom);
const seventhFocusedStance = engine.drawCard(focusedState, cards, "stance", focusedRandom);
assert.equal(engine.findCard(cards, "stance", seventhFocusedStance).category, "Emotional Assumptions");
assert.ok(focusedStances.includes(seventhFocusedStance));

// Individual veto preserves the other card, returns the rejected card, and logs only the replacement.
engine.drawCard(focusedState, cards, "drive", focusedRandom);
const originalStance = focusedState.current.stanceId;
const originalDrive = focusedState.current.driveId;
const remainingBeforeVeto = engine.remaining(focusedState);
assert.equal(engine.keepCard(focusedState, "stance"), true);
const veto = engine.vetoCard(focusedState, cards, "stance", focusedRandom);
assert.equal(veto.rejectedId, originalStance);
assert.notEqual(veto.replacementId, originalStance);
assert.equal(focusedState.current.driveId, originalDrive);
assert.equal(focusedState.current.stanceKept, false);
assert.equal(focusedState.stanceQueue.includes(originalStance), true);
assert.deepEqual(engine.remaining(focusedState), remainingBeforeVeto);
const finalStance = focusedState.current.stanceId;
const vetoEntry = engine.completeScene(focusedState, cards);
assert.equal(vetoEntry.stanceId, finalStance);
assert.equal(vetoEntry.driveId, originalDrive);
assert.equal(vetoEntry.stanceVetoes, 1);

// Discarding an unfinished scene returns both drawn cards without logging or advancing the session.
engine.startScene(focusedState, cards, focusedRandom);
const discardPair = engine.drawPair(focusedState, cards, focusedRandom);
const historyBeforeDiscard = focusedState.history.length;
const sessionScenesBeforeDiscard = engine.activeSession(focusedState).scenesCompleted;
assert.equal(engine.discardCurrentScene(focusedState, cards, focusedRandom), true);
assert.equal(focusedState.current, null);
assert.equal(focusedState.history.length, historyBeforeDiscard);
assert.equal(engine.activeSession(focusedState).scenesCompleted, sessionScenesBeforeDiscard);
assert.equal(focusedState.stanceQueue.includes(discardPair.stanceId), true);
assert.equal(focusedState.driveQueue.includes(discardPair.driveId), true);

// Custom exercise storage can be created, replaced, and removed locally.
const customExercise = exercises.normalizeExercise({
  id: "custom-test",
  source: "custom",
  name: "Calm Versus Chaos",
  mode: "paired",
  summary: "Complementary assignments.",
  focus: "Practice contrast.",
  locked: true,
  roleVisibility: "hidden",
  roles: [
    { id: "a", label: "Calm", shortLabel: "Player A", description: "Stay emotionally grounded.", stanceFilter: "Emotional Assumptions", driveFilter: "Secrets & Avoidance" },
    { id: "b", label: "Chaos", shortLabel: "Player B", description: "Heighten unusual logic.", stanceFilter: "Worldview & Absurdity", driveFilter: "Repeatable Behaviors" }
  ]
}, { forceSource: "custom" });
assert.ok(engine.upsertSavedExercise(focusedState, customExercise));
assert.equal(focusedState.savedExercises.length, 1);
const renamed = { ...customExercise, name: "Calm and Chaos" };
engine.upsertSavedExercise(focusedState, renamed);
assert.equal(focusedState.savedExercises.length, 1);
assert.equal(focusedState.savedExercises[0].name, "Calm and Chaos");
assert.equal(engine.removeSavedExercise(focusedState, "custom-test"), true);
assert.equal(focusedState.savedExercises.length, 0);

// A valid v0.6/v4 state migrates into a v5 Open Play session and snapshots historical wording.
const legacyRandom = seededRandom(4444);
const legacySource = engine.createState(cards, "LEGACY34", legacyRandom);
const legacyStanceId = legacySource.stanceQueue.shift();
const legacyDriveId = legacySource.driveQueue.shift();
const timestamp = new Date().toISOString();
const legacyState = {
  version: 4,
  instanceId: "LEGACY34",
  stanceQueue: legacySource.stanceQueue,
  driveQueue: legacySource.driveQueue,
  current: null,
  drawFilters: { stance: "all", drive: "all" },
  history: [{
    sceneNumber: 1,
    stanceId: legacyStanceId,
    driveId: legacyDriveId,
    stanceFilter: "all",
    driveFilter: "all",
    stanceVetoes: 0,
    driveVetoes: 1,
    startedAt: timestamp,
    completedAt: timestamp
  }],
  scenesCompleted: 1,
  vetoes: { stance: 0, drive: 1 },
  cycles: { stance: 1, drive: 1 },
  createdAt: timestamp,
  updatedAt: timestamp
};
const migrated = engine.migrateLegacyState(legacyState, cards, legacyRandom);
assert.ok(migrated);
assert.equal(migrated.version, 5);
assert.equal(migrated.sessions.length, 1);
assert.equal(migrated.sessions[0].exercise.name, "Open Play");
assert.equal(migrated.history.length, 1);
assert.equal(migrated.history[0].stanceSnapshot.title, engine.findCard(cards, "stance", legacyStanceId).title);
assert.equal(migrated.history[0].driveSnapshot.title, engine.findCard(cards, "drive", legacyDriveId).title);
assert.equal(engine.isStateUsable(migrated, cards, "LEGACY34"), true);

const badState = { ...state, stanceQueue: ["NOPE"] };
assert.equal(engine.isStateUsable(badState, cards, "ABCDEFGH"), false);
assert.equal(engine.migrateLegacyState({ ...legacyState, stanceQueue: ["NOPE"] }, cards), null);

console.log("✓ Imprompt deck-engine v5 sessions, snapshots, guided filters, and migration tests passed");
