> Historical source README. Current instructions are in the repository-root README.md.

# Imprompt — Prompts for Improv

**v0.22.1** refactors the optional local hint generator to **perform a moment as the character**, rather than tell the player how to act. The full 480-card library, exercises, independent shuffle, Scene Log and instant built-in hints are retained.

## Run the updated project

Extract the ZIP into a project folder and run:

```bash
npm start
```

Open `http://localhost:8080`. Node 18+ is required for the development server; no npm install or build step is needed. Do not use `file://` for inference. The server enables cross-origin isolation headers for supported multithreaded inference; `npm start -- --single-thread` is available for comparison.

When replacing an existing deployment, close old game tabs and reopen the same URL. Model files and deck data are tied to the browser origin, including port. Do not clear all site data to refresh the code. The patch invalidates only old generated hints, not saved models, cards or the Scene Log.

## Use performed hints

Open **Main menu → Local hint engine** and choose **Use saved model**, or **Download & enable** for first-time setup. Model weights are not included in the ZIP. The configured choices are approximately 386 MB and 1.06 GB, plus runtime and working memory; downloading requires explicit permission.

Once Ready appears, opening **Need a nudge?** or **How might these work together?** generates a short first-person action and in-character line. With two cards, the Stance shapes how the character pursues the Drive in one connected move. A hint already open during setup offers **Act it out**. **Another angle** generates a new moment. **Stop generating** cancels inference and keeps downloaded files.

The model receives the exact revealed card instructions and performance-style examples. Illustrative objects and situations are allowed; the player's scene is not prescribed. Unrevealed cards, another performer's hand and Scene Log are excluded from the request.

The built-in example stays available during generation. Bad outputs get one targeted retry. Failure leaves the current example accurately labeled and shows a reason, with **Generation details** for the actual error or rejected text. Diagnostics are local, with no automatic upload. The model can still give weak performances even when formatting is correct.

## Verification and troubleshooting

`npm test`, `npm run audit:all` and the offline DOM suite `npm run test:browser` passed in the build environment. The browser tests inject a mock inference runtime. Actual GGUF inference, output quality and device performance are **not verified** here: external downloads could not be fetched by the execution environment and live browser navigation was blocked by its administrative policy.

The additional `npm run test:deployment` checks real local hosting/PWA behavior without a model. Its browser portion could not execute here. An opt-in real-model runner is included at `http://localhost:8080/tools/real-model-check.html`; it uses the production adapter on fixed cards and reports actual results on the device where it is run.

See `RELEASE-NOTES-v0.22.1.md`, `BUILD-VERIFICATION-v0.22.1.md` and `docs/LOCAL-HINT-ENGINE.md` for the changes, exact test scope and diagnostic instructions. Older release sections below describe historical behavior.

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

## Release history: v0.21.2

v0.21.2 repairs the two-card hint so that it actually demonstrates the selected Stance and Drive as one concrete behavior:

- The engine now uses the card-specific action in each resolved hint rather than accidentally extracting the generic pack preface.
- A new fusion-profile library defines the playable method of all 24 Stance subthemes and the pressure, opening tactic, blocked tactic, and repeatable loop of all 24 Drive subthemes.
- Pack-specific anchors keep cards from the same subtheme distinct across the ten official packs.
- **One way to play the pair**, **Your first move**, **The repeatable loop**, and **When the scene changes** are generated from both actual selected cards.
- Three representative pairings are hand-audited regression fixtures, and all 57,600 hands remain locally generated and offline-capable.
- The card-integrated Veto and Nudge controls remain unchanged.

See `RELEASE-NOTES-v0.21.2.md` and `docs/IMPROMPT-HINT-BIBLE.md`.

## What is new in v0.21.1

v0.21.1 moved the per-card actions into the card itself:

- **Veto** is anchored at the bottom left of each revealed card.
- **Need a nudge?** is anchored at the bottom right when hints are available.
- The external full-width Nudge rows are gone.
- Tapping the revealed card body keeps it; Veto draws a concealed replacement from the same selected pool.
- The implementation uses separate sibling buttons rather than invalid nested buttons.

See `RELEASE-NOTES-v0.21.1.md`.

## What is new in v0.21.0

The two-card hint now demonstrates an integrated behavior rather than presenting the Stance and Drive as separate summaries. It provides one way to play the pair, a first move, a repeatable loop, and an adaptation rule. `Another angle` changes the concrete tactic while the system remains entirely local and deterministic.

See `RELEASE-NOTES-v0.21.0.md` and `docs/IMPROMPT-HINT-BIBLE.md`.

## What is new in v0.20.0

v0.20.0 adds optional coaching assistance while preserving the hidden-information game, offline operation, and complete 480-card library.

### Single-card nudges

After revealing a card, a player may select **Need a nudge?** to see one possible behavioral manifestation. Every card resolves to:

- two audited, card-specific manifestation angles;
- a formal pack lens, subtheme, and focus motifs;
- tone-aware heightening guidance;
- holder-only language that leaves the partner free.

