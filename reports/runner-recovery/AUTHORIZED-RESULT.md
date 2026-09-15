# Authorized recovery result: batch-001 remains incomplete

This report supersedes the earlier permission-blocked status in DIAGNOSIS.md and RESULTS.json without altering that historical evidence. The user's explicit data-transfer authorization was honored. The installed Codex CLI used existing authentication and normal safeguards. There is no remaining permission blocker.

## Outcome

The real S31 writer -> fresh reviewer -> artifact-validation test passed after one bounded correction (accepted scores 88 and 90). Production recovery then reused all twenty saved writer drafts exactly in attempt-03. Original attempts 01/02, raw model output, retry history, elapsed time and all first-pass scores/evidence remain preserved.

All twenty batch scenes received both passes. The final combined review accepts seventeen candidates: sixteen proposed revisions and one proposed retention (S32-single-b). These are NOT integrated or completed reviews. Three candidates still fail coach-1.0:

- S32-single-a: 77. Arbitrary settlement and insufficient development of the final move.
- S37-single-b: 75. Repetitive final move and strained explanation of prior taxi expenses.
- S40-single-a: 84. Conspicuous comic wording and moderate escalation, below the unchanged threshold.

The one explicitly recorded final recovery attempt is exhausted. The queue is stopped with bounded-retries-exhausted, three editorial failures, seventeen integration-blocked candidates and eighty untouched later scenes. Batches 002-005 remain pending with zero attempts. No further model retry was made.

The established integration.prepare gate requires all scenes and bindings to be accepted before it creates a source transaction. It was preserved. Splitting this failed batch into a new partial-completion workflow would expand the targeted repair and require new completion/provenance semantics. Accordingly no canonical changes, example amendments, completion records or source transaction were fabricated. This is an incomplete batch, not a successful release.

## Original fault and repair

Attempt-01 completed its writer invocation but failed local evidence validation: S31-single-b's relationship evidence had no numbered turn citation. Attempt-02 also exited successfully but supplied 64 for totals that calculate to 65 for S34-single-a and S39-single-b. Neither original attempt reached a reviewer. Exact evidence and per-record replay are in DIAGNOSIS.md and original-replay.json; original writer.json/process/stdout/stderr files remain under .audit-runs/first-five/batch-001/attempt-01 and attempt-02.

The repair makes citation requirements explicit, names actionable validator failures, and derives only weighted arithmetic with raw-output/proof hash provenance. It preserves scores, decisions, dialogue, evidence and every coach-1.0 gate. Stop summaries distinguish processing-blocked scenes from explicit editorial rejection. The recover-batch procedure snapshots and reconciles source hashes without resetting history. The actual CLI dispatch exposed a circular module initialization issue, fixed by exporting the runner interface before invoking main.

Authorized continuation narrowed writer context to this batch, froze original assessments and accepted candidate records during corrections, and added hash/proof-checked reuse of accepted reviews. The final fresh reviewer received only the four unresolved scenes plus their exact cards and accepted companion alternatives, without writer scores or improvement claims. Its raw four-record output remains separate from the combined twenty-record review. The explicit final allowance and its source reconciliation are in final-correction-allowance.json. No authentication, global permission or rubric changes were made.

## Evidence and exact counts

- authorized-batch-001-status.json: complete ID lists, preservation assertions, usage, elapsed time and actual unchanged progress.
- authorized-two-pass-candidates.json: exact cards, distinguishing mechanisms, all originals/candidates, per-turn first/second-pass evidence, gates, reservations and actual reviewer invocation references.
- authorized-candidate-before-after.md: clearly labelled NOT APPLIED comparison of all twenty candidates.
- .audit-runs/first-five/batch-001/attempt-05/reviewer.json: final four fresh reviews.
- .audit-runs/first-five/batch-001/attempt-05/reviewer-combined.json and reviewer-reuse.json: seventeen acceptances/three rejections with explicit carry provenance from attempt-04.
- end-to-end-correction.json: passing real two-scene verification, following the preserved rejected end-to-end.json result.

Actual completed progress remains 60/960 singles and 10/115,200 pairs. All seventy prior completed scene hashes are unchanged. Directly applied revisions: 0. Newly completed retentions: 0. Unchanged generated dialogue: 116,160. Mechanically changed pair drafts: 0. New dependent-reference effects: 0. All playable cards, single/pair source files and transfer source files are byte-identical to the pre-launch snapshot. S06+D49-b remains pending. Public version remains v0.26.0-preview.5; dataset remains acted-scenes-0.26.0-preview.5-a965e9882bac.

Queue usage, including both original attempts, is 230,747 input and 89,758 output tokens. The authorized real two-scene tests add 74,919 input and 8,555 output tokens. Combined known completed-turn usage is 305,666 input and 98,313 output tokens; cached input is included in input totals. Earlier unsuccessful test invocations supplied no completed-turn usage. No monetary cost is inferred. Recorded queue elapsed time is 3,026,674 ms (50m 26.7s); the two authorized E2E runs total 338,364 ms (5m 38.4s). These exclude local repair and offline validation time.

## Verification and continuation

Final offline validation results and native browser scope are recorded separately in authorized-full-validation.json and native-unchanged-batch-001/. These validate the repaired runner and unchanged app/source dataset; they do not approve or integrate candidates. Batch validation remains empty because its acceptance gate prevented staging. No release ZIP or fresh ZIP extraction is claimed for this incomplete batch. Historical earlier checks remain in their original logs.

Read-only queue preview:

    node tools/local-audit-runner.cjs preview --queue .audit-runs/first-five/queue.json

The checked bounded resume command is:

    node tools/local-audit-runner.cjs resume --queue .audit-runs/first-five/queue.json --codex 'C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe' --exclusive-editor --through-batch batch-001

At the current checkpoint it will make no editorial invocation: all five recorded attempts are terminal and the recovery allowance is exhausted. Resume does not reset budgets, and recover-batch cannot be reapplied to erase or restart this recovery. Do not present this command as a completion fix or repeatedly run it. The remaining editorial weaknesses need a separately recorded bounded resolution before completion can proceed; do not change a score or acceptance flag to bypass them. No second runner, later batch, commit, push, deployment, tool installation, new credentials or public-version change occurred.

## Final validation results

Build, all six audits, and the full npm test chain PASSED in the fresh source copy, including all 28 runner fixtures. Full validation and complete dataset comparison took 702,107 ms (11m 42.1s). All 116,160 dialogue records are unchanged; no other generated record changes were found. Logs: authorized-full-validation/build-examples.*, audit-all.*, and test.*; machine-readable result: authorized-full-validation.json.

All 78 native Chrome/Playwright checks PASSED on the current S31-S40 scenes at widths 320, 412 and 1280, including actual offline reload. These checks exercised unchanged canonical scenes, not unintegrated candidates. No dependencies were installed. See native-unchanged-batch-001/results.json and native-unchanged-batch-001.log.

All 540 protected canonical authoring, generated data, historical editorial, card and rubric files match the initial repair snapshot. Original attempt files and all seventy prior completed review hashes are preserved. No canonical integration or release ZIP occurred.
