(function () {
  "use strict";

  const cards = window.IMPROMPT_CARDS;
  const engine = window.ImpromptEngine;
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

  const elements = {
    screens: Array.from(document.querySelectorAll("[data-screen]")),
    titleScreen: document.getElementById("titleScreen"),
    menuScreen: document.getElementById("menuScreen"),
    playScreen: document.getElementById("playScreen"),
    historyScreen: document.getElementById("historyScreen"),
    learnScreen: document.getElementById("learnScreen"),
    galleryScreen: document.getElementById("galleryScreen"),
    inviteScreen: document.getElementById("inviteScreen"),
    appFooter: document.getElementById("appFooter"),
    enterButton: document.getElementById("enterButton"),
    menuWordmark: document.getElementById("menuWordmark"),
    startSessionButton: document.getElementById("startSessionButton"),
    startSessionLabel: document.getElementById("startSessionLabel"),
    startSessionDescription: document.getElementById("startSessionDescription"),
    historyButton: document.getElementById("historyButton"),
    historyDescription: document.getElementById("historyDescription"),
    historyMenuCount: document.getElementById("historyMenuCount"),
    learnButton: document.getElementById("learnButton"),
    galleryButton: document.getElementById("galleryButton"),
    inviteButton: document.getElementById("inviteButton"),
    playMenuButton: document.getElementById("playMenuButton"),
    playInviteButton: document.getElementById("playInviteButton"),
    historyBackButton: document.getElementById("historyBackButton"),
    historyStartButton: document.getElementById("historyStartButton"),
    learnBackButton: document.getElementById("learnBackButton"),
    galleryBackButton: document.getElementById("galleryBackButton"),
    inviteBackButton: document.getElementById("inviteBackButton"),
    inviteBackLabel: document.getElementById("inviteBackLabel"),
    sceneSummary: document.getElementById("sceneSummary"),
    sceneLabel: document.getElementById("sceneLabel"),
    stancesRemaining: document.getElementById("stancesRemaining"),
    drivesRemaining: document.getElementById("drivesRemaining"),
    stanceCardWrap: document.getElementById("stanceCardWrap"),
    driveCardWrap: document.getElementById("driveCardWrap"),
    stanceCard: document.getElementById("stanceCard"),
    driveCard: document.getElementById("driveCard"),
    stanceRole: document.getElementById("stanceRole"),
    driveRole: document.getElementById("driveRole"),
    stanceCategory: document.getElementById("stanceCategory"),
    driveCategory: document.getElementById("driveCategory"),
    stanceCategoryLabel: document.getElementById("stanceCategoryLabel"),
    driveCategoryLabel: document.getElementById("driveCategoryLabel"),
    stanceCategoryIcon: document.getElementById("stanceCategoryIcon"),
    driveCategoryIcon: document.getElementById("driveCategoryIcon"),
    stanceTitle: document.getElementById("stanceTitle"),
    driveTitle: document.getElementById("driveTitle"),
    stanceInstruction: document.getElementById("stanceInstruction"),
    driveInstruction: document.getElementById("driveInstruction"),
    stanceAction: document.getElementById("stanceAction"),
    driveAction: document.getElementById("driveAction"),
    stanceFilterButton: document.getElementById("stanceFilterButton"),
    driveFilterButton: document.getElementById("driveFilterButton"),
    stanceFilterLabel: document.getElementById("stanceFilterLabel"),
    driveFilterLabel: document.getElementById("driveFilterLabel"),
    stanceFilterIcon: document.getElementById("stanceFilterIcon"),
    driveFilterIcon: document.getElementById("driveFilterIcon"),
    completeButton: document.getElementById("completeButton"),
    completeButtonText: document.querySelector("#completeButton span:last-child"),
    historyCount: document.getElementById("historyCount"),
    historyList: document.getElementById("historyList"),
    historyEmpty: document.getElementById("historyEmpty"),
    historyEmptyCopy: document.getElementById("historyEmptyCopy"),
    showStancesButton: document.getElementById("showStancesButton"),
    showDrivesButton: document.getElementById("showDrivesButton"),
    galleryCard: document.getElementById("galleryCard"),
    galleryType: document.getElementById("galleryType"),
    galleryCount: document.getElementById("galleryCount"),
    galleryCategory: document.getElementById("galleryCategory"),
    galleryCategoryLabel: document.getElementById("galleryCategoryLabel"),
    galleryCategoryIcon: document.getElementById("galleryCategoryIcon"),
    galleryTitle: document.getElementById("galleryTitle"),
    galleryInstruction: document.getElementById("galleryInstruction"),
    galleryId: document.getElementById("galleryId"),
    galleryPreviousButton: document.getElementById("galleryPreviousButton"),
    galleryNextButton: document.getElementById("galleryNextButton"),
    galleryRandomButton: document.getElementById("galleryRandomButton"),
    shareQrLink: document.getElementById("shareQrLink"),
    shareUrlLink: document.getElementById("shareUrlLink"),
    shareLinkButton: document.getElementById("shareLinkButton"),
    copyLinkButton: document.getElementById("copyLinkButton"),
    shareFeedback: document.getElementById("shareFeedback"),
    cardDialog: document.getElementById("cardDialog"),
    cardDialogPanel: document.getElementById("cardDialogPanel"),
    cardDialogType: document.getElementById("cardDialogType"),
    cardDialogCategory: document.getElementById("cardDialogCategory"),
    cardDialogCategoryLabel: document.getElementById("cardDialogCategoryLabel"),
    cardDialogCategoryIcon: document.getElementById("cardDialogCategoryIcon"),
    cardDialogTitle: document.getElementById("cardDialogTitle"),
    cardDialogInstruction: document.getElementById("cardDialogInstruction"),
    closeCardDialogButton: document.getElementById("closeCardDialogButton"),
    keepCardButton: document.getElementById("keepCardButton"),
    vetoCardButton: document.getElementById("vetoCardButton"),
    filterDialog: document.getElementById("filterDialog"),
    filterDialogPanel: document.getElementById("filterDialogPanel"),
    filterDialogType: document.getElementById("filterDialogType"),
    filterDialogTitle: document.getElementById("filterDialogTitle"),
    filterDialogDescription: document.getElementById("filterDialogDescription"),
    filterOptions: document.getElementById("filterOptions"),
    closeFilterDialogButton: document.getElementById("closeFilterDialogButton"),
    confirmDialog: document.getElementById("confirmDialog"),
    cancelNewDeckButton: document.getElementById("cancelNewDeckButton"),
    confirmNewDeckButton: document.getElementById("confirmNewDeckButton"),
    newDeckButton: document.getElementById("newDeckButton"),
    installButton: document.getElementById("installButton"),
    liveStatus: document.getElementById("liveStatus")
  };

  let state = loadState();
  let activeView = "title";
  let inviteReturnView = "menu";
  let selectedCardType = null;
  let selectedFilterType = null;
  let galleryDeck = "stance";
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
      // The clean public URL is cosmetic; deck state remains local either way.
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
    announce("Main menu opened. Your current prompts and scene log remain saved on this phone.");
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
    return {
      id: fallback.id,
      label: categoryName || fallback.label,
      icon: fallback.icon
    };
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

  function currentFilter(type) {
    const config = cardConfig(type);
    if (state.current) {
      return state.current[config.filterKey];
    }
    return state.drawFilters[type];
  }

  function renderFilterTrigger(type) {
    if (!state.current) {
      return;
    }

    const config = cardConfig(type);
    const hasCard = state.current[config.currentKey] !== null;
    config.wrapper.classList.toggle("has-card", hasCard);
    config.filterButton.hidden = hasCard;

    if (hasCard) {
      return;
    }

    const filter = currentFilter(type);
    if (filter === ALL_FILTER) {
      config.filterButton.dataset.category = "general";
      config.filterLabel.textContent = "Random All";
      setCategoryIcon(config.filterIcon, "shuffle");
      config.filterButton.setAttribute("aria-label", `Random All ${config.pluralLabel} selected. Tap to choose a ${config.label} category.`);
      return;
    }

    const style = categoryStyleFor(filter);
    config.filterButton.dataset.category = style.id;
    config.filterLabel.textContent = style.label;
    setCategoryIcon(config.filterIcon, style.icon);
    config.filterButton.setAttribute("aria-label", `${style.label} selected for the ${config.label}. Tap to change the draw category.`);
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

  function renderCompleteButton() {
    const canComplete = Boolean(
      state.current
      && state.current.stanceId !== null
      && state.current.driveId !== null
    );
    elements.completeButton.disabled = !canComplete;
    elements.completeButtonText.textContent = canComplete ? "Scene complete" : "Draw both cards first";
  }

  function renderGallery() {
    const deck = galleryDeck === "stance" ? cards.stances : cards.drives;
    galleryIndex = ((galleryIndex % deck.length) + deck.length) % deck.length;
    const card = deck[galleryIndex];
    const isStance = galleryDeck === "stance";

    elements.showStancesButton.classList.toggle("is-active", isStance);
    elements.showStancesButton.setAttribute("aria-pressed", String(isStance));
    elements.showDrivesButton.classList.toggle("is-active", !isStance);
    elements.showDrivesButton.setAttribute("aria-pressed", String(!isStance));
    elements.galleryCard.classList.toggle("stance-card", isStance);
    elements.galleryCard.classList.toggle("drive-card", !isStance);
    elements.galleryType.textContent = isStance ? "STANCE" : "DRIVE";
    elements.galleryCount.textContent = `${galleryIndex + 1} of ${deck.length}`;
    applyCategoryStyle(
      elements.galleryCard,
      elements.galleryCategory,
      elements.galleryCategoryLabel,
      elements.galleryCategoryIcon,
      card.category
    );
    elements.galleryTitle.textContent = card.title;
    elements.galleryInstruction.textContent = card.instruction;
    elements.galleryId.textContent = card.id;
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
    const style = categoryStyleFor(categoryName);
    const chip = document.createElement("span");
    chip.className = `category-chip ${className}`;
    chip.dataset.category = style.id;
    chip.append(svgUse(style.icon));
    const label = document.createElement("span");
    label.textContent = style.label;
    chip.append(label);
    return chip;
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
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: date.getFullYear() === today.getFullYear() ? undefined : "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(date);
  }

  function createHistoryPrompt(type, card, vetoCount) {
    const prompt = document.createElement("article");
    prompt.className = `history-prompt ${type === "stance" ? "stance-card" : "drive-card"}`;
    prompt.dataset.category = categoryStyleFor(card.category).id;

    const topline = document.createElement("div");
    topline.className = "history-prompt-topline";
    topline.append(createCategoryChip(card.category));
    const cardType = document.createElement("span");
    cardType.className = "card-type";
    cardType.textContent = type.toUpperCase();
    topline.append(cardType);

    const title = document.createElement("h3");
    title.textContent = card.title;
    const instruction = document.createElement("p");
    instruction.textContent = card.instruction;

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
    const stance = engine.findCard(cards, "stance", entry.stanceId);
    const drive = engine.findCard(cards, "drive", entry.driveId);
    if (!stance || !drive) {
      return null;
    }

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
    summary.append(summaryCopy);
    const summaryCategories = document.createElement("span");
    summaryCategories.className = "history-category-pair";
    const stanceDot = document.createElement("i");
    stanceDot.dataset.category = categoryStyleFor(stance.category).id;
    const driveDot = document.createElement("i");
    driveDot.dataset.category = categoryStyleFor(drive.category).id;
    summaryCategories.append(stanceDot, driveDot);
    summary.append(summaryCategories);
    const chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    chevron.setAttribute("class", "history-chevron");
    chevron.setAttribute("viewBox", "0 0 24 24");
    chevron.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "m7 9 5 5 5-5");
    chevron.append(path);
    summary.append(chevron);

    const promptGrid = document.createElement("div");
    promptGrid.className = "history-prompt-grid";
    promptGrid.append(
      createHistoryPrompt("stance", stance, entry.stanceVetoes),
      createHistoryPrompt("drive", drive, entry.driveVetoes)
    );

    details.append(summary, promptGrid);
    return details;
  }

  function renderHistory() {
    const entries = [...state.history].sort((a, b) => b.sceneNumber - a.sceneNumber);
    const count = entries.length;
    elements.historyCount.textContent = `${count} ${count === 1 ? "scene" : "scenes"} logged`;
    elements.historyDescription.textContent = count === 0
      ? "Review the cards used in completed scenes."
      : `Review the cards used in ${count} completed ${count === 1 ? "scene" : "scenes"}.`;
    elements.historyMenuCount.textContent = String(count);
    elements.historyMenuCount.hidden = count === 0;
    elements.historyEmpty.hidden = count > 0;
    elements.historyList.hidden = count === 0;

    if (count === 0) {
      elements.historyList.replaceChildren();
      elements.historyEmptyCopy.textContent = state.scenesCompleted > 0
        ? "Scene logging starts with this version. Complete your next scene and its final cards will appear here."
        : "Complete a scene and its final two cards will appear here for your postmortem.";
      return;
    }

    const fragment = document.createDocumentFragment();
    entries.forEach((entry, index) => {
      const item = createHistoryEntry(entry, index === 0);
      if (item) {
        fragment.append(item);
      }
    });
    elements.historyList.replaceChildren(fragment);
  }

  function render() {
    if (activeView === "play" && !state.current) {
      activeView = "menu";
    }

    elements.screens.forEach((screen) => {
      screen.hidden = screen.dataset.screen !== activeView;
    });
    elements.appFooter.hidden = activeView === "title";

    const remaining = engine.remaining(state);
    const sceneNumber = state.scenesCompleted + 1;
    const hasCurrentScene = Boolean(state.current);
    const drawnCount = hasCurrentScene
      ? Number(state.current.stanceId !== null) + Number(state.current.driveId !== null)
      : 0;

    elements.sceneLabel.textContent = `Scene ${sceneNumber}`;
    elements.sceneSummary.textContent = hasCurrentScene && drawnCount > 0
      ? `Scene ${sceneNumber} in progress`
      : `Ready for scene ${sceneNumber}`;
    elements.stancesRemaining.textContent = remaining.stances;
    elements.drivesRemaining.textContent = remaining.drives;
    elements.startSessionLabel.textContent = hasCurrentScene ? "Resume prompt session" : "Start a prompt session";
    elements.startSessionDescription.textContent = hasCurrentScene
      ? drawnCount > 0
        ? "Return to this phone’s current private prompts."
        : "Choose draw categories, then reveal your private prompts."
      : "Use Random All or focus either card on one category.";

    if (hasCurrentScene) {
      renderPlayCard("stance");
      renderPlayCard("drive");
    }
    renderCompleteButton();
    renderHistory();
    renderGallery();
    elements.inviteBackLabel.textContent = inviteReturnView === "play" ? "Back to prompts" : "Main menu";
  }

  function startPromptSession() {
    if (!state.current) {
      engine.startScene(state);
      revealed.stance = false;
      revealed.drive = false;
      saveState();
      announce("Scene ready. Random All is selected for both cards unless you choose a category.");
      if (navigator.vibrate) {
        navigator.vibrate(16);
      }
    }

    setActiveView("play");
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
      if (navigator.vibrate) {
        navigator.vibrate(9);
      }
      return;
    }

    openCardOptions(type);
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
    applyCategoryStyle(
      elements.cardDialogPanel,
      elements.cardDialogCategory,
      elements.cardDialogCategoryLabel,
      elements.cardDialogCategoryIcon,
      card.category
    );
    elements.cardDialogTitle.textContent = card.title;
    elements.cardDialogInstruction.textContent = card.instruction;
    const filter = state.current[config.filterKey];
    const modeText = filter === ALL_FILTER ? "Random All" : filter;
    const explainer = elements.cardDialog.querySelector(".choice-explainer");
    explainer.textContent = `Keep this prompt for the scene, or return only this card to its deck and draw a concealed replacement using ${modeText}.`;
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
    if (navigator.vibrate) {
      navigator.vibrate(9);
    }
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
    const style = isAll
      ? { id: "general", label: "Random All", icon: "shuffle" }
      : categoryStyleFor(filter);
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
    if (isAll) {
      detail.textContent = `Any ${config.label} category`;
    } else {
      const categorySize = (type === "stance" ? cards.stances : cards.drives)
        .filter((card) => card.category === filter).length;
      detail.textContent = `${categorySize} ${config.label} cards`;
    }
    copy.append(title, detail);

    const check = document.createElement("span");
    check.className = "filter-option-check";
    check.setAttribute("aria-hidden", "true");
    check.textContent = "✓";

    option.append(iconWrap, copy, check);
    option.addEventListener("click", () => selectFilter(filter));
    return option;
  }

  function renderFilterOptions() {
    if (!selectedFilterType) {
      elements.filterOptions.replaceChildren();
      return;
    }

    const selectedFilter = currentFilter(selectedFilterType);
    const options = [ALL_FILTER, ...engine.categoriesFor(cards, selectedFilterType)];
    const fragment = document.createDocumentFragment();
    options.forEach((filter) => {
      fragment.append(createFilterOption(selectedFilterType, filter, selectedFilter));
    });
    elements.filterOptions.replaceChildren(fragment);
  }

  function openFilterDialog(type) {
    if (!state.current) {
      return;
    }
    const config = cardConfig(type);
    if (state.current[config.currentKey] !== null) {
      return;
    }

    selectedFilterType = type;
    elements.filterDialogPanel.dataset.cardType = type;
    elements.filterDialogType.textContent = `${config.label.toUpperCase()} DRAW`;
    elements.filterDialogTitle.textContent = `Choose a ${config.label} category.`;
    elements.filterDialogDescription.textContent = `Random All can draw from every ${config.label} category. A focused choice stays active for future scenes until you change it.`;
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
    engine.setDrawFilter(state, cards, type, filter);
    saveState();
    closeFilterDialog();
    renderPlayCard(type);
    const label = filter === ALL_FILTER ? "Random All" : filter;
    announce(`${label} selected for the ${config.label}.`);
    config.filterButton.focus({ preventScroll: true });
  }

  function completeScene() {
    if (!engine.completeScene(state)) {
      announce("Draw both cards before completing the scene.");
      return;
    }

    const completedScene = state.scenesCompleted;
    revealed.stance = false;
    revealed.drive = false;
    saveState();
    setActiveView("menu");
    announce(`Scene ${completedScene} saved to the Scene Log. Ready for scene ${state.scenesCompleted + 1}.`);
    if (navigator.vibrate) {
      navigator.vibrate(14);
    }
  }

  function selectGalleryDeck(type) {
    galleryDeck = type;
    galleryIndex = 0;
    renderGallery();
  }

  function moveGallery(amount) {
    const deck = galleryDeck === "stance" ? cards.stances : cards.drives;
    galleryIndex = (galleryIndex + amount + deck.length) % deck.length;
    renderGallery();
  }

  function randomGalleryCard() {
    const deck = galleryDeck === "stance" ? cards.stances : cards.drives;
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
    announce("Public game QR code opened. Your local deck is not included.");
  }

  function closeInvitePanel() {
    setShareFeedback("");
    setActiveView(inviteReturnView === "play" && state.current ? "play" : "menu");
  }

  function setShareFeedback(message, isError = false) {
    elements.shareFeedback.textContent = message;
    elements.shareFeedback.classList.toggle("is-error", isError);
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
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, textArea.value.length);
    const copied = document.execCommand("copy");
    textArea.remove();
    if (!copied) {
      throw new Error("Copy command was not accepted by this browser.");
    }
  }

  async function copyGameLink() {
    try {
      await copyText(GAME_URL);
      setShareFeedback("Public game link copied. No deck information was included.");
      announce("Public game link copied.");
      if (navigator.vibrate) {
        navigator.vibrate(8);
      }
    } catch (error) {
      console.warn("Could not copy the game link.", error);
      setShareFeedback("Copy was unavailable. Press and hold the displayed link to copy it.", true);
      announce("The game link could not be copied automatically.");
    }
  }

  async function shareGameLink() {
    if (typeof navigator.share !== "function") {
      await copyGameLink();
      return;
    }

    try {
      await navigator.share({
        title: "Imprompt — Prompts for Improv",
        text: GAME_SHARE_TEXT,
        url: GAME_URL
      });
      setShareFeedback("Public game link shared. Your local deck stayed private.");
      announce("Public game link shared.");
    } catch (error) {
      if (error && error.name === "AbortError") {
        return;
      }
      console.warn("The share sheet was unavailable; trying to copy the link instead.", error);
      await copyGameLink();
    }
  }

  function requestNewDeck() {
    closeCardOptions();
    closeFilterDialog();
    openDialog(elements.confirmDialog);
  }

  function replaceDeck() {
    state = engine.createState(cards);
    revealed.stance = false;
    revealed.drive = false;
    selectedCardType = null;
    selectedFilterType = null;
    inviteReturnView = "menu";
    saveState();
    closeDialog(elements.confirmDialog);
    setActiveView("menu");
    announce("A new independent deck and empty Scene Log were created on this phone.");
  }

  function closeOnBackdrop(event, dialog, closeFunction) {
    if (event.target === dialog) {
      closeFunction();
    }
  }

  function registerEvents() {
    elements.enterButton.addEventListener("click", () => setActiveView("menu"));
    elements.menuWordmark.addEventListener("click", (event) => {
      event.preventDefault();
      setActiveView("title");
    });
    elements.startSessionButton.addEventListener("click", startPromptSession);
    elements.historyButton.addEventListener("click", () => setActiveView("history"));
    elements.learnButton.addEventListener("click", () => setActiveView("learn"));
    elements.galleryButton.addEventListener("click", () => setActiveView("gallery"));
    elements.inviteButton.addEventListener("click", () => openInvitePanel("menu"));
    elements.playMenuButton.addEventListener("click", showMainMenu);
    elements.playInviteButton.addEventListener("click", () => openInvitePanel("play"));
    elements.historyBackButton.addEventListener("click", showMainMenu);
    elements.historyStartButton.addEventListener("click", startPromptSession);
    elements.learnBackButton.addEventListener("click", showMainMenu);
    elements.galleryBackButton.addEventListener("click", showMainMenu);
    elements.inviteBackButton.addEventListener("click", closeInvitePanel);

    elements.stanceCard.addEventListener("click", () => handleCardTap("stance"));
    elements.driveCard.addEventListener("click", () => handleCardTap("drive"));
    elements.stanceFilterButton.addEventListener("click", () => openFilterDialog("stance"));
    elements.driveFilterButton.addEventListener("click", () => openFilterDialog("drive"));
    elements.completeButton.addEventListener("click", completeScene);

    elements.closeCardDialogButton.addEventListener("click", closeCardOptions);
    elements.keepCardButton.addEventListener("click", keepSelectedCard);
    elements.vetoCardButton.addEventListener("click", vetoSelectedCard);
    elements.cardDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.cardDialog, closeCardOptions));
    elements.cardDialog.addEventListener("close", () => {
      selectedCardType = null;
    });

    elements.closeFilterDialogButton.addEventListener("click", closeFilterDialog);
    elements.filterDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.filterDialog, closeFilterDialog));
    elements.filterDialog.addEventListener("close", () => {
      selectedFilterType = null;
    });

    elements.showStancesButton.addEventListener("click", () => selectGalleryDeck("stance"));
    elements.showDrivesButton.addEventListener("click", () => selectGalleryDeck("drive"));
    elements.galleryPreviousButton.addEventListener("click", () => moveGallery(-1));
    elements.galleryNextButton.addEventListener("click", () => moveGallery(1));
    elements.galleryRandomButton.addEventListener("click", randomGalleryCard);

    elements.shareLinkButton.addEventListener("click", shareGameLink);
    elements.copyLinkButton.addEventListener("click", copyGameLink);

    elements.newDeckButton.addEventListener("click", requestNewDeck);
    elements.cancelNewDeckButton.addEventListener("click", () => closeDialog(elements.confirmDialog));
    elements.confirmNewDeckButton.addEventListener("click", replaceDeck);
    elements.confirmDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.confirmDialog, () => closeDialog(elements.confirmDialog)));

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
        .catch((error) => {
          console.warn("Offline support could not be enabled.", error);
        });
    });
  }

  registerEvents();
  registerServiceWorker();
  render();
})();