The source stays maintainable by composing each card’s official pack lens with its formal subtheme guidance. This yields 960 distinct resolved seeds without maintaining 960 disconnected scripts.

**Another angle** demonstrates that the same prompt can be played in more than one way.

### Two-card combination hints

After both cards are revealed, **How might these work together?** composes local guidance from six reusable structures:

- Channel
- Mask
- Friction
- Escalation
- Reinterpretation
- Counterweight

The engine treats the Stance as a lens and the Drive as initial pressure. It offers a blend and, when the policy permits, a possible next beat. It never generates a setting, partner reaction, plot, punchline, or ending.

### Coach hint policies

Every built-in and custom exercise can use:

- **Full coaching**
- **Nudges only**
- **After first attempt**
- **Hints off**

The policy is stored with the exercise session and travels in exercise share links and QR codes. It never shares cards, deck order, history, or identity.

### Local and deterministic

The coaching engine uses only bundled curated text, the existing Card Bible metadata, finite templates, and deterministic pattern ranking. It makes no cloud call and does not load an in-browser language model.

Validation covers all **480 cards**, **960 distinct resolved manifestation seeds**, **57,600 personal hands**, and **345,600 structural combination angles**.

Existing v0.19 deck state, sessions, prompts, custom exercises, and immutable Scene Log snapshots migrate in place. Old exercise links without a hint-policy parameter remain compatible and default to Full coaching.

See:

- `docs/IMPROMPT-HINT-BIBLE.md`
- `reports/hint-library-audit.md`
- `RELEASE-NOTES-v0.20.0.md`

## What is new in v0.19.0

v0.19.0 turns Imprompt’s central collaboration principle into an in-app **Scene Craft Guide**. The card library, stable IDs, prompt wording, independent-deck behavior, sessions, and immutable Scene Log snapshots remain unchanged.

### Scene Craft Guide

The expanded **Learn to play** screen uses mobile-friendly, accessible sections covering:

- Quick Start
- Stance, Drive, and shared-pattern distinctions
- How two Drives align, oppose, or become unequal
- The Convergence Rule
- A five-step method for finding the shared pattern
- “Secret does not mean cryptic”
- Why a Drive is not a win condition
- Postmortem questions
- Coach guidance for Mirror and Paired exercises

The guide’s core framing is:

> **Use the card to enter the scene. Use your partner to discover the scene.**

### Contextual guidance

- The concealed Drive card now calls itself **your initial pressure** and reminds players to let it bend when the scene finds a shared pattern.
- A compact **How two Drives become one scene** button opens the relevant guide section directly from active play, then returns to the same scene.
- Completed-scene history includes a postmortem prompt and a direct link to the reflection guide.
- The Learn screen remembers whether it was opened from the main menu, active play, or Scene Log and returns the player to that context.

### Stability

- No card IDs, titles, instructions, categories, subthemes, pack statuses, or `contentVersion` values changed.
- All 480 cards and v0.18 editorial-readiness evidence remain intact.
- Release assets use `?v=0.19.0`, and the service-worker cache is `imprompt-v0.19.0`.

See `docs/SCENE-CRAFT-GUIDE.md` for the standalone guide copy.

## What is new in v0.18.0

v0.18.0 is the first library-wide **editorial consolidation and playtest-readiness** release. It adds no new cards; it improves the distinctiveness, portability, traceability, and publication workflow of the complete 480-card library.

### Editorial consolidation

- Rewrites **24 cards** from the strongest semantic-overlap clusters.
- Broadens **4 narrow titles** while retaining their instructions.
- Preserves all 480 stable card IDs.
- Assigns `contentVersion: "0.18.0"` only to the 28 cards whose visible copy changed.
- Retains original wording in completed Scene Log snapshots.
- Resolves all **23 high-priority overlap clusters** for internal live-playtest readiness.

The revision ledger records the before-and-after copy and rationale for every changed card. Pack authoring matrices and candidate-pool documents now reflect the current selected wording while retaining a link to the historical ledger.

### Amber-subtheme review

All **20 subthemes** rated Amber in the v0.17 final-library audit received an internal metadata-blind review and structured opposite-deck pairing gauntlet:

- 200 cards reviewed
- 1,200 structured pairings assessed
- 0 premise conflicts identified in the internal pass
- residual similarities explicitly documented

This is a reproducible internal editorial check, not a substitute for independent human readers or live troupe evidence.

### Staged publication readiness

Core Foundations remains the published baseline. The nine expansion packs remain `playtest`, but are now marked `live-validation` and grouped into three publication waves:

1. **Grounded Foundations:** Everyday Friction, Power Games, Relationship Knots
2. **Pressure and Premise:** Emotional Pressure, Secrets & Schemes, Absurd Commitment
3. **Systems, Stakes, and Structure:** Rules, Rituals & Institutions, Competition & Consequences, Advanced Scene Engines

Every playtest pack still requires independent blind reads, repeated live exposures, veto/abandonment review, and final copy sign-off before publication.

### New editorial tooling

