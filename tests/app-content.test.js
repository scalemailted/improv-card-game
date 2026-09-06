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
const manifest = read("manifest.webmanifest");

assert.match(html, /id="titleScreen"/);
assert.match(html, /Enter Imprompt/);
assert.match(html, /id="menuScreen"/);
assert.match(html, /Start a prompt session/);
assert.match(html, /Learn to play/);
assert.match(html, /Card gallery/);
assert.match(html, /Invite players/);
assert.match(html, /How you enter the scene/);
assert.match(html, /What keeps you playing/);
assert.match(app, /if \(!revealed\[type\]\)/);
assert.match(app, /openCardOptions\(type\)/);
assert.doesNotMatch(html, /Prototype deck/i);
assert.doesNotMatch(html, /brand-mark/);
assert.match(html, /<footer class="app-footer"[^>]*>[\s\S]*id="newDeckButton"/);
assert.match(manifest, /"short_name": "Imprompt"/);
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
assert.doesNotMatch(stanceTopline[1], /stanceKeptBadge|card-status-slot/);

const driveTopline = html.match(/<span class="card-topline">([\s\S]*?)<\/span>\s*<span class="card-role" id="driveRole">/);
assert.ok(driveTopline, "Drive top metadata row should be present");
assert.ok(driveTopline[1].indexOf('id="driveCategory"') < driveTopline[1].indexOf('>DRIVE<'));
assert.doesNotMatch(driveTopline[1], /driveKeptBadge|card-status-slot/);

const galleryTopline = html.match(/<div class="gallery-card-topline">([\s\S]*?)<\/div>\s*<h2 id="galleryTitle">/);
assert.ok(galleryTopline, "Gallery top metadata row should be present");
assert.ok(galleryTopline[1].indexOf('id="galleryCategory"') < galleryTopline[1].indexOf('id="galleryType"'));
assert.doesNotMatch(galleryTopline[1], /galleryCount/);

const galleryMeta = html.match(/<div class="gallery-meta">([\s\S]*?)<\/div>/);
assert.ok(galleryMeta, "Gallery bottom metadata row should be present");
assert.ok(galleryMeta[1].indexOf('id="galleryId"') < galleryMeta[1].indexOf('id="galleryCount"'));

assert.match(styles, /\.card-topline\s*\{[\s\S]*?display:\s*flex/);
assert.match(styles, /\.card-topline\s*\{[\s\S]*?justify-content:\s*space-between/);
assert.match(styles, /\.card-category\s*\{[\s\S]*?justify-content:\s*flex-start/);
assert.match(styles, /\.gallery-card-topline\s*\{[\s\S]*?display:\s*flex/);
assert.match(styles, /\.gallery-category\s*\{[\s\S]*?justify-content:\s*flex-start/);
assert.doesNotMatch(app, /stanceKeptBadge|driveKeptBadge|config\.keptBadge/);

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
assert.equal(new Set(Object.values(cards.categoryStyles).map((category) => category.id)).size, 7);
assert.equal(new Set(Object.values(cards.categoryStyles).map((category) => category.icon)).size, 7);
assert.equal(new Set(cards.stances.map((card) => card.category)).size, 4);
assert.equal(new Set(cards.drives.map((card) => card.category)).size, 3);

const retiredAssumptions = [
  "no one is treating you like it",
  "they are still angry",
  "they are preparing to replace",
  "although no one else seems concerned",
  "they simply have not realized"
];
const stanceCopy = cards.stances.map((card) => card.instruction.toLowerCase()).join("\n");
for (const phrase of retiredAssumptions) {
  assert.equal(stanceCopy.includes(phrase), false, `Retired other-player assumption remains: ${phrase}`);
}

console.log("✓ Imprompt title, menu, reveal, left-aligned category header, footer, and Stance-copy checks passed");
