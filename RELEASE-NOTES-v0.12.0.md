# Imprompt v0.12.0 — Emotional Pressure

## Release summary

Pack 5 adds 24 Stances and 24 Drives centered on insecurity, validation, resentment, hope, grief, shame, courage, reassurance, and emotional contradiction. The active library now contains **120 Stances and 120 Drives**, or **240 cards total** across five packs.

Emotional Pressure does not ask a performer merely to “be sad,” “be angry,” or “be afraid.” Each prompt turns emotion into a visible choice: claim authority through composure, measure safety through reassurance, compete over whose hurt matters, preserve hope against evidence, hide behind practical details, or repeat a protective pattern until it heightens.

## New playable content

- **S97–S120:** 24 Emotional Pressure Stances
- **D97–D120:** 24 Emotional Pressure Drives
- One selected card in every formal Card Bible subtheme
- Six new coach roles and fifteen new controlled motifs
- Full Open Play, focused-category, Guided Exercise, gallery, coverage, and Scene Log integration

Representative cards include:

- **The Emotional Center**
- **Composure on Loan**
- **When We Still Believed**
- **The Strong One**
- **Waiting for the Bad News**
- **Tell Me We’re Okay**
- **Hope Is Evidence**
- **Let Me Lean**
- **Understand the Hurt**
- **Hope with Me**
- **Let Them Keep Hope**
- **Comfort Everyone Else**
- **The Same Ending**

## Library depth after Pack 5

| Category | Active cards |
|---|---:|
| Status & Authority Stances | 30 |
| History & Relationship Stances | 30 |
| Emotional Assumptions Stances | 30 |
| Worldview & Absurdity Stances | 30 |
| Direct Objectives Drives | 60 |
| Secrets & Avoidance Drives | 30 |
| Repeatable Behaviors Drives | 30 |

## Exercise impact

The enlarged pools materially deepen:

- **Emotional Stakes**
- **Crown & Heart**
- **Relationship Pressure**
- **Past & Future**
- custom coach exercises centered on vulnerability, reassurance, grief, courage, shame, hope, resentment, or emotional labor

Every phone still maintains its own shuffle, cards, sessions, and history. Coach links and QR codes share only exercise configuration—not drawn prompts, deck order, scene count, or player data.

## Editorial package

The release includes a 64-card drafting pool rather than automatically accepting the first 48 ideas:

| Disposition | Count |
|---|---:|
| Selected | 48 |
| Held for revision or later packs | 8 |
| Rejected with rationale | 8 |

Included documents:

- `docs/packs/EMOTIONAL-PRESSURE-PACK-BRIEF.md`
- `docs/packs/EMOTIONAL-PRESSURE-AUTHORING-MATRIX.md`
- `docs/packs/EMOTIONAL-PRESSURE-CANDIDATE-POOL.md`
- `cards/candidates/emotional-pressure-candidate-pool.json`

## Safety and hidden-information boundaries

The selected cards avoid:

- diagnostic stereotypes
- forced crying or emotional breakdown
- coerced physical intimacy
- mandatory trauma disclosure
- instructions that define another performer’s private emotion or future reaction
- fixed bereavement, breakup, therapy, hospital, or crisis premises

High-intensity metadata describes dramatic stakes, not required acting volume. Every card remains vetoable without explanation.

## Existing-deck migration

Players upgrading from v0.11.0 do not need to reset their independent deck. The app preserves:

- the current scene and drawn cards
- existing sessions and Scene Log entries
- immutable historical card wording
- prior card consumption and remaining queue order
- Practice Coverage
- saved custom coach exercises

Only the new `S97–S120` and `D97–D120` IDs are inserted at randomized positions in the remaining local queues.

## Runtime changes

The browser now loads:

```text
card-bible.js
cards/core-foundations.js
cards/everyday-friction.js
cards/power-games.js
cards/relationship-knots.js
cards/emotional-pressure.js
cards.js
```

The service-worker cache and versioned asset URLs have advanced to `imprompt-v0.12.0`.

## Validation

The final package passes:

- 240 unique active card IDs, titles, and instructions
- exact `S97–S120` and `D97–D120` allocation
- one Emotional Pressure card in every formal subtheme
- hidden-information and controlled-vocabulary checks
- title/instruction length and near-duplicate checks
- exact 24-Stance and 24-Drive pack quotas
- full 120-card nonrepeating deck cycles
- category-focused cycle validation
- v0.11.0-to-v0.12.0 migration without history loss
- Guided Exercise and QR privacy tests
- browser script-loading-order checks
- Scene Log snapshot and Practice Coverage integration
- service-worker and versioned-asset checks
- Pixel-width touch interaction tests
- 320-pixel content-overflow and header-collision checks across all 240 active cards
- fresh-ZIP extraction and integrity validation

The generated audit reports:

```text
Result: PASS
Available: 120 Stances + 120 Drives
Active packs: 5
Published packs: 1
Playtest packs: 4
Errors: 0
Warnings: 0
```

Emotional Pressure remains internally marked **playtest** pending independent blind reads and repeated live troupe use.