```bash
npm run audit:cards
npm run audit:editorial
npm run audit:hints
npm run audit:all
```

See:

- `docs/editorial/EDITORIAL-CONSOLIDATION-v0.18.0.md`
- `docs/editorial/AMBER-SUBTHEME-REVIEW-v0.18.0.md`
- `docs/editorial/STAGED-PUBLICATION-PLAN-v0.18.0.md`
- `docs/editorial/LIVE-VALIDATION-WORKSHEET-v0.18.0.md`
- `docs/editorial/SUBTHEME-READINESS-v0.18.0.csv`
- `editorial/v0.18.0/`
- `reports/editorial-readiness-audit.md`

## What is new in v0.17.0

v0.17.0 adds **Pack 10: Advanced Scene Engines** and completes the planned 480-card library:

- 24 new Stances: S217–S240
- 24 new Drives: D217–D240
- 240 Stances and 240 Drives
- 480 active cards total
- one new card in every formal Card Bible subtheme
- a complete 64-card candidate pool with editorial dispositions

Advanced Scene Engines is the veteran-level structural pack. Its prompts create callbacks, contradictions, delayed reveals, reversals, double binds, recontextualization, repeated details, and consequences that make earlier choices gain new meaning. The cards do not prescribe a plot twist. They give the holder an immediate playable behavior and a structural pressure that can emerge through listening.

The expansion deepens every Guided Exercise and is especially useful for custom coach challenges focused on scene architecture, subtext, foreshadowing, earned reversals, recurring patterns, or callbacks. Each phone continues to shuffle independently, and exercise links never share cards or deck order.

The pack is marked **playtest** pending blind reads and repeated live troupe use. Its cards are available throughout Open Play, category-focused draws, Mirror and Paired exercises, custom exercises, gallery search, Practice Coverage, and immutable Scene Log snapshots.

See:

- `docs/packs/ADVANCED-SCENE-ENGINES-PACK-BRIEF.md`
- `docs/packs/ADVANCED-SCENE-ENGINES-AUTHORING-MATRIX.md`
- `docs/packs/ADVANCED-SCENE-ENGINES-CANDIDATE-POOL.md`
- `cards/candidates/advanced-scene-engines-candidate-pool.json`

## What is new in v0.16.0

v0.16.0 adds **Pack 9: Competition & Consequences** as an active playtest pack:

- 24 new Stances: S193–S216
- 24 new Drives: D193–D216
- 432 active cards total
- one new card in every formal Card Bible subtheme
- a complete 64-card candidate pool with editorial dispositions

Competition & Consequences makes winning, losing, comparison, bargaining, sacrifice, accountability, and the price of success playable without requiring a literal sport, tournament, wager, or game-show premise. The cards ask what counts as a fair result, who owns the outcome, what someone is willing to risk, and what the next consequence will be.

The expansion most directly deepens **Status Clash**, **Crown & Heart**, **Past & Future**, **Pursuer & Avoider**, **Absurd Commitment**, and custom coach challenges centered on rivalry, negotiation, scorekeeping, teamwork, sacrifice, or accountability. Every phone still shuffles independently; exercise links never share cards or deck order.

The pack is marked **playtest** pending independent blind reads and repeated live troupe testing. Its cards are available throughout Open Play, category-focused draws, Mirror and Paired exercises, custom exercises, gallery search, Practice Coverage, and immutable Scene Log snapshots.

See:

- `docs/packs/COMPETITION-CONSEQUENCES-PACK-BRIEF.md`
- `docs/packs/COMPETITION-CONSEQUENCES-AUTHORING-MATRIX.md`
- `docs/packs/COMPETITION-CONSEQUENCES-CANDIDATE-POOL.md`
- `cards/candidates/competition-consequences-candidate-pool.json`

## What is new in v0.15.0

v0.15.0 adds **Pack 8: Rules, Rituals & Institutions** as an active playtest pack:

- 24 new Stances: S169–S192
- 24 new Drives: D169–D192
- 384 active cards total
- one new card in every formal Card Bible subtheme
- a complete 64-card candidate pool with editorial dispositions

Rules, Rituals & Institutions makes bureaucracy, customs, standards, process, documentation, precedent, ceremony, and tradition playable without requiring a fixed workplace or government premise. The cards ask how people preserve, interpret, enforce, resist, exploit, or hide inside systems.

The expansion most directly deepens **Status Clash**, **Relationship Pressure**, **Pursuer & Avoider**, **Absurd Commitment**, and **Instigator & Anchor**. Every phone still shuffles independently; exercise links never share cards or deck order.

The pack is marked **playtest** pending independent blind reads and repeated live troupe testing. Its cards are available throughout Open Play, category-focused draws, Mirror and Paired exercises, custom exercises, gallery search, Practice Coverage, and immutable Scene Log snapshots.

See:

- `docs/packs/RULES-RITUALS-INSTITUTIONS-PACK-BRIEF.md`
- `docs/packs/RULES-RITUALS-INSTITUTIONS-AUTHORING-MATRIX.md`
- `docs/packs/RULES-RITUALS-INSTITUTIONS-CANDIDATE-POOL.md`
- `cards/candidates/rules-rituals-institutions-candidate-pool.json`

