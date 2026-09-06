"use strict";

const assert = require("node:assert/strict");
const cards = require("../cards.js");
const bible = require("../card-bible.js");
const validator = require("../tools/card-validator.js");

const allCards = [...cards.stances, ...cards.drives];
assert.equal(new Set(allCards.map((card) => card.id)).size, 336);
assert.equal(new Set(allCards.map((card) => validator.normalizeText(card.title))).size, 336);
assert.equal(new Set(allCards.map((card) => validator.normalizeText(card.instruction))).size, 336);

for (const card of allCards) {
  const result = validator.validateCard(card);
  assert.deepEqual(result.errors, [], `${card.id} structural errors: ${JSON.stringify(result.errors)}`);
  assert.deepEqual(result.warnings, [], `${card.id} editorial warnings: ${JSON.stringify(result.warnings)}`);
  assert.ok(card.coachRoles.length >= 1 && card.coachRoles.length <= 4);
  assert.ok(card.motifs.length >= 1 && card.motifs.length <= 5);
  assert.ok(card.recommendedModes.includes("open"));
  if (card.packId === "core-foundations") {
    assert.equal(card.status, "published");
    assert.equal(card.contentVersion, "1.0.0");
  } else if (card.packId === "everyday-friction") {
    assert.equal(card.status, "playtest");
    assert.equal(card.contentVersion, "0.9.0");
  } else if (card.packId === "power-games") {
    assert.equal(card.status, "playtest");
    assert.equal(card.contentVersion, "0.10.0");
  } else if (card.packId === "relationship-knots") {
    assert.equal(card.status, "playtest");
    assert.equal(card.contentVersion, "0.11.0");
  } else if (card.packId === "emotional-pressure") {
    assert.equal(card.status, "playtest");
    assert.equal(card.contentVersion, "0.12.0");
  } else if (card.packId === "secrets-schemes") {
    assert.equal(card.status, "playtest");
    assert.equal(card.contentVersion, "0.13.0");
  } else {
    assert.equal(card.packId, "absurd-commitment");
    assert.equal(card.status, "playtest");
    assert.equal(card.contentVersion, "0.14.0");
  }
}

for (const packId of ["core-foundations", "everyday-friction", "power-games", "relationship-knots", "emotional-pressure", "secrets-schemes", "absurd-commitment"]) {
  for (const category of bible.categories) {
    const categoryCards = allCards.filter((card) => card.packId === packId && card.categoryId === category.id);
    const expected = category.deck === "stance" ? 6 : category.id === "direct-objectives" ? 12 : 6;
    assert.equal(categoryCards.length, expected, `${category.label} ${packId} quota`);
    for (const subtheme of category.subthemes) {
      assert.equal(
        categoryCards.filter((card) => card.subthemeId === subtheme.id).length,
        1,
        `${category.label} / ${subtheme.label} must have one ${packId} card`
      );
    }
  }
}

const badStance = {
  ...cards.stances[0],
  id: "S25",
  packId: "everyday-friction",
  status: "draft",
  title: "Guaranteed Reaction",
  instruction: "Your partner is secretly furious and will refuse every offer you make.",
  contentVersion: "0.1.0"
};
const badStanceResult = validator.validateCard(badStance);
assert.ok(badStanceResult.errors.some((entry) => entry.code === "hidden-info-partner-state"));

const badDrive = {
  ...cards.drives[0],
  id: "D25",
  packId: "everyday-friction",
  status: "draft",
  title: "Declared Secret",
  instruction: "They know you are lying and want you to confess.",
  contentVersion: "0.1.0"
};
const badDriveResult = validator.validateCard(badDrive);
assert.ok(badDriveResult.errors.some((entry) => entry.code === "hidden-info-drive-premise"));

const wrongRange = {
  ...cards.stances[0],
  id: "S49",
  packId: "everyday-friction",
  status: "draft",
  contentVersion: "0.1.0"
};
assert.ok(validator.validateCard(wrongRange).errors.some((entry) => entry.code === "pack-id-range"));

const duplicates = validator.detectLibraryDuplicates([
  cards.stances[0],
  { ...cards.stances[0], id: "S25", packId: "everyday-friction", contentVersion: "0.1.0", status: "draft" }
]);
assert.ok(duplicates.errors.some((entry) => entry.code === "duplicate-title"));
assert.ok(duplicates.errors.some((entry) => entry.code === "duplicate-instruction"));

console.log("✓ Imprompt card metadata, hidden-information rules, quotas, and duplicate gates passed");
