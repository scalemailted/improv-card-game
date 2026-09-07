"use strict";

const assert = require("node:assert/strict");
const bible = require("../card-bible.js");
const cards = require("../cards.js");
const core = require("../cards/core-foundations.js");
const everyday = require("../cards/everyday-friction.js");
const power = require("../cards/power-games.js");
const relationship = require("../cards/relationship-knots.js");
const emotional = require("../cards/emotional-pressure.js");
const secrets = require("../cards/secrets-schemes.js");
const absurd = require("../cards/absurd-commitment.js");
const institutions = require("../cards/rules-rituals-institutions.js");
const competition = require("../cards/competition-consequences.js");
const validator = require("../tools/card-validator.js");

assert.equal(bible.CARD_SCHEMA_VERSION, 1);
assert.equal(bible.TARGET_STANCE_COUNT, 240);
assert.equal(bible.TARGET_DRIVE_COUNT, 240);
assert.equal(bible.categories.length, 7);
assert.equal(bible.categories.reduce((sum, category) => sum + category.subthemes.length, 0), 48);
assert.equal(bible.packPlan.length, 10);
assert.equal(new Set(bible.packPlan.map((pack) => pack.id)).size, 10);
assert.equal(new Set(bible.coachRoles.map((role) => role.id)).size, bible.coachRoles.length);
assert.equal(new Set(bible.motifs).size, bible.motifs.length);

const stanceCategories = bible.categories.filter((category) => category.deck === "stance");
const driveCategories = bible.categories.filter((category) => category.deck === "drive");
assert.equal(stanceCategories.length, 4);
assert.equal(driveCategories.length, 3);
assert.equal(stanceCategories.reduce((sum, category) => sum + category.targetCount, 0), 240);
assert.equal(driveCategories.reduce((sum, category) => sum + category.targetCount, 0), 240);

for (const category of stanceCategories) {
  assert.equal(category.subthemes.length, 6, `${category.id} must have six Stance subthemes`);
  assert.equal(category.subthemes.reduce((sum, subtheme) => sum + subtheme.targetCount, 0), 60);
}
assert.equal(bible.getCategory("direct-objectives").subthemes.length, 12);
assert.equal(bible.getCategory("direct-objectives").subthemes.reduce((sum, subtheme) => sum + subtheme.targetCount, 0), 120);
for (const categoryId of ["secrets-avoidance", "repeatable-behaviors"]) {
  const category = bible.getCategory(categoryId);
  assert.equal(category.subthemes.length, 6);
  assert.equal(category.subthemes.reduce((sum, subtheme) => sum + subtheme.targetCount, 0), 60);
}

for (let index = 0; index < bible.packPlan.length; index += 1) {
  const pack = bible.packPlan[index];
  const expectedStart = index * 24 + 1;
  const expectedEnd = expectedStart + 23;
  assert.deepEqual(pack.stanceRange, [expectedStart, expectedEnd]);
  assert.deepEqual(pack.driveRange, [expectedStart, expectedEnd]);
  assert.equal(pack.targetStances, 24);
  assert.equal(pack.targetDrives, 24);
  assert.equal(bible.expectedPackForCardId(bible.formatCardId("stance", expectedStart)).id, pack.id);
  assert.equal(bible.expectedPackForCardId(bible.formatCardId("drive", expectedEnd)).id, pack.id);
}
assert.equal(bible.formatCardId("stance", 1), "S01");
assert.equal(bible.formatCardId("drive", 99), "D99");
assert.equal(bible.formatCardId("stance", 100), "S100");
assert.deepEqual(bible.parseCardId("D240"), { type: "drive", number: 240 });
assert.equal(bible.parseCardId("S241"), null);

assert.equal(core.id, "core-foundations");
assert.equal(core.stances.length, 24);
assert.equal(core.drives.length, 24);
assert.equal(everyday.stances.length, 24);
assert.equal(everyday.drives.length, 24);
assert.equal(everyday.status, "playtest");
assert.equal(power.stances.length, 24);
assert.equal(power.drives.length, 24);
assert.equal(power.status, "playtest");
assert.equal(relationship.stances.length, 24);
assert.equal(relationship.drives.length, 24);
assert.equal(relationship.status, "playtest");
assert.equal(emotional.stances.length, 24);
assert.equal(emotional.drives.length, 24);
assert.equal(emotional.status, "playtest");
assert.equal(secrets.stances.length, 24);
assert.equal(secrets.drives.length, 24);
assert.equal(secrets.status, "playtest");
assert.equal(absurd.stances.length, 24);
assert.equal(absurd.drives.length, 24);
assert.equal(absurd.status, "playtest");
assert.equal(institutions.stances.length, 24);
assert.equal(institutions.drives.length, 24);
assert.equal(institutions.status, "playtest");
assert.equal(competition.stances.length, 24);
assert.equal(competition.drives.length, 24);
assert.equal(competition.status, "playtest");
assert.equal(cards.libraryPlanVersion, "1.8.0");
assert.equal(cards.stances.length, 216);
assert.equal(cards.drives.length, 216);
assert.equal(cards.cardPacks.length, 9);
assert.equal(cards.activePackCount, 9);
assert.equal(cards.publishedPackCount, 1);
assert.equal(cards.playtestPackCount, 8);
assert.equal(cards.targetPackCount, 10);
assert.equal(cards.targetStanceCount, 240);
assert.equal(cards.targetDriveCount, 240);

assert.deepEqual(
  Object.keys(cards.categoryStyles),
  bible.categories.map((category) => category.label)
);

const audit = validator.auditLibrary(cards.cardPacks);
assert.equal(audit.passed, true);
assert.deepEqual(audit.errors, []);
assert.deepEqual(audit.warnings, []);
assert.equal(audit.summary.activePacks, 9);
assert.equal(audit.summary.publishedPacks, 1);
assert.equal(audit.summary.playtestPacks, 8);
assert.equal(audit.summary.stances, 216);
assert.equal(audit.summary.drives, 216);

console.log("✓ Imprompt Card Bible taxonomy, ten-pack plan, and Core Foundations, Everyday Friction, Power Games, Relationship Knots, Emotional Pressure, Secrets & Schemes, Absurd Commitment, Rules, Rituals & Institutions, and Competition & Consequences integration passed");
