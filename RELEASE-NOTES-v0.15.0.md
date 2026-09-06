# Imprompt v0.15.0 — Rules, Rituals & Institutions

**Release date:** 2026-09-06  
**Pack status:** Playtest

Imprompt v0.15.0 adds **Pack 8: Rules, Rituals & Institutions**, expanding the active library from 336 to **384 prompts** while preserving the independent-deck, Guided Exercise, Scene Log, gallery, QR-sharing, and offline architecture.

## New playable content

- 24 Stances: `S169–S192`
- 24 Drives: `D169–D192`
- 48 selected cards from a documented 64-card candidate pool
- one selected card in every formal Card Bible subtheme
- 192 active Stances and 192 active Drives across eight packs

The pack explores bureaucracy, customs, systems, standards, procedure, documentation, precedent, tradition, ritual, scope, approval, exceptions, and institutional memory. It treats systems as human behavior rather than as a fixed office or government premise.

## Representative prompts

### Stances

- **Order of Business**
- **Authority on Paper**
- **Certified Correct**
- **The Necessary Signature**
- **The Designated Translator**
- **There Must Be a Correct Form**
- **Tradition Outranks Explanation**
- **Fine, What’s the Process?**
- **Everything Is Policy**

### Drives

- **Co-Sign This**
- **You Haven’t Been Dismissed**
- **Get It on the Record**
- **Request an Exception**
- **Credit in the Minutes**
- **Outside the Scope**
- **Successful Compliance**
- **Warmly Enforced**
- **New Rule Required**

## Guided Exercise impact

The expansion adds procedural authority, shared customs, institutional memory, exception seeking, formal approval, compliance, records, and ritual escalation to every existing exercise. It most directly deepens **Status Clash**, **Relationship Pressure**, **Pursuer & Avoider**, **Absurd Commitment**, and **Instigator & Anchor**.

Each phone continues to shuffle independently. Coach links and QR codes share only exercise settings and optional role assignments; they never share cards, queue order, scene history, or player data.

## Card Bible update

The Card Bible advances to `1.7.0` and adds six coach roles:

- Administrator
- Compliance Keeper
- Interpreter
- Archivist
- Traditionalist
- Exception Seeker

It also adds eighteen controlled motifs for process, documentation, precedent, policy, bureaucracy, standards, ceremony, custom, and tradition.

## Editorial package

The repository includes:

- `docs/packs/RULES-RITUALS-INSTITUTIONS-PACK-BRIEF.md`
- `docs/packs/RULES-RITUALS-INSTITUTIONS-AUTHORING-MATRIX.md`
- `docs/packs/RULES-RITUALS-INSTITUTIONS-CANDIDATE-POOL.md`
- `cards/candidates/rules-rituals-institutions-candidate-pool.json`
- `tests/rules-rituals-institutions.test.js`

The candidate pool contains 48 selected cards, eight held concepts, and eight rejected concepts with written editorial rationale.

## Upgrade behavior

Opening v0.15.0 with a valid earlier deck preserves:

- the current scene and drawn prompts;
- existing sessions and completed Scene Log entries;
- immutable historical prompt wording;
- previously consumed cards and remaining queue order;
- Practice Coverage;
- saved custom coach exercises.

Only `S169–S192` and `D169–D192` are inserted at randomized positions in each phone’s remaining queues.

## Offline and cache behavior

The service-worker cache and all versioned asset URLs advance to `imprompt-v0.15.0`. The stable `sw.js` address and non-forced activation strategy remain unchanged. The new Pack 8 module is precached for offline play.

## Validation summary

The final release validates:

- 192 unique Stance IDs and 192 unique Drive IDs;
- unique titles and instructions across all 384 prompts;
- exact Pack 8 ID ranges and one-card-per-subtheme quotas;
- holder-specific hidden-information language;
- controlled metadata, copy length, and duplicate gates;
- 192-card nonrepeating complete-deck cycles;
- 48-card focused Stance and specialized Drive category cycles;
- v0.14.0-to-v0.15.0 migration without history loss;
- Guided Exercise and QR privacy contracts;
- browser loading order, versioned assets, and offline precache coverage;
- mobile and narrow-screen rendering.

Automated library audit target:

```text
Result: PASS
Available: 192 Stances + 192 Drives
Active packs: 8
Published packs: 1
Playtest packs: 7
Errors: 0
Warnings: 0
```

Rules, Rituals & Institutions is active with internal status `playtest`. Independent blind reads and repeated troupe use remain the final acceptance stage before publication.
