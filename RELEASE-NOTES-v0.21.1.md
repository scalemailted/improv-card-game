# Imprompt v0.21.1 — Card-Integrated Actions

v0.21.1 is a focused mobile UX refinement for the active prompt screen.

## Veto and Nudge now live inside each card

After a card is revealed:

- **Veto** appears in the card’s bottom-left corner.
- **Need a nudge?** appears in the card’s bottom-right corner when the current coach policy permits hints.
- Both controls remain visually contained within the card boundary.
- The former full-width Nudge row beneath each card has been removed.

The card body remains a separate accessible control. Tapping it after reveal marks the card as kept. Vetoing is now a direct card-level action and draws a concealed replacement from the same selected category pool. The other card is untouched.

## Interaction and accessibility

The implementation avoids nesting buttons inside buttons. The card surface and its two action buttons are sibling controls within one card wrapper, visually overlaid inside the card while retaining valid HTML and independent touch targets.

The controls:

- remain usable at 320-pixel phone width;
- provide descriptive accessible labels;
- preserve at least a practical mobile touch target;
- do not trigger the underlying card when selected;
- follow Full Coaching, Nudges Only, After First Attempt, and Hints Off policies;
- remain hidden while a card is concealed.

## Concrete Fusion retained

The v0.21.0 Concrete Fusion panel remains included. Combination guidance continues to show one integrated way to play the pair, a first move, a repeatable loop, and an adaptation rule.

## Stability

No playable card copy, IDs, pack metadata, exercise definitions, independent deck state, Scene Log history, or QR privacy behavior changed. The service-worker cache and deployable asset URLs advance to `v0.21.1`.
