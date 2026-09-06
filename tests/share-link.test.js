"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const exercises = require("../exercises.js");

const root = path.resolve(__dirname, "..");
const publicUrl = "https://scalemailted.github.io/improv-card-game/";
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const app = read("app.js");
const html = read("index.html");
const serviceWorker = read("sw.js");

assert.match(app, new RegExp(`const GAME_URL = "${publicUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}";`));
assert.match(app, /elements\.shareQrLink\.href\s*=\s*GAME_URL/);
assert.match(app, /elements\.shareUrlLink\.href\s*=\s*GAME_URL/);
assert.match(app, /currentExerciseShareUrl\s*=\s*exercises\.buildShareUrl\(GAME_URL, sharingExercise, shareRoleTarget\)/);

const generalShareFunction = app.slice(
  app.indexOf("async function shareGameLink"),
  app.indexOf("function requestNewDeck")
);
assert.ok(generalShareFunction.length > 0);
assert.doesNotMatch(generalShareFunction, /window\.location\.href|location\.href/);

assert.match(html, /id="inviteButton"/);
assert.match(html, /id="playInviteButton"/);
assert.match(html, /id="shareQrLink"/);
assert.match(html, /id="exerciseShareScreen"/);
assert.match(html, /id="exerciseQrCode"/);
assert.ok(html.includes(`href="${publicUrl}"`));
assert.match(serviceWorker, /\.\/assets\/improv-card-game-qr\.png\?v=0\.13\.0/);

const statusUrl = exercises.buildShareUrl(publicUrl, exercises.getPreset("status-clash"));
assert.equal(statusUrl, `${publicUrl}?xv=1&x=status-clash`);
const roleUrl = exercises.buildShareUrl(publicUrl, exercises.getPreset("pursuer-avoider"), "a");
assert.equal(roleUrl, `${publicUrl}?xv=1&x=pursuer-avoider&r=a`);
for (const value of [statusUrl, roleUrl]) {
  assert.doesNotMatch(value, /stanceId|driveId|queue|history|sceneNumber|instanceId|deck=/i);
}

console.log("✓ General invite and exercise-configuration QR links preserve independent private decks");
