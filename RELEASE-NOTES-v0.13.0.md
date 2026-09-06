# Imprompt v0.13.0 — Secrets & Schemes

## Summary

Imprompt v0.13.0 adds **Pack 6: Secrets & Schemes**, expanding the active library from 240 to **288 prompts** while preserving the existing independent-deck, Guided Exercise, Scene Log, gallery, and offline architecture.

The release adds:

- 24 Stances: `S121–S144`
- 24 Drives: `D121–D144`
- one new card in every formal Card Bible subtheme
- 64 documented candidates: 48 selected, 8 held, and 8 rejected
- six new coach roles and fifteen information-analysis motifs
- migration that inserts only the new Pack 6 IDs into existing local queues

## Pack identity

Secrets & Schemes explores concealment, investigation, recruitment, misdirection, confession, privileged information, and plans under pressure. Cards remain setting-independent and holder-specific. The pack does not require a crime, spy, investigator, or conspiracy premise.

Its central question is:

> **What do I do when information itself becomes the thing everyone needs, fears, protects, or uses?**

## Exercise impact

The new cards materially deepen:

- **Pursuer & Avoider**, through investigation, extraction, deflection, and concealment;
- **Status Clash**, through bluffing authority, information gatekeeping, and hidden leverage;
- **Crown & Heart**, through privileged trust, exclusion, care, and secrecy;
- **Past & Future**, through shared secrets, old cover stories, and unfinished truth;
- **Relationship Pressure**, through protective deception, confession, and confidence debts;
- custom exercises built around information, evidence, suspicion, recruitment, or strategy.

Exercise links and QR codes continue to share only configuration. Cards, shuffle order, history, and deck identity remain private to each phone.

## Editorial artifacts

- `docs/packs/SECRETS-SCHEMES-PACK-BRIEF.md`
- `docs/packs/SECRETS-SCHEMES-AUTHORING-MATRIX.md`
- `docs/packs/SECRETS-SCHEMES-CANDIDATE-POOL.md`
- `cards/candidates/secrets-schemes-candidate-pool.json`
- `cards/secrets-schemes.js`

The Pack 6 source is marked `playtest`. Structural and editorial selection is complete; independent blind reads and repeated live troupe testing remain pending.

## Card Bible update

The machine-readable Card Bible advances to library-plan version `1.5.0`. New coach roles are:

- Conspirator
- Informant
- Skeptic
- Witness
- Decoy
- Strategist

New motifs include alibi, clues, confession, conspiracy, deception, evidence, information, investigation, misdirection, motive, mystery, recruitment, strategy, suspicion, and witness.

## Existing-deck migration

Opening v0.13.0 with a valid earlier deck preserves:

- the current scene and drawn prompts;
- prior sessions and Scene Log entries;
- immutable historical wording;
- consumed cards and remaining queue order;
- Practice Coverage and saved custom exercises.

Only `S121–S144` and `D121–D144` are inserted at randomized positions in the remaining queues.

## Runtime and cache changes

The browser loading order now includes:

```text
cards/secrets-schemes.js
```

The service-worker cache and versioned asset URLs advance to `imprompt-v0.13.0`. The stable `sw.js` address and non-forced activation strategy remain unchanged.

## Validation

The final release contract checks:

- 144 unique Stance IDs and 144 unique Drive IDs;
- exact Pack 6 ID allocation;
- one Pack 6 card in every subtheme;
- no structural or editorial audit warnings;
- candidate-pool counts and selected-ID correspondence;
- full-deck and category-cycle behavior;
- v0.12.0-to-v0.13.0 migration without history loss;
- Guided Exercise and QR privacy behavior;
- browser script order, versioned assets, and offline cache coverage;
- mobile card draw/reveal behavior and narrow-screen layout.

The generated audit reports:

```text
Result: PASS
Available: 144 Stances + 144 Drives
Active packs: 6
Published packs: 1
Playtest packs: 5
Errors: 0
Warnings: 0
```
