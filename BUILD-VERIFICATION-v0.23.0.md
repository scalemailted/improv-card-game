# Imprompt v0.23.0 — Build verification

## Scope and conclusion

This is an implemented static application and authored/compiled example library, not a new on-device AI model. The player interface reads completed records. Exact lookup coverage is complete; individualized semantic review of the complete pair corpus is not.

The source archive is the user-supplied alternate `imprompt-improv-card-game-v0.22.1-performed-hint-fix(1).zip`. Its SHA-256 and the unchanged module hashes are recorded in `reports/source-preservation-v0.23.0.json`.

## Measured dataset

| Measure | Observed |
| --- | ---: |
| Individual card source entries | 480 |
| Single-card examples | 960 |
| Exact card pairs | 57,600 |
| Pair examples | 115,204 |
| Total records | 116,164 |
| Bespoke pairs | 32 |
| Bespoke pair examples | 68 |
| Compressed payload bytes | 3,858,519 |
| Plain payload bytes | 28,044,035 |
| Logical partitions | 241 |
| Largest plain pair partition | 123,249 bytes |
| Maximum record word count | 36 |

Dataset ID: `act-it-out-0.23.0-31e76b572d78`. Rerunning the builder produced an identical manifest hash: `72865d6ebd7a26f9a6f8627ec4a9e10722d6631f55482dbf5c59e5bbcd9983ad`. Static payload byte counts exclude the app shell, manifest, cache bookkeeping, optional duplicate plain files and source documentation.

## Checks executed

| Check | Result and boundary |
| --- | --- |
| Original ten card pack files | Byte-identical to supplied archive |
| Catalog, Card Bible, deck engine, exercise engine | Byte-identical to supplied archive |
| Existing application/engine/editorial suites | Pass |
| All 116,164 example records | Coverage, version mappings, file hashes, shape, lengths, IDs, distinct text within selection pass |
| New example-library tests | 16 pass; production worker/client with explicit fixture fetch/cache transports |
| Gzip/hash worker checks | Actual shipped bytes, native Node DecompressionStream and SHA-256 |
| Full 241-file install/resume | Pass in worker harness; not a browser Cache Storage deployment measurement |
| Simulated offline, missing/corrupt files | Pass; expected explicit errors or verified cache use |
| No-DecompressionStream fallback | Pass with plain JSON in worker harness |
| Storage unavailable | Online read works; offline install cannot claim success |
| Decoded partition retention | Singles plus at most four Stance shards in worker harness |
| Policy/private-card gates | Hints Off, after-attempt unlock, unrevealed exclusions pass |
| Choice cycling | Exhausts available records and avoids immediate repetition on reshuffle |
| Card actions, modal, scene completion, logs | Actual Chromium app DOM/scripts with fixture reader at 320, 412 and 1280 CSS pixels |
| Stale asynchronous response | Does not overwrite a closed/currently different hint |
| Another angle and local flags | Pass in browser fixture flow |
| Browser native gzip | Actual Chromium DecompressionStream decodes the supplied singles payload (480 entries) |
| Horizontal document overflow | None in exercised viewport flows |
| HTML | 288 unique IDs, no duplicate IDs |
| JS syntax | 59 JavaScript/CommonJS files checked |
| JSON | All source/runtime JSON parses |
| Runtime local asset paths | Present and versioned; service-worker precache files exist |
| Font/model/WASM files | None shipped |
| Build reproducibility | Generated manifest byte-identical on repeated build |

The retained old deterministic hint audit concerns historical authoring/regression source that is no longer loaded by the player interface. Its 345,600-angle figure must not be presented as a measurement of this new 115,204-record pair dataset.

## Editorial evidence and limits

All 480 exact cards have individually specified source material rather than a shared subtheme fallback. Most pair records are compiled from that material before deployment. This can still produce adjacent behaviors, context mismatches or insufficiently different tactics. A final cross-pack sample identified six such weak pairs, now replaced by bespoke overrides. The sample and exact examples are in `reports/example-review-sample.md`.

No claim is made that all pairs have been individually read, judged useful, tested blind, or performed by humans. No automated lexical/format test is labeled a semantic pass. Corpus status remains `editorial-preview`; pack publication status remains unchanged. Flag/export is local and intended to guide later bespoke replacements.

## Environment limitation

Chromium HTTP navigation to the local test server failed with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. That restriction was not bypassed. Browser UI tests therefore use an in-memory document with actual application code/styles and a clearly labeled Worker transport fixture. Production worker/cache logic is exercised separately using actual data plus fixture networking/cache storage.

These checks do **not** establish deployed service-worker activation, actual browser quota behavior, installation time, actual phone RAM/latency, iOS behavior, or offline restart persistence on GitHub Pages. Those remain release acceptance tests on the target device.

## Required deployed-device smoke test

1. Publish the complete tree. Close old Imprompt tabs and open the deployed root online.
2. Confirm the preserved deck/scene/log and new Offline examples & storage option.
3. Draw/reveal both cards, open an example and another angle, then veto one card; the other must remain unchanged.
4. Save all examples. Wait for 241/241. Repeat Save/Verify to ensure no corrupt copies survive.
5. Reload online once, then switch to airplane mode. Restart the page and choose a different scene/pair. Check a single and pair example not previously read into worker memory.
6. Pause a download, resume and verify the count. With browser storage unavailable/full, confirm no false completion.
7. Verify Hints Off, After First Attempt and shared exercise policies on independent phones.
8. Flag/export one example; verify that no automatic network transmission occurs.
9. Remove example files, confirm deck/log survive, and retry a missing pair while offline to see the explicit message.
10. Test old-model cleanup only after closing old tabs; verify game data survives.

Final archive checks are recorded separately after the delivery ZIP is freshly extracted.