## What is new in v0.14.0

v0.14.0 added **Pack 7: Absurd Commitment** as an active playtest pack:

- 24 Stances: S145–S168
- 24 Drives: D145–D168
- 336 active cards total
- a documented 64-card candidate pool and completed 48-slot matrix
- impossible-logic, grounded-reaction, world-building, and consequence metadata
- automatic insertion of Pack 7 IDs into existing independent decks

Absurd Commitment turns unusual premises into consistent, playable behavior rather than disconnected randomness. Its prompts emphasize literal commitment, coherent logic, practical grounding, repeatable patterns, and heightened consequences.

See:

- `docs/packs/ABSURD-COMMITMENT-PACK-BRIEF.md`
- `docs/packs/ABSURD-COMMITMENT-AUTHORING-MATRIX.md`
- `docs/packs/ABSURD-COMMITMENT-CANDIDATE-POOL.md`
- `cards/candidates/absurd-commitment-candidate-pool.json`
## What is new in v0.13.0

v0.13.0 adds **Pack 6: Secrets & Schemes** as an active playtest pack:

- 24 new Stances: S121–S144
- 24 new Drives: D121–D144
- 288 active cards total
- 64-card documented candidate pool
- completed 48-slot authoring matrix
- secrecy, investigation, misdirection, and strategy metadata
- automatic insertion of Pack 6 IDs into existing independent decks

Secrets & Schemes turns concealed information, uncertain motives, investigation, recruitment, confession, and plans under pressure into observable choices. It does not require a crime, detective, spy, or conspiracy premise. The actual secret remains open while the card supplies a private behavior, objective, concealment strategy, or repeatable engine.

The expansion materially deepens **Pursuer & Avoider**, **Status Clash**, **Crown & Heart**, **Past & Future**, **Relationship Pressure**, and custom coach challenges centered on information, trust, evidence, recruitment, suspicion, or misdirection. Every phone still shuffles independently; exercise links never share cards or deck order.

Secrets & Schemes is marked **playtest** pending independent blind reads and repeated live troupe testing. Its cards are available throughout Open Play, category-focused draws, Mirror and Paired exercises, custom exercises, gallery search, Practice Coverage, and immutable Scene Log snapshots.

See:

- `docs/packs/SECRETS-SCHEMES-PACK-BRIEF.md`
- `docs/packs/SECRETS-SCHEMES-AUTHORING-MATRIX.md`
- `docs/packs/SECRETS-SCHEMES-CANDIDATE-POOL.md`
- `cards/candidates/secrets-schemes-candidate-pool.json`

## What is new in v0.12.0

v0.12.0 adds **Pack 5: Emotional Pressure** as an active playtest pack:

- 24 new Stances: S97–S120
- 24 new Drives: D97–D120
- 240 active cards total
- 64-card documented candidate pool
- completed 48-slot authoring matrix
- emotional-pressure coach roles and motifs
- automatic insertion of Pack 5 IDs into existing independent decks

Emotional Pressure turns insecurity, validation, resentment, hope, grief, shame, and uncertainty into observable choices. The prompts do not ask performers merely to “be emotional.” They convert pressure into status behavior, reassurance seeking, practical care, concealment, recurring contradiction, hopeful reframing, or a specific objective.

The expansion materially deepens **Emotional Stakes**, **Crown & Heart**, **Relationship Pressure**, **Past & Future**, and custom coach challenges centered on vulnerability, hope, reassurance, grief, courage, shame, or emotional labor. Every phone still shuffles independently; no exercise shares cards or deck order.

Emotional Pressure is marked **playtest** pending independent blind reads and repeated live troupe testing. Its cards are available throughout Open Play, category-focused draws, Mirror and Paired exercises, custom exercises, gallery search, Practice Coverage, and immutable Scene Log snapshots.

See:

- `docs/packs/EMOTIONAL-PRESSURE-PACK-BRIEF.md`
- `docs/packs/EMOTIONAL-PRESSURE-AUTHORING-MATRIX.md`
- `docs/packs/EMOTIONAL-PRESSURE-CANDIDATE-POOL.md`
- `cards/candidates/emotional-pressure-candidate-pool.json`

## What is new in v0.11.0

v0.11.0 adds **Pack 4: Relationship Knots** as an active playtest pack:

- 24 new Stances: S73–S96
- 24 new Drives: D73–D96
- 192 active cards total
- 64-card documented candidate pool
- completed 48-slot authoring matrix
- relationship-specific coach roles and motifs
- automatic insertion of Pack 4 IDs into existing independent decks

Relationship Knots explores affection, rivalry, obligation, dependence, boundaries, shared history, partial forgiveness, and unfinished connection. The cards do not prescribe romance, family, friendship, or any other fixed label. They give only the holder a private relationship behavior, objective, secret, or recurring pattern.

