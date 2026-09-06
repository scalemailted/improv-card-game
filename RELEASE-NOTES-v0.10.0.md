# Imprompt v0.10.0 — Power Games

v0.10.0 adds the third official card pack and expands the active prompt library to **144 cards**.

## Active library

- Core Foundations: 24 published Stances + 24 published Drives
- Everyday Friction: 24 playtest Stances + 24 playtest Drives
- Power Games: 24 playtest Stances + 24 playtest Drives
- Total available: **72 Stances + 72 Drives = 144 cards**

## Pack 3: Power Games

Power Games explores:

- authority and command;
- legitimacy, rank, titles, and rightful belonging;
- leverage through access, information, resources, and approval;
- dependency disguised as independence or control;
- patronage, coalition-building, and conditional support;
- hierarchy, succession, obedience, dissent, and jurisdiction;
- the difference between formal titles and practical influence;
- the recurring struggle over who gets to decide.

The pack does not require a workplace, political office, military hierarchy, or monarchy. Its prompts remain portable across ordinary and fantastic settings.

### Reserved IDs

- Stances: `S49–S72`
- Drives: `D49–D72`

### Exact category distribution

| Category | New cards |
|---|---:|
| Status & Authority | 6 Stances |
| History & Relationship | 6 Stances |
| Emotional Assumptions | 6 Stances |
| Worldview & Absurdity | 6 Stances |
| Direct Objectives | 12 Drives |
| Secrets & Avoidance | 6 Drives |
| Repeatable Behaviors | 6 Drives |

Each of the 48 formal Card Bible subthemes receives exactly one Power Games card.

## Editorial package

The release includes:

- `docs/packs/POWER-GAMES-PACK-BRIEF.md`
- `docs/packs/POWER-GAMES-AUTHORING-MATRIX.md`
- `docs/packs/POWER-GAMES-CANDIDATE-POOL.md`
- `cards/candidates/power-games-candidate-pool.json`

The candidate pool contains:

- 64 total candidates;
- 48 selected;
- 8 held for possible revision or later use;
- 8 rejected with editorial rationales.

Power Games enters the application with internal status `playtest`. Automated and editorial selection are complete, while independent blind reads and repeated live troupe playtests remain pending.

## New coach metadata

Seven reusable coach roles were added:

- Broker
- Challenger
- Claimant
- Enforcer
- Gatekeeper
- Patron
- Successor

Twelve controlled motifs were added:

- access
- allegiance
- autonomy
- compliance
- hierarchy
- influence
- leverage
- legitimacy
- patronage
- reputation
- succession
- territory

These values remain behind the scenes and do not add visual categories or clutter the player interface.

## Guided-exercise impact

The larger pools immediately deepen:

- **Status Clash**
- **Crown & Heart**
- **Past & Future**
- custom Mirror and Paired exercises centered on authority, leverage, approval, or hierarchy

Exercise QR codes still share only category rules and optional role assignment. They never share drawn cards, shuffle order, scene history, or local deck identity.

## Existing-deck expansion

A phone upgrading from v0.9.0 receives the new Pack 3 IDs without resetting its private data.

The deck engine:

1. preserves the current scene;
2. preserves previous sessions and Scene Log snapshots;
3. preserves consumed Core and Everyday Friction cards;
4. preserves remaining queue order;
5. inserts only S49–S72 and D49–D72 at randomized positions in the remaining queues;
6. updates the local library snapshot.

No manual deck reset is required.

## Interface and offline updates

- Static card counts now show 72 Stances and 72 Drives.
- The Card Gallery describes and searches all 144 active prompts.
- Power Games loads as an independent runtime module: `cards/power-games.js`.
- The service-worker cache is now `imprompt-v0.10.0`.
- All application asset query versions are now `0.10.0`.
- The Power Games module is available offline after the application is cached.

## Validation

The release adds a dedicated `power-games.test.js` suite and updates library-wide tests for three active packs.

Automated checks cover:

- exact S49–S72 and D49–D72 allocation;
- one card per formal subtheme;
- 24/24 pack quotas;
- hidden-information integrity;
- title and instruction uniqueness across all 144 cards;
- near-duplicate detection;
- controlled role and motif vocabulary;
- content-version and pack-status rules;
- v0.9-to-v0.10 deck expansion without history loss;
- 72-card nonrepeating Random All cycles;
- 18-card category-focused cycles;
- browser UMD load order;
- service-worker and versioned-asset contracts;
- Guided Exercise, QR privacy, Scene Log, and gallery compatibility.

A passing automated audit confirms structural consistency; it does not replace live performance testing.
