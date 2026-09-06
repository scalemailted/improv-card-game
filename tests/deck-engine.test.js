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

assert.equal(cards.stances.length, 96, "Expected 96 active Stance cards");
assert.equal(cards.drives.length, 96, "Expected 96 active Drive cards");
assert.equal(new Set(cards.stances.map((card) => card.id)).size, 96, "Stance IDs must be unique");
assert.equal(new Set(cards.drives.map((card) => card.id)).size, 96, "Drive IDs must be unique");

const random = seededRandom(1001);
const state = engine.createState(cards, "ABCDEFGH", random);
assert.equal(state.version, 5);
assert.equal(state.instanceId, "ABCDEFGH");
assert.equal(engine.isStateUsable(state, cards, "ABCDEFGH"), true);
assert.deepEqual(state.drawFilters, { stance: "all", drive: "all" });
assert.deepEqual(state.history, []);
assert.deepEqual(state.sessions, []);
assert.equal(state.activeSessionId, null);
assert.deepEqual(engine.remaining(state), { stances: 96, drives: 96 });
assert.deepEqual(state.library.stanceIds, cards.stances.map((card) => card.id));
assert.deepEqual(state.library.driveIds, cards.drives.map((card) => card.id));

// Future pack releases are inserted into an existing independent deck without resetting history or current state.
const upgradeState = engine.createState(cards, "UPGRADE1", seededRandom(77));
const expandedCards = {
  ...cards,
  stances: [...cards.stances, { ...cards.stances[0], id: "S97", packId: "emotional-pressure", contentVersion: "0.1.0", status: "draft" }],
  drives: [...cards.drives, { ...cards.drives[0], id: "D97", packId: "emotional-pressure", contentVersion: "0.1.0", status: "draft" }]
};
const upgradeResult = engine.reconcileStateWithLibrary(upgradeState, expandedCards, seededRandom(78));
assert.equal(upgradeResult.changed, true);
assert.deepEqual(upgradeResult.added.stance, ["S97"]);
assert.deepEqual(upgradeResult.added.drive, ["D97"]);
assert.ok(upgradeState.stanceQueue.includes("S97"));
assert.ok(upgradeState.driveQueue.includes("D97"));
assert.equal(upgradeState.instanceId, "UPGRADE1");
assert.deepEqual(upgradeState.history, []);
assert.equal(engine.isStateUsable(upgradeState, expandedCards, "UPGRADE1"), true);


// A complete v0.8 Core-only snapshot must gain all 72 Pack 2, Pack 3, and Pack 4 IDs per deck.
const coreOnlyCards = {
  ...cards,
  stances: cards.stances.filter((card) => card.packId === "core-foundations"),
  drives: cards.drives.filter((card) => card.packId === "core-foundations")
};
const expansionState = engine.createState(coreOnlyCards, "EXPAND90", () => 0.42);
const expansionResult = engine.reconcileStateWithLibrary(expansionState, cards, () => 0.42);
assert.equal(expansionResult.added.stance.length, 72);
assert.equal(expansionResult.added.drive.length, 72);
assert.ok(expansionResult.added.stance.every((id) => /^S(?:2[5-9]|[3-8]\d|9[0-6])$/.test(id)));
assert.ok(expansionResult.added.drive.every((id) => /^D(?:2[5-9]|[3-8]\d|9[0-6])$/.test(id)));
assert.equal(expansionState.stanceQueue.length, 96);
assert.equal(expansionState.driveQueue.length, 96);