The expansion materially deepens **Relationship Pressure**, **Emotional Stakes**, **Crown & Heart**, **Past & Future**, and custom coach challenges centered on attachment, loyalty, memory, repair, or boundaries. Every phone still shuffles independently; no exercise shares cards or deck order.

Relationship Knots is marked **playtest** pending independent blind reads and repeated live troupe testing. Its cards are available throughout Open Play, category-focused draws, Mirror and Paired exercises, custom exercises, gallery search, Practice Coverage, and immutable Scene Log snapshots.

See:

- `docs/packs/RELATIONSHIP-KNOTS-PACK-BRIEF.md`
- `docs/packs/RELATIONSHIP-KNOTS-AUTHORING-MATRIX.md`
- `docs/packs/RELATIONSHIP-KNOTS-CANDIDATE-POOL.md`
- `cards/candidates/relationship-knots-candidate-pool.json`

## What is new in v0.10.0

v0.10.0 adds **Pack 3: Power Games** as an active playtest pack:

- 24 new Stances: S49–S72
- 24 new Drives: D49–D72
- 144 active cards total
- 64-card documented candidate pool
- completed 48-slot authoring matrix
- pack brief, power-specific metadata, and playtest questions
- automatic insertion of Pack 3 IDs into existing independent decks

Power Games explores authority, legitimacy, leverage, dependency, hierarchy, access, patronage, succession, compliance, and the struggle over who gets to decide. The prompts remain portable: they can function among friends, relatives, coworkers, adventurers, performers, ghosts, or anyone negotiating influence.

The expansion materially deepens **Status Clash**, **Crown & Heart**, **Past & Future**, and custom coach challenges centered on authority or leverage. Every phone still shuffles independently; no exercise shares cards or deck order.

Power Games is marked **playtest** pending independent blind reads and repeated live troupe testing. Its cards are available throughout Open Play, category-focused draws, Mirror and Paired exercises, custom exercises, gallery search, Practice Coverage, and immutable Scene Log snapshots.

See:

- `docs/packs/POWER-GAMES-PACK-BRIEF.md`
- `docs/packs/POWER-GAMES-AUTHORING-MATRIX.md`
- `docs/packs/POWER-GAMES-CANDIDATE-POOL.md`
- `cards/candidates/power-games-candidate-pool.json`

## What is new in v0.9.0

v0.9.0 adds **Pack 2: Everyday Friction** as an active playtest pack:

- 24 new Stances: S25–S48
- 24 new Drives: D25–D48
- 96 active cards total
- 64-card documented candidate pool
- completed 48-slot authoring matrix
- pack brief, metadata profile, and playtest questions
- automatic insertion of new card IDs into existing independent decks

Everyday Friction turns small practical problems—routines, favors, scheduling, shared responsibilities, cleanup, etiquette, handoffs, and minor inconvenience—into playable character behavior without fixing a location or relationship.

The pack is marked **playtest** rather than fully published because independent blind reads and repeated live troupe testing remain pending. Its cards are nevertheless available in Open Play, focused category draws, Mirror and Paired exercises, the gallery, coverage, and Scene Log snapshots.

See:

- `docs/packs/EVERYDAY-FRICTION-PACK-BRIEF.md`
- `docs/packs/EVERYDAY-FRICTION-AUTHORING-MATRIX.md`
- `docs/packs/EVERYDAY-FRICTION-CANDIDATE-POOL.md`
- `cards/candidates/everyday-friction-candidate-pool.json`

## What was introduced in v0.8.0

v0.8.0 introduces the **Imprompt Card Bible**, the editorial and technical foundation for expanding the official library from 48 cards to:

- **240 Stances**
- **240 Drives**
- **10 official packs**
- **480 total cards**

This release does not flood the game with unreviewed prompts. It establishes the structure required to author the expansion without sacrificing the clarity and playability of the original deck.

### Canonical taxonomy

The seven existing visible categories remain stable, but each now has a formal subtheme structure:

- Four Stance categories × six subthemes each
- Direct Objectives × twelve subthemes
- Secrets & Avoidance × six subthemes
- Repeatable Behaviors × six subthemes

Every future 48-card pack must contribute one card to every subtheme. Across ten packs, every subtheme will contain exactly ten official cards.

### Ten-pack library plan

| # | Pack | Stance IDs | Drive IDs | Status |
|---:|---|---|---|---|
| 1 | Core Foundations | S01–S24 | D01–D24 | Published |
| 2 | Everyday Friction | S25–S48 | D25–D48 | **Live validation · Wave 1** |
| 3 | Power Games | S49–S72 | D49–D72 | **Live validation · Wave 1** |
| 4 | Relationship Knots | S73–S96 | D73–D96 | **Live validation · Wave 1** |
| 5 | Emotional Pressure | S97–S120 | D97–D120 | **Live validation · Wave 2** |
| 6 | Secrets & Schemes | S121–S144 | D121–D144 | **Live validation · Wave 2** |
| 7 | Absurd Commitment | S145–S168 | D145–D168 | **Live validation · Wave 2** |
| 8 | Rules, Rituals & Institutions | S169–S192 | D169–D192 | **Live validation · Wave 3** |
| 9 | Competition & Consequences | S193–S216 | D193–D216 | **Live validation · Wave 3** |
| 10 | Advanced Scene Engines | S217–S240 | D217–D240 | **Live validation · Wave 3** |

