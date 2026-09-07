# Imprompt v0.17.0 Final Library Audit

**Audit target:** `imprompt-improv-card-game-v0.17.0-advanced-scene-engines`
**Audit date:** 2026-09-07

## Executive verdict

| Question | Verdict | Meaning |
|---|---|---|
| Is the ten-pack construction roadmap complete? | **PASS** | All 10 planned packs, 240 Stances, 240 Drives, 480 cards, 48 subthemes, and reserved ID ranges are present and active. |
| Does the application pass its current automated tests? | **PASS** | The package test suite and card audit both complete with zero reported errors or warnings. |
| Is the v1.0 publication roadmap complete? | **NO** | Core Foundations is published; Packs 2–10 remain marked `playtest`, and the Card Bible still requires blind reads, pairability testing, live exposures, final copy editing, and publication review. |
| Are the cards broadly generalized? | **PASS WITH MINOR COPY EDITS** | The instructions are overwhelmingly setting-independent and holder-specific. Four titles are narrower than their instructions and should be broadened before v1.0. |
| Are all 480 concepts sufficiently distinct? | **NOT YET** | Exact duplicates are absent, but a manual semantic review found 23 high-priority overlap clusters involving 47 cards. Resolving them requires at least 24 targeted rewrites or replacements. |

> **Bottom line:** v0.17.0 completes the library-building roadmap, but it should be treated as a complete **playtest library**, not yet the final published v1.0 library.

## Audit method

The audit combined:

1. A clean extraction of the supplied ZIP.
2. The repository's complete `npm test` suite.
3. The repository's `npm run audit:cards` validator.
4. Count, ID-range, category, subtheme, metadata, and pack-status inspection.
5. A full holder-only and portability review of all 480 titles and instructions.
6. Lexical similarity checks using word and character overlap.
7. A manual semantic comparison of all 48 subthemes, ten cards per subtheme.

The automated validator is useful for exact duplication and schema errors, but its near-duplicate warning threshold is deliberately conservative. It does not detect many paraphrases that create the same playable behavior. The manual subtheme review is therefore the decisive part of this audit.

## Roadmap completion

### Construction roadmap

| Measure | Required | Found | Status |
|---|---:|---:|---|
| Official pack slots | 10 | 10 active | PASS |
| Stances | 240 | 240 | PASS |
| Drives | 240 | 240 | PASS |
| Total cards | 480 | 480 | PASS |
| Formal subthemes | 48 | 48 | PASS |
| Cards per subtheme | 10 | 10 | PASS |
| Category totals | Exact planned quotas | Exact | PASS |
| Reserved IDs | S01–S240 / D01–D240 | Complete | PASS |

### Publication roadmap

| Measure | v1.0 requirement | Current status |
|---|---|---|
| Published packs | 10 | 1 |
| Published Stances | 240 | 24 |
| Published Drives | 240 | 24 |
| Blind-read evidence | Every card | Not recorded for Packs 2–10 |
| Pairability evidence | Every card | Not recorded for Packs 2–10 |
| Live playtest evidence | Every card | Not yet complete |
| Final semantic duplication review | Every card | This audit identifies a revision queue |

The correct interpretation is therefore:

- **Authoring and technical integration:** complete.
- **Editorial acceptance and publication:** still in progress.

## Generalization and hidden-information audit

### What passed

- No card fixes a named person, named location, branded setting, or required genre.
- No Stance explicitly dictates another performer's private thoughts or guaranteed reaction.
- Drives pursue responses but do not guarantee success.
- Relationship language is generally broad enough to support friends, relatives, coworkers, rivals, strangers with history, fantasy roles, or invented institutions.
- Pack flavor usually changes the lens without requiring a literal workplace, courtroom, tournament, spy story, therapy scene, or domestic setting.
- Advanced Scene Engines generally gives an immediate behavior plus a later structural pressure rather than merely instructing the player to reveal a twist.

