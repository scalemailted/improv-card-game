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
    learnScreen: document.getElementById("learnScreen"),
    galleryScreen: document.getElementById("galleryScreen"),
    inviteScreen: document.getElementById("inviteScreen"),
    appFooter: document.getElementById("appFooter"),
    enterButton: document.getElementById("enterButton"),
    menuWordmark: document.getElementById("menuWordmark"),
    startSessionButton: document.getElementById("startSessionButton"),
    startSessionLabel: document.getElementById("startSessionLabel"),
    startSessionDescription: document.getElementById("startSessionDescription"),
    learnButton: document.getElementById("learnButton"),
    galleryButton: document.getElementById("galleryButton"),
    inviteButton: document.getElementById("inviteButton"),
    playMenuButton: document.getElementById("playMenuButton"),
    playInviteButton: document.getElementById("playInviteButton"),
    learnBackButton: document.getElementById("learnBackButton"),
    galleryBackButton: document.getElementById("galleryBackButton"),
    inviteBackButton: document.getElementById("inviteBackButton"),
    inviteBackLabel: document.getElementById("inviteBackLabel"),
    sceneSummary: document.getElementById("sceneSummary"),
    sceneLabel: document.getElementById("sceneLabel"),
    stancesRemaining: document.getElementById("stancesRemaining"),
    drivesRemaining: document.getElementById("drivesRemaining"),
    stanceCard: document.getElementById("stanceCard"),
    driveCard: document.getElementById("driveCard"),
    stanceRole: document.getElementById("stanceRole"),
    driveRole: document.getElementById("driveRole"),
    stanceTitle: document.getElementById("stanceTitle"),
    driveTitle: document.getElementById("driveTitle"),
    stanceInstruction: document.getElementById("stanceInstruction"),
    driveInstruction: document.getElementById("driveInstruction"),
    stanceAction: document.getElementById("stanceAction"),
    driveAction: document.getElementById("driveAction"),
    stanceKeptBadge: document.getElementById("stanceKeptBadge"),
    driveKeptBadge: document.getElementById("driveKeptBadge"),
    completeButton: document.getElementById("completeButton"),
    showStancesButton: document.getElementById("showStancesButton"),
    showDrivesButton: document.getElementById("showDrivesButton"),
    galleryCard: document.getElementById("galleryCard"),
    galleryType: document.getElementById("galleryType"),
    galleryCount: document.getElementById("galleryCount"),
    galleryCategory: document.getElementById("galleryCategory"),
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
    cardDialogTitle: document.getElementById("cardDialogTitle"),
    cardDialogInstruction: document.getElementById("cardDialogInstruction"),
    closeCardDialogButton: document.getElementById("closeCardDialogButton"),
    keepCardButton: document.getElementById("keepCardButton"),
    vetoCardButton: document.getElementById("vetoCardButton"),
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
    announce("Main menu opened. Your current prompt pair remains saved on this phone.");
  }

  function cardConfig(type) {
    const isStance = type === "stance";
    return {
      label: isStance ? "Stance" : "Drive",
      button: isStance ? elements.stanceCard : elements.driveCard,
      role: isStance ? elements.stanceRole : elements.driveRole,
      title: isStance ? elements.stanceTitle : elements.driveTitle,
      instruction: isStance ? elements.stanceInstruction : elements.driveInstruction,
      action: isStance ? elements.stanceAction : elements.driveAction,
      keptBadge: isStance ? elements.stanceKeptBadge : elements.driveKeptBadge,
      currentKey: isStance ? "stanceId" : "driveId",
      keptKey: isStance ? "stanceKept" : "driveKept"
    };
  }

  function setCardAction(element, text, iconText) {
    const icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = iconText;
    element.replaceChildren(icon, document.createTextNode(` ${text}`));
  }

  function renderPlayCard(type) {
    if (!state.current) {
      return;
    }

    const config = cardConfig(type);
    const card = engine.findCard(cards, type, state.current[config.currentKey]);
    const isRevealed = revealed[type];
    const isKept = state.current[config.keptKey];

    config.button.classList.toggle("is-concealed", !isRevealed);
    config.button.classList.toggle("is-revealed", isRevealed);
    config.button.classList.toggle("is-kept", isRevealed && isKept);
    config.keptBadge.hidden = !(isRevealed && isKept);

    if (!isRevealed) {
      const copy = hiddenCopy[type];
      config.role.textContent = copy.role;
      config.title.textContent = copy.title;
      config.instruction.textContent = copy.instruction;
      setCardAction(config.action, "Tap to reveal", "✦");
      config.button.setAttribute("aria-label", `Face-down ${config.label} card. Tap to reveal your private prompt.`);
      return;
    }

    config.role.textContent = type === "stance" ? "YOUR PRIVATE STANCE" : "YOUR PRIVATE DRIVE";
    config.title.textContent = card.title;
    config.instruction.textContent = card.instruction;
    setCardAction(config.action, isKept ? "Kept · tap for options" : "Tap again to keep or veto", isKept ? "✓" : "⋯");
    config.button.setAttribute(
      "aria-label",
      `${config.label}: ${card.title}. ${card.instruction}. ${isKept ? "Kept. " : ""}Tap again for card options.`
    );
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
    elements.galleryCategory.textContent = card.category;
    elements.galleryTitle.textContent = card.title;
    elements.galleryInstruction.textContent = card.instruction;
    elements.galleryId.textContent = card.id;
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
    const hasCurrentPair = Boolean(state.current);

    elements.sceneLabel.textContent = `Scene ${sceneNumber}`;
    elements.sceneSummary.textContent = hasCurrentPair ? `Scene ${sceneNumber} in progress` : `Ready for scene ${sceneNumber}`;
    elements.stancesRemaining.textContent = remaining.stances;
    elements.drivesRemaining.textContent = remaining.drives;
    elements.startSessionLabel.textContent = hasCurrentPair ? "Resume prompt session" : "Start a prompt session";
    elements.startSessionDescription.textContent = hasCurrentPair
      ? "Return to this phone’s current private prompt pair."
      : "Draw one private Stance and one private Drive.";

    if (hasCurrentPair) {
      renderPlayCard("stance");
      renderPlayCard("drive");
    }

    renderGallery();
    elements.inviteBackLabel.textContent = inviteReturnView === "play" ? "Back to prompts" : "Main menu";
  }

  function startPromptSession() {
    if (!state.current) {
      engine.drawPair(state, cards);
      revealed.stance = false;
      revealed.drive = false;
      saveState();
      announce("A hidden Stance and Drive were drawn. Tap each panel to reveal it.");
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

    if (!revealed[type]) {
      revealed[type] = true;
      renderPlayCard(type);
      announce(`${type === "stance" ? "Stance" : "Drive"} revealed.`);
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
    elements.cardDialogPanel.dataset.cardType = type;
    elements.cardDialogType.textContent = `${config.label.toUpperCase()} OPTIONS`;
    elements.cardDialogTitle.textContent = card.title;
    elements.cardDialogInstruction.textContent = card.instruction;
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
    engine.vetoCard(state, cards, type);
    revealed[type] = false;
    saveState();
    closeCardOptions();
    renderPlayCard(type);
    announce(`A replacement ${type === "stance" ? "Stance" : "Drive"} was drawn. Tap the panel to reveal it.`);
    if (navigator.vibrate) {
      navigator.vibrate([10, 30, 10]);
    }
    cardConfig(type).button.focus({ preventScroll: true });
  }

  function completeScene() {
    if (!engine.completeScene(state)) {
      return;
    }

    revealed.stance = false;
    revealed.drive = false;
    saveState();
    setActiveView("menu");
    announce(`Scene complete. Ready for scene ${state.scenesCompleted + 1}.`);
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
    openDialog(elements.confirmDialog);
  }

  function replaceDeck() {
    state = engine.createState(cards);
    revealed.stance = false;
    revealed.drive = false;
    selectedCardType = null;
    inviteReturnView = "menu";
    saveState();
    closeDialog(elements.confirmDialog);
    setActiveView("menu");
    announce("A new independent deck was created on this phone.");
  }

  function closeOnBackdrop(event, dialog) {
    if (event.target === dialog) {
      closeDialog(dialog);
    }
  }

  function registerEvents() {
    elements.enterButton.addEventListener("click", () => setActiveView("menu"));
    elements.menuWordmark.addEventListener("click", (event) => {
      event.preventDefault();
      setActiveView("title");
    });
    elements.startSessionButton.addEventListener("click", startPromptSession);
    elements.learnButton.addEventListener("click", () => setActiveView("learn"));
    elements.galleryButton.addEventListener("click", () => setActiveView("gallery"));
    elements.inviteButton.addEventListener("click", () => openInvitePanel("menu"));
    elements.playMenuButton.addEventListener("click", showMainMenu);
    elements.playInviteButton.addEventListener("click", () => openInvitePanel("play"));
    elements.learnBackButton.addEventListener("click", showMainMenu);
    elements.galleryBackButton.addEventListener("click", showMainMenu);
    elements.inviteBackButton.addEventListener("click", closeInvitePanel);

    elements.stanceCard.addEventListener("click", () => handleCardTap("stance"));
    elements.driveCard.addEventListener("click", () => handleCardTap("drive"));
    elements.completeButton.addEventListener("click", completeScene);

    elements.closeCardDialogButton.addEventListener("click", closeCardOptions);
    elements.keepCardButton.addEventListener("click", keepSelectedCard);
    elements.vetoCardButton.addEventListener("click", vetoSelectedCard);
    elements.cardDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.cardDialog));
    elements.cardDialog.addEventListener("close", () => {
      selectedCardType = null;
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
    elements.confirmDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.confirmDialog));

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
      navigator.serviceWorker.register("./sw.js").catch((error) => {
        console.warn("Offline support could not be enabled.", error);
      });
    });
  }

  registerEvents();
  registerServiceWorker();
  render();
})();
