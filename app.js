(function () {
  "use strict";

  const cards = window.IMPROMPT_CARDS;
  const hintBible = window.IMPROMPT_HINT_BIBLE;
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

  function isPolicyAvailable(policyId, unlocked) {
    const p = hintBible.getPolicy(policyId);
    return (p.allowsSingle || p.allowsCombination) && (!p.requiresUnlock || Boolean(unlocked));
  }

  const hiddenCopy = Object.freeze({
    stance: Object.freeze({
      role: "YOUR PRIVATE POINT OF VIEW",
      title: "How you enter the scene",
      instruction: "How you interpret yourself, the other person, or the situation. Let it shape how you react."
    }),
    drive: Object.freeze({
      role: "YOUR INITIAL PRESSURE",
      title: "What keeps you playing",
      instruction: "What you pursue, protect, avoid, discover, or repeat. Let it bend when the scene finds a shared pattern."
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
    "exerciseRoleGrid", "exerciseLockNote", "exerciseHintPolicySelect", "exerciseHintPolicyDescription",
    "exerciseDetailActions", "customExerciseActions",
    "editCustomExerciseButton", "deleteCustomExerciseButton", "customExerciseBackButton", "customExerciseHeading",
    "customExerciseForm", "customExerciseName", "customExerciseFocus", "customModeControl",
    "customMirrorModeButton", "customPairedModeButton", "customModeHelp", "customRoleAGroup",
    "customRoleALetter", "customRoleAHeading", "customRoleASubtitle", "customRoleANameField",
    "customRoleAName", "customRoleAStance", "customRoleADrive", "customRoleBGroup", "customRoleBName",
    "customRoleBStance", "customRoleBDrive", "customExerciseLocked", "customVisibilityRow",
    "customExerciseOpenRoles", "customHintPolicySelect", "customHintPolicyDescription", "saveCustomExerciseButton",
    "exerciseShareBackButton", "exerciseShareHeading",
    "exerciseShareSummary", "shareRoleTabs", "shareRoleChooserButton", "shareRoleAButton",
    "shareRoleBButton", "shareAssignmentSummary", "shareHintPolicySummary", "exerciseQrCode", "exerciseShareUrl",
    "shareExerciseLinkButton", "copyExerciseLinkButton", "exerciseShareFeedback", "acceptExerciseInviteButton",
    "declineExerciseInviteButton", "joinModePill", "joinExerciseHeading", "joinExerciseSummary", "joinHintPolicySummary",
    "joinRoleChoices", "joinAssignment", "playMenuButton", "playInviteButton", "sceneLabel",
    "playSessionBadge", "playExerciseName", "playExerciseRole", "stanceCardWrap", "driveCardWrap",
    "stanceCard", "driveCard", "stanceRole", "driveRole", "stanceCategory", "driveCategory",
    "stanceCategoryLabel", "driveCategoryLabel", "stanceCategoryIcon", "driveCategoryIcon", "stanceTitle",
    "driveTitle", "stanceInstruction", "driveInstruction", "stanceAction", "driveAction",
    "stanceFilterButton", "driveFilterButton", "stanceFilterLabel", "driveFilterLabel", "stanceFilterIcon",
    "driveFilterIcon", "stanceFilterChevron", "driveFilterChevron", "stanceFilterLock", "driveFilterLock",
    "stanceNudgeButton", "driveNudgeButton", "stanceVetoButton", "driveVetoButton", "playHintActions", "combinationHintButton", "hintUnlockCard", "unlockHintsButton",
    "playNote", "driveHelpButton", "completeButton", "historyBackButton", "historyStartButton", "historyScenesTab",
    "historyCoverageTab", "historyScenesPanel", "historyCoveragePanel", "historyCount", "historyList",
    "historyEmpty", "historyEmptyCopy", "historyPostmortemGuide", "historyGuideButton", "coverageCurrentButton", "coverageAllButton", "coverageSummary",
    "stanceCoverageList", "driveCoverageList", "learnBackButton", "learnBackLabel", "learnTwoDrivesJumpButton", "galleryBackButton", "showStancesButton",
    "showDrivesButton", "gallerySearchInput", "gallerySearchClear", "galleryCategoryFilters",
    "galleryResultsCount", "galleryCardViewButton", "galleryListViewButton", "galleryCardPanel",
    "galleryListPanel", "galleryEmpty", "galleryCard", "galleryType", "galleryCount", "galleryCategory",
    "galleryCategoryLabel", "galleryCategoryIcon", "galleryTitle", "galleryInstruction", "galleryId",
    "galleryPreviousButton", "galleryNextButton", "galleryRandomButton", "inviteBackButton", "inviteBackLabel",
    "shareQrLink", "shareUrlLink", "shareLinkButton", "copyLinkButton", "shareFeedback", "cardDialog",
    "cardDialogPanel", "cardDialogType", "cardDialogCategory", "cardDialogCategoryLabel",
    "cardDialogCategoryIcon", "cardDialogTitle", "cardDialogInstruction", "closeCardDialogButton",
    "keepCardButton", "vetoCardButton", "hintDialog", "hintDialogPanel", "hintDialogEyebrow", "hintDialogTitle",
    "closeHintDialogButton", "hintFeedback", "flagExampleButton", "exampleSettingsButton", "exampleSettingsDialog",
    "closeExampleSettingsButton", "exampleDownloadSize", "exampleCoverage", "exampleStorageStatus", "exampleProgress",
    "downloadExamplesButton", "cancelExamplesButton", "clearExamplesButton", "removeOldModelsButton", "exportExampleFeedbackButton",
    "hintDialogBody", "anotherHintAngleButton", "hintAngleCount", "doneHintButton",
    "filterDialog", "filterDialogPanel", "filterDialogType",
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
  let learnReturnView = "menu";
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
  let activeHintContext = null;
  const revealed = { stance: false, drive: false };
  let hintRequestSerial = 0;
  let exampleStorage = null;
  try { exampleStorage = window.localStorage; } catch (_) {}
  const exampleManifest = window.IMPROMPT_EXAMPLE_MANIFEST;
  const exampleLibrary = window.IMPROMPT_EXAMPLE_LIBRARY.create({
    manifest: exampleManifest, storage: exampleStorage,
    workerFactory: () => new Worker(new URL('./examples/library-worker.js?v=0.23.0', document.baseURI))
  });

  function loadState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && parsed.version === engine.STATE_VERSION) {
        const reconciliation = engine.reconcileStateWithLibrary(parsed, cards);
        if (engine.isStateUsable(parsed, cards, parsed.instanceId)) {
          if (reconciliation.changed) {
            saveState(parsed);
          }
          cleanLegacyHash();
          return parsed;
        }
      }
      const migrated = parsed ? engine.migrateLegacyState(parsed, cards) : null;
      if (migrated && engine.isStateUsable(migrated, cards, migrated.instanceId)) {
        engine.reconcileStateWithLibrary(migrated, cards);
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
          engine.reconcileStateWithLibrary(migrated, cards);
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

  function learnReturnLabel(view) {
    if (view === "play") {
      return "Back to scene";
    }
    if (view === "history") {
      return "Scene log";
    }
    return "Main menu";
  }

  function revealLearnSection(sectionId, shouldScroll = true) {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }
    if (section.tagName === "DETAILS") {
      section.open = true;
    }
    if (!shouldScroll) {
      return;
    }
    window.setTimeout(() => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      const summary = section.querySelector("summary");
      if (summary) {
        summary.focus({ preventScroll: true });
      }
    }, 20);
  }

  function openLearnSection(sectionId = "learn-quick-start", returnView = activeView, shouldScroll = sectionId !== "learn-quick-start") {
    const allowedReturnViews = new Set(["menu", "play", "history"]);
    learnReturnView = allowedReturnViews.has(returnView) ? returnView : "menu";
    elements.learnBackLabel.textContent = learnReturnLabel(learnReturnView);
    setActiveView("learn");
    revealLearnSection(sectionId, shouldScroll);
    announce("Scene Craft Guide opened.");
  }

  function closeLearnGuide() {
    const destination = learnReturnView === "play" && !state.current ? "menu" : learnReturnView;
    setActiveView(destination || "menu");
    announce(destination === "play" ? "Returned to your private prompts." : destination === "history" ? "Returned to the Scene Log." : "Main menu opened.");
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

  function hintPolicyForExercise(exercise) {
    return hintBible.normalizePolicy(exercise && exercise.hintPolicy);
  }

  function currentHintPolicyId() {
    const session = activeSession();
    return hintPolicyForExercise(session && session.exercise);
  }

  function currentHintPolicy() {
    return hintBible.getPolicy(currentHintPolicyId());
  }

  function hintPolicySummary(policyId, context = "play") {
    const policy = hintBible.getPolicy(policyId);
    const title = context === "share" ? `Hint access: ${policy.label}` : policy.label;
    return { title, description: policy.description };
  }

  function populateHintPolicySelect(select, selectedPolicy) {
    if (!select) {
      return;
    }
    const selected = hintBible.normalizePolicy(selectedPolicy);
    const fragment = document.createDocumentFragment();
    hintBible.policies.forEach((policy) => {
      const option = document.createElement("option");
      option.value = policy.id;
      option.textContent = policy.label;
      fragment.append(option);
    });
    select.replaceChildren(fragment);
    select.value = selected;
  }

  function renderHintPolicyDescription(select, descriptionElement) {
    if (!select || !descriptionElement) {
      return;
    }
    const policy = hintBible.getPolicy(select.value);
    descriptionElement.textContent = policy.description;
  }

  function renderHintPolicySummary(container, policyId, options = {}) {
    if (!container) {
      return;
    }
    const policy = hintBible.getPolicy(policyId);
    const eyebrow = document.createElement("span");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = options.eyebrow || "HINT ACCESS";
    const title = document.createElement("strong");
    title.textContent = policy.label;
    const description = document.createElement("p");
    description.textContent = policy.description;
    container.replaceChildren(eyebrow, title, description);
    container.dataset.policy = policy.id;
  }

  function sceneHintsUnlocked() {
    return Boolean(state.current && state.current.hintsUnlocked);
  }

  function hintsAvailableNow() {
    return isPolicyAvailable(currentHintPolicyId(), sceneHintsUnlocked());
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
      nudgeButton: isStance ? elements.stanceNudgeButton : elements.driveNudgeButton,
      vetoButton: isStance ? elements.stanceVetoButton : elements.driveVetoButton,
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
    config.action.hidden = isRevealed;

    if (!isRevealed) {
      const copy = hiddenCopy[type];
      clearCategoryStyle(config.button, config.category);
      config.role.hidden = false;
      config.role.textContent = copy.role;
      config.title.textContent = copy.title;
      config.instruction.textContent = copy.instruction;
      config.vetoButton.hidden = true;
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
    config.vetoButton.hidden = false;
    config.action.replaceChildren();
    config.button.setAttribute(
      "aria-label",
      `${config.label}, ${card.category}: ${card.title}. ${card.instruction}. Use Veto to replace this card or Nudge for an example.`
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
      ? `${session.exercise.roleDescription || session.exercise.focus} Category choices are locked. Use Veto or Nudge inside each revealed card.`
      : "Tap each panel to draw. Use Veto to replace a card or Nudge for an example.";
  }

  function createHintBlock(label, text, className = "") {
    const block = document.createElement("section");
    block.className = `hint-block${className ? ` ${className}` : ""}`;
    const heading = document.createElement("span");
    heading.textContent = label;
    const copy = document.createElement("p");
    copy.textContent = text;
    block.append(heading, copy);
    return block;
  }

  function renderHintControls() {
    const hasScene = Boolean(state.current);
    const policy = currentHintPolicy();
    const unlocked = sceneHintsUnlocked();
    const available = hasScene && isPolicyAvailable(policy.id, unlocked);
    const stanceReady = hasScene && state.current.stanceId !== null && revealed.stance;
    const driveReady = hasScene && state.current.driveId !== null && revealed.drive;

    elements.stanceNudgeButton.hidden = !(available && policy.allowsSingle && stanceReady);
    elements.driveNudgeButton.hidden = !(available && policy.allowsSingle && driveReady);
    elements.combinationHintButton.hidden = !(available && policy.allowsCombination && stanceReady && driveReady);
    elements.hintUnlockCard.hidden = !(hasScene && policy.requiresUnlock && !unlocked && stanceReady && driveReady);
    elements.playHintActions.hidden = elements.combinationHintButton.hidden && elements.hintUnlockCard.hidden;
  }

  function unlockSceneHints() {
    if (!state.current || currentHintPolicyId() !== "after-attempt") {
      return;
    }
    engine.unlockHints(state);
    saveState();
    renderHintControls();
    announce("Private hints unlocked for this scene.");
    if (!elements.combinationHintButton.hidden) {
      elements.combinationHintButton.focus({ preventScroll: true });
    }
  }

  function cancelHintRequest() { hintRequestSerial += 1; }

  function closeHintDialog() {
    cancelHintRequest();
    closeDialog(elements.hintDialog);
    activeHintContext = null;
  }

  function hintRequestForContext() {
    if (!activeHintContext || !state.current || !hintsAvailableNow()) return null;
    const types = activeHintContext.kind === 'single' ? [activeHintContext.type] : ['stance','drive'];
    const entries = types.map(type => ({revealed: revealed[type] === true,
      card: engine.findCard(cards, type, state.current[cardConfig(type).currentKey])}));
    if(entries.some(entry => !entry.revealed || !entry.card)) return null;
    return {kind: activeHintContext.kind, entries, policy: currentHintPolicy(), unlocked: sceneHintsUnlocked()};
  }

  function setHintHeading(request) {
    const selected = request.entries.map(entry => entry.card);
    elements.hintDialogPanel.dataset.cardType = request.kind === 'single' ? selected[0].type : 'combination';
    elements.hintDialogEyebrow.textContent = request.kind === 'single' ? `${selected[0].type.toUpperCase()} EXAMPLE` : 'PLAY THE PAIR';
    elements.hintDialogTitle.textContent = selected.map(card => card.title).join(' + ');
  }

  async function showNextExample() {
    const context = activeHintContext, request = hintRequestForContext();
    if(!context || !request) return;
    const serial = ++hintRequestSerial;
    elements.anotherHintAngleButton.disabled = true;
    elements.hintDialogBody.setAttribute('aria-busy','true');
    elements.hintFeedback.hidden = Boolean(context.example);
    elements.hintFeedback.textContent = 'Opening example…';
    try {
      const result = await exampleLibrary.next(request);
      if(serial !== hintRequestSerial || activeHintContext !== context || !elements.hintDialog.open || !hintRequestForContext()) return;
      context.example = result.example; context.key = result.key;
      const panel=document.createElement('section'); panel.className='performed-example';
      const action=document.createElement('p'); action.className='performed-action';action.textContent=`[${result.example.action}]`;
      const line=document.createElement('p'); line.className='performed-line';line.textContent=`“${result.example.line}”`;
      panel.append(action,line); elements.hintDialogBody.replaceChildren(panel);
      elements.hintAngleCount.textContent=`${result.index} of ${result.count}`;
      elements.anotherHintAngleButton.textContent='Another angle';
      elements.hintFeedback.hidden=true; elements.flagExampleButton.hidden=false;
      elements.flagExampleButton.textContent='Flag for review';
      announce('Example ready.');
    } catch(error) {
      if(serial !== hintRequestSerial || activeHintContext !== context) return;
      elements.hintFeedback.textContent=error.message;
      elements.hintFeedback.hidden=false;
      elements.anotherHintAngleButton.textContent='Retry';
    } finally {
      if(serial === hintRequestSerial && activeHintContext === context) {
        elements.anotherHintAngleButton.disabled=false;
        elements.hintDialogBody.setAttribute('aria-busy','false');
      }
    }
  }

  function openExample(kind,type) {
    cancelHintRequest(); activeHintContext={kind,type};
    const request=hintRequestForContext();if(!request){activeHintContext=null;return;}
    setHintHeading(request);elements.hintDialogBody.replaceChildren();
    elements.hintAngleCount.textContent='';elements.flagExampleButton.hidden=true;
    openDialog(elements.hintDialog); void showNextExample();
  }
  function openSingleHint(type) {openExample('single',type);}
  function openCombinationHint() {openExample('combination');}
  function showAnotherHintAngle() {void showNextExample();}

  function flagExample() {
    if(!activeHintContext?.example)return;
    try {
      const key='imprompt:example-feedback:v1';
      let saved=JSON.parse(window.localStorage.getItem(key)||'[]');if(!Array.isArray(saved))saved=[];
      const e=activeHintContext.example;
      if(!saved.some(item=>item.id===e.id&&item.datasetId===exampleManifest.datasetId))saved.push({
        id:e.id,key:activeHintContext.key,datasetId:exampleManifest.datasetId,action:e.action,line:e.line,
        provenance:e.provenance,flaggedAt:new Date().toISOString()});
      window.localStorage.setItem(key,JSON.stringify(saved.slice(-500)));
      elements.flagExampleButton.textContent='Flagged on this phone';
    } catch {elements.flagExampleButton.textContent='Storage unavailable';}
  }

  function formatBytes(value) {return `${(value/1000000).toFixed(2)} MB`;}
  let exampleInstall=null;
  async function renderExampleStorage() {
    elements.exampleDownloadSize.textContent=`Complete compressed library: ${formatBytes(exampleManifest.compressedBytes)}`;
    elements.exampleCoverage.textContent=`${exampleManifest.counts.singleExamples.toLocaleString()} single-card examples · ${exampleManifest.counts.pairExamples.toLocaleString()} pair examples`;
    try {
      const status=await exampleLibrary.status();
      elements.exampleStorageStatus.textContent=status.complete
        ? `All ${status.totalFiles} files saved on this phone. Ready for offline examples.`
        : `${status.savedFiles} of ${status.totalFiles} files saved. Uncached examples need a connection.`;
      if(!status.storageAvailable)elements.exampleStorageStatus.textContent='Browser storage is unavailable. Examples still work while connected.';
      if(!status.compression)elements.exampleDownloadSize.textContent=`Plain-text compatibility edition: ${formatBytes(status.downloadBytes)}`;
      elements.downloadExamplesButton.textContent=status.complete?'Verify saved library':'Save all examples offline';
    }catch(error){elements.exampleStorageStatus.textContent=error.message;}
  }
  function openExampleSettings(){openDialog(elements.exampleSettingsDialog);void renderExampleStorage();}
  async function downloadExamples(){
    if(exampleInstall)return;
    elements.downloadExamplesButton.disabled=true;elements.clearExamplesButton.disabled=true;
    elements.exampleProgress.hidden=false;elements.cancelExamplesButton.hidden=false;
    exampleInstall=exampleLibrary.install(p=>{
      elements.exampleProgress.value=p.done/p.total*100;
      elements.exampleStorageStatus.textContent=p.message;
    });
    try{await exampleInstall.promise;await renderExampleStorage();}
    catch(error){elements.exampleStorageStatus.textContent=error.name==='AbortError'?'Paused. Completed files are saved; resume when ready.':error.message;}
    finally{exampleInstall=null;elements.downloadExamplesButton.disabled=false;elements.clearExamplesButton.disabled=false;elements.exampleProgress.hidden=true;elements.cancelExamplesButton.hidden=true;}
  }
  async function clearExamples(){
    if(!window.confirm('Remove downloaded example files? Your cards, deck, sessions, and Scene Log will not change.'))return;
    try{await exampleLibrary.clear();await renderExampleStorage();}catch(error){elements.exampleStorageStatus.textContent=error.message;}
  }
  async function removeOldModels(){
    if(!window.confirm('Remove the previous Imprompt AI model downloads and generated hints? Keep other Imprompt tabs closed. Your deck and Scene Log are not touched.'))return;
    const failures=[];
    try{if(navigator.storage?.getDirectory){const root=await navigator.storage.getDirectory();await root.removeEntry('imprompt-local-models-v1',{recursive:true}).catch(e=>{if(e.name!=='NotFoundError')throw e;});}}catch(error){failures.push(error.message);}
    try{if(window.caches){const names=await caches.keys();await Promise.all(names.filter(n=>n.startsWith('imprompt-llm-runtime-')||n.startsWith('imprompt-local-ai-')).map(n=>caches.delete(n)));}}catch(error){failures.push(error.message);}
    try{['imprompt:generated-hints:v2','imprompt:local-model-preference:v1'].forEach(k=>window.localStorage.removeItem(k));}catch(error){failures.push(error.message);}
    elements.exampleStorageStatus.textContent=failures.length?'Some old files could not be removed: '+failures.join('; '):'Old model downloads removed. Deck and Scene Log preserved.';
  }
  function exportExampleFeedback(){
    try{
      const flags=JSON.parse(window.localStorage.getItem('imprompt:example-feedback:v1')||'[]');
      const file=new Blob([JSON.stringify({appVersion:'0.23.0',datasetId:exampleManifest.datasetId,flags},null,2)],{type:'application/json'});
      const link=document.createElement('a'), url=URL.createObjectURL(file);link.href=url;link.download='imprompt-example-feedback.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    }catch(error){elements.exampleStorageStatus.textContent=error.message;}
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
      activeHintContext = null;
      closeDialog(elements.hintDialog);
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
      activeHintContext = null;
      closeDialog(elements.hintDialog);
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
      engine.keepCard(state, type);
      revealed[type] = true;
      saveState();
      renderPlayCard(type);
      renderCompleteButton();
      renderHintControls();
      const card = engine.findCard(cards, type, state.current[config.currentKey]);
      announce(`${config.label} drawn from ${card.category} and revealed.`);
      if (navigator.vibrate) {
        navigator.vibrate(12);
      }
      return;
    }
    if (!revealed[type]) {
      revealed[type] = true;
      engine.keepCard(state, type);
      saveState();
      renderPlayCard(type);
      renderHintControls();
      announce(`${config.label} revealed.`);
      return;
    }
    announce(`${config.label} is ready. Use Veto to replace it or Nudge for an example.`);
  }

  function vetoInlineCard(type) {
    if (!state.current || !revealed[type]) {
      return;
    }
    const config = cardConfig(type);
    const result = engine.vetoCard(state, cards, type);
    revealed[type] = false;
    activeHintContext = null;
    closeDialog(elements.hintDialog);
    saveState();
    renderPlayCard(type);
    renderCompleteButton();
    renderHintControls();
    const modeText = result.filter === ALL_FILTER ? "Random All" : result.filter;
    announce(`A replacement ${config.label} was drawn using ${modeText}. Tap the card to reveal it.`);
    if (navigator.vibrate) {
      navigator.vibrate([10, 30, 10]);
    }
    config.button.focus({ preventScroll: true });
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
    renderHintControls();
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
    activeHintContext = null;
    closeDialog(elements.hintDialog);
    saveState();
    closeCardOptions();
    renderPlayCard(type);
    renderHintControls();
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
    closeHintDialog();
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
    populateHintPolicySelect(elements.exerciseHintPolicySelect, exercise.hintPolicy);
    renderHintPolicyDescription(elements.exerciseHintPolicySelect, elements.exerciseHintPolicyDescription);

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
    populateHintPolicySelect(elements.customHintPolicySelect, exercise && exercise.hintPolicy);
    renderHintPolicyDescription(elements.customHintPolicySelect, elements.customHintPolicyDescription);
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
      elements.customHintPolicySelect.value = normalized.hintPolicy;
      renderHintPolicyDescription(elements.customHintPolicySelect, elements.customHintPolicyDescription);
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
      elements.customHintPolicySelect.value = hintBible.DEFAULT_HINT_POLICY;
      renderHintPolicyDescription(elements.customHintPolicySelect, elements.customHintPolicyDescription);
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
      hintPolicy: elements.customHintPolicySelect.value,
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
    renderHintPolicySummary(elements.shareHintPolicySummary, sharingExercise.hintPolicy, { eyebrow: "SHARED HINT POLICY" });
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
    renderHintPolicySummary(elements.joinHintPolicySummary, exercise.hintPolicy, { eyebrow: "HINT ACCESS" });
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
    elements.historyPostmortemGuide.hidden = count === 0;
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
    activeHintContext = null;
    closeDialog(elements.hintDialog);
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
      renderHintControls();
    } else {
      renderHintControls();
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
    elements.learnButton.addEventListener("click", () => openLearnSection("learn-quick-start", "menu"));
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
    elements.exerciseHintPolicySelect.addEventListener("change", () => {
      if (!selectedExercise) {
        return;
      }
      selectedExercise.hintPolicy = hintBible.normalizePolicy(elements.exerciseHintPolicySelect.value);
      renderHintPolicyDescription(elements.exerciseHintPolicySelect, elements.exerciseHintPolicyDescription);
      announce(`${hintBible.getPolicy(selectedExercise.hintPolicy).label} selected for this exercise session.`);
    });
    elements.customHintPolicySelect.addEventListener("change", () => {
      renderHintPolicyDescription(elements.customHintPolicySelect, elements.customHintPolicyDescription);
    });
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
    elements.driveHelpButton.addEventListener("click", () => openLearnSection("learn-two-drives", "play"));
    elements.stanceNudgeButton.addEventListener("click", () => openSingleHint("stance"));
    elements.driveNudgeButton.addEventListener("click", () => openSingleHint("drive"));
    elements.stanceVetoButton.addEventListener("click", () => vetoInlineCard("stance"));
    elements.driveVetoButton.addEventListener("click", () => vetoInlineCard("drive"));
    elements.combinationHintButton.addEventListener("click", openCombinationHint);
    elements.unlockHintsButton.addEventListener("click", unlockSceneHints);
    elements.completeButton.addEventListener("click", completeScene);

    elements.historyBackButton.addEventListener("click", showMainMenu);
    elements.historyStartButton.addEventListener("click", startOrResumeSession);
    elements.historyScenesTab.addEventListener("click", () => setHistoryView("scenes"));
    elements.historyCoverageTab.addEventListener("click", () => setHistoryView("coverage"));
    elements.coverageCurrentButton.addEventListener("click", () => { coverageScope = "current"; renderCoverage(); });
    elements.coverageAllButton.addEventListener("click", () => { coverageScope = "all"; renderCoverage(); });
    elements.historyGuideButton.addEventListener("click", () => openLearnSection("learn-postmortem", "history"));
    elements.learnBackButton.addEventListener("click", closeLearnGuide);
    elements.learnTwoDrivesJumpButton.addEventListener("click", () => revealLearnSection("learn-two-drives"));

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

    elements.closeHintDialogButton.addEventListener("click", closeHintDialog);
    elements.doneHintButton.addEventListener("click", closeHintDialog);
    elements.anotherHintAngleButton.addEventListener("click", showAnotherHintAngle);
    elements.hintDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.hintDialog, closeHintDialog));
    elements.hintDialog.addEventListener("close", () => { cancelHintRequest(); activeHintContext = null; });
    elements.hintDialog.addEventListener("cancel", cancelHintRequest);
    elements.flagExampleButton.addEventListener('click', flagExample);
    elements.exampleSettingsButton.addEventListener('click', openExampleSettings);
    elements.closeExampleSettingsButton.addEventListener('click', () => closeDialog(elements.exampleSettingsDialog));
    elements.exampleSettingsDialog.addEventListener('click', event => closeOnBackdrop(event, elements.exampleSettingsDialog, () => closeDialog(elements.exampleSettingsDialog)));
    elements.downloadExamplesButton.addEventListener('click', () => { void downloadExamples(); });
    elements.cancelExamplesButton.addEventListener('click', () => exampleInstall?.cancel());
    elements.clearExamplesButton.addEventListener('click', () => { void clearExamples(); });
    elements.removeOldModelsButton.addEventListener('click', () => { void removeOldModels(); });
    elements.exportExampleFeedbackButton.addEventListener('click', exportExampleFeedback);
    window.addEventListener('pagehide', () => { cancelHintRequest(); exampleLibrary.dispose(); });

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
