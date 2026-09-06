# Imprompt v0.7.0

## Guided exercise system

- Added **Open Play**, **Mirror**, and **Paired** session structures.
- Added four built-in Mirror exercises:
  - Status Clash
  - Emotional Stakes
  - Absurd Commitment
  - Relationship Pressure
- Added four built-in Paired exercises:
  - Pursuer & Avoider
  - Crown & Heart
  - Past & Future
  - Instigator & Anchor
- Mirror exercises give every performer the same category rules while each phone shuffles independently.
- Paired exercises give Player A and Player B different, complementary category rules.
- Guided sessions show a compact exercise/assignment indicator during play.
- Locked exercises prevent local category changes; suggested exercises allow them.

## Coach sharing and private assignments

- Added dynamic exercise QR generation entirely in the browser.
- Added a single chooser QR for Paired exercises.
- Added separate Player A and Player B QR codes.
- Added an exercise invitation screen before any local session is replaced.
- Hidden paired invitations reveal only the assignment selected for that phone.
- Open-role exercises can show both assignments as part of the coaching structure.
- Shared URLs contain only exercise configuration and never include cards, shuffle order, scene history, scene count, or deck identity.
- The existing general Invite QR remains a neutral link to the game.

## Custom exercise builder

- Added locally saved custom Mirror and Paired exercises.
- Added custom names and coaching notes.
- Added independent Stance and Drive category pools for each role.
- Added locked versus suggested category behavior.
- Added hidden versus open paired-role visibility.
- Added editing, deletion, local reuse, and QR sharing.
- Starting a new independent deck now preserves saved custom exercises.

## Sessions, Scene Log, and coverage

- Added distinct sessions so every exercise begins at Scene 1 without resetting the remaining deck order.
- Grouped Scene Log entries by session and assignment.
- Historical entries now store immutable snapshots of the actual card wording and exercise configuration.
- Added current-session and all-session category coverage views.
- Existing v0.5.x and v0.6.0 state can migrate into the new session model.

## Card Gallery

- Added category filters and visible card totals.
- Added search across titles, instructions, and category names.
- Added full-card and compact-list views.
- Previous, next, and random navigation now respect the active search and category filter.

## Mobile and release safeguards

- Added narrow-screen containment for long custom exercise and role names.
- Verified core flows at 320-, 360-, and 412-pixel phone widths and on desktop Chromium.
- Retained release-specific asset URLs and a stable service-worker address.
- Added the new exercise and QR assets to the offline cache.
- Added automated tests for sessions, presets, role-specific links, custom exercises, QR generation, history snapshots, migration, gallery contracts, and privacy invariants.