### Structured card metadata

All active cards are tagged with:

- Pack and content version
- Category and subtheme
- Difficulty
- Intensity
- Tone
- Interaction orientation
- Coach roles
- Motifs
- Recommended Open, Mirror, and Paired modes

The existing UI continues to use the same title, instruction, category, icon, and color. The deeper metadata supports future coach filters, exercise design, library auditing, and pack management.

### Editorial and automated acceptance

The package now includes:

- An 8,000+ word Card Bible
- Reusable authoring and review worksheets
- A pack-planning template
- Machine-readable card and pack schemas
- An automated validator for IDs, taxonomy, copy length, hidden-information rules, quotas, and duplicates
- A generated library audit report
- New tests that make the Card Bible part of the release contract

Start here:

- [`docs/IMPROMPT-CARD-BIBLE.md`](./docs/IMPROMPT-CARD-BIBLE.md)
- [`docs/CARD-AUTHORING-WORKSHEET.md`](./docs/CARD-AUTHORING-WORKSHEET.md)
- [`docs/CARD-REVIEW-SCORECARD.md`](./docs/CARD-REVIEW-SCORECARD.md)
- [`docs/PACK-BRIEF-TEMPLATE.md`](./docs/PACK-BRIEF-TEMPLATE.md)
- [`reports/card-library-audit.md`](./reports/card-library-audit.md)

## Existing game features

### Open Play

1. Each performer opens Imprompt on their own phone.
2. Select **Start Open Play**.
3. Leave both selectors on **Random All**, or focus either card on a category.
4. Tap each generic panel to draw and reveal a private card.
5. Tap a revealed card again to **Keep** it or **Veto & draw another**.
6. Play without announcing or quoting the prompts.
7. Tap **Scene complete** to save the final pair to the local Scene Log.

### Guided exercises

A coach can coordinate draw rules without sharing anyone's cards.

- **Mirror exercises** give every performer the same category pools on independently shuffled phones.
- **Paired exercises** give Player A and Player B different but complementary category pools.

Included Mirror exercises:

| Exercise | Stance | Drive |
|---|---|---|
| Status Clash | Status & Authority | Direct Objectives |
| Emotional Stakes | Emotional Assumptions | Random All |
| Absurd Commitment | Worldview & Absurdity | Repeatable Behaviors |
| Relationship Pressure | History & Relationship | Secrets & Avoidance |

Included Paired exercises:

| Exercise | Player A | Player B |
|---|---|---|
| Pursuer & Avoider | Random Stance + Direct Objectives | Random Stance + Secrets & Avoidance |
| Crown & Heart | Status & Authority + Direct Objectives | Emotional Assumptions + Secrets & Avoidance |
| Past & Future | History & Relationship + Secrets & Avoidance | Status & Authority + Direct Objectives |
| Instigator & Anchor | Worldview & Absurdity + Repeatable Behaviors | History & Relationship + Direct Objectives |

### Exercise sharing by QR

A coach may announce an exercise by name or display a QR code. The QR shares only the exercise configuration:

- Exercise name and structure
- Stance and Drive category pools
- Locked or suggested category controls
- Optional paired role assignment

It never shares card IDs, prompt text, shuffle order, Scene Log entries, scene count, or local deck identity.

### Custom exercise builder

Coaches can create and save custom Mirror or Paired exercises with:

- Custom name and focus
- Independent Stance and Drive pools
- Locked or adjustable categories
- Hidden or public role structure
- Local editing and deletion
- Chooser and role-specific QR codes

### Sessions, Scene Log, and practice coverage

Each exercise starts a local session at Scene 1 while preserving the broader independent deck. The Scene Log records:

- Final Stance and Drive
- Immutable copies of the wording actually played
- Exercise and role assignment
- Completion time
- Redraw totals

v0.8.0 snapshots also retain the deeper Card Bible metadata so future card revisions do not rewrite historical play.

### Card Gallery

The gallery supports:

- Stance and Drive tabs
- Category filters and totals
- Search by title, instruction, or category
- Full-card and compact-list views
- Previous, next, and random navigation

Gallery browsing never changes gameplay shuffle order.

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

Imprompt stores working state in browser local storage. A phone knows only its own:

- Shuffle order and unused cards
- Current scene and private prompts
- Category settings
- Guided-exercise assignment
- Sessions and Scene Log
- Saved custom exercises

The general **Invite players** QR always points to the plain public URL. Guided-exercise links contain only coaching configuration.

Existing v0.5.x through v0.14.0 state remains compatible. Pack 8 IDs are inserted at randomized positions in each phone’s remaining queues without resetting current prompts, sessions, completed scenes, custom exercises, or consumed earlier cards.

