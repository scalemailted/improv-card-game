# Imprompt v0.23.0 — Offline Act-It-Out Library

## Source and scope

Based on the supplied alternate v0.22.1 performed-hint build. This changes how hints are supplied; it does not revise the 480 playable cards, deck mechanics, exercise rules or historical scene snapshots.

## Runtime changes

- Removed Wllama/model selection/inference from the shipping player experience.
- Replaced both generic fallbacks and generated text with exact-ID stored performed examples.
- No runtime combination templates: complete pair records are compiled ahead of deployment.
- Gzip partitions, SHA-256 verification, plain JSON alternatives and a dedicated example cache.
- Lazy worker: decode only the requested partition; retain at most four pair partitions plus singles.
- Full offline download with file progress, pause/resume, verification, error handling and scoped removal.
- Bounded no-immediate-repeat selection and per-selection example counts.
- Explicit missing-data/stale-card error; no unannounced category fallback.
- Optional local example flags with user-triggered JSON export.
- Confirmed old-model cleanup without deleting game state.
- Veto/Nudge inside each card, no Kept status, compact action-and-line dialog.
- Existing coach policies and generic/exercise invitation privacy retained.

## Content delivered

480 individually specified card source entries yield 960 single-card performed examples. Every one of 57,600 pairs has at least two saved performances: 115,204 pair examples in total. Thirty-two pairs use 68 bespoke examples instead of the standard build-time composition. The complete gzip data is 3,858,519 bytes; uncompressed data is 28,044,035 bytes. No model weights or font files are included.

## Honest quality boundary

This is an **editorial-preview example dataset**. Most pair performances combine exact-card authored material during the build. Exact lookup, varied strings, complete coverage and valid first-person format do not prove good synthesis. The full pair corpus has not had individual human review or troupe playtesting. Even two syntactically distinct variants can be too similar in tactic. Flags identify records to replace with better bespoke examples. No source record is labeled live-tested.

## State and history

All ten playable card modules, card catalog/taxonomy, deck engine and exercise engine are byte-identical to the supplied ZIP. Existing queues, scenes, saved custom exercises and immutable completed-card snapshots are preserved. New example-cycle/feedback records have their own storage keys. Removing a downloaded example library or old AI files does not reset a deck.

## Validation scope

Existing tests and audits pass. All 116,164 example records were checked for structural coverage, versions, hashes, shape, lengths and per-selection uniqueness. Sixteen new reader tests use the actual worker with packaged bytes, native gzip decoding and SHA-256; fetch/cache transports are explicit fixtures. Chromium checks used actual app DOM/scripts/styles with a fixture worker at 320, 412 and 1280 pixels, plus native browser gzip decoding.

Real HTTP browser navigation is blocked by this environment (`ERR_BLOCKED_BY_ADMINISTRATOR`). Consequently, service-worker installation, real browser Cache Storage download persistence and airplane-mode relaunch on the deployed origin remain required tests. No on-device latency or peak-RAM numbers are claimed.

## Upgrade

Replace repository-root files with the complete archive, including `examples/`. Close old tabs after deployment and reopen. Then use Offline examples & storage to save all 241 files before an offline rehearsal. The ZIP contains both gzip and plain compatibility copies; only the selected download format is stored by the example installer.
