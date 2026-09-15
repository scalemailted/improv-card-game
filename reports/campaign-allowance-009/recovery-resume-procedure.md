# Complete checkpoint recovery and resume procedure

Allowance-009 stopped for **elapsed-time-limit**. Editorial stop saved: 2026-09-13T04:36:18.415Z. Hard deadline: 2026-09-13T04:51:18.258Z, including the unchanged fifteen-minute checkpoint reserve. No allowance-010 was granted. Preserve this repository, all referenced queues under .audit-runs, report evidence, recovery helpers and source checkpoint together. A source copy does not replace operational queue state.

## Actual interrupted work

- Queue standing-coach-window-009, batch-001, attempt-03, stage **writer**. Targets: D191-single-b. Existing policy may start: true. Validated writer reusable: false. Writer JSON present: false; reviewer JSON present: false; reviewer proof present: false. Failed attempts: attempt-03; technical failure limit: 2; completed rejected review rounds: 2. File presence alone is not validated review evidence.

The [read-only assessment](interrupted-resume-assessment.json) records exact attempt-history and file hashes, terminal events and current policy. Preserve complete hash-matched artifacts and resume only missing stages. Partial output is not a completed draft or review. This checkpoint grants no technical extension and resets no correction allowance.

## Supported sequence

1. Confirm no coordinator, Codex writer/reviewer, integration operator or live audit lock owns the repository. Do not start a second runner. Read the actual campaign, completion records and this procedure.
2. Run the read-only checkpoint assessment below before normal resume. It intentionally fails if the saved interruption has advanced; inspect newer records rather than changing assertions or resetting history to make it pass.
3. Reuse valid saved writer/review artifacts through the existing runner recovery path. If the assessment reports policyMayStart=true, the existing retry policy permits the missing stage; no extra technical extension is needed. If false, preserve and isolate the case for bounded evidence-based recovery; do not reset failures or add retries automatically. A present reviewer file still requires exact input, process, proof and rubric validation.
4. The exhausted editorial work budget cannot be renewed by resume. A later window requires NEW explicit user authorization, recorded once with grant-allowance after this allowance expires. Save that new authorization in the next unused report directory. The conditional example below assumes allowance-010; inspect actual records first. No such authorization file or allowance was created by this checkpoint.
5. After the new grant and recovery check, integrate any eligible saved acceptances through the supported integrate-accepted command, then resume the same campaign. Retain binding-held scenes and persistent editorial exceptions. Completed, hash-matched work must not be repeated. No routine batch approval is required.

```powershell
node tools/local-audit-campaign.cjs status --campaign .audit-runs/standing-campaign/campaign.json

# Read-only verification of this exact saved interruption:
node .checkpoint-work/recovery-assessment-009.cjs

# ONLY after a NEW explicit authorization and expiry of allowance-009:
node tools/local-audit-campaign.cjs grant-allowance --campaign .audit-runs/standing-campaign/campaign.json --authorization reports/campaign-allowance-010/authorization.txt --minutes 240 --exclusive-editor

# Recheck after the grant; this does not mutate the queue or grant retries:
node .checkpoint-work/recovery-assessment-009.cjs

# Reuse eligible saved acceptances, if any:
node tools/local-audit-campaign.cjs integrate-accepted --campaign .audit-runs/standing-campaign/campaign.json --exclusive-editor

node tools/local-audit-campaign.cjs resume --campaign .audit-runs/standing-campaign/campaign.json --codex "C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.908.40401-win32-x64\bin\windows-x86_64\codex.exe" --exclusive-editor
```

The installed CLI path above was verified during allowance-009; if it no longer exists, inspect the actual installed version/help and normal ChatGPT authentication. Do not install tools, change authentication, use API-key billing or bypass permissions.

## Completed recovery must not be repeated

D141–D150's missing writer stage used its existing second attempt. The original interruption remains preserved. S130, S157, D119 and D126's eight saved acceptances integrated after fresh binding-only reviews and explicit amendments. D171–D180 reused all twenty writer drafts after a hash-mismatched review failed validation. Do not rerun completed binding preparation/integration or reinterpret the earlier failed review as valid.

The temporary stop control was archived and retired before production-02; inspect for any later controls rather than deleting them silently. Current eligible accepted IDs: D191-single-a, D192-single-a, D192-single-b, D193-single-a, D193-single-b, D194-single-a, D194-single-b, D195-single-a, D195-single-b, D196-single-a, D196-single-b, D197-single-a, D197-single-b, D198-single-a, D198-single-b, D199-single-a, D199-single-b, D200-single-a, D200-single-b. Remaining binding holds: S89-single-b, S161-single-a, S161-single-b, S162-single-a, S162-single-b, S170-single-a, S170-single-b, S218-single-a, S218-single-b, S219-single-a, S219-single-b, S223-single-b, S227-single-a, S227-single-b, S230-single-a, S230-single-b, D49-single-a, D49-single-b, D153-single-b, D159-single-b. Exact exceptions and interrupted stages are in final-results.json. A new time window does not renew exhausted editorial corrections.

S06+D49-b remains pending. The ten completed pair dialogues and historical reviews remain preserved; mechanical pair drafts are unreviewed. The exact-pair candidate/review/amendment/integration adapter remains unimplemented and must be verified on a bounded selection before bulk pair production. No ZIP, version change, commit, push or deployment is part of this resume procedure.
