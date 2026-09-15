# Imprompt 0.26.0-preview.3 verification

The actual preview.2 working tree was captured before edits; it already contained uncommitted prior-checkpoint work. This batch preserves that work and compares against those files, not git HEAD.

## Executed checks

| Command | Result | Evidence under reports/preview.3/ |
| --- | --- | --- |
| Baseline npm run audit:all | PASS | baseline-audits.log |
| Baseline npm test | PASS | baseline-tests.log |
| npm run build:examples | PASS | build.log |
| npm run audit:all | PASS | audits.log |
| npm test, including amendment rejection tests | PASS | tests-final.log |
| npm run test:browser | PASS | browser.log |
| Expanded npm run test:browser:batch | PASS, 90 scene/viewport checks | browser-batch-final.log; ../coach-batch-browser-results.json |
| npm run test:browser:native | PASS, 78 checks | browser-native-final.log; native-browser/results.json |

The first post-edit test run stopped at a preview.2 QR asset assertion. Current URL fixtures were amended to require preview.3, preserving the cache and asset assertions. The single exporter now correctly starts at pending S11; tests reflect that rather than demanding the completed S01 packet again. Historical pair review version/hash checks remain intact; cumulative pair assertions still require ten completed pair reviews separately from the twenty new singles.

The first native browser run hit a test-fixture error: it required an Another scene button under the shorter-scene policy when only one alternative qualifies. The corrected fixture explicitly requires that button to be hidden in that case, verifies the selected complete dialogue has the minimum word count, and still requires both alternatives under full availability. No app policy was changed. Initial failure logs are retained as tests.log and browser-native.log.

## Browser scope

Installed Chrome ran headless on Windows. Python Playwright was installed into an excluded temporary workspace directory. To repeat the browser commands, install Python Playwright and set CHROMIUM_PATH to an installed Chromium executable, or install the usual Playwright Chromium runtime for the native script. Existing fixture scripts also accept CHROMIUM_PATH.

The general smoke test uses the actual app DOM and packaged records with explicitly simulated worker transport/storage. It covers the existing pair/single flows, alternative selection, flagging, history, availability, error/retry, stale response and native gzip decoding. Its pre-existing environment-description text is fixture scope, not evidence that HTTP is blocked here.

The expanded review-page fixture covers thirty scenes (twenty singles and ten preserved pairs) at 320, 412 and 1280 pixels. Its worker-message transport is simulated. It verifies all five displayed lines against the shipped records and checks horizontal overflow.

The new native script serves the actual app on localhost and runs its production worker, gzip decoding, SHA-256 verification, caches and renderer without transport mocks. All twenty single scenes were exercised at all three widths, with Another scene, accessible final turns, usable buttons, no horizontal overflow and an in-viewport dialog. Native policy checks cover off, after-attempt and the shorter complete alternative. At 412 pixels it waits for the actual service worker, disables browser networking, reloads the app, and reads both S08 alternatives offline. Screenshots are saved under reports/preview.3/native-browser/. The 320px S08 screenshot was visually inspected.

This is emulated viewport/touch testing on desktop Chrome, not physical-phone, Safari, Firefox, public-host deployment or troupe testing. Native whole-library download was not repeated; existing Node production-reader tests retain all-241-file installation/resume coverage with simulated transport and caches. No claim of independent human or live semantic approval is made.

## Source and review integrity

reports/preview.3/source-dataset-comparison.json compares all 116,160 records. Eleven single scenes changed, 116,149 records are unchanged, and zero dependent pair records changed. All 241 container files have new dataset IDs and content-addressed names. The 2,640 affected seed references are listed separately; two belong to bespoke legacy drafts and 2,638 to compiled drafts. No regeneration is counted as semantic approval.

The comparison also verifies unchanged playable card fingerprints/contentVersions, all per-card historical notes and snapshots, all transfer text, all bespoke pair source, and protected legacy ledgers. Only eleven single beats/exampleVersion values and seven transfer seedBindingHashes arrays changed in canonical authoring. The owner-endorsed hamster transcript and all nine other completed pair reviews are preserved.

The source includes a readable before/after report, a machine-readable two-pass ledger, original/candidate/refinement evidence, eleven exact baseline amendments and a completed singles-001 pointer. S11–S20 is exported with blank scores as the next bounded batch. Cumulative internal coach-1.0 progress is 30 / 116,160; 116,130 remain pending.

## Runnable package

The delivery ZIP is releases/Imprompt-0.26.0-preview.3-source.zip, with index.html at its root. Run npm start from an extraction and open http://localhost:8080/. The review chooser is tools/checkpoint-example.html.

The ZIP excludes dependencies, temporary workspace files, caches, secrets, model/font binaries and previous archives. reports/preview.3/package-file-manifest.json records payload hashes. Fresh-extraction CRC/hash, audit/test and browser outcomes are recorded alongside the ZIP in releases/Imprompt-0.26.0-preview.3-package-verification.json and extraction logs; those final archive attestations are external to avoid a self-referential ZIP hash. The extracted browser check uses S03 and S08 at 320 and 412 pixels, plus policies and native offline reload; it is a packaging smoke check in addition to the complete source-tree browser batch above.

No commit, push or deployment was performed.
