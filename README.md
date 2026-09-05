# Two Secrets — Improv Card Game

A mobile-first, fully client-side prompt deck for two-person improv scenes. Each player opens the game on their own phone and privately draws:

- **1 Stance** — how the character sees themself, the other person, or the situation.
- **1 Drive** — what the character wants, hides, or repeatedly does.

The prototype contains all **24 Stance cards** and **24 Drive cards** from deck version 0.2.

## Open the live game on a phone

<p align="center">
  <a href="https://scalemailted.github.io/improv-card-game/">
    <img src="./assets/improv-card-game-qr.png" width="300" alt="QR code linking to the Two Secrets improv card game">
  </a>
</p>

<p align="center">
  Scan the code or tap it to open:<br>
  <a href="https://scalemailted.github.io/improv-card-game/">https://scalemailted.github.io/improv-card-game/</a>
</p>

## How this version works

1. Each improver opens the site on their own phone.
2. From the main menu, each player taps **Draw my cards**.
3. One Stance and one Drive appear immediately on that private screen.
4. Tapping either card opens its individual options:
   - **Keep this card** marks it as accepted for the scene.
   - **Veto & draw another** replaces only that card.
5. A vetoed card is returned to a random future position in its own deck. The other card does not change.
6. When the scene ends, tap **Scene complete** to return to the main menu and prepare the next draw.

There is no reveal/hide toggle because each player is already managing a private deck on their own phone.

## What the prototype does

- Gives every browser its own independently shuffled Stance and Drive decks.
- Draws one unused Stance and one unused Drive for each scene.
- Displays both cards immediately after the main-menu draw.
- Supports per-card keep and veto decisions.
- Returns a vetoed card to its deck instead of permanently consuming it.
- Preserves the other card whenever one card is vetoed.
- Avoids repeating accepted cards until a deck cycle is exhausted, then reshuffles automatically.
- Stores deck progress locally in the browser—there is no account, room, shared state, tracking, or backend.
- Restores an in-progress scene after a reload.
- Works offline after the first successful visit through its service worker.
- Can be installed to a phone's home screen when the browser supports web-app installation.

## Run locally

The service worker and manifest require HTTP rather than `file://`. Serve the folder with a small local web server.

### Python

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

### VS Code

Open the folder and use a static-server extension such as Live Server.

## Publish with GitHub Pages

This package is ready for the project URL:

```text
https://scalemailted.github.io/improv-card-game/
```

To publish or update it:

1. Put the files from this folder at the root of the `improv-card-game` repository. `index.html` must remain at the repository root.
2. Commit and push the files to the `main` branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the root (`/`) folder, then save.
6. Wait for the Pages deployment to finish, then open the live URL above.

All application asset links are relative, so the site works correctly at the GitHub Pages project path.

## Independent deck behavior

The URL receives a local fragment such as:

```text
#deck=7QF4K9TA
```

The fragment identifies a saved shuffle **inside that browser only**. It is not a multiplayer room code and sends nothing across the network. The browser remembers the active deck, so reopening the base site or launching an installed copy returns to the same local progress.

Different phones have separate browser storage and therefore independent shuffles. Selecting **New independent deck** replaces the current shuffle, scene count, and unused-card order only on that browser.

## Veto behavior

Each deck is maintained separately. When a player vetoes a Stance:

- The current Drive stays unchanged.
- A different Stance is drawn from the unused Stance queue.
- The rejected Stance is inserted back at a random future position in that queue.

The same logic applies independently to Drive cards. If a player vetoes the final unused card in a deck cycle, the app starts a new cycle without that rejected card, draws a different replacement, and then returns the rejected card to the new queue.

## File structure

```text
.
├── index.html
├── styles.css
├── cards.js
├── deck-engine.js
├── app.js
├── manifest.webmanifest
├── sw.js
├── .nojekyll
├── assets/
│   └── improv-card-game-qr.png
├── icons/
│   ├── icon.svg
│   ├── icon-192.png
│   └── icon-512.png
└── tests/
    └── deck-engine.test.js
```

## Editing cards

All card copy is in `cards.js`. Keep every ID unique and preserve the `stances` and `drives` arrays. If card IDs or deck sizes change after publishing, increment the state version in `deck-engine.js`, the storage prefix in `app.js`, and the cache name in `sw.js`.

## Test the deck engine

```bash
node tests/deck-engine.test.js
```

The test checks:

- All 24 Stances and 24 Drives are present with unique IDs.
- Normal draws do not repeat within a deck cycle.
- Decks reshuffle after exhaustion.
- Keeping one card does not affect the other.
- Vetoing replaces only the selected card.
- A vetoed card returns to its own deck.
- A veto preserves the number of cards remaining.
- The final-card veto edge case still produces a different replacement.
- Invalid saved state is rejected safely.
