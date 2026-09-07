(function (root, factory) {
  const isCommonJs = typeof module === "object" && module.exports;
  const hintBible = isCommonJs ? require("./hint-bible.js") : root.IMPROMPT_HINT_BIBLE;
  const cardHints = isCommonJs ? require("./hints/card-hints.js") : root.IMPROMPT_CARD_HINTS;
  const concreteFusion = isCommonJs ? require("./hints/concrete-fusion.js") : root.IMPROMPT_CONCRETE_FUSION;
  const api = factory(hintBible, cardHints, concreteFusion);
  if (isCommonJs) {
    module.exports = api;
  } else {
    root.IMPROMPT_HINT_ENGINE = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (hintBible, cardHints, concreteFusion) {
  "use strict";

  if (!hintBible || !cardHints || !concreteFusion) {
    throw new Error("hint-engine.js requires hint-bible.js, hints/card-hints.js, and hints/concrete-fusion.js to load first.");
  }

  function hashText(value) {
    let hash = 2166136261;
    for (const char of String(value || "")) {
      hash ^= char.codePointAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function sharedValues(left, right) {
    const rightSet = new Set(Array.isArray(right) ? right : []);
    return (Array.isArray(left) ? left : []).filter((value) => rightSet.has(value));
  }

  function patternScores(stance, drive) {
    const scores = {
      channel: 8,
      mask: 3,
      friction: 4,
      escalation: 4,
      reinterpretation: 4,
      counterweight: 3
    };

    const sharedMotifs = sharedValues(stance.motifs, drive.motifs);
    const sharedRoles = sharedValues(stance.coachRoles, drive.coachRoles);
    scores.channel += Math.min(4, sharedMotifs.length * 2 + sharedRoles.length);

    if (drive.categoryId === "secrets-avoidance") {
      scores.mask += 7;
    }
    if (["away-from-partner", "self-focused"].includes(drive.orientation)) {
      scores.mask += 2;
    }
    if (stance.categoryId === "emotional-assumptions") {
      scores.mask += 2;
    }

    if (stance.orientation !== drive.orientation) {
      scores.friction += 3;
    }
    if (stance.orientation === "toward-partner" && ["against-partner", "away-from-partner"].includes(drive.orientation)) {
      scores.friction += 4;
    }
    if (stance.categoryId === "status-authority" && drive.categoryId === "direct-objectives") {
      scores.friction += 2;
    }

    if (drive.categoryId === "repeatable-behaviors") {
      scores.escalation += 7;
    }
    if (stance.intensity === "high" || drive.intensity === "high") {
      scores.escalation += 2;
    }
    if (["heightened", "absurd"].includes(stance.tone) || ["heightened", "absurd"].includes(drive.tone)) {
      scores.escalation += 2;
    }

    if (stance.categoryId === "worldview-absurdity") {
      scores.reinterpretation += 7;
    }
    if (stance.subthemeId === "pattern-grand-meaning" || stance.subthemeId === "fixation-significance") {
      scores.reinterpretation += 3;
    }

    if (stance.orientation === "toward-partner") {
      scores.counterweight += 3;
    }
    if (stance.categoryId === "history-relationship" && drive.categoryId === "direct-objectives") {
      scores.counterweight += 3;
    }
    if (stance.tone === "grounded" && drive.tone === "absurd") {
      scores.counterweight += 5;
    }

    return scores;
  }

  function orderedPatterns(stance, drive) {
    const scores = patternScores(stance, drive);
    const tieSeed = hashText(`${stance.id}:${drive.id}`);
    return [...hintBible.combinationPatterns]
      .sort((left, right) => {
        const scoreDifference = scores[right.id] - scores[left.id];
        if (scoreDifference !== 0) {
          return scoreDifference;
        }
        const leftTie = hashText(`${tieSeed}:${left.id}`);
        const rightTie = hashText(`${tieSeed}:${right.id}`);
        return leftTie - rightTie;
      });
  }

  function replaceTokens(template, stance, drive) {
    return String(template)
      .replaceAll("{stance}", stance.title)
      .replaceAll("{drive}", drive.title);
  }

  function getSingleHint(card, angle = 0, policyId = hintBible.DEFAULT_HINT_POLICY) {
    if (!card) {
      return null;
    }
    const policy = hintBible.getPolicy(policyId);
    if (!policy.allowsSingle) {
      return null;
    }
    const hint = cardHints.get(card);
    if (!hint) {
      return null;
    }
    const normalizedAngle = ((Number(angle) || 0) % hint.manifestationSeeds.length + hint.manifestationSeeds.length) % hint.manifestationSeeds.length;
    const seed = hint.manifestationSeeds[normalizedAngle];
    return {
      kind: "single",
      policyId: policy.id,
      cardId: card.id,
      cardType: card.type,
      cardTitle: card.title,
      category: card.category,
      angle: normalizedAngle,
      angleCount: hint.manifestationSeeds.length,
      angleLabel: seed.label,
      manifestation: seed.text,
      focus: hint.focus,
      heighten: policy.allowsDepth ? hint.heighten : null
    };
  }

  function getCombinationHint(stance, drive, angle = 0, policyId = hintBible.DEFAULT_HINT_POLICY) {
    if (!stance || !drive) {
      return null;
    }
    const policy = hintBible.getPolicy(policyId);
    if (!policy.allowsCombination) {
      return null;
    }
    const patterns = orderedPatterns(stance, drive);
    const normalizedAngle = ((Number(angle) || 0) % patterns.length + patterns.length) % patterns.length;
    const pattern = patterns[normalizedAngle];
    const fusion = concreteFusion.build(stance, drive, pattern, normalizedAngle, policy.allowsDepth);
    return {
      kind: "combination",
      policyId: policy.id,
      stanceId: stance.id,
      driveId: drive.id,
      stanceTitle: stance.title,
      driveTitle: drive.title,
      angle: normalizedAngle,
      angleCount: patterns.length,
      patternId: pattern.id,
      patternLabel: pattern.label,
      principle: pattern.principle,
      fusionVersion: fusion.fusionVersion,
      profileVersion: fusion.profileVersion,
      pairSpecificOverride: fusion.pairSpecificOverride,
      wayIn: fusion.wayIn,
      firstMove: fusion.firstMove,
      repeatableLoop: fusion.repeatableLoop,
      adaptation: fusion.adaptation,
      stanceAction: fusion.stanceAction,
      driveAction: fusion.driveAction,
      anchor: fusion.anchor
    };
  }

  function isAvailable(policyId, unlocked = false) {
    const policy = hintBible.getPolicy(policyId);
    return (policy.allowsSingle || policy.allowsCombination) && (!policy.requiresUnlock || Boolean(unlocked));
  }

  return Object.freeze({
    getSingleHint,
    getCombinationHint,
    orderedPatterns,
    isAvailable,
    normalizePolicy: hintBible.normalizePolicy,
    getPolicy: hintBible.getPolicy
  });
});
