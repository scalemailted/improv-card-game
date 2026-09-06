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

// Brand, top-level navigation, and private-deck language.
assert.match(html, /<span>im<\/span>prompt/i);
assert.match(html, /Start Open Play/);
assert.match(html, /Guided exercises/i);
assert.match(html, /Scene log &amp; coverage/i);
assert.match(html, /Learn to play/i);
assert.match(html, /Card gallery/i);
assert.match(html, /all 288 prompts/i);
assert.match(html, /id="stancesRemaining">144<\/strong>/);
assert.match(html, /id="drivesRemaining">144<\/strong>/);
assert.match(html, /id="galleryResultsCount">144 cards<\/span>/);
assert.match(html, /id="galleryCount">1 of 144<\/span>/);
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
assert.match(html, /Mirror asks:/);
assert.match(html, /Paired asks:/);
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
assert.ok(html.indexOf("./card-bible.js?v=0.13.0") < html.indexOf("./cards/core-foundations.js?v=0.13.0"));
assert.ok(html.indexOf("./cards/core-foundations.js?v=0.13.0") < html.indexOf("./cards/everyday-friction.js?v=0.13.0"));
assert.ok(html.indexOf("./cards/everyday-friction.js?v=0.13.0") < html.indexOf("./cards/power-games.js?v=0.13.0"));
assert.ok(html.indexOf("./cards/power-games.js?v=0.13.0") < html.indexOf("./cards/relationship-knots.js?v=0.13.0"));
assert.ok(html.indexOf("./cards/relationship-knots.js?v=0.13.0") < html.indexOf("./cards/emotional-pressure.js?v=0.13.0"));
assert.ok(html.indexOf("./cards/emotional-pressure.js?v=0.13.0") < html.indexOf("./cards/secrets-schemes.js?v=0.13.0"));
assert.ok(html.indexOf("./cards/secrets-schemes.js?v=0.13.0") < html.indexOf("./cards.js?v=0.13.0"));
assert.equal(cards.activePackCount, 6);
assert.equal(cards.publishedPackCount, 1);
assert.equal(cards.playtestPackCount, 5);
assert.equal(cards.stances.length, 144);
assert.equal(cards.drives.length, 144);
assert.equal(cards.targetPackCount, 10);
assert.equal(cards.targetStanceCount, 240);
assert.equal(cards.targetDriveCount, 240);

// Release and offline contract.
for (const asset of ["styles.css", "card-bible.js", "cards/core-foundations.js", "cards/everyday-friction.js", "cards/power-games.js", "cards/relationship-knots.js", "cards/emotional-pressure.js", "cards/secrets-schemes.js", "cards.js", "exercises.js", "deck-engine.js", "vendor/qrcode-core.js", "app.js"]) {
  assert.match(html, new RegExp(`${asset.replace(/[./]/g, "\\$&")}\\?v=0\\.13\\.0`));
  assert.match(serviceWorker, new RegExp(`${asset.replace(/[./]/g, "\\$&")}\\?v=0\\.13\\.0`));
}
assert.match(serviceWorker, /imprompt-v0\.13\.0/);
assert.doesNotMatch(serviceWorker, /skipWaiting/);
assert.match(app, /updateViaCache:\s*"none"/);
assert.match(manifest, /"short_name": "Imprompt"/);
assert.match(manifest, /coach-guided Mirror and Paired exercises/);

// QR SVG modules must not inherit the global rounded SVG stroke.
assert.match(styles, /\.dynamic-qr-panel svg,\s*\.dynamic-qr-panel svg \*[\s\S]*?stroke:\s*none\s*!important/);

console.log("✓ Imprompt v0.13 application, Card Bible, guided-exercise, gallery, history, and cache contracts passed");
