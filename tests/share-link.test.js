"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const publicUrl = "https://scalemailted.github.io/improv-card-game/";
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const app = read("app.js");
const html = read("index.html");
const serviceWorker = read("sw.js");

assert.match(app, new RegExp(`const GAME_URL = "${publicUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}";`));
assert.match(app, /url:\s*GAME_URL/);
assert.match(app, /elements\.shareQrLink\.href\s*=\s*GAME_URL/);
assert.match(app, /elements\.shareUrlLink\.href\s*=\s*GAME_URL/);

const shareFunction = app.slice(
  app.indexOf("async function shareGameLink"),
  app.indexOf("function requestNewDeck")
);
assert.ok(shareFunction.length > 0, "The share function should be present.");
assert.doesNotMatch(shareFunction, /window\.location\.href|location\.href/);

assert.match(html, /id="inviteButton"/);
assert.match(html, /id="playInviteButton"/);
assert.match(html, /id="inviteScreen"/);
assert.match(html, /id="shareQrLink"/);
assert.match(html, /id="shareUrlLink"/);
assert.ok(html.includes(`href="${publicUrl}"`));
assert.match(serviceWorker, /\.\/assets\/improv-card-game-qr\.png/);

console.log("✓ Canonical Imprompt share-link tests passed");
