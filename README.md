# Imprompt — Prompts for Improv

**Imprompt** is a mobile-first, fully client-side prompt deck and coaching tool for improv comedy. Each performer uses their own phone and privately receives:

- **1 Stance** — how the performer enters, interprets, or reacts within the scene.
- **1 Drive** — the objective, secret, avoidance, or repeatable behavior that keeps the performer playing.

The core deck contains **24 Stance cards** and **24 Drive cards**. Every browser maintains its own independent shuffle, current prompts, sessions, and Scene Log. There is no account, synchronized room, tracking service, or backend.

## Open the live game

<p align="center">
  <a href="https://scalemailted.github.io/improv-card-game/">
    <img src="./assets/improv-card-game-qr.png" width="300" alt="QR code linking to the public Imprompt game">
  </a>
</p>

<p align="center">
  Scan the code or open<br>
  <a href="https://scalemailted.github.io/improv-card-game/">https://scalemailted.github.io/improv-card-game/</a>
</p>

## What is new in v0.7.0

### Guided exercises

A coach can now coordinate the **draw rules** without sharing anyone's cards. Imprompt includes two exercise structures:

- **Mirror exercises** give every performer the same category pools on independently shuffled phones.
- **Paired exercises** give Player A and Player B different but complementary category pools.

Eight built-in exercises are included:

| Mirror exercises | Stance | Drive |
|---|---|---|
| **Status Clash** | Status & Authority | Direct Objectives |
| **Emotional Stakes** | Emotional Assumptions | Random All |
| **Absurd Commitment** | Worldview & Absurdity | Repeatable Behaviors |
| **Relationship Pressure** | History & Relationship | Secrets & Avoidance |

| Paired exercises | Player A | Player B |
|---|---|---|
| **Pursuer & Avoider** | Random Stance + Direct Objectives | Random Stance + Secrets & Avoidance |
| **Crown & Heart** | Status & Authority + Direct Objectives | Emotional Assumptions + Secrets & Avoidance |
| **Past & Future** | History & Relationship + Secrets & Avoidance | Status & Authority + Direct Objectives |
| **Instigator & Anchor** | Worldview & Absurdity + Repeatable Behaviors | History & Relationship + Direct Objectives |

Players can select a built-in exercise on their own phones after a coach announces it. A coach can also display an exercise QR code so each phone receives the same setup automatically.

### Exercise sharing by QR

An exercise QR shares only a small configuration describing:

- Exercise name and structure
- Stance and Drive category pools
- Whether the category selectors are locked or suggested
- A paired assignment when a role-specific QR is used

It does **not** share card IDs, prompt text, shuffle order, Scene Log entries, scene count, or local deck identity.

Mirror exercises use one QR. Paired exercises support:

- A **chooser QR**, after which the player selects Player A or Player B
- A **Player A QR**
- A **Player B QR**

The role-specific option is useful when the coach wants each performer to see only their own assignment. All QR codes are generated locally in the browser and continue to work without an external QR service.

### Custom exercise builder

Coaches can create and save custom Mirror or Paired exercises on their own device. The builder supports:

- A custom exercise name and coaching focus
- Independent Stance and Drive pools for each assignment
- Locked categories for structured coaching
- Suggested categories that players may change during play
- Hidden paired roles or an open structure in which both assignments are shown
- Local saving, editing, deletion, and QR sharing

Starting a new independent card deck clears prompts and history but preserves the saved custom-exercise library on that phone.

### Sessions, Scene Log, and practice coverage

Each exercise starts a distinct local session at **Scene 1** while preserving the remaining cards in the player's independent deck. The Scene Log is grouped by session and records:

- The final Stance and Drive used
- Immutable copies of the actual card wording
- Card categories and exercise assignment
- Completion time
- Per-card redraw totals

The **Coverage** tab summarizes how often each Stance and Drive category has appeared in the current session or across all saved sessions on that phone.

### Expanded Card Gallery

The gallery now supports:

- Stance and Drive tabs
- Category filters with card totals
- Search by title, instruction, or category
- Full-card and compact-list views
- Previous, next, and random navigation within the active filter

Gallery browsing never changes the shuffled gameplay deck.

## Ways to play

### Open Play

1. Each performer opens Imprompt on their own phone.
2. Select **Start Open Play**.
3. Leave both selectors on **Random All**, or focus either card on a category.
4. Tap each generic panel to draw and reveal a private card.
5. Tap a revealed card again to **Keep** it or **Veto & draw another**.
6. Play the scene without announcing or quoting the prompts.
7. Tap **Scene complete** to save the final pair to the local Scene Log.

### Mirror exercise

1. The coach announces a built-in Mirror theme or shares its QR.
2. Every performer enters the same exercise on their own phone.
3. Each phone independently draws from the same category pools.
4. The scene explores what happens when both performers bring the same broad kind of pressure through different private cards.

### Paired exercise

