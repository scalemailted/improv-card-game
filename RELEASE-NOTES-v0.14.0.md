# Imprompt v0.14.0 — Absurd Commitment

## Summary

Imprompt v0.14.0 adds **Pack 7: Absurd Commitment**, expanding the active library from 288 to **336 prompts** while preserving the existing independent-deck, Guided Exercise, Scene Log, gallery, and offline architecture.

The release adds:

- 24 Stances: `S145–S168`
- 24 Drives: `D145–D168`
- a 64-card documented candidate pool
- a completed 48-slot authoring matrix
- six new coach roles
- fourteen commitment-and-consequence motifs
- migration that inserts only the new Pack 7 IDs into existing local queues

## Editorial identity

Absurd Commitment explores impossible logic, literal commitment, grounded reaction, recurring nonsense, and heightened consequence.

The pack is deliberately not a collection of random “weird” suggestions. Each card asks its holder to establish or discover a coherent relationship to the unusual:

- believe an impossible premise strongly enough to act;
- interpret language, objects, or rules literally;
- normalize extraordinary developments;
- build a strange world through consistent logic;
- track practical consequences;
- test what the new reality allows;
- heighten an established pattern rather than abandoning it.

Every prompt remains setting-independent and holder-specific. No card requires a fantasy, science-fiction, supernatural, or genre premise.

## Selected examples

### Stances

- Official Interpreter
- Prophecy Under Revision
- Impossible Specialist
- We Always Did This
- Designated Reality Check
- Don’t Let Reality Notice
- The Ceremony Requires More
- Fine, What Does It Eat?
- The Universe Is Rhyming

### Drives

- Help Me Make This Normal
- You Can’t Leave Mid-Prophecy
- Apologize to Reality
- What Rule Did I Miss?
- Believe This with Me
- A Kinder Impossible Truth
- Fluent in Nonsense
- Calm About the Impossible
- The Logic Gets Bigger

## Guided Exercise impact

The expansion most directly improves:

- **Absurd Commitment**, with 42 Worldview & Absurdity Stances and 42 Repeatable Behaviors Drives now available across the active library;
- **Instigator & Anchor**, through dedicated Believer, World Builder, Consequence Keeper, Normalizer, and Reality Tester material;
- **Status Clash**, through impossible expertise, prophetic authority, bizarre legitimacy, and practical hidden leverage;
- **Crown & Heart**, through belonging-by-belief, protective nonsense, approval, and emotional investment in strange rules;
- **Past & Future**, through impossible promises, inherited rituals, and nostalgia for a more understandable reality;
- custom coach exercises centered on literalism, grounding, world-building, consequences, or escalating logic.

Exercise links and QR codes continue to share configuration only. Specific cards, shuffle order, Scene Log history, and player information remain local to each phone.

## Card Bible integration

Pack 7 contributes exactly one selected card to every formal Card Bible subtheme:

| Category | Added | Active total |
|---|---:|---:|
| Status & Authority | 6 Stances | 42 |
| History & Relationship | 6 Stances | 42 |
| Emotional Assumptions | 6 Stances | 42 |
| Worldview & Absurdity | 6 Stances | 42 |
| Direct Objectives | 12 Drives | 84 |
| Secrets & Avoidance | 6 Drives | 42 |
| Repeatable Behaviors | 6 Drives | 42 |

The Card Bible version advances to `1.6.0`.

### New coach roles

- Believer
- Literalist
- Normalizer
- World Builder
- Consequence Keeper
- Reality Tester

### New controlled motifs

- cause-effect
- consequences
- impossibility
- literalism
- logic
- metaphor
- normality
- premise
- prophecy
- reality
- safety
- scale
- symbols
- transformation

## Candidate pool

The editorial pool contains 64 candidates:

| Disposition | Stances | Drives | Total |
|---|---:|---:|---:|
| Selected | 24 | 24 | 48 |
| Held | 4 | 4 | 8 |
| Rejected | 4 | 4 | 8 |
| **Total** | **32** | **32** | **64** |

Held cards preserve promising ideas that overlap stronger selections, need live testing, or belong more naturally in Pack 8. Rejected cards document the boundaries around randomness, blocking, fixed partner identity, fixed fantasy tasks, stigmatizing shorthand, and guaranteed responses.

## Playtest status

The Pack 7 source is marked `playtest`. Structural and editorial selection is complete; independent blind reads and repeated live troupe testing remain pending.

Suggested observations include:

- whether the logic remains coherent rather than random;
- whether grounded responders accept rather than dismiss the premise;
- whether players can heighten without adding unrelated plot;
- whether the cards work in ordinary grounded settings;
- whether partner resistance creates more scene rather than invalidating the prompt;
- whether any cards overlap Core Foundations too strongly.

## Existing-deck migration

Opening v0.14.0 with a valid earlier deck preserves:

- current prompts;
- the unfinished scene, if any;
- completed Scene Log entries;
- immutable historical wording;
- sessions and Practice Coverage;
- saved custom exercises;
- consumed cards and existing queue order.

Only `S145–S168` and `D145–D168` are inserted at randomized positions in the remaining local queues.

## Offline and cache behavior

The service-worker cache and versioned asset URLs advance to `imprompt-v0.14.0`. The stable `sw.js` address and non-forced activation strategy remain unchanged.

The new `cards/absurd-commitment.js` module is included in the offline precache.

## Validation

The release validates:

- 168 unique Stance IDs and 168 unique Drive IDs;
- unique titles and instructions across all 336 cards;
- exact Pack 7 ID allocation;
- one Pack 7 card in every subtheme;
- hidden-information compliance;
- controlled metadata and copy length;
- duplicate and near-duplicate gates;
- complete 168-card nonrepeating deck cycles;
- 42-card focused category cycles;
- v0.13.0-to-v0.14.0 migration without history loss;
- guided exercise and QR privacy behavior;
- browser script ordering and service-worker asset coverage;
- mobile card drawing, reveal, Keep, and Veto behavior;
- 320-pixel and Pixel-width layout behavior.

Expected audit summary:

```text
Result: PASS
Available: 168 Stances + 168 Drives
Active packs: 7
Published packs: 1
Playtest packs: 6
Errors: 0
Warnings: 0
```
