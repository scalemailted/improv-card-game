## Allowance 002 working checkpoint — 2026-09-10T23:05:42.783Z

154/960 single examples integrated with completed coach-1.0 evidence; 10/115,200 pair examples individually reviewed. This window integrated 29 revisions and recorded 5 retentions. 0 examples became newly accepted; the integrated backlog already had valid saved reviews. 22 accepted examples remain staged, 4 remain editorially unresolved, and 780 singles were never started.

Editorial acceptance is now per example. Scheduling batches remain explicitly partial; accepted atomic groups require exact source/review bindings, amendments, build, all audits and full tests. Accepted unapplied groups and interrupted transactions remain resumable ahead of later queues. No acceptance threshold or correction allowance changed.

Stop: checkpoint-reserve-reached. One additional 240-minute allowance was recorded; its deadline is 2026-09-11T00:03:53.755Z. Prior allowances, failures and recovery history are preserved. No subsequent allowance is granted automatically. The configured release reserve belongs to this same allowance.

Dataset comparison: 29 directly changed dialogues, 116131 unchanged dialogues, 6960 mechanically affected pair references, and 0 changed pair dialogues. Dependent drafts received no individual review. All playable card metadata and prior completed review records match the starting checkpoint. Public version is 0.26.0-preview.7; asset URLs use the dataset-derived address.

S63-single-b and S80-single-b remain owner-review exceptions without additional correction rounds. S86-single-a and S88-single-a retain their interrupted second-correction history; see remaining-interruptions.json for actual continuation status. S61, S67 and S89 binding findings remain explicit in staged-two-pass-ledger.json. S06+D49-b remains pending. The exact-pair integration adapter remains unsupported; bulk pair production was not entered.

Evidence: reports/campaign-allowance-002/README.md, final-results.json, applied-before-after.md, integrated-two-pass-ledger.json, staged-two-pass-ledger.json and complete-dataset-comparison.json. The new source ZIP is valid only with its successful adjacent verification attestation. The attestation records actual source/extraction tests and native/offline scope; no physical-device or human editorial test is claimed.

Resume the same queue (preserves its remaining/exhausted allowance):

```powershell
node tools/local-audit-campaign.cjs resume --campaign .audit-runs/standing-campaign/campaign.json --codex "C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe" --exclusive-editor
```



---


New revisions: S62-single-a, S62-single-b, S63-single-a, S64-single-a, S64-single-b, S65-single-a, S65-single-b, S66-single-a, S66-single-b, S68-single-a, S68-single-b, S69-single-a, S69-single-b, S70-single-a, S72-single-b, S73-single-a, S73-single-b, S74-single-a, S74-single-b, S75-single-a, S75-single-b, S76-single-b, S77-single-a, S77-single-b, S78-single-a, S78-single-b, S79-single-a, S79-single-b, S80-single-a.

Newly recorded retentions: S70-single-b, S71-single-a, S71-single-b, S72-single-a, S76-single-a.

Staged: S61-single-a, S61-single-b, S67-single-a, S67-single-b, S81-single-a, S81-single-b, S82-single-a, S82-single-b, S83-single-a, S83-single-b, S84-single-a, S84-single-b, S85-single-a, S85-single-b, S86-single-b, S87-single-a, S87-single-b, S88-single-b, S89-single-a, S89-single-b, S90-single-a, S90-single-b.

Unresolved: S63-single-b, S80-single-b, S86-single-a, S88-single-a.

See release-verification/result.json for final validation and ZIP identity. Failed and interrupted checks remain in the report logs and original queue histories.

Final release outcome: INCOMPLETE. Source build, all audits, and the full test suite passed (62 runner/campaign regressions). ZIP creation/extraction timed out. The resulting partial archive failed integrity checking with BadZipFile and is not a usable or verified source ZIP. Fresh-extraction build/audits/tests did not complete. Native rendering reached passing 320- and 412-pixel viewport checks, but the complete native/offline run timed out; the small diagnostic also timed out. No offline pass is claimed.

Release logs are preserved under release-verification/. The malformed candidate is preserved with a .partial suffix. No additional allowance was granted. The exact resume command was checked and stopped at the configured reserve without model calls; see resume-verification.stdout.log. Source integration remains 154/960 singles and 10/115200 pairs, with 29 revisions and five retentions integrated this window, 22 accepted staged, four unresolved (including the two interrupted correction targets), and 780 never started.

Release process exit: 1. See release-launch.log, release-launch.stderr.log and the adjacent ZIP verification attestation for actual results. Full isolated fixture regression timed out at five minutes; the five focused fixture tests passed in isolation and production. Prior failed build/test/fixture logs remain preserved.
