# Imprompt v0.16.0 — Competition & Consequences

**Release type:** Playtest content expansion  
**Pack:** 9 of 10  
**Reserved IDs:** S193–S216 and D193–D216

Imprompt v0.16.0 adds **Pack 9: Competition & Consequences**, expanding the active library from 384 to **432 prompts** while preserving the independent-deck, Guided Exercise, Scene Log, gallery, QR-sharing, and offline architecture.

## Library expansion

The active library now contains:

- 216 Stances;
- 216 Drives;
- 432 total cards;
- 9 active packs;
- 1 published pack and 8 playtest packs.

Competition & Consequences contributes one new card to every formal Card Bible subtheme:

- 6 Status & Authority Stances;
- 6 History & Relationship Stances;
- 6 Emotional Assumptions Stances;
- 6 Worldview & Absurdity Stances;
- 12 Direct Objectives Drives;
- 6 Secrets & Avoidance Drives;
- 6 Repeatable Behaviors Drives.

## Editorial focus

The pack makes the following playable without imposing a fixed sports, tournament, wagering, workplace, or game-show setting:

- winning, losing, comparison, and rivalry;
- judging, scoring, fairness, and disputed outcomes;
- bargains, rewards, penalties, concessions, and tradeoffs;
- teamwork under unequal risk or recognition;
- sacrifice, contribution, ownership, and accountability;
- hidden changes to the odds or terms;
- comeback logic and escalating consequences;
- practical questions about who benefits, who pays, and what happens next.

The complete authoring package contains a 64-card candidate pool: 48 selected, 8 held, and 8 rejected with rationale.

## Guided Exercise impact

Existing exercise configurations automatically draw from the enlarged library:

- **Status Clash** gains scoring, judging, winner-defined terms, and precarious standing.
- **Crown & Heart** gains recognition, worth, belonging, sacrifice, and the emotional cost of victory.
- **Past & Future** gains rematches, old concessions, shared competition, and unpaid consequences.
- **Pursuer & Avoider** gains bargaining, concealed odds, scorekeeping, confession, and responsibility.
- **Absurd Commitment** gains ceremonial winners, sudden-death choices, literal stakes, and compounding consequences.
- Custom exercises gain the Contender, Scorekeeper, Referee, Dealmaker, Accountability Keeper, and Stakes Raiser roles.

Every phone still shuffles independently. Exercise links and QR codes share only configuration and optional role assignment.

## Migration

Opening v0.16.0 with a valid earlier deck preserves:

- the current scene and already drawn prompts;
- existing sessions and completed Scene Log entries;
- immutable historical prompt wording;
- previously consumed cards and remaining queue order;
- Practice Coverage;
- saved custom coach exercises.

Only `S193–S216` and `D193–D216` are inserted at randomized positions in each phone’s remaining queues.

## Offline and cache behavior

The service-worker cache and all versioned asset URLs advance to `imprompt-v0.16.0`. The stable `sw.js` address and non-forced activation strategy remain unchanged. The new Pack 9 module is precached for offline play.

## Validation summary

The final release validates:

- 216 unique Stance IDs and 216 unique Drive IDs;
- unique titles and instructions across all 432 prompts;
- exact Pack 9 ID ranges and one-card-per-subtheme quotas;
- holder-specific hidden-information language;
- controlled metadata, copy length, and duplicate gates;
- 216-card nonrepeating complete-deck cycles;
- 54-card focused Stance and specialized Drive category cycles;
- 108-card Direct Objectives cycles;
- v0.15.0-to-v0.16.0 migration without history loss;
- Guided Exercise and QR privacy contracts;
- browser loading order, versioned assets, and offline precache coverage;
- mobile and narrow-screen rendering.

Automated library audit target:

```text
Result: PASS
Available: 216 Stances + 216 Drives
Active packs: 9
Published packs: 1
Playtest packs: 8
Errors: 0
Warnings: 0
```

Competition & Consequences is active with internal status `playtest`. Independent blind reads and repeated troupe use remain the final acceptance stage before publication.
