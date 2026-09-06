(function (root, factory) {
  const isCommonJs = typeof module === "object" && module.exports;
  const bible = isCommonJs ? require("./card-bible.js") : root.IMPROMPT_CARD_BIBLE;
  const packs = isCommonJs
    ? [require("./cards/core-foundations.js")]
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

  const publishedPacks = [...packs]
    .filter((pack) => pack && pack.status === "published")
    .sort((left, right) => left.sequence - right.sequence);

  const stances = publishedPacks.flatMap((pack) => pack.stances || []);
  const drives = publishedPacks.flatMap((pack) => pack.drives || []);

  const library = {
    schemaVersion: bible.CARD_SCHEMA_VERSION,
    libraryPlanVersion: bible.LIBRARY_PLAN_VERSION,
    publishedPackCount: publishedPacks.length,
    targetPackCount: bible.packPlan.length,
    publishedStanceCount: stances.length,
    publishedDriveCount: drives.length,
    targetStanceCount: bible.TARGET_STANCE_COUNT,
    targetDriveCount: bible.TARGET_DRIVE_COUNT,
    cardPacks: publishedPacks,
    packs: publishedPacks.map((pack) => ({
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
