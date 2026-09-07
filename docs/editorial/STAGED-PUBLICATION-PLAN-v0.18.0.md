# Imprompt v0.18.0 — Staged Publication Plan

## Meaning of the stage

live-validation means editorially consolidated and ready for structured troupe testing; it does not mean published.

Core Foundations remains the published baseline. The other nine packs are now editorially consolidated and placed in three live-validation waves. Their runtime status remains `playtest` until every remaining gate is met.

## Publication waves

### Wave 1: Grounded Foundations

Validate the broadest grounded expansions first and establish baseline playtest metrics.

| Pack | v0.18 revisions | Stage |
|---|---:|---|
| Everyday Friction | 0 | `live-validation` |
| Power Games | 2 | `live-validation` |
| Relationship Knots | 2 | `live-validation` |

### Wave 2: Pressure and Premise

Validate higher emotional, informational, and absurd commitment demands after the grounded baseline.

| Pack | v0.18 revisions | Stage |
|---|---:|---|
| Emotional Pressure | 1 | `live-validation` |
| Secrets & Schemes | 5 | `live-validation` |
| Absurd Commitment | 4 | `live-validation` |

### Wave 3: Systems, Stakes, and Structure

Validate specialized systems play, consequence loops, and veteran-level structural pressure last.

| Pack | v0.18 revisions | Stage |
|---|---:|---|
| Rules, Rituals & Institutions | 5 | `live-validation` |
| Competition & Consequences | 5 | `live-validation` |
| Advanced Scene Engines | 4 | `live-validation` |

## Remaining gate definitions

| Gate | Required evidence |
|---|---|
| Independent human blind read | Readers who were not involved in authoring can state a playable first move and do not infer required partner behavior. |
| Live exposure threshold | Each card receives repeated scene use across more than one performer and experience level. |
| Veto and abandonment review | Veto, redraw, confusion, and abandoned-scene patterns are reviewed for outliers. |
| Final copy sign-off | Wording, title, category, metadata, and residual overlap are approved after live evidence. |

## Recommended staged protocol

1. Test one wave at a time so feedback can be attributed to a manageable group of packs.
2. Use the Scene Log to identify exact card IDs and preserve the wording played.
3. Record comprehension, first move, escalation, partner assumption, veto, and scene completion.
4. Review a pack only after enough exposure exists to distinguish a weak card from one unusual pairing.
5. Promote packs individually; a wave does not need to publish all three packs simultaneously.

## Runtime metadata

Every pack exposes `publicationStage`, `publicationWave`, `editorialReviewVersion`, and `remainingPublicationGates` through `card-bible.js` and `cards.js`. These fields are editorial metadata and do not complicate ordinary player-facing gameplay.
