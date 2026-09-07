# Imprompt v0.21.2 Build Verification

## Release focus

v0.21.2 repairs the pair-specific Concrete Fusion system while preserving the card-integrated actions introduced in v0.21.1.

The regression was traced to `hints/concrete-fusion.js`: each resolved card nudge contained a broad pack-context sentence followed by a concrete subtheme action. The v0.21.1 fusion extractor selected sentence zero, so the generated first move repeatedly received the broad preface and discarded the card-specific action.

The corrected release:

- stores `context` and `action` separately in every resolved card hint;
- uses the concrete card action in two-card fusion;
- adds 24 Stance fusion profiles and 24 Drive fusion profiles;
- adds two contextual anchors for each of the ten official packs;
- keeps six materially different structural angles;
- preserves the inline Veto and Nudge controls;
- changes no playable card copy or local player state.

## Representative regression fixtures

### Practical Realist + Not That Subject

The default hint now turns logistical problem-solving into the avoidance tactic:

> Accept the unusual premise, then immediately ask who is paying, when it starts, or what safety step is missing; keep that practical problem active whenever the conversation nears the forbidden subject.

### Everything Is Policy + Stay Until We’re Okay

The default hint turns emotional repair into an exit procedure:

> Connect two details into a policy, then name one missing step—an acknowledgment, agreement, or decision—that must be completed before the interaction can end.

### Top of the Ladder + Helpful Culprit

The default hint turns authority into control of the investigation:

> Before anyone asks, decide what should be examined first and assign yourself the role of coordinating it; volunteer one true detail that makes your own responsibility seem less likely.

## Automated verification completed

The clean source tree passed:

```text
npm test
npm run audit:cards
npm run audit:editorial
npm run audit:hints
```

Results:

```text
Application tests: PASS
Card Library Audit: PASS
Editorial Readiness Audit: PASS
Hint Library Audit: PASS
Errors: 0
Warnings: 0
```

The hint audit covered:

```text
Cards: 480
Resolved manifestation seeds: 960
Stance fusion profiles: 24
Drive fusion profiles: 24
Pack fusion anchors: 20
Personal Stance–Drive hands: 57,600
Concrete fusion angles: 345,600
```

Regression checks confirm that:

- the concrete action is separated from the broad pack context for every card seed;
- generic pack-preface text cannot substitute for the first move;
- changing either selected card changes the demonstrated combination;
- every hand produces six distinct structural angles;
- the known-pair fixtures above retain their audited concrete wording;
- holder-only, no-required-partner-response, and convergence rules remain enforced.

## Browser and responsive verification completed

The application was exercised in headless Chromium at:

- 412 × 915 Pixel-class mobile width;
- 320 × 760 narrow-phone width;
- 1280 × 900 desktop width.

At every viewport, the test:

1. loaded the complete browser module stack;
2. restored a deterministic **Practical Realist + Not That Subject** hand;
3. revealed both cards;
4. verified the inline Veto and Nudge controls remained inside each card;
5. opened the combination hint;
6. verified the pair-specific first move and all four concrete sections;
7. selected **Another angle** and confirmed the guidance changed;
8. checked for page-level JavaScript errors and horizontal overflow.

Results:

```text
Pair-specific first move: PASS
Another angle changes tactic: PASS
Inline actions remain inside cards: PASS
Horizontal overflow: 0 px at all tested widths
Page-level JavaScript errors: 0
```

## Interaction and data continuity

- Veto remains at the bottom-left inside each revealed card.
- Need a nudge? remains at the bottom-right when permitted by the active hint policy.
- The card body still keeps a revealed prompt.
- The separate two-card control appears after both cards are revealed.
- Full Coaching, Nudges Only, After First Attempt, and Hints Off remain supported.
- All 480 playable cards and their `contentVersion` values are unchanged.
- Existing decks, sessions, Scene Log snapshots, custom exercises, and QR behavior remain compatible.
- `hints/fusion-profiles.js` and all v0.21.2 assets are included in the service-worker precache.
