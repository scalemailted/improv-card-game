# Imprompt v0.21.1 Build Verification

## Release focus

v0.21.1 places each revealed card's two private actions inside the card surface:

- **Veto** at the bottom left.
- **Need a nudge?** at the bottom right when the active hint policy allows it.

The card body remains its own control and keeps the prompt when tapped after reveal. The controls are sibling buttons within the card wrapper rather than nested interactive elements.

## Behavioral checks

- Stance and Drive draw and reveal normally.
- Both inline actions remain inside their respective visual card bounds.
- Veto replaces only the selected card.
- A vetoed card returns to its deck and the replacement remains concealed.
- The other card and its state are preserved.
- The current category filter is preserved for the replacement draw.
- Nudge opens the correct private single-card coaching dialog.
- Card-body tap keeps a revealed card.
- Hint policies continue to govern Nudge visibility.
- Combination guidance remains available after both cards are revealed.

## Responsive checks

Browser interaction checks were run at:

- 320 × 760 pixels
- 412 × 915 pixels
- 1280 × 900 pixels

At all three sizes:

- Veto remained left of Nudge.
- Both controls remained within the card bounds.
- The document had no horizontal overflow.
- Draw, reveal, Nudge, Veto, replacement reveal, and Keep interactions completed without page errors.

## Automated checks

The following passed from a clean working tree:

```text
npm test
npm run audit:cards
npm run audit:editorial
npm run audit:hints
```

Audit summary:

```text
Cards: 480
Stances: 240
Drives: 240
Personal Stance–Drive hands: 57,600
Concrete fusion angles: 345,600
Card Library Audit: PASS
Editorial Readiness Audit: PASS
Hint Library Audit: PASS
Errors: 0
Warnings: 0
```
