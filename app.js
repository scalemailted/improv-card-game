(function () {
  "use strict";

  const cards = window.IMPROMPT_CARDS;
  const exercises = window.IMPROMPT_EXERCISES;
  const engine = window.ImpromptEngine;
  const qrCore = window.IMPROMPT_QR_CORE;
  const STORAGE_KEY = "imprompt:deck-state:v1";
  const LEGACY_ACTIVE_KEY = "two-secrets:v2:active-deck";
  const LEGACY_STORAGE_PREFIX = "two-secrets:v2:";
  const LEGACY_HASH_PATTERN = /^#deck=([A-Z2-9]{8})$/i;
  const GAME_URL = "https://scalemailted.github.io/improv-card-game/";
  const GAME_SHARE_TEXT = "Open Imprompt and draw your own independent Stance-and-Drive prompt deck.";
  const ALL_FILTER = engine.ALL_CATEGORIES;

  const hiddenCopy = Object.freeze({
    stance: Object.freeze({
      role: "YOUR POINT OF VIEW",
      title: "How you enter the scene",
      instruction: "Your attitude, relationship lens, status, or way of interpreting what happens."
    }),
    drive: Object.freeze({
      role: "YOUR SCENE ENGINE",
      title: "What keeps you playing",
      instruction: "Your objective, secret, avoidance, or repeatable behavior as the scene develops."
    })
  });

  const elements = {};
  [
    "titleScreen", "menuScreen", "exercisesScreen", "exerciseDetailScreen", "customExerciseScreen",
    "exerciseShareScreen", "joinExerciseScreen", "playScreen", "historyScreen", "learnScreen",
    "galleryScreen", "inviteScreen", "appFooter", "enterButton", "menuWordmark", "startSessionButton",
    "startSessionLabel", "startSessionDescription", "exercisesButton", "historyButton", "historyDescription",
    "historyMenuCount", "learnButton", "galleryButton", "inviteButton", "activeSessionSummary",
    "activeSessionMode", "activeSessionName", "activeSessionRole", "sceneSummary", "stancesRemaining",
    "drivesRemaining", "installButton", "exercisesBackButton", "startOpenPlayButton", "mirrorExerciseList",
    "pairedExerciseList", "mirrorExerciseCount", "pairedExerciseCount", "savedExercisesSection",
    "savedExerciseList", "savedExerciseCount", "createExerciseButton", "exerciseDetailBackButton",
    "exerciseDetailMode", "exerciseDetailHeading", "exerciseDetailSummary", "exerciseDetailFocus",
    "exerciseRoleGrid", "exerciseLockNote", "exerciseDetailActions", "customExerciseActions",
    "editCustomExerciseButton", "deleteCustomExerciseButton", "customExerciseBackButton", "customExerciseHeading",
    "customExerciseForm", "customExerciseName", "customExerciseFocus", "customModeControl",
    "customMirrorModeButton", "customPairedModeButton", "customModeHelp", "customRoleAGroup",
    "customRoleALetter", "customRoleAHeading", "customRoleASubtitle", "customRoleANameField",
    "customRoleAName", "customRoleAStance", "customRoleADrive", "customRoleBGroup", "customRoleBName",
    "customRoleBStance", "customRoleBDrive", "customExerciseLocked", "customVisibilityRow",
    "customExerciseOpenRoles", "saveCustomExerciseButton", "exerciseShareBackButton", "exerciseShareHeading",
    "exerciseShareSummary", "shareRoleTabs", "shareRoleChooserButton", "shareRoleAButton",
    "shareRoleBButton", "shareAssignmentSummary", "exerciseQrCode", "exerciseShareUrl",
    "shareExerciseLinkButton", "copyExerciseLinkButton", "exerciseShareFeedback", "acceptExerciseInviteButton",
    "declineExerciseInviteButton", "joinModePill", "joinExerciseHeading", "joinExerciseSummary",
    "joinRoleChoices", "joinAssignment", "playMenuButton", "playInviteButton", "sceneLabel",
    "playSessionBadge", "playExerciseName", "playExerciseRole", "stanceCardWrap", "driveCardWrap",
    "stanceCard", "driveCard", "stanceRole", "driveRole", "stanceCategory", "driveCategory",
    "stanceCategoryLabel", "driveCategoryLabel", "stanceCategoryIcon", "driveCategoryIcon", "stanceTitle",
    "driveTitle", "stanceInstruction", "driveInstruction", "stanceAction", "driveAction",
    "stanceFilterButton", "driveFilterButton", "stanceFilterLabel", "driveFilterLabel", "stanceFilterIcon",
    "driveFilterIcon", "stanceFilterChevron", "driveFilterChevron", "stanceFilterLock", "driveFilterLock",
    "playNote", "completeButton", "historyBackButton", "historyStartButton", "historyScenesTab",
    "historyCoverageTab", "historyScenesPanel", "historyCoveragePanel", "historyCount", "historyList",
    "historyEmpty", "historyEmptyCopy", "coverageCurrentButton", "coverageAllButton", "coverageSummary",
    "stanceCoverageList", "driveCoverageList", "learnBackButton", "galleryBackButton", "showStancesButton",
    "showDrivesButton", "gallerySearchInput", "gallerySearchClear", "galleryCategoryFilters",
    "galleryResultsCount", "galleryCardViewButton", "galleryListViewButton", "galleryCardPanel",
    "galleryListPanel", "galleryEmpty", "galleryCard", "galleryType", "galleryCount", "galleryCategory",
    "galleryCategoryLabel", "galleryCategoryIcon", "galleryTitle", "galleryInstruction", "galleryId",
    "galleryPreviousButton", "galleryNextButton", "galleryRandomButton", "inviteBackButton", "inviteBackLabel",
    "shareQrLink", "shareUrlLink", "shareLinkButton", "copyLinkButton", "shareFeedback", "cardDialog",
    "cardDialogPanel", "cardDialogType", "cardDialogCategory", "cardDialogCategoryLabel",
    "cardDialogCategoryIcon", "cardDialogTitle", "cardDialogInstruction", "closeCardDialogButton",
    "keepCardButton", "vetoCardButton", "filterDialog", "filterDialogPanel", "filterDialogType",
    "filterDialogTitle", "filterDialogDescription", "filterOptions", "closeFilterDialogButton", "confirmDialog",
    "cancelNewDeckButton", "confirmNewDeckButton", "sessionConflictDialog", "sessionConflictCopy",
    "cancelSessionChangeButton", "confirmSessionChangeButton", "deleteExerciseDialog",
    "cancelDeleteExerciseButton", "confirmDeleteExerciseButton", "newDeckButton", "liveStatus"
  ].forEach((id) => {
    elements[id] = document.getElementById(id);
  });
  elements.screens = Array.from(document.querySelectorAll("[data-screen]"));
  elements.completeButtonText = document.querySelector("#completeButton span:last-child");
  elements.choiceExplainer = document.querySelector("#cardDialog .choice-explainer");

  let state = loadState();
  let pendingInvite = exercises.parseInviteUrl(window.location.href);
  let pendingJoinRole = pendingInvite ? pendingInvite.roleId : null;
  let activeView = pendingInvite ? "join" : "title";
  let inviteReturnView = "menu";
  let selectedCardType = null;
  let selectedFilterType = null;
  let selectedExercise = null;
  let selectedExerciseOrigin = "exercises";
  let editingExerciseId = null;
  let sharingExercise = null;
  let shareRoleTarget = null;
  let currentExerciseShareUrl = GAME_URL;
  let pendingSessionAction = null;
  let pendingDeleteExerciseId = null;
  let customMode = "mirror";
  let historyView = "scenes";
  let coverageScope = "current";
  let galleryDeck = "stance";
  let galleryCategory = ALL_FILTER;
  let gallerySearch = "";
  let galleryView = "card";
  let galleryIndex = 0;
  let deferredInstallPrompt = null;
  const revealed = { stance: false, drive: false };

  function loadState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && engine.isStateUsable(parsed, cards, parsed.instanceId)) {
        cleanLegacyHash();
        return parsed;
      }
      const migrated = parsed ? engine.migrateLegacyState(parsed, cards) : null;
      if (migrated && engine.isStateUsable(migrated, cards, migrated.instanceId)) {
        saveState(migrated);
        cleanLegacyHash();
        return migrated;
      }
    } catch (error) {
      console.warn("Could not read the saved Imprompt deck.", error);
    }

    const legacy = loadLegacyState();
    if (legacy) {
      saveState(legacy);
      cleanLegacyHash();
      return legacy;
    }

    const fresh = engine.createState(cards);
    saveState(fresh);
    cleanLegacyHash();
    return fresh;
  }

  function loadLegacyState() {
    try {
      const hashMatch = window.location.hash.match(LEGACY_HASH_PATTERN);
      const savedId = window.localStorage.getItem(LEGACY_ACTIVE_KEY);
      const candidateIds = [hashMatch && hashMatch[1].toUpperCase(), savedId].filter(Boolean);
      for (const id of [...new Set(candidateIds)]) {
        const raw = window.localStorage.getItem(`${LEGACY_STORAGE_PREFIX}${id}`);
        const parsed = raw ? JSON.parse(raw) : null;
        const migrated = engine.migrateLegacyState(parsed, cards);
        if (migrated && engine.isStateUsable(migrated, cards, migrated.instanceId)) {
          return migrated;
        }
      }
    } catch (error) {
      console.warn("The previous prototype deck could not be migrated.", error);
    }
    return null;
  }

  function cleanLegacyHash() {
    if (!LEGACY_HASH_PATTERN.test(window.location.hash)) {
      return;
    }
    try {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    } catch (_error) {
      // Cosmetic only. Deck state remains local.
    }
  }

  function cleanExerciseInviteUrl() {
    try {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.hash || ""}`);
    } catch (_error) {
      // The invitation remains harmless if the browser refuses URL replacement.
    }
  }

  function saveState(nextState = state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch (error) {
      console.warn("This browser could not persist the deck. It will still work until the page closes.", error);
    }
  }

  function announce(message) {
    elements.liveStatus.textContent = "";
    window.setTimeout(() => {
      elements.liveStatus.textContent = message;
    }, 20);
  }

  function setActiveView(view) {
    activeView = view;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showMainMenu() {
    setActiveView("menu");
    announce("Main menu opened. Your prompts, sessions, and Scene Log remain saved on this phone.");
  }

  function openDialog(dialog) {
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function closeDialog(dialog) {
    if (typeof dialog.close === "function") {
      if (dialog.open) {
        dialog.close();
      }
    } else {
      dialog.removeAttribute("open");
    }
  }

  function closeOnBackdrop(event, dialog, closeFunction) {
    if (event.target === dialog) {
      closeFunction();
    }
  }

  function activeSession() {
    return engine.activeSession(state);
  }

  function modeLabel(mode) {
    if (mode === "paired") {
      return "PAIRED EXERCISE";
    }
    if (mode === "mirror") {
      return "MIRROR EXERCISE";
    }
    return "OPEN PLAY";
  }

  function cardConfig(type) {
    const isStance = type === "stance";
    return {
      label: isStance ? "Stance" : "Drive",
      pluralLabel: isStance ? "Stances" : "Drives",
      wrapper: isStance ? elements.stanceCardWrap : elements.driveCardWrap,
      button: isStance ? elements.stanceCard : elements.driveCard,
      role: isStance ? elements.stanceRole : elements.driveRole,
      category: isStance ? elements.stanceCategory : elements.driveCategory,
      categoryLabel: isStance ? elements.stanceCategoryLabel : elements.driveCategoryLabel,
      categoryIcon: isStance ? elements.stanceCategoryIcon : elements.driveCategoryIcon,
      title: isStance ? elements.stanceTitle : elements.driveTitle,
      instruction: isStance ? elements.stanceInstruction : elements.driveInstruction,
      action: isStance ? elements.stanceAction : elements.driveAction,
      filterButton: isStance ? elements.stanceFilterButton : elements.driveFilterButton,
      filterLabel: isStance ? elements.stanceFilterLabel : elements.driveFilterLabel,
      filterIcon: isStance ? elements.stanceFilterIcon : elements.driveFilterIcon,
      filterChevron: isStance ? elements.stanceFilterChevron : elements.driveFilterChevron,
      filterLock: isStance ? elements.stanceFilterLock : elements.driveFilterLock,
      currentKey: isStance ? "stanceId" : "driveId",
      keptKey: isStance ? "stanceKept" : "driveKept",
      filterKey: isStance ? "stanceFilter" : "driveFilter"
    };
  }

  function setCardAction(element, text, iconText) {
    const icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = iconText;
    element.replaceChildren(icon, document.createTextNode(` ${text}`));
  }

  function categoryStyleFor(categoryName) {
    const configured = cards.categoryStyles && cards.categoryStyles[categoryName];
    if (configured) {
      return configured;
    }
    const fallback = cards.defaultCategoryStyle || { id: "general", label: "General Prompt", icon: "sparkles" };
    return { id: fallback.id, label: categoryName || fallback.label, icon: fallback.icon };
  }

  function setCategoryIcon(useElement, iconName) {
    const href = `#category-icon-${iconName}`;
    useElement.setAttribute("href", href);
    useElement.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", href);
  }

  function applyCategoryStyle(surface, chip, labelElement, iconElement, categoryName) {
    const style = categoryStyleFor(categoryName);
    surface.dataset.category = style.id;
    chip.dataset.category = style.id;
    labelElement.textContent = style.label;
    setCategoryIcon(iconElement, style.icon);
    chip.hidden = false;
  }

  function clearCategoryStyle(surface, chip) {
    delete surface.dataset.category;
    delete chip.dataset.category;
    chip.hidden = true;
  }

  function svgUse(iconName, className = "category-icon") {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", className);
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    setCategoryIcon(use, iconName);
    svg.appendChild(use);
    return svg;
  }

  function createCategoryChip(categoryName, className = "history-category") {
    const isAll = categoryName === ALL_FILTER;
    const style = isAll ? { id: "general", label: "Random All", icon: "shuffle" } : categoryStyleFor(categoryName);
    const chip = document.createElement("span");
    chip.className = `category-chip ${className}`;
    chip.dataset.category = style.id;
    chip.append(svgUse(style.icon));
    const label = document.createElement("span");
    label.textContent = style.label;
    chip.append(label);
    return chip;
  }

  function createFilterPair(stanceFilter, driveFilter, className = "exercise-filter-pair") {
    const wrap = document.createElement("div");
    wrap.className = className;
    wrap.append(createCategoryChip(stanceFilter, "exercise-filter-chip"), createCategoryChip(driveFilter, "exercise-filter-chip"));
    return wrap;
  }

  function currentFilter(type) {
    const config = cardConfig(type);
    if (state.current) {
      return state.current[config.filterKey];
    }
    const session = activeSession();
    return session ? session.exercise[config.filterKey] : state.drawFilters[type];
  }

  function renderFilterTrigger(type) {
    if (!state.current) {
      return;
    }
    const config = cardConfig(type);
    const hasCard = state.current[config.currentKey] !== null;
    const session = activeSession();
    const locked = Boolean(session && session.exercise.locked);
    config.wrapper.classList.toggle("has-card", hasCard);
    config.filterButton.hidden = hasCard;
    if (hasCard) {
      return;
    }

    const filter = currentFilter(type);
    const style = filter === ALL_FILTER
      ? { id: "general", label: "Random All", icon: "shuffle" }
      : categoryStyleFor(filter);
    config.filterButton.dataset.category = style.id;
    config.filterLabel.textContent = style.label;
    setCategoryIcon(config.filterIcon, style.icon);
    config.filterButton.disabled = locked;
    config.filterButton.classList.toggle("is-locked", locked);
    config.filterChevron.hidden = locked;
    config.filterLock.hidden = !locked;
    config.filterButton.setAttribute(
      "aria-label",
      locked
        ? `${style.label} is locked for this guided exercise.`
        : `${style.label} selected for the ${config.label}. Tap to change the draw category.`
    );
  }

  function renderPlayCard(type) {
    if (!state.current) {
      return;
    }
    const config = cardConfig(type);
    const cardId = state.current[config.currentKey];
    const card = engine.findCard(cards, type, cardId);
    const hasCard = Boolean(card);
    const isRevealed = hasCard && revealed[type];
    const isKept = hasCard && state.current[config.keptKey];

    renderFilterTrigger(type);
    config.button.classList.toggle("is-concealed", !isRevealed);
    config.button.classList.toggle("is-revealed", isRevealed);
    config.button.classList.toggle("is-kept", isRevealed && isKept);

    if (!isRevealed) {
      const copy = hiddenCopy[type];
      clearCategoryStyle(config.button, config.category);
      config.role.hidden = false;
      config.role.textContent = copy.role;
      config.title.textContent = copy.title;
      config.instruction.textContent = copy.instruction;
      setCardAction(config.action, hasCard ? "Tap to reveal" : "Tap to draw", "✦");
      const filterName = currentFilter(type) === ALL_FILTER ? "Random All" : currentFilter(type);
      config.button.setAttribute(
        "aria-label",
        hasCard
          ? `Face-down ${config.label} card. Tap to reveal your private prompt.`
          : `Undrawn ${config.label} card. ${filterName} selected. Tap to draw and reveal your private prompt.`
      );
      return;
    }

    config.role.hidden = true;
    applyCategoryStyle(config.button, config.category, config.categoryLabel, config.categoryIcon, card.category);
    config.title.textContent = card.title;
    config.instruction.textContent = card.instruction;
    setCardAction(config.action, isKept ? "Kept · tap for options" : "Tap again to keep or veto", isKept ? "✓" : "⋯");
    config.button.setAttribute(
      "aria-label",
      `${config.label}, ${card.category}: ${card.title}. ${card.instruction}. ${isKept ? "Kept. " : ""}Tap again for card options.`
    );
  }

  function renderPlayContext() {
    const session = activeSession();
    if (!session) {
      return;
    }
    const sceneNumber = state.current ? state.current.sceneNumber : session.scenesCompleted + 1;
    elements.sceneLabel.textContent = `Scene ${sceneNumber}`;
    elements.playExerciseName.textContent = session.exercise.name;
    const roleText = session.exercise.mode === "paired"
      ? session.exercise.roleLabel
      : session.exercise.mode === "mirror" ? "MIRROR" : "OPEN";
    elements.playExerciseRole.textContent = roleText;
    elements.playSessionBadge.dataset.mode = session.exercise.mode;
    elements.playNote.textContent = session.exercise.locked
      ? `${session.exercise.roleDescription || session.exercise.focus} Category choices are locked for this exercise.`
      : "Tap each panel to draw. Category choices remain open for this session; tap a revealed card again to keep or veto it.";
  }

  function renderCompleteButton() {
    const canComplete = Boolean(state.current && state.current.stanceId !== null && state.current.driveId !== null);
    elements.completeButton.disabled = !canComplete;
    elements.completeButtonText.textContent = canComplete ? "Scene complete" : "Draw both cards first";
  }

  function renderMenu() {
    const remaining = engine.remaining(state);
    const session = activeSession();
    const hasCurrent = Boolean(state.current);
    const drawnCount = hasCurrent ? Number(state.current.stanceId !== null) + Number(state.current.driveId !== null) : 0;

    elements.stancesRemaining.textContent = remaining.stances;
    elements.drivesRemaining.textContent = remaining.drives;
    elements.activeSessionSummary.hidden = !session;

    if (!session) {
      elements.startSessionLabel.textContent = "Start Open Play";
      elements.startSessionDescription.textContent = "Draw from the full independent Stance and Drive decks.";
      elements.sceneSummary.textContent = "No active session";
      return;
    }

    elements.activeSessionMode.textContent = modeLabel(session.exercise.mode);
    elements.activeSessionName.textContent = session.exercise.name;
    elements.activeSessionRole.textContent = session.exercise.mode === "paired"
      ? `${session.exercise.roleShortLabel}: ${session.exercise.roleLabel}`
      : session.exercise.mode === "mirror" ? "Same themed pools on every phone" : "Player-controlled categories";

    const nextScene = session.scenesCompleted + 1;
    elements.startSessionLabel.textContent = hasCurrent ? `Resume ${session.exercise.name}` : `Continue ${session.exercise.name}`;
    elements.startSessionDescription.textContent = hasCurrent
      ? drawnCount > 0 ? "Return to this phone’s current private prompts." : "Return to the current scene and draw your prompts."
      : `Begin scene ${nextScene} in this session.`;
    elements.sceneSummary.textContent = hasCurrent && drawnCount > 0
      ? `${session.exercise.name} · scene ${state.current.sceneNumber} in progress`
      : `${session.exercise.name} · ready for scene ${nextScene}`;
  }

  function startOrResumeSession() {
    if (!activeSession()) {
      beginExerciseSession(exercises.OPEN_PLAY, "all");
      return;
    }
    if (!state.current) {
      engine.startScene(state, cards);
      revealed.stance = false;
      revealed.drive = false;
      saveState();
    }
    setActiveView("play");
    announce("Prompt session opened. Your cards remain private on this phone.");
  }

  function beginExerciseSession(exercise, roleId) {
    const selection = exercises.createSessionSelection(exercise, roleId);
    if (!selection) {
      announce("That exercise assignment could not be started.");
      return;
    }

    const start = () => {
      engine.startSession(state, cards, selection);
      engine.startScene(state, cards);
      revealed.stance = false;
      revealed.drive = false;
      saveState();
      selectedExercise = exercises.clone(exercise);
      setActiveView("play");
      announce(`${selection.name} started. This phone received the ${selection.roleLabel} assignment from an independent deck.`);
      if (navigator.vibrate) {
        navigator.vibrate(16);
      }
    };

    if (state.current) {
      pendingSessionAction = start;
      elements.sessionConflictCopy.textContent = `Starting ${selection.name} will return the unfinished scene’s drawn cards to their decks. No Scene Log entry will be created.`;
      openDialog(elements.sessionConflictDialog);
      return;
    }
    start();
  }

  function confirmSessionChange() {
    if (state.current) {
      engine.discardCurrentScene(state, cards);
      revealed.stance = false;
      revealed.drive = false;
      saveState();
    }
    closeDialog(elements.sessionConflictDialog);
    const action = pendingSessionAction;
    pendingSessionAction = null;
    if (action) {
      action();
    }
  }

  function handleCardTap(type) {
    if (!state.current) {
      return;
    }
    const config = cardConfig(type);
    if (state.current[config.currentKey] === null) {
      engine.drawCard(state, cards, type);
      revealed[type] = true;
      saveState();
      renderPlayCard(type);
      renderCompleteButton();
      const card = engine.findCard(cards, type, state.current[config.currentKey]);
      announce(`${config.label} drawn from ${card.category} and revealed.`);
      if (navigator.vibrate) {
        navigator.vibrate(12);
      }
      return;
    }
    if (!revealed[type]) {
      revealed[type] = true;
      renderPlayCard(type);
      announce(`${config.label} revealed.`);
      return;
    }
    openCardOptions(type);
  }

  function openCardOptions(type) {
    if (!state.current || !revealed[type]) {
      return;
    }
    selectedCardType = type;
    const config = cardConfig(type);
    const card = engine.findCard(cards, type, state.current[config.currentKey]);
    if (!card) {
      return;
    }
    elements.cardDialogPanel.dataset.cardType = type;
    elements.cardDialogType.textContent = `${config.label.toUpperCase()} OPTIONS`;
    applyCategoryStyle(elements.cardDialogPanel, elements.cardDialogCategory, elements.cardDialogCategoryLabel, elements.cardDialogCategoryIcon, card.category);
    elements.cardDialogTitle.textContent = card.title;
    elements.cardDialogInstruction.textContent = card.instruction;
    const filter = state.current[config.filterKey];
    const modeText = filter === ALL_FILTER ? "Random All" : filter;
    elements.choiceExplainer.textContent = `Keep this prompt for the scene, or return only this card to its deck and draw a concealed replacement using ${modeText}.`;
    openDialog(elements.cardDialog);
  }

  function closeCardOptions() {
    closeDialog(elements.cardDialog);
    selectedCardType = null;
  }

  function keepSelectedCard() {
    if (!selectedCardType || !state.current) {
      return;
    }
    const type = selectedCardType;
    engine.keepCard(state, type);
    saveState();
    closeCardOptions();
    renderPlayCard(type);
    announce(`${type === "stance" ? "Stance" : "Drive"} kept for this scene.`);
    cardConfig(type).button.focus({ preventScroll: true });
  }

  function vetoSelectedCard() {
    if (!selectedCardType || !state.current) {
      return;
    }
    const type = selectedCardType;
    const result = engine.vetoCard(state, cards, type);
    revealed[type] = false;
    saveState();
    closeCardOptions();
    renderPlayCard(type);
    const modeText = result.filter === ALL_FILTER ? "Random All" : result.filter;
    announce(`A replacement ${type === "stance" ? "Stance" : "Drive"} was drawn using ${modeText}. Tap the panel to reveal it.`);
    if (navigator.vibrate) {
      navigator.vibrate([10, 30, 10]);
    }
    cardConfig(type).button.focus({ preventScroll: true });
  }

  function createFilterOption(type, filter, selectedFilter) {
    const config = cardConfig(type);
    const isAll = filter === ALL_FILTER;
    const style = isAll ? { id: "general", label: "Random All", icon: "shuffle" } : categoryStyleFor(filter);
    const option = document.createElement("button");
    option.type = "button";
    option.className = "filter-option";
    option.dataset.category = style.id;
    option.setAttribute("role", "radio");
    option.setAttribute("aria-checked", String(filter === selectedFilter));
    option.classList.toggle("is-selected", filter === selectedFilter);
    const iconWrap = document.createElement("span");
    iconWrap.className = "filter-option-icon";
    iconWrap.append(svgUse(style.icon));
    const copy = document.createElement("span");
    copy.className = "filter-option-copy";
    const title = document.createElement("strong");
    title.textContent = style.label;
    const detail = document.createElement("small");
    detail.textContent = isAll
      ? `Any ${config.label} category`
      : `${cardsForType(type).filter((card) => card.category === filter).length} ${config.label} cards`;
    copy.append(title, detail);
    const check = document.createElement("span");
    check.className = "filter-option-check";
    check.setAttribute("aria-hidden", "true");
    check.textContent = "✓";
    option.append(iconWrap, copy, check);
    option.addEventListener("click", () => selectFilter(filter));
    return option;
  }

  function cardsForType(type) {
    return type === "stance" ? cards.stances : cards.drives;
  }

  function renderFilterOptions() {
    if (!selectedFilterType) {
      elements.filterOptions.replaceChildren();
      return;
    }
    const selectedFilter = currentFilter(selectedFilterType);
    const options = [ALL_FILTER, ...engine.categoriesFor(cards, selectedFilterType)];
    const fragment = document.createDocumentFragment();
    options.forEach((filter) => fragment.append(createFilterOption(selectedFilterType, filter, selectedFilter)));
    elements.filterOptions.replaceChildren(fragment);
  }

  function openFilterDialog(type) {
    if (!state.current) {
      return;
    }
    const session = activeSession();
    const config = cardConfig(type);
    if ((session && session.exercise.locked) || state.current[config.currentKey] !== null) {
      announce(session && session.exercise.locked ? "This category is locked for the guided exercise." : "A drawn card keeps the category that produced it.");
      return;
    }
    selectedFilterType = type;
    elements.filterDialogPanel.dataset.cardType = type;
    elements.filterDialogType.textContent = `${config.label.toUpperCase()} DRAW`;
    elements.filterDialogTitle.textContent = `Choose a ${config.label} category.`;
    elements.filterDialogDescription.textContent = `Random All can draw from every ${config.label} category. A focused choice stays active in this session until you change it.`;
    renderFilterOptions();
    openDialog(elements.filterDialog);
  }

  function closeFilterDialog() {
    closeDialog(elements.filterDialog);
    selectedFilterType = null;
  }

  function selectFilter(filter) {
    if (!selectedFilterType || !state.current) {
      return;
    }
    const type = selectedFilterType;
    const config = cardConfig(type);
    if (!engine.setDrawFilter(state, cards, type, filter)) {
      closeFilterDialog();
      announce("This category is locked for the guided exercise.");
      return;
    }
    saveState();
    closeFilterDialog();
    renderPlayCard(type);
    const label = filter === ALL_FILTER ? "Random All" : filter;
    announce(`${label} selected for the ${config.label}.`);
    config.filterButton.focus({ preventScroll: true });
  }

  function completeScene() {
    const entry = engine.completeScene(state, cards);
    if (!entry) {
      announce("Draw both cards before completing the scene.");
      return;
    }
    revealed.stance = false;
    revealed.drive = false;
    saveState();
    setActiveView("menu");
    announce(`Scene ${entry.sceneNumber} saved under ${entry.exerciseSnapshot.name}.`);
    if (navigator.vibrate) {
      navigator.vibrate(14);
    }
  }

  function createExerciseListItem(exercise, isSaved = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "exercise-list-item";
    button.dataset.mode = exercise.mode;
    const icon = document.createElement("span");
    icon.className = `exercise-list-mode ${exercise.mode}`;
    icon.setAttribute("aria-hidden", "true");
    if (exercise.mode === "paired") {
      icon.innerHTML = "<i>A</i><i>B</i>";
    } else {
      icon.innerHTML = "<i></i><i></i>";
    }
    const copy = document.createElement("span");
    copy.className = "exercise-list-copy";
    const topline = document.createElement("span");
    topline.className = "exercise-list-topline";
    const mode = document.createElement("small");
    mode.textContent = exercise.mode === "paired" ? "PAIRED" : "MIRROR";
    const saved = document.createElement("small");
    saved.textContent = isSaved ? "SAVED" : exercise.locked ? "LOCKED" : "SUGGESTED";
    topline.append(mode, saved);
    const title = document.createElement("strong");
    title.textContent = exercise.name;
    const summary = document.createElement("span");
    summary.textContent = exercise.summary;
    copy.append(topline, title, summary);
    const chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    chevron.setAttribute("viewBox", "0 0 24 24");
    chevron.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "m9 5 7 7-7 7");
    chevron.append(path);
    button.append(icon, copy, chevron);
    button.addEventListener("click", () => openExerciseDetail(exercise, "exercises"));
    return button;
  }

  function renderExercises() {
    const mirror = exercises.getPresets("mirror");
    const paired = exercises.getPresets("paired");
    const mirrorFragment = document.createDocumentFragment();
    mirror.forEach((exercise) => mirrorFragment.append(createExerciseListItem(exercise)));
    elements.mirrorExerciseList.replaceChildren(mirrorFragment);
    const pairedFragment = document.createDocumentFragment();
    paired.forEach((exercise) => pairedFragment.append(createExerciseListItem(exercise)));
    elements.pairedExerciseList.replaceChildren(pairedFragment);
    elements.mirrorExerciseCount.textContent = `${mirror.length} themes`;
    elements.pairedExerciseCount.textContent = `${paired.length} themes`;

    const saved = state.savedExercises.map((exercise) => exercises.normalizeExercise(exercise)).filter(Boolean);
    elements.savedExercisesSection.hidden = saved.length === 0;
    elements.savedExerciseCount.textContent = `${saved.length} saved`;
    const savedFragment = document.createDocumentFragment();
    saved.forEach((exercise) => savedFragment.append(createExerciseListItem(exercise, true)));
    elements.savedExerciseList.replaceChildren(savedFragment);
  }

  function openExerciseDetail(exercise, origin = "exercises") {
    const normalized = exercises.normalizeExercise(exercise, { forceSource: exercise.source });
    if (!normalized) {
      return;
    }
    selectedExercise = normalized;
    selectedExerciseOrigin = origin;
    setActiveView("exercise-detail");
  }

  function createRoleAssignmentCard(exercise, role, index) {
    const article = document.createElement("article");
    article.className = "role-assignment-card";
    article.dataset.role = role.id;
    const header = document.createElement("div");
    header.className = "role-assignment-header";
    const letter = document.createElement("span");
    letter.className = "role-letter";
    letter.textContent = exercise.mode === "paired" ? (index === 0 ? "A" : "B") : "M";
    const copy = document.createElement("div");
    const small = document.createElement("small");
    small.textContent = exercise.mode === "paired" ? `PLAYER ${index === 0 ? "A" : "B"}` : "EVERY PLAYER";
    const title = document.createElement("h2");
    title.textContent = role.label;
    copy.append(small, title);
    header.append(letter, copy);
    const description = document.createElement("p");
    description.textContent = role.description;
    article.append(header, createFilterPair(role.stanceFilter, role.driveFilter), description);
    return article;
  }

  function actionButton(label, className, handler) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", handler);
    return button;
  }

  function renderExerciseDetail() {
    if (!selectedExercise) {
      return;
    }
    const exercise = selectedExercise;
    elements.exerciseDetailMode.textContent = modeLabel(exercise.mode);
    elements.exerciseDetailHeading.textContent = exercise.name;
    elements.exerciseDetailSummary.textContent = exercise.summary;
    elements.exerciseDetailFocus.textContent = exercise.focus;
    const roleFragment = document.createDocumentFragment();
    exercise.roles.forEach((role, index) => roleFragment.append(createRoleAssignmentCard(exercise, role, index)));
    elements.exerciseRoleGrid.replaceChildren(roleFragment);
    elements.exerciseLockNote.textContent = exercise.locked
      ? "Category choices are locked inside this exercise. Players may leave the session, but the coached draw pools remain fixed while they play it."
      : "These categories are starting suggestions. Players may change either selector during the session.";

    const actions = document.createDocumentFragment();
    if (exercise.mode === "paired") {
      actions.append(
        actionButton(`Start as ${exercise.roles[0].label}`, "primary-button", () => beginExerciseSession(exercise, "a")),
        actionButton(`Start as ${exercise.roles[1].label}`, "primary-button alternate-primary", () => beginExerciseSession(exercise, "b"))
      );
    } else {
      actions.append(actionButton("Start on this phone", "primary-button", () => beginExerciseSession(exercise, "all")));
    }
    actions.append(actionButton("Share exercise by QR", "secondary-button", () => openExerciseShare(exercise)));
    elements.exerciseDetailActions.replaceChildren(actions);
    elements.customExerciseActions.hidden = exercise.source !== "custom";
  }

  function populateBuilderSelect(select, type) {
    const current = select.value;
    const options = [{ value: ALL_FILTER, label: "Random All" }, ...engine.categoriesFor(cards, type).map((category) => ({ value: category, label: category }))];
    select.replaceChildren(...options.map((optionData) => {
      const option = document.createElement("option");
      option.value = optionData.value;
      option.textContent = optionData.label;
      return option;
    }));
    select.value = options.some((option) => option.value === current) ? current : ALL_FILTER;
  }

  function setCustomMode(mode) {
    customMode = mode === "paired" ? "paired" : "mirror";
    const paired = customMode === "paired";
    elements.customMirrorModeButton.classList.toggle("is-active", !paired);
    elements.customMirrorModeButton.setAttribute("aria-pressed", String(!paired));
    elements.customPairedModeButton.classList.toggle("is-active", paired);
    elements.customPairedModeButton.setAttribute("aria-pressed", String(paired));
    document.querySelectorAll(".paired-only").forEach((element) => {
      element.hidden = !paired;
    });
    elements.customRoleALetter.textContent = paired ? "A" : "M";
    elements.customRoleAHeading.textContent = paired ? "Player A assignment" : "Mirror assignment";
    elements.customRoleASubtitle.textContent = paired ? "One private dramatic function" : "Used by every performer";
    elements.customModeHelp.textContent = paired
      ? "Player A and Player B receive different category rules from independent decks."
      : "Everyone receives the same category rules from independent decks.";
  }

  function openCustomBuilder(exercise = null) {
    populateBuilderSelect(elements.customRoleAStance, "stance");
    populateBuilderSelect(elements.customRoleADrive, "drive");
    populateBuilderSelect(elements.customRoleBStance, "stance");
    populateBuilderSelect(elements.customRoleBDrive, "drive");
    editingExerciseId = exercise && exercise.source === "custom" ? exercise.id : null;
    elements.customExerciseHeading.textContent = editingExerciseId ? "Edit your guided exercise." : "Create a guided exercise.";
    elements.saveCustomExerciseButton.textContent = editingExerciseId ? "Save changes" : "Save and preview exercise";

    if (exercise) {
      const normalized = exercises.normalizeExercise(exercise, { forceSource: "custom" });
      setCustomMode(normalized.mode);
      elements.customExerciseName.value = normalized.name;
      elements.customExerciseFocus.value = normalized.focus;
      elements.customExerciseLocked.checked = normalized.locked;
      elements.customExerciseOpenRoles.checked = normalized.roleVisibility === "open";
      elements.customRoleAName.value = normalized.roles[0].label;
      elements.customRoleAStance.value = normalized.roles[0].stanceFilter;
      elements.customRoleADrive.value = normalized.roles[0].driveFilter;
      if (normalized.mode === "paired") {
        elements.customRoleBName.value = normalized.roles[1].label;
        elements.customRoleBStance.value = normalized.roles[1].stanceFilter;
        elements.customRoleBDrive.value = normalized.roles[1].driveFilter;
      }
    } else {
      elements.customExerciseForm.reset();
      setCustomMode("mirror");
      elements.customExerciseLocked.checked = true;
      elements.customRoleAStance.value = ALL_FILTER;
      elements.customRoleADrive.value = ALL_FILTER;
      elements.customRoleBStance.value = ALL_FILTER;
      elements.customRoleBDrive.value = ALL_FILTER;
      elements.customRoleAName.value = "Pursuer";
      elements.customRoleBName.value = "Avoider";
    }
    setActiveView("custom-exercise");
  }

  function filterDisplay(filter) {
    return filter === ALL_FILTER ? "Random All" : filter;
  }

  function saveCustomExercise(event) {
    event.preventDefault();
    const name = elements.customExerciseName.value.trim();
    if (!name) {
      elements.customExerciseName.focus();
      return;
    }
    const paired = customMode === "paired";
    const roleAFilterStance = elements.customRoleAStance.value;
    const roleAFilterDrive = elements.customRoleADrive.value;
    const roleALabel = paired ? elements.customRoleAName.value.trim() || "Player A" : "Mirror Player";
    const roles = [{
      id: paired ? "a" : "all",
      label: roleALabel,
      shortLabel: paired ? "Player A" : "Mirror",
      description: `${filterDisplay(roleAFilterStance)} Stance plus ${filterDisplay(roleAFilterDrive)} Drive.`,
      stanceFilter: roleAFilterStance,
      driveFilter: roleAFilterDrive
    }];
    if (paired) {
      const roleBFilterStance = elements.customRoleBStance.value;
      const roleBFilterDrive = elements.customRoleBDrive.value;
      roles.push({
        id: "b",
        label: elements.customRoleBName.value.trim() || "Player B",
        shortLabel: "Player B",
        description: `${filterDisplay(roleBFilterStance)} Stance plus ${filterDisplay(roleBFilterDrive)} Drive.`,
        stanceFilter: roleBFilterStance,
        driveFilter: roleBFilterDrive
      });
    }
    const exercise = exercises.normalizeExercise({
      id: editingExerciseId || `custom-${Date.now().toString(36)}`,
      source: "custom",
      name,
      mode: customMode,
      summary: paired
        ? `${roles[0].label} and ${roles[1].label} receive complementary private category assignments.`
        : `Every performer independently draws from the same custom category combination.`,
      focus: elements.customExerciseFocus.value.trim() || "Use the assigned categories as private foundations for the shared scene.",
      locked: elements.customExerciseLocked.checked,
      roleVisibility: paired && elements.customExerciseOpenRoles.checked ? "open" : "hidden",
      roles
    }, { forceSource: "custom" });
    if (!exercise) {
      announce("The custom exercise could not be saved. Check the category choices.");
      return;
    }
    engine.upsertSavedExercise(state, exercise);
    saveState();
    selectedExercise = exercise;
    editingExerciseId = null;
    selectedExerciseOrigin = "exercises";
    setActiveView("exercise-detail");
    announce(`${exercise.name} saved on this phone.`);
  }

  function requestDeleteCustomExercise() {
    if (!selectedExercise || selectedExercise.source !== "custom") {
      return;
    }
    pendingDeleteExerciseId = selectedExercise.id;
    openDialog(elements.deleteExerciseDialog);
  }

  function confirmDeleteCustomExercise() {
    if (pendingDeleteExerciseId) {
      engine.removeSavedExercise(state, pendingDeleteExerciseId);
      saveState();
    }
    pendingDeleteExerciseId = null;
    selectedExercise = null;
    closeDialog(elements.deleteExerciseDialog);
    setActiveView("exercises");
    announce("Custom exercise removed from this phone. Existing Scene Log entries were preserved.");
  }

  function openExerciseShare(exercise) {
    sharingExercise = exercises.normalizeExercise(exercise, { forceSource: exercise.source });
    if (!sharingExercise) {
      return;
    }
    shareRoleTarget = sharingExercise.mode === "paired" ? null : "all";
    setExerciseShareFeedback("");
    setActiveView("exercise-share");
  }

  function setExerciseShareRole(roleId) {
    shareRoleTarget = roleId;
    renderExerciseShare();
  }

  function renderQrCode(container, text) {
    container.replaceChildren();
    if (!qrCore || !qrCore.QRCode) {
      const fallback = document.createElement("p");
      fallback.className = "qr-error";
      fallback.textContent = "QR generation is unavailable. Use the Share or Copy button below.";
      container.append(fallback);
      return;
    }
    try {
      const qr = new qrCore.QRCode(0, qrCore.ErrorCorrectLevel.M);
      qr.addData(text);
      qr.make();
      const count = qr.getModuleCount();
      const margin = 4;
      const size = count + margin * 2;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("shape-rendering", "crispEdges");
      const background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      background.setAttribute("width", String(size));
      background.setAttribute("height", String(size));
      background.setAttribute("fill", "#ffffff");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      let data = "";
      for (let row = 0; row < count; row += 1) {
        for (let column = 0; column < count; column += 1) {
          if (qr.isDark(row, column)) {
            data += `M${column + margin} ${row + margin}h1v1h-1z`;
          }
        }
      }
      path.setAttribute("d", data);
      path.setAttribute("fill", "#0b0f19");
      svg.append(background, path);
      container.append(svg);
    } catch (error) {
      console.warn("Could not render the exercise QR code.", error);
      const fallback = document.createElement("p");
      fallback.className = "qr-error";
      fallback.textContent = "This link is too large for the QR generator. Use Share or Copy below.";
      container.append(fallback);
    }
  }

  function renderShareAssignmentSummary() {
    const exercise = sharingExercise;
    elements.shareAssignmentSummary.replaceChildren();
    if (!exercise) {
      return;
    }
    if (exercise.mode !== "paired") {
      const role = exercise.roles[0];
      const title = document.createElement("strong");
      title.textContent = "Everyone receives the same draw rules";
      elements.shareAssignmentSummary.append(title, createFilterPair(role.stanceFilter, role.driveFilter));
      return;
    }
    if (!shareRoleTarget) {
      const title = document.createElement("strong");
      title.textContent = "Players choose their assignment after scanning";
      const note = document.createElement("p");
      note.textContent = "Use this single QR when the coach will verbally assign Player A and Player B.";
      elements.shareAssignmentSummary.append(title, note);
      return;
    }
    const role = exercises.getRole(exercise, shareRoleTarget);
    const title = document.createElement("strong");
    title.textContent = `${role.shortLabel}: ${role.label}`;
    const note = document.createElement("p");
    note.textContent = role.description;
    elements.shareAssignmentSummary.append(title, createFilterPair(role.stanceFilter, role.driveFilter), note);
  }

  function renderExerciseShare() {
    if (!sharingExercise) {
      return;
    }
    elements.exerciseShareHeading.textContent = `Share ${sharingExercise.name}.`;
    elements.exerciseShareSummary.textContent = sharingExercise.mode === "paired"
      ? "Use one chooser QR, or switch between role-specific codes so each performer receives only their assignment."
      : "Every player who scans receives the same theme rules and a completely independent local deck.";
    elements.shareRoleTabs.hidden = sharingExercise.mode !== "paired";
    [
      [elements.shareRoleChooserButton, shareRoleTarget === null],
      [elements.shareRoleAButton, shareRoleTarget === "a"],
      [elements.shareRoleBButton, shareRoleTarget === "b"]
    ].forEach(([button, active]) => {
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (sharingExercise.mode === "paired") {
      elements.shareRoleAButton.textContent = sharingExercise.roles[0].label;
      elements.shareRoleBButton.textContent = sharingExercise.roles[1].label;
    }
    renderShareAssignmentSummary();
    currentExerciseShareUrl = exercises.buildShareUrl(GAME_URL, sharingExercise, shareRoleTarget);
    elements.exerciseShareUrl.href = currentExerciseShareUrl;
    elements.exerciseShareUrl.textContent = currentExerciseShareUrl.replace(/^https?:\/\//, "");
    renderQrCode(elements.exerciseQrCode, currentExerciseShareUrl);
  }

  function setExerciseShareFeedback(message, isError = false) {
    elements.exerciseShareFeedback.textContent = message;
    elements.exerciseShareFeedback.classList.toggle("is-error", isError);
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, textArea.value.length);
    const copied = document.execCommand("copy");
    textArea.remove();
    if (!copied) {
      throw new Error("Copy command was not accepted by this browser.");
    }
  }

  async function copyExerciseLink() {
    try {
      await copyText(currentExerciseShareUrl);
      setExerciseShareFeedback("Exercise link copied. No cards or deck state were included.");
      announce("Exercise link copied.");
    } catch (error) {
      console.warn("Could not copy the exercise link.", error);
      setExerciseShareFeedback("Copy was unavailable. Press and hold the displayed link to copy it.", true);
    }
  }

  async function shareExerciseLink() {
    if (typeof navigator.share !== "function") {
      await copyExerciseLink();
      return;
    }
    try {
      await navigator.share({
        title: `${sharingExercise.name} — Imprompt`,
        text: `Join the ${sharingExercise.name} guided improv exercise in Imprompt. Your phone will create an independent deck.`,
        url: currentExerciseShareUrl
      });
      setExerciseShareFeedback("Exercise setup shared. Every player’s cards remain private.");
    } catch (error) {
      if (error && error.name === "AbortError") {
        return;
      }
      await copyExerciseLink();
    }
  }

  function renderJoinExercise() {
    if (!pendingInvite) {
      return;
    }
    const exercise = pendingInvite.exercise;
    elements.joinModePill.textContent = modeLabel(exercise.mode);
    elements.joinExerciseHeading.textContent = `Join ${exercise.name}.`;
    elements.joinExerciseSummary.textContent = exercise.summary;
    elements.joinRoleChoices.replaceChildren();
    elements.joinAssignment.replaceChildren();

    if (exercise.mode === "paired" && !pendingJoinRole) {
      elements.joinAssignment.hidden = true;
      elements.joinRoleChoices.hidden = false;
      const openStructure = exercise.roleVisibility === "open";
      exercise.roles.forEach((role, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "join-role-button";
        button.classList.toggle("is-selected", pendingJoinRole === role.id);
        const letter = document.createElement("span");
        letter.className = "role-letter";
        letter.textContent = index === 0 ? "A" : "B";
        const copy = document.createElement("span");
        copy.className = "join-role-button-copy";
        const title = document.createElement("strong");
        title.textContent = openStructure ? role.label : `Player ${index === 0 ? "A" : "B"}`;
        const description = document.createElement("small");
        description.textContent = openStructure ? role.description : "Tap to reveal only your private assignment.";
        copy.append(title, description);
        if (openStructure) {
          copy.append(createFilterPair(role.stanceFilter, role.driveFilter, "join-filter-pair"));
        }
        button.append(letter, copy);
        button.addEventListener("click", () => {
          pendingJoinRole = role.id;
          renderJoinExercise();
        });
        elements.joinRoleChoices.append(button);
      });
      elements.acceptExerciseInviteButton.disabled = true;
      elements.acceptExerciseInviteButton.textContent = "Choose Player A or Player B";
      return;
    }

    elements.joinRoleChoices.hidden = true;
    elements.joinAssignment.hidden = false;
    const role = exercises.getRole(exercise, exercise.mode === "paired" ? pendingJoinRole : "all");
    const label = document.createElement("span");
    label.className = "eyebrow";
    label.textContent = exercise.mode === "paired" ? "YOUR ASSIGNMENT" : "EVERY PLAYER";
    const title = document.createElement("h2");
    title.textContent = role.label;
    const description = document.createElement("p");
    description.textContent = role.description;
    elements.joinAssignment.append(label, title, createFilterPair(role.stanceFilter, role.driveFilter), description);
    if (exercise.mode === "paired" && exercise.roleVisibility === "open") {
      const otherRole = exercise.roles.find((candidate) => candidate.id !== role.id);
      if (otherRole) {
        const context = document.createElement("aside");
        context.className = "open-role-context";
        const contextLabel = document.createElement("small");
        contextLabel.textContent = "OPEN STRUCTURE · OTHER ASSIGNMENT";
        const contextTitle = document.createElement("strong");
        contextTitle.textContent = otherRole.label;
        context.append(contextLabel, contextTitle, createFilterPair(otherRole.stanceFilter, otherRole.driveFilter, "join-filter-pair"));
        elements.joinAssignment.append(context);
      }
    }
    if (exercise.mode === "paired" && !pendingInvite.roleId) {
      const change = document.createElement("button");
      change.type = "button";
      change.className = "text-button compact-text-button";
      change.textContent = "Choose the other assignment";
      change.addEventListener("click", () => {
        pendingJoinRole = null;
        renderJoinExercise();
      });
      elements.joinAssignment.append(change);
    }
    elements.acceptExerciseInviteButton.disabled = false;
    elements.acceptExerciseInviteButton.textContent = "Start independent session";
  }

  function acceptExerciseInvite() {
    if (!pendingInvite) {
      return;
    }
    const exercise = pendingInvite.exercise;
    const roleId = exercise.mode === "paired" ? pendingJoinRole : "all";
    if (exercise.mode === "paired" && !roleId) {
      return;
    }
    const original = pendingInvite;
    const start = () => {
      cleanExerciseInviteUrl();
      pendingInvite = null;
      pendingJoinRole = null;
      beginExerciseSession(original.exercise, roleId);
    };
    if (state.current) {
      pendingSessionAction = start;
      elements.sessionConflictCopy.textContent = `Joining ${exercise.name} will return the unfinished scene’s drawn cards to their decks. No Scene Log entry will be created.`;
      openDialog(elements.sessionConflictDialog);
      return;
    }
    start();
  }

  function declineExerciseInvite() {
    cleanExerciseInviteUrl();
    pendingInvite = null;
    pendingJoinRole = null;
    setActiveView("title");
  }

  function formatHistoryDate(isoDate) {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) {
      return "Completed scene";
    }
    const today = new Date();
    const sameDay = date.toDateString() === today.toDateString();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(date);
    if (sameDay) {
      return `Today · ${time}`;
    }
    if (isYesterday) {
      return `Yesterday · ${time}`;
    }
    return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: date.getFullYear() === today.getFullYear() ? undefined : "numeric", hour: "numeric", minute: "2-digit" }).format(date);
  }

  function createHistoryPrompt(type, snapshot, vetoCount) {
    const prompt = document.createElement("article");
    prompt.className = `history-prompt ${type === "stance" ? "stance-card" : "drive-card"}`;
    prompt.dataset.category = categoryStyleFor(snapshot.category).id;
    const topline = document.createElement("div");
    topline.className = "history-prompt-topline";
    topline.append(createCategoryChip(snapshot.category));
    const cardType = document.createElement("span");
    cardType.className = "card-type";
    cardType.textContent = type.toUpperCase();
    topline.append(cardType);
    const title = document.createElement("h3");
    title.textContent = snapshot.title;
    const instruction = document.createElement("p");
    instruction.textContent = snapshot.instruction;
    prompt.append(topline, title, instruction);
    if (vetoCount > 0) {
      const meta = document.createElement("span");
      meta.className = "history-prompt-meta";
      meta.textContent = `${vetoCount} ${vetoCount === 1 ? "redraw" : "redraws"} before this card`;
      prompt.append(meta);
    }
    return prompt;
  }

  function createHistoryEntry(entry, isLatest) {
    const details = document.createElement("details");
    details.className = "history-entry";
    details.open = isLatest;
    const summary = document.createElement("summary");
    summary.className = "history-entry-summary";
    const summaryCopy = document.createElement("span");
    summaryCopy.className = "history-entry-copy";
    const sceneName = document.createElement("strong");
    sceneName.textContent = `Scene ${entry.sceneNumber}`;
    const completed = document.createElement("small");
    completed.textContent = formatHistoryDate(entry.completedAt);
    summaryCopy.append(sceneName, completed);
    const summaryCategories = document.createElement("span");
    summaryCategories.className = "history-category-pair";
    for (const category of [entry.stanceSnapshot.category, entry.driveSnapshot.category]) {
      const dot = document.createElement("i");
      dot.dataset.category = categoryStyleFor(category).id;
      summaryCategories.append(dot);
    }
    const chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    chevron.setAttribute("class", "history-chevron");
    chevron.setAttribute("viewBox", "0 0 24 24");
    chevron.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "m7 9 5 5 5-5");
    chevron.append(path);
    summary.append(summaryCopy, summaryCategories, chevron);
    const promptGrid = document.createElement("div");
    promptGrid.className = "history-prompt-grid";
    promptGrid.append(
      createHistoryPrompt("stance", entry.stanceSnapshot, entry.stanceVetoes),
      createHistoryPrompt("drive", entry.driveSnapshot, entry.driveVetoes)
    );
    details.append(summary, promptGrid);
    return details;
  }

  function sessionEntries(sessionId) {
    return state.history.filter((entry) => entry.sessionId === sessionId).sort((a, b) => b.sceneNumber - a.sceneNumber);
  }

  function createHistorySessionGroup(session, isLatestSession) {
    const entries = sessionEntries(session.id);
    if (entries.length === 0) {
      return null;
    }
    const section = document.createElement("section");
    section.className = "history-session-group";
    if (session.id === state.activeSessionId) {
      section.classList.add("is-active-session");
    }
    const header = document.createElement("header");
    header.className = "history-session-header";
    const copy = document.createElement("div");
    const mode = document.createElement("span");
    mode.className = "mode-pill";
    mode.textContent = modeLabel(session.exercise.mode);
    const title = document.createElement("h2");
    title.textContent = session.exercise.name;
    const meta = document.createElement("p");
    const role = session.exercise.mode === "paired" ? ` · ${session.exercise.roleLabel}` : "";
    meta.textContent = `${entries.length} ${entries.length === 1 ? "scene" : "scenes"}${role}`;
    copy.append(mode, title, meta);
    header.append(copy);
    const list = document.createElement("div");
    list.className = "history-list";
    entries.forEach((entry, index) => list.append(createHistoryEntry(entry, isLatestSession && index === 0)));
    section.append(header, list);
    return section;
  }

  function renderHistoryScenes() {
    const count = state.history.length;
    const loggedSessionCount = state.sessions.filter((session) => sessionEntries(session.id).length > 0).length;
    elements.historyCount.textContent = `${count} ${count === 1 ? "scene" : "scenes"} logged across ${loggedSessionCount} ${loggedSessionCount === 1 ? "session" : "sessions"}`;
    elements.historyDescription.textContent = count === 0 ? "Review cards and practice categories." : `Review ${count} completed ${count === 1 ? "scene" : "scenes"} and category coverage.`;
    elements.historyMenuCount.textContent = String(count);
    elements.historyMenuCount.hidden = count === 0;
    elements.historyEmpty.hidden = count > 0;
    elements.historyList.hidden = count === 0;
    if (count === 0) {
      elements.historyList.replaceChildren();
      elements.historyEmptyCopy.textContent = state.scenesCompleted > 0
        ? "Scene logging begins with supported releases. Complete your next scene and its cards will appear here."
        : "Complete a scene and its final two cards will appear here for your postmortem.";
      return;
    }
    const sessions = [...state.sessions].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
    const fragment = document.createDocumentFragment();
    let appended = 0;
    sessions.forEach((session) => {
      const group = createHistorySessionGroup(session, appended === 0);
      if (group) {
        fragment.append(group);
        appended += 1;
      }
    });
    elements.historyList.replaceChildren(fragment);
  }

  function coverageEntries() {
    if (coverageScope === "current" && state.activeSessionId) {
      return state.history.filter((entry) => entry.sessionId === state.activeSessionId);
    }
    return state.history;
  }

  function createCoverageRow(category, count, total) {
    const style = categoryStyleFor(category);
    const row = document.createElement("article");
    row.className = "coverage-row";
    row.dataset.category = style.id;
    const top = document.createElement("div");
    top.className = "coverage-row-top";
    top.append(createCategoryChip(category, "coverage-category"));
    const countLabel = document.createElement("strong");
    countLabel.textContent = `${count} ${count === 1 ? "scene" : "scenes"}`;
    top.append(countLabel);
    const track = document.createElement("div");
    track.className = "coverage-track";
    const fill = document.createElement("span");
    fill.style.width = `${total > 0 ? Math.round((count / total) * 100) : 0}%`;
    track.append(fill);
    row.append(top, track);
    return row;
  }

  function renderCoverage() {
    const entries = coverageEntries();
    const session = activeSession();
    elements.coverageCurrentButton.disabled = !session;
    elements.coverageCurrentButton.classList.toggle("is-active", coverageScope === "current");
    elements.coverageAllButton.classList.toggle("is-active", coverageScope === "all");
    elements.coverageCurrentButton.setAttribute("aria-pressed", String(coverageScope === "current"));
    elements.coverageAllButton.setAttribute("aria-pressed", String(coverageScope === "all"));
    elements.coverageSummary.textContent = coverageScope === "current" && session
      ? `${entries.length} ${entries.length === 1 ? "completed scene" : "completed scenes"} in ${session.exercise.name}${session.exercise.mode === "paired" ? ` · ${session.exercise.roleLabel}` : ""}.`
      : `${entries.length} ${entries.length === 1 ? "completed scene" : "completed scenes"} across all saved sessions on this phone.`;

    const stanceCategories = engine.categoriesFor(cards, "stance");
    const driveCategories = engine.categoriesFor(cards, "drive");
    const stanceFragment = document.createDocumentFragment();
    stanceCategories.forEach((category) => {
      const count = entries.filter((entry) => entry.stanceSnapshot.category === category).length;
      stanceFragment.append(createCoverageRow(category, count, entries.length));
    });
    const driveFragment = document.createDocumentFragment();
    driveCategories.forEach((category) => {
      const count = entries.filter((entry) => entry.driveSnapshot.category === category).length;
      driveFragment.append(createCoverageRow(category, count, entries.length));
    });
    elements.stanceCoverageList.replaceChildren(stanceFragment);
    elements.driveCoverageList.replaceChildren(driveFragment);
  }

  function setHistoryView(view) {
    historyView = view === "coverage" ? "coverage" : "scenes";
    renderHistory();
  }

  function renderHistory() {
    const scenesActive = historyView === "scenes";
    elements.historyScenesTab.classList.toggle("is-active", scenesActive);
    elements.historyCoverageTab.classList.toggle("is-active", !scenesActive);
    elements.historyScenesTab.setAttribute("aria-pressed", String(scenesActive));
    elements.historyCoverageTab.setAttribute("aria-pressed", String(!scenesActive));
    elements.historyScenesPanel.hidden = !scenesActive;
    elements.historyCoveragePanel.hidden = scenesActive;
    renderHistoryScenes();
    renderCoverage();
  }

  function galleryDeckCards() {
    return galleryDeck === "stance" ? cards.stances : cards.drives;
  }

  function galleryFilteredCards() {
    const query = gallerySearch.trim().toLowerCase();
    return galleryDeckCards().filter((card) => {
      const categoryMatch = galleryCategory === ALL_FILTER || card.category === galleryCategory;
      const searchMatch = !query || `${card.title} ${card.instruction} ${card.category}`.toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });
  }

  function setGalleryDeck(type) {
    galleryDeck = type === "drive" ? "drive" : "stance";
    galleryCategory = ALL_FILTER;
    galleryIndex = 0;
    renderGallery();
  }

  function setGalleryCategory(category) {
    galleryCategory = category;
    galleryIndex = 0;
    renderGallery();
  }

  function setGalleryView(view) {
    galleryView = view === "list" ? "list" : "card";
    renderGallery();
  }

  function renderGalleryFilters() {
    const deck = galleryDeckCards();
    const categories = engine.categoriesFor(cards, galleryDeck);
    const filters = [ALL_FILTER, ...categories];
    const fragment = document.createDocumentFragment();
    filters.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gallery-filter-chip";
      button.classList.toggle("is-active", category === galleryCategory);
      button.setAttribute("aria-pressed", String(category === galleryCategory));
      const isAll = category === ALL_FILTER;
      const style = isAll ? { id: "general", label: "All", icon: "shuffle" } : categoryStyleFor(category);
      button.dataset.category = style.id;
      button.append(svgUse(style.icon));
      const label = document.createElement("span");
      label.textContent = style.label;
      const count = document.createElement("small");
      count.textContent = String(isAll ? deck.length : deck.filter((card) => card.category === category).length);
      button.append(label, count);
      button.addEventListener("click", () => setGalleryCategory(category));
      fragment.append(button);
    });
    elements.galleryCategoryFilters.replaceChildren(fragment);
  }

  function renderGalleryCard(card, index, total) {
    const isStance = galleryDeck === "stance";
    elements.galleryCard.classList.toggle("stance-card", isStance);
    elements.galleryCard.classList.toggle("drive-card", !isStance);
    elements.galleryType.textContent = isStance ? "STANCE" : "DRIVE";
    applyCategoryStyle(elements.galleryCard, elements.galleryCategory, elements.galleryCategoryLabel, elements.galleryCategoryIcon, card.category);
    elements.galleryTitle.textContent = card.title;
    elements.galleryInstruction.textContent = card.instruction;
    elements.galleryId.textContent = card.id;
    elements.galleryCount.textContent = `${index + 1} of ${total}`;
  }

  function createGalleryListRow(card, index) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `gallery-list-row ${galleryDeck === "stance" ? "stance-card" : "drive-card"}`;
    button.dataset.category = categoryStyleFor(card.category).id;
    const top = document.createElement("span");
    top.className = "gallery-list-top";
    top.append(createCategoryChip(card.category, "gallery-list-category"));
    const id = document.createElement("small");
    id.textContent = card.id;
    top.append(id);
    const title = document.createElement("strong");
    title.textContent = card.title;
    const instruction = document.createElement("span");
    instruction.textContent = card.instruction;
    button.append(top, title, instruction);
    button.addEventListener("click", () => {
      galleryIndex = index;
      galleryView = "card";
      renderGallery();
      elements.galleryCard.focus({ preventScroll: false });
    });
    return button;
  }

  function renderGallery() {
    const isStance = galleryDeck === "stance";
    elements.showStancesButton.classList.toggle("is-active", isStance);
    elements.showStancesButton.setAttribute("aria-pressed", String(isStance));
    elements.showDrivesButton.classList.toggle("is-active", !isStance);
    elements.showDrivesButton.setAttribute("aria-pressed", String(!isStance));
    elements.gallerySearchInput.value = gallerySearch;
    elements.gallerySearchClear.hidden = gallerySearch.length === 0;
    renderGalleryFilters();

    const filtered = galleryFilteredCards();
    elements.galleryResultsCount.textContent = `${filtered.length} ${filtered.length === 1 ? "card" : "cards"}`;
    const cardView = galleryView === "card";
    elements.galleryCardViewButton.classList.toggle("is-active", cardView);
    elements.galleryListViewButton.classList.toggle("is-active", !cardView);
    elements.galleryCardViewButton.setAttribute("aria-pressed", String(cardView));
    elements.galleryListViewButton.setAttribute("aria-pressed", String(!cardView));
    elements.galleryEmpty.hidden = filtered.length > 0;
    elements.galleryCardPanel.hidden = !cardView || filtered.length === 0;
    elements.galleryListPanel.hidden = cardView || filtered.length === 0;

    if (filtered.length === 0) {
      elements.galleryListPanel.replaceChildren();
      return;
    }
    galleryIndex = ((galleryIndex % filtered.length) + filtered.length) % filtered.length;
    renderGalleryCard(filtered[galleryIndex], galleryIndex, filtered.length);
    const fragment = document.createDocumentFragment();
    filtered.forEach((card, index) => fragment.append(createGalleryListRow(card, index)));
    elements.galleryListPanel.replaceChildren(fragment);
  }

  function moveGallery(amount) {
    const deck = galleryFilteredCards();
    if (deck.length === 0) {
      return;
    }
    galleryIndex = (galleryIndex + amount + deck.length) % deck.length;
    renderGallery();
  }

  function randomGalleryCard() {
    const deck = galleryFilteredCards();
    if (deck.length <= 1) {
      return;
    }
    let next = galleryIndex;
    while (next === galleryIndex) {
      next = Math.floor(Math.random() * deck.length);
    }
    galleryIndex = next;
    renderGallery();
  }

  function openInvitePanel(originView) {
    inviteReturnView = originView === "play" && state.current ? "play" : "menu";
    elements.shareQrLink.href = GAME_URL;
    elements.shareUrlLink.href = GAME_URL;
    setShareFeedback("");
    setActiveView("invite");
    announce("Public game QR code opened. Your local deck and exercise are not included.");
  }

  function closeInvitePanel() {
    setShareFeedback("");
    setActiveView(inviteReturnView === "play" && state.current ? "play" : "menu");
  }

  function setShareFeedback(message, isError = false) {
    elements.shareFeedback.textContent = message;
    elements.shareFeedback.classList.toggle("is-error", isError);
  }

  async function copyGameLink() {
    try {
      await copyText(GAME_URL);
      setShareFeedback("Public game link copied. No exercise or deck information was included.");
      announce("Public game link copied.");
    } catch (error) {
      console.warn("Could not copy the game link.", error);
      setShareFeedback("Copy was unavailable. Press and hold the displayed link to copy it.", true);
    }
  }

  async function shareGameLink() {
    if (typeof navigator.share !== "function") {
      await copyGameLink();
      return;
    }
    try {
      await navigator.share({ title: "Imprompt — Prompts for Improv", text: GAME_SHARE_TEXT, url: GAME_URL });
      setShareFeedback("Public game link shared. Your local deck stayed private.");
    } catch (error) {
      if (error && error.name === "AbortError") {
        return;
      }
      await copyGameLink();
    }
  }

  function requestNewDeck() {
    closeCardOptions();
    closeFilterDialog();
    openDialog(elements.confirmDialog);
  }

  function replaceDeck() {
    const savedExercises = state.savedExercises.map((exercise) => exercises.clone(exercise));
    state = engine.createState(cards);
    state.savedExercises = savedExercises;
    revealed.stance = false;
    revealed.drive = false;
    selectedCardType = null;
    selectedFilterType = null;
    selectedExercise = null;
    sharingExercise = null;
    inviteReturnView = "menu";
    saveState();
    closeDialog(elements.confirmDialog);
    setActiveView("menu");
    announce("A new independent deck and fresh session history were created. Your saved custom exercises remain available on this phone.");
  }

  function render() {
    if (activeView === "play" && !state.current) {
      activeView = "menu";
    }
    if (activeView === "exercise-detail" && !selectedExercise) {
      activeView = "exercises";
    }
    if (activeView === "exercise-share" && !sharingExercise) {
      activeView = "exercises";
    }
    if (activeView === "join" && !pendingInvite) {
      activeView = "title";
    }
    elements.screens.forEach((screen) => {
      screen.hidden = screen.dataset.screen !== activeView;
    });
    elements.appFooter.hidden = activeView === "title" || activeView === "join";
    elements.inviteBackLabel.textContent = inviteReturnView === "play" ? "Back to prompts" : "Main menu";

    renderMenu();
    renderExercises();
    renderExerciseDetail();
    renderExerciseShare();
    renderJoinExercise();
    if (state.current) {
      renderPlayCard("stance");
      renderPlayCard("drive");
      renderPlayContext();
    }
    renderCompleteButton();
    renderHistory();
    renderGallery();
  }

  function registerEvents() {
    elements.enterButton.addEventListener("click", () => setActiveView("menu"));
    elements.menuWordmark.addEventListener("click", (event) => { event.preventDefault(); setActiveView("title"); });
    elements.startSessionButton.addEventListener("click", startOrResumeSession);
    elements.exercisesButton.addEventListener("click", () => setActiveView("exercises"));
    elements.historyButton.addEventListener("click", () => setActiveView("history"));
    elements.learnButton.addEventListener("click", () => setActiveView("learn"));
    elements.galleryButton.addEventListener("click", () => setActiveView("gallery"));
    elements.inviteButton.addEventListener("click", () => openInvitePanel("menu"));

    elements.exercisesBackButton.addEventListener("click", showMainMenu);
    elements.startOpenPlayButton.addEventListener("click", () => beginExerciseSession(exercises.OPEN_PLAY, "all"));
    elements.createExerciseButton.addEventListener("click", () => openCustomBuilder());
    elements.exerciseDetailBackButton.addEventListener("click", () => setActiveView(selectedExerciseOrigin));
    elements.editCustomExerciseButton.addEventListener("click", () => openCustomBuilder(selectedExercise));
    elements.deleteCustomExerciseButton.addEventListener("click", requestDeleteCustomExercise);
    elements.customExerciseBackButton.addEventListener("click", () => setActiveView(editingExerciseId ? "exercise-detail" : "exercises"));
    elements.customMirrorModeButton.addEventListener("click", () => setCustomMode("mirror"));
    elements.customPairedModeButton.addEventListener("click", () => setCustomMode("paired"));
    elements.customExerciseForm.addEventListener("submit", saveCustomExercise);

    elements.exerciseShareBackButton.addEventListener("click", () => setActiveView("exercise-detail"));
    elements.shareRoleChooserButton.addEventListener("click", () => setExerciseShareRole(null));
    elements.shareRoleAButton.addEventListener("click", () => setExerciseShareRole("a"));
    elements.shareRoleBButton.addEventListener("click", () => setExerciseShareRole("b"));
    elements.shareExerciseLinkButton.addEventListener("click", shareExerciseLink);
    elements.copyExerciseLinkButton.addEventListener("click", copyExerciseLink);

    elements.acceptExerciseInviteButton.addEventListener("click", acceptExerciseInvite);
    elements.declineExerciseInviteButton.addEventListener("click", declineExerciseInvite);

    elements.playMenuButton.addEventListener("click", showMainMenu);
    elements.playInviteButton.addEventListener("click", () => openInvitePanel("play"));
    elements.playSessionBadge.addEventListener("click", () => setActiveView("exercises"));
    elements.stanceCard.addEventListener("click", () => handleCardTap("stance"));
    elements.driveCard.addEventListener("click", () => handleCardTap("drive"));
    elements.stanceFilterButton.addEventListener("click", () => openFilterDialog("stance"));
    elements.driveFilterButton.addEventListener("click", () => openFilterDialog("drive"));
    elements.completeButton.addEventListener("click", completeScene);

    elements.historyBackButton.addEventListener("click", showMainMenu);
    elements.historyStartButton.addEventListener("click", startOrResumeSession);
    elements.historyScenesTab.addEventListener("click", () => setHistoryView("scenes"));
    elements.historyCoverageTab.addEventListener("click", () => setHistoryView("coverage"));
    elements.coverageCurrentButton.addEventListener("click", () => { coverageScope = "current"; renderCoverage(); });
    elements.coverageAllButton.addEventListener("click", () => { coverageScope = "all"; renderCoverage(); });
    elements.learnBackButton.addEventListener("click", showMainMenu);

    elements.galleryBackButton.addEventListener("click", showMainMenu);
    elements.showStancesButton.addEventListener("click", () => setGalleryDeck("stance"));
    elements.showDrivesButton.addEventListener("click", () => setGalleryDeck("drive"));
    elements.galleryCardViewButton.addEventListener("click", () => setGalleryView("card"));
    elements.galleryListViewButton.addEventListener("click", () => setGalleryView("list"));
    elements.galleryPreviousButton.addEventListener("click", () => moveGallery(-1));
    elements.galleryNextButton.addEventListener("click", () => moveGallery(1));
    elements.galleryRandomButton.addEventListener("click", randomGalleryCard);
    elements.gallerySearchInput.addEventListener("input", (event) => {
      gallerySearch = event.target.value;
      galleryIndex = 0;
      renderGallery();
    });
    elements.gallerySearchClear.addEventListener("click", () => {
      gallerySearch = "";
      galleryIndex = 0;
      renderGallery();
      elements.gallerySearchInput.focus();
    });

    elements.inviteBackButton.addEventListener("click", closeInvitePanel);
    elements.shareLinkButton.addEventListener("click", shareGameLink);
    elements.copyLinkButton.addEventListener("click", copyGameLink);

    elements.closeCardDialogButton.addEventListener("click", closeCardOptions);
    elements.keepCardButton.addEventListener("click", keepSelectedCard);
    elements.vetoCardButton.addEventListener("click", vetoSelectedCard);
    elements.cardDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.cardDialog, closeCardOptions));
    elements.cardDialog.addEventListener("close", () => { selectedCardType = null; });

    elements.closeFilterDialogButton.addEventListener("click", closeFilterDialog);
    elements.filterDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.filterDialog, closeFilterDialog));
    elements.filterDialog.addEventListener("close", () => { selectedFilterType = null; });

    elements.newDeckButton.addEventListener("click", requestNewDeck);
    elements.cancelNewDeckButton.addEventListener("click", () => closeDialog(elements.confirmDialog));
    elements.confirmNewDeckButton.addEventListener("click", replaceDeck);
    elements.confirmDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.confirmDialog, () => closeDialog(elements.confirmDialog)));

    elements.cancelSessionChangeButton.addEventListener("click", () => { pendingSessionAction = null; closeDialog(elements.sessionConflictDialog); });
    elements.confirmSessionChangeButton.addEventListener("click", confirmSessionChange);
    elements.sessionConflictDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.sessionConflictDialog, () => { pendingSessionAction = null; closeDialog(elements.sessionConflictDialog); }));

    elements.cancelDeleteExerciseButton.addEventListener("click", () => { pendingDeleteExerciseId = null; closeDialog(elements.deleteExerciseDialog); });
    elements.confirmDeleteExerciseButton.addEventListener("click", confirmDeleteCustomExercise);
    elements.deleteExerciseDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.deleteExerciseDialog, () => closeDialog(elements.deleteExerciseDialog)));

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
      elements.installButton.hidden = false;
    });
    elements.installButton.addEventListener("click", async () => {
      if (!deferredInstallPrompt) {
        return;
      }
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      elements.installButton.hidden = true;
    });
    window.addEventListener("appinstalled", () => {
      deferredInstallPrompt = null;
      elements.installButton.hidden = true;
    });
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
      return;
    }
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" })
        .then((registration) => registration.update())
        .catch((error) => console.warn("Offline support could not be enabled.", error));
    });
  }

  registerEvents();
  registerServiceWorker();
  render();
})();
