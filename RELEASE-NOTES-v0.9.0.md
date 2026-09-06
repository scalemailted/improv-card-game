# Imprompt v0.9.0 — Everyday Friction

v0.9.0 is the first full content expansion built under the Imprompt Card Bible.

## Active library

- Core Foundations: 24 published Stances + 24 published Drives
- Everyday Friction: 24 playtest Stances + 24 playtest Drives
- Total available in the app: **48 Stances + 48 Drives = 96 cards**

Pack 2 uses reserved IDs S25–S48 and D25–D48 and contributes exactly one card to every formal subtheme.

## Everyday Friction creative focus

The new cards find strong scene behavior inside ordinary pressure:

- small decisions and procedural authority;
- routines, reminders, favors, and scorekeeping;
- usefulness, invisible labor, suppressed inconvenience, and preparation;
- schedules, cleanup, maintenance, shared resources, and communication;
- shortcuts, technical compliance, improvised completion, and practical optimism.

No card requires a household, workplace, store, or realistic setting. The pack’s behavior remains portable across grounded and fantastical scenes.

## Editorial package

The repository now includes:

- `docs/packs/EVERYDAY-FRICTION-PACK-BRIEF.md`
- `docs/packs/EVERYDAY-FRICTION-AUTHORING-MATRIX.md`
- `docs/packs/EVERYDAY-FRICTION-CANDIDATE-POOL.md`
- `cards/candidates/everyday-friction-candidate-pool.json`

The candidate pool contains 64 cards: 48 selected, 8 held, and 8 rejected. Selection decisions and rationales are preserved for later playtest review.

## Playtest status

Pack 2 is intentionally marked `playtest` rather than `published`. It has passed:

- taxonomy and quota validation;
- hidden-information heuristics;
- duplicate and near-duplicate checks;
- copy-length and controlled-vocabulary validation;
- editorial balance review;
- deck-expansion migration tests;
- application and offline-cache tests.

Independent blind reads and repeated live troupe testing remain pending. Card wording may be refined in later v0.9.x releases based on actual veto, comprehension, and scene-quality feedback.

## Runtime integration

- `cards/everyday-friction.js` is loaded after Core Foundations and before the library aggregator.
- `cards.js` now exposes published and playtest pack counts separately while making both active in the app.
- Existing independent decks preserve current cards and queue order; S25–S48 and D25–D48 are inserted at randomized positions.
- Scene Log entries continue to snapshot the exact card wording and metadata played.
- Guided exercises and category filters automatically use the expanded category pools.

## Metadata expansion

The Card Bible adds these controlled motifs:

`communication`, `convenience`, `etiquette`, `fairness`, `maintenance`, `mess`, `resources`, `responsibility`, `routine`, `space`, `time`, and `work`.

The visible seven-category system is unchanged.

## Cache and deployment

All application assets use the v0.9.0 query version, and the service-worker cache is `imprompt-v0.9.0`. The new pack module is included in the offline cache.

Extract the ZIP contents into the root of the GitHub Pages repository and replace the previous files. Existing local data remains compatible.
