"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const cards = require("../cards.js");
const exercises = require("../exercises.js");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const html = read("index.html");
const app = read("app.js");
const styles = read("styles.css");
const serviceWorker = read("sw.js");
const manifest = read("manifest.webmanifest");
const releaseNotes = read("RELEASE-NOTES-v0.20.0.md");
const sceneCraftReleaseNotes = read("RELEASE-NOTES-v0.19.0.md");
const editorialReleaseNotes = read("RELEASE-NOTES-v0.18.0.md");
const editorialDocs = [
  "docs/editorial/EDITORIAL-CONSOLIDATION-v0.18.0.md",
  "docs/editorial/AMBER-SUBTHEME-REVIEW-v0.18.0.md",
  "docs/editorial/STAGED-PUBLICATION-PLAN-v0.18.0.md",
  "docs/editorial/LIVE-VALIDATION-WORKSHEET-v0.18.0.md"
];
const editorialData = [
  "editorial/v0.18.0/revision-ledger.json",
  "editorial/v0.18.0/overlap-resolution.json",
  "editorial/v0.18.0/amber-subtheme-review.json",
  "editorial/v0.18.0/subtheme-readiness.json",
  "editorial/v0.18.0/publication-waves.json"
];

// Brand, top-level navigation, and private-deck language.
assert.match(html, /<span>im<\/span>prompt/i);
assert.match(html, /Start Open Play/);
assert.match(html, /Guided exercises/i);
assert.match(html, /Scene log &amp; coverage/i);
assert.match(html, /Learn to play/i);
assert.match(html, /Card gallery/i);
assert.match(html, /all 480 prompts/i);
assert.match(html, /id="stancesRemaining">240<\/strong>/);
assert.match(html, /id="drivesRemaining">240<\/strong>/);
assert.match(html, /id="galleryResultsCount">240 cards<\/span>/);
assert.match(html, /id="galleryCount">1 of 240<\/span>/);
assert.match(html, /Invite players/i);
assert.match(html, /Every phone still shuffles independently/i);
assert.doesNotMatch(html, /Prototype deck/i);
assert.match(html, /<footer class="app-footer"[^>]*>[\s\S]*id="newDeckButton"/);

// Guided exercise surfaces.
for (const id of [
  "exercisesScreen", "exerciseDetailScreen", "customExerciseScreen", "exerciseShareScreen",
  "joinExerciseScreen", "mirrorExerciseList", "pairedExerciseList", "exerciseRoleGrid",
  "customExerciseForm", "shareRoleChooserButton", "exerciseQrCode", "acceptExerciseInviteButton"
]) {
  assert.match(html, new RegExp(`id=["']${id}["']`));
}
assert.match(html, /Same dramatic force, independent cards/i);
assert.match(html, /Complementary dramatic functions/i);
assert.match(html, /Lock category choices during play/);
assert.match(html, /Make both role assignments public/);
assert.match(app, /exercises\.createSessionSelection/);
assert.match(app, /exercises\.buildShareUrl/);
assert.match(app, /exercises\.parseInviteUrl/);
assert.match(app, /engine\.startSession/);
assert.match(app, /function renderExerciseShare/);
assert.match(app, /function renderJoinExercise/);
assert.match(app, /function saveCustomExercise/);
assert.match(app, /const savedExercises = state\.savedExercises\.map/);
assert.match(html, /Saved custom exercises will remain available/);

// Scene sessions, immutable history snapshots, and coverage.
assert.match(html, /id="historyScenesTab"/);
assert.match(html, /id="historyCoverageTab"/);
assert.match(html, /id="stanceCoverageList"/);
assert.match(html, /id="driveCoverageList"/);
assert.match(app, /stanceSnapshot/);
assert.match(app, /driveSnapshot/);
assert.match(app, /function createHistorySessionGroup/);
assert.match(app, /function renderCoverage/);
assert.match(app, /engine\.completeScene\(state, cards\)/);
assert.match(app, /engine\.reconcileStateWithLibrary\(parsed, cards\)/);

