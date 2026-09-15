# Resumable local coach-1.0 runner

This build adds local orchestration, not editorial approval. It discovers completed, source-hash-matched records; the first planned production queue contains at most five pending single-card batches, ten cards/twenty alternatives each. A partly reviewed card keeps its completed alternative as a reference. No production model jobs are launched by `init`, `preview`, or the fixture tests.

The public release version stays unchanged during internal batches. No commits, pushes, deployments, credentials, authentication changes, model installers, or tool installations are part of the runner.

## Local commands

Run from the repository root in PowerShell. `node` and an existing npm installation are required. The checked installation is Codex CLI **0.153.0**, at the path below. The runner rechecks `--version` and `exec --help` on every launch and stops if required flags are unavailable. It does not search for or install a replacement.

```powershell
node tools/local-audit-runner.cjs init --queue .audit-runs/first-five/queue.json --id first-five --max-batches 5 --max-minutes 240 --max-attempts 2
node tools/local-audit-runner.cjs preview --queue .audit-runs/first-five/queue.json
```

If the queue already exists, use `preview`; `init` refuses to replace it. Close other editors/agents writing this repository before the following launch. `--exclusive-editor` records that operating condition; a lock excludes other cooperating runner processes. It cannot lock out an unrelated editor. Source fingerprints detect their edits before integration and stop rather than overwrite them.

```powershell
node tools/local-audit-runner.cjs run --queue .audit-runs/first-five/queue.json --codex 'C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe' --exclusive-editor
```

Resume the **same** queue:

```powershell
node tools/local-audit-runner.cjs resume --queue .audit-runs/first-five/queue.json --codex 'C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe' --exclusive-editor
```

Control a running series from another terminal:

```powershell
node tools/local-audit-runner.cjs stop --queue .audit-runs/first-five/queue.json
node tools/local-audit-runner.cjs status --queue .audit-runs/first-five/queue.json
node tools/local-audit-runner.cjs clear-stop --queue .audit-runs/first-five/queue.json
```

Clearing the stop flag does not launch anything. The time budget is cumulative across invocations, not reset by resume. Maximum batches (1–5), cumulative minutes (1–1440), and attempts per batch (1–3) are persisted at initialization. An exhausted retry budget leaves that batch failed and later batches pending. The runner never silently expands its queue or resets a budget. Explicitly editing a queue limit is an operator decision; preserve the existing queue and evidence. A source conflict requires reconciliation outside the runner; there is intentionally no force-overwrite command.

After a hard process crash, `recover-lock` archives a stale lock only when its recorded owner is on this host and its PID is demonstrably dead. A live or uncertain owner blocks recovery. Partial worker outputs, attempt directories, staging directories, and the integration journal remain intact.

## Editorial and integration protocol

1. The queue fixes scene IDs, card keys, exact original record/dialogue hashes, source fingerprint, rubric hash, attempts, review references and validation results. Completed source drift is an error, not new pending work.
2. A read-only writer invocation receives exact instructions, both originals, the unchanged rubric, fixed narrowly scoped review/preservation instructions, the rubric, complete relevant transfer fields and affected bespoke seed references. It must identify each mechanism/confusable concept, score originals with turn-specific evidence, retain strong scenes, and provide candidate dialogue and honest reservations. It cannot edit canonical files.
3. A **new ephemeral reviewer process**, never a resumed writer session, receives exact cards and candidates plus raw binding facts. It does not receive writer scores, decisions, rationale, mechanism claims or improvement claims. It uses the same six dimensions, weights and eight hard gates. Rejections and remaining concerns persist. This is fresh model review, not independent human review or live testing.
4. JSON schemas guide output; local validators independently check IDs, hashes, score arithmetic, turn citations, complete gates, five spoken ABABA turns, the existing 75-word limit, exact retained text and binding assessments. A numerical threshold is necessary, not automatic semantic certification. A reviewer may leave a scene pending. A process exit alone never completes a scene.
5. Failed/rejected attempts are preserved. Saved, hash-matched worker proofs can resume a completed phase. Unproven output after interruption is never silently adopted. Bounded corrections get another fresh reviewer. An unresolved seed/transfer compatibility problem stops the batch rather than expanding into pair rewrites.
6. One deterministic integration process applies accepted dialogue to a fresh source staging tree, gives revisions explicit internal example versions, writes linked amendments, preserves originals and prior ledgers, and rebinds only inspected seed hashes. Transfer templates, bespoke pair dialogue, card instructions and public release version remain protected. Compiled dependent pair drafts are compared and reported separately; they do not receive reviews. S06+D49-b remains pending.
7. Staging must pass build, **all audits**, and the **full test suite**. The complete generated dataset is compared by stable ID and dialogue hash. Reports distinguish directly reviewed/revised/retained singles, unchanged dialogue, dependent references and mechanically changed pair dialogue. A write-ahead journal permits only enumerated source/generated/evidence/status changes. Before/after hashes allow recovery from partial application; unrelated changes cause a stop. Completion requires the integrated bytes and saved review/test evidence to match.

