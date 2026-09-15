# v0.26.0-preview.1 verification

## Scope

Full deployable source checkpoint based on the user-supplied v0.25.0 ZIP. One edited scene, a rubric and evidence record, bounded review export tools, two pending packets and a read-only checkpoint viewer. It is not a completed global editorial audit.

## Actually executed

- `npm run build:examples`: rebuilt all content-addressed JSON/gzip partitions and updated both manifests and the singleton service-worker precache.
- `npm test`: complete inherited test command plus five checkpoint tests passed. Fixed stale release-address and intentionally replaced dialogue fixtures while retaining their functional assertions.
- `npm run audit:all`: card, historical editorial, full example-data integrity, baseline dialogue ledger and new checkpoint-ledger audits passed.
- Compared every one of 116,160 old and new runtime records. Exactly `S67+D101-a` changed; all other 116,159 records are identical. IDs and coverage retained.
- Verified 18 protected files byte-for-byte, including all ten card packs, both engines, catalog, Card Bible, hint policies, stylesheet, single-scene source and Stance transfer source.
- Browser DOM/touch tests at 320, 412 and 1280 pixels passed: five-turn rendering, switching examples, veto isolation, single hint, Scene Log, hint policies, error/retry and stale-response handling.
- Those browser tests use explicit worker/storage fixtures. Native Chromium gzip decompression tested against actual shipped compressed bytes. Worker tests separately use actual dataset bytes and native Node decompression/hashes with simulated transport/cache.
- Read-only viewer and export/audit JavaScript passed syntax checks. Batch export produced ten cards/twenty scenes and five pairs/ten scenes; no scores were generated automatically.
- Preview screenshots show the actual packaged hamster dialogue in the unchanged production renderer.

Evidence is under `reports/checkpoint-*.log`, `reports/checkpoint-source-comparison.json`, `reports/coach-checkpoint-audit.json`, `reports/native-checkpoint-probe.json` and `reports/checkpoint-previews/`.

## Native deployment boundary

A local development server was started for a genuine HTTP test. Chromium navigation failed with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. The server was stopped afterwards. Native hosted service-worker installation, native browser worker fetch/cache across restart and physical Pixel airplane-mode behaviour therefore remain unverified here. No phone-speed, memory, battery or live-troupe-quality claim is made.

## Editorial boundary

The new coach-1.0 ledger contains one original/revision pair with two internal score passes and turn-specific evidence. The user's endorsement applies to the exact hamster transcript. It does not certify all hints. Full-library new-rubric review and independent human/live testing are still pending.

The previous interrupted draft JSON files were not recoverable; their supposed edits are not included or represented as completed. This checkpoint's recovery manifest is explicit.

## Fresh extraction

The candidate ZIP was fully extracted into a separate directory. `npm test` and `npm run audit:all` both passed there. Their logs are included as `reports/checkpoint-fresh-extraction-*.log`. The final archive adds only those verification logs and this note; the tested runtime and dataset files are unchanged. ZIP integrity and root layout were rechecked.
