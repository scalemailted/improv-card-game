# Imprompt v0.25.0 — Build verification

## What was actually done

The supplied v0.24.0 ZIP was extracted and inspected. The exact 480 card instructions and both original single-card scenes were used as the basis for 960 new five-turn dialogue examples. Each card has an individual editorial rationale; each scene has a before/after record and hash. The 25 existing bespoke pair entries were rewritten as 50 five-turn scenes.

This is internal, model-authored editorial work. It is not a claim of independent human review, blind reading, audience laughter, or live-scene effectiveness. The 115,150 composed pair scenes are still drafts, not individually semantically reviewed.

## Executed checks

| Check | Observed result |
| --- | --- |
| Full `npm test` suite | Pass |
| `npm run audit:all` | Pass: cards, editorial manifest, example files, dialogue review coverage |
| Singles | 480 cards, 960 rewritten ABABA scenes |
| Singles brevity | 36-word median, 57 maximum; prior median 37 |
| Single opening / complete exchange duplication | 960 distinct openings and exchanges |
| Separate stage-action fields | None in runtime scenes |
| Pair coverage | 57,600 pairs, two five-turn scenes each |
| Reviewed bespoke pair subset | 25 pairs / 50 internally rewritten scenes |
| Compiled pair status | 115,150 explicitly pending individual review |
| Gzip/JSON files | Actual byte lengths, decompression and SHA-256 checked for all 241 partitions |
| Source revision guard | Exact card fingerprints and seed binding hashes checked |
| Protected source | Ten card packs plus catalog, Card Bible, deck engine and exercise engine byte-identical to the upload |
| JavaScript syntax / JSON parsing / HTML IDs | Pass; 287 unique HTML IDs and 19 versioned entry scripts |
| UI smoke flows | Pass at 320, 412 and 1280 CSS-pixel widths, using explicit transport/storage fixtures |
| All authored-dialogue layout | 960 single scenes + 50 bespoke pair scenes rendered through the actual renderer block and stylesheet at four viewports |
| Viewports in full layout sweep | 320×568, 320×760, 412×915 and 1280×900 |
| Clipping/overflow in that sweep | No horizontal overflow, hidden clipped turns, or inaccessible Done control |
| Short viewport overflow | Transcript scrolls at natural height; 857 of 1,010 examples needed scrolling at 320×568 |
| Native Chromium gzip | Actual packaged singles decompressed using native `DecompressionStream` |
| Policies | Full, shorter-complete-scene, after-attempt and off tested |
| Privacy and persistence | Only revealed selected cards reach the example reader; saved deck and history flows covered |

A layout sweep initially exposed a real inherited CSS issue: a grid track could shrink the overflow-hidden transcript and conceal later turns. The body now uses ordinary block flow with its own scrolling. This was fixed and the complete sweep rerun; final results are in `reports/dialogue-layout-results.json`.

## Environment boundary

A direct attempt to navigate Chromium to the local HTTP server returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Browser tests therefore used an in-memory document, the actual scripts/CSS, and explicitly simulated worker transport/storage. The production worker was tested separately with real dataset bytes and simulated network/cache interfaces.

These checks do **not** establish native GitHub Pages service-worker installation, cross-tab upgrade behaviour on a real phone, physical Pixel speed, peak memory, or airplane-mode restart after installation. No such claim is made. Static HTML parsing is not represented as full standards validation.

## Release payload

- Compressed example data: 12,345,859 bytes.
- Plain compatibility data: 72,825,267 bytes.
- All examples: 116,160 five-turn scenes.
- Overall median scene length: 51 words; maximum 79.
- Normal install selects one usable representation per partition, not both complete datasets.
- No model weights or font files are packaged.

## Required deployment check

Deploy the entire release, close old tabs and reopen. Save all 241 example files, then reload once online and test a different pair in airplane mode. Check scrolling on a short screen and return to the same scene after Done. Do not clear the entire site's storage: it also contains the private deck and history.

## Evidence files

- `reports/tests-v0.25.0.log`
- `reports/audits-v0.25.0.log`
- `reports/dialogue-audit.json`
- `reports/acted-scene-audit.json`
- `reports/browser-results.json`
- `reports/dialogue-layout-results.json`
- `reports/source-preservation-v0.25.0.json`
- `reports/static-checks-v0.25.0.json`
- `editorial/v0.25.0/single-dialogue-ledger.json`

## Fresh-extraction verification

The completed archive was CRC-checked and extracted into a separate clean directory. `npm test` and `npm run audit:all` were then run from that extraction; both passed. Their complete logs are included as `reports/fresh-extraction-tests-v0.25.0.log` and `reports/fresh-extraction-audits-v0.25.0.log`. Only this verification paragraph and the evidence logs were added after those runs; application code and dataset bytes were unchanged. The final archive was repacked and CRC-checked again.