### Minor generality edits recommended

| Card | Current title | Why review it | Suggested direction |
|---|---|---|---|
| S130 | Competing Detectives | The instruction is broad, but the title nudges players toward a detective premise. | `Competing Investigators` or `First to Solve It` |
| S209 | Worth Keeping on the Team | “Team” is usable, but narrower than the instruction's broader belonging engine. | `Worth Keeping Around` or `Earn My Place` |
| S221 | The Student Rewrites the Lesson | The title fixes a student/teacher image more strongly than necessary. | `I Meant to Teach That` or `The Lesson Was Mine` |
| D177 | Credit in the Minutes | “Minutes” suggests a formal meeting even though the instruction works anywhere. | `Put It on the Record` |

These are title-level refinements, not failures of the underlying instructions.

## Semantic distinctiveness audit

The 48 subthemes were classified as follows:

| Rating | Subthemes | Interpretation |
|---|---:|---|
| Green | 19 | The ten cards share a family but usually create distinct first moves and escalation paths. |
| Amber | 20 | Usable, but one or more broad umbrella cards or close pairs may feel repetitive in unrestricted play. |
| Red | 9 | Contains at least one strong semantic collision that should be rewritten before publication. |

This does **not** mean the subtheme architecture is wrong. Ten cards in one subtheme are supposed to be related. The publication standard should be:

> Same dramatic family, but a meaningfully different first move, escalation path, pairing behavior, or consequence.

### High-priority overlap clusters

The following are the clearest collisions. Each cluster is disjoint from the others, so resolving all of them requires revising at least one card per pair and two cards in the three-card cluster: **24 minimum revisions**.

