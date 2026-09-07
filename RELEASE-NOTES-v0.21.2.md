# Imprompt v0.21.2 — Concrete Fusion Repair

v0.21.2 corrects the two-card coaching regression in v0.21.1 while preserving the card-integrated **Veto** and **Need a nudge?** controls.

## What was wrong

The application loaded the Concrete Fusion module, but its seed extractor selected the first sentence of each resolved hint. That first sentence was the broad pack-level preface, such as “Keep the first move direct and easy to read.” The card-specific action was stored in the following sentence and was discarded from the generated first move.

As a result, combination hints named the selected cards but often gave broad advice that did not demonstrate how those particular cards could become one playable behavior.

## What is fixed

- Resolved card hints now store their **pack context** and **concrete action** as separate fields.
- The fusion engine consumes the concrete action rather than the generic preface.
- A new `hints/fusion-profiles.js` module supplies one performance method for every Stance subtheme, one pressure model for every Drive subtheme, and two contextual anchors for every official pack.
- Every fusion now combines the actual Stance title, Drive title, subthemes, pack contexts, concrete actions, and one of the six structural angles.
- The first move gives an observable action rather than an abstract instruction to “blend” the cards.
- The repeatable loop explains how to change the tactic after the scene responds.
- Three representative pairs receive hand-audited exemplar copy and serve as regression fixtures:
  - **Practical Realist + Not That Subject**
  - **Everything Is Policy + Stay Until We’re Okay**
  - **Top of the Ladder + Helpful Culprit**
- **Another angle** still cycles through Channel, Mask, Friction, Escalation, Reinterpretation, and Counterweight, but each angle now uses distinct concrete actions.

## Example

For **Practical Realist + Not That Subject**, the first suggested tactic is now:

> Accept the unusual premise, then immediately ask who is paying, when it starts, or what safety step is missing; keep that practical problem active whenever the conversation nears the forbidden subject.

That guidance depends on both cards: the Stance provides the practical questioning method, and the Drive makes that method a redirect.

## Interface continuity

The v0.21.1 card layout remains unchanged:

- **Veto** stays inside the bottom-left of each revealed card.
- **Need a nudge?** stays inside the bottom-right when the active hint policy permits it.
- The separate **How might these work together?** control appears after both cards are revealed.
- Tapping the card body keeps it.

## Data stability

No playable card changed in this release. All 480 card IDs, titles, instructions, categories, packs, and `contentVersion` values remain unchanged. Existing decks, sessions, coach exercises, QR links, and immutable Scene Log snapshots migrate without alteration.

## Technical versioning

- Application release: `0.21.2`
- Hint Library: `2.1.0`
- Concrete Fusion engine: `2.1.0`
- Fusion Profile library: `1.0.0`
- Service-worker cache: `imprompt-v0.21.2`