## Card-library architecture

The browser loads card content in this order:

```text
card-bible.js
    ↓
cards/core-foundations.js
    ↓
cards/everyday-friction.js
    ↓
cards/power-games.js
    ↓
cards/relationship-knots.js
    ↓
cards/emotional-pressure.js
    ↓
cards/secrets-schemes.js
    ↓
cards/absurd-commitment.js
    ↓
cards/rules-rituals-institutions.js
    ↓
cards.js
```

- `card-bible.js` owns the canonical taxonomy, pack plan, enums, coach roles, motifs, and ID helpers.
- Each official pack lives in its own file under `cards/` and registers itself with the browser.
- `cards.js` aggregates published and active playtest packs and preserves the existing `IMPROMPT_CARDS` API used by the application.

Future packs should not be pasted into one giant source file.

The deck engine also records the library IDs known by each local deck. When a future pack is published, only newly introduced IDs are inserted at randomized positions in the remaining queues. Current prompts, completed scenes, sessions, and previously consumed cards are preserved.

## Editing or adding cards

Follow the Card Bible rather than editing ad hoc.

1. Reserve an ID from the correct pack range.
2. Select the required category and subtheme.
3. Draft using `docs/CARD-AUTHORING-WORKSHEET.md`.
4. Add controlled metadata.
5. Run the automated audit.
6. Complete human review, blind-read testing, pairability testing, and live playtesting.
7. Change the card status to `published` only after acceptance.

The machine-readable schemas are:

```text
cards/card.schema.json
cards/pack.schema.json
```

The active pack modules are:

```text
cards/core-foundations.js       # published
cards/everyday-friction.js      # playtest
cards/power-games.js            # playtest
cards/relationship-knots.js     # playtest
cards/emotional-pressure.js     # playtest
cards/secrets-schemes.js        # playtest
cards/absurd-commitment.js       # playtest
```

## Run locally

The service worker and manifest require an HTTP origin rather than `file://`.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

A static-server extension such as Live Server may also be used in VS Code.

## Run tests and card audits

No third-party Node packages are required.

```bash
npm test
npm run audit:cards
npm run audit:cards:write
```

`npm test` validates the application, deck engine, exercises, share links, QR generation, all ten active packs, hidden-information heuristics, pack quotas, migration behavior, hint policies, local-generation request boundaries, cancellation, storage and runtime contracts. No external model is required for tests.

`npm run test:browser` runs optional offline DOM tests using Python Playwright and Chromium. These use a fake inference adapter, not real model execution. The exact dependency setup and real-device checklist are in `docs/LOCAL-HINT-ENGINE.md`.

`npm run audit:cards:write` regenerates:

```text
reports/card-library-audit.md
```

## Publish with GitHub Pages

This package is configured for:

```text
https://scalemailted.github.io/improv-card-game/
```

1. Place the contents of this folder directly at the repository root.
2. Commit and push to the `main` branch.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save and wait for deployment.

The app shell uses relative paths and works under the GitHub Pages project path. Optional inference lazily loads the version-pinned Wllama runtime from jsDelivr and the selected model from Hugging Face. Ordinary play never needs these downloads. GitHub Pages does not need a server API or an embedded API key.

After replacing an installed older version, close all old game tabs/windows and reopen online so the waiting service worker can activate. Never clear all browser site data just to update; that would also erase the independent deck and Scene Log. This archive does not deploy itself to the live URL.

## Project structure

