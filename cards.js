(function (root, factory) {
  const isCommonJs = typeof module === "object" && module.exports;
  const bible = isCommonJs ? require("./card-bible.js") : root.IMPROMPT_CARD_BIBLE;
  const packs = isCommonJs
    ? [
        require("./cards/core-foundations.js"),
        require("./cards/everyday-friction.js"),
        require("./cards/power-games.js"),
        require("./cards/relationship-knots.js"),
        require("./cards/emotional-pressure.js")
      ]
    : (root.IMPROMPT_CARD_PACKS || []);
  const cards = factory(bible, packs);

  if (isCommonJs) {
    module.exports = cards;
  } else {
    root.IMPROMPT_CARDS = cards;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (bible, packs) {
  "use strict";

  if (!bible) {
    throw new Error("cards.js requires card-bible.js to load first.");
  }

  function deepFreeze(value) {
    if (!value || typeof value !== "object" || Object.isFrozen(value)) {
      return value;
    }
    Object.freeze(value);
    for (const child of Object.values(value)) {
      deepFreeze(child);
    }
    return value;
  }

  const activeStatuses = new Set(["published", "playtest"]);
  const activePacks = [...packs]
    .filter((pack) => pack && activeStatuses.has(pack.status))
    .sort((left, right) => left.sequence - right.sequence);
  const publishedPacks = activePacks.filter((pack) => pack.status === "published");
  const playtestPacks = activePacks.filter((pack) => pack.status === "playtest");

  const stances = activePacks.flatMap((pack) => pack.stances || []);
  const drives = activePacks.flatMap((pack) => pack.drives || []);

  const library = {
    schemaVersion: bible.CARD_SCHEMA_VERSION,
    libraryPlanVersion: bible.LIBRARY_PLAN_VERSION,
    activePackCount: activePacks.length,
    publishedPackCount: publishedPacks.length,
    playtestPackCount: playtestPacks.length,
    targetPackCount: bible.packPlan.length,
    activeStanceCount: stances.length,
    activeDriveCount: drives.length,
    publishedStanceCount: publishedPacks.reduce((sum, pack) => sum + (pack.stances || []).length, 0),
    publishedDriveCount: publishedPacks.reduce((sum, pack) => sum + (pack.drives || []).length, 0),
    playtestStanceCount: playtestPacks.reduce((sum, pack) => sum + (pack.stances || []).length, 0),
    playtestDriveCount: playtestPacks.reduce((sum, pack) => sum + (pack.drives || []).length, 0),
    targetStanceCount: bible.TARGET_STANCE_COUNT,
    targetDriveCount: bible.TARGET_DRIVE_COUNT,
    cardPacks: activePacks,
    packs: activePacks.map((pack) => ({
      id: pack.id,
      title: pack.title,
      version: pack.version,
      sequence: pack.sequence,
      status: pack.status,
      description: pack.description,
      stanceCount: pack.stances.length,
      driveCount: pack.drives.length
    })),
    stances,
    drives,
    categories: bible.categories,
    categoryStyles: bible.categoryStyles,
    defaultCategoryStyle: bible.defaultCategoryStyle,
    cardBible: bible
  };

  return deepFreeze(library);
});
