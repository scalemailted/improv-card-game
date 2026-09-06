"use strict";

const bible = require("../card-bible.js");

const HARD_TITLE_WORD_MAX = 7;
const HARD_INSTRUCTION_WORD_MAX = 32;
const RECOMMENDED_WORD_RANGES = Object.freeze({
  stance: Object.freeze({ min: 8, max: 28 }),
  drive: Object.freeze({ min: 4, max: 22 })
});

const PLAYABLE_OPENERS = new Set([
  "accept", "act", "agree", "approach", "avoid", "be", "behave", "carry", "choose", "coax",
  "correct", "create", "defend", "find", "frame", "get", "hide", "invent", "interpret", "keep",
  "make", "maneuver", "meet", "perform", "persuade", "probe", "project", "protect", "recruit",
  "redirect", "remain", "seek", "take", "treat", "turn", "use", "you"
]);

const PARTNER_ASSERTION_PATTERNS = [
  {
    code: "hidden-info-partner-state",
    regex: /\b(?:the other (?:player|performer)|your partner|they)\s+(?:is|are|was|were|will|wants?|needs?|believes?|thinks?|feels?|knows?|refuses?|agrees?|apologizes?|admits?)\b/i,
    message: "The instruction appears to declare another performer's private state or future behavior."
  },
  {
    code: "hidden-info-certain-reaction",
    regex: /\b(?:make sure|ensure|guarantee)\s+(?:they|the other (?:player|performer)|your partner)\b/i,
    message: "The instruction appears to guarantee another performer's reaction."
  }
];

