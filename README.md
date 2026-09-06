# Imprompt — Prompts for Improv

**Imprompt** is a mobile-first, fully client-side prompt deck for improv comedy. Each performer opens the game on their own phone and privately receives:

- **1 Stance** — the holder’s attitude, relationship lens, status, or way of interpreting the scene.
- **1 Drive** — the holder’s objective, secret, avoidance, or repeatable behavior.

The deck contains **24 Stance cards** and **24 Drive cards**. Every phone maintains its own independent shuffle, draw settings, current scene, and scene log. There is no multiplayer room, synchronized state, account, tracking, or backend.

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

## What is new in v0.6.0

### Scene Log

Completing a scene now saves that player’s final Stance and Drive in a private **Scene Log** available from the main menu.

Each entry records:

- The local scene number
- The final Stance and Drive used
- Both cards’ category labels, colors, and icons
- The completion time
- The number of redraws used before the final card, when applicable

Only completed scenes appear in the log. A vetoed card is returned to its deck and is not recorded as the scene’s played card. The log lives only in the same browser as the deck; it is never shared through the invite link.

Because every performer has an independent phone, each person’s log contains only **their own two hidden prompts**. During a group postmortem, performers can compare their logs to reconstruct the four-card collision that produced the scene.

Starting a new independent deck also starts a fresh scene count and clears that phone’s Scene Log after confirmation.

### Category-focused draws

Every undrawn Stance and Drive now has its own draw selector. The default is **Random All**, but a coach or player can focus either card on a specific category before drawing it.

Stance choices:

- Random All
- Status & Authority
- History & Relationship
- Emotional Assumptions
- Worldview & Absurdity

Drive choices:

- Random All
- Direct Objectives
- Secrets & Avoidance
- Repeatable Behaviors

The two selectors are independent. For example, one performer can draw an **Emotional Assumptions** Stance while leaving their Drive on **Random All**, while another performer uses a different combination on another phone.

A category choice remains active for later scenes until that player changes it. Vetoing a card draws its replacement using the same selected mode.

- Used exclusively, **Random All** avoids repeats until the full 24-card deck is exhausted.
- A **focused category** avoids repeats within that category until all its cards have appeared, then cycles that category while leaving the other categories available in the deck.

## Player flow

1. Open Imprompt on each performer’s phone.
2. Enter the app and choose **Start a prompt session**.
3. Leave each selector on **Random All**, or tap it to focus that Stance or Drive on one category.
4. Tap each generic card panel to draw and reveal its private prompt.
5. Tap a revealed card again to **Keep** it or **Veto & draw another**.
6. Play the scene without announcing or quoting the prompts.
7. Tap **Scene complete** to save the final two cards and advance the local scene count.
8. Open **Scene Log** from the main menu during the postmortem.

## Main menu

The main menu provides:

- **Start or resume a prompt session**
- **Scene Log**
- **Learn to play**
- **Card gallery**
- **Invite players**

The Scene Log option displays a count badge after the first scene is completed.

## Hidden-information design

Every prompt belongs only to the performer who drew it. A Stance tells the holder how to behave, interpret, react, or carry themself. It never requires another performer to respond in a prescribed way.

For example, a Stance may tell a player to:

> Carry yourself as the highest-status person present. Treat questions as requests for your approval.

It does not state that another performer respects that status. Their private prompt may produce the opposite interpretation, and that collision is part of the game.

## Category visual language

Each of the seven prompt categories has a consistent **color, written label, and SVG icon**. On revealed cards, the category is aligned to the far left of the top metadata row while **STANCE** or **DRIVE** remains aligned to the far right. The same visual language appears in the card gallery, Keep/Veto dialog, category selector, and Scene Log.

| Category | Visual cue | Applies to |
|---|---|---|
| Status & Authority | Indigo crown | Stance |
| History & Relationship | Teal link | Stance |
| Emotional Assumptions | Rose heart | Stance |
| Worldview & Absurdity | Violet sparkles | Stance |
| Direct Objectives | Blue target | Drive |
| Secrets & Avoidance | Gold lock | Drive |
| Repeatable Behaviors | Green repeat arrows | Drive |

Color is never the only signal: every category retains a readable name and unique icon. A neutral shuffle treatment identifies **Random All**.

## Independent deck behavior

Deck state is stored locally in the browser and is not written into the page URL. Opening or sharing the public address exposes no local deck identifier, cards, filters, scene count, or history.

A different phone receives its own shuffled deck automatically. **Start a new independent deck** replaces the following only on the device where the button is pressed:

- Current prompts
- Stance and Drive draw order
- Category draw selections
- Scene count
- Scene Log
- Veto totals and deck-cycle progress

A valid v0.5.2 deck is migrated to the v0.6.0 state structure. Earlier completed scene cards cannot be reconstructed because prior releases did not store them; Scene Log entries begin with the first scene completed after migration.

## Invite behavior

The **Invite players** option appears on the main menu and remains available during a prompt session. It shows the public QR code and offers native Share and Copy controls.

The invitation always points to:

```text
https://scalemailted.github.io/improv-card-game/
```

It never shares current prompts, scene progress, card order, category settings, local storage, or Scene Log entries.

## Progressive web app and release caching

Imprompt remains installable and available offline after a successful online visit. Release-specific query strings are used for JavaScript, CSS, icons, and the manifest so a new HTML document cannot accidentally load incompatible assets from an older release cache.

The service-worker URL remains stable as `sw.js`. New workers do not force activation with `skipWaiting()`, which allows an existing open session to finish before the browser adopts a new release.

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
├── RELEASE-NOTES-v0.6.0.md
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

## Editing cards and categories

All prompt copy and category metadata are in `cards.js`. Keep every card ID unique and preserve the `stances` and `drives` arrays. Stances should remain holder-centered: they may direct the player to treat, interpret, or respond to others in a particular way, but they should never dictate another performer’s behavior or reaction.

To add a category:

1. Assign its exact label to the relevant cards.
2. Add a matching entry to `categoryStyles` in `cards.js`.
3. Add a CSS color token for its `data-category` ID.
4. Add an SVG symbol for its icon in `index.html`.

The category selector is generated from the card data, so a properly configured category automatically appears under the correct Stance or Drive draw choices.

When changing card IDs, deck sizes, or persisted state structure, increment the state version in `deck-engine.js` and the release cache name in `sw.js`. Update the `?v=` asset query strings in `index.html` and `sw.js` together.

## Run tests

```bash
node tests/deck-engine.test.js
node tests/share-link.test.js
node tests/app-content.test.js
```

The tests verify:

- All 48 cards and category mappings
- Random All nonrepeating cycles when used exclusively
- Category-focused draws and category cycling
- Independent Stance and Drive filters
- Per-card Keep and Veto behavior
- Filter-respecting replacements
- Final-card Scene Log entries
- Incomplete-scene protection
- v0.5 state migration
- Canonical public sharing
- Release-specific asset URLs and service-worker cache behavior
- Main-menu, card-header, filter-dialog, gallery, and history markup contracts
