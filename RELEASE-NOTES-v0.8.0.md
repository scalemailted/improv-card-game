# Imprompt v0.8.0 — Card Bible Foundation

v0.8.0 is the content-architecture release that prepares Imprompt to grow from the original 48-card MVP into a curated 480-card official library.

The player-facing game remains intentionally familiar. Open Play, Guided Exercises, QR sharing, independent phone decks, Scene Log, Practice Coverage, and the Card Gallery continue to work as they did in v0.7.0.

## Major additions

### The Imprompt Card Bible

Added `docs/IMPROMPT-CARD-BIBLE.md`, a comprehensive editorial standard covering:

- Hidden-information design
- Stance and Drive boundaries
- Seven categories and forty-eight subthemes
- Ten-pack composition
- Card metadata
- Language and title rules
- Safety and respect standards
- Human review scoring
- Blind-read and pairability tests
- Live playtest gates
- Semantic-duplication review
- Card versioning and retirement
- v1.0 release requirements

### Ten-pack, 480-card plan

The official v1.0 target is now machine-readable:

- 240 Stances
- 240 Drives
- 10 packs
- 24 Stances and 24 Drives per pack
- One card from every subtheme in every pack

Core Foundations remains Pack 1 and preserves the existing S01–S24 and D01–D24 identities.

### Canonical taxonomy

Added `card-bible.js`, which defines:

- Category IDs, labels, icons, deck membership, and target counts
- Six subthemes for every Stance category
- Twelve subthemes for Direct Objectives
- Six subthemes for Secrets & Avoidance
- Six subthemes for Repeatable Behaviors
- Difficulty, intensity, tone, orientation, and mode enums
- Controlled coach roles and motifs
- Pack plan and reserved ID ranges
- Card-ID formatting and lookup helpers

### Pack-based card architecture

The original monolithic `cards.js` has been refactored:

- `cards/core-foundations.js` contains the current published 48 cards.
- `card-bible.js` contains shared taxonomy and planning metadata.
- `cards.js` aggregates published packs while preserving the existing `IMPROMPT_CARDS` browser and Node interface.

Future packs can be added as separate files rather than extending one enormous source file.

### Rich metadata for Core Foundations

Every original card now includes:

- Stable card type and pack identity
- Content version and publication status
- Category ID and subtheme
- Difficulty
- Intensity
- Tone
- Orientation
- Coach roles
- Motifs
- Recommended exercise modes

The visible title, instruction, category, and card ID remain unchanged.

### Expansion-safe independent decks

The deck engine now stores a snapshot of the card IDs known to each local deck. When future published packs add new IDs, those cards are inserted at randomized positions in the existing remaining queues without clearing current prompts, sessions, Scene Log history, or already consumed Core cards.

v0.7-era state without a library snapshot is recognized as having the original S01–S24 and D01–D24 baseline.

### Rich Scene Log snapshots

Newly completed scenes now snapshot the deeper card metadata in addition to the visible title, instruction, category, and ID. Historical scene wording remains immutable even when a future card is revised.

### Schemas and authoring tools

Added:

- `cards/card.schema.json`
- `cards/pack.schema.json`
- `docs/CARD-AUTHORING-WORKSHEET.md`
- `docs/CARD-REVIEW-SCORECARD.md`
- `docs/PACK-BRIEF-TEMPLATE.md`

### Automated card-quality system

Added `tools/card-validator.js` and `tools/card-audit.js`.

The validator checks:

- Required metadata
- Card ID and pack-range consistency
- Category, subtheme, and deck compatibility
- Controlled enum, role, and motif values
- Copy length and formatting
- Hidden-information violations
- Duplicate IDs, titles, and instructions
- Near-duplicate token overlap warnings
- Exact published-pack category quotas
- One card per subtheme per published pack

Run:

```bash
npm test
npm run audit:cards
npm run audit:cards:write
```

The current generated report is stored at `reports/card-library-audit.md`.

## Current audit result

Core Foundations passes the v0.8 automated standard with:

- 24 published Stances
- 24 published Drives
- 7 category quotas satisfied
- 48 subthemes represented exactly once
- 0 structural errors
- 0 editorial warnings
- 0 duplicate IDs, titles, or instructions

## New tests

Added:

- `tests/card-bible.test.js`
- `tests/card-quality.test.js`
- `tests/browser-card-loading.test.js`

Updated application and cache tests for the new runtime files and v0.8.0 asset addresses.

## Offline and deployment changes

The service worker now precaches:

- `card-bible.js?v=0.8.0`
- `cards/core-foundations.js?v=0.8.0`
- `cards.js?v=0.8.0`

The stable `sw.js` address and versioned static-asset strategy remain unchanged.

## Compatibility

- Existing Core Foundations card IDs and visible wording are unchanged.
- Existing v0.5.x, v0.6.0, and v0.7.0 local state remains compatible.
- No synchronized multiplayer, account, or backend has been introduced.
- Exercise QR codes continue to share configuration only, never cards or deck state.

## Next content milestone

The recommended next milestone is **Pack 2: Everyday Friction**.

Before drafting its final 48 cards, use the pack brief and quota matrix to produce approximately 58–64 candidates, then apply automated, editorial, pairability, and live-playtest gates from the Card Bible.
