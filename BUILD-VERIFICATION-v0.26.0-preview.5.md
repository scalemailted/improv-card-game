# Imprompt 0.26.0-preview.5 verification

The starting preview.4 working tree, including unrelated uncommitted work, was captured before edits. Completion pointers for singles-001, singles-002 and pairs-001 resolve to the existing reviews. Starting progress was 40 reviewed singles and 10 reviewed pairs. Comparison uses that actual checkpoint, not git HEAD.

## Executed checks

| Command | Result | Evidence under reports/preview.5/ |
| --- | --- | --- |
| Baseline npm run audit:all | PASS | baseline-audits.log |
| Baseline npm test | PASS | baseline-tests.log |
| npm run build:examples | PASS | build.log |
| npm run audit:all | PASS | audits.log |
| npm test | PASS on full rerun | tests-final.log; initial failure in tests.log |
| Full dataset comparison | PASS | source-dataset-comparison.json; source-dataset-comparison.log |
| Export S31–S40 with blank ratings | PASS | export.log; ../../editorial/batches/singles-004/ |
| npm run test:browser | PASS | browser.log |
| npm run test:browser:batch | PASS, 210 checks | browser-batch.log; coach-batch-browser-results.json |
| npm run test:browser:native | PASS, 78 checks | browser-native.log; native-browser/results.json |

The batch-specific test checks all twenty exact packet/source/runtime records, both scored passes, card distinctions, twelve exact amendments and rejection of omitted/broken/drifted amendments, preservation of all preceding fifty reviews, separate progress counts, three bespoke seed references and the pending S06+D49-b flag. Existing asset-version, next-pending-export and cumulative-count assertions were updated precisely. Historical version/hash checks remain intact; no acceptance or audit gates were relaxed.

The first full test run stopped at the preview.2 pair test’s assumption that all historical seed dialogue must equal current single dialogue. The authorized S22 revisions exposed that assumption. For exactly S22-single-a and S22-single-b, the test now checks the unchanged historical snapshot against the explicit binding evidence and validates the complete amendment chain to current source; it also checks the preserved pair hash. Every other historical seed still requires exact current equality. The original failure is retained in tests.log; the complete rerun is tests-final.log. No historical pair or review was rewritten to make this pass.

## Editorial evidence

Twelve single dialogues were revised and eight retained. Each card has a one-sentence behavioral mechanism, closest confusable concept and distinguishing evidence requirement. Original scores were recorded before drafting. Separate instruction/dialogue-only packets supported the fresh internal second pass before returning to the first-pass rationale; this is not an independent human blind reading.

S24-a clarified the scarf’s giver. S24-b’s initial candidate scored 77 during rereading because the first lift stop was not absorbed into the plan. The corrected final line identifies it as the rendezvous with the guide and interprets the kettle delivery as a companionship mission. The exact initial draft and refinement remain preserved. Final scores range from 85 to 92; modest scores and reservations, including S27-a at the threshold, were not raised to match a prior batch. No final selected scene remains below acceptance.

docs/COACH-SINGLES-003-REVISIONS.md supplies applied before/after text, both sets of turn-specific evidence, alternative comparisons and remaining concerns. editorial/0.26.0-preview.5/ contains the machine-readable evidence and twelve explicit version/hash amendments. All preceding twenty-one single amendments remain unchanged.

## Browser scope and limitations

Tests use installed desktop Chrome headlessly and the existing temporary Python Playwright dependency from preview.4. No runtime dependency or model installer was added. Shell commands use npm.cmd and the installed Python executable to avoid the previously documented Windows alias/execution-policy issues. The local browser commands run with scoped permission for Chrome and localhost. No new dependency download is required.

The general smoke uses actual app DOM and packaged records with explicit worker/storage fixtures, including single/pair alternatives, history and flags, policies, error/retry, stale responses and native gzip decoding. Its inherited report sentence about blocked HTTP describes its original fixture environment, not this native localhost run.

The expanded viewer fixture checks all sixty completed singles and ten preserved pair scenes at 320, 412 and 1280 pixels: 210 exact-dialogue/viewport checks. Worker-message transport is simulated. This exercises both S21–S30 alternatives and checks overflow, without calling the fixture a native transport test.

The native script serves the actual app on localhost and uses its production worker, gzip decoder, SHA-256 checks, caches, renderer and service worker. It exercises both alternatives of every S21–S30 card at all three widths, alternative selection, final-turn/button visibility and availability policies. At 412 pixels it disables networking, reloads and retrieves both S30 alternatives offline. The full scope comprises 78 checks; results and screenshots are under reports/preview.5/native-browser/.

The 320px S24-single-a and 412px S30-single-a screenshots were visually inspected; dialogue and controls fit and were readable. Every current batch scene ID appears in the native result record.

These are desktop viewport/touch emulations, not physical-phone, Safari, Firefox, deployed-host or troupe tests. Native whole-library installation was not repeated; Node production-reader tests retain all-241-file installation/resume coverage with simulated transport and caches. Structural and transport tests are not semantic approval.

## Exact dataset and dependency effects

All 116,160 generated records were compared with the preview.4 snapshot. Twelve dialogues and their example versions changed; 116,148 dialogue and scene records are unchanged. Zero dependent pair dialogues or scene records changed. All 241 logical dataset containers have new versioned envelopes and content-addressed JSON/gzip files.

The 2,880 affected seed references are separate: 2,877 compiled drafts and three bespoke records. S22+D14-a and S22+D14-b retain their exact completed preview.2 reviews. S23+D163-b remains coach-1.0-pending. The binding review preserves old seed dialogue and hashes, including the microphone detail cited by S22+D14-a, which is not retroactively attributed to the new single. Nine seed-binding arrays changed after deliberate inspection of both alternatives and every transfer field; all transfer wording and pair source remain exact.

The comparison verifies unchanged playable card fingerprints/content versions and 58 protected source/history files. All forty preceding single reviews, ten pair reviews and historical amendments are preserved. S06+D49-b’s caretaker/invitations seed-description mismatch remains pending and outside scope.

Current progress is 60/960 singles and 10/115,200 pairs; 900 singles and 115,190 pairs remain pending (116,090 total). S31–S40 is exported as singles-004 with twenty blank ratings.

## Source package and fresh extraction

The delivery is releases/Imprompt-0.26.0-preview.5-source.zip, with index.html at its root. Run npm start from an extraction and open http://localhost:8080/. The review chooser is tools/checkpoint-example.html.

The archive includes source, generated offline data, reviews, tests, documentation and reports. It excludes dependencies, temporary workspace files, caches, secrets by filename, model/font binaries and prior archives. reports/preview.5/package-file-manifest.json inventories payload hashes except its own self-reference.

Final CRC/hash verification, fresh-extraction build, all audits, full tests and native browser/offline outcomes are recorded alongside the ZIP in releases/Imprompt-0.26.0-preview.5-package-verification.json and releases/preview.5/extraction-*.log. These final attestations remain external to avoid a self-referential archive hash. The fresh extraction browser smoke selects S22 and S24 at 320 and 412 pixels, including policy checks and both S24 alternatives after an offline reload (21 checks). Its rebuilt manifest must match the delivered manifest exactly.

No commit, push or deployment was performed.
