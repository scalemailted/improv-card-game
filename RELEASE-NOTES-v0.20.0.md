# Imprompt v0.20.0 — Nudge & Combination Hint System

v0.20.0 adds optional, fully local coaching guidance without changing any of the 480 playable cards.

## Player features

- **Need a nudge?** appears beneath each revealed Stance or Drive when the current exercise permits hints.
- Every card resolves to two audited, card-specific manifestation angles and tone-aware heightening guidance.
- The resolved copy combines the card’s formal subtheme with the distinctive lens of its official pack, so the same dramatic function manifests differently across Core, Everyday, Power, Relationship, Emotional, Secret, Absurd, Institutional, Competitive, and Advanced material.
- **How might these work together?** appears after both private cards are revealed.
- Two-card guidance combines the Stance and Drive through one of six reusable structures: Channel, Mask, Friction, Escalation, Reinterpretation, or Counterweight.
- **Another angle** rotates through controlled alternatives rather than generating an uncontrolled scene premise.
- Every hint is framed as one possible way in and directs the performer back to the partner.

## Coach controls

Every built-in or custom exercise supports one of four policies:

1. **Full coaching** — single-card nudges and full combination guidance.
2. **Nudges only** — concise behavioral help without deeper next-beat analysis.
3. **After first attempt** — players privately unlock hints after trying the cards once.
4. **Hints off** — no hint controls during play; the Scene Craft Guide remains available.

The selected policy is included in exercise links and QR codes. It does not expose the cards, deck order, Scene Log, or player identity.

## Hint Bible

The release adds `docs/IMPROMPT-HINT-BIBLE.md`, which defines:

- the holder-only contract;
- least-help-first guidance;
- 48-subtheme manifestation coverage;
- all six combination patterns;
- coach policies;
- language and convergence rules;
- versioning and privacy boundaries;
- automated and human acceptance tests.

## Local architecture

New runtime modules:

```text
hint-bible.js
hints/card-hints.js
hint-engine.js
```

The system uses bundled copy, existing card metadata, finite templates, and deterministic local ranking. It makes no model download and no network request. Actual LLM generation is explicitly deferred to a later experimental release.

## Coverage and validation

- 480 cards with resolved hint records
- 960 distinct card-specific manifestation seeds resolved across the library
- 96 audited subtheme behavior seeds and 20 audited pack manifestation lenses
- 48 of 48 formal subthemes and 10 of 10 official packs covered
- 57,600 personal Stance–Drive hands validated
- 345,600 generated structural angles checked
- 6 distinct combination patterns per hand
- 4 coach policies tested
- holder-only and convergence rules checked
- old exercise links without hint metadata remain compatible and default to Full coaching
- Scene Log snapshots remain unchanged and immutable


## Upgrade behavior

Existing v0.19 browser state migrates in place. Current prompts, deck queues, sessions, Scene Log snapshots, Practice Coverage, and saved custom exercises remain intact. Existing sessions and custom exercises without a stored hint policy default to **Full coaching**. Older exercise links without the `h` policy parameter also remain valid and default to Full coaching.

Hint state is scene-local. An **After first attempt** unlock applies only to the current scene and resets when the next scene begins. No hint text is written into the Scene Log, so optional coaching does not alter the historical card snapshot.

## Validation completed

The final source was checked through:

- the complete card, editorial, exercise, deck, QR, Scene Craft, and application test suite;
- exhaustive validation of all 57,600 personal Stance–Drive hands and all 345,600 structural angles;
- 960 distinct resolved manifestation-seed checks;
- Full coaching, Nudges only, After first attempt, and Hints off browser interaction flows;
- `Another angle` changes for both single-card and combination guidance;
- Pixel-class 412-pixel, narrow 320-pixel, and desktop Chromium layouts;
- horizontal-overflow checks at phone widths;
- service-worker precache and versioned-asset contract checks;
- JavaScript syntax, JSON parsing, and unique HTML-ID checks.

## Unchanged foundations

- No card ID changed.
- No card title or instruction changed.
- No card `contentVersion` changed.
- No new cards or packs were added.
- Existing deck state, sessions, custom exercises, and history migrate in place.
- Every phone still manages an independent deck.

The service-worker cache is `imprompt-v0.20.0`, and all deployable assets use `?v=0.20.0`.
