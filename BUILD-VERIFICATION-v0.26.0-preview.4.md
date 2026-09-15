# Imprompt 0.26.0-preview.4 verification

The actual preview.3 working tree was captured before this batch, including unrelated uncommitted work. Comparison uses that checkpoint rather than git HEAD. S11–S20 alone received twenty internal coach-1.0 reviews, with ten revisions and ten retentions.

## Executed checks

| Command | Result | Evidence under reports/preview.4/ |
| --- | --- | --- |
| Baseline npm run audit:all | PASS | baseline-audits.log |
| Baseline npm test | PASS | baseline-tests.log |
| npm run build:examples | PASS | build.log |
| npm run audit:all | PASS | audits.log |
| npm test | PASS | tests.log |
| npm run test:browser | PASS | browser-final.log |
| npm run test:browser:batch | PASS, 150 scene/viewport checks | browser-batch-final.log; coach-batch-browser-results.json |
| npm run test:browser:native | PASS, 78 native checks | browser-native-final.log; native-browser/results.json |

The new batch test checks all twenty exact packet/source/runtime records, both review passes, ten new amendments and their rejection cases, the preserved eleven preceding amendments and thirty preceding reviews, cumulative counts, five bespoke seed references, and the pending S06+D49-b flag. Existing current-version asset and next-pending-export assertions were updated; audit gates were not relaxed.

The first baseline shell attempt selected npm.ps1 and was blocked by PowerShell execution policy. The commands were rerun successfully with npm.cmd. The first browser attempts failed before testing because the old temporary Playwright installation was unavailable to the current sandbox. A new temporary installation initially encountered sandbox network denial, then succeeded through a scoped approved download. Initial failure logs and dependency setup logs are retained. No app behavior was changed to resolve these environment failures.

## Browser scope and limitations

Installed desktop Chrome runs headless with Python Playwright from an excluded temporary workspace directory. Repeat by installing Python Playwright and setting CHROMIUM_PATH to an installed Chromium executable. The fixture scripts also accept PREVIEW_DIR for screenshots.

The general smoke test exercises actual app DOM and packaged records with explicit worker/storage fixtures, including pair and single flows, alternatives, flags/history, policies, error/retry, stale results and native gzip decoding. Its inherited report text about blocked HTTP describes the fixture's original environment; it does not describe the native localhost check.

The expanded review-page fixture selects all forty completed singles and ten preserved pair scenes at 320, 412 and 1280 pixels: 150 scene/viewport checks. Worker-message transport is simulated; displayed five-line dialogue is checked against shipped records, along with overflow.

The native script serves the real app on localhost and uses its production worker, gzip decoder, SHA-256 checks, caches, renderer and service worker. The full batch selects both S11–S20 alternatives at all three widths, verifies final-turn and button accessibility, alternative selection and overflow, and exercises availability policies. At 412 pixels it disables browser networking, reloads the app and reads both S20 alternatives from cache. This scope comprises 78 checks. Results and screenshots are under native-browser/.

The revised S18-single-a screenshot at 320 pixels and the S19 screenshot at 412 pixels were visually inspected: dialogue and controls were readable and contained in the viewport. All twenty selected alternatives also passed exact-text checks in the native renderer.

These are desktop viewport/touch emulations, not physical-phone, Safari, Firefox, deployed-host or live troupe tests. Native whole-library installation was not repeated; Node production-reader tests retain all-241-file installation/resume coverage with simulated transport and caches. Internal editorial acceptance is not independent human or live-performance approval.

## Exact source and dataset effects

source-dataset-comparison.json compares all 116,160 scene records: ten directly revised, 116,150 unchanged, zero mechanically changed dependent pair records. All 241 container envelopes carry a new dataset ID and therefore new content-addressed filenames and gzip hashes.

Affected seed references are separate: 2,400 total, comprising 2,395 compiled drafts and five bespoke records (S15+D12-b, S17+D09-a, S17+D09-b, S19+D02-a, S20+D20-b). None receives a new pair review. Nine seed-binding arrays were updated deliberately; transfer wording, bespoke dialogue and historical seed descriptions remain intact. The transfer-binding ledger records the provenance assessment. S06+D49-b remains pending.

The comparison confirms unchanged card fingerprints/content versions and 48 protected source/history files. The earlier eleven revised singles, nine retained singles, ten reviewed pair scenes and historical amendment chain are preserved. Cumulative review progress is 40/960 singles and 10/115,200 pairs; 920 singles and 115,190 pairs remain pending. S21–S30 is exported as singles-003 with blank ratings.

## Runnable source package

The delivery is releases/Imprompt-0.26.0-preview.4-source.zip with index.html at its root. Run npm start from an extraction and open http://localhost:8080/. The review chooser is tools/checkpoint-example.html.

The ZIP includes source, generated offline data, reviews, tests, documentation and reports. It excludes dependencies, temporary workspace files, caches, secrets by filename, model/font binaries and prior archives. reports/preview.4/package-file-manifest.json inventories payload hashes except its own self-reference.

Final ZIP CRC/hash checks, fresh-extraction build, all audits, full tests and native browser/offline results are recorded beside the ZIP in releases/Imprompt-0.26.0-preview.4-package-verification.json and releases/preview.4/extraction-*.log. Keeping final archive attestations external avoids a self-referential archive hash. The extracted browser smoke selects S13 and S19 at 320 and 412 pixels, plus policies and offline reload (21 checks), supplementing the full source-tree batch. The extracted rebuild must reproduce the delivered manifest exactly.

No commit, push or deployment was performed.
