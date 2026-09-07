"use strict";

const cardBible = require("../card-bible.js");
const cards = require("../cards.js");
const hintBible = require("../hint-bible.js");
const cardHints = require("../hints/card-hints.js");
const fusionProfiles = require("../hints/fusion-profiles.js");
const concreteFusion = require("../hints/concrete-fusion.js");
const hintEngine = require("../hint-engine.js");

const FORBIDDEN_PARTNER_CONTROL = [
  /\b(?:they|your partner|the other person|another person)\s+(?:must|will|should|has to|needs to|feels?|thinks?|knows?|agrees?|admits?|responds?)\b/i,
  /\bmake\s+(?:them|your partner)\s+(?:feel|think|know|agree|admit)\b/i,
  /\b(?:force|require)\s+(?:them|your partner)\s+to\b/i
];

function words(value) {
  return String(value || "").trim().split(/\s+/).filter(Boolean).length;
}

function validate(options = {}) {
  const errors = [];
  const warnings = [];
  const allCards = [...cards.stances, ...cards.drives];
  const expectedSubthemes = cardBible.categories.flatMap((category) => category.subthemes.map((subtheme) => subtheme.id));
  const expectedPackIds = cardBible.packPlan.map((pack) => pack.id);
  const guidanceIds = Object.keys(hintBible.subthemeGuidance);
  const packLensIds = Object.keys(hintBible.packLenses || {});

  if (hintBible.HINT_SCHEMA_VERSION !== 2) errors.push("Hint schema version must be 2 for v0.21.x.");
  if (hintBible.HINT_LIBRARY_VERSION !== "2.1.0") errors.push("Hint library version must be 2.1.0 for v0.21.2.");
  if (hintBible.policies.length !== 4) errors.push(`Expected 4 hint policies; found ${hintBible.policies.length}.`);
  if (hintBible.combinationPatterns.length !== 6) errors.push(`Expected 6 combination patterns; found ${hintBible.combinationPatterns.length}.`);
  if (guidanceIds.length !== expectedSubthemes.length) errors.push(`Expected guidance for ${expectedSubthemes.length} subthemes; found ${guidanceIds.length}.`);
  if (packLensIds.length !== expectedPackIds.length) errors.push(`Expected manifestation lenses for ${expectedPackIds.length} packs; found ${packLensIds.length}.`);

  const stanceSubthemes = cardBible.categories
    .filter((category) => category.deck === "stance")
    .flatMap((category) => category.subthemes.map((subtheme) => subtheme.id));
  const driveSubthemes = cardBible.categories
    .filter((category) => category.deck === "drive")
    .flatMap((category) => category.subthemes.map((subtheme) => subtheme.id));
  if (fusionProfiles.PROFILE_VERSION !== "1.0.0") errors.push("Fusion profile version must be 1.0.0 for v0.21.2.");
  if (concreteFusion.FUSION_VERSION !== "2.1.0") errors.push("Concrete fusion version must be 2.1.0 for v0.21.2.");
  if (Object.keys(fusionProfiles.stanceProfiles).length !== stanceSubthemes.length) {
    errors.push(`Expected ${stanceSubthemes.length} Stance fusion profiles; found ${Object.keys(fusionProfiles.stanceProfiles).length}.`);
  }
  if (Object.keys(fusionProfiles.driveProfiles).length !== driveSubthemes.length) {
    errors.push(`Expected ${driveSubthemes.length} Drive fusion profiles; found ${Object.keys(fusionProfiles.driveProfiles).length}.`);
  }
  for (const id of stanceSubthemes) {
    const profile = fusionProfiles.getStance(id);
    if (!profile) {
      errors.push(`Missing Stance fusion profile ${id}.`);
      continue;
    }
    for (const field of ["instrument", "reading", "escalation", "tension"]) {
      if (!String(profile[field] || "").trim()) errors.push(`${id} Stance fusion profile is missing ${field}.`);
    }
  }
  for (const id of driveSubthemes) {
    const profile = fusionProfiles.getDrive(id);
    if (!profile) {
      errors.push(`Missing Drive fusion profile ${id}.`);
      continue;
    }
    for (const field of ["aim", "opening", "blocked", "traction", "loop", "pressure"]) {
      if (!String(profile[field] || "").trim()) errors.push(`${id} Drive fusion profile is missing ${field}.`);
    }
  }
  for (const packId of expectedPackIds) {
    const anchors = fusionProfiles.packAnchors[packId];
    if (!Array.isArray(anchors) || anchors.length !== 2) {
      errors.push(`${packId} must define exactly two fusion anchors.`);
    }
  }

  for (const id of expectedPackIds) {
    const lens = hintBible.getPackLens(id);
    if (!lens || !Array.isArray(lens.manifestations) || lens.manifestations.length !== 2) {
      errors.push(`${id} must have exactly two pack manifestation lenses.`);
      continue;
    }
    for (const [index, text] of lens.manifestations.entries()) {
      const count = words(text);
      if (count < 6 || count > 22) errors.push(`${id} pack lens ${index + 1} has ${count} words; expected 6–22.`);
      for (const pattern of FORBIDDEN_PARTNER_CONTROL) {
        if (pattern.test(text)) errors.push(`${id} pack lens ${index + 1} may prescribe another performer: ${text}`);
      }
    }
  }

  for (const id of expectedSubthemes) {
    const guidance = hintBible.getSubthemeGuidance(id);
    if (!guidance) {
      errors.push(`Missing hint guidance for subtheme ${id}.`);
      continue;
    }
    if (!Array.isArray(guidance.manifestations) || guidance.manifestations.length !== 2) {
      errors.push(`${id} must have exactly two manifestation seeds.`);
      continue;
    }
    for (const [index, seed] of guidance.manifestations.entries()) {
      const count = words(seed);
      if (count < 8 || count > 35) errors.push(`${id} seed ${index + 1} has ${count} words; expected 8–35.`);
      if (!/[.!?]$/.test(seed)) warnings.push(`${id} seed ${index + 1} should end with punctuation.`);
      for (const pattern of FORBIDDEN_PARTNER_CONTROL) {
        if (pattern.test(seed)) errors.push(`${id} seed ${index + 1} may prescribe another performer: ${seed}`);
      }
    }
  }

  if (cardHints.cardCount !== allCards.length) errors.push(`Card hint count ${cardHints.cardCount} does not match ${allCards.length} cards.`);
  if (cardHints.seedCount !== allCards.length * 2) errors.push(`Expected ${allCards.length * 2} resolved manifestation seeds; found ${cardHints.seedCount}.`);

  const resolvedSeedTexts = new Set();
  for (const card of allCards) {
    const hint = cardHints.get(card);
    if (!hint) {
      errors.push(`Missing resolved hint for ${card.id}.`);
      continue;
    }
    if (hint.cardId !== card.id) errors.push(`Hint ID mismatch for ${card.id}.`);
    if (hint.cardContentVersion !== card.contentVersion) errors.push(`Hint content-version reference mismatch for ${card.id}.`);
    if (hint.packId !== card.packId) errors.push(`Hint pack mismatch for ${card.id}.`);
    if (hint.subthemeId !== card.subthemeId) errors.push(`Hint subtheme mismatch for ${card.id}.`);
    if (!Array.isArray(hint.manifestationSeeds) || hint.manifestationSeeds.length !== 2) {
      errors.push(`${card.id} must resolve to two manifestation seeds.`);
    } else {
      for (const [index, seed] of hint.manifestationSeeds.entries()) {
        const count = words(seed.text);
        if (count < 14 || count > 55) errors.push(`${card.id} resolved seed ${index + 1} has ${count} words; expected 14–55.`);
        if (!String(seed.context || "").trim()) errors.push(`${card.id} resolved seed ${index + 1} is missing its pack context.`);
        if (!String(seed.action || "").trim()) errors.push(`${card.id} resolved seed ${index + 1} is missing its concrete action.`);
        if (String(seed.text || "").trim() !== `${String(seed.context || "").trim()} ${String(seed.action || "").trim()}`.trim()) {
          errors.push(`${card.id} resolved seed ${index + 1} must preserve context and action as the displayed text.`);
        }
        if (resolvedSeedTexts.has(seed.text)) errors.push(`${card.id} resolved seed ${index + 1} duplicates another card-specific seed.`);
        resolvedSeedTexts.add(seed.text);
        for (const pattern of FORBIDDEN_PARTNER_CONTROL) {
          if (pattern.test(seed.text)) errors.push(`${card.id} resolved seed ${index + 1} may prescribe another performer: ${seed.text}`);
        }
      }
    }
    if (!hint.heighten || words(hint.heighten) < 8) errors.push(`${card.id} is missing usable heightening guidance.`);
  }

  const policyIds = new Set(hintBible.policies.map((policy) => policy.id));
  if (policyIds.size !== hintBible.policies.length) errors.push("Hint policy IDs must be unique.");
  for (const required of ["full", "nudges", "after-attempt", "off"]) {
    if (!policyIds.has(required)) errors.push(`Missing required hint policy ${required}.`);
  }

  const patternIds = new Set();
  for (const pattern of hintBible.combinationPatterns) {
    if (patternIds.has(pattern.id)) errors.push(`Duplicate combination-pattern ID ${pattern.id}.`);
    patternIds.add(pattern.id);
    for (const field of ["label", "principle", "blendTemplate", "nextBeatTemplate"]) {
      if (!String(pattern[field] || "").trim()) errors.push(`${pattern.id} is missing ${field}.`);
    }
    if (!pattern.blendTemplate.includes("{stance}") || !pattern.blendTemplate.includes("{drive}")) {
      errors.push(`${pattern.id} blend template must reference both cards.`);
    }
    for (const patternRule of FORBIDDEN_PARTNER_CONTROL) {
      if (patternRule.test(`${pattern.principle} ${pattern.blendTemplate} ${pattern.nextBeatTemplate}`)) {
        errors.push(`${pattern.id} combination text may prescribe another performer.`);
      }
    }
  }

  // Exhaustive 57,600-hand check. Each pair must generate six distinct structural angles.
  if (options.exhaustive !== false) {
    for (const stance of cards.stances) {
      for (const drive of cards.drives) {
        const seenPatterns = new Set();
        for (let angle = 0; angle < hintBible.combinationPatterns.length; angle += 1) {
          const hint = hintEngine.getCombinationHint(stance, drive, angle, "full");
          if (!hint) {
            errors.push(`No full combination hint for ${stance.id}+${drive.id}.`);
            break;
          }
          seenPatterns.add(hint.patternId);
          if (!hint.wayIn.includes(stance.title) || !hint.wayIn.includes(drive.title)) {
            errors.push(`${stance.id}+${drive.id} angle ${angle} does not reference both card titles.`);
          }
          if (!hint.firstMove || !hint.repeatableLoop || !hint.adaptation) {
            errors.push(`${stance.id}+${drive.id} angle ${angle} lacks full concrete coaching depth.`);
          }
          if (hint.fusionVersion !== concreteFusion.FUSION_VERSION || hint.profileVersion !== fusionProfiles.PROFILE_VERSION) {
            errors.push(`${stance.id}+${drive.id} angle ${angle} reports the wrong fusion/profile version.`);
          }
          if (!hint.stanceAction || !hint.driveAction || !hint.anchor) {
            errors.push(`${stance.id}+${drive.id} angle ${angle} is missing resolved pair-specific action data.`);
          }
          if (/Keep the first move direct and easy to read|Play the central behavior plainly before adding complication/i.test(hint.firstMove)) {
            errors.push(`${stance.id}+${drive.id} angle ${angle} leaked a generic pack preface into the concrete first move.`);
          }
          if (words(hint.firstMove) < 16) {
            errors.push(`${stance.id}+${drive.id} angle ${angle} first move is too thin to demonstrate the pair.`);
          }
          for (const pattern of FORBIDDEN_PARTNER_CONTROL) {
            if (pattern.test(`${hint.principle} ${hint.wayIn} ${hint.firstMove} ${hint.repeatableLoop} ${hint.adaptation}`)) {
              errors.push(`${stance.id}+${drive.id} angle ${angle} may prescribe another performer.`);
            }
          }
        }
        if (seenPatterns.size !== hintBible.combinationPatterns.length) {
          errors.push(`${stance.id}+${drive.id} produced ${seenPatterns.size} distinct patterns instead of ${hintBible.combinationPatterns.length}.`);
        }
        const concise = hintEngine.getCombinationHint(stance, drive, 0, "nudges");
        if (!concise || !concise.wayIn || !concise.firstMove || concise.repeatableLoop || concise.adaptation) {
          errors.push(`${stance.id}+${drive.id} does not respect the Nudges Only depth policy.`);
        }
      }
    }
  }

  if (hintEngine.getSingleHint(cards.stances[0], 0, "off") !== null) errors.push("Hints Off must suppress single-card hints.");
  if (hintEngine.getCombinationHint(cards.stances[0], cards.drives[0], 0, "off") !== null) errors.push("Hints Off must suppress combination hints.");
  if (hintEngine.isAvailable("after-attempt", false)) errors.push("After First Attempt must remain locked before an attempt.");
  if (!hintEngine.isAvailable("after-attempt", true)) errors.push("After First Attempt must unlock after an attempt.");

  return {
    result: errors.length ? "FAIL" : "PASS",
    errors,
    warnings,
    metrics: {
      cards: allCards.length,
      stances: cards.stances.length,
      drives: cards.drives.length,
      subthemes: expectedSubthemes.length,
      packLenses: expectedPackIds.length * 2,
      subthemeSeeds: expectedSubthemes.length * 2,
      manifestationSeeds: cardHints.seedCount,
      personalHands: cards.stances.length * cards.drives.length,
      generatedStructuralAngles: cards.stances.length * cards.drives.length * hintBible.combinationPatterns.length,
      policies: hintBible.policies.length,
      patterns: hintBible.combinationPatterns.length,
      stanceFusionProfiles: Object.keys(fusionProfiles.stanceProfiles).length,
      driveFusionProfiles: Object.keys(fusionProfiles.driveProfiles).length,
      packFusionAnchors: Object.values(fusionProfiles.packAnchors).reduce((sum, anchors) => sum + anchors.length, 0),
      curatedPairOverrides: concreteFusion.pairOverrideKeys.length
    }
  };
}

module.exports = { validate, FORBIDDEN_PARTNER_CONTROL };