| # | Cards | Shared playable engine | Recommended editorial action |
|---:|---|---|---|
| 1 | S05 — The Protégé Problem <br> S53 — I Made You Ready | Both claim another performer’s competence as proof of the holder’s teaching and continuing seniority. | Keep S05 as the broad Core engine; rewrite S53 around succession, independence, or loss of influence. |
| 2 | S10 — Old Rivals <br> S202 — Permanent Scoreboard | Both turn nearly every event into points on an ongoing rivalry scoreboard. | Keep S10; give S202 a consequence or rule for how the remembered score changes present choices. |
| 3 | S11 — Only You <br> S83 — My First Call | Both make one person the holder’s primary trusted resource while concealing dependence. | Keep S11; rewrite S83 around reflexive first contact or habit without repeating the trust/dependence engine. |
| 4 | S12 — After What Happened <br> S108 — The Feeling Never Left | Both keep an old hurt emotionally present and filter current offers through it. | Keep S12; make S108 use a distinct trigger, coping behavior, or attempted repair pattern. |
| 5 | S16 — For Their Own Good <br> S208 — I Decide What You Can Risk | Both control another person’s choices while framing that control as protection from consequences. | Keep S16; rewrite S208 around unequal risk, consent to risk, or who bears consequences. |
| 6 | S24 — The Grand Design <br> S144 — Everything Connects | Both interpret coincidences, interruptions, and doubt as evidence of one larger hidden design. | Keep S24; rewrite S144 around testing competing explanations or managing information rather than broad pattern certainty. |
| 7 | S28 — Regular Around Here <br> S172 — Knows the Customs | Both perform insider status through routines or unwritten rules while hiding uncertainty. | Keep S28; rewrite S172 so the holder enforces or translates customs rather than pretending familiarity. |
| 8 | S73 — Emotional Seniority <br> S77 — Older in This Relationship | Both claim superior authority to interpret a relationship because of emotional seniority or longer memory. | Keep S73; rewrite S77 around archival memory, precedent, or generational rank without claiming the same interpretive authority. |
| 9 | S122 — Authority by Bluff <br> S218 — One Detail Could Undo Me | Both project control while fearing that one question or recurring detail will expose how little authority they possess. | Keep S122; make S218 about a detail that reverses status or changes meaning rather than merely exposing a bluff. |
| 10 | S148 — Obviously One of Us <br> S161 — I Get the Joke | Both overaccept bizarre developments to prove belonging while concealing confusion. | Keep S148; rewrite S161 around social timing, shared humor, or joining a pattern rather than generic belonging-through-acceptance. |
| 11 | S168 — The Universe Is Rhyming <br> S240 — Everything Rhymes Eventually | Both treat repeated words, shapes, or actions as rhyming evidence of one grand pattern. | Keep S168; rewrite S240 around callbacks changing consequence or relationship meaning, not another cosmic pattern. |
| 12 | S35 — You Know the System <br> S179 — I Need Your Access | Both rely on another person’s system knowledge or access while resisting the influence created by that dependence. | Keep S35; rewrite S179 around gatekeeping, sponsorship, or permission rather than navigational dependence. |
| 13 | S59 — Indispensable Rival <br> S203 — The Rival I Need | Both need a rival’s judgment or presence in order to sharpen performance while denying the dependence. | Keep S59; rewrite S203 around mutual escalation, identity, or fear of winning without the rival. |
| 14 | D26 — One Last Thing <br> D218 — One More Unresolved Reason | Both prevent departure by producing one more unresolved reason whenever the previous reason ends. | Keep D26; make D218 reopen an earlier reason with changed meaning rather than simply adding another. |
| 15 | D07 — Join Me <br> D127 — Join the Inner Circle | Both recruit someone into a secret plan; the latter mainly adds exclusivity and partial information. | Keep D07; rewrite D127 around recruiting a specific function such as witness, decoy, gatekeeper, or keeper of the secret. |
| 16 | D13 — Helpful Culprit <br> D133 — The Helpful Suspect | Both hide responsibility for causing the problem while eagerly organizing its investigation. | Keep D13; rewrite D133 around steering suspicion, controlling evidence, or protecting a second culprit. |
| 17 | D16 — Confess First <br> D136 — Confess Before I Do | Both maneuver another person into confessing before the holder reveals anything. | Keep D16; rewrite D136 around eliciting motive, exchanging partial admissions, or confirming a theory. |
| 18 | D19 — Everything Is a Contest <br> D211 — Turn It into a Tiebreaker | Both turn every disagreement into another competition meant to settle who is better or right. | Keep D19; rewrite D211 around formal rematches, score rules, or consequences of a tie. |
| 19 | D36 — Hand It Over <br> D60 — Yield Control | Both make another person surrender control of a task, decision, resource, or authority symbol. | Keep D36; rewrite D60 around a public transfer of legitimacy, delegation, or ceremonial yielding. |
| 20 | D50 — Not Dismissed <br> D170 — You Haven’t Been Dismissed | Both keep someone present by treating departure as something that requires the holder’s permission or completion of a final formality. | Keep D50; rewrite D170 around jointly completing a ritual or acknowledging a transition rather than permission to leave. |
| 21 | D59 — Obey Without Explanation <br> D155 — Prove You Accept the Premise <br> D179 — Follow the Custom | All use increasingly inconvenient demands or formalities as tests of obedience, belief, or respect. | Keep D59; redesign D155 and D179 so one tests enacted belief and the other tests interpretive respect without repeating escalating inconvenience. |
| 22 | D135 — A Kinder Version <br> D159 — A Kinder Impossible Truth | Both protect someone with a kinder, edited version of a harsher truth; the impossible framing is mostly cosmetic. | Keep D135; rewrite D159 around sustaining impossible hope through practical actions or evidence rather than another kinder lie. |
| 23 | D137 — Exactly as Planned <br> D161 — That Was Phase One | Both treat every failure as a necessary phase proving that the plan is proceeding exactly as intended. | Keep D137; rewrite D161 so failure changes the goal, reveals a new rule, or creates a distinct next phase. |

### Red subthemes

