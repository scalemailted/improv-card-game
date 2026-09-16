# Basic and Advanced Play — v0.26.0-preview.8

This is an application feature checkpoint. The allowance-015 authoring checkpoint remains paused: 1,198 pair candidates, 1,187 locally writer-ready, eleven unresolved, and no new fresh approvals or integrations. Next authoring selection remains S03+D121-a/b. Historical official review counts remain 824 singles and ten pairs. No example corpus was rebuilt or edited.

## Play

Basic Play offers one private Stance or Drive. Advanced retains both private cards. Choosing a setup never draws a card. With an unfinished scene, it saves a next-scene configuration and leaves Resume pointing at the original hand. The existing explicit exercise-change abandonment confirmation remains available. After completion, Continue retains the current format, or either main-menu choice starts the next format. Each phone stays independent, including when both players choose the same deck.

## State and compatibility

Schema 6 adds `playPreference`, optional `nextPlaySetup`, and `playMode`/`basicDeck` on new session selections, scenes and snapshots. Version-5 migration copies saved state, retains history snapshots byte-for-byte and treats every missing mode as Advanced. Incomplete legacy active hands remain incomplete Advanced hands. Existing version-2–4 migration remains supported. No missing Drive is inferred to mean Basic. Stored kept flags restore reveal state; veto replacements stay concealed until tapped.

Required card types drive draw guards, completion, history, hint unlocking and UI visibility. Basic cannot draw, veto, refill or filter the inactive deck. Shared queues and counters continue across format changes. Basic history contains only its actual card snapshot and ID; absent cards contribute no category coverage. Exercise link formats and neutral invitation URLs are unchanged; old links select Advanced. No private state is added to a link.

All four hint policy identifiers remain intact. Basic single-card hints never request a pair partition, and After first attempt needs only its selected card. Explicit full-library downloading and cached pair data are untouched.

## Assets and verification

The application shell is v0.26.0-preview.8. Changed app, engine, CSS and manifest URLs use that version; unchanged card/example assets retain their exact dataset-derived addresses. The service-worker shell cache changes without forced activation. There is no compilation stage for this static app. JS syntax checks and exact URL/precache regression tests verify its executable shell; `build:examples` was deliberately not run because it would rewrite the corpus without a compatibility need.

See `tests-final.log`, `audits.log`, `native-results.json`, and `native-final.log`. Earlier failing attempts are retained: the initial browser test found a null setup access, now corrected; old URL assertions needed to distinguish changed shell files from unchanged dataset assets. Python/py aliases were unavailable; the existing installed Python with the existing local Playwright dependency was used, without installation. Process command-line inspection via CIM was unavailable; ordinary process enumeration found no Node/Python writer, no audit lock was found, and the saved authoring boundary was paused.

Native headless Chromium exercised actual localhost assets, workers and service workers at 320, 412 and 1280 pixels, with cached-app/single-example offline reloads, both Basic decks, Advanced, keyboard deck choice, Scene Log, queued setup/Resume, all hint policies and two isolated same-deck contexts. Touch-capable browser viewport emulation is not a physical-phone test. Screenshots are `<stance|drive|advanced>-<width>.png`. No deployment, physical-device, screen-reader, or human editorial result is claimed.

## Two-device manual playtest

1. Serve locally with `npm.cmd start`; open the reachable game URL independently on two devices. Choose Basic Stance on one and Basic Drive on the other; also try both Stance. Draw, veto and nudge independently. Neither device should change the other.
2. While one scene is unfinished, choose Advanced on its menu. Resume must show the original Basic card. Complete it and Continue: only now should two panels appear. Reload during each mode; confirm the same cards and reveal state return.
3. Complete both formats and inspect Scene Log and coverage. Basic must show one actual card. Try a coach exercise link (Advanced), and the general invitation (no private cards or history). Cache a nudge online, then disconnect and reopen it. Full-library offline download remains an explicit storage choice.

## Preservation amendment

`feature-baseline-amendment.json` records exact old/new hashes for legitimate application/test/documentation changes relative to the historical source fingerprint and feature starting hashes. It is a separate feature amendment, not a replacement historical manifest. `preservation-verification.json` verifies protected cards, examples, allowance/candidate records and `.gitignore` remain unchanged. This grants no editorial acceptance and resets no campaign guard, allowance or retry. Future campaign continuation must explicitly account for this source-only feature amendment rather than blindly refresh its baseline.

## Exact changed implementation files

- `app.js`: mode selection, saved next-scene setup, Resume, one-panel rendering, history/coverage and required-card hint readiness.
- `deck-engine.js`: schema 6, legacy migration, mode-derived required types, inactive-deck guards and one-card completion.
- `index.html`, `styles.css`: menu/deck chooser, compact Basic layout and Learn copy.
- `package.json`, `sw.js`, `manifest.webmanifest`: application version, test entry, shell cache and current description.
- `README.md`: feature checkpoint pointer; historical text retained.
- `tests/deck-engine.test.js`: schema version expectation only.
- `tests/app-content.test.js`, `tests/acted-scenes.test.cjs`, `tests/example-library.test.cjs`: exact shell versus immutable dataset asset contracts, retaining worker/manifest checks.
- New `tests/play-modes.test.cjs`: seven mode/migration/policy regression tests.
- New `tools/browser-play-modes.py`: native browser verification and screenshots.
- New `reports/basic-advanced-play/`: logs, screenshots, starting hashes, this report and separate source-baseline amendment.

Final evidence: full `npm.cmd test` passed; all six `npm.cmd run audit:all` audits passed; the subsequent three asset-contract suites passed after making their expectations compatible with a future normal corpus build. Native checks: 14/14 passed (nine layout/offline mode-width combinations, one independence check, four policy checks). No production corpus build was needed. Preservation verified all 5,867 historical source fingerprint entries: precisely twelve explicit feature changes, with all other entries unchanged. The 2,342-file feature baseline independently confirms cards/examples and allowance-015 artifacts unchanged, including the campaign state and `.gitignore`. Zero changed dialogues, reviews or integrations.
