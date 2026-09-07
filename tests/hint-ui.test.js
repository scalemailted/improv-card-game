"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const html = read("index.html");
const app = read("app.js");
const styles = read("styles.css");
const sw = read("sw.js");
const guide = read("docs/IMPROMPT-HINT-BIBLE.md");
const notes = read("RELEASE-NOTES-v0.20.0.md");

for (const id of [
  "stanceNudgeButton", "driveNudgeButton", "combinationHintButton", "hintUnlockCard", "unlockHintsButton",
  "hintDialog", "hintDialogBody", "anotherHintAngleButton", "hintAngleCount", "doneHintButton",
  "exerciseHintPolicySelect", "customHintPolicySelect", "shareHintPolicySummary", "joinHintPolicySummary",
  "learn-hints"
]) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `Missing ${id}`);
}
assert.match(html, /Need a nudge\?/i);
assert.match(html, /How might these work together\?/i);
assert.match(html, /Another angle/i);
assert.match(html, /Curated locally\. Nothing leaves this phone\./i);
assert.match(html, /Full coaching/i);
assert.match(html, /After first attempt/i);
assert.match(html, /Hints off/i);

assert.match(app, /function renderHintControls/);
assert.match(app, /function openSingleHint/);
assert.match(app, /function openCombinationHint/);
assert.match(app, /function showAnotherHintAngle/);
assert.match(app, /engine\.unlockHints/);
assert.match(app, /hintEngine\.getSingleHint/);
assert.match(app, /hintEngine\.getCombinationHint/);
assert.match(app, /renderHintPolicySummary/);

for (const selector of [".card-nudge-button", ".combination-hint-button", ".hint-modal", ".hint-block", ".hint-policy-summary"]) {
  assert.ok(styles.includes(selector), `Missing CSS selector ${selector}`);
}
for (const asset of ["hint-bible.js?v=0.20.0", "hints/card-hints.js?v=0.20.0", "hint-engine.js?v=0.20.0"]) {
  assert.ok(html.includes(asset), `HTML does not load ${asset}`);
  assert.ok(sw.includes(asset), `Service worker does not cache ${asset}`);
}
assert.match(guide, /one possible way in/i);
assert.match(guide, /Holder-only contract/i);
assert.match(guide, /57,600/i);
assert.match(notes, /Nudge & Combination Hint System/i);

console.log("✓ v0.20 hint controls, modal, policies, offline assets, and Hint Bible documentation passed");
