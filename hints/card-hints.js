(function (root, factory) {
  const isCommonJs = typeof module === "object" && module.exports;
  const cards = isCommonJs ? require("../cards.js") : root.IMPROMPT_CARDS;
  const hintBible = isCommonJs ? require("../hint-bible.js") : root.IMPROMPT_HINT_BIBLE;
  const api = factory(cards, hintBible);
  if (isCommonJs) {
    module.exports = api;
  } else {
    root.IMPROMPT_CARD_HINTS = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (cards, hintBible) {
  "use strict";

  if (!cards || !hintBible) {
    throw new Error("card-hints.js requires cards.js and hint-bible.js to load first.");
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

  function focusPhrase(card) {
    const motifs = Array.isArray(card.motifs) ? card.motifs.filter(Boolean).slice(0, 2) : [];
    if (motifs.length === 0) {
      return String(card.subtheme || "the card’s central pressure").replace(/-/g, " ");
    }
    return motifs.map((motif) => String(motif).replace(/-/g, " ")).join(" and ");
  }

  function composeManifestation(packLens, guidance, index) {
    return `${packLens.manifestations[index]} ${guidance.manifestations[index]}`;
  }

  function buildHint(card) {
    const guidance = hintBible.getSubthemeGuidance(card.subthemeId);
    const packLens = hintBible.getPackLens(card.packId);
    if (!guidance || !Array.isArray(guidance.manifestations) || guidance.manifestations.length < 2) {
      throw new Error(`Missing manifestation guidance for ${card.id}.`);
    }
    if (!packLens || !Array.isArray(packLens.manifestations) || packLens.manifestations.length < 2) {
      throw new Error(`Missing pack manifestation lens for ${card.id}.`);
    }
    const tone = Object.prototype.hasOwnProperty.call(hintBible.heighteningByType[card.type], card.tone)
      ? card.tone
      : "flexible";
    return {
      schemaVersion: hintBible.HINT_SCHEMA_VERSION,
      cardId: card.id,
      cardContentVersion: card.contentVersion,
      hintVersion: hintBible.HINT_LIBRARY_VERSION,
      packId: card.packId,
      subthemeId: card.subthemeId,
      focus: focusPhrase(card),
      manifestationSeeds: [
        {
          id: `${card.id}-a`,
          label: "First move",
          text: composeManifestation(packLens, guidance, 0)
        },
        {
          id: `${card.id}-b`,
          label: "Another angle",
          text: composeManifestation(packLens, guidance, 1)
        }
      ],
      heighten: hintBible.heighteningByType[card.type][tone]
    };
  }

  const allCards = [...cards.stances, ...cards.drives];
  const byId = Object.fromEntries(allCards.map((card) => [card.id, buildHint(card)]));

  function get(cardOrId) {
    const id = typeof cardOrId === "string" ? cardOrId : cardOrId && cardOrId.id;
    return id && byId[id] ? byId[id] : null;
  }

  return deepFreeze({
    schemaVersion: hintBible.HINT_SCHEMA_VERSION,
    version: hintBible.HINT_LIBRARY_VERSION,
    cardCount: allCards.length,
    seedCount: allCards.length * 2,
    byId,
    get
  });
});
