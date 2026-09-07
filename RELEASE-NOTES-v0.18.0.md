# Imprompt v0.18.0 — Editorial Consolidation & Playtest Readiness

v0.18.0 is a library-quality release. It adds no new cards and makes no disruptive change to the player-facing game loop. Instead, it consolidates the complete 480-card library after the v0.17 final audit and prepares the nine expansion packs for staged live validation.

## Library status

- 240 Stances
- 240 Drives
- 480 active cards
- 10 active packs
- 1 published baseline pack
- 9 playtest packs staged for live validation
- 48 formal subthemes with 10 cards each

## Editorial consolidation

The v0.17 audit identified 23 high-priority semantic-overlap clusters. v0.18.0 resolves those clusters internally with the minimum viable set of 24 semantic rewrites. The three-card Test Loyalty cluster required two revised cards.

Four additional cards receive broader, setting-independent titles:

- S130: **First to Solve It**
- S209: **Worth Keeping Around**
- S221: **I Meant to Teach That**
- D177: **Record My Contribution**

All 28 changed cards preserve their stable IDs and carry `contentVersion: "0.18.0"`. Unchanged cards retain the version in which their current wording was introduced.

## Historical Scene Log safety

Completed Scene Log entries already store immutable Stance and Drive snapshots. v0.18.0 adds a regression test that loads an older snapshot of a revised card, reconciles it with the current library, and verifies that the historical title, instruction, and content version remain unchanged.

Old postmortems therefore continue to show what the performer actually played, even when the current library copy has improved.

## Amber-subtheme review

All 20 subthemes rated Amber in the v0.17 distinctiveness audit receive a reproducible internal metadata-blind review and structured pairability gauntlet:

- 200 cards reviewed
- 1,200 opposite-deck pairings assessed
- six varied opposite-deck prompts per card family
- 0 premise conflicts identified in the internal review
- residual similarities documented for live observation

This review is internal editorial evidence. It does not claim independent human blind-read completion.

## Staged publication readiness

Core Foundations remains `published`. The nine expansion packs remain `playtest`, but now expose these readiness fields:

- `publicationStage`
- `publicationWave`
- `editorialReviewVersion`
- `remainingPublicationGates`

The three live-validation waves are:

1. **Grounded Foundations** — Everyday Friction, Power Games, Relationship Knots
2. **Pressure and Premise** — Emotional Pressure, Secrets & Schemes, Absurd Commitment
3. **Systems, Stakes, and Structure** — Rules, Rituals & Institutions, Competition & Consequences, Advanced Scene Engines

Each playtest pack still requires:

- independent human blind reads
- repeated live scene exposure
- veto and abandonment review
- final copy sign-off

## New editorial evidence and tooling

Machine-readable manifests:

```text
editorial/v0.18.0/revision-ledger.json
editorial/v0.18.0/overlap-resolution.json
editorial/v0.18.0/amber-subtheme-review.json
editorial/v0.18.0/subtheme-readiness.json
editorial/v0.18.0/publication-waves.json
```

Human-readable materials:

```text
docs/editorial/EDITORIAL-CONSOLIDATION-v0.18.0.md
docs/editorial/AMBER-SUBTHEME-REVIEW-v0.18.0.md
docs/editorial/STAGED-PUBLICATION-PLAN-v0.18.0.md
docs/editorial/LIVE-VALIDATION-WORKSHEET-v0.18.0.md
docs/editorial/SUBTHEME-READINESS-v0.18.0.csv
```

New commands:

```bash
npm run audit:editorial
npm run audit:editorial:write
npm run audit:all
```

## Card Bible and schema

- Card Bible runtime plan version: `1.10.0`
- Card Bible document version: `1.10.0`
- Added controlled publication stages
- Added publication-wave and remaining-gate metadata to pack definitions
- Expanded pack schema and validator checks
- Added publication-readiness information to the generated card-library report

## Documentation synchronization

The affected pack authoring matrices and candidate-pool documents now show the current v0.18.0 selected copy. The original wording remains preserved in the revision ledger and the archived v0.17 audit evidence.

## Application and deployment

The visible game remains intentionally stable:

- independent decks remain local to each phone
- Open Play and Guided Exercises behave as before
- QR links share configuration, never cards or history
- individual Keep and Veto behavior is unchanged
- gallery, Scene Log, and Practice Coverage remain available
- the app remains fully client-side and offline-capable

Release assets use `?v=0.18.0`, and the service-worker cache is `imprompt-v0.18.0`.

## Validation

The release includes automated coverage for:

- all 480 unique IDs, titles, and instructions
- exact pack/category/subtheme quotas
- 24 semantic revisions and 4 title generalizations
- stable IDs and increased per-card content versions
- all 23 overlap-resolution records
- all 20 Amber review records
- the complete 48-subtheme post-consolidation readiness matrix
- 200 reviewed cards and 1,200 pairings
- nine packs across three publication waves
- immutable historical Scene Log snapshots
- browser script loading and offline asset versions
- independent deck migration and guided-exercise behavior

The internal audits distinguish editorial readiness from publication: a passing v0.18.0 audit prepares the packs for structured live testing; it does not mark them published.
