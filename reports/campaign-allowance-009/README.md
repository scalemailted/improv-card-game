# Campaign allowance-009 results

Allowance-008 is the historical starting checkpoint, not new work. This report records one additional authorized window; no subsequent window was granted. Public version remains 0.26.0-preview.7. No ZIP, commit, push, deployment, installation, authentication change, API-key billing or credit purchase.

Authorization: 2026-09-13T00:51:18.258Z. First production: 2026-09-13T00:51:22.214Z. Editorial stop saved: 2026-09-13T04:36:18.415Z. Coordinator exit observed: 2026-09-13T04:36:59.048Z. Hard deadline: 2026-09-13T04:51:18.258Z, including the unchanged fifteen-minute checkpoint reserve. Stop reason: **elapsed-time-limit**. [Execution record](execution-stop.json).

| Measure | Start | End |
|---|---:|---:|
| Integrated singles | 722 | 824 |
| Singles with two-pass evidence | 760 | 880 |
| Eligible acceptances | 0 | 19 |
| Binding holds | 26 | 20 |
| Persistent editorial exceptions | 12 | 16 |
| Interrupted targets | 20 | 1 |
| Technical-exception scenes | 0 | 0 |
| Untouched singles | 180 | 80 |
| Individually reviewed pairs | 10 | 10 |

Categories can overlap. Exact records and attempts are in [machine results](final-results.json), [staged ledger](staged-two-pass-ledger.json), and [exceptions](editorial-exceptions.json).

New first-time two-pass evidence: 120. New integrations: 102, comprising 90 revisions and 12 retentions. [Integrated ledger](integrated-two-pass-ledger.json), [applied before/after](applied-before-after.md), [new review ledger](newly-reviewed-two-pass-ledger.json), [three representative exchanges and B4-to-A5 causality](representative-exchanges.md).

Revised: S130-single-a, S130-single-b, S157-single-a, S157-single-b, D119-single-a, D119-single-b, D126-single-a, D126-single-b, D141-single-a, D141-single-b, D142-single-a, D142-single-b, D143-single-a, D143-single-b, D144-single-a, D144-single-b, D145-single-a, D145-single-b, D146-single-a, D146-single-b, D147-single-a, D147-single-b, D148-single-a, D148-single-b, D149-single-a, D150-single-a, D150-single-b, D151-single-a, D151-single-b, D152-single-a, D152-single-b, D154-single-a, D154-single-b, D155-single-a, D155-single-b, D156-single-a, D156-single-b, D157-single-a, D157-single-b, D158-single-a, D158-single-b, D160-single-b, D161-single-a, D161-single-b, D162-single-a, D162-single-b, D163-single-a, D163-single-b, D164-single-a, D164-single-b, D165-single-a, D165-single-b, D166-single-a, D167-single-a, D167-single-b, D168-single-a, D168-single-b, D169-single-a, D169-single-b, D170-single-a, D171-single-a, D171-single-b, D172-single-b, D173-single-a, D173-single-b, D174-single-b, D175-single-b, D176-single-a, D177-single-b, D178-single-a, D178-single-b, D179-single-a, D179-single-b, D180-single-a, D180-single-b, D181-single-a, D182-single-b, D183-single-a, D183-single-b, D184-single-a, D184-single-b, D185-single-a, D185-single-b, D186-single-a, D186-single-b, D187-single-a, D187-single-b, D188-single-b, D189-single-a, D189-single-b.

Retained: D160-single-a, D166-single-b, D170-single-b, D172-single-a, D175-single-a, D176-single-b, D177-single-a, D181-single-b, D182-single-a, D188-single-a, D190-single-a, D190-single-b.

## Recovery and binding work

D141–D150 had no completed writer or reviewer result at the starting checkpoint. The documented recovery assessment was executed after granting the allowance and before production. The missing writer stage used the already permitted second technical attempt; the original failed attempt remains unchanged. No technical extension or editorial correction reset was used. [Recovery check](interrupted-recovery-check.json), [preservation check](preservation-check.json).

All twenty starting source snapshots and any later complete drafts/reviews remain preserved. D171-D180 first failed reviewer validation because a supplied candidate hash did not match; the existing technical retry reused all twenty validated writer drafts and produced a valid fresh review. The mismatched hash and original failed review were not edited or promoted. Accepted candidates and valid reviews were reused; only rejected candidates used remaining targeted corrections. Eight starting holds were resolved through two transfer-body amendments and four pair seed-description amendments. The shared successive-amendment audit defect was repaired once, with proof-chain regression coverage. Eighteen starting holds remain, plus the new D153-b and D159-b empty-context compatibility findings. Starting binding-held acceptances integrated: S130-single-a, S130-single-b, S157-single-a, S157-single-b, D119-single-a, D119-single-b, D126-single-a, D126-single-b. All 26 holds were replayed locally before new model work. [Saved failure replay](binding-validation-replay.json), [cause-by-cause diagnosis and repair](binding-diagnosis.md). Fresh binding findings, explicit amendment references and proof results are in the machine results; a binding-only review does not add a scene review.

