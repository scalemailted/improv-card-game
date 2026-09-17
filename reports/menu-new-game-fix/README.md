# Menu and new-game repair — v0.26.0-preview.9

Implemented in the current working source on 2026-09-16. Explicit Basic → Stance, Basic → Drive, Advanced Play, and a completed guided-exercise Start now create a fresh active game immediately. Resume preserves the existing game. No extra confirmation follows completed setup.

## Reproduced causes and changes

The new Basic/Advanced and chooser buttons contained only a text span, but inherited an icon/text/chevron grid. Their text occupied a 40–46 px icon column. A text-only grid class now gives all four buttons the available width; the setup-status line spans the menu grid. Native menu text widths are now 272, 350 and 790 px at viewport widths 320, 412 and 1280. The attachment ended after section E rather than including its referenced detailed layout specification. This repair addresses the reproduced layout defect without a broader redesign.

Previously, `choosePlay` saved `nextPlaySetup` and returned while a hand existed. Guided Start also opened a second confirmation. A separate engine `startNewGame` operation now clears the active hand, reshuffles both decks, resets deck cycles/veto counts, creates a new session with scene 1, and leaves cards undrawn. It retains completed history and immutable snapshots, historical session records, lifetime completion count, instance identity, saved custom exercises and unrelated preferences. The existing lower-level `startSession` guard remains intact.

Resume no longer applies an old deferred `nextPlaySetup`. Opening and cancelling Basic, and navigating Gallery, Learn, Scene Log, Invite, exercises or offline settings leave the game intact. Explicit Start clears the obsolete deferred setup. No migration or schema change was needed: schema 6 remains current, and legacy schema 5 still migrates without replacing its hand or history.

Exact changed existing files:

- `app.js`: explicit new-game actions, unchanged Resume semantics, removal of redundant guided/invite Start confirmation, current feedback-export version.
- `deck-engine.js`: dedicated active-game replacement operation.
- `index.html`, `styles.css`: menu/chooser text tracks and status-row layout; current shell URLs.
- `package.json`, `sw.js`: preview.9 application version, shell cache and shell asset URLs.
- `tests/play-modes.test.cjs`: fresh-game, same-mode restart, preservation and invalid-setup regressions.
- `tests/app-content.test.js`: require the new explicit fresh-game entry point.
- `tools/browser-play-modes.py`: replace the superseded deferred-start expectation, use the installed Chrome when configured, and write new results outside the frozen Basic/Advanced report.

New `tools/browser-menu-new-game.py` exercises the repaired application; this report directory holds evidence and a supplemental saved-exercise regression. Scratch scripts under `.checkpoint-work` captured and verified hashes and applied the focused edits. No application source was restored from an older checkpoint.

## Native before/after evidence

| Viewport | Before menu | After menu | After chooser | Advanced → fresh Basic |
| --- | --- | --- | --- | --- |
| 320 | [Before](before-menu-320.png) | [After](after-menu-320.png) | [Chooser](after-chooser-320.png) | [New Basic](after-advanced-to-basic-320.png) |
| 412 | [Before](before-menu-412.png) | [After](after-menu-412.png) | [Chooser](after-chooser-412.png) | [New Basic](after-advanced-to-basic-412.png) |
| 1280 | [Before](before-menu-1280.png) | [After](after-menu-1280.png) | [Chooser](after-chooser-1280.png) | [New Basic](after-advanced-to-basic-1280.png) |

[Before results](before-native-results.json) reproduce the retained Advanced session ID after Basic selection. [Final results](after-native-results.json) record distinct session IDs after Basic Start at all three widths. The new hand is Basic Stance, scene 1, with its inactive Drive panel hidden. Completing it and starting Basic Drive preserves the completed snapshot. Guided Start and a subsequent Advanced Start also replace the active session immediately.

## Actual validation

