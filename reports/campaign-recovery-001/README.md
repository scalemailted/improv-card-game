# Recovery allowance 001

120/960 completed source single reviews; 10/115200 pair reviews. 40 singles integrated in this recovery window (38 revisions, 2 retentions). 56 accepted scenes remain staged; 4 editorially unresolved, 0 technically blocked, 0 without a completed second pass after interruption, 780 never started.

**Stop reason:** `checkpoint-reserve-reached`. This checkpoint uses the existing ChatGPT-authenticated Codex allowance. The explicit window ends at 2026-09-10T06:50:32.039Z; neither prior time nor retries were reset. The final release activity is recorded after verification in the adjacent ZIP attestation and persistent release-verification logs. This source-package report and campaign snapshot are taken before that final verification activity.

## Evidence

- [Root causes and bounded repairs](diagnosis.md)
- [Applied before/after exchanges](applied-before-after.md)
- [Integrated two-pass ledger](integrated-two-pass-ledger.json)
- [Preserved accepted staged reviews](staged-two-pass-ledger.json)
- [Unresolved, technical, and interrupted records](remaining-exceptions.json)
- [Full dataset comparison](complete-dataset-comparison.json)
- [Progress, phase timing, and recorded CLI usage](final-results.json)
- [Native proof for recovered S51–S60](native-verification.json)
- [Final release evidence](release-verification/result.json)

## Dataset

116160 records compared with the starting checkpoint: 38 directly revised dialogues, 116122 unchanged dialogues, 9120 dependent pair references, 0 mechanically changed pair dialogues, and 0 other generated record changes. The JSON comparison lists every affected ID. Dependence is not a pair review. All prior completed ledgers and all playable single-card metadata were compared unchanged.

## Verification scope

Per-batch integration requires build, all audits, full tests, accepted artifact verification, amendments and exact transaction checks. Native tests use installed desktop Chrome on localhost, production worker/gzip/hash/cache/rendering, three emulated widths and service-worker offline use. They are not physical-device or deployed-site tests. Full checkpoint validation repeats build/audits/tests on the source and fresh ZIP extraction; its actual results and logs are in the adjacent attestation and release-verification directory. No process exit alone is treated as editorial acceptance.

## Resume

Run from the original repository with no other integration writer:

```powershell
node tools/local-audit-campaign.cjs resume --campaign .audit-runs/standing-campaign/campaign.json --codex 'C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe' --exclusive-editor
```

This preserves queues, partial artifacts, accepted reviews, exceptions and the current deadline. Once the existing window or its checkpoint reserve is exhausted, resume reports the limit rather than renewing it. A future additional window requires new explicit authorization recorded with the supported `grant-allowance --campaign .audit-runs/standing-campaign/campaign.json --authorization FILE --minutes N --exclusive-editor` command before the same resume command. A new grant is refused until the existing allowance is exhausted. Do not reuse the already consumed authorization file or reset elapsed time.

The campaign-snapshot directory preserves both queues and their original root paths for evidence/recovery; it is not a second active runner. No commit, push, deployment, tool installation, authentication change, API-key billing, or extra correction round for S63-b/S80-b occurred.

Application ZIP: `releases/Imprompt-0.26.0-preview.6-recovery-allowance-001.zip`. Its adjacent verification JSON is emitted only after successful fresh-extraction checks.

## Completed release verification

The final release verification passed: build, all audits, and full tests in both the source copy and fresh extraction; ZIP CRC and all 6,749 extracted file hashes; and 138 native Chrome checks covering every newly integrated S41–S60 alternative at 320, 412, and 1280 pixels plus offline service-worker use. All 52 runner fixtures passed. Physical-device and deployed-site checks were not performed.

ZIP SHA-256: `213bf32335eabb878ac282ec24eae657e1ac056d3873446f54ea3e9559ee06c2`. The [final attestation and persistent logs](release-verification/result.json) record actual process outcomes. The ZIP contains the report snapshot taken before final verification; this completion note and final timing are preserved alongside it without changing the verified archive.

The [interrupted correction records](interrupted-corrections.json) distinguish the interrupted second invocation for S86-a/S88-a from a completed editorial review. The [S89 binding diagnosis](S89-transfer-diagnosis.json) preserves its genuine instruction/transfer conflict. Neither is silently cleared by packaging.