// Improved gallery.
for (const id of [
  "gallerySearchInput", "galleryCategoryFilters", "galleryCardViewButton", "galleryListViewButton",
  "galleryListPanel", "galleryResultsCount"
]) {
  assert.match(html, new RegExp(`id=["']${id}["']`));
}
assert.match(app, /function galleryFilteredCards/);
assert.match(app, /function renderGalleryFilters/);
assert.match(app, /function createGalleryListRow/);

// Existing hidden-card and individual-veto mechanics remain present.
assert.match(html, /How you enter the scene/);
assert.match(html, /What keeps you playing/);
assert.match(html, /id="stanceFilterButton"/);
assert.match(html, /id="driveFilterButton"/);
assert.match(html, /id="filterDialog"/);
assert.match(app, /engine\.drawCard\(state, cards, type\)/);
assert.match(app, /engine\.vetoCard\(state, cards, type\)/);
assert.doesNotMatch(app, /engine\.drawPair\(state, cards\);/);

// Local hint surfaces and coach policy controls.
for (const id of [
  "stanceNudgeButton", "driveNudgeButton", "combinationHintButton", "hintUnlockCard",
  "hintDialog", "anotherHintAngleButton", "exerciseHintPolicySelect", "customHintPolicySelect",
  "shareHintPolicySummary", "joinHintPolicySummary"
]) {
  assert.match(html, new RegExp(`id=["']${id}["']`));
}
assert.match(app, /function renderHintControls/);
assert.match(app, /function openSingleHint/);
assert.match(app, /function openCombinationHint/);
assert.match(app, /function showAnotherHintAngle/);
assert.match(app, /hintEngine\.getSingleHint/);
assert.match(app, /hintEngine\.getCombinationHint/);
assert.match(styles, /\.card-nudge-button/);
assert.match(styles, /\.hint-modal/);
assert.match(styles, /\.combination-hint-button/);

// Category identity remains consistent and accessible by color, icon, and written label.
const expectedCategories = [
  "Status & Authority",
  "History & Relationship",
  "Emotional Assumptions",
  "Worldview & Absurdity",
  "Direct Objectives",
  "Secrets & Avoidance",
  "Repeatable Behaviors"
];
assert.deepEqual(Object.keys(cards.categoryStyles), expectedCategories);
for (const card of [...cards.stances, ...cards.drives]) {
  assert.ok(cards.categoryStyles[card.category], `Missing category style for ${card.id}`);
}
for (const category of Object.values(cards.categoryStyles)) {
  assert.match(styles, new RegExp(`data-category=["']${category.id}["']`));
  assert.match(html, new RegExp(`category-icon-${category.icon}`));
}
assert.equal(exercises.getPresets("mirror").length, 4);
assert.equal(exercises.getPresets("paired").length, 4);

// Card Bible runtime files load before the compatibility aggregator.
assert.ok(html.indexOf("./card-bible.js?v=0.20.0") < html.indexOf("./cards/core-foundations.js?v=0.20.0"));
assert.ok(html.indexOf("./cards/core-foundations.js?v=0.20.0") < html.indexOf("./cards/everyday-friction.js?v=0.20.0"));
assert.ok(html.indexOf("./cards/everyday-friction.js?v=0.20.0") < html.indexOf("./cards/power-games.js?v=0.20.0"));
assert.ok(html.indexOf("./cards/power-games.js?v=0.20.0") < html.indexOf("./cards/relationship-knots.js?v=0.20.0"));
assert.ok(html.indexOf("./cards/relationship-knots.js?v=0.20.0") < html.indexOf("./cards/emotional-pressure.js?v=0.20.0"));
assert.ok(html.indexOf("./cards/emotional-pressure.js?v=0.20.0") < html.indexOf("./cards/secrets-schemes.js?v=0.20.0"));
assert.ok(html.indexOf("./cards/secrets-schemes.js?v=0.20.0") < html.indexOf("./cards/absurd-commitment.js?v=0.20.0"));
assert.ok(html.indexOf("./cards/absurd-commitment.js?v=0.20.0") < html.indexOf("./cards/rules-rituals-institutions.js?v=0.20.0"));
assert.ok(html.indexOf("./cards/rules-rituals-institutions.js?v=0.20.0") < html.indexOf("./cards/competition-consequences.js?v=0.20.0"));
assert.ok(html.indexOf("./cards/competition-consequences.js?v=0.20.0") < html.indexOf("./cards/advanced-scene-engines.js?v=0.20.0"));
assert.ok(html.indexOf("./cards/advanced-scene-engines.js?v=0.20.0") < html.indexOf("./cards.js?v=0.20.0"));
assert.ok(html.indexOf("./cards.js?v=0.20.0") < html.indexOf("./hint-bible.js?v=0.20.0"));
assert.ok(html.indexOf("./hint-bible.js?v=0.20.0") < html.indexOf("./hints/card-hints.js?v=0.20.0"));
assert.ok(html.indexOf("./hints/card-hints.js?v=0.20.0") < html.indexOf("./hint-engine.js?v=0.20.0"));
assert.ok(html.indexOf("./hint-engine.js?v=0.20.0") < html.indexOf("./exercises.js?v=0.20.0"));
assert.equal(cards.activePackCount, 10);
assert.equal(cards.publishedPackCount, 1);
assert.equal(cards.playtestPackCount, 9);
assert.equal(cards.liveValidationPackCount, 9);
assert.equal(cards.publicationCandidatePackCount, 0);