// A complete v0.9 snapshot gains exactly the 24 Power Games IDs per deck without resetting local history.
const powerLibrary = {
  ...cards,
  stances: cards.stances.filter((card) => card.packId !== "relationship-knots"),
  drives: cards.drives.filter((card) => card.packId !== "relationship-knots")
};
const prePowerCards = {
  ...powerLibrary,
  stances: powerLibrary.stances.filter((card) => card.packId !== "power-games"),
  drives: powerLibrary.drives.filter((card) => card.packId !== "power-games")
};
const powerExpansionState = engine.createState(prePowerCards, "EXPAND10", seededRandom(410));
const powerOpenSelection = exercises.createSessionSelection(exercises.OPEN_PLAY, "all");
engine.startSession(powerExpansionState, prePowerCards, powerOpenSelection, seededRandom(411));
engine.startScene(powerExpansionState, prePowerCards, seededRandom(412));
const oldPowerPair = engine.drawPair(powerExpansionState, prePowerCards, seededRandom(413));
engine.completeScene(powerExpansionState, prePowerCards);
const savedPowerHistory = JSON.stringify(powerExpansionState.history);
const powerExpansionResult = engine.reconcileStateWithLibrary(powerExpansionState, powerLibrary, seededRandom(414));
assert.equal(powerExpansionResult.added.stance.length, 24);
assert.equal(powerExpansionResult.added.drive.length, 24);
assert.ok(powerExpansionResult.added.stance.every((id) => /^S(?:49|[5-6]\d|7[0-2])$/.test(id)));
assert.ok(powerExpansionResult.added.drive.every((id) => /^D(?:49|[5-6]\d|7[0-2])$/.test(id)));
assert.equal(powerExpansionState.stanceQueue.length, 71, "One old Stance was already consumed before expansion");
assert.equal(powerExpansionState.driveQueue.length, 71, "One old Drive was already consumed before expansion");
assert.equal(JSON.stringify(powerExpansionState.history), savedPowerHistory, "Pack expansion must preserve Scene Log history");
assert.equal(powerExpansionState.history[0].stanceId, oldPowerPair.stanceId);
assert.equal(powerExpansionState.history[0].driveId, oldPowerPair.driveId);
assert.equal(engine.isStateUsable(powerExpansionState, powerLibrary, "EXPAND10"), true);

// A complete v0.10 snapshot gains exactly the 24 Relationship Knots IDs per deck without resetting local history.
const preRelationshipCards = powerLibrary;
const relationshipExpansionState = engine.createState(preRelationshipCards, "EXPAND11", seededRandom(510));
const relationshipOpenSelection = exercises.createSessionSelection(exercises.OPEN_PLAY, "all");
engine.startSession(relationshipExpansionState, preRelationshipCards, relationshipOpenSelection, seededRandom(511));
engine.startScene(relationshipExpansionState, preRelationshipCards, seededRandom(512));
const oldRelationshipPair = engine.drawPair(relationshipExpansionState, preRelationshipCards, seededRandom(513));
engine.completeScene(relationshipExpansionState, preRelationshipCards);
const savedRelationshipHistory = JSON.stringify(relationshipExpansionState.history);
const relationshipExpansionResult = engine.reconcileStateWithLibrary(relationshipExpansionState, cards, seededRandom(514));
assert.equal(relationshipExpansionResult.added.stance.length, 24);
assert.equal(relationshipExpansionResult.added.drive.length, 24);
assert.ok(relationshipExpansionResult.added.stance.every((id) => /^S(?:7[3-9]|8\d|9[0-6])$/.test(id)));
assert.ok(relationshipExpansionResult.added.drive.every((id) => /^D(?:7[3-9]|8\d|9[0-6])$/.test(id)));
assert.equal(relationshipExpansionState.stanceQueue.length, 95, "One old Stance was already consumed before expansion");
assert.equal(relationshipExpansionState.driveQueue.length, 95, "One old Drive was already consumed before expansion");
assert.equal(JSON.stringify(relationshipExpansionState.history), savedRelationshipHistory, "Pack expansion must preserve Scene Log history");
assert.equal(relationshipExpansionState.history[0].stanceId, oldRelationshipPair.stanceId);
assert.equal(relationshipExpansionState.history[0].driveId, oldRelationshipPair.driveId);
assert.equal(engine.isStateUsable(relationshipExpansionState, cards, "EXPAND11"), true);

