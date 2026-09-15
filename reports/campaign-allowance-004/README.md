# Allowance 004: actual continuation and source checkpoint

This window integrated **101 singles: 87 revisions and 14 retentions**. **120 singles obtained first-time two-pass evidence**; 10 previously reviewed scenes received corrective fresh review. The allowance-003 report was used only as the starting checkpoint. Its work is not counted again.

Allowance **allowance-004** was authorized at **2026-09-11T06:15:22.369Z** for at most 240 minutes, with hard deadline **2026-09-11T10:15:22.369Z**. Actual first execution began **2026-09-11T06:15:24.280Z** (saved-acceptance integration). Production completed its final output at **2026-09-11T10:00:51.397Z**, after cutoff cancellation and the automatic source checkpoint; process exit 0 was observed at 2026-09-11T10:00:57Z. [Exact execution timestamps](execution-stop.json). Stop reason: **elapsed-time-limit**. The existing fifteen-minute source-checkpoint reserve was preserved. No additional window or historical limit reset occurred.

## Progress, without double counting

| Measure | Starting checkpoint | Ending saved state |
| --- | ---: | ---: |
| Integrated singles | 240 | 341 |
| Singles with two-pass evidence, accepted or rejected | 280 | 400 |
| Accepted scenes staged, including binding holds | 26 | 51 |
| Persistent editorial exceptions | 4 | 7 |
| Interrupted corrective-work targets | 10 | 1 |
| Isolated technical exceptions without completed second pass | 20 | 20 |
| Singles never started | 660 | 540 |
| Individually reviewed pairs | 10 | 10 |

There are 960 singles and 115,200 pair examples. Review coverage overlaps integrated, staged and rejected states; do not add these table rows into a corpus total. 20 started singles lack a completed second pass, including technical exceptions and any interrupted first-pass work. 18 staged acceptances are eligible; 33 remain held by explicit binding findings. 126 newly accepted decisions are distinct from integrations, which include saved backlog.

## Saved work reused and editorial process

Nine eligible saved revisions were integrated first without regenerating dialogue or reviews: S141-single-a, S141-single-b, S142-single-b, S145-single-b, S146-single-a, S147-single-a, S147-single-b, S148-single-a and S150-single-b. The interrupted S141–S150 writer draft was then reused for its pending fresh review. [Explicit continuation amendment](pending-review-continuation.json) preserves before/after queue state and original attempts; it did not add retry or correction allowances.

Workers read exact instructions and original/candidate dialogue under unchanged coach-1.0. Fresh reviewers receive no writer scores or improvement claims. Accepted candidates remain frozen; only rejected candidates receive targeted findings for up to two corrections. Weighted totals are calculated in code. Acceptance, binding compatibility, source changes and validated integration remain distinct. Human editorial review is pending.

S143-single-b exhausted its remaining permitted correction and remained rejected at 70: the reviewer identified shifting mug ownership, an inferred forgotten dog, and an ending that restates B. In S151–S160, S157-single-a was initially rejected because extravagant kindness read more strongly than competitive lack of surprise; only that rejected scene received the final correction. In S161–S170, the first fresh review rejected ten scenes, including several whose final development or B's agency remained weak. These findings and all subsequent outcomes are preserved in the ledgers; no score was increased simply to close an exception.

[Integrated two-pass ledger](integrated-two-pass-ledger.json), [staged two-pass ledger](staged-two-pass-ledger.json), [applied before/after exchanges](applied-before-after.md), [all exact results and attempt references](final-results.json).

## Remaining work and exceptions

- Persistent editorial exceptions: S63-single-b (83), S80-single-b (81), S86-single-a (75), S94-single-a (81), S143-single-b (70), S178-single-b (71), S198-single-b (84).
- Interrupted correction targets: S205-single-a.
- Eligible saved acceptances: S201-single-a, S201-single-b, S202-single-a, S202-single-b, S203-single-a, S203-single-b, S204-single-a, S204-single-b, S205-single-b, S206-single-a, S206-single-b, S207-single-a, S207-single-b, S208-single-a, S209-single-a, S209-single-b, S210-single-a, S210-single-b.
- Accepted binding holds: S61-single-a, S61-single-b, S67-single-b, S89-single-b, S95-single-a, S95-single-b, S96-single-a, S96-single-b, S99-single-a, S99-single-b, S111-single-a, S111-single-b, S118-single-a, S118-single-b, S130-single-a, S130-single-b, S144-single-a, S144-single-b, S152-single-a, S152-single-b, S157-single-a, S157-single-b, S161-single-a, S161-single-b, S162-single-a, S162-single-b, S167-single-a, S167-single-b, S168-single-a, S168-single-b, S170-single-a, S170-single-b, S208-single-b.
- Technical exceptions: S131-single-a, S131-single-b, S132-single-a, S132-single-b, S133-single-a, S133-single-b, S134-single-a, S134-single-b, S135-single-a, S135-single-b, S136-single-a, S136-single-b, S137-single-a, S137-single-b, S138-single-a, S138-single-b, S139-single-a, S139-single-b, S140-single-a, S140-single-b.

[Editorial findings](editorial-exceptions.json) and the staged ledger retain precise reservations. Technical S131–S140 received bounded read-only diagnosis: both original writer traces and drafts are preserved and now pass narrow structural/event diagnostics, but neither has the required fresh review/provenance recovery chain. The existing recovery entry point does not support silently relabeling these per-example exceptions. No attempts were added or completion claimed. See [technical diagnosis](technical-exception-diagnosis.json).