1. The coach assigns Player A and Player B verbally or displays the two role-specific QR codes.
2. Each performer starts only their assigned configuration.
3. The phones draw independently from complementary category pools.
4. The performers discover the other assignment through behavior rather than shared card information.

## Hidden-information design

A Stance directs only the holder. It may tell the performer how to carry themself, interpret the interaction, or respond to offers, but it never dictates what another performer must do.

A Drive gives the holder playable action: pursue something, protect something, avoid something, or establish a behavior that can repeat and heighten.

The cards should influence performance immediately, but they should not be announced or treated as exact phrases the partner must guess.

## Category visual language

Every revealed card carries a category label, color, and SVG icon. Color is never the only identifier.

| Category | Visual cue | Deck |
|---|---|---|
| Status & Authority | Indigo crown | Stance |
| History & Relationship | Teal link | Stance |
| Emotional Assumptions | Rose heart | Stance |
| Worldview & Absurdity | Violet sparkles | Stance |
| Direct Objectives | Blue target | Drive |
| Secrets & Avoidance | Gold lock | Drive |
| Repeatable Behaviors | Green repeat arrows | Drive |

## Independent local data

Imprompt stores its working state in the browser's local storage. A phone knows only its own:

- Shuffle order and unused cards
- Current scene and private prompts
- Category settings
- Guided-exercise assignment
- Sessions and Scene Log
- Saved custom exercises

The general **Invite players** QR always points to the plain public URL and contains no exercise or local state. Guided-exercise links contain only the selected coaching configuration.

A valid v0.5.x or v0.6.0 local deck is migrated into the v0.7.0 state structure. Existing v0.6 Scene Log entries become part of a migrated Open Play session. Older releases that never stored completed card identities cannot have those scenes reconstructed retroactively.

## Progressive web app and offline use

After a successful online visit, Imprompt can be installed and used offline. Static assets use release-specific URLs, while the service-worker address remains stable at `sw.js`. This prevents a newly deployed page from mixing incompatible JavaScript or CSS from an older cached version.

## Run locally

The service worker and manifest require an HTTP origin rather than `file://`.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

A static-server extension such as Live Server may also be used in VS Code.

## Publish with GitHub Pages

This package is configured for:

```text
https://scalemailted.github.io/improv-card-game/
```

1. Place the contents of this folder directly at the repository root.
2. Commit and push the files to the `main` branch.
3. Open **Settings → Pages** in the GitHub repository.
4. Choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save and wait for the deployment to finish.

All application assets use relative paths and work under the GitHub Pages project path.

## Project structure

```text
.
├── index.html
├── styles.css
├── cards.js
├── exercises.js
├── deck-engine.js
├── app.js
├── manifest.webmanifest
├── sw.js
├── .nojekyll
├── README.md
├── RELEASE-NOTES-v0.7.0.md
├── assets/
│   └── improv-card-game-qr.png
├── icons/
│   ├── icon.svg
│   ├── icon-192.png
│   └── icon-512.png
├── vendor/
│   ├── qrcode-core.js
│   └── THIRD-PARTY-NOTICES.md
└── tests/
    ├── app-content.test.js
    ├── deck-engine.test.js
    ├── exercises.test.js
    ├── qr-core.test.js
    └── share-link.test.js
```

## Editing cards and categories

All official card copy and category metadata are in `cards.js`. Keep card IDs unique and retain separate `stances` and `drives` arrays.

All built-in exercise definitions are in `exercises.js`. Each exercise defines:

- `mode`: `mirror` or `paired`
- `locked`: whether players can change the category selectors
- `roleVisibility`: `hidden` or `open`
- One Mirror role or two Paired roles
- A Stance and Drive filter for every role

When adding a category, update:

1. The cards in `cards.js`
2. `categoryStyles` in `cards.js`
3. The category color variables in `styles.css`
4. The SVG icon symbol in `index.html`

When changing the persisted state structure, increment `STATE_VERSION` in `deck-engine.js` and add an explicit migration path. For every release, update the `?v=` asset values in `index.html`, the cache name and precache list in `sw.js`, and the version in the release notes together.

## Run the automated tests

```bash
node tests/deck-engine.test.js
node tests/exercises.test.js
node tests/qr-core.test.js
node tests/share-link.test.js
node tests/app-content.test.js
```

The tests verify:

- All 48 cards, IDs, and category mappings
- Open Play, Mirror, and Paired session rules
- Different Player A and Player B category assignments
- Nonrepeating Random All cycles
- Focused-category cycles and filter-respecting veto replacements
- Immutable Scene Log snapshots and session grouping data
- v0.5/v0.6 state migration
- Custom-exercise normalization and storage
- Preset, chooser, and role-specific share links
- Absence of card, deck, scene, or history data in shared URLs
- Offline QR matrix generation
- Versioned static assets and service-worker cache contracts

See `vendor/THIRD-PARTY-NOTICES.md` for the locally bundled QR generator notice.