assert.equal(cards.libraryPlanVersion, "1.10.0");
assert.equal(cards.packs.filter((pack) => pack.publicationStage === "live-validation").length, 9);
assert.deepEqual([...new Set(cards.packs.filter((pack) => pack.status === "playtest").map((pack) => pack.publicationWave))], [1, 2, 3]);
for (const pack of cards.packs) {
  assert.equal(pack.editorialReviewVersion, "0.18.0");
}
assert.equal(cards.stances.length, 240);
assert.equal(cards.drives.length, 240);
assert.equal(cards.targetPackCount, 10);
assert.equal(cards.targetStanceCount, 240);
assert.equal(cards.targetDriveCount, 240);

// Release and offline contract.
for (const asset of ["styles.css", "card-bible.js", "cards/core-foundations.js", "cards/everyday-friction.js", "cards/power-games.js", "cards/relationship-knots.js", "cards/emotional-pressure.js", "cards/secrets-schemes.js", "cards/absurd-commitment.js", "cards/rules-rituals-institutions.js", "cards/competition-consequences.js", "cards/advanced-scene-engines.js", "cards.js", "hint-bible.js", "hints/card-hints.js", "hint-engine.js", "exercises.js", "deck-engine.js", "vendor/qrcode-core.js", "app.js"]) {
  assert.match(html, new RegExp(`${asset.replace(/[./]/g, "\\$&")}\\?v=0\\.20\\.0`));
  assert.match(serviceWorker, new RegExp(`${asset.replace(/[./]/g, "\\$&")}\\?v=0\\.20\\.0`));
}
assert.match(serviceWorker, /imprompt-v0\.20\.0/);
assert.doesNotMatch(serviceWorker, /skipWaiting/);
assert.match(app, /updateViaCache:\s*"none"/);
assert.match(manifest, /"short_name": "Imprompt"/);
assert.match(manifest, /local coaching nudges/i);


// v0.18 editorial-readiness evidence is packaged with the application source.
assert.match(editorialReleaseNotes, /24 semantic rewrites/i);
assert.match(sceneCraftReleaseNotes, /Scene Craft Guide/i);
assert.match(releaseNotes, /Nudge & Combination Hint System/i);
assert.match(editorialReleaseNotes, /1,200 opposite-deck pairings/i);
for (const file of [...editorialDocs, ...editorialData]) {
  assert.ok(fs.existsSync(path.join(root, file)), `Missing editorial artifact: ${file}`);
}
for (const file of editorialData) {
  assert.doesNotThrow(() => JSON.parse(read(file)), `Invalid editorial JSON: ${file}`);
}

// QR SVG modules must not inherit the global rounded SVG stroke.
assert.match(styles, /\.dynamic-qr-panel svg,\s*\.dynamic-qr-panel svg \*[\s\S]*?stroke:\s*none\s*!important/);

console.log("✓ Imprompt v0.20 application, local hints, Scene Craft Guide, editorial readiness, guided-exercise, gallery, history, and cache contracts passed");
