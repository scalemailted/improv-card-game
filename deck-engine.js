(function (root, factory) {
  const engine = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = engine;
  } else {
    root.ImpromptEngine = engine;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const STATE_VERSION = 5;
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
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(randomFn() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function createDeckId(length = 8, randomFn = secureRandom) {
    let id = "";
    for (let index = 0; index < length; index += 1) {
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
      sessions: [],
      activeSessionId: null,
      savedExercises: [],
      scenesCompleted: 0,
      vetoes: { stance: 0, drive: 0 },
      cycles: { stance: 1, drive: 1 },
      createdAt,
      updatedAt: createdAt
    };
  }

  function cleanText(value, maxLength = 160) {
    return String(value || "")
      .replace(/[\u0000-\u001f\u007f]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, maxLength);
  }

  function uniqueSessionId(state, randomFn = secureRandom) {
    const existing = new Set((state.sessions || []).map((session) => session.id));
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const id = createDeckId(10, randomFn);
      if (!existing.has(id)) {
        return id;
      }
    }
    return `${Date.now().toString(36).toUpperCase()}${createDeckId(4, randomFn)}`;
  }

  function normalizeSessionSelection(cards, selection) {
    if (!selection || typeof selection !== "object") {
      throw new TypeError("A valid exercise selection is required.");
    }
    const stanceFilter = isValidFilter(cards, "stance", selection.stanceFilter)
      ? selection.stanceFilter
      : ALL_CATEGORIES;
    const driveFilter = isValidFilter(cards, "drive", selection.driveFilter)
      ? selection.driveFilter
      : ALL_CATEGORIES;
    const mode = selection.mode === "paired" ? "paired" : selection.mode === "mirror" ? "mirror" : "open";
    const roleId = mode === "paired" && selection.roleId === "b" ? "b" : mode === "paired" ? "a" : "all";
    return {
      exerciseId: cleanText(selection.exerciseId, 80) || "open-play",
      exerciseVersion: Number.isInteger(selection.exerciseVersion) ? selection.exerciseVersion : 1,
      source: ["open", "preset", "custom"].includes(selection.source) ? selection.source : "custom",
      name: cleanText(selection.name, 48) || "Open Play",
      mode,
      summary: cleanText(selection.summary, 180),
      focus: cleanText(selection.focus, 180),
      locked: Boolean(selection.locked),
      roleVisibility: selection.roleVisibility === "open" ? "open" : "hidden",
      roleId,
      roleLabel: cleanText(selection.roleLabel, 36) || (mode === "paired" ? `Player ${roleId.toUpperCase()}` : mode === "mirror" ? "Mirror" : "Open Play"),
      roleShortLabel: cleanText(selection.roleShortLabel, 24) || (mode === "paired" ? `Player ${roleId.toUpperCase()}` : mode === "mirror" ? "Mirror" : "Open"),
      roleDescription: cleanText(selection.roleDescription, 180),
      stanceFilter,
      driveFilter
    };
  }

  function startSession(state, cards, selection, randomFn = secureRandom) {
    validateCards(cards);
    if (state.current) {
      throw new Error("The current scene must be completed or discarded before starting another session.");
    }
    const normalized = normalizeSessionSelection(cards, selection);
    const timestamp = nowIso();
    const session = {
      id: uniqueSessionId(state, randomFn),
      exercise: normalized,
      scenesCompleted: 0,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    state.sessions.push(session);
    state.activeSessionId = session.id;
    state.drawFilters = {
      stance: normalized.stanceFilter,
      drive: normalized.driveFilter
    };
    state.updatedAt = timestamp;
    return session;
  }

  function activeSession(state) {
    if (!state || !state.activeSessionId || !Array.isArray(state.sessions)) {
      return null;
    }
    return state.sessions.find((session) => session.id === state.activeSessionId) || null;
  }

  function sessionById(state, id) {
    if (!state || !id || !Array.isArray(state.sessions)) {
      return null;
    }
    return state.sessions.find((session) => session.id === id) || null;
  }

  function ensureSession(state, cards, randomFn = secureRandom) {
    const existing = activeSession(state);
    if (existing) {
      return existing;
    }
    return startSession(state, cards, {
      exerciseId: "open-play",
      exerciseVersion: 1,
      source: "open",
      name: "Open Play",
      mode: "open",
      summary: "A fully open draw using the normal independent Stance and Drive decks.",
      focus: "Let each performer discover the scene without a shared coaching constraint.",
      locked: false,
      roleVisibility: "open",
      roleId: "all",
      roleLabel: "Open Play",
      roleShortLabel: "Open",
      roleDescription: "Draw from every Stance and Drive category.",
      stanceFilter: ALL_CATEGORIES,
      driveFilter: ALL_CATEGORIES
    }, randomFn);
  }

  function startScene(state, cards, randomFn = secureRandom) {
    validateCards(cards);
    if (state.current) {
      return state.current;
    }
    const session = ensureSession(state, cards, randomFn);
    state.current = {
      sessionId: session.id,
      sceneNumber: session.scenesCompleted + 1,
      stanceId: null,
      driveId: null,
      stanceKept: false,
      driveKept: false,
      stanceFilter: session.exercise.stanceFilter,
      driveFilter: session.exercise.driveFilter,
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
    const session = activeSession(state);
    if (session && session.exercise.locked) {
      return false;
    }

    state.drawFilters[type] = filter;
    if (session) {
      session.exercise[config.filterKey] = filter;
      session.updatedAt = nowIso();
    }
    if (state.current && state.current[config.currentKey] === null) {
      state.current[config.filterKey] = filter;
    }
    state.updatedAt = nowIso();
    return true;
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
    startScene(state, cards, randomFn);
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
    startScene(state, cards, randomFn);
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
    if (queue.includes(id)) {
      return queue.indexOf(id);
    }
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

  function snapshotCard(card) {
    return {
      id: card.id,
      title: card.title,
      instruction: card.instruction,
      category: card.category
    };
  }

  function snapshotExercise(session) {
    const exercise = session.exercise;
    return {
      sessionId: session.id,
      exerciseId: exercise.exerciseId,
      exerciseVersion: exercise.exerciseVersion,
      source: exercise.source,
      name: exercise.name,
      mode: exercise.mode,
      roleId: exercise.roleId,
      roleLabel: exercise.roleLabel,
      roleShortLabel: exercise.roleShortLabel,
      roleVisibility: exercise.roleVisibility,
      locked: exercise.locked,
      stanceFilter: exercise.stanceFilter,
      driveFilter: exercise.driveFilter
    };
  }

  function completeScene(state, cards) {
    validateCards(cards);
    if (!state.current || state.current.stanceId === null || state.current.driveId === null) {
      return false;
    }
    const session = sessionById(state, state.current.sessionId);
    const stance = findCard(cards, "stance", state.current.stanceId);
    const drive = findCard(cards, "drive", state.current.driveId);
    if (!session || !stance || !drive) {
      return false;
    }

    const completedAt = nowIso();
    const globalSceneNumber = state.scenesCompleted + 1;
    const entry = {
      id: `${session.id}-${state.current.sceneNumber}`,
      sessionId: session.id,
      sceneNumber: state.current.sceneNumber,
      globalSceneNumber,
      stanceId: stance.id,
      driveId: drive.id,
      stanceSnapshot: snapshotCard(stance),
      driveSnapshot: snapshotCard(drive),
      stanceFilter: state.current.stanceFilter,
      driveFilter: state.current.driveFilter,
      stanceVetoes: state.current.stanceVetoes,
      driveVetoes: state.current.driveVetoes,
      startedAt: state.current.startedAt,
      completedAt,
      exerciseSnapshot: snapshotExercise(session)
    };
    state.history.push(entry);
    session.scenesCompleted = state.current.sceneNumber;
    session.updatedAt = completedAt;
    state.current = null;
    state.scenesCompleted = globalSceneNumber;
    state.updatedAt = completedAt;
    return entry;
  }

  function discardCurrentScene(state, cards, randomFn = secureRandom) {
    validateCards(cards);
    if (!state.current) {
      return false;
    }
    for (const type of ["stance", "drive"]) {
      const config = configFor(type);
      const id = state.current[config.currentKey];
      if (id !== null) {
        insertAtRandomPosition(state[config.queueKey], id, randomFn);
      }
    }
    state.current = null;
    state.updatedAt = nowIso();
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

  function upsertSavedExercise(state, exercise) {
    if (!exercise || typeof exercise !== "object" || !cleanText(exercise.id, 80) || !cleanText(exercise.name, 48)) {
      return false;
    }
    const copy = JSON.parse(JSON.stringify(exercise));
    const index = state.savedExercises.findIndex((candidate) => candidate.id === copy.id);
    if (index >= 0) {
      state.savedExercises[index] = copy;
    } else {
      state.savedExercises.push(copy);
    }
    state.updatedAt = nowIso();
    return copy;
  }

  function removeSavedExercise(state, id) {
    const before = state.savedExercises.length;
    state.savedExercises = state.savedExercises.filter((exercise) => exercise.id !== id);
    if (state.savedExercises.length !== before) {
      state.updatedAt = nowIso();
      return true;
    }
    return false;
  }

  function isIsoLike(value) {
    return typeof value === "string" && !Number.isNaN(Date.parse(value));
  }

  function isUniqueValidQueue(queue, validIds) {
    return Array.isArray(queue)
      && queue.every((id) => validIds.has(id))
      && new Set(queue).size === queue.length;
  }

  function isSessionExerciseUsable(exercise, cards) {
    return Boolean(exercise)
      && typeof exercise === "object"
      && typeof exercise.exerciseId === "string"
      && typeof exercise.name === "string"
      && ["open", "mirror", "paired"].includes(exercise.mode)
      && ["open", "preset", "custom"].includes(exercise.source)
      && typeof exercise.locked === "boolean"
      && ["open", "hidden"].includes(exercise.roleVisibility)
      && ["all", "a", "b"].includes(exercise.roleId)
      && isValidFilter(cards, "stance", exercise.stanceFilter)
      && isValidFilter(cards, "drive", exercise.driveFilter);
  }

  function isSessionUsable(session, cards) {
    return Boolean(session)
      && typeof session === "object"
      && typeof session.id === "string"
      && session.id.length >= 4
      && isSessionExerciseUsable(session.exercise, cards)
      && Number.isInteger(session.scenesCompleted)
      && session.scenesCompleted >= 0
      && isIsoLike(session.createdAt)
      && isIsoLike(session.updatedAt);
  }

  function isSnapshotUsable(snapshot) {
    return Boolean(snapshot)
      && typeof snapshot === "object"
      && typeof snapshot.id === "string"
      && typeof snapshot.title === "string"
      && typeof snapshot.instruction === "string"
      && typeof snapshot.category === "string";
  }

  function isHistoryEntryUsable(entry, state, cards) {
    if (!entry || typeof entry !== "object" || !sessionById(state, entry.sessionId)) {
      return false;
    }
    return Number.isInteger(entry.sceneNumber)
      && entry.sceneNumber >= 1
      && Number.isInteger(entry.globalSceneNumber)
      && entry.globalSceneNumber >= 1
      && isSnapshotUsable(entry.stanceSnapshot)
      && isSnapshotUsable(entry.driveSnapshot)
      && isValidFilter(cards, "stance", entry.stanceFilter)
      && isValidFilter(cards, "drive", entry.driveFilter)
      && Number.isInteger(entry.stanceVetoes)
      && entry.stanceVetoes >= 0
      && Number.isInteger(entry.driveVetoes)
      && entry.driveVetoes >= 0
      && isIsoLike(entry.completedAt);
  }

  function isCurrentUsable(current, state, cards, stanceIds, driveIds) {
    if (current === null) {
      return true;
    }
    if (!current || typeof current !== "object" || !sessionById(state, current.sessionId)) {
      return false;
    }
    const stanceValid = current.stanceId === null || (stanceIds.has(current.stanceId) && !state.stanceQueue.includes(current.stanceId));
    const driveValid = current.driveId === null || (driveIds.has(current.driveId) && !state.driveQueue.includes(current.driveId));
    return Number.isInteger(current.sceneNumber)
      && current.sceneNumber >= 1
      && stanceValid
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

  function isSavedExerciseUsable(exercise, cards) {
    if (!exercise || typeof exercise !== "object" || exercise.source !== "custom") {
      return false;
    }
    if (typeof exercise.id !== "string" || typeof exercise.name !== "string" || !["mirror", "paired"].includes(exercise.mode)) {
      return false;
    }
    if (!Array.isArray(exercise.roles) || exercise.roles.length !== (exercise.mode === "paired" ? 2 : 1)) {
      return false;
    }
    return exercise.roles.every((role) => role
      && typeof role.label === "string"
      && isValidFilter(cards, "stance", role.stanceFilter)
      && isValidFilter(cards, "drive", role.driveFilter));
  }

  function isStateUsable(state, cards, expectedId) {
    try {
      validateCards(cards);
    } catch (_error) {
      return false;
    }
    if (!state || typeof state !== "object" || state.version !== STATE_VERSION || typeof state.instanceId !== "string") {
      return false;
    }
    if (expectedId && state.instanceId !== expectedId) {
      return false;
    }
    const stanceIds = new Set(allIds(cards, "stance"));
    const driveIds = new Set(allIds(cards, "drive"));
    if (!isUniqueValidQueue(state.stanceQueue, stanceIds) || !isUniqueValidQueue(state.driveQueue, driveIds)) {
      return false;
    }
    if (!state.drawFilters || !isValidFilter(cards, "stance", state.drawFilters.stance) || !isValidFilter(cards, "drive", state.drawFilters.drive)) {
      return false;
    }
    if (!Array.isArray(state.sessions) || !Array.isArray(state.history) || !Array.isArray(state.savedExercises)) {
      return false;
    }
    const sessionIds = new Set();
    for (const session of state.sessions) {
      if (!isSessionUsable(session, cards) || sessionIds.has(session.id)) {
        return false;
      }
      sessionIds.add(session.id);
    }
    if (state.activeSessionId !== null && !sessionIds.has(state.activeSessionId)) {
      return false;
    }
    const historyKeys = new Set();
    for (const entry of state.history) {
      if (!isHistoryEntryUsable(entry, state, cards)) {
        return false;
      }
      const key = `${entry.sessionId}:${entry.sceneNumber}`;
      if (historyKeys.has(key)) {
        return false;
      }
      historyKeys.add(key);
    }
    if (!state.savedExercises.every((exercise) => isSavedExerciseUsable(exercise, cards))) {
      return false;
    }
    if (!isCurrentUsable(state.current, state, cards, stanceIds, driveIds)) {
      return false;
    }
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
      && isIsoLike(state.createdAt)
      && isIsoLike(state.updatedAt);
  }

  function legacyQueueUsable(queue, validIds) {
    return Array.isArray(queue) && queue.every((id) => validIds.has(id)) && new Set(queue).size === queue.length;
  }

  function migrateLegacyState(legacyState, cards, randomFn = secureRandom) {
    validateCards(cards);
    if (!legacyState || typeof legacyState !== "object" || ![2, 3, 4].includes(legacyState.version)) {
      return null;
    }
    const stanceIds = new Set(allIds(cards, "stance"));
    const driveIds = new Set(allIds(cards, "drive"));
    if (!legacyQueueUsable(legacyState.stanceQueue, stanceIds) || !legacyQueueUsable(legacyState.driveQueue, driveIds)) {
      return null;
    }
    if (!Number.isInteger(legacyState.scenesCompleted) || legacyState.scenesCompleted < 0) {
      return null;
    }

    const timestamp = legacyState.updatedAt && isIsoLike(legacyState.updatedAt) ? legacyState.updatedAt : nowIso();
    const sessionId = createDeckId(10, randomFn);
    const drawFilters = legacyState.version === 4 && legacyState.drawFilters
      ? {
          stance: isValidFilter(cards, "stance", legacyState.drawFilters.stance) ? legacyState.drawFilters.stance : ALL_CATEGORIES,
          drive: isValidFilter(cards, "drive", legacyState.drawFilters.drive) ? legacyState.drawFilters.drive : ALL_CATEGORIES
        }
      : { stance: ALL_CATEGORIES, drive: ALL_CATEGORIES };
    const session = {
      id: sessionId,
      exercise: normalizeSessionSelection(cards, {
        exerciseId: "open-play",
        exerciseVersion: 1,
        source: "open",
        name: "Open Play",
        mode: "open",
        summary: "Migrated from an earlier Imprompt release.",
        focus: "Continue using the independent Stance and Drive deck.",
        locked: false,
        roleVisibility: "open",
        roleId: "all",
        roleLabel: "Open Play",
        roleShortLabel: "Open",
        roleDescription: "Draw from the full deck or choose categories locally.",
        stanceFilter: drawFilters.stance,
        driveFilter: drawFilters.drive
      }),
      scenesCompleted: legacyState.scenesCompleted,
      createdAt: legacyState.createdAt && isIsoLike(legacyState.createdAt) ? legacyState.createdAt : timestamp,
      updatedAt: timestamp
    };

    const history = [];
    if (legacyState.version === 4 && Array.isArray(legacyState.history)) {
      for (const oldEntry of legacyState.history) {
        const stance = findCard(cards, "stance", oldEntry.stanceId);
        const drive = findCard(cards, "drive", oldEntry.driveId);
        if (!stance || !drive || !Number.isInteger(oldEntry.sceneNumber)) {
          continue;
        }
        history.push({
          id: `${sessionId}-${oldEntry.sceneNumber}`,
          sessionId,
          sceneNumber: oldEntry.sceneNumber,
          globalSceneNumber: oldEntry.sceneNumber,
          stanceId: stance.id,
          driveId: drive.id,
          stanceSnapshot: snapshotCard(stance),
          driveSnapshot: snapshotCard(drive),
          stanceFilter: isValidFilter(cards, "stance", oldEntry.stanceFilter) ? oldEntry.stanceFilter : ALL_CATEGORIES,
          driveFilter: isValidFilter(cards, "drive", oldEntry.driveFilter) ? oldEntry.driveFilter : ALL_CATEGORIES,
          stanceVetoes: Number.isInteger(oldEntry.stanceVetoes) ? oldEntry.stanceVetoes : 0,
          driveVetoes: Number.isInteger(oldEntry.driveVetoes) ? oldEntry.driveVetoes : 0,
          startedAt: oldEntry.startedAt && isIsoLike(oldEntry.startedAt) ? oldEntry.startedAt : timestamp,
          completedAt: oldEntry.completedAt && isIsoLike(oldEntry.completedAt) ? oldEntry.completedAt : timestamp,
          exerciseSnapshot: snapshotExercise(session)
        });
      }
    }

    let current = null;
    if (legacyState.current && typeof legacyState.current === "object") {
      const stanceId = legacyState.current.stanceId === null || stanceIds.has(legacyState.current.stanceId)
        ? legacyState.current.stanceId
        : null;
      const driveId = legacyState.current.driveId === null || driveIds.has(legacyState.current.driveId)
        ? legacyState.current.driveId
        : null;
      current = {
        sessionId,
        sceneNumber: legacyState.scenesCompleted + 1,
        stanceId,
        driveId,
        stanceKept: Boolean(legacyState.current.stanceKept && stanceId),
        driveKept: Boolean(legacyState.current.driveKept && driveId),
        stanceFilter: legacyState.version === 4 && isValidFilter(cards, "stance", legacyState.current.stanceFilter)
          ? legacyState.current.stanceFilter
          : drawFilters.stance,
        driveFilter: legacyState.version === 4 && isValidFilter(cards, "drive", legacyState.current.driveFilter)
          ? legacyState.current.driveFilter
          : drawFilters.drive,
        stanceVetoes: legacyState.version === 4 && Number.isInteger(legacyState.current.stanceVetoes) ? legacyState.current.stanceVetoes : 0,
        driveVetoes: legacyState.version === 4 && Number.isInteger(legacyState.current.driveVetoes) ? legacyState.current.driveVetoes : 0,
        startedAt: legacyState.current.startedAt || legacyState.current.drawnAt || timestamp,
        stanceDrawnAt: legacyState.current.stanceDrawnAt || legacyState.current.drawnAt || null,
        driveDrawnAt: legacyState.current.driveDrawnAt || legacyState.current.drawnAt || null
      };
    }

    const migrated = {
      version: STATE_VERSION,
      instanceId: typeof legacyState.instanceId === "string" ? legacyState.instanceId : createDeckId(8, randomFn),
      stanceQueue: [...legacyState.stanceQueue],
      driveQueue: [...legacyState.driveQueue],
      current,
      drawFilters,
      history,
      sessions: [session],
      activeSessionId: sessionId,
      savedExercises: [],
      scenesCompleted: legacyState.scenesCompleted,
      vetoes: legacyState.vetoes && Number.isInteger(legacyState.vetoes.stance) && Number.isInteger(legacyState.vetoes.drive)
        ? { stance: legacyState.vetoes.stance, drive: legacyState.vetoes.drive }
        : { stance: 0, drive: 0 },
      cycles: legacyState.cycles && Number.isInteger(legacyState.cycles.stance) && Number.isInteger(legacyState.cycles.drive)
        ? { stance: legacyState.cycles.stance, drive: legacyState.cycles.drive }
        : { stance: 1, drive: 1 },
      createdAt: session.createdAt,
      updatedAt: timestamp
    };

    return isStateUsable(migrated, cards, migrated.instanceId) ? migrated : null;
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
    startSession,
    activeSession,
    sessionById,
    startScene,
    setDrawFilter,
    drawCard,
    drawPair,
    keepCard,
    vetoCard,
    completeScene,
    discardCurrentScene,
    remaining,
    remainingForFilter,
    findCard,
    upsertSavedExercise,
    removeSavedExercise,
    snapshotCard
  });
});