```text
.
├── index.html
├── styles.css
├── card-bible.js
├── cards.js
├── exercises.js
├── deck-engine.js
├── app.js
├── manifest.webmanifest
├── sw.js
├── package.json
├── .nojekyll
├── README.md
├── RELEASE-NOTES-v0.7.0.md
├── RELEASE-NOTES-v0.8.0.md
├── RELEASE-NOTES-v0.9.0.md
├── RELEASE-NOTES-v0.10.0.md
├── RELEASE-NOTES-v0.11.0.md
├── RELEASE-NOTES-v0.12.0.md
├── RELEASE-NOTES-v0.13.0.md
├── RELEASE-NOTES-v0.14.0.md
├── RELEASE-NOTES-v0.15.0.md
├── RELEASE-NOTES-v0.16.0.md
├── RELEASE-NOTES-v0.17.0.md
├── RELEASE-NOTES-v0.18.0.md
├── cards/
│   ├── core-foundations.js
│   ├── everyday-friction.js
│   ├── power-games.js
│   ├── relationship-knots.js
│   ├── emotional-pressure.js
│   ├── secrets-schemes.js
│   ├── absurd-commitment.js
│   ├── rules-rituals-institutions.js
│   ├── competition-consequences.js
│   ├── advanced-scene-engines.js
│   ├── candidates/
│   │   ├── everyday-friction-candidate-pool.json
│   │   ├── power-games-candidate-pool.json
│   │   ├── relationship-knots-candidate-pool.json
│   │   ├── emotional-pressure-candidate-pool.json
│   │   ├── secrets-schemes-candidate-pool.json
│   │   ├── absurd-commitment-candidate-pool.json
│   │   ├── rules-rituals-institutions-candidate-pool.json
│   │   ├── competition-consequences-candidate-pool.json
│   │   └── advanced-scene-engines-candidate-pool.json
│   ├── card.schema.json
│   └── pack.schema.json
├── docs/
│   ├── IMPROMPT-CARD-BIBLE.md
│   ├── CARD-AUTHORING-WORKSHEET.md
│   ├── CARD-REVIEW-SCORECARD.md
│   ├── PACK-BRIEF-TEMPLATE.md
│   ├── editorial/
│   │   ├── EDITORIAL-CONSOLIDATION-v0.18.0.md
│   │   ├── AMBER-SUBTHEME-REVIEW-v0.18.0.md
│   │   ├── STAGED-PUBLICATION-PLAN-v0.18.0.md
│   │   ├── LIVE-VALIDATION-WORKSHEET-v0.18.0.md
│   │   ├── REVISION-LEDGER-v0.18.0.csv
│   │   ├── OVERLAP-RESOLUTION-v0.18.0.csv
│   │   └── SUBTHEME-READINESS-v0.18.0.csv
│   └── packs/
│       ├── EVERYDAY-FRICTION-PACK-BRIEF.md
│       ├── EVERYDAY-FRICTION-AUTHORING-MATRIX.md
│       ├── EVERYDAY-FRICTION-CANDIDATE-POOL.md
│       ├── POWER-GAMES-PACK-BRIEF.md
│       ├── POWER-GAMES-AUTHORING-MATRIX.md
│       ├── POWER-GAMES-CANDIDATE-POOL.md
│       ├── RELATIONSHIP-KNOTS-PACK-BRIEF.md
│       ├── RELATIONSHIP-KNOTS-AUTHORING-MATRIX.md
│       ├── RELATIONSHIP-KNOTS-CANDIDATE-POOL.md
│       ├── EMOTIONAL-PRESSURE-PACK-BRIEF.md
│       ├── EMOTIONAL-PRESSURE-AUTHORING-MATRIX.md
│       ├── EMOTIONAL-PRESSURE-CANDIDATE-POOL.md
│       ├── SECRETS-SCHEMES-PACK-BRIEF.md
│       ├── SECRETS-SCHEMES-AUTHORING-MATRIX.md
│       ├── SECRETS-SCHEMES-CANDIDATE-POOL.md
│       ├── ABSURD-COMMITMENT-PACK-BRIEF.md
│       ├── ABSURD-COMMITMENT-AUTHORING-MATRIX.md
│       ├── ABSURD-COMMITMENT-CANDIDATE-POOL.md
│       ├── RULES-RITUALS-INSTITUTIONS-PACK-BRIEF.md
│       ├── RULES-RITUALS-INSTITUTIONS-AUTHORING-MATRIX.md
│       ├── RULES-RITUALS-INSTITUTIONS-CANDIDATE-POOL.md
│       ├── COMPETITION-CONSEQUENCES-PACK-BRIEF.md
│       ├── COMPETITION-CONSEQUENCES-AUTHORING-MATRIX.md
│       ├── COMPETITION-CONSEQUENCES-CANDIDATE-POOL.md
│       ├── ADVANCED-SCENE-ENGINES-PACK-BRIEF.md
│       ├── ADVANCED-SCENE-ENGINES-AUTHORING-MATRIX.md
│       └── ADVANCED-SCENE-ENGINES-CANDIDATE-POOL.md
├── editorial/
│   └── v0.18.0/
│       ├── revision-ledger.json
│       ├── overlap-resolution.json
│       ├── amber-subtheme-review.json
│       ├── subtheme-readiness.json
│       └── publication-waves.json
├── tools/
│   ├── card-validator.js
│   ├── card-audit.js
│   └── editorial-audit.js
├── reports/
│   ├── card-library-audit.md
│   └── editorial-readiness-audit.md
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
    ├── card-bible.test.js
    ├── card-quality.test.js
    ├── editorial-consolidation.test.js
    ├── everyday-friction.test.js
    ├── power-games.test.js
    ├── relationship-knots.test.js
    ├── emotional-pressure.test.js
    ├── secrets-schemes.test.js
    ├── absurd-commitment.test.js
    ├── rules-rituals-institutions.test.js
    ├── competition-consequences.test.js
    ├── advanced-scene-engines.test.js
    ├── browser-card-loading.test.js
    ├── app-content.test.js
    ├── deck-engine.test.js
    ├── exercises.test.js
    ├── qr-core.test.js
    └── share-link.test.js
```

## Release discipline

For every app release, update together:

- `?v=` asset values in `index.html`
- `CACHE_NAME` and precache URLs in `sw.js`
- `version` in `package.json`
- current release notes
- applicable test expectations

For every card revision, preserve the card ID and update `contentVersion` according to the Card Bible.

See `vendor/THIRD-PARTY-NOTICES.md` for the locally bundled QR generator notice.
