(function () {
  "use strict";

  const cards = window.TWO_SECRETS_CARDS;
  const engine = window.TwoSecretsEngine;
  const HASH_PATTERN = /^#deck=([A-Z2-9]{8})$/;
  const STORAGE_PREFIX = "two-secrets:v2:";
  const ACTIVE_DECK_KEY = "two-secrets:v2:active-deck";
  const GAME_URL = "https://scalemailted.github.io/improv-card-game/";
  const GAME_SHARE_TEXT = "Open the improv card game and draw your own independent Stance-and-Drive deck.";

  const elements = {
    menuScreen: document.getElementById("menuScreen"),
    cardsScreen: document.getElementById("cardsScreen"),
    sceneNumbers: Array.from(document.querySelectorAll(".scene-number")),
    menuMessage: document.getElementById("menuMessage"),
    menuButton: document.getElementById("menuButton"),
    drawButton: document.getElementById("drawButton"),
    drawButtonLabel: document.getElementById("drawButtonLabel"),
    stanceCard: document.getElementById("stanceCard"),
    driveCard: document.getElementById("driveCard"),
    stanceId: document.getElementById("stanceId"),
    stanceCategory: document.getElementById("stanceCategory"),
    stanceTitle: document.getElementById("stanceTitle"),
    stanceInstruction: document.getElementById("stanceInstruction"),
    stanceDecision: document.getElementById("stanceDecision"),
    driveId: document.getElementById("driveId"),
    driveCategory: document.getElementById("driveCategory"),
    driveTitle: document.getElementById("driveTitle"),
    driveInstruction: document.getElementById("driveInstruction"),
    driveDecision: document.getElementById("driveDecision"),
    completeButton: document.getElementById("completeButton"),
    stancesRemaining: document.getElementById("stancesRemaining"),
    drivesRemaining: document.getElementById("drivesRemaining"),
    deckProgress: document.getElementById("deckProgress"),
    liveStatus: document.getElementById("liveStatus"),
    cardDialog: document.getElementById("cardDialog"),
    cardDialogPanel: document.getElementById("cardDialogPanel"),
    cardDialogType: document.getElementById("cardDialogType"),
    cardDialogTitle: document.getElementById("cardDialogTitle"),
    cardDialogInstruction: document.getElementById("cardDialogInstruction"),
    closeCardDialogButton: document.getElementById("closeCardDialogButton"),
    keepCardButton: document.getElementById("keepCardButton"),
    vetoCardButton: document.getElementById("vetoCardButton"),
    openRulesButton: document.getElementById("openRulesButton"),
    closeRulesButton: document.getElementById("closeRulesButton"),
    rulesDialog: document.getElementById("rulesDialog"),
    deckIdLabel: document.getElementById("deckIdLabel"),
    newDeckButton: document.getElementById("newDeckButton"),
    newDeckModalButton: document.getElementById("newDeckModalButton"),
    confirmDialog: document.getElementById("confirmDialog"),
    cancelNewDeckButton: document.getElementById("cancelNewDeckButton"),
    confirmNewDeckButton: document.getElementById("confirmNewDeckButton"),
    installButton: document.getElementById("installButton"),
    openShareButton: document.getElementById("openShareButton"),
    shareDialog: document.getElementById("shareDialog"),
    closeShareButton: document.getElementById("closeShareButton"),
    shareQrLink: document.getElementById("shareQrLink"),
    shareUrlLink: document.getElementById("shareUrlLink"),
    shareLinkButton: document.getElementById("shareLinkButton"),
    copyLinkButton: document.getElementById("copyLinkButton"),
    shareFeedback: document.getElementById("shareFeedback")
  };

  let deckId = getOrCreateDeckId();
  let state = loadState(deckId);
  let activeView = state.current ? "cards" : "menu";
  let selectedCardType = null;
  let deferredInstallPrompt = null;

  function getOrCreateDeckId() {
    const match = window.location.hash.toUpperCase().match(HASH_PATTERN);
    if (match) {
      setActiveDeckId(match[1]);
      return match[1];
    }

    const savedId = getActiveDeckId();
    if (savedId) {
      setDeckHash(savedId);
      return savedId;
    }

    const newId = engine.createDeckId();
    setActiveDeckId(newId);
    setDeckHash(newId);
    return newId;
  }

  function getActiveDeckId() {
    try {
      const id = window.localStorage.getItem(ACTIVE_DECK_KEY);
      return id && /^[A-Z2-9]{8}$/.test(id) ? id : null;
    } catch (_error) {
      return null;
    }
  }

  function setActiveDeckId(id) {
    try {
      window.localStorage.setItem(ACTIVE_DECK_KEY, id);
    } catch (_error) {
      // A private or null-origin browser can still use the in-memory deck.
    }
  }

  function setDeckHash(id) {
    const nextHash = `#deck=${id}`;
    const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
    try {
      window.history.replaceState(null, "", nextUrl);
    } catch (_error) {
      try {
        window.location.hash = nextHash;
      } catch (_ignored) {
        // The deck still functions in memory even when the URL cannot update.
      }
    }
  }

  function storageKey(id) {
    return `${STORAGE_PREFIX}${id}`;
  }

  function loadState(id) {
    try {
      const raw = window.localStorage.getItem(storageKey(id));
      const parsed = raw ? JSON.parse(raw) : null;
      if (engine.isStateUsable(parsed, cards, id)) {
        return parsed;
      }
    } catch (error) {
      console.warn("Could not read the saved deck; starting a fresh local deck.", error);
    }

    const fresh = engine.createState(cards, id);
    saveState(fresh);
    return fresh;
  }

  function saveState(nextState = state) {
    try {
      window.localStorage.setItem(storageKey(nextState.instanceId), JSON.stringify(nextState));
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

  function cardConfig(type) {
    const isStance = type === "stance";
    return {
      label: isStance ? "Stance" : "Drive",
      button: isStance ? elements.stanceCard : elements.driveCard,
      id: isStance ? elements.stanceId : elements.driveId,
      category: isStance ? elements.stanceCategory : elements.driveCategory,
      title: isStance ? elements.stanceTitle : elements.driveTitle,
      instruction: isStance ? elements.stanceInstruction : elements.driveInstruction,
      decision: isStance ? elements.stanceDecision : elements.driveDecision,
      currentKey: isStance ? "stanceId" : "driveId",
      keptKey: isStance ? "stanceKept" : "driveKept"
    };
  }

  function replaceDecisionContent(element, kept) {
    const icon = document.createElement("span");
    icon.className = "decision-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = kept ? "✓" : "⋯";
    element.replaceChildren(icon, document.createTextNode(kept ? " Kept · tap for options" : " Tap for options"));
  }

  function renderCard(type) {
    if (!state.current) {
      return;
    }

    const config = cardConfig(type);
    const card = engine.findCard(cards, type, state.current[config.currentKey]);
    const kept = state.current[config.keptKey];

    config.id.textContent = card.id;
    config.category.textContent = card.category;
    config.title.textContent = card.title;
    config.instruction.textContent = card.instruction;
    config.button.classList.toggle("is-kept", kept);
    replaceDecisionContent(config.decision, kept);
    config.button.setAttribute(
      "aria-label",
      `${config.label} card: ${card.title}. ${card.instruction}. ${kept ? "Kept." : "Not yet marked as kept."} Tap for keep or veto options.`
    );
  }

  function render() {
    if (activeView === "cards" && !state.current) {
      activeView = "menu";
    }

    const sceneNumber = state.scenesCompleted + 1;
    const remaining = engine.remaining(state);
    const totalPerDeck = cards.stances.length;
    const stanceUsed = totalPerDeck - remaining.stances;
    const driveUsed = cards.drives.length - remaining.drives;
    const progress = Math.min(100, (Math.max(stanceUsed, driveUsed) / totalPerDeck) * 100);

    elements.sceneNumbers.forEach((element) => {
      element.textContent = `Scene ${sceneNumber}`;
    });
    elements.deckIdLabel.textContent = state.instanceId;
    elements.stancesRemaining.textContent = remaining.stances;
    elements.drivesRemaining.textContent = remaining.drives;
    elements.deckProgress.style.width = `${progress}%`;

    const showingCards = activeView === "cards";
    elements.menuScreen.hidden = showingCards;
    elements.cardsScreen.hidden = !showingCards;
    elements.menuButton.hidden = !showingCards;

    if (state.current) {
      renderCard("stance");
      renderCard("drive");
      elements.drawButtonLabel.textContent = "Return to my cards";
      elements.menuMessage.textContent = `Scene ${sceneNumber} is in progress on this phone. Your current cards are saved locally.`;
    } else {
      elements.drawButtonLabel.textContent = "Draw my cards";
      elements.menuMessage.textContent = "Each player uses their own phone. Draw one private Stance and one private Drive for the scene.";
    }
  }

  function drawOrResumeCards() {
    if (!state.current) {
      engine.drawPair(state, cards);
      saveState();
      announce("One Stance and one Drive drawn.");
      if (navigator.vibrate) {
        navigator.vibrate(18);
      }
    }

    activeView = "cards";
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showMainMenu() {
    activeView = "menu";
    render();
    announce("Main menu opened. Your current cards remain saved.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openDialog(dialog) {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function closeDialog(dialog) {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }


  function setShareFeedback(message, isError = false) {
    elements.shareFeedback.textContent = message;
    elements.shareFeedback.classList.toggle("is-error", isError);
  }

  function openSharePanel() {
    // Always share the canonical public game URL. Never use location.href,
    // because the current page contains a browser-local #deck identifier.
    elements.shareQrLink.href = GAME_URL;
    elements.shareUrlLink.href = GAME_URL;
    elements.shareUrlLink.textContent = GAME_URL;
    setShareFeedback("");
    openDialog(elements.shareDialog);
    announce("Game invitation QR code opened. Your private deck is not included.");
  }

  function closeSharePanel() {
    closeDialog(elements.shareDialog);
    setShareFeedback("");
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
        navigator.vibrate(10);
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
        title: "Two Secrets — Improv Card Game",
        text: GAME_SHARE_TEXT,
        url: GAME_URL
      });
      setShareFeedback("Public game link shared. Your local deck stayed private.");
      announce("Public game link shared.");
    } catch (error) {
      if (error && error.name === "AbortError") {
        return;
      }
      console.warn("The system share sheet was unavailable; trying to copy the link instead.", error);
      await copyGameLink();
    }
  }

  function openCardOptions(type) {
    if (!state.current) {
      return;
    }

    selectedCardType = type;
    const config = cardConfig(type);
    const card = engine.findCard(cards, type, state.current[config.currentKey]);
    const kept = state.current[config.keptKey];

    elements.cardDialogPanel.dataset.cardType = type;
    elements.cardDialogType.textContent = `${config.label.toUpperCase()} · ${card.id}`;
    elements.cardDialogTitle.textContent = card.title;
    elements.cardDialogInstruction.textContent = card.instruction;
    elements.keepCardButton.querySelector("span:last-child").textContent = kept ? "Keep this card" : "Keep this card";
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
    render();
    closeCardOptions();
    announce(`${type === "stance" ? "Stance" : "Drive"} kept for this scene.`);
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    cardConfig(type).button.focus({ preventScroll: true });
  }

  function flashReplacement(type) {
    const button = cardConfig(type).button;
    button.classList.remove("is-replaced");
    // Force a reflow so repeated vetoes replay the replacement animation.
    void button.offsetWidth;
    button.classList.add("is-replaced");
    window.setTimeout(() => button.classList.remove("is-replaced"), 520);
  }

  function vetoSelectedCard() {
    if (!selectedCardType || !state.current) {
      return;
    }

    const type = selectedCardType;
    const result = engine.vetoCard(state, cards, type);
    const replacement = engine.findCard(cards, type, result.replacementId);
    saveState();
    render();
    closeCardOptions();
    flashReplacement(type);
    announce(`${type === "stance" ? "Stance" : "Drive"} replaced with ${replacement.title}. The vetoed card returned to its deck.`);
    if (navigator.vibrate) {
      navigator.vibrate([12, 36, 12]);
    }
    cardConfig(type).button.focus({ preventScroll: true });
  }

  function completeScene() {
    if (!engine.completeScene(state)) {
      return;
    }
    saveState();
    activeView = "menu";
    render();
    announce(`Scene complete. Ready for scene ${state.scenesCompleted + 1}.`);
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function requestNewDeck() {
    closeDialog(elements.rulesDialog);
    closeDialog(elements.cardDialog);
    closeDialog(elements.shareDialog);
    selectedCardType = null;
    openDialog(elements.confirmDialog);
  }

  function replaceDeck() {
    const previousKey = storageKey(deckId);
    try {
      window.localStorage.removeItem(previousKey);
    } catch (_error) {
      // The new in-memory deck can still be created.
    }

    deckId = engine.createDeckId();
    setActiveDeckId(deckId);
    setDeckHash(deckId);
    state = engine.createState(cards, deckId);
    activeView = "menu";
    selectedCardType = null;
    saveState();
    closeDialog(elements.confirmDialog);
    render();
    announce("A new independent deck has been created on this browser.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeOnBackdrop(event, dialog) {
    if (event.target === dialog) {
      closeDialog(dialog);
    }
  }

  function registerEvents() {
    elements.drawButton.addEventListener("click", drawOrResumeCards);
    elements.menuButton.addEventListener("click", showMainMenu);
    elements.stanceCard.addEventListener("click", () => openCardOptions("stance"));
    elements.driveCard.addEventListener("click", () => openCardOptions("drive"));
    elements.completeButton.addEventListener("click", completeScene);

    elements.closeCardDialogButton.addEventListener("click", closeCardOptions);
    elements.keepCardButton.addEventListener("click", keepSelectedCard);
    elements.vetoCardButton.addEventListener("click", vetoSelectedCard);
    elements.cardDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.cardDialog));
    elements.cardDialog.addEventListener("close", () => {
      selectedCardType = null;
    });

    elements.openShareButton.addEventListener("click", openSharePanel);
    elements.closeShareButton.addEventListener("click", closeSharePanel);
    elements.shareLinkButton.addEventListener("click", shareGameLink);
    elements.copyLinkButton.addEventListener("click", copyGameLink);
    elements.shareDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.shareDialog));

    elements.openRulesButton.addEventListener("click", () => openDialog(elements.rulesDialog));
    elements.closeRulesButton.addEventListener("click", () => closeDialog(elements.rulesDialog));
    elements.rulesDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.rulesDialog));

    elements.newDeckButton.addEventListener("click", requestNewDeck);
    elements.newDeckModalButton.addEventListener("click", requestNewDeck);
    elements.cancelNewDeckButton.addEventListener("click", () => closeDialog(elements.confirmDialog));
    elements.confirmNewDeckButton.addEventListener("click", replaceDeck);
    elements.confirmDialog.addEventListener("click", (event) => closeOnBackdrop(event, elements.confirmDialog));

    window.addEventListener("hashchange", () => {
      const match = window.location.hash.toUpperCase().match(HASH_PATTERN);
      if (!match || match[1] === deckId) {
        return;
      }
      deckId = match[1];
      setActiveDeckId(deckId);
      state = loadState(deckId);
      activeView = state.current ? "cards" : "menu";
      selectedCardType = null;
      render();
      announce("Local deck changed.");
    });

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
