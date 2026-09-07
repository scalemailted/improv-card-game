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

for (const file of ["card-bible.js", "cards/core-foundations.js", "cards/everyday-friction.js", "cards/power-games.js", "cards/relationship-knots.js", "cards/emotional-pressure.js", "cards/secrets-schemes.js", "cards/absurd-commitment.js", "cards/rules-rituals-institutions.js", "cards/competition-consequences.js", "cards/advanced-scene-engines.js", "cards.js", "hint-bible.js", "hints/card-hints.js", "hints/concrete-fusion.js", "hint-engine.js"]) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  vm.runInContext(source, context, { filename: file });
}

assert.ok(context.IMPROMPT_CARD_BIBLE);
assert.ok(Array.isArray(context.IMPROMPT_CARD_PACKS));
assert.equal(context.IMPROMPT_CARD_PACKS.length, 10);
assert.ok(context.IMPROMPT_CARDS);
assert.equal(context.IMPROMPT_CARDS.stances.length, 240);
assert.equal(context.IMPROMPT_CARDS.drives.length, 240);
assert.equal(context.IMPROMPT_CARDS.activePackCount, 10);
assert.equal(context.IMPROMPT_CARDS.publishedPackCount, 1);
assert.equal(context.IMPROMPT_CARDS.playtestPackCount, 9);
assert.equal(context.IMPROMPT_CARDS.targetPackCount, 10);
assert.equal(context.IMPROMPT_CARDS.stances[0].subthemeId, "command-presence");
assert.ok(context.IMPROMPT_HINT_BIBLE);
assert.ok(context.IMPROMPT_CARD_HINTS);
assert.ok(context.IMPROMPT_CONCRETE_FUSION);
assert.ok(context.IMPROMPT_HINT_ENGINE);
assert.equal(context.IMPROMPT_CARD_HINTS.cardCount, 480);
assert.equal(context.IMPROMPT_CARD_HINTS.seedCount, 960);

console.log("✓ Browser UMD loading order produces the Card Bible and Core Foundations, Everyday Friction, Power Games, Relationship Knots, Emotional Pressure, Secrets & Schemes, Absurd Commitment, Rules, Rituals & Institutions, and Competition & Consequences, and Advanced Scene Engines active library plus the local Hint Bible and coaching engine");
