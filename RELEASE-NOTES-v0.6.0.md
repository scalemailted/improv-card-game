# Imprompt v0.6.0

## Scene Log

- Added a **Scene Log** main-menu option.
- Completing a scene records that phone’s final Stance and Drive, categories, completion time, and per-card redraw count.
- Entries are shown newest first and can be expanded for postmortem review.
- Only final played cards are logged; vetoed prompts return to their decks.
- History remains private in browser-local storage and is never included in the invite link.
- Starting a new independent deck clears the local history after confirmation.

## Category-focused drawing

- Added independent draw selectors to the concealed Stance and Drive panels.
- **Random All** remains the default.
- Stances can be focused on Status & Authority, History & Relationship, Emotional Assumptions, or Worldview & Absurdity.
- Drives can be focused on Direct Objectives, Secrets & Avoidance, or Repeatable Behaviors.
- A selection persists across scenes until changed.
- Veto replacements honor the category mode used to draw the original card.
- Focused categories draw without replacement until their category is exhausted, then begin a new category cycle.

## Deck and interface behavior

- Cards are now selected only when their generic panel is tapped; starting a scene no longer pre-draws both cards.
- **Scene complete** remains disabled until both prompts have been drawn.
- The v0.5.2 card layout, category colors, gallery, private invite QR, and independent deck model remain intact.
- Existing v0.5 deck state migrates without fabricating unavailable historical entries.

## Release delivery

- Updated persisted state to engine version 4.
- Added release-specific asset query strings to prevent mixed-version HTML, CSS, and JavaScript.
- Kept the service-worker URL stable and removed forced `skipWaiting()` activation.
- Updated automated engine, markup, sharing, migration, category, veto, history, responsive-width, touch, and short-viewport checks.
