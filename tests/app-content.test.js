"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const cards = require("../cards.js");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const html = read("index.html");
const app = read("app.js");
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

console.log("✓ Imprompt title, menu, reveal, footer, and Stance-copy checks passed");
