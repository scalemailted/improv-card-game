# Imprompt v0.26.0-preview.2 — Verification

## Changes actually made

The source is the complete supplied/retrievable v0.26.0-preview.1 checkpoint. Nine new pair-dialogue records were rewritten and recorded with two passes of the same coach-1.0 rubric. The endorsed hamster exchange is unchanged. The original blank batch packet is preserved, and its completion pointer identifies the actual completed reviews.

A complete comparison of all 116,160 packaged example records against preview.1 found exactly nine dialogue changes and 116,151 unchanged records. No scene had an unaccounted metadata-only change. All 960 single-card dialogues and the endorsed hamster scene are identical to preview.1. Seventeen protected sources, including the ten card packs, catalog, Card Bible, deck/exercise engines, stylesheet and single/transfer authoring inputs, are byte-identical.

## Executed checks

- `npm run build:examples`: all 241 gzip/JSON partitions rebuilt from canonical sources.
- `npm test`: complete application and data suite passed, including the new bounded-batch tests.
- `npm run audit:all`: card, editorial-manifest, complete example corpus, historical single-dialogue ledger and new coach-ledger integrity checks passed.
- `npm run test:browser`: gameplay draw/reveal, pair rotation, single hint, veto, scene history, hint policies, storage UI, missing-data behavior, stale result protection and native gzip decompression passed at tested widths.
- `python tools/browser-coach-batch-smoke.py`: all ten reviewed exchanges were rendered by the actual viewer script at 320, 412 and 1280 CSS pixels, for 30 record/viewport checks. Both alternatives and all five dropdown selections agreed with shipped source. No page errors or horizontal overflow appeared.
- A separate screenshot used the actual main game modal and revised fern dialogue at 412 pixels.
- HTML IDs are unique (287 in the app, 7 in the review viewer). Edited scripts passed Node syntax checks. Active asset addresses use preview.2 while historical scene and ledger revisions remain unchanged.

The tests for fixed dialogue snippets were updated only for the explicitly rewritten examples. The former constraint that a pair's alternative letter must equal its source-seed alternative letter was replaced with a check that each seed names an actual scene for the correct card; the new ledger verifies its exact dialogue hash. The retained hamster exampleVersion no longer needs to equal every future app release version.

## Test boundary

The local HTTP server returned HTTP 200 to curl. Chromium navigation to that same localhost server failed with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. The browser tests therefore used explicitly simulated worker-message transport and storage with real packaged records. The production worker and gzip/hash/record paths were exercised separately by the inherited Node tests against real dataset bytes.

These checks are not native hosted service-worker installation, a physical Pixel performance benchmark, or an airplane-mode restart certification. They also do not certify humour. Ratings are internal editorial judgments with explicit turn evidence; independent human blind reading and live troupe validation remain absent.

## Audit scope

New-rubric progress is 10 pair scenes of 116,160 total scenes. Zero single scenes have received coach-1.0. The 960 single-card rewrites in v0.25 remain intact and should not be confused with a completed new-rubric pass. 116,150 scenes remain pending. Most pair records remain compiled drafts, not individually re-reviewed scenes.

No unrecovered JSON draft is claimed as incorporated. Preview.2 is newly completed bounded work, not recovered progress from the interrupted attempt.

## Deployment

Use the complete ZIP with index.html at its root. Existing independent decks and Scene Logs remain in their unchanged storage schema. Save this dataset for offline use after deployment; do not clear all site data. The read-only tools/checkpoint-example.html viewer shows the five reviewed pairs without changing any hand or scene history.
