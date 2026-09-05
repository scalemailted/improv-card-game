(function () {
  "use strict";

  const cards = window.TWO_SECRETS_CARDS;
  const engine = window.TwoSecretsEngine;
  const HASH_PATTERN = /^#deck=([A-Z2-9]{8})$/;
  const STORAGE_PREFIX = "two-secrets:v1:";
  const ACTIVE_DECK_KEY = "two-secrets:v1:active-deck";

  const elements = {
    scenePill: document.getElementById("scenePill"),
    screenTitle: document.getElementById("screenTitle"),
    screenMessage: document.getElementById("screenMessage"),
    stanceCard: document.getElementById("stanceCard"),
    driveCard: document.getElementById("driveCard"),
    stanceId: document.getElementById("stanceId"),
    stanceCategory: document.getElementById("stanceCategory"),
    stanceTitle: document.getElementById("stanceTitle"),
    stanceInstruction: document.getElementById("stanceInstruction"),
    driveId: document.getElementById("driveId"),
    driveCategory: document.getElementById("driveCategory"),
    driveTitle: document.getElementById("driveTitle"),
    driveInstruction: document.getElementById("driveInstruction"),
    privacyNote: document.getElementById("privacyNote"),
    drawButton: document.getElementById("drawButton"),
    activeActions: document.getElementById("activeActions"),
    completeButton: document.getElementById("completeButton"),
    hideButton: document.getElementById("hideButton"),
    vetoButton: document.getElementById("vetoButton"),
    stancesRemaining: document.getElementById("stancesRemaining"),
    drivesRemaining: document.getElementById("drivesRemaining"),
    deckProgress: document.getElementById("deckProgress"),
    liveStatus: document.getElementById("liveStatus"),
    openRulesButton: document.getElementById("openRulesButton"),
    closeRulesButton: document.getElementById("closeRulesButton"),
    rulesDialog: document.getElementById("rulesDialog"),
    deckIdLabel: document.getElementById("deckIdLabel"),
    newDeckButton: document.getElementById("newDeckButton"),
    newDeckModalButton: document.getElementById("newDeckModalButton"),
    confirmDialog: document.getElementById("confirmDialog"),
    cancelNewDeckButton: document.getElementById("cancelNewDeckButton"),
    confirmNewDeckButton: document.getElementById("confirmNewDeckButton"),
    installButton: document.getElementById("installButton")
  };

  let deckId = getOrCreateDeckId();
  let state = loadState(deckId);
  let visibility = { stance: false, drive: false };
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
      // A null-origin preview (for example, a local file) may reject replaceState.
      try {
        window.location.hash = nextHash;
      } catch (_ignored) {
        // The deck still functions in memory even when the URL cannot be updated.
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

  function setCardContent(type, card) {
    const prefix = type === "stance" ? "stance" : "drive";
    elements[`${prefix}Id`].textContent = card.id;
    elements[`${prefix}Category`].textContent = card.category;
    elements[`${prefix}Title`].textContent = card.title;
    elements[`${prefix}Instruction`].textContent = card.instruction;
  }

  function setCardVisual(type, card, isRevealed) {
    const button = type === "stance" ? elements.stanceCard : elements.driveCard;
    const label = type === "stance" ? "Stance" : "Drive";

    button.classList.remove("is-empty");
    button.disabled = false;
    button.classList.toggle("is-revealed", isRevealed);
    button.setAttribute("aria-pressed", String(isRevealed));
    button.setAttribute(
      "aria-label",
      isRevealed
        ? `${label} card revealed: ${card.title}. ${card.instruction}. Tap to hide.`
        : `${label} card face down. Tap to reveal privately.`
    );
  }

  function render() {
    const hasCurrent = Boolean(state.current);
    const sceneNumber = state.scenesCompleted + 1;
    const remaining = engine.remaining(state);
    const total = cards.stances.length;
    const used = Math.max(state.stancePosition, state.drivePosition);
    const progress = Math.min(100, (used / total) * 100);

    elements.scenePill.textContent = `Scene ${sceneNumber}`;
    elements.deckIdLabel.textContent = state.instanceId;
    elements.stancesRemaining.textContent = remaining.stances;
    elements.drivesRemaining.textContent = remaining.drives;
    elements.deckProgress.style.width = `${progress}%`;

    if (!hasCurrent) {
      elements.screenTitle.textContent = "Your secret scene foundation";
      elements.screenMessage.textContent = "Draw one Stance and one Drive. Your scene partner draws independently on their own phone.";
      elements.privacyNote.lastChild.textContent = " Your cards stay face-down until you tap them.";
      elements.drawButton.classList.remove("is-hidden");
      elements.activeActions.classList.add("is-hidden");
      resetCardToEmpty(elements.stanceCard, "Stance card. Draw cards to begin.");
      resetCardToEmpty(elements.driveCard, "Drive card. Draw cards to begin.");
      return;
    }

    const stance = engine.findCard(cards, "stance", state.current.stanceId);
    const drive = engine.findCard(cards, "drive", state.current.driveId);
    setCardContent("stance", stance);
    setCardContent("drive", drive);
    setCardVisual("stance", stance, visibility.stance);
    setCardVisual("drive", drive, visibility.drive);

    const revealedCount = Number(visibility.stance) + Number(visibility.drive);
    elements.screenTitle.textContent = revealedCount === 0 ? "Your cards are ready" : "Carry both secrets into the scene";
    elements.screenMessage.textContent = revealedCount === 0
      ? "Make sure only you can see the screen, then reveal each card."
      : "Use your Stance early. Let your Drive emerge through repeated choices.";
    elements.privacyNote.lastChild.textContent = revealedCount === 0
      ? " Tap a card when the screen is private."
      : " Tap a revealed card to hide it again.";
    elements.drawButton.classList.add("is-hidden");
    elements.activeActions.classList.remove("is-hidden");
    elements.hideButton.disabled = revealedCount === 0;
  }

  function resetCardToEmpty(button, label) {
    button.classList.add("is-empty");
    button.classList.remove("is-revealed");
    button.disabled = true;
    button.removeAttribute("aria-pressed");
    button.setAttribute("aria-label", label);
  }

  function drawCards() {
    engine.drawPair(state, cards);
    visibility = { stance: false, drive: false };
    saveState();
    render();
    announce("Two private cards drawn. Tap each card to reveal it.");
    if (navigator.vibrate) {
      navigator.vibrate(18);
    }
  }

  function toggleCard(type) {
    if (!state.current) {
      return;
    }
    visibility[type] = !visibility[type];
    render();
    const action = visibility[type] ? "revealed" : "hidden";
    announce(`${type === "stance" ? "Stance" : "Drive"} card ${action}.`);
    if (visibility[type] && navigator.vibrate) {
      navigator.vibrate(12);
    }
  }

  function hideBoth() {
    visibility = { stance: false, drive: false };
    render();
    announce("Both cards hidden.");
  }

  function completeScene() {
    const completed = engine.completeScene(state);
    if (!completed) {
      return;
    }
    visibility = { stance: false, drive: false };
    saveState();
    render();
    announce(`Scene complete. Ready for scene ${state.scenesCompleted + 1}.`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function vetoAndRedraw() {
    engine.vetoAndRedraw(state, cards);
    visibility = { stance: false, drive: false };
    saveState();
    render();
    announce("Prompt pair replaced. Two new private cards are ready.");
    if (navigator.vibrate) {
      navigator.vibrate([12, 40, 12]);
    }
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

  function requestNewDeck() {
    closeDialog(elements.rulesDialog);
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
    visibility = { stance: false, drive: false };
    saveState();
    closeDialog(elements.confirmDialog);
    render();
    announce("A new independent deck has been created on this browser.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function registerEvents() {
    elements.drawButton.addEventListener("click", drawCards);
    elements.stanceCard.addEventListener("click", () => toggleCard("stance"));
    elements.driveCard.addEventListener("click", () => toggleCard("drive"));
    elements.hideButton.addEventListener("click", hideBoth);
    elements.completeButton.addEventListener("click", completeScene);
    elements.vetoButton.addEventListener("click", vetoAndRedraw);

    elements.openRulesButton.addEventListener("click", () => openDialog(elements.rulesDialog));
    elements.closeRulesButton.addEventListener("click", () => closeDialog(elements.rulesDialog));
    elements.rulesDialog.addEventListener("click", (event) => {
      if (event.target === elements.rulesDialog) {
        closeDialog(elements.rulesDialog);
      }
    });

    elements.newDeckButton.addEventListener("click", requestNewDeck);
    elements.newDeckModalButton.addEventListener("click", requestNewDeck);
    elements.cancelNewDeckButton.addEventListener("click", () => closeDialog(elements.confirmDialog));
    elements.confirmNewDeckButton.addEventListener("click", replaceDeck);
    elements.confirmDialog.addEventListener("click", (event) => {
      if (event.target === elements.confirmDialog) {
        closeDialog(elements.confirmDialog);
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && (visibility.stance || visibility.drive)) {
        visibility = { stance: false, drive: false };
        render();
      }
    });

    window.addEventListener("hashchange", () => {
      const match = window.location.hash.toUpperCase().match(HASH_PATTERN);
      if (!match || match[1] === deckId) {
        return;
      }
      deckId = match[1];
      setActiveDeckId(deckId);
      state = loadState(deckId);
      visibility = { stance: false, drive: false };
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
