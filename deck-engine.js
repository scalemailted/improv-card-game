(function (root, factory) {
  const engine = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = engine;
  } else {
    root.TwoSecretsEngine = engine;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const STATE_VERSION = 1;
  const SAFE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  function secureRandom() {
    if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
      const values = new Uint32Array(1);
      crypto.getRandomValues(values);
      return values[0] / 4294967296;
    }
    return Math.random();
  }

  function shuffle(items, randomFn = secureRandom) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(randomFn() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function createDeckId(length = 8, randomFn = secureRandom) {
    let id = "";
    for (let i = 0; i < length; i += 1) {
      id += SAFE_ALPHABET[Math.floor(randomFn() * SAFE_ALPHABET.length)];
    }
    return id;
  }

  function validateCards(cards) {
    if (!cards || !Array.isArray(cards.stances) || !Array.isArray(cards.drives)) {
      throw new TypeError("Card data must include stances and drives arrays.");
    }
    if (cards.stances.length === 0 || cards.drives.length === 0) {
      throw new RangeError("Both decks must contain at least one card.");
    }
  }

  function createState(cards, instanceId = createDeckId(), randomFn = secureRandom) {
    validateCards(cards);
    return {
      version: STATE_VERSION,
      instanceId,
      stanceOrder: shuffle(cards.stances.map((card) => card.id), randomFn),
      driveOrder: shuffle(cards.drives.map((card) => card.id), randomFn),
      stancePosition: 0,
      drivePosition: 0,
      current: null,
      scenesCompleted: 0,
      vetoes: 0,
      cycle: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  function isStateUsable(state, cards, expectedId) {
    if (!state || state.version !== STATE_VERSION || state.instanceId !== expectedId) {
      return false;
    }
    try {
      validateCards(cards);
    } catch (_error) {
      return false;
    }

    const stanceIds = new Set(cards.stances.map((card) => card.id));
    const driveIds = new Set(cards.drives.map((card) => card.id));
    const validStanceOrder = Array.isArray(state.stanceOrder)
      && state.stanceOrder.length === stanceIds.size
      && state.stanceOrder.every((id) => stanceIds.has(id));
    const validDriveOrder = Array.isArray(state.driveOrder)
      && state.driveOrder.length === driveIds.size
      && state.driveOrder.every((id) => driveIds.has(id));

    return validStanceOrder
      && validDriveOrder
      && Number.isInteger(state.stancePosition)
      && Number.isInteger(state.drivePosition)
      && state.stancePosition >= 0
      && state.drivePosition >= 0;
  }

  function ensureCardsAvailable(state, cards, randomFn = secureRandom) {
    const stanceEmpty = state.stancePosition >= state.stanceOrder.length;
    const driveEmpty = state.drivePosition >= state.driveOrder.length;

    if (stanceEmpty || driveEmpty) {
      state.stanceOrder = shuffle(cards.stances.map((card) => card.id), randomFn);
      state.driveOrder = shuffle(cards.drives.map((card) => card.id), randomFn);
      state.stancePosition = 0;
      state.drivePosition = 0;
      state.cycle += 1;
    }
  }

  function drawPair(state, cards, randomFn = secureRandom) {
    validateCards(cards);
    if (state.current) {
      return state.current;
    }

    ensureCardsAvailable(state, cards, randomFn);

    state.current = {
      stanceId: state.stanceOrder[state.stancePosition],
      driveId: state.driveOrder[state.drivePosition],
      drawnAt: new Date().toISOString()
    };
    state.stancePosition += 1;
    state.drivePosition += 1;
    state.updatedAt = new Date().toISOString();
    return state.current;
  }

  function completeScene(state) {
    if (!state.current) {
      return false;
    }
    state.current = null;
    state.scenesCompleted += 1;
    state.updatedAt = new Date().toISOString();
    return true;
  }

  function vetoAndRedraw(state, cards, randomFn = secureRandom) {
    if (state.current) {
      state.current = null;
      state.vetoes += 1;
    }
    return drawPair(state, cards, randomFn);
  }

  function remaining(state) {
    return {
      stances: Math.max(0, state.stanceOrder.length - state.stancePosition),
      drives: Math.max(0, state.driveOrder.length - state.drivePosition)
    };
  }

  function findCard(cards, type, id) {
    const list = type === "stance" ? cards.stances : cards.drives;
    return list.find((card) => card.id === id) || null;
  }

  return Object.freeze({
    STATE_VERSION,
    createDeckId,
    shuffle,
    createState,
    isStateUsable,
    drawPair,
    completeScene,
    vetoAndRedraw,
    remaining,
    findCard
  });
});
