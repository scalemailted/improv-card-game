"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const context = vm.createContext({
  console,
  globalThis: null
});
context.globalThis = context;

for (const file of ["card-bible.js", "cards/core-foundations.js", "cards/everyday-friction.js", "cards/power-games.js", "cards/relationship-knots.js", "cards/emotional-pressure.js", "cards/secrets-schemes.js", "cards/absurd-commitment.js", "cards/rules-rituals-institutions.js", "cards/competition-consequences.js", "cards.js"]) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  vm.runInContext(source, context, { filename: file });
}

assert.ok(context.IMPROMPT_CARD_BIBLE);
assert.ok(Array.isArray(context.IMPROMPT_CARD_PACKS));
assert.equal(context.IMPROMPT_CARD_PACKS.length, 9);
assert.ok(context.IMPROMPT_CARDS);
assert.equal(context.IMPROMPT_CARDS.stances.length, 216);
assert.equal(context.IMPROMPT_CARDS.drives.length, 216);
assert.equal(context.IMPROMPT_CARDS.activePackCount, 9);
assert.equal(context.IMPROMPT_CARDS.publishedPackCount, 1);
assert.equal(context.IMPROMPT_CARDS.playtestPackCount, 8);
assert.equal(context.IMPROMPT_CARDS.targetPackCount, 10);
assert.equal(context.IMPROMPT_CARDS.stances[0].subthemeId, "command-presence");

console.log("✓ Browser UMD loading order produces the Card Bible and Core Foundations, Everyday Friction, Power Games, Relationship Knots, Emotional Pressure, Secrets & Schemes, Absurd Commitment, Rules, Rituals & Institutions, and Competition & Consequences active library");