Interrupted stages: standing-coach-window-004/batch-003/attempt-03: writer. Only artifacts with validated proofs count as completed, reusable stages. Partial writer or reviewer files remain preserved; an interrupted writer is not described as a finished correction awaiting only review. Exact stage errors and attempt references are in final-results.json.

S205-single-a's interrupted final writer produced no completed writer output. Its prior validated candidate and two completed review passes remain saved, alongside nineteen frozen acceptances from S201–S210. The read-only [resume-policy check](resume-readiness.json) confirms that finishing this final correction remains allowed: one technical failure out of the existing limit of two, with no added editorial round or reset. The current execution window has no editorial time left.

**S06+D49-b remains pending. Bulk exact-pair production remains blocked on implementing and verifying its integration adapter.** No pair draft was promoted because its seed changed. Independent pending singles remain selectable without a new editorial brief.

## Exact dataset effects and preservation

Comparison against this window's fresh starting source copy covers **116160 generated records**: **87 directly revised single dialogues**, **116073 unchanged dialogues**, **0 changed pair dialogues**. 20881 dependent pair references changed mechanically (20879 unreviewed drafts); these are references, not new pair reviews. 49 transfer records changed through normal binding integration. Other record changes: 0.

Mechanically affected references that were already individually reviewed: S192+D74-a, S192+D74-b. Their historical review rows and dialogue remain unchanged; no additional pair review is claimed. S192+D74-a and S192+D74-b both reference the revised S192-single-b, so this relationship must be counted from actual records rather than a fixed multiplier.

All playable card metadata, pair authoring and **250 starting completed review rows** match the baseline. Original/recovered attempts, amendments and historical evidence remain preserved. [Full comparison](complete-dataset-comparison.json), [transfer inputs before/after](transfer-effects.json). Public release version remains **0.26.0-preview.7**; normal builds update dataset-derived asset URLs.

## Verification actually performed

All **7 newly integrated groups** passed **build:examples, audit:all and the full npm test suite** in isolated staging before hash-verified integration. Exact commands, exit codes and archived logs are indexed in final-results.json under integrationValidation. Successful process exit alone did not advance the queue.

Native Chrome checks used each group's exact integrated dialogue, at **320, 412 and 1280 pixels**, with production reader/renderer, worker/manifest URLs and service-worker offline reload. New integration IDs lacking successful matching-dialogue coverage: **None**. Native invocation scope, results and failures are preserved under nativeValidation/nativeAttempts in final-results.json. Companion originals rendered during these tests are not editorially reviewed by that fact.

The S141 tied-shortest nudges case exposed a test assumption: both alternatives have 52 words, so the app legitimately offers both. Initial test and unchanged retry failed the old visibility assertion; an isolated patch attempt then had an indentation error. All failures are preserved. The corrected test verifies each tied choice is shortest and distinct, and passed for S141's tied case and S142's unique-shortest case. The exact tested harness correction is recorded in [native-harness-amendment.json](native-harness-amendment.json); application behavior and all other assertions were preserved. This is a demonstrated harness correction, not a weakened editorial gate.

The unmodified canonical harness passed on final S141/S142 data at all three widths, with offline reload (exit 0, timedOut=false, 38997 ms). [Canonical process and scope](native-current-harness/scope.json).

Native checks used installed desktop Chrome with emulated viewports/touch, not physical devices. No deployment, human editorial approval, verified release or fresh ZIP extraction is claimed. No distribution ZIP was requested or produced. Future release packaging still requires full release verification and fresh extraction.

## Source checkpoint, usage and resumption

[Source receipt](source-checkpoint-receipt.json): **2115 files / 150570520 bytes**, SHA-256 manifest and fresh-copy fingerprint verified. Source: `C:\Users\Ted\OneDrive\Desktop\improv-card-game\github\improv-card-game\.audit-runs\standing-campaign\source-checkpoints\1789121111993-52fa6234-66ea-4256-96b9-0eac9c71ce00\source`. Manifest: `C:\Users\Ted\OneDrive\Desktop\improv-card-game\github\improv-card-game\.audit-runs\standing-campaign\source-checkpoints\1789121111993-52fa6234-66ea-4256-96b9-0eac9c71ce00\manifest.json`. Preserve the corresponding .audit-runs directories and reports/campaign-allowance-004 with this copy; pending attempt and recovery evidence remains at the saved paths. Historical documents were preserved through an explicit [current-status amendment](final-status-amendment.json).

[Final checks](final-checks.json) verify the disjoint 960-scene accounting, all new integration coverage, the 33-check canonical browser run, and the source receipt. The [final process check](final-process-check.json) found no remaining task-owned editor, model worker, native helper or packager; both locks are absent.

CLI-reported usage for new attempts: **input_tokens: 1,164,903; cached_input_tokens: 136,576; cache_write_input_tokens: 0; output_tokens: 411,523; reasoning_output_tokens: 15,936**. CLI turn.completed usage for new attempts, including failed proof checks; copied/reused writer events are not counted twice. Interrupted turns without a usage event are unknown. These are reported tokens, not a price or a separate credit charge. Cumulative recorded campaign time is 60377831 ms, with 382905 ms remaining under the saved allowance. Wall-clock authorization/stop timestamps are reported separately. Existing ChatGPT authentication was verified; no API-key billing, purchases, credentials in prompts, installation, authentication changes, permission bypass, commit, push or deployment occurred.

From the repository root, use the same supported command actually executed this window:

```powershell
node tools/local-audit-campaign.cjs resume --campaign .audit-runs/standing-campaign/campaign.json --codex "C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe" --exclusive-editor
```

This resumes saved stages without granting a new allowance. If its editorial budget is exhausted, a further explicitly authorized execution window is required; a new editorial brief is not. [Verified resume state](verified-resume-state.json).
