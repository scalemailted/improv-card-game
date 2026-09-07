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
const guide = read("docs/SCENE-CRAFT-GUIDE.md");
const notes = read("RELEASE-NOTES-v0.19.0.md");

const guideSections = [
  "learn-quick-start",
  "learn-concepts",
  "learn-two-drives",
  "learn-convergence",
  "learn-secret-not-cryptic",
  "learn-not-a-win-condition",
  "learn-postmortem",
  "learn-coach-guidance"
];
for (const id of guideSections) {
  assert.match(html, new RegExp(`<details[^>]+id=["']${id}["']`), `Missing guide section ${id}`);
}

assert.match(html, /Two private prompts\. One shared scene\./i);
assert.match(html, /Use the card to enter the scene\. Use your partner to discover the scene\./i);
assert.match(html, /They can align, oppose, or become unequal/i);
assert.match(html, /Partner first/i);
assert.match(html, /Shared pattern second/i);
assert.match(html, /Private card third/i);
assert.match(html, /Secret Does Not Mean Cryptic/i);
assert.match(html, /A Drive Is Not a Win Condition/i);
assert.match(html, /What shared pattern emerged\?/i);
assert.match(html, /Coach Guidance/i);
assert.match(html, /MIRROR/i);
assert.match(html, /PAIRED/i);

for (const id of ["driveHelpButton", "historyPostmortemGuide", "historyGuideButton", "learnBackLabel", "learnTwoDrivesJumpButton"]) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `Missing contextual guide element ${id}`);
}

assert.match(html, /YOUR PRIVATE POINT OF VIEW/);
assert.match(html, /YOUR INITIAL PRESSURE/);
assert.match(html, /Let it bend when the scene finds a shared pattern\./);
assert.match(app, /role: "YOUR PRIVATE POINT OF VIEW"/);
assert.match(app, /role: "YOUR INITIAL PRESSURE"/);
assert.match(app, /function openLearnSection/);
assert.match(app, /function closeLearnGuide/);
assert.match(app, /function revealLearnSection/);
assert.match(app, /openLearnSection\("learn-two-drives", "play"\)/);
assert.match(app, /openLearnSection\("learn-postmortem", "history"\)/);
assert.match(app, /historyPostmortemGuide\.hidden = count === 0/);

assert.match(styles, /\.learn-accordion/);
assert.match(styles, /\.learn-section > summary/);
assert.match(styles, /\.drive-combination-grid/);
assert.match(styles, /\.priority-flow/);
assert.match(styles, /\.scene-craft-link/);
assert.match(styles, /@media \(max-width: 370px\)/);

assert.match(guide, /How two Drives become one scene/i);
assert.match(guide, /Partner first → shared pattern second → private card third/i);
assert.match(notes, /changes no playable card content/i);

assert.equal(cards.stances.length, 240);
assert.equal(cards.drives.length, 240);
for (const card of [...cards.stances, ...cards.drives]) {
  assert.notEqual(card.contentVersion, "0.19.0", `${card.id} should not receive a v0.19 card-content version`);
}

console.log("✓ Imprompt v0.19 Scene Craft Guide, contextual learning, and unchanged 480-card library passed");
