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

assert.equal(cards.stances.length, 240, "Expected 240 active Stance cards");
assert.equal(cards.drives.length, 240, "Expected 240 active Drive cards");
assert.equal(new Set(cards.stances.map((card) => card.id)).size, 240, "Stance IDs must be unique");
assert.equal(new Set(cards.drives.map((card) => card.id)).size, 240, "Drive IDs must be unique");

const random = seededRandom(1001);
const state = engine.createState(cards, "ABCDEFGH", random);
assert.equal(state.version, 5);
assert.equal(state.instanceId, "ABCDEFGH");
assert.equal(engine.isStateUsable(state, cards, "ABCDEFGH"), true);
assert.deepEqual(state.drawFilters, { stance: "all", drive: "all" });
assert.deepEqual(state.history, []);
assert.deepEqual(state.sessions, []);
assert.equal(state.activeSessionId, null);
assert.deepEqual(engine.remaining(state), { stances: 240, drives: 240 });
assert.deepEqual(state.library.stanceIds, cards.stances.map((card) => card.id));
assert.deepEqual(state.library.driveIds, cards.drives.map((card) => card.id));

// Library reconciliation remains stable when the complete ten-pack library is already known.
const upgradeState = engine.createState(cards, "UPGRADE1", seededRandom(77));
const upgradeResult = engine.reconcileStateWithLibrary(upgradeState, cards, seededRandom(78));
assert.equal(upgradeResult.changed, false);
assert.deepEqual(upgradeResult.added.stance, []);
assert.deepEqual(upgradeResult.added.drive, []);
assert.equal(upgradeState.instanceId, "UPGRADE1");
assert.deepEqual(upgradeState.history, []);
assert.equal(engine.isStateUsable(upgradeState, cards, "UPGRADE1"), true);


// A complete v0.8 Core-only snapshot must gain all 216 Pack 2 through Pack 10 IDs per deck.
const coreOnlyCards = {
  ...cards,
  stances: cards.stances.filter((card) => card.packId === "core-foundations"),
  drives: cards.drives.filter((card) => card.packId === "core-foundations")
};
const expansionState = engine.createState(coreOnlyCards, "EXPAND90", () => 0.42);
const expansionResult = engine.reconcileStateWithLibrary(expansionState, cards, () => 0.42);
assert.equal(expansionResult.added.stance.length, 216);
assert.equal(expansionResult.added.drive.length, 216);
assert.ok(expansionResult.added.stance.every((id) => Number(id.slice(1)) >= 25 && Number(id.slice(1)) <= 240));
assert.ok(expansionResult.added.drive.every((id) => Number(id.slice(1)) >= 25 && Number(id.slice(1)) <= 240));
assert.equal(expansionState.stanceQueue.length, 240);
assert.equal(expansionState.driveQueue.length, 240);

