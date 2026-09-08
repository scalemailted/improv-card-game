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

for (const file of ["card-bible.js", "cards/core-foundations.js", "cards/everyday-friction.js", "cards/power-games.js", "cards/relationship-knots.js", "cards/emotional-pressure.js", "cards/secrets-schemes.js", "cards/absurd-commitment.js", "cards/rules-rituals-institutions.js", "cards/competition-consequences.js", "cards/advanced-scene-engines.js", "cards.js", "hint-bible.js", "exercises.js", "examples/manifest.js", "examples/library-client.js"]) {
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
assert.ok(context.IMPROMPT_EXAMPLE_LIBRARY);
assert.equal(context.IMPROMPT_EXAMPLE_MANIFEST.schema,2);
assert.equal(context.IMPROMPT_EXAMPLE_MANIFEST.counts.singleCards,480);
assert.equal(context.IMPROMPT_EXAMPLE_MANIFEST.counts.pairs,57600);
assert.equal(context.IMPROMPT_HINT_ENGINE,undefined);
console.log('✓ Browser UMD loading order: complete cards, policies, exercises and compressed scene library');
