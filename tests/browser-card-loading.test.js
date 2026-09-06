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

for (const file of ["card-bible.js", "cards/core-foundations.js", "cards/everyday-friction.js", "cards.js"]) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  vm.runInContext(source, context, { filename: file });
}

assert.ok(context.IMPROMPT_CARD_BIBLE);
assert.ok(Array.isArray(context.IMPROMPT_CARD_PACKS));
assert.equal(context.IMPROMPT_CARD_PACKS.length, 2);
assert.ok(context.IMPROMPT_CARDS);
assert.equal(context.IMPROMPT_CARDS.stances.length, 48);
assert.equal(context.IMPROMPT_CARDS.drives.length, 48);
assert.equal(context.IMPROMPT_CARDS.activePackCount, 2);
assert.equal(context.IMPROMPT_CARDS.publishedPackCount, 1);
assert.equal(context.IMPROMPT_CARDS.playtestPackCount, 1);
assert.equal(context.IMPROMPT_CARDS.targetPackCount, 10);
assert.equal(context.IMPROMPT_CARDS.stances[0].subthemeId, "command-presence");

console.log("✓ Browser UMD loading order produces the Card Bible and Core Foundations and Everyday Friction active library");