function wordCount(text) {
  const words = String(text || "").trim().match(/[\p{L}\p{N}’'-]+/gu);
  return words ? words.length : 0;
}

function normalizeText(text) {
  return String(text || "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokenize(text) {
  const stopwords = new Set([
    "a", "an", "and", "as", "at", "be", "but", "by", "for", "from", "in", "into", "is", "it",
    "of", "on", "or", "that", "the", "their", "them", "then", "to", "while", "with", "you", "your"
  ]);
  return new Set(normalizeText(text).split(/\s+/).filter((token) => token && !stopwords.has(token)));
}

function jaccardSimilarity(left, right) {
  const a = tokenize(left);
  const b = tokenize(right);
  if (a.size === 0 && b.size === 0) {
    return 1;
  }
  const intersection = [...a].filter((token) => b.has(token)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

function issue(level, code, message, context = {}) {
  return { level, code, message, ...context };
}

function ensureArrayOfKnownValues(card, field, allowedValues, errors, minimum = 1, maximum = Infinity) {
  const values = card[field];
  if (!Array.isArray(values)) {
    errors.push(issue("error", `schema-${field}`, `${field} must be an array.`, { cardId: card.id }));
    return;
  }
  if (values.length < minimum || values.length > maximum) {
    errors.push(issue("error", `schema-${field}-count`, `${field} must contain ${minimum}-${maximum === Infinity ? "many" : maximum} values.`, { cardId: card.id }));
  }
  if (new Set(values).size !== values.length) {
    errors.push(issue("error", `schema-${field}-duplicate`, `${field} contains duplicate values.`, { cardId: card.id }));
  }
  for (const value of values) {
    if (!allowedValues.has(value)) {
      errors.push(issue("error", `schema-${field}-unknown`, `Unknown ${field} value: ${value}.`, { cardId: card.id }));
    }
  }
}

function validateCard(card) {
  const errors = [];
  const warnings = [];
  const requiredStrings = [
    "id", "type", "packId", "contentVersion", "status", "title", "instruction", "category",
    "categoryId", "subtheme", "subthemeId", "difficulty", "intensity", "tone", "orientation"
  ];

  if (!card || typeof card !== "object" || Array.isArray(card)) {
    return {
      errors: [issue("error", "schema-card-object", "Card must be an object.")],
      warnings
    };
  }

  for (const field of requiredStrings) {
    if (typeof card[field] !== "string" || !card[field].trim()) {
      errors.push(issue("error", `schema-${field}`, `${field} must be a nonempty string.`, { cardId: card.id || "unknown" }));
    }
  }

  if (card.schemaVersion !== bible.CARD_SCHEMA_VERSION) {
    errors.push(issue("error", "schema-version", `schemaVersion must be ${bible.CARD_SCHEMA_VERSION}.`, { cardId: card.id }));
  }

  const parsedId = bible.parseCardId(card.id);
  if (!parsedId) {
    errors.push(issue("error", "id-format", "Card ID must be S01-S240 or D01-D240.", { cardId: card.id }));
  } else if (parsedId.type !== card.type) {
    errors.push(issue("error", "id-type", `Card ID ${card.id} does not match type ${card.type}.`, { cardId: card.id }));
  }

  if (!bible.enums.cardTypes.includes(card.type)) {
    errors.push(issue("error", "type-value", `Unknown card type: ${card.type}.`, { cardId: card.id }));
  }
  if (!bible.enums.cardStatuses.includes(card.status)) {
    errors.push(issue("error", "status-value", `Unknown card status: ${card.status}.`, { cardId: card.id }));
  }
  if (!/^\d+\.\d+\.\d+$/.test(card.contentVersion || "")) {
    errors.push(issue("error", "content-version", "contentVersion must use semantic versioning such as 1.0.0.", { cardId: card.id }));
  }

  const category = bible.getCategory(card.categoryId);
  if (!category) {
    errors.push(issue("error", "category-id", `Unknown categoryId: ${card.categoryId}.`, { cardId: card.id }));
  } else {
    if (category.label !== card.category) {
      errors.push(issue("error", "category-label", `category must match the canonical label ${category.label}.`, { cardId: card.id }));
    }
    if (category.deck !== card.type) {
      errors.push(issue("error", "category-type", `${category.label} belongs to the ${category.deck} deck.`, { cardId: card.id }));
    }
    const subtheme = bible.getSubtheme(card.categoryId, card.subthemeId);
    if (!subtheme) {
      errors.push(issue("error", "subtheme-id", `Unknown subthemeId ${card.subthemeId} for ${card.categoryId}.`, { cardId: card.id }));
    } else if (subtheme.label !== card.subtheme) {
      errors.push(issue("error", "subtheme-label", `subtheme must match the canonical label ${subtheme.label}.`, { cardId: card.id }));
    }
  }

  const pack = bible.getPack(card.packId);
  if (!pack) {
    errors.push(issue("error", "pack-id", `Unknown packId: ${card.packId}.`, { cardId: card.id }));
  }
  const expectedPack = bible.expectedPackForCardId(card.id);
  if (expectedPack && expectedPack.id !== card.packId) {
    errors.push(issue("error", "pack-id-range", `${card.id} is reserved for ${expectedPack.id}, not ${card.packId}.`, { cardId: card.id }));
  }

  for (const [field, values] of [
    ["difficulty", bible.enums.difficulties],
    ["intensity", bible.enums.intensities],
    ["tone", bible.enums.tones],
    ["orientation", bible.enums.orientations]
  ]) {
    if (!values.includes(card[field])) {
      errors.push(issue("error", `${field}-value`, `Unknown ${field}: ${card[field]}.`, { cardId: card.id }));
    }
  }

  ensureArrayOfKnownValues(card, "coachRoles", new Set(bible.coachRoles.map((role) => role.id)), errors, 1, 4);
  ensureArrayOfKnownValues(card, "motifs", new Set(bible.motifs), errors, 1, 5);
  ensureArrayOfKnownValues(card, "recommendedModes", new Set(bible.enums.recommendedModes), errors, 1, 3);

  for (const field of ["title", "instruction"]) {
    const value = String(card[field] || "");
    if (/\r|\n|\t/.test(value)) {
      errors.push(issue("error", `${field}-single-line`, `${field} must remain on one source line.`, { cardId: card.id }));
    }
    if (/[\u0000-\u001f\u007f]/.test(value)) {
      errors.push(issue("error", `${field}-control-character`, `${field} contains a control character.`, { cardId: card.id }));
    }
    if (/<[^>]+>/.test(value)) {
      errors.push(issue("error", `${field}-markup`, `${field} may not contain HTML or markup.`, { cardId: card.id }));
    }
    if (value !== value.trim() || /\s{2,}/.test(value)) {
      errors.push(issue("error", `${field}-spacing`, `${field} contains leading, trailing, or repeated whitespace.`, { cardId: card.id }));
    }
  }

  const titleWords = wordCount(card.title);
  if (titleWords < 1 || titleWords > HARD_TITLE_WORD_MAX) {
    errors.push(issue("error", "title-word-count", `Title must contain 1-${HARD_TITLE_WORD_MAX} words; found ${titleWords}.`, { cardId: card.id }));
  }
  if (String(card.title || "").length > 60) {
    errors.push(issue("error", "title-character-count", "Title may not exceed 60 characters.", { cardId: card.id }));
  }

  const instructionWords = wordCount(card.instruction);
  if (instructionWords < 4 || instructionWords > HARD_INSTRUCTION_WORD_MAX) {
    errors.push(issue("error", "instruction-word-count", `Instruction must contain 4-${HARD_INSTRUCTION_WORD_MAX} words; found ${instructionWords}.`, { cardId: card.id }));
  }
  if (String(card.instruction || "").length > 240) {
    errors.push(issue("error", "instruction-character-count", "Instruction may not exceed 240 characters.", { cardId: card.id }));
  }
  if (card.instruction && !/[.!?]$/.test(card.instruction)) {
    errors.push(issue("error", "instruction-punctuation", "Instruction must end with punctuation.", { cardId: card.id }));
  }

  const recommended = RECOMMENDED_WORD_RANGES[card.type];
  if (recommended && (instructionWords < recommended.min || instructionWords > recommended.max)) {
    warnings.push(issue(
      "warning",
      "instruction-recommended-length",
      `${card.type} instructions are usually clearest at ${recommended.min}-${recommended.max} words; found ${instructionWords}.`,
      { cardId: card.id }
    ));
  }

  const firstWord = normalizeText(card.instruction).split(/\s+/)[0];
  if (firstWord && !PLAYABLE_OPENERS.has(firstWord)) {
    warnings.push(issue("warning", "playable-opener", `Instruction begins with “${firstWord},” which may be less immediately playable than an action verb.`, { cardId: card.id }));
  }

  if (card.type === "stance") {
    for (const pattern of PARTNER_ASSERTION_PATTERNS) {
      if (pattern.regex.test(card.instruction || "")) {
        errors.push(issue("error", pattern.code, pattern.message, { cardId: card.id }));
      }
    }
  } else if (/^(?:they|your partner|the other (?:player|performer))\s+(?:is|are|was|were|will|wants?|needs?|believes?|thinks?|feels?|knows?)/i.test(card.instruction || "")) {
    errors.push(issue("error", "hidden-info-drive-premise", "A Drive may pursue a response, but it may not begin by declaring another performer's private state.", { cardId: card.id }));
  }

  if (card.type === "stance" && /^(?:make|get|persuade|convince|force|recruit)\s+(?:someone|another|them|the other)/i.test(card.instruction || "")) {
    warnings.push(issue("warning", "stance-objective-shape", "This Stance begins like a Drive objective; confirm that it primarily defines the holder's lens or behavior.", { cardId: card.id }));
  }

  return { errors, warnings };
}

function countBy(items, selector) {
  const result = new Map();
  for (const item of items) {
    const key = selector(item);
    result.set(key, (result.get(key) || 0) + 1);
  }
  return result;
}

function validatePack(pack) {
  const errors = [];
  const warnings = [];

  if (!pack || typeof pack !== "object") {
    return { errors: [issue("error", "pack-object", "Pack must be an object.")], warnings };
  }

  const plan = bible.getPack(pack.id);
  if (!plan) {
    errors.push(issue("error", "pack-plan", `Pack ${pack.id} is not present in the ten-pack plan.`, { packId: pack.id }));
  }
  if (pack.schemaVersion !== bible.CARD_SCHEMA_VERSION) {
    errors.push(issue("error", "pack-schema-version", `Pack schemaVersion must be ${bible.CARD_SCHEMA_VERSION}.`, { packId: pack.id }));
  }
  if (!/^\d+\.\d+\.\d+$/.test(pack.version || "")) {
    errors.push(issue("error", "pack-version", "Pack version must use semantic versioning.", { packId: pack.id }));
  }
  if (!bible.enums.packStatuses.includes(pack.status)) {
    errors.push(issue("error", "pack-status", `Unknown pack status: ${pack.status}.`, { packId: pack.id }));
  }
  if (!Array.isArray(pack.stances) || !Array.isArray(pack.drives)) {
    errors.push(issue("error", "pack-card-arrays", "Pack must contain stances and drives arrays.", { packId: pack.id }));
    return { errors, warnings };
  }

  for (const card of [...pack.stances, ...pack.drives]) {
    const result = validateCard(card);
    errors.push(...result.errors.map((entry) => ({ ...entry, packId: pack.id })));
    warnings.push(...result.warnings.map((entry) => ({ ...entry, packId: pack.id })));
    if (card.packId !== pack.id) {
      errors.push(issue("error", "pack-card-membership", `${card.id} claims packId ${card.packId}.`, { packId: pack.id, cardId: card.id }));
    }
  }

  if (pack.status === "published" && plan) {
    if (pack.stances.length !== plan.targetStances) {
      errors.push(issue("error", "pack-stance-count", `Published pack requires ${plan.targetStances} Stances; found ${pack.stances.length}.`, { packId: pack.id }));
    }
    if (pack.drives.length !== plan.targetDrives) {
      errors.push(issue("error", "pack-drive-count", `Published pack requires ${plan.targetDrives} Drives; found ${pack.drives.length}.`, { packId: pack.id }));
    }

    const allCards = [...pack.stances, ...pack.drives];
    const categoryCounts = countBy(allCards, (card) => card.categoryId);
    for (const category of bible.categories) {
      const expected = category.deck === "stance" ? 6 : category.id === "direct-objectives" ? 12 : 6;
      const found = categoryCounts.get(category.id) || 0;
      if (found !== expected) {
        errors.push(issue("error", "pack-category-quota", `${category.label} requires ${expected} cards per published pack; found ${found}.`, { packId: pack.id }));
      }

      const cardsInCategory = allCards.filter((card) => card.categoryId === category.id);
      const subthemeCounts = countBy(cardsInCategory, (card) => card.subthemeId);
      for (const subtheme of category.subthemes) {
        const count = subthemeCounts.get(subtheme.id) || 0;
        if (count !== 1) {
          errors.push(issue("error", "pack-subtheme-quota", `${category.label} / ${subtheme.label} requires exactly one card in each published pack; found ${count}.`, { packId: pack.id }));
        }
      }
    }
  }

  return { errors, warnings };
}

function detectLibraryDuplicates(cards) {
  const errors = [];
  const warnings = [];
  const seenIds = new Map();
  const seenTitles = new Map();
  const seenInstructions = new Map();

  for (const card of cards) {
    for (const [map, value, code, label] of [
      [seenIds, card.id, "duplicate-id", "ID"],
      [seenTitles, normalizeText(card.title), "duplicate-title", "title"],
      [seenInstructions, normalizeText(card.instruction), "duplicate-instruction", "instruction"]
    ]) {
      if (map.has(value)) {
        errors.push(issue("error", code, `Duplicate ${label} shared by ${map.get(value)} and ${card.id}.`, { cardId: card.id }));
      } else {
        map.set(value, card.id);
      }
    }
  }

  for (let leftIndex = 0; leftIndex < cards.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < cards.length; rightIndex += 1) {
      const left = cards[leftIndex];
      const right = cards[rightIndex];
      if (left.type !== right.type) {
        continue;
      }
      const similarity = jaccardSimilarity(`${left.title} ${left.instruction}`, `${right.title} ${right.instruction}`);
      if (similarity >= 0.72) {
        warnings.push(issue(
          "warning",
          "near-duplicate",
          `${left.id} and ${right.id} have ${(similarity * 100).toFixed(0)}% token overlap; review for semantic redundancy.`,
          { cardId: left.id, relatedCardId: right.id, similarity }
        ));
      }
    }
  }

  return { errors, warnings };
}

function auditLibrary(cardPacks) {
  const errors = [];
  const warnings = [];
  const packs = Array.isArray(cardPacks) ? cardPacks : [];

  for (const pack of packs) {
    const result = validatePack(pack);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  const allCards = packs.flatMap((pack) => [...(pack.stances || []), ...(pack.drives || [])]);
  const duplicateResult = detectLibraryDuplicates(allCards);
  errors.push(...duplicateResult.errors);
  warnings.push(...duplicateResult.warnings);

  const stances = allCards.filter((card) => card.type === "stance");
  const drives = allCards.filter((card) => card.type === "drive");
  const categoryCounts = Object.fromEntries(bible.categories.map((category) => [
    category.id,
    allCards.filter((card) => card.categoryId === category.id).length
  ]));
  const difficultyCounts = Object.fromEntries(bible.enums.difficulties.map((value) => [
    value,
    allCards.filter((card) => card.difficulty === value).length
  ]));
  const intensityCounts = Object.fromEntries(bible.enums.intensities.map((value) => [
    value,
    allCards.filter((card) => card.intensity === value).length
  ]));
  const toneCounts = Object.fromEntries(bible.enums.tones.map((value) => [
    value,
    allCards.filter((card) => card.tone === value).length
  ]));

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    summary: {
      publishedPacks: packs.length,
      plannedPacks: bible.packPlan.length,
      stances: stances.length,
      drives: drives.length,
      targetStances: bible.TARGET_STANCE_COUNT,
      targetDrives: bible.TARGET_DRIVE_COUNT,
      categoryCounts,
      difficultyCounts,
      intensityCounts,
      toneCounts,
      averageStanceInstructionWords: stances.length
        ? stances.reduce((sum, card) => sum + wordCount(card.instruction), 0) / stances.length
        : 0,
      averageDriveInstructionWords: drives.length
        ? drives.reduce((sum, card) => sum + wordCount(card.instruction), 0) / drives.length
        : 0
    }
  };
}

module.exports = {
  HARD_TITLE_WORD_MAX,
  HARD_INSTRUCTION_WORD_MAX,
  RECOMMENDED_WORD_RANGES,
  wordCount,
  normalizeText,
  jaccardSimilarity,
  validateCard,
  validatePack,
  detectLibraryDuplicates,
  auditLibrary
};
