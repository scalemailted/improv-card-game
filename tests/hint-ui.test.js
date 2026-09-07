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
const notes = read("RELEASE-NOTES-v0.21.2.md");

for (const id of [
  "stanceNudgeButton", "driveNudgeButton", "stanceVetoButton", "driveVetoButton", "combinationHintButton", "hintUnlockCard", "unlockHintsButton",
  "hintDialog", "hintDialogBody", "anotherHintAngleButton", "hintAngleCount", "doneHintButton",
  "exerciseHintPolicySelect", "customHintPolicySelect", "shareHintPolicySummary", "joinHintPolicySummary",
  "learn-hints"
]) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `Missing ${id}`);
}
assert.match(html, /Need a nudge\?/i);
assert.match(html, /How might these work together\?/i);
assert.match(html, /Another angle/i);
assert.match(html, /Built-in example/i);
assert.doesNotMatch(html, /id="hintDialogIntro"/);
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

for (const selector of [".card-inline-action", ".card-veto-button", ".card-nudge-button", ".combination-hint-button", ".hint-modal", ".hint-block", ".hint-policy-summary"]) {
  assert.ok(styles.includes(selector), `Missing CSS selector ${selector}`);
}
for (const asset of ["hint-bible.js?v=0.22.0", "hints/card-hints.js?v=0.22.0", "hints/fusion-profiles.js?v=0.22.0", "hints/concrete-fusion.js?v=0.22.0", "hint-engine.js?v=0.22.0"]) {
  assert.ok(html.includes(asset), `HTML does not load ${asset}`);
  assert.ok(sw.includes(asset), `Service worker does not cache ${asset}`);
}
assert.match(guide, /one possible way in/i);
assert.match(guide, /Holder-only contract/i);
assert.match(guide, /57,600/i);
assert.match(notes, /Concrete Fusion Repair/i);


const stanceWrap = html.match(/<div class="prompt-card-wrap" id="stanceCardWrap">([\s\S]*?)<\/div>\s*<div class="prompt-card-wrap" id="driveCardWrap">/i);
assert.ok(stanceWrap, "Could not locate the Stance card wrapper");
assert.match(stanceWrap[1], /id="stanceVetoButton"/);
assert.match(stanceWrap[1], /id="stanceNudgeButton"/);
assert.ok(stanceWrap[1].indexOf('id="stanceVetoButton"') < stanceWrap[1].indexOf('id="stanceNudgeButton"'));
assert.match(app, /function vetoInlineCard/);
assert.match(app, /elements\.stanceVetoButton\.addEventListener/);
assert.match(app, /elements\.driveVetoButton\.addEventListener/);
assert.match(styles, /\.card-veto-button\s*\{[\s\S]*?left:\s*16px/);
assert.match(styles, /\.card-nudge-button\s*\{[\s\S]*?right:\s*16px/);
assert.doesNotMatch(app, /Tap card to keep/);
assert.match(app, /config\.action\.hidden = isRevealed/);
console.log("✓ v0.21.2 card-integrated actions, repaired pair-specific fusion hints, policies, offline assets, and Hint Bible documentation passed");