- `npm.cmd test`: passed, including all existing content, engine, QR, asset/worker/manifest URL, editorial and runner tests; the final local-audit section passed 101 tests. [Full log](full-tests-final.log).
- `npm.cmd run audit:all`: all six audits passed. [Log](audits.log).
- Play-mode regression suite: 12/12 passed, including four explicit-start variants and invalid-setup preservation; included in the full test run.
- Updated native play-mode suite: 14/14 checks passed, covering three modes at three widths with offline reload, independent browser contexts and all four hint policies. [Results](play-modes/native-results.json), [log](play-modes-native.log).
- Focused native menu suite: three viewport flows plus legacy-v5 migration passed. It checks cancelled chooser, Resume/reload, non-destructive navigation/settings, immediate Basic/Advanced/guided Start, completed-history preservation, actual example flags, existing cache entries, five-line hints and offline reload. [Log](menu-native-preservation.log).
- Nonempty saved custom exercise, completed snapshots and historical session survived four new-game selections; state remained valid. [Test](saved-exercise-regression.cjs), [log](saved-exercise-regression-final.log).
- `node --check app.js` passed. This static-shell repair requires no corpus build; the existing generated dataset is byte-identical. No example builder or corpus version change was performed.

Initial failures are retained: the first full test run expected the superseded `engine.startSession` call ([log](full-tests.log)); a supplemental fixture incorrectly modeled a custom exercise as Open rather than Mirror ([log](saved-exercise-regression.log)). Both were corrected in tests and passed. The first Python invocation lacked Playwright on its default import path; subsequent runs used the existing `.checkpoint-work/preview4/python` dependency and installed Chrome. No tools were installed. A guarded scratch edit initially stopped before writing app.js because it expected CRLF; it was corrected to match the actual file before proceeding.

Native checks use headless installed Chrome with synthetic local player state. No physical-device, Safari, Firefox, installed-PWA-upgrade, deployment or human editorial result is claimed. Existing cache entries and offline reload were tested; no full-library download was requested. Process command-line inspection via CIM was unavailable; the permitted process check found no Node/Python writer before testing, no audit lock was found, and the saved authoring state was paused.

To repeat browser checks using the existing local dependencies:

```powershell
$env:PYTHONPATH = "$PWD\.checkpoint-work\preview4\python"
$env:CHROMIUM_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
& 'C:\Users\Ted\AppData\Local\Python\pythoncore-3.14-64\python.exe' tools/browser-menu-new-game.py
& 'C:\Users\Ted\AppData\Local\Python\pythoncore-3.14-64\python.exe' tools/browser-play-modes.py
```

## Source preservation and authoring handoff

[Starting hashes](starting-hashes.json) verified the 5,869-entry historical source fingerprint and allowance-017 artifact inventory before application edits, then captured the current report and campaign files. The exhaustive comparison checked 147,515 existing files. Final accounting: 147,506 unchanged and nine explicitly amended application/test files; zero unexplained differences. The full scan preceded the final content-contract test edit; all feature-file hashes were subsequently checked again and that single additional test delta was recorded explicitly. [Verification](preservation-verification.json), [final log](final-preservation.log).

[Versioned feature-baseline amendment](feature-baseline-amendment.json) links old/new hashes, the unchanged allowance-017 fingerprint, and the prior Basic/Advanced amendment. It grants no editorial approval and does not refresh campaign guards. Public shell version preview.9 was unused at selection. Dataset version and all dataset-derived URLs remain `0.26.0-preview.7-4f93b65af4d6`; only the application shell/cache addresses changed. The web manifest, `.gitignore`, historical fingerprints and prior feature report remain unchanged.

Preserved: 1,802 unique pair candidates, 1,782 locally writer-ready, 20 unresolved; allowance-017's 284 new scenes and 399 written versions; all single candidates, ten historical reviewed pair dialogues, prior corrections, exhausted limits, reviews and campaign attempts. Zero rewritten or integrated candidates, zero new model calls, zero new allowances. The eight new allowance-017 exceptions remain S04+D43-a, D45-a, D69-a, D75-a, D99-a, D131-a, D149-b and D174-a. Historical reviewed/integrated coverage was not relabeled. The pre-existing untracked `reports/local-candidates-017/` was preserved.

No ZIP, clone, reset, commit, push, deployment or automatic authoring restart occurred.

Allowance-017 editorial work preserved. Next pending selection: S04+D183-a/b, unless the authoritative manifest had already advanced. Resume authoring only in a separately authorized window, using this repaired application as the feature baseline.