Remaining binding holds: S89-single-b, S161-single-a, S161-single-b, S162-single-a, S162-single-b, S170-single-a, S170-single-b, S218-single-a, S218-single-b, S219-single-a, S219-single-b, S223-single-b, S227-single-a, S227-single-b, S230-single-a, S230-single-b, D49-single-a, D49-single-b, D153-single-b, D159-single-b. Persistent editorial exceptions: S63-single-b, S80-single-b, S86-single-a, S94-single-a, S143-single-b, S178-single-b, S198-single-b, D20-single-a, D40-single-a, D44-single-a, D118-single-b, D131-single-a, D149-single-b, D153-single-a, D159-single-a, D174-single-a. Interrupted: D191-single-b. Technical exceptions: None. Untouched: D201-single-a, D201-single-b, D202-single-a, D202-single-b, D203-single-a, D203-single-b, D204-single-a, D204-single-b, D205-single-a, D205-single-b, D206-single-a, D206-single-b, D207-single-a, D207-single-b, D208-single-a, D208-single-b, D209-single-a, D209-single-b, D210-single-a, D210-single-b, D211-single-a, D211-single-b, D212-single-a, D212-single-b, D213-single-a, D213-single-b, D214-single-a, D214-single-b, D215-single-a, D215-single-b, D216-single-a, D216-single-b, D217-single-a, D217-single-b, D218-single-a, D218-single-b, D219-single-a, D219-single-b, D220-single-a, D220-single-b, D221-single-a, D221-single-b, D222-single-a, D222-single-b, D223-single-a, D223-single-b, D224-single-a, D224-single-b, D225-single-a, D225-single-b, D226-single-a, D226-single-b, D227-single-a, D227-single-b, D228-single-a, D228-single-b, D229-single-a, D229-single-b, D230-single-a, D230-single-b, D231-single-a, D231-single-b, D232-single-a, D232-single-b, D233-single-a, D233-single-b, D234-single-a, D234-single-b, D235-single-a, D235-single-b, D236-single-a, D236-single-b, D237-single-a, D237-single-b, D238-single-a, D238-single-b, D239-single-a, D239-single-b, D240-single-a, D240-single-b.

## Dataset and pair integrity

Complete starting dataset comparison: 90 directly changed single dialogues; 21422 mechanically changed pair draft dialogues; 94648 unchanged dialogues; 21428 dependent pair references; 0 explicit reference-only generated amendments. [Full comparison](complete-dataset-comparison.json).

All playable wording, stable IDs, card contentVersion values, historical completed review rows and ten reviewed pair dialogues remain preserved. [Pair reference integrity](reviewed-pair-reference-check.json). Mechanical changes do not count as individual semantic pair reviews. S06+D49-b remains pending, as do the documented S192+D74-b provenance granularity and S144+D126-b classification/disappearance reservations. The exact-pair integration adapter remains an unimplemented phase-transition prerequisite; no bulk pair production was launched.

## Verification and usage

9 integration groups passed build, all audits and the full tests before application. 0 newly integrated examples lack passing exact-dialogue three-width native coverage. [Actual logs](validation-log-index.md). Failed or unavailable native attempts remain recorded in machine results. D119 first failed the historical provenance assertion; the original integration stage remains preserved. The chain-code validation initially failed an expected-error-prefix test, then passed its full retry. See [original integration failure](binding-integration.log), [initial chain test failure](provenance-chain-validation/test.stdout.log) and [passing chain retry](provenance-chain-validation-retry-01.json). No physical-device, human editorial, deployment or ZIP-extraction result is claimed. This is a local source checkpoint, not a distribution release.

CLI-reported usage: {"input_tokens":1066861,"cached_input_tokens":131456,"cache_write_input_tokens":0,"output_tokens":375274,"reasoning_output_tokens":18490}. Unique CLI turn.completed events for new writer/reviewer invocations and separate binding reviews, including failed proof checks. Reused/copied invocation events are deduplicated. Interrupted turns lacking usage events are unknown; account quota remaining is not exposed. Existing ChatGPT authentication was used with installed CLI0.154.0-alpha.6.2; the older extension path had disappeared and was not installed or recreated.

Follow the [complete recovery/resume procedure](recovery-resume-procedure.md). Preserve operational queues and artifacts alongside the [source checkpoint receipt](source-checkpoint-receipt.json).

Supported normal continuation command (does not grant time):

```powershell
node tools/local-audit-campaign.cjs resume --campaign .audit-runs/standing-campaign/campaign.json --codex "C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.908.40401-win32-x64\bin\windows-x86_64\codex.exe" --exclusive-editor
```
