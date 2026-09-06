"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const cards = require("../cards.js");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const html = read("index.html");
const app = read("app.js");
const styles = read("styles.css");
const serviceWorker = read("sw.js");
const manifest = read("manifest.webmanifest");

assert.match(html, /<span>im<\/span>prompt/i);
assert.match(html, /Start a prompt session/);
assert.match(html, /Scene log/);
assert.match(html, /Learn to play/);
assert.match(html, /Card gallery/);
assert.match(html, /Invite players/);
assert.match(html, /How you enter the scene/);
assert.match(html, /What keeps you playing/);
assert.match(html, /id="historyScreen"/);
assert.match(html, /id="historyList"/);
assert.match(html, /id="historyButton"/);
assert.match(html, /id="stanceFilterButton"/);
assert.match(html, /id="driveFilterButton"/);
assert.match(html, /id="filterDialog"/);
assert.match(html, /id="filterOptions"/);
assert.match(html, /Random All/);
assert.match(html, /category-icon-shuffle/);
assert.match(html, /Complete and review/);
assert.match(html, /scene log, category choices/i);

assert.match(app, /engine\.startScene\(state\)/);
assert.match(app, /engine\.drawCard\(state, cards, type\)/);
assert.match(app, /engine\.setDrawFilter\(state, cards, type, filter\)/);
assert.match(app, /function renderHistory\(\)/);
assert.match(app, /function createHistoryEntry/);
assert.match(app, /function openFilterDialog/);
assert.match(app, /state\.history/);
assert.match(app, /if \(state\.current\[config\.currentKey\] === null\)/);
assert.doesNotMatch(app, /engine\.drawPair\(state, cards\);/);
assert.doesNotMatch(html, /Prototype deck/i);
assert.match(html, /<footer class="app-footer"[^>]*>[\s\S]*id="newDeckButton"/);
assert.match(manifest, /"short_name": "Imprompt"/);

assert.match(html, /styles\.css\?v=0\.6\.0/);
assert.match(html, /app\.js\?v=0\.6\.0/);
assert.match(html, /cards\.js\?v=0\.6\.0/);
assert.match(html, /deck-engine\.js\?v=0\.6\.0/);
assert.match(serviceWorker, /imprompt-v0\.6\.0/);
assert.doesNotMatch(serviceWorker, /skipWaiting/);
assert.match(app, /updateViaCache:\s*"none"/);

assert.match(html, /id="stanceCategory"/);
assert.match(html, /id="driveCategory"/);
assert.match(html, /id="galleryCategoryIcon"/);
assert.match(html, /id="cardDialogCategory"/);
assert.match(html, /category-icon-crown/);
assert.match(html, /category-icon-repeat/);
assert.match(app, /function applyCategoryStyle/);
assert.match(app, /clearCategoryStyle\(config\.button, config\.category\)/);

const stanceTopline = html.match(/<span class="card-topline">([\s\S]*?)<\/span>\s*<span class="card-role" id="stanceRole">/);
assert.ok(stanceTopline, "Stance top metadata row should be present");
assert.ok(stanceTopline[1].indexOf('id="stanceCategory"') < stanceTopline[1].indexOf('>STANCE<'));

const driveTopline = html.match(/<span class="card-topline">([\s\S]*?)<\/span>\s*<span class="card-role" id="driveRole">/);
assert.ok(driveTopline, "Drive top metadata row should be present");
assert.ok(driveTopline[1].indexOf('id="driveCategory"') < driveTopline[1].indexOf('>DRIVE<'));

assert.match(styles, /\.draw-filter-trigger\s*\{/);
assert.match(styles, /\.history-entry\s*\{/);
assert.match(styles, /\.history-prompt-grid\s*\{/);
assert.match(styles, /\.filter-option\s*\{/);
assert.match(styles, /\.card-topline\s*\{[\s\S]*?display:\s*flex/);
assert.match(styles, /\.card-topline\s*\{[\s\S]*?justify-content:\s*space-between/);

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
const allCards = [...cards.stances, ...cards.drives];
for (const card of allCards) {
  assert.ok(cards.categoryStyles[card.category], `Missing visual style for ${card.id}: ${card.category}`);
}
for (const category of Object.values(cards.categoryStyles)) {
  assert.match(styles, new RegExp(`data-category=["']${category.id}["']`));
  assert.match(html, new RegExp(`category-icon-${category.icon}`));
}
assert.equal(new Set(cards.stances.map((card) => card.category)).size, 4);
assert.equal(new Set(cards.drives.map((card) => card.category)).size, 3);

console.log("✓ Imprompt v0.6 scene-log, category-filter, layout, and cache-contract checks passed");
