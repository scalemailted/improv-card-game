# Imprompt — Prompts for Improv

**Imprompt** is a mobile-first, fully client-side prompt deck for improv comedy. Each performer opens the game on their own phone and privately receives:

- **1 Stance** — the holder’s attitude, relationship lens, status, or way of interpreting the scene.
- **1 Drive** — the holder’s objective, secret, avoidance, or repeatable behavior.

The prototype contains **24 Stance cards** and **24 Drive cards**. Every phone maintains its own independent shuffle; there is no multiplayer room, synchronized state, account, tracking, or backend.

## Open the live game on a phone

<p align="center">
  <a href="https://scalemailted.github.io/improv-card-game/">
    <img src="./assets/improv-card-game-qr.png" width="300" alt="QR code linking to Imprompt">
  </a>
</p>

<p align="center">
  Scan the code or tap it to open:<br>
  <a href="https://scalemailted.github.io/improv-card-game/">https://scalemailted.github.io/improv-card-game/</a>
</p>

## Player flow

1. The app opens on an **Imprompt title screen** rather than immediately entering the deck.
2. The main menu offers:
   - **Start a prompt session**
   - **Learn to play**
   - **Card gallery**
   - **Invite players**
3. Starting a session privately draws one Stance and one Drive.
4. The play screen initially shows two generic face-down panels explaining what a Stance and Drive do.
5. The first tap on a panel reveals its private prompt.
6. A second tap opens that card’s individual **Keep** or **Veto** choices.
7. Vetoing replaces only the selected card. The rejected card returns to a randomized future position in its own deck, and the replacement starts face-down.
8. **Scene complete** advances the local scene count and returns to the main menu.

## Hidden-information design

Every prompt belongs only to the performer who drew it. The revised Stance deck tells the holder how to behave, interpret, react, or carry themself. It never requires another performer to respond in a prescribed way.

For example, a Stance may tell a player to:

> Carry yourself as the highest-status person present. Treat questions as requests for your approval.

It does not state that the other performer respects that status. Their private prompt may produce the opposite interpretation, and that collision is part of the game.

## Category visual language

Version 0.5 gives each of the seven prompt categories a consistent **color, label, and SVG icon**. The category treatment appears only after a private card is revealed, so a face-down card does not leak information. The same visual system is used in the prompt session, card gallery, and Keep/Veto dialog.

| Category | Visual cue | Applies to |
|---|---|---|
| Status & Authority | Indigo crown | Stance |
| History & Relationship | Teal link | Stance |
| Emotional Assumptions | Rose heart | Stance |
| Worldview & Absurdity | Violet sparkles | Stance |
| Direct Objectives | Blue target | Drive |
| Secrets & Avoidance | Gold lock | Drive |
| Repeatable Behaviors | Green repeat arrows | Drive |

Color is never the only signal: every chip also retains a written label and unique icon. A neutral fallback style is included for future categories that have not yet received their own visual treatment.

## Main features

- Branded **Imprompt** launch screen and menu flow.
- Independent browser-local deck on every phone.
- Private reveal-on-tap Stance and Drive panels.
- Category-specific color-and-icon chips on revealed cards, gallery cards, and card options.
- Per-card Keep and Veto controls.
- Vetoed cards return to their own decks.
- No repeated normal draw until the applicable 24-card cycle is exhausted.
- In-progress prompt pair restored after a reload.
- Card gallery with Stance/Drive switching, previous/next controls, and random browsing.
- Learn-to-play screen explaining the hidden-information rules.
- Public invite QR code, native share sheet, and copy-link control.
- The invite always uses the fixed public URL and never transmits local deck state.
- Installable progressive web app with offline support after the first successful visit.
- Migration of a valid local deck from the previous prototype storage format.

## Independent deck behavior

Deck state is stored under a single browser-local key. It is no longer written into the page URL. Opening or sharing the public address therefore exposes no local deck identifier.

A different phone receives its own shuffled deck automatically. **Start a new independent deck** replaces the current shuffle, prompt pair, scene count, and unused-card order only on the device where the button is pressed.

## Invite behavior

The **Invite players** option appears on the main menu and remains available during a prompt session. It shows the same public QR code used in this README and offers native Share and Copy controls.

The invitation always points to:

```text
https://scalemailted.github.io/improv-card-game/
```

It never shares current prompts, scene progress, card order, local storage, or a specific deck.

## Run locally

The service worker and manifest require HTTP rather than `file://`.

### Python

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

### VS Code

Open the folder and serve it with a static-server extension such as Live Server.

## Publish with GitHub Pages

This package is ready for:

```text
https://scalemailted.github.io/improv-card-game/
```

1. Place the contents of this folder at the root of the `improv-card-game` repository.
2. Commit and push the files to the `main` branch.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and the root (`/`) folder.
6. Save and wait for the Pages deployment to complete.

All application assets use relative paths, so they work under the GitHub Pages project path.

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
    ├── app-content.test.js
    ├── deck-engine.test.js
    └── share-link.test.js
```

## Editing cards

All prompt copy and the category-to-icon mapping are in `cards.js`. Keep every card ID unique and preserve the `stances` and `drives` arrays. Stances should remain holder-centered: they may direct the player to treat, interpret, or respond to others in a particular way, but they should never dictate another performer’s behavior or reaction.

To add a category, add its label to the relevant cards and define a matching entry in `categoryStyles`. Add a CSS color token for its `data-category` ID and an SVG symbol for its icon. Categories without a configured style automatically use the neutral fallback chip.

When changing card IDs, deck sizes, or persisted state structure, update the state version in `deck-engine.js`, the storage key in `app.js`, and the cache name in `sw.js`.

## Run tests

```bash
node tests/deck-engine.test.js
node tests/share-link.test.js
node tests/app-content.test.js
```

The tests verify card counts and IDs, normal nonrepeating draws, reshuffling, individual veto behavior, legacy-state migration, canonical public sharing, title/menu structure, generic reveal panels, all seven category mappings, icon hooks, rebranding, and removal of the old play-screen clutter.
