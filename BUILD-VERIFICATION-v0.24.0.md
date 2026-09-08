# Imprompt v0.24.0 — Build verification

## What was built

A full refactor of the supplied `imprompt-improv-card-game-v0.23.0-offline-act-it-out(2).zip`. The 480 playable cards, catalog, Card Bible, deck engine and exercise engine are unchanged. Fourteen protected module hashes are recorded in `reports/source-preservation-v0.24.0.json`.

The old runtime coaching modules, generic quick-hint files and associated retired test suites were removed. Availability policies retain their saved IDs, but control example scenes rather than coaching depth. No model binaries, language-model loader or installer is included.

## Executed checks

- Complete current `npm test`: passed. Includes the existing card, editorial, pack, deck, exercise, QR, history and UI contracts, 16 compressed-reader unit tests, and five new scene-specific tests.
- `npm run audit:all`: card and editorial-manifest audits passed, and the new scene audit validated all 116,160 records (960 single scenes and 115,200 pair scenes).
- Full source fingerprints, source-seed references, three-/five-turn actor order, nonempty speech, word budgets, per-selection distinct alternatives, gzip/raw identity and SHA-256 integrity checked across all 241 partitions.
- Actual worker source tested with real packaged bytes and native Node gzip streams. Transport and Cache Storage were explicitly simulated. Tests include full-library installation, repeat verification without downloading, damaged-cache repair, missing offline data, disabled storage, exact-card version mismatch, and a four-pair-partition parsed-data limit.
- Chromium DOM and interaction tests passed at 320, 412 and 1280 CSS-pixel widths. They exercise actual app scripts, new rendering, short-only policy, availability gating, individual veto, another scene, review flags, scene completion/history, missing-data errors, stale async responses and settings. The modal stays within the tested viewport.
- Chromium native DecompressionStream successfully decoded the actual packaged single-scene gzip file.
- 287 unique HTML IDs; 45 JavaScript files passed syntax checks; JSON documents parsed; no font, model or inference binary is included.

Detailed logs and counters are in `reports/`. `tools/browser-examples-smoke.py` uses an explicit worker-message and storage fixture to supply the actual generated records. It does not disguise fixtures as native deployment tests.

## Important execution boundary

The local HTTP server returned valid responses to curl, but Chromium navigation to localhost failed with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Consequently, real hosted service-worker registration, worker imports over HTTP, full browser Cache Storage installation, and a physical Pixel airplane-mode restart were **not** established here. No measured smartphone speed, peak RAM, or battery claim is made.

Before rehearsal, deploy all files together, close old app tabs, save the complete example library, reload while connected, then test a different pair in airplane mode. Do not clear all site data, which would erase the player's deck and history.

## Content-quality boundary

The 960 individual exchanges have card-specific authored follow-through. Twenty-five pairs contain 50 bespoke scene records. The remaining 115,150 pair records are precomposed editorial drafts using the actual single-card scenes and authored Stance transfer methods. They have not all been individually read by independent reviewers or live-tested.

Tests establish coverage, data integrity, format and source dependence. They do not establish that every pair has a convincing causal blend, that every B reply feels natural, or that every sketch is funny. The current examples are an editorial preview with in-app review flagging, not a promoted human-validated publication.
