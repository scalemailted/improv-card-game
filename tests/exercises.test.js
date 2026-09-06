"use strict";

const assert = require("node:assert/strict");
const cards = require("../cards.js");
const exercises = require("../exercises.js");

const baseUrl = "https://scalemailted.github.io/improv-card-game/";

assert.equal(exercises.PRESETS.length, 8);
assert.equal(exercises.getPresets("mirror").length, 4);
assert.equal(exercises.getPresets("paired").length, 4);
assert.equal(exercises.OPEN_PLAY.mode, "open");

for (const preset of exercises.getPresets()) {
  assert.ok(preset.id);
  assert.ok(preset.name);
  assert.ok(["mirror", "paired"].includes(preset.mode));
  assert.equal(preset.roles.length, preset.mode === "paired" ? 2 : 1);
  for (const role of preset.roles) {
    assert.ok(exercises.createSessionSelection(preset, role.id));
    assert.ok(role.stanceFilter === "all" || cards.stances.some((card) => card.category === role.stanceFilter));
    assert.ok(role.driveFilter === "all" || cards.drives.some((card) => card.category === role.driveFilter));
  }
}

const mirror = exercises.getPreset("status-clash");
const mirrorUrl = exercises.buildShareUrl(baseUrl, mirror, "all");
assert.equal(mirrorUrl, `${baseUrl}?xv=1&x=status-clash`);
const parsedMirror = exercises.parseInviteUrl(mirrorUrl);
assert.equal(parsedMirror.exercise.id, "status-clash");
assert.equal(parsedMirror.exercise.mode, "mirror");
assert.equal(parsedMirror.roleId, null);

const paired = exercises.getPreset("pursuer-avoider");
const chooserUrl = exercises.buildShareUrl(baseUrl, paired, null);
assert.equal(chooserUrl, `${baseUrl}?xv=1&x=pursuer-avoider`);
const parsedChooser = exercises.parseInviteUrl(chooserUrl);
assert.equal(parsedChooser.exercise.id, "pursuer-avoider");
assert.equal(parsedChooser.roleId, null);

const roleAUrl = exercises.buildShareUrl(baseUrl, paired, "a");
const roleBUrl = exercises.buildShareUrl(baseUrl, paired, "b");
assert.match(roleAUrl, /[?&]r=a(?:&|$)/);
assert.match(roleBUrl, /[?&]r=b(?:&|$)/);
assert.equal(exercises.parseInviteUrl(roleAUrl).roleId, "a");
assert.equal(exercises.parseInviteUrl(roleBUrl).roleId, "b");

for (const urlString of [mirrorUrl, chooserUrl, roleAUrl, roleBUrl]) {
  const url = new URL(urlString);
  const forbidden = ["card", "cards", "stanceId", "driveId", "deck", "queue", "history", "scene", "instanceId"];
  for (const key of forbidden) {
    assert.equal(url.searchParams.has(key), false, `Exercise URL leaked ${key}`);
  }
}

const custom = exercises.normalizeExercise({
  id: "custom-calm-chaos",
  source: "custom",
  name: "Calm Versus Chaos",
  mode: "paired",
  summary: "Two contrasting private assignments.",
  focus: "Practice grounded emotion against repeatable escalation.",
  locked: true,
  roleVisibility: "hidden",
  roles: [
    {
      id: "a",
      label: "Calm",
      shortLabel: "Player A",
      description: "Play emotional truth while protecting a secret.",
      stanceFilter: "Emotional Assumptions",
      driveFilter: "Secrets & Avoidance"
    },
    {
      id: "b",
      label: "Chaos",
      shortLabel: "Player B",
      description: "Commit to unusual logic and repeat a behavior.",
      stanceFilter: "Worldview & Absurdity",
      driveFilter: "Repeatable Behaviors"
    }
  ]
}, { forceSource: "custom" });
assert.ok(custom);
const customUrl = exercises.buildShareUrl(baseUrl, custom, "b");
const parsedCustom = exercises.parseInviteUrl(customUrl);
assert.ok(parsedCustom);
assert.equal(parsedCustom.exercise.source, "custom");
assert.equal(parsedCustom.exercise.name, custom.name);
assert.equal(parsedCustom.exercise.mode, "paired");
assert.equal(parsedCustom.exercise.locked, true);
assert.equal(parsedCustom.exercise.roleVisibility, "hidden");
assert.equal(parsedCustom.exercise.roles[0].label, "Calm");
assert.equal(parsedCustom.exercise.roles[0].stanceFilter, "Emotional Assumptions");
assert.equal(parsedCustom.exercise.roles[0].driveFilter, "Secrets & Avoidance");
assert.equal(parsedCustom.exercise.roles[1].label, "Chaos");
assert.equal(parsedCustom.exercise.roles[1].stanceFilter, "Worldview & Absurdity");
assert.equal(parsedCustom.exercise.roles[1].driveFilter, "Repeatable Behaviors");
assert.equal(parsedCustom.roleId, "b");

const selection = exercises.createSessionSelection(parsedCustom.exercise, parsedCustom.roleId);
assert.equal(selection.name, "Calm Versus Chaos");
assert.equal(selection.mode, "paired");
assert.equal(selection.roleLabel, "Chaos");
assert.equal(selection.stanceFilter, "Worldview & Absurdity");
assert.equal(selection.driveFilter, "Repeatable Behaviors");

assert.equal(exercises.parseInviteUrl(baseUrl), null);
assert.equal(exercises.parseInviteUrl(`${baseUrl}?x=not-a-real-exercise`), null);
assert.equal(exercises.slugToFilter("status-authority"), "Status & Authority");
assert.equal(exercises.filterToSlug("Secrets & Avoidance"), "secrets-avoidance");

console.log("✓ Imprompt guided-exercise preset, paired-role, and private share-link tests passed");