// A v0.7-era state without a library snapshot treats S01-S24/D01-D24 as known and inserts only new pack IDs.
const preBibleState = engine.createState(cards, "UPGRADE2", seededRandom(79));
delete preBibleState.library;
preBibleState.stanceQueue = preBibleState.stanceQueue.filter((id) => id !== "S01");
preBibleState.driveQueue = preBibleState.driveQueue.filter((id) => id !== "D01");
const preBibleStanceLength = preBibleState.stanceQueue.length;
const preBibleDriveLength = preBibleState.driveQueue.length;
const preBibleResult = engine.reconcileStateWithLibrary(preBibleState, expandedCards, seededRandom(80));
assert.deepEqual(preBibleResult.added.stance, ["S97"]);
assert.deepEqual(preBibleResult.added.drive, ["D97"]);
assert.equal(preBibleState.stanceQueue.length, preBibleStanceLength + 1, "Consumed Core cards must not be reinserted during upgrade");
assert.equal(preBibleState.driveQueue.length, preBibleDriveLength + 1, "Consumed Core cards must not be reinserted during upgrade");

// Retired IDs are removed during reconciliation before the state is accepted by the application.
const retirementState = engine.createState(cards, "RETIRE01", seededRandom(81));
const reducedCards = {
  ...cards,
  stances: cards.stances.filter((card) => card.id !== "S24"),
  drives: cards.drives.filter((card) => card.id !== "D24")
};
const retirementResult = engine.reconcileStateWithLibrary(retirementState, reducedCards, seededRandom(82));
assert.ok(retirementResult.removed.stance.includes("S24"));
assert.ok(retirementResult.removed.drive.includes("D24"));
assert.equal(retirementState.stanceQueue.includes("S24"), false);
assert.equal(retirementState.driveQueue.includes("D24"), false);
assert.equal(engine.isStateUsable(retirementState, reducedCards, "RETIRE01"), true);

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
assert.equal(firstEntry.stanceSnapshot.packId, engine.findCard(cards, "stance", firstStanceId).packId);
assert.equal(firstEntry.driveSnapshot.packId, engine.findCard(cards, "drive", firstDriveId).packId);
assert.ok(firstEntry.stanceSnapshot.subthemeId);
assert.ok(firstEntry.driveSnapshot.subthemeId);
assert.ok(firstEntry.stanceSnapshot.coachRoles.length >= 1);
assert.ok(firstEntry.driveSnapshot.motifs.length >= 1);
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

// Random All must avoid repeats until each complete 96-card active deck is exhausted.
const cycleRandom = seededRandom(2222);
const cycleState = engine.createState(cards, "CYCLE123", cycleRandom);
engine.startSession(cycleState, cards, openSelection, cycleRandom);
const seenStances = new Set();
const seenDrives = new Set();
for (let index = 0; index < 96; index += 1) {
  const pair = engine.drawPair(cycleState, cards, cycleRandom);
  assert.equal(seenStances.has(pair.stanceId), false, `Repeated Stance during Random All cycle: ${pair.stanceId}`);
  assert.equal(seenDrives.has(pair.driveId), false, `Repeated Drive during Random All cycle: ${pair.driveId}`);
  seenStances.add(pair.stanceId);
  seenDrives.add(pair.driveId);
  assert.ok(engine.completeScene(cycleState, cards));
}
assert.equal(seenStances.size, 96);
assert.equal(seenDrives.size, 96);
assert.deepEqual(engine.remaining(cycleState), { stances: 0, drives: 0 });
assert.equal(cycleState.history.length, 96);
const nextCyclePair = engine.drawPair(cycleState, cards, cycleRandom);
assert.ok(nextCyclePair.stanceId);
assert.ok(nextCyclePair.driveId);
assert.deepEqual(cycleState.cycles, { stance: 2, drive: 2 });
assert.deepEqual(engine.remaining(cycleState), { stances: 95, drives: 95 });

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
for (let index = 0; index < 24; index += 1) {
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
assert.equal(new Set(focusedStances).size, 24);
assert.equal(new Set(focusedDrives).size, 24);
engine.startScene(focusedState, cards, focusedRandom);
const nextCycleFocusedStance = engine.drawCard(focusedState, cards, "stance", focusedRandom);
assert.equal(engine.findCard(cards, "stance", nextCycleFocusedStance).category, "Emotional Assumptions");
assert.ok(focusedStances.includes(nextCycleFocusedStance));

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
