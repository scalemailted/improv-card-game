(function (root, factory) {
  const engine = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = engine;
  } else {
    root.ImpromptEngine = engine;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const STATE_VERSION = 4;
  const ALL_CATEGORIES = "all";
  const SAFE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const TYPE_CONFIG = Object.freeze({
    stance: Object.freeze({
      cardsKey: "stances",
      queueKey: "stanceQueue",
      currentKey: "stanceId",
      keptKey: "stanceKept",
      filterKey: "stanceFilter",
      vetoKey: "stanceVetoes",
      drawnAtKey: "stanceDrawnAt"
    }),
    drive: Object.freeze({
      cardsKey: "drives",
      queueKey: "driveQueue",
      currentKey: "driveId",
      keptKey: "driveKept",
      filterKey: "driveFilter",
      vetoKey: "driveVetoes",
      drawnAtKey: "driveDrawnAt"
    })
  });

  function nowIso() {
    return new Date().toISOString();
  }

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

  function configFor(type) {
    const config = TYPE_CONFIG[type];
    if (!config) {
      throw new TypeError(`Unknown card type: ${type}`);
    }
    return config;
  }

  function cardsFor(cards, type) {
    return cards[configFor(type).cardsKey];
  }

  function allIds(cards, type) {
    return cardsFor(cards, type).map((card) => card.id);
  }

  function categoriesFor(cards, type) {
    return [...new Set(cardsFor(cards, type).map((card) => card.category))];
  }

  function isValidFilter(cards, type, filter) {
    return filter === ALL_CATEGORIES || categoriesFor(cards, type).includes(filter);
  }

  function createState(cards, instanceId = createDeckId(), randomFn = secureRandom) {
    validateCards(cards);
    const createdAt = nowIso();
    return {
      version: STATE_VERSION,
      instanceId,
      stanceQueue: shuffle(allIds(cards, "stance"), randomFn),
      driveQueue: shuffle(allIds(cards, "drive"), randomFn),
      current: null,
      drawFilters: { stance: ALL_CATEGORIES, drive: ALL_CATEGORIES },
      history: [],
      scenesCompleted: 0,
      vetoes: { stance: 0, drive: 0 },
      cycles: { stance: 1, drive: 1 },
      createdAt,
      updatedAt: createdAt
    };
  }

  function isUniqueValidQueue(queue, validIds) {
    return Array.isArray(queue)
      && queue.every((id) => validIds.has(id))
      && new Set(queue).size === queue.length;
  }

  function isNullableValidId(id, validIds) {
    return id === null || (typeof id === "string" && validIds.has(id));
  }

  function isIsoLike(value) {
    return typeof value === "string" && !Number.isNaN(Date.parse(value));
  }

  function isCurrentUsable(current, stanceIds, driveIds, state, cards) {
    if (current === null) {
      return true;
    }
    if (!current || typeof current !== "object") {
      return false;
    }

    const stanceValid = isNullableValidId(current.stanceId, stanceIds)
      && (current.stanceId === null || !state.stanceQueue.includes(current.stanceId));
    const driveValid = isNullableValidId(current.driveId, driveIds)
      && (current.driveId === null || !state.driveQueue.includes(current.driveId));

    return stanceValid
      && driveValid
      && typeof current.stanceKept === "boolean"
      && typeof current.driveKept === "boolean"
      && (!current.stanceKept || current.stanceId !== null)
      && (!current.driveKept || current.driveId !== null)
      && isValidFilter(cards, "stance", current.stanceFilter)
      && isValidFilter(cards, "drive", current.driveFilter)
      && Number.isInteger(current.stanceVetoes)
      && current.stanceVetoes >= 0
      && Number.isInteger(current.driveVetoes)
      && current.driveVetoes >= 0
      && isIsoLike(current.startedAt);
  }

  function isHistoryEntryUsable(entry, stanceIds, driveIds, cards) {
    return Boolean(entry)
      && typeof entry === "object"
      && Number.isInteger(entry.sceneNumber)
      && entry.sceneNumber >= 1
      && stanceIds.has(entry.stanceId)
      && driveIds.has(entry.driveId)
      && isValidFilter(cards, "stance", entry.stanceFilter)
      && isValidFilter(cards, "drive", entry.driveFilter)
      && Number.isInteger(entry.stanceVetoes)
      && entry.stanceVetoes >= 0
      && Number.isInteger(entry.driveVetoes)
      && entry.driveVetoes >= 0
      && isIsoLike(entry.completedAt);
  }

  function isHistoryUsable(history, stanceIds, driveIds, cards, scenesCompleted) {
    if (!Array.isArray(history)) {
      return false;
    }

    const sceneNumbers = new Set();
    for (const entry of history) {
      if (!isHistoryEntryUsable(entry, stanceIds, driveIds, cards)) {
        return false;
      }
      if (entry.sceneNumber > scenesCompleted || sceneNumbers.has(entry.sceneNumber)) {
        return false;
      }
      sceneNumbers.add(entry.sceneNumber);
    }
    return true;
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

    const validFilters = state.drawFilters
      && isValidFilter(cards, "stance", state.drawFilters.stance)
      && isValidFilter(cards, "drive", state.drawFilters.drive);

    return validCounters
      && validFilters
      && isUniqueValidQueue(state.stanceQueue, stanceIds)
      && isUniqueValidQueue(state.driveQueue, driveIds)
      && isCurrentUsable(state.current, stanceIds, driveIds, state, cards)
      && isHistoryUsable(state.history, stanceIds, driveIds, cards, state.scenesCompleted);
  }

  function isStateUsable(state, cards, expectedId) {
    return Boolean(state)
      && state.version === STATE_VERSION
      && isStateShapeUsable(state, cards, expectedId);
  }

  function isLegacyCurrentUsable(current, stanceIds, driveIds, state) {
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

  function isLegacyStateShapeUsable(state, cards) {
    try {
      validateCards(cards);
    } catch (_error) {
      return false;
    }
    if (!state || typeof state !== "object" || typeof state.instanceId !== "string") {
      return false;
    }

    const stanceIds = new Set(allIds(cards, "stance"));
    const driveIds = new Set(allIds(cards, "drive"));
    return Number.isInteger(state.scenesCompleted)
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
      && state.cycles.drive >= 1
      && isUniqueValidQueue(state.stanceQueue, stanceIds)
      && isUniqueValidQueue(state.driveQueue, driveIds)
      && isLegacyCurrentUsable(state.current, stanceIds, driveIds, state);
  }

  function migrateLegacyState(legacyState, cards) {
    if (!legacyState || ![2, 3].includes(legacyState.version) || !isLegacyStateShapeUsable(legacyState, cards)) {
      return null;
    }

    const migratedCurrent = legacyState.current
      ? {
          ...legacyState.current,
          stanceFilter: ALL_CATEGORIES,
          driveFilter: ALL_CATEGORIES,
          stanceVetoes: 0,
          driveVetoes: 0,
          startedAt: legacyState.current.drawnAt || legacyState.updatedAt || nowIso(),
          stanceDrawnAt: legacyState.current.drawnAt || null,
          driveDrawnAt: legacyState.current.drawnAt || null
        }
      : null;

    const migrated = {
      ...legacyState,
      version: STATE_VERSION,
      current: migratedCurrent,
      drawFilters: { stance: ALL_CATEGORIES, drive: ALL_CATEGORIES },
      history: [],
      updatedAt: nowIso()
    };

    return isStateShapeUsable(migrated, cards, migrated.instanceId) ? migrated : null;
  }

  function startScene(state) {
    if (state.current) {
      return state.current;
    }

    state.current = {
      stanceId: null,
      driveId: null,
      stanceKept: false,
      driveKept: false,
      stanceFilter: state.drawFilters.stance,
      driveFilter: state.drawFilters.drive,
      stanceVetoes: 0,
      driveVetoes: 0,
      startedAt: nowIso(),
      stanceDrawnAt: null,
      driveDrawnAt: null
    };
    state.updatedAt = nowIso();
    return state.current;
  }

  function setDrawFilter(state, cards, type, filter) {
    validateCards(cards);
    const config = configFor(type);
    if (!isValidFilter(cards, type, filter)) {
      throw new RangeError(`Unknown ${type} category filter: ${filter}`);
    }

    state.drawFilters[type] = filter;
    if (state.current && state.current[config.currentKey] === null) {
      state.current[config.filterKey] = filter;
    }
    state.updatedAt = nowIso();
    return filter;
  }

  function cardMatchesFilter(cards, type, id, filter) {
    if (filter === ALL_CATEGORIES) {
      return true;
    }
    const card = cardsFor(cards, type).find((candidate) => candidate.id === id);
    return Boolean(card && card.category === filter);
  }

  function refillFullQueue(state, cards, type, randomFn = secureRandom, excludedId = null) {
    const config = configFor(type);
    const ids = allIds(cards, type).filter((id) => id !== excludedId);
    state[config.queueKey] = shuffle(ids, randomFn);
    state.cycles[type] += 1;
  }

  function refillCategoryWithinQueue(state, cards, type, category, randomFn = secureRandom, excludedId = null) {
    const config = configFor(type);
    const existing = new Set(state[config.queueKey]);
    const ids = cardsFor(cards, type)
      .filter((card) => card.category === category && card.id !== excludedId && !existing.has(card.id))
      .map((card) => card.id);

    if (ids.length === 0) {
      return false;
    }

    state[config.queueKey].push(...shuffle(ids, randomFn));
    return true;
  }

  function drawOneFiltered(state, cards, type, filter = ALL_CATEGORIES, randomFn = secureRandom, excludedId = null) {
    const config = configFor(type);
    if (!isValidFilter(cards, type, filter)) {
      throw new RangeError(`Unknown ${type} category filter: ${filter}`);
    }

    if (state[config.queueKey].length === 0) {
      refillFullQueue(state, cards, type, randomFn, excludedId);
    }

    let index = state[config.queueKey].findIndex((id) => id !== excludedId && cardMatchesFilter(cards, type, id, filter));

    if (index < 0 && filter !== ALL_CATEGORIES) {
      refillCategoryWithinQueue(state, cards, type, filter, randomFn, excludedId);
      index = state[config.queueKey].findIndex((id) => id !== excludedId && cardMatchesFilter(cards, type, id, filter));
    }

    if (index < 0) {
      throw new Error(`No eligible ${type} card is available for the selected filter.`);
    }

    return state[config.queueKey].splice(index, 1)[0];
  }

  function drawCard(state, cards, type, randomFn = secureRandom) {
    validateCards(cards);
    const config = configFor(type);
    startScene(state);

    if (state.current[config.currentKey] !== null) {
      return state.current[config.currentKey];
    }

    const filter = state.current[config.filterKey];
    const id = drawOneFiltered(state, cards, type, filter, randomFn);
    const drawnAt = nowIso();
    state.current[config.currentKey] = id;
    state.current[config.drawnAtKey] = drawnAt;
    state.updatedAt = drawnAt;
    return id;
  }

  function drawPair(state, cards, randomFn = secureRandom) {
    validateCards(cards);
    startScene(state);
    drawCard(state, cards, "stance", randomFn);
    drawCard(state, cards, "drive", randomFn);
    return state.current;
  }

  function keepCard(state, type) {
    const config = TYPE_CONFIG[type];
    if (!config || !state.current || state.current[config.currentKey] === null) {
      return false;
    }
    state.current[config.keptKey] = true;
    state.updatedAt = nowIso();
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
    if (!config || !state.current || state.current[config.currentKey] === null) {
      return null;
    }

    const rejectedId = state.current[config.currentKey];
    const filter = state.current[config.filterKey];
    const replacementId = drawOneFiltered(state, cards, type, filter, randomFn, rejectedId);
    insertAtRandomPosition(state[config.queueKey], rejectedId, randomFn);

    const replacedAt = nowIso();
    state.current[config.currentKey] = replacementId;
    state.current[config.keptKey] = false;
    state.current[config.drawnAtKey] = replacedAt;
    state.current[config.vetoKey] += 1;
    state.vetoes[type] += 1;
    state.updatedAt = replacedAt;

    return { type, filter, rejectedId, replacementId, current: state.current };
  }

  function completeScene(state) {
    if (!state.current || state.current.stanceId === null || state.current.driveId === null) {
      return false;
    }

    const sceneNumber = state.scenesCompleted + 1;
    const completedAt = nowIso();
    state.history.push({
      sceneNumber,
      stanceId: state.current.stanceId,
      driveId: state.current.driveId,
      stanceFilter: state.current.stanceFilter,
      driveFilter: state.current.driveFilter,
      stanceVetoes: state.current.stanceVetoes,
      driveVetoes: state.current.driveVetoes,
      startedAt: state.current.startedAt,
      completedAt
    });
    state.current = null;
    state.scenesCompleted = sceneNumber;
    state.updatedAt = completedAt;
    return true;
  }

  function remaining(state) {
    return {
      stances: state.stanceQueue.length,
      drives: state.driveQueue.length
    };
  }

  function remainingForFilter(state, cards, type, filter) {
    const config = configFor(type);
    if (!isValidFilter(cards, type, filter)) {
      return 0;
    }
    return state[config.queueKey].filter((id) => cardMatchesFilter(cards, type, id, filter)).length;
  }

  function findCard(cards, type, id) {
    if (id === null || id === undefined) {
      return null;
    }
    return cardsFor(cards, type).find((card) => card.id === id) || null;
  }

  return Object.freeze({
    STATE_VERSION,
    ALL_CATEGORIES,
    createDeckId,
    shuffle,
    createState,
    isStateUsable,
    migrateLegacyState,
    categoriesFor,
    isValidFilter,
    startScene,
    setDrawFilter,
    drawCard,
    drawPair,
    keepCard,
    vetoCard,
    completeScene,
    remaining,
    remainingForFilter,
    findCard
  });
});
