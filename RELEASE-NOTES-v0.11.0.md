# Imprompt v0.11.0 — Relationship Knots

v0.11.0 adds the fourth official card pack and expands the active prompt library to **192 cards**.

## Active library

- Core Foundations: 24 published Stances + 24 published Drives
- Everyday Friction: 24 playtest Stances + 24 playtest Drives
- Power Games: 24 playtest Stances + 24 playtest Drives
- Relationship Knots: 24 playtest Stances + 24 playtest Drives
- Total available: **96 Stances + 96 Drives = 192 cards**

## Pack 4: Relationship Knots

Relationship Knots explores:

- affection, attachment, and the need to remain important;
- rivalry, comparison, jealousy, and emotional seniority;
- obligation created by history, care, favors, and sacrifice;
- dependence that is minimized, disguised, or treated as proof of closeness;
- shared rituals, private language, remembered roles, and relationship identity;
- distance, boundaries, estrangement, partial forgiveness, and attempted repair;
- competing interpretations of what a connection was, is, or should become;
- unfinished connection and the struggle to decide what the relationship still requires.

The cards do not prescribe romance, family, friendship, or another fixed relationship label. Each prompt directs only the holder's behavior, interpretation, objective, concealment, or recurring pattern.

### Reserved IDs

- Stances: `S73–S96`
- Drives: `D73–D96`

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

Each of the 48 formal Card Bible subthemes receives exactly one Relationship Knots card.

## Selected prompt examples

Representative Stances include:

- **Emotional Seniority**
- **Our Private Language**
- **The Other Favorite**
- **Who We Used to Be**
- **Still Your Person**
- **Relationship Maintenance**

Representative Drives include:

- **Stay Until We're Okay**
- **What Are We Now?**
- **Choose the Relationship**
- **Say You Missed Me**
- **Affectionate Resentment**
- **Here We Go Again**

## Editorial package

The release includes:

- `docs/packs/RELATIONSHIP-KNOTS-PACK-BRIEF.md`
- `docs/packs/RELATIONSHIP-KNOTS-AUTHORING-MATRIX.md`
- `docs/packs/RELATIONSHIP-KNOTS-CANDIDATE-POOL.md`
- `cards/candidates/relationship-knots-candidate-pool.json`

The candidate pool contains:

- 64 total candidates;
- 48 selected;
- 8 held for possible revision or later use;
- 8 rejected with editorial rationales.

Relationship Knots enters the application with internal status `playtest`. Automated validation and editorial selection are complete, while independent blind reads and repeated live troupe playtests remain pending.

## New coach metadata

Seven reusable coach roles were added:

- Attachment Seeker
- Boundary Keeper
- Confidant
- Loyalist
- Memory Keeper
- Peacemaker
- Reconciler

Fifteen controlled motifs were added:

- abandonment
- affection
- attachment
- boundaries
- closeness
- connection
- distance
- forgiveness
- intimacy
- jealousy
- memory
- promise
- reconciliation
- resentment
- sacrifice

These values remain behind the scenes and do not add visual categories or clutter the player interface.

## Guided-exercise impact

The larger category pools immediately deepen:

- **Relationship Pressure**, now drawing from 24 History & Relationship Stances and 24 Secrets & Avoidance Drives;
- **Emotional Stakes**, now drawing from 24 Emotional Assumptions Stances and the full 96-card Drive library;
- **Crown & Heart**, whose Heart assignment gains more attachment, approval, care, jealousy, and repair material;
- **Past & Future**, whose Past assignment gains more shared-history, old-role, loyalty, distance, and unfinished-business material;
- custom Mirror and Paired exercises centered on closeness, boundaries, obligation, memory, repair, or emotional dependence.

Exercise QR codes still share only configuration and optional role assignment. They never share drawn cards, shuffle order, scene history, or local deck identity.

## Existing-deck expansion

A phone upgrading from v0.10.0 receives the Pack 4 IDs without resetting its private data.

The deck engine:

1. preserves the current scene and any revealed prompts;
2. preserves previous sessions and immutable Scene Log snapshots;
3. preserves consumed Core Foundations, Everyday Friction, and Power Games cards;
4. preserves the order of all previously available cards still remaining;
5. inserts only S73–S96 and D73–D96 at randomized positions in the remaining queues;
6. preserves saved custom coach exercises;
7. updates the local library snapshot.

No manual deck reset is required.

## Interface and offline updates

- Static fallback counts now show 96 Stances and 96 Drives.
- The Card Gallery describes, filters, and searches all 192 active prompts.
- Relationship Knots loads as an independent runtime module: `cards/relationship-knots.js`.
- The service-worker cache is now `imprompt-v0.11.0`.
- All application asset query versions are now `0.11.0`.
- The Relationship Knots module is included in the offline application cache.

## Validation

The release adds a dedicated `relationship-knots.test.js` suite and updates library-wide tests for four active packs.

Automated checks cover:

- exact S73–S96 and D73–D96 allocation;
- one Relationship Knots card in every formal subtheme;
- exact 24/24 pack quotas;
- hidden-information integrity;
- title and instruction uniqueness across all 192 cards;
- near-duplicate detection;
- controlled role and motif vocabulary;
- content-version and pack-status rules;
- v0.10-to-v0.11 deck expansion without current-scene or history loss;
- 96-card nonrepeating Random All cycles;
- 24-card Stance-category and Secrets/Behavior Drive-category cycles;
- 48-card Direct Objectives cycles;
- browser UMD load order;
- service-worker and versioned-asset contracts;
- Guided Exercise, QR privacy, Scene Log, Practice Coverage, and gallery compatibility;
- Pixel-width touch drawing and reveal behavior;
- service-worker installation and offline reload.

A passing automated audit confirms structural consistency; it does not replace live performance testing.