The CLI uses documented `exec`, `--json`, `--output-schema`, `--output-last-message`, `--ephemeral`, and `--sandbox read-only`. Per-invocation `--ignore-user-config` avoids importing user-configured connectors/hooks into these editorial workers; saved authentication and managed restrictions remain in force. Execpolicy rules are **not** ignored. Approval policy `never` denies operations that would require escalation; it does not grant additional permissions. There are no `dangerously-*` flags. Any reported worker tool use rejects the result. Temporary working directories and payload separation provide context isolation, not an OS guarantee that a model could never discover other readable files. The artifact audit checks the actual tool events.

CLI behavior reference: [OpenAI non-interactive mode documentation](https://learn.chatgpt.com/docs/non-interactive-mode). Installed help is saved with each queue; live authenticated model execution is a separate check from help/fixture verification.

## Validation and checkpoint boundary

**Per internal batch:** build, all audits (including worker-artifact integrity), full tests, exact source/runtime and dependency comparison, immutable two-pass evidence, amendment links, accepted-source journal and completion/status checkpoint. The full test suite includes artificial runner fixtures; their scores are never production reviews. Browser testing is not claimed by these checks.

**Explicit checkpoint:** after the bounded queue completes, rebuild and run all audits/tests in a fresh source snapshot; create one ZIP, CRC-check and safely extract it into a new directory; rerun full build/audits/tests and compare all source hashes. Native browser/offline checks can run against the queue's actual card keys using an already installed Python/Playwright/browser. Missing dependencies are reported; nothing is installed. A requested browser check that fails prevents release packaging. An omitted check is recorded as not run, never as a pass.

```powershell
$env:PYTHONPATH = "$PWD\.checkpoint-work\preview4\python"
$env:CHROMIUM_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
node tools/local-audit-runner.cjs checkpoint --queue .audit-runs/first-five/queue.json --exclusive-editor --python 'C:\Users\Ted\AppData\Local\Python\pythoncore-3.14-64\python.exe' --browser
```

Use those environment paths only if the dependencies still exist locally. The ZIP is named with the current public version **and queue ID**, refuses occupied output paths, and has a verification sidecar with test logs, usage/time when available and explicit browser scope. This is a local source checkpoint. Choosing and updating a new public release version remains separately scoped; the runner does not globally replace historical versions.

Accepted evidence lives at `editorial/local-<queue>-<batch>/`; current internal progress is `editorial/local-audit-status.json`. The private `.audit-runs/<queue>/` directory retains plan, attempts, stop control and recovery journal. Temporary staging trees are retained for diagnosis and are not automatically deleted. Completion summaries list retained, revised, failed and pending scene IDs separately from pair dependencies.


## Diagnosed recovery and batch boundaries

The initial first-five launch produced full writer artifacts but stopped at local contract validation, before any reviewer. Processing failures now identify batch, attempt, stage, scene/criterion where applicable, and exact output/process/stderr/event paths. Their scenes are blocked/pending; only explicit model-review rejections are reported as editorial failures. Historical failed status records remain untouched.

Every rating and evidence field is preserved. Weighted totals are derived arithmetic: when a model supplies an inconsistent total, the worker keeps its exact response in writer.raw.json or reviewer.raw.json and records only the old/new total in the proof. The artifact audit verifies that raw response against the final CLI agent-message event and recomputes the transformation. No dimension score, acceptance threshold, citation requirement, dialogue, or reviewer decision is normalized. Missing evidence still stops processing. Field descriptions remind the model to cite numbered turns; the local validator enforces this independently.

An exhausted queue does not retry on ordinary resume. For a diagnosed incident, recover-batch requires an explicit evidence JSON, a successful real one-card/two-scene test, exact before/current source fingerprints with every reconciled file enumerated, a reason, and a proven saved writer artifact from the failed batch. It snapshots the entire queue, preserves attempts and elapsed time, and records a separate recovery allowance equal to the existing per-batch attempt budget. It can only recover the first incomplete batch once. This is an explicit operator recovery, never an automatic budget increase. Partial/unproven output is not adopted.

    node tools/local-audit-runner.cjs recover-batch --queue .audit-runs/first-five/queue.json --batch batch-001 --evidence reports/runner-recovery/recovery-evidence.json --exclusive-editor

Recovery persists a batch-001 boundary. run/resume accept --through-batch batch-001; later batches stay pending even on repeated resume. Changing this boundary requires an explicit --through-batch argument and does not reset exhausted attempts. The STOP_AFTER_CURRENT_BATCH file, cumulative time budget, source guard and single-writer lock still apply. A boundary stop returns status stopped and exit code 2, even when the selected batch completed successfully; inspect completion and stopReason rather than treating this as editorial rejection.

The September 2026 incident report and actual test evidence are in reports/runner-recovery/. Do not launch batches 002?005 as part of this repair.


## Authorized batch-001 continuation

The user explicitly authorized sending S31-S40 card instructions, original/recovered dialogue, coach-1.0 and narrowly necessary review context to OpenAI through the installed Codex CLI. This does not authorize credentials, .env contents, authentication files, personal files, player history or unrelated repository context in prompts. Writer context is now a fixed review/preservation instruction block instead of full status/handoff files and the preceding forty-example library. The reviewer still receives only exact cards/candidates and relevant raw bindings, without writer scores or improvement claims.

Correction requests include the saved draft and fresh review. First-pass scores/evidence are frozen, and the validator requires every already accepted writer record to remain exactly unchanged. Only rejected candidates may be corrected; a complete artifact is returned with preserved records copied. This prevents retrying a few weaknesses from regenerating the entire batch.


The authorized batch-001 continuation exposed four remaining editorial rejections after its first correction. One additional, explicitly recorded final attempt is allowed for those four; the original queue limit and all previous attempts remain in history. Recovery itself is capped at three attempts. This does not automatically expand other queues or batches.

For that final attempt, sixteen accepted source-hash-matched reviews are carried from attempt-04, and only the four rejected scenes receive a fresh reviewer invocation. Both alternatives of each affected card are supplied, with accepted companions marked reference-only and no prior scores. Raw reviewer.json/proof/events remain separate from reviewer-combined.json. reviewer-reuse.json records the exact source hashes and IDs; the artifact audit verifies both invocations, every carried acceptance, exact candidate hashes and blind-input shape before combining. Rejected rows are never carried as accepted, and changed candidates cannot reuse an older review.


## Separate authorized editorial allowance

The user subsequently authorized at most two targeted correction/fresh-review rounds for S32-single-a, S37-single-b and S40-single-a. This is recorded as batch.editorialAllowance after the exhausted recovery; original limits, attempts and recovery remain intact. The runner validates this allowance against exactly the preceding rejected IDs and caps it at two. Accepted writer records are copied unchanged under the existing full-artifact contract; only rejected candidates are rewritten. Fresh reviewers receive only unresolved candidates and their companion alternatives. Review reuse verifies the complete ancestor proof chain rather than discarding earlier reused evidence. The batch-001 boundary and whole-batch integration gate remain unchanged. Authorization, snapshots, diagnoses and actual results are under reports/runner-recovery/ and .checkpoint-work/runner-editorial-recovery-20260909/.

## Standing campaign continuation after preview.6

The user authorizes continued internal model review without intermediate human approval. Preserve the completed batch-001 recovery and its release verification. Human editorial review occurs at the end. Use only the existing ChatGPT-authenticated Codex account with scoped project prompts; no credentials, private files, paid API setup, authentication changes or permission bypasses.

The persisted first-five queue retains maxBatches=5, maxMinutes=240 cumulatively, and maxAttempts=2 for technical failures. Moving its recovery boundary uses the existing explicit `resume --through-batch batch-005` option; boundaryHistory now preserves the old value. No budget resets or automatic increases occur. Reaching an actual configured limit saves and pauses rather than requesting routine editorial approval. Subsequent selection must discover completed and exception IDs, proceed through pending singles before exact pairs, and preserve the S06+D49-b pending issue. This first-five execution cannot silently exceed its configured five-batch allowance.

Pending batches now opt into correctionPolicy with maxCorrections=2 and the recorded authorization hash. The initial fresh review plus at most two targeted corrections are separate from technical failures. Every accepted writer record and first-pass assessment stays frozen; prior accepted reviews are verified through the existing hash/proof chain. Only rejected scenes and their reference companions reach the fresh reviewer. Arithmetic remains code-derived. No gates change.

An exhausted batch becomes an exception, with accepted-staged and unresolved IDs, review references and all attempts preserved in its private batch directory. No part of that batch is integrated. Other independent queued batches continue. Whole-batch tests and integration remain unchanged; a non-isolatable source, permission, or validation conflict still stops execution. Resume skips exceptions without treating them as completed reviews or retrying them automatically.

Resume this execution (with existing limits):

    node tools/local-audit-runner.cjs resume --queue .audit-runs/first-five/queue.json --codex 'C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe' --exclusive-editor --through-batch batch-005

Evidence and implementation validation: reports/campaign-continuation/. No public-version change or per-batch release ZIP is required.

### Continuation contract and exception clarification

Repeated real writer outputs exposed short confusable-concept labels that failed the existing 20-character evidence gate. The output-schema descriptions now state that requirement explicitly, and validation identifies the exact scene and field. The gate itself is unchanged. Failed attempts remain failed and consume their original technical allowances.

New writer/reviewer inputs include the exact individual seed scenes and card instructions referenced by affected bespoke pairs, in addition to existing transfer/pair facts. No unrelated seeds or personal files are included. Historical inputs and review proofs remain unchanged; exhausted batches are not retried just because this supporting context is now available.

Exceptions now list writer/reviewer binding findings separately from rejected dialogue. If all dialogue is accepted but a binding remains incompatible, the batch is staged as a binding-provenance exception without another dialogue correction call. Accepted candidates are never counted as integrated.

A stopped queue can be packaged at a real pause boundary. The checkpoint still checks all completed records, exact root/source/extraction hashes, build, all audits, full tests, and requested native browser checks. Its source contains only integrated canonical data; the private queue's evidence is copied into a report snapshot (excluding worker workspace descriptors). An incomplete queue is explicitly reported as incomplete, not promoted by packaging. Checkpoint validation uses the established separate validation-time budget; editorial elapsed time and attempt allowances remain unchanged.

## Standing campaign driver (shared execution allowance)

`tools/local-audit-campaign.cjs` is a thin continuation wrapper around the existing runner. The five-batch maximum remains a per-queue size; it is not a human approval boundary for the standing campaign. Subsequent queues discover actual pending single-card keys and exclude all completed or exception keys already reserved by prior queues. They export exact instructions and both alternatives with blank ratings before invoking the normal runner. An unfinished queue is resumed, never skipped.

The campaign inherits the first queue's 240-minute ceiling, including its already consumed time. All queue elapsed times and campaign orchestration overhead are deducted from that single ceiling. A new queue receives only the remainder. Budgets are never renewed automatically. Exhaustion saves and stops; repeating resume does not reset it. Operator-supplied future execution allowances must be explicitly recorded separately, without a new editorial brief or changes to correction gates.

Resume command:

    node tools/local-audit-campaign.cjs resume --campaign .audit-runs/standing-campaign/campaign.json --codex 'C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe' --exclusive-editor

`status` reports the same campaign without model calls. A private coordinator lock prevents competing coordinators; the existing repository lock still permits only one integration writer. `recover-lock --campaign ...` applies the existing dead-owner checks to the coordinator lock; the repository runner's own recovery remains separate.

Actual Codex usage/authentication/permission errors stop the runner as non-isolatable limits before another technical retry or later batch. No credentials, authentication or global permissions are changed.

The existing integration adapter handles singles only. Exact pairs remain a subsequent pending phase; no pair execution or review is claimed by this wrapper. If all singles are processed before the allowance ends, it reports the missing exact-pair integration adapter explicitly rather than treating rebuilt pairs as reviewed.


## Explicit additional recovery allowance

`grant-allowance --campaign PATH --authorization FILE --minutes 240 --exclusive-editor` records a separately authorized window and an immutable snapshot of the prior campaign and queues. It never overwrites elapsed time, prior limits, usage, attempts or correction allowances. The same authorization hash cannot be reused. Additional windows are capped at 240 minutes and never granted automatically.

This recovery window is bounded by both additional recorded execution and a wall-clock deadline, so investigation, editorial work and validation cannot evade it outside the runner. The deadline continues during pauses. Resume uses the same window and stops when it expires. A recorded recovery gate prevents scheduling new authoring before a saved eligible batch has integrated and been verified. S63-single-b and S80-single-b retain their exhausted correction histories. Queue time ceilings may expand only once per explicitly recorded allowance, with an authorization-linked budget history entry; original elapsed time remains.


## Saved S51-S60 binding recovery

`node tools/local-audit-recover-saved.cjs prepare-binding --exclusive-editor` snapshots the exact accepted writer/review chain and proposes only two S53+D60 seedUse corrections. Historical attempts, pair dialogue, IDs, exampleVersion and review status remain unchanged. The paired provenance record now states that authority is already reserved in A1; it does not certify pair fidelity.

`review-binding --codex EXE --exclusive-editor` invokes a fresh binding-only reviewer with exact cards, candidates, amended descriptions and referenced seeds, without writer scores or claims. No single-scene ratings are requested again. All twenty original first/second passes are frozen. A rejected binding cannot integrate.

`integrate-binding --exclusive-editor` verifies those archived proofs, applies the unchanged single-scene integration workflow and explicit provenance-only hash amendments, then requires full build/audits/tests and exact dataset comparison before a journaled canonical transaction. It cannot clear a scene-level rejection or change any other pair field. The original exception remains in history.

`verify-native --python PATH --exclusive-editor` uses the existing Playwright/Chrome installation against all twenty newly integrated production scenes at 320/412/1280 widths, including service-worker offline reload. Only actual success clears the recovery gate. Permission errors require normal approval, not an installation or global permission change. Every recovery/editorial/validation phase records elapsed time under the same additional window.


## Saved S41-S50 metadata recovery and priority

After the S51-S60 production-reader gate passes, `node tools/local-audit-recover-saved.cjs recover-metadata --codex EXE --exclusive-editor` recovers the proven S41-S50 writer output. It permits only the two short confusableConcept fields to change, and verifies all twenty dialogue/first-pass records unchanged. A fresh normal reviewer remains required. Original attempts stay failed; one separate, authorization-linked technical recovery failure is allowed. This does not add any editorial correction rounds, especially for S63-b or S80-b.

The campaign selects the earliest unfinished queue, including reopened recovery work, before a later interrupted queue. Following actual verified integration, it updates sibling source guards only with explicit before/after guard history and exact checks of every pending original and completed review. No seed binding hashes or review status are blindly refreshed.

This recovery window reserves 75 minutes for the requested verified application checkpoint. Editorial scheduling stops at `checkpoint-reserve-reached`; the reservation never renews the additional window. The same resume command retains both cumulative history and the fixed deadline.


## S43 provenance recovery

A later explicitly authorized time grant preserves an already verified recovery gate and its existing evidence references. It does not repeat completed editorial work or require another saved-batch integration solely because the clock was renewed. Pending delivery verification remains pending. Queue source guards, hash-matched completed records, correction limits, whole-batch acceptance and validation checks still apply. A new grant is refused while the existing allowance has time and cannot reuse an already consumed authorization file.

The fresh S41-S50 binding assessment confirmed that S43+D32-a never permits the shortcut claimed by its seedUse. The same evidence-preserving recovery path supports `--binding-batch batch-002` on prepare-binding, review-binding, integrate-binding, and verify-native. It permits only S43+D32-a seedUse to change; alternative b, pair dialogue, review status, and all accepted single reviews remain unchanged. All twenty single candidates must first have valid accepted reviews. A separate fresh binding review is mandatory. Historical S53 recovery proof derivation is unchanged. S06+D49-b is explicitly outside the supported scope.


## Per-example acceptance (allowance-002)

The explicitly authorized per-example policy supersedes the historical whole-batch editorial gate. The unchanged coach-1.0 scores, evidence, fresh model proofs, source bindings and full technical validation still apply. Accepted examples integrate in journaled atomic groups; completed group ledgers list their exact scope and the parent batch stays partial until all its examples are complete. Rejected originals remain in runtime. A card-specific incompatible binding stages that card, not unrelated scheduling companions. Existing model artifacts are reused exactly. Each group preserves both full review artifacts and its explicit selected IDs; audits independently verify every selected acceptance.

After recording the policy and verifying source guards, `node tools/local-audit-campaign.cjs integrate-accepted --campaign .audit-runs/standing-campaign/campaign.json --exclusive-editor` releases eligible saved work without model calls. It honors the shared allowance/reserve and single integration lock. Interrupted journals resume with exact before/after hashes; no completion is inferred from process exit. Ordinary campaign resume applies the same policy to subsequent reviews and skips terminal partial batches while preserving their exceptions.

Release packaging keeps canonical source, generated runtime and original editorial evidence. Redundant report queue snapshots, previous ZIPs, extraction trees and temporary dependencies are excluded from the new archive and remain untouched locally. Full source/extraction build, audit, test and native checks remain mandatory at the window checkpoint.


Partial batches with accepted, unapplied groups or pending journals remain resumable ahead of later queues. Source journals recover before starting other work; stop controls then prevent a new group. Current status separates integrated examples from the preserved historical exception object. A failed validation records its real stop reason. Interrupted-phase recovery is a single explicit technical continuation of an unfinished correction, with the original attempt hash/snapshot preserved; the maximum of two completed editorial correction rounds does not change.

## Routine source checkpoints (allowance-003)

The current authorization supersedes the historical requirement to package at each execution-window pause. Campaign `pausePolicy.mode = source-only` saves a fresh source copy with a SHA-256 file manifest, campaign/queue snapshots, integrated review evidence and actual validation status when resume or integrate-accepted stops. Pending attempt and recovery paths remain explicit in the saved state and are preserved in their existing private queue directories; retain those directories with the source checkpoint. Copy/guard failures are recorded separately and never reset an acceptance or roll back a validated transaction. No distribution packager or release-test process is invoked by this path.

The source-only pause reserve is 15 minutes within the same authorized wall-clock window; the former 75-minute distribution reserve is preserved in policy history. Integration still requires the existing grouped build, all audits and full tests. Passed integration results are referenced, not rerun merely for a pause report. The explicit `checkpoint` release command still requires full source and fresh-extraction validation before a ZIP is verified; native/offline limitations remain release limitations. Do not run that distribution command without a separate release request. Public preview.7 remains unchanged.

Exact accepted retentions do not rebind a seed or change a transfer. They can record their completed single review while a card's existing binding finding remains pending. Revisions still require compatible writer and reviewer binding evidence. Original incompatible findings stay in the archived artifacts; accepting a retained single never endorses its dependent pair drafts.


### Completed transport reconnects (allowance 003)

The installed CLI can emit an error-shaped Reconnecting notice and then produce a successful completed turn. The worker now recognizes only the observed reset, DNS, idle-WebSocket and request-timeout reconnect messages, followed by a final turn.completed and an agent-message JSON exactly matching the saved output. Unknown errors, turn.failed, missing completion/output, mismatched messages, tools, nonzero exit and timeout still fail. Every recovered transport event is retained in the proof. Card/rubric/schema/hash/amendment gates and retry limits are unchanged. The event taxonomy is documented at https://learn.chatgpt.com/docs/non-interactive-mode; the narrow reconnect classification is supported by the saved installed-CLI trace in reports/campaign-allowance-003/reconnect-real-trace.json.

This repair applies to subsequent invocations. Window-003 batch-001 attempts 01 and 02 remain failed and their candidate files unproven; no review or integration was manufactured and no retry count was reset. They require explicit artifact recovery under the existing evidence procedure before fresh review. Other independent pending batches may continue.

## Allowance-005 continuation repairs

Saved invocation reuse and the completed-ledger audit now apply the same narrow completed-reconnect validator as the live worker. Unknown errors, incomplete or mismatched output, tool use, terminal failure, nonzero exit and timeout still fail. Raw traces and any code-calculated total amendments remain archived. This closes a shared integration defect; it does not turn an old failed attempt into a completed review.

Integrating a saved subset preserves an interrupted correction as active when the original technical and editorial policy still permits it. Exhausted corrections remain terminal. S205-a resumes its remaining final correction; no new editorial rounds are granted.

The explicitly authorized S131-S140 recovery may archive a derived writer proof in a new attempt only after checking the exact saved prompt/input/schema, successful process, completed matching final message, known reconnect notices and unchanged source hashes. Original failed attempts stay untouched. The existing technicalRecovery mechanism permits one separate technical failure and the unchanged maximum two editorial corrections. A fresh reviewer is required before any acceptance or source integration.


Allowance-005 narrowly extends the existing binding-recovery proof to S67-single-b, whose older writer lacked D101 supporting seeds. It permits no pair-field changes, freezes all original single ratings and dialogue, requires exact hashes of both preserved S67+D101 pairs, and requires a fresh context-complete binding-only reviewer. Other holds and rejected scenes are not cleared. Operator steps (same active allowance, stopped coordinator, exclusive locks) are `node .checkpoint-work/context-recovery-005.cjs prepare`, `review CODEX_PATH`, and `integrate`; archived specs/proofs prevent silent replay.

For the demonstrated S131-S140 incident, `node .checkpoint-work/recover-transport-005.cjs` records the authorized one-time technical recovery before the normal campaign resume. The transport-recovery module verifies the original process, exact prompt/input/schema and completed final message, preserves original bytes, and derives arithmetic only in a new attempt. Existing failed attempts and usage are never relabeled. These narrowly scoped recovery commands do not create another execution window.


Allowance-006 adds a narrowly scoped provenance amendment proof for the demonstrated S111, S118, S144, S208, D02 and D06 binding holds. It allows only explicitly enumerated seedRefs and seedUse edits, with before/after record hashes, exact supporting seeds and a fresh binding-only reviewer. Card text, all pair dialogue/status/version fields, accepted single dialogue and original ratings remain frozen. The schema-2 bundle uses the existing binding-recovery verifier and atomic per-example integration; it does not clear transfer-wording holds or establish the unfinished pair integration adapter. Operator steps under a stopped coordinator and its existing allowance are `node .checkpoint-work/provenance-recovery-006.cjs prepare`, `review CODEX_PATH`, and `integrate`. Valid proofs are reused; rejected binding repairs remain isolated. No new allowance or scene correction round is created.


### Allowance-007 targeted binding amendments

The demonstrated D14 microphone-attribution hold uses the existing schema-2 provenance path, with pair dialogue and all scene ratings frozen. Eight explicit transfer-content scopes (S95, S96, S99, S167, S168, S235, S236, S238) use schema 3: only the five transfer text fields may change, with exact before/after hashes, preserved original invocation artifacts and fresh binding-only review. Identity, seed IDs, historical hashes, placeholders and draft status cannot be rewritten by this amendment. The normal integration first binds validated accepted single dialogue, then applies the proven text amendment in isolated staging and records its relationship in transfer-binding-review.json. All build/audit/test gates and atomic application remain required. This is no individual pair approval and does not implement the pair-production adapter.

Under a stopped coordinator, existing allowance and exclusive writer locks, operator commands are `node .checkpoint-work/binding-recovery-007.cjs prepare`, `review CODEX_PATH`, and `integrate`. Passing saved proofs are reused; incomplete/rejected artifacts are preserved for bounded diagnosis. The operator clears the archived internal stop control and resumes the same campaign after recovery, without another allowance.


### Allowance-008 narrow binding scopes and completed reconnect recovery

Local replay reproduced S61 competitive superiority replacing resentful imitation, S131 explicit dependence replacing its concealment, S139 missing severe consequences, and S152 a promise replacing a past favor. These four keys now use the existing schema-3 proof path with independent metadata/slot/source-drift and frozen-review regression fixtures. Only the five transfer text fields can be amended after fresh binding-only review. All original single ratings, candidate dialogue, old hashes, attempts and dependent pair pending status remain preserved. Operator commands under a stopped coordinator and the same live allowance are `node .checkpoint-work/binding-recovery-008.cjs prepare`, `review CODEX_PATH`, and `integrate`; archive and remove the internal stop control before normal resume. Rejected repairs remain staged. This does not address S06+D49-b or implement pair integration.

D91-D100 correction attempt-04 demonstrated the exact new reconnect cause `stream disconnected before completion: WebSocket protocol error: Connection reset without closing handshake`. The existing strict validator now recognizes only that additional observed cause, still requiring successful process, final completed turn, exact final-message/artifact equality and no tool use. Unknown errors, permission/authentication failures, missing terminal evidence and mismatches still fail. The existing transport-recovery module can derive a proof into a fresh artifact directory after validating exact prompt/input/schema and unchanged candidate content; original failed history is never relabeled. No technical or editorial allowance is reset by this classifier repair.


A completed-reconnect classifier failure may be linked as resolved only after the existing transport recovery and completed fresh review are both verified. `resolvedTransportFailures` preserves the original failed attempt hash and recovered proof hash; runtime checks revalidate original bytes, successful process, exact completed output, input, schema, frozen recovered writer and fresh review. It excludes only that proved classifier failure from outstanding technical failures, without changing maxAttempts, the attempt-slot bound, maxCorrections, prior failure rows, or any score. Duplicate, forged, stale, interrupted, permission or genuine process-failure claims still fail. This permits D99-b's one remaining ordinary correction; it does not grant another correction or technical recovery allowance.


### Allowance-009 demonstrated binding scopes

Saved failures reproduce S130 attribution replacing fuller understanding and S157 missing sincere admiration. These two keys use the existing schema-3 transfer amendment path. D119 and D126 use the existing schema-2 description amendment path to distinguish historical source snapshots from retained current contributions; pair dialogue and pending reservations remain unchanged. Fresh binding-only review, exact hash chains, frozen accepted single records and all technical gates remain required. Regression fixtures reject unrelated pair scopes, changed dialogue, stale provenance, metadata drift and slot changes. This is a narrow scope extension, not a runner redesign or pair integration adapter.

With the coordinator stopped and the same allowance live, operator commands are `node .checkpoint-work/binding-recovery-009.cjs prepare`, `review CODEX_PATH`, then `integrate`. Archive the internal stop control with `node .checkpoint-work/retire-control-009.cjs binding-recovery-complete` before normal campaign resume. Rejected binding proposals remain staged. No command grants another execution window or resets correction limits.


D119 replay exposed an audit that compared an older valid provenance amendment directly with the current pair, rejecting a later explicitly reviewed description amendment. Current-source verification now follows only a unique continuous per-pair before/after hash chain through independently verified binding-recovery bundles. Missing links, forks, cycles, changed dialogue and unproved successor artifacts still fail. Historical evidence is not rewritten, and this does not approve pair dialogue.
