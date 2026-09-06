(function (root, factory) {
  const engine = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = engine;
  } else {
    root.ImpromptEngine = engine;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const STATE_VERSION = 3;
  const SAFE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const TYPE_CONFIG = Object.freeze({
    stance: Object.freeze({
      cardsKey: "stances",
      queueKey: "stanceQueue",
      currentKey: "stanceId",
      keptKey: "stanceKept"
    }),
    drive: Object.freeze({
      cardsKey: "drives",
      queueKey: "driveQueue",
      currentKey: "driveId",
      keptKey: "driveKept"
    })
  });

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
    if (cards.stances.length < 2 || cards.drives.length < 2) {
      throw new RangeError("Both decks must contain at least two cards.");
    }
  }

  function allIds(cards, type) {
    const config = TYPE_CONFIG[type];
    if (!config) {
      throw new TypeError(`Unknown card type: ${type}`);
    }
    return cards[config.cardsKey].map((card) => card.id);
  }

  function createState(cards, instanceId = createDeckId(), randomFn = secureRandom) {
    validateCards(cards);
    return {
      version: STATE_VERSION,
      instanceId,
      stanceQueue: shuffle(allIds(cards, "stance"), randomFn),
      driveQueue: shuffle(allIds(cards, "drive"), randomFn),
      current: null,
      scenesCompleted: 0,
      vetoes: { stance: 0, drive: 0 },
      cycles: { stance: 1, drive: 1 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  function isUniqueValidQueue(queue, validIds) {
    return Array.isArray(queue)
      && queue.every((id) => validIds.has(id))
      && new Set(queue).size === queue.length;
  }

  function isCurrentUsable(current, stanceIds, driveIds, state) {
    if (current === null) {
      return true;
    }
    if (!current || typeof current !== "object") {
      return false;
    }
    return stanceIds.has(current.stanceId)
      && driveIds.has(current.driveId)
      && typeof current.stanceKept === "boolean"
      && typeof current.driveKept === "boolean"
      && !state.stanceQueue.includes(current.stanceId)
      && !state.driveQueue.includes(current.driveId);
  }

  function isStateShapeUsable(state, cards, expectedId) {
    try {
      validateCards(cards);
    } catch (_error) {
      return false;
    }

    if (!state || typeof state !== "object" || typeof state.instanceId !== "string") {
      return false;
    }
    if (expectedId && state.instanceId !== expectedId) {
      return false;
    }

    const stanceIds = new Set(allIds(cards, "stance"));
    const driveIds = new Set(allIds(cards, "drive"));
    const validCounters = Number.isInteger(state.scenesCompleted)
      && state.scenesCompleted >= 0
      && state.vetoes
      && Number.isInteger(state.vetoes.stance)
      && state.vetoes.stance >= 0
      && Number.isInteger(state.vetoes.drive)
      && state.vetoes.drive >= 0
      && state.cycles
      && Number.isInteger(state.cycles.stance)
      && state.cycles.stance >= 1
      && Number.isInteger(state.cycles.drive)
      && state.cycles.drive >= 1;

    return validCounters
      && isUniqueValidQueue(state.stanceQueue, stanceIds)
      && isUniqueValidQueue(state.driveQueue, driveIds)
      && isCurrentUsable(state.current, stanceIds, driveIds, state);
  }

  function isStateUsable(state, cards, expectedId) {
    return Boolean(state)
      && state.version === STATE_VERSION
      && isStateShapeUsable(state, cards, expectedId);
  }

  function migrateLegacyState(legacyState, cards) {
    if (!legacyState || legacyState.version !== 2 || !isStateShapeUsable(legacyState, cards, legacyState.instanceId)) {
      return null;
    }

    return {
      ...legacyState,
      version: STATE_VERSION,
      updatedAt: new Date().toISOString()
    };
  }

  function refillQueue(state, cards, type, randomFn = secureRandom, excludedId = null) {
    const config = TYPE_CONFIG[type];
    const ids = allIds(cards, type).filter((id) => id !== excludedId);
    state[config.queueKey] = shuffle(ids, randomFn);
    state.cycles[type] += 1;
  }

  function drawOne(state, cards, type, randomFn = secureRandom) {
    const config = TYPE_CONFIG[type];
    if (state[config.queueKey].length === 0) {
      refillQueue(state, cards, type, randomFn);
    }
    return state[config.queueKey].shift();
  }

  function drawPair(state, cards, randomFn = secureRandom) {
    validateCards(cards);
    if (state.current) {
      return state.current;
    }

    state.current = {
      stanceId: drawOne(state, cards, "stance", randomFn),
      driveId: drawOne(state, cards, "drive", randomFn),
      stanceKept: false,
      driveKept: false,
      drawnAt: new Date().toISOString()
    };
    state.updatedAt = new Date().toISOString();
    return state.current;
  }

  function keepCard(state, type) {
    const config = TYPE_CONFIG[type];
    if (!config || !state.current) {
      return false;
    }
    state.current[config.keptKey] = true;
    state.updatedAt = new Date().toISOString();
    return true;
  }

  function insertAtRandomPosition(queue, id, randomFn = secureRandom) {
    const index = Math.floor(randomFn() * (queue.length + 1));
    queue.splice(index, 0, id);
    return index;
  }

  function vetoCard(state, cards, type, randomFn = secureRandom) {
    validateCards(cards);
    const config = TYPE_CONFIG[type];
    if (!config || !state.current) {
      return null;
    }

    const rejectedId = state.current[config.currentKey];

    if (state[config.queueKey].length === 0) {
      refillQueue(state, cards, type, randomFn, rejectedId);
    }

    const replacementId = state[config.queueKey].shift();
    insertAtRandomPosition(state[config.queueKey], rejectedId, randomFn);

    state.current[config.currentKey] = replacementId;
    state.current[config.keptKey] = false;
    state.current.replacedAt = new Date().toISOString();
    state.vetoes[type] += 1;
    state.updatedAt = new Date().toISOString();

    return { type, rejectedId, replacementId, current: state.current };
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

  function remaining(state) {
    return {
      stances: state.stanceQueue.length,
      drives: state.driveQueue.length
    };
  }

  function findCard(cards, type, id) {
    const config = TYPE_CONFIG[type];
    if (!config) {
      return null;
    }
    return cards[config.cardsKey].find((card) => card.id === id) || null;
  }

  return Object.freeze({
    STATE_VERSION,
    createDeckId,
    shuffle,
    createState,
    isStateUsable,
    migrateLegacyState,
    drawPair,
    keepCard,
    vetoCard,
    completeScene,
    remaining,
    findCard
  });
});
