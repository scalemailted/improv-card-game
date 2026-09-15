# Checkpoint-specific recovery and resume

Allowance-008 stopped editorial production at **2026-09-12T08:19:53.338Z**, at its configured work-time boundary. Its hard wall-clock deadline is **08:34:52.678Z**, including the unchanged fifteen-minute checkpoint reserve. No ninth allowance was granted. The queue identifier `standing-coach-window-008` is a work queue, not an additional execution allowance.

Preserve this repository, `.audit-runs/standing-campaign`, all referenced queues and attempts, the report directory, and `.checkpoint-work` recovery helpers together. A source-only checkpoint does not replace the operational state and evidence. Do not start a second runner or integration editor.

## Actual interrupted phase

The active queue is `.audit-runs/standing-campaign/standing-coach-window-008/queue.json`, batch-001, D141–D150, both alternatives. Attempt-01 began at 08:13:34.737Z and stopped in the **writer** stage with `signal=SIGTERM`, `timedOut=true`. Its event log contains only `thread.started` and `turn.started`. There is no writer JSON, writer proof, reviewer JSON, reviewer proof, completed turn, or completed original assessment to inherit. The twenty original source snapshots, exact input, prompt, process result and startup events remain preserved. Do not claim that twenty completed candidate drafts exist.

The read-only [interruption assessment](interrupted-resume-assessment.json) verifies every saved artifact hash, current scene bindings, the exact failed attempt history and the existing policy. There is one recorded technical failure against the existing limit of two, no completed editorial correction, and both of the two editorial correction rounds remain. `policy.mayStart` passes. **No interrupted-phase technical extension or queue mutation is required.** The normal resume will start the missing writer stage in the next attempt after time is authorized; it will preserve attempt-01. This is a missing stage, not regeneration of accepted work.

The read-only check can be repeated while this exact checkpoint remains unchanged:

```powershell
node .checkpoint-work/recovery-assessment-008.cjs
```

It intentionally fails if the attempt history has advanced. Inspect newer records instead of resetting them or adapting the assertion to conceal changes.

## Completed recovery must not be replayed

D91–D100 is fully integrated and verified. Its fourteen saved acceptances, six corrections, successful transport-artifact recovery, fresh reviews and final D99-b correction are already recorded. Do **not** rerun `prepare-interrupted-resume-007.cjs`, `recover-completed-correction-008.cjs`, or `record-resolution-008.cjs`. Their historical failures and proof-backed resolution remain intact. See [recovery evidence](recovery-final-result.json).

There are no unheld eligible acceptances at this checkpoint. Twenty-six accepted scenes remain binding-held; [the staged ledger](staged-two-pass-ledger.json) preserves the exact findings. Twelve persistent editorial exceptions remain closed to routine correction, including the new D118-b and D131-a. A new time window does not reset any correction limit. Resolve a binding only with justified provenance evidence or the required fresh review, never a hash-only override.

## Supported sequence after a new explicit authorization

1. Confirm no coordinator, integration writer or live audit lock owns the repository. Read the actual status and this checkpoint's assessment. Preserve all completed, hash-matched work.
2. Allowance-008 has no editorial work time left. A new window requires a **new explicit user authorization**, saved verbatim in the next unused report directory. The grant mechanism also requires the previous allowance to have no remaining time; do not grant before its hard deadline above, reset history, remove the reserve, or automatically grant another window.
3. Run the documented grant command once. For the expected next allowance, the commands below use `campaign-allowance-009`; use actual records if they have advanced. No authorization file or allowance-009 has been created by this checkpoint.
4. Recheck the interruption assessment against the saved state. No extra technical recovery step is needed here. Integrate eligible saved acceptances if later provenance work has made any eligible, then resume the same campaign. With the current twenty-six holds unchanged, `integrate-accepted` will not release them merely because a new allowance exists.

```powershell
node tools/local-audit-campaign.cjs status --campaign .audit-runs/standing-campaign/campaign.json

# Only after NEW explicit user authorization and expiry of allowance-008:
node tools/local-audit-campaign.cjs grant-allowance --campaign .audit-runs/standing-campaign/campaign.json --authorization reports/campaign-allowance-009/authorization.txt --minutes 240 --exclusive-editor

# Read-only verification of this exact interruption; no limits or state reset:
node .checkpoint-work/recovery-assessment-008.cjs

# If eligible saved acceptances exist after justified binding recovery:
node tools/local-audit-campaign.cjs integrate-accepted --campaign .audit-runs/standing-campaign/campaign.json --exclusive-editor

node tools/local-audit-campaign.cjs resume --campaign .audit-runs/standing-campaign/campaign.json --codex "C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe" --exclusive-editor
```

The exact normal resume command above ran successfully in allowance-008; it was not reissued as an exhausted-budget no-op. Use the installed CLI's normal ChatGPT authentication and existing permission safeguards. No API-key billing, purchases, authentication changes, installation, permission bypass, commit, push or deployment is authorized. If a separate permission check blocks an action, preserve the rejection and report that exact action instead of repeatedly retrying or weakening permissions.

The next queue's five packets, D141–D190, were exported with blank ratings. D141–D150 is interrupted; D151–D190 remains unstarted in that queue. D191–D240 is also untouched. S06+D49-b remains pending, and the exact-pair integration adapter is still unimplemented. No bulk pair production may begin before its actual review-to-integration path is verified. Mechanical pair regeneration is not individual semantic review.