- **Stance / Status & Authority / Mentorship & Rank**
- **Stance / Emotional Assumptions / Care & Control**
- **Stance / Worldview & Absurdity / Pattern & Grand Meaning**
- **Drive / Direct Objectives / Recruit an Ally**
- **Drive / Direct Objectives / Test Loyalty**
- **Drive / Secrets & Avoidance / Conceal Culpability**
- **Drive / Secrets & Avoidance / Protective Deception**
- **Drive / Secrets & Avoidance / Induce a Confession**
- **Drive / Secrets & Avoidance / Reframe Failure**

These nine subthemes should receive a deliberate rewrite pass before any pack is promoted from `playtest` to `published`.

### Amber subthemes

Amber groups are not automatically defective. They usually contain either:

- a broad Core Foundations card that naturally subsumes later specialized cards;
- repeated sentence architecture with different thematic objects; or
- a close pair whose distinction may be clear in editing but not memorable after live play.

The decisive test for Amber groups is not another automated similarity score. It is whether performers who encounter both cards in one rehearsal remember them as different engines.

## Notable systemic causes of overlap

### 1. The one-card-per-subtheme-per-pack rule

The quota system successfully guarantees coverage, but it also pressures every pack to create a themed version of the same 48 dramatic functions. In several subthemes, the pack noun changes while the underlying action remains identical.

The rule should remain, but future editorial review should allow a selected card to be replaced when the pack treatment does not materially change the behavior.

### 2. Broad Core cards act as umbrellas

Cards such as `The Grand Design`, `Merciful Lie`, `Fake the Expertise`, `Everything Is a Contest`, and `Yes, but My Way` intentionally define broad foundations. Later cards should not be rejected merely because they specialize those foundations. They should be rejected only when the specialization does not alter the player's first move, escalation, or interaction.

### 3. Pack skin sometimes substitutes for a new engine

The clearest examples occur when the same template is repeated with a new object:

- hide that you caused the problem while helping investigate it;
- make increasingly inconvenient demands to test commitment;
- present every failure as a planned phase;
- recruit someone into a secret plan;
- act like an insider while concealing unfamiliarity.

These are the cards most likely to feel repetitive even though their wording is different.

## Recommended next release

The next release should **not** add Pack 11. The ten-pack library is complete.

Recommended milestone:

> **Imprompt v0.18.0 — Editorial Consolidation & Playtest Readiness**

Its scope should be:

1. Rewrite or replace the minimum 24 cards in the high-priority clusters.
2. Review the 20 Amber subthemes through blind reads and random-pairing tests.
3. Broaden the four title-level generality concerns.
4. Increase each revised card's `contentVersion` while preserving its stable ID.
5. Preserve historical Scene Log wording through the existing immutable snapshots.
6. Add a structured playtest export or review sheet so blind-read, veto, abandonment, and pairability evidence can be recorded.
7. Promote packs from `playtest` to `published` only after their 48 cards meet the Card Bible's human thresholds.

## Proposed publication order

Promoting all nine expansion packs simultaneously would make it difficult to isolate weak cards. A safer order is:

1. Everyday Friction
2. Power Games
3. Relationship Knots
4. Emotional Pressure
5. Secrets & Schemes
6. Absurd Commitment
7. Rules, Rituals & Institutions
8. Competition & Consequences
9. Advanced Scene Engines

Each pack should move to `published` only after:

- semantic collisions are resolved;
- at least three blind readers understand each prompt;
- pairability testing succeeds against mixed opposite-deck cards;
- repeated troupe play produces acceptable veto and abandonment rates;
- copy revisions are frozen for that content version.

## Final determination

v0.17.0 is a successful completion of the **480-card construction roadmap** and a credible full-library playtest build.

It is not yet accurate to call all 480 cards final or non-overlapping. The library's generality is strong, but semantic distinctiveness needs one focused consolidation pass and live evidence. The correct next phase is quality reduction—not additional quantity.