// A complete v0.9 snapshot gains exactly the 24 Power Games IDs per deck without resetting local history.
const powerLibrary = {
  ...cards,
  stances: cards.stances.filter((card) => !["relationship-knots", "emotional-pressure", "secrets-schemes", "absurd-commitment", "rules-rituals-institutions", "competition-consequences", "advanced-scene-engines"].includes(card.packId)),
  drives: cards.drives.filter((card) => !["relationship-knots", "emotional-pressure", "secrets-schemes", "absurd-commitment", "rules-rituals-institutions", "competition-consequences", "advanced-scene-engines"].includes(card.packId))
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
const relationshipLibrary = {
  ...cards,
  stances: cards.stances.filter((card) => !["emotional-pressure", "secrets-schemes", "absurd-commitment", "rules-rituals-institutions", "competition-consequences", "advanced-scene-engines"].includes(card.packId)),
  drives: cards.drives.filter((card) => !["emotional-pressure", "secrets-schemes", "absurd-commitment", "rules-rituals-institutions", "competition-consequences", "advanced-scene-engines"].includes(card.packId))
};
const relationshipExpansionState = engine.createState(preRelationshipCards, "EXPAND11", seededRandom(510));
const relationshipOpenSelection = exercises.createSessionSelection(exercises.OPEN_PLAY, "all");
engine.startSession(relationshipExpansionState, preRelationshipCards, relationshipOpenSelection, seededRandom(511));
engine.startScene(relationshipExpansionState, preRelationshipCards, seededRandom(512));
const oldRelationshipPair = engine.drawPair(relationshipExpansionState, preRelationshipCards, seededRandom(513));
engine.completeScene(relationshipExpansionState, preRelationshipCards);
const savedRelationshipHistory = JSON.stringify(relationshipExpansionState.history);
const relationshipExpansionResult = engine.reconcileStateWithLibrary(relationshipExpansionState, relationshipLibrary, seededRandom(514));
assert.equal(relationshipExpansionResult.added.stance.length, 24);
assert.equal(relationshipExpansionResult.added.drive.length, 24);
assert.ok(relationshipExpansionResult.added.stance.every((id) => /^S(?:7[3-9]|8\d|9[0-6])$/.test(id)));
assert.ok(relationshipExpansionResult.added.drive.every((id) => /^D(?:7[3-9]|8\d|9[0-6])$/.test(id)));
assert.equal(relationshipExpansionState.stanceQueue.length, 95, "One old Stance was already consumed before expansion");
assert.equal(relationshipExpansionState.driveQueue.length, 95, "One old Drive was already consumed before expansion");
assert.equal(JSON.stringify(relationshipExpansionState.history), savedRelationshipHistory, "Pack expansion must preserve Scene Log history");
assert.equal(relationshipExpansionState.history[0].stanceId, oldRelationshipPair.stanceId);
assert.equal(relationshipExpansionState.history[0].driveId, oldRelationshipPair.driveId);
assert.equal(engine.isStateUsable(relationshipExpansionState, relationshipLibrary, "EXPAND11"), true);

// A complete v0.11 snapshot gains exactly the 24 Emotional Pressure IDs per deck without resetting local history.
const preEmotionalCards = relationshipLibrary;
const emotionalLibrary = {
  ...cards,
  stances: cards.stances.filter((card) => !["secrets-schemes", "absurd-commitment", "rules-rituals-institutions", "competition-consequences", "advanced-scene-engines"].includes(card.packId)),
  drives: cards.drives.filter((card) => !["secrets-schemes", "absurd-commitment", "rules-rituals-institutions", "competition-consequences", "advanced-scene-engines"].includes(card.packId))
};
const emotionalExpansionState = engine.createState(preEmotionalCards, "EXPAND12", seededRandom(610));
const emotionalOpenSelection = exercises.createSessionSelection(exercises.OPEN_PLAY, "all");
engine.startSession(emotionalExpansionState, preEmotionalCards, emotionalOpenSelection, seededRandom(611));
engine.startScene(emotionalExpansionState, preEmotionalCards, seededRandom(612));
const oldEmotionalPair = engine.drawPair(emotionalExpansionState, preEmotionalCards, seededRandom(613));
engine.completeScene(emotionalExpansionState, preEmotionalCards);
const savedEmotionalHistory = JSON.stringify(emotionalExpansionState.history);
const emotionalExpansionResult = engine.reconcileStateWithLibrary(emotionalExpansionState, emotionalLibrary, seededRandom(614));
assert.equal(emotionalExpansionResult.added.stance.length, 24);
assert.equal(emotionalExpansionResult.added.drive.length, 24);
assert.ok(emotionalExpansionResult.added.stance.every((id) => Number(id.slice(1)) >= 97 && Number(id.slice(1)) <= 120));
assert.ok(emotionalExpansionResult.added.drive.every((id) => Number(id.slice(1)) >= 97 && Number(id.slice(1)) <= 120));
assert.equal(emotionalExpansionState.stanceQueue.length, 119, "One old Stance was already consumed before expansion");
assert.equal(emotionalExpansionState.driveQueue.length, 119, "One old Drive was already consumed before expansion");
assert.equal(JSON.stringify(emotionalExpansionState.history), savedEmotionalHistory, "Pack expansion must preserve Scene Log history");
assert.equal(emotionalExpansionState.history[0].stanceId, oldEmotionalPair.stanceId);
assert.equal(emotionalExpansionState.history[0].driveId, oldEmotionalPair.driveId);
assert.equal(engine.isStateUsable(emotionalExpansionState, emotionalLibrary, "EXPAND12"), true);

// A complete v0.12 snapshot gains exactly the 24 Secrets & Schemes IDs per deck without resetting local history.
const preSecretsCards = emotionalLibrary;
const secretsLibrary = {
  ...cards,
  stances: cards.stances.filter((card) => !["absurd-commitment", "rules-rituals-institutions", "competition-consequences", "advanced-scene-engines"].includes(card.packId)),
  drives: cards.drives.filter((card) => !["absurd-commitment", "rules-rituals-institutions", "competition-consequences", "advanced-scene-engines"].includes(card.packId))
};
const secretsExpansionState = engine.createState(preSecretsCards, "EXPAND13", seededRandom(710));
const secretsOpenSelection = exercises.createSessionSelection(exercises.OPEN_PLAY, "all");
engine.startSession(secretsExpansionState, preSecretsCards, secretsOpenSelection, seededRandom(711));
engine.startScene(secretsExpansionState, preSecretsCards, seededRandom(712));
const oldSecretsPair = engine.drawPair(secretsExpansionState, preSecretsCards, seededRandom(713));
engine.completeScene(secretsExpansionState, preSecretsCards);
const savedSecretsHistory = JSON.stringify(secretsExpansionState.history);
const secretsExpansionResult = engine.reconcileStateWithLibrary(secretsExpansionState, secretsLibrary, seededRandom(714));
assert.equal(secretsExpansionResult.added.stance.length, 24);
assert.equal(secretsExpansionResult.added.drive.length, 24);
assert.ok(secretsExpansionResult.added.stance.every((id) => Number(id.slice(1)) >= 121 && Number(id.slice(1)) <= 144));
assert.ok(secretsExpansionResult.added.drive.every((id) => Number(id.slice(1)) >= 121 && Number(id.slice(1)) <= 144));
assert.equal(secretsExpansionState.stanceQueue.length, 143, "One old Stance was already consumed before expansion");
assert.equal(secretsExpansionState.driveQueue.length, 143, "One old Drive was already consumed before expansion");
assert.equal(JSON.stringify(secretsExpansionState.history), savedSecretsHistory, "Pack expansion must preserve Scene Log history");
assert.equal(secretsExpansionState.history[0].stanceId, oldSecretsPair.stanceId);
assert.equal(secretsExpansionState.history[0].driveId, oldSecretsPair.driveId);
assert.equal(engine.isStateUsable(secretsExpansionState, secretsLibrary, "EXPAND13"), true);

// A complete v0.13 snapshot gains exactly the 24 Absurd Commitment IDs per deck without resetting local history.
const preAbsurdCards = secretsLibrary;
const absurdLibrary = {
  ...cards,
  stances: cards.stances.filter((card) => !["rules-rituals-institutions", "competition-consequences", "advanced-scene-engines"].includes(card.packId)),
  drives: cards.drives.filter((card) => !["rules-rituals-institutions", "competition-consequences", "advanced-scene-engines"].includes(card.packId))
};
const absurdExpansionState = engine.createState(preAbsurdCards, "EXPAND14", seededRandom(810));
const absurdOpenSelection = exercises.createSessionSelection(exercises.OPEN_PLAY, "all");
engine.startSession(absurdExpansionState, preAbsurdCards, absurdOpenSelection, seededRandom(811));
engine.startScene(absurdExpansionState, preAbsurdCards, seededRandom(812));
const oldAbsurdPair = engine.drawPair(absurdExpansionState, preAbsurdCards, seededRandom(813));
engine.completeScene(absurdExpansionState, preAbsurdCards);
const savedAbsurdHistory = JSON.stringify(absurdExpansionState.history);
const absurdExpansionResult = engine.reconcileStateWithLibrary(absurdExpansionState, absurdLibrary, seededRandom(814));
assert.equal(absurdExpansionResult.added.stance.length, 24);
assert.equal(absurdExpansionResult.added.drive.length, 24);
assert.ok(absurdExpansionResult.added.stance.every((id) => Number(id.slice(1)) >= 145 && Number(id.slice(1)) <= 168));
assert.ok(absurdExpansionResult.added.drive.every((id) => Number(id.slice(1)) >= 145 && Number(id.slice(1)) <= 168));
assert.equal(absurdExpansionState.stanceQueue.length, 167, "One old Stance was already consumed before expansion");
assert.equal(absurdExpansionState.driveQueue.length, 167, "One old Drive was already consumed before expansion");
assert.equal(JSON.stringify(absurdExpansionState.history), savedAbsurdHistory, "Pack expansion must preserve Scene Log history");
assert.equal(absurdExpansionState.history[0].stanceId, oldAbsurdPair.stanceId);
assert.equal(absurdExpansionState.history[0].driveId, oldAbsurdPair.driveId);
assert.equal(engine.isStateUsable(absurdExpansionState, absurdLibrary, "EXPAND14"), true);


// A complete v0.14 snapshot gains exactly the 24 Rules, Rituals & Institutions IDs per deck without resetting local history.
const preInstitutionsCards = absurdLibrary;
const institutionsLibrary = {
  ...cards,
  stances: cards.stances.filter((card) => !["competition-consequences", "advanced-scene-engines"].includes(card.packId)),
  drives: cards.drives.filter((card) => !["competition-consequences", "advanced-scene-engines"].includes(card.packId))
};
const institutionsExpansionState = engine.createState(preInstitutionsCards, "EXPAND15", seededRandom(910));
const institutionsOpenSelection = exercises.createSessionSelection(exercises.OPEN_PLAY, "all");
engine.startSession(institutionsExpansionState, preInstitutionsCards, institutionsOpenSelection, seededRandom(911));
engine.startScene(institutionsExpansionState, preInstitutionsCards, seededRandom(912));
const oldInstitutionsPair = engine.drawPair(institutionsExpansionState, preInstitutionsCards, seededRandom(913));
engine.completeScene(institutionsExpansionState, preInstitutionsCards);
const savedInstitutionsHistory = JSON.stringify(institutionsExpansionState.history);
const institutionsExpansionResult = engine.reconcileStateWithLibrary(institutionsExpansionState, institutionsLibrary, seededRandom(914));
assert.equal(institutionsExpansionResult.added.stance.length, 24);
assert.equal(institutionsExpansionResult.added.drive.length, 24);
assert.ok(institutionsExpansionResult.added.stance.every((id) => Number(id.slice(1)) >= 169 && Number(id.slice(1)) <= 192));
assert.ok(institutionsExpansionResult.added.drive.every((id) => Number(id.slice(1)) >= 169 && Number(id.slice(1)) <= 192));
assert.equal(institutionsExpansionState.stanceQueue.length, 191, "One old Stance was already consumed before expansion");
assert.equal(institutionsExpansionState.driveQueue.length, 191, "One old Drive was already consumed before expansion");
assert.equal(JSON.stringify(institutionsExpansionState.history), savedInstitutionsHistory, "Pack expansion must preserve Scene Log history");
assert.equal(institutionsExpansionState.history[0].stanceId, oldInstitutionsPair.stanceId);
assert.equal(institutionsExpansionState.history[0].driveId, oldInstitutionsPair.driveId);
assert.equal(engine.isStateUsable(institutionsExpansionState, institutionsLibrary, "EXPAND15"), true);

// A complete v0.15 snapshot gains exactly the 24 Competition & Consequences IDs per deck without resetting local history.
const preCompetitionCards = institutionsLibrary;
const competitionExpansionState = engine.createState(preCompetitionCards, "EXPAND16", seededRandom(1010));
const competitionOpenSelection = exercises.createSessionSelection(exercises.OPEN_PLAY, "all");
engine.startSession(competitionExpansionState, preCompetitionCards, competitionOpenSelection, seededRandom(1011));
engine.startScene(competitionExpansionState, preCompetitionCards, seededRandom(1012));
const oldCompetitionPair = engine.drawPair(competitionExpansionState, preCompetitionCards, seededRandom(1013));
engine.completeScene(competitionExpansionState, preCompetitionCards);
const savedCompetitionHistory = JSON.stringify(competitionExpansionState.history);
const competitionLibrary = {
  ...cards,
  stances: cards.stances.filter((card) => card.packId !== "advanced-scene-engines"),
  drives: cards.drives.filter((card) => card.packId !== "advanced-scene-engines")
};
const competitionExpansionResult = engine.reconcileStateWithLibrary(competitionExpansionState, competitionLibrary, seededRandom(1014));
assert.equal(competitionExpansionResult.added.stance.length, 24);
assert.equal(competitionExpansionResult.added.drive.length, 24);
assert.ok(competitionExpansionResult.added.stance.every((id) => Number(id.slice(1)) >= 193 && Number(id.slice(1)) <= 240));
assert.ok(competitionExpansionResult.added.drive.every((id) => Number(id.slice(1)) >= 193 && Number(id.slice(1)) <= 240));
assert.equal(competitionExpansionState.stanceQueue.length, 215, "One old Stance was already consumed before expansion");
assert.equal(competitionExpansionState.driveQueue.length, 215, "One old Drive was already consumed before expansion");
assert.equal(JSON.stringify(competitionExpansionState.history), savedCompetitionHistory, "Pack expansion must preserve Scene Log history");
assert.equal(competitionExpansionState.history[0].stanceId, oldCompetitionPair.stanceId);
assert.equal(competitionExpansionState.history[0].driveId, oldCompetitionPair.driveId);
assert.equal(engine.isStateUsable(competitionExpansionState, competitionLibrary, "EXPAND16"), true);


// A complete v0.16 snapshot gains exactly the 24 Advanced Scene Engines IDs per deck without resetting local history.
const preAdvancedCards = competitionLibrary;
const advancedExpansionState = engine.createState(preAdvancedCards, "EXPAND17", seededRandom(1110));
const advancedOpenSelection = exercises.createSessionSelection(exercises.OPEN_PLAY, "all");
engine.startSession(advancedExpansionState, preAdvancedCards, advancedOpenSelection, seededRandom(1111));
engine.startScene(advancedExpansionState, preAdvancedCards, seededRandom(1112));
const oldAdvancedPair = engine.drawPair(advancedExpansionState, preAdvancedCards, seededRandom(1113));
engine.completeScene(advancedExpansionState, preAdvancedCards);
const savedAdvancedHistory = JSON.stringify(advancedExpansionState.history);
const advancedExpansionResult = engine.reconcileStateWithLibrary(advancedExpansionState, cards, seededRandom(1114));
assert.equal(advancedExpansionResult.added.stance.length, 24);
assert.equal(advancedExpansionResult.added.drive.length, 24);
assert.ok(advancedExpansionResult.added.stance.every((id) => Number(id.slice(1)) >= 217 && Number(id.slice(1)) <= 240));
assert.ok(advancedExpansionResult.added.drive.every((id) => Number(id.slice(1)) >= 217 && Number(id.slice(1)) <= 240));
assert.equal(advancedExpansionState.stanceQueue.length, 239, "One old Stance was already consumed before expansion");
assert.equal(advancedExpansionState.driveQueue.length, 239, "One old Drive was already consumed before expansion");
assert.equal(JSON.stringify(advancedExpansionState.history), savedAdvancedHistory, "Pack expansion must preserve Scene Log history");
assert.equal(advancedExpansionState.history[0].stanceId, oldAdvancedPair.stanceId);
assert.equal(advancedExpansionState.history[0].driveId, oldAdvancedPair.driveId);
assert.equal(engine.isStateUsable(advancedExpansionState, cards, "EXPAND17"), true);

// A v0.7-era state without a library snapshot treats S01-S24/D01-D24 as known, preserves consumed Core cards, and inserts absent expansion IDs.
const preBibleState = engine.createState(competitionLibrary, "UPGRADE2", seededRandom(79));
delete preBibleState.library;
preBibleState.stanceQueue = preBibleState.stanceQueue.filter((id) => id !== "S01");
preBibleState.driveQueue = preBibleState.driveQueue.filter((id) => id !== "D01");
const preBibleStanceLength = preBibleState.stanceQueue.length;
const preBibleDriveLength = preBibleState.driveQueue.length;
const preBibleResult = engine.reconcileStateWithLibrary(preBibleState, cards, seededRandom(80));
assert.equal(preBibleResult.added.stance.length, 24);
assert.equal(preBibleResult.added.drive.length, 24);
assert.ok(preBibleResult.added.stance.every((id) => Number(id.slice(1)) >= 217 && Number(id.slice(1)) <= 240));
assert.ok(preBibleResult.added.drive.every((id) => Number(id.slice(1)) >= 217 && Number(id.slice(1)) <= 240));
assert.equal(preBibleState.stanceQueue.length, preBibleStanceLength + 24, "Consumed Core cards must not be reinserted during upgrade");
assert.equal(preBibleState.driveQueue.length, preBibleDriveLength + 24, "Consumed Core cards must not be reinserted during upgrade");
assert.equal(preBibleState.stanceQueue.includes("S01"), false);
assert.equal(preBibleState.driveQueue.includes("D01"), false);

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

// Random All must avoid repeats until each complete 240-card active deck is exhausted.
const cycleRandom = seededRandom(2222);
const cycleState = engine.createState(cards, "CYCLE123", cycleRandom);
engine.startSession(cycleState, cards, openSelection, cycleRandom);
const seenStances = new Set();
const seenDrives = new Set();
for (let index = 0; index < 240; index += 1) {
  const pair = engine.drawPair(cycleState, cards, cycleRandom);
  assert.equal(seenStances.has(pair.stanceId), false, `Repeated Stance during Random All cycle: ${pair.stanceId}`);
  assert.equal(seenDrives.has(pair.driveId), false, `Repeated Drive during Random All cycle: ${pair.driveId}`);
  seenStances.add(pair.stanceId);
  seenDrives.add(pair.driveId);
  assert.ok(engine.completeScene(cycleState, cards));
}
assert.equal(seenStances.size, 240);
assert.equal(seenDrives.size, 240);
assert.deepEqual(engine.remaining(cycleState), { stances: 0, drives: 0 });
assert.equal(cycleState.history.length, 240);
const nextCyclePair = engine.drawPair(cycleState, cards, cycleRandom);
assert.ok(nextCyclePair.stanceId);
assert.ok(nextCyclePair.driveId);
assert.deepEqual(cycleState.cycles, { stance: 2, drive: 2 });
assert.deepEqual(engine.remaining(cycleState), { stances: 239, drives: 239 });

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
for (let index = 0; index < 60; index += 1) {
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
assert.equal(new Set(focusedStances).size, 60);
assert.equal(new Set(focusedDrives).size, 60);
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
