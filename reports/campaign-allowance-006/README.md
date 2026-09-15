# Campaign allowance-006 results

This is new work under one additional 240-minute authorization. Allowance-005 is the starting checkpoint and is not counted again. Public version remains 0.26.0-preview.7; no distribution ZIP, commit, push or deployment.

Authorized: 2026-09-11T18:32:42.519Z. First real production (targeted recovery): 2026-09-11T18:34:46.052Z. Editorial stop saved: 2026-09-11T22:17:43.352Z; coordinator exit observed: 2026-09-11T22:18:55.221Z. Hard deadline: 2026-09-11T22:32:42.519Z. Actual stop reason: **elapsed-time-limit**. The original fifteen-minute checkpoint reserve and all five prior allowances remain preserved. [Execution record](execution-stop.json), [start evidence](execution-starts.json), [allowance-history check](allowance-history-check.json).

| Measure | Starting | Ending |
|---|---:|---:|
| Singles integrated | 439 | 505 |
| Singles with two-pass evidence | 500 | 560 |
| Eligible acceptances staged | 0 | 0 |
| Accepted binding holds | 54 | 46 |
| Persistent editorial exceptions | 7 | 9 |
| Interrupted targets | 20 | 20 |
| Technical-exception scope | 20 | 0 |
| Never-started singles | 440 | 380 |
| Individually reviewed pairs | 10 | 10 |

Interruption and technical scope may overlap other unfinished categories. Exact IDs and evidence are in [final results](final-results.json), [staged ledger](staged-two-pass-ledger.json) and [editorial exceptions](editorial-exceptions.json). Two-pass evidence is not the same as acceptance or integration.

## New work and recovery

60 first-time two-pass scene reviews. 66 newly integrated examples: 56 revised and 10 retained. Binding reviews added no scene ratings. [Applied before/after report](applied-before-after.md), [integrated two-pass ledger](integrated-two-pass-ledger.json).

D11-D20's two original failed attempts were preserved. Local validation replay found nineteen valid writer records and only D19-b's six-turn structure failure. The narrow repair preserved those nineteen records and all twenty original first-pass records, then obtained a fresh twenty-scene review. D19-b was rewritten as a coherent ABABA competition, rather than trimming its extra turn, and passed at 97. Ten rejected candidates received one targeted correction; three received their remaining final correction. Seventeen then passed normal integration checks. D14-a/b remained binding-held; D20-a remained rejected at 82 after both permitted corrections and is reserved for final human review. The seven starting persistent editorial exceptions were not reopened.

The final D11-D20 correction invocation encountered a websocket idle timeout. The CLI's own reconnect completed with a proven matching artifact before the bounded stop action. No worker was terminated, accepted records were not regenerated, and no additional editorial round was granted. [Format recovery](format-recovery-result.json), [original validation replay](validation-replay.json), [transport diagnosis and resolution](D11-D20-correction-transport-diagnosis.json), [preservation checks](preservation-check.json).

D21-D30's final three-scene correction also encountered a websocket idle timeout. Its normal reconnect completed after 1,481,511 ms, before the documented 25-minute bounded stop action. The ownership-checked stop script detected that the stage had advanced and terminated nothing. Seventeen accepted writer records were frozen, and the three corrected candidates went to fresh review. [Transport diagnosis and resolution](D21-D30-correction-transport-diagnosis.json).

D31-D40's initial writer encountered a websocket idle timeout followed by repeated DNS failures. A scoped public DNS check confirmed resolution had recovered; the CLI's own HTTPS fallback completed with a valid artifact after 1,699,160 ms, within its documented thirty-minute diagnostic bound. No worker was terminated, no settings changed, and no second writer invocation regenerated the batch. [Transport diagnosis and resolution](D31-D40-transport-diagnosis.json).

D21-D30 completed with twenty integrations after twelve initial corrections and three final corrections. D31-D40 preserved thirteen initial acceptances, corrected seven candidates, then corrected only D38-a and D40-a in the final round. D38-a passed at 92 with its reservation; D40-a remained rejected at 83 because the final move tended toward reproach rather than stronger investigative pressure. Nineteen D31-D40 scenes passed integration. The campaign then automatically exported the next pending queue and started D41-D50 within this same allowance. [D31-D40 review reconnect](D31-D40-reviewer-reconnect.json).

Newly reviewed IDs: D11-single-a, D11-single-b, D12-single-a, D12-single-b, D13-single-a, D13-single-b, D14-single-a, D14-single-b, D15-single-a, D15-single-b, D16-single-a, D16-single-b, D17-single-a, D17-single-b, D18-single-a, D18-single-b, D19-single-a, D19-single-b, D20-single-a, D20-single-b, D21-single-a, D21-single-b, D22-single-a, D22-single-b, D23-single-a, D23-single-b, D24-single-a, D24-single-b, D25-single-a, D25-single-b, D26-single-a, D26-single-b, D27-single-a, D27-single-b, D28-single-a, D28-single-b, D29-single-a, D29-single-b, D30-single-a, D30-single-b, D31-single-a, D31-single-b, D32-single-a, D32-single-b, D33-single-a, D33-single-b, D34-single-a, D34-single-b, D35-single-a, D35-single-b, D36-single-a, D36-single-b, D37-single-a, D37-single-b, D38-single-a, D38-single-b, D39-single-a, D39-single-b, D40-single-a, D40-single-b.

Integrated revisions: S111-single-a, S111-single-b, S118-single-a, S118-single-b, S144-single-a, S144-single-b, S208-single-b, D02-single-b, D06-single-a, D06-single-b, D11-single-a, D11-single-b, D12-single-a, D12-single-b, D13-single-b, D15-single-a, D15-single-b, D16-single-a, D16-single-b, D17-single-a, D17-single-b, D18-single-a, D18-single-b, D19-single-a, D19-single-b, D20-single-b, D21-single-a, D21-single-b, D22-single-a, D22-single-b, D23-single-a, D23-single-b, D24-single-b, D25-single-a, D25-single-b, D26-single-b, D27-single-b, D28-single-a, D29-single-b, D30-single-a, D30-single-b, D32-single-a, D32-single-b, D33-single-a, D33-single-b, D34-single-a, D34-single-b, D35-single-a, D35-single-b, D36-single-a, D37-single-a, D37-single-b, D38-single-a, D39-single-a, D39-single-b, D40-single-b.

Integrated retentions: D13-single-a, D24-single-a, D26-single-a, D27-single-a, D28-single-b, D29-single-a, D31-single-a, D31-single-b, D36-single-b, D38-single-b.

## Binding backlog and pair boundaries

All 54 starting holds were replayed from saved writer/reviewer artifacts before new binding review. Causes: 43 transfer-wording holds, ten bespoke attribution holds, and one mixed transfer/provenance hold. [Replay](binding-validation-replay.json), [classification](binding-classification.json).

Resolved starting holds without regenerating dialogue or valid scene reviews: S111-single-a, S111-single-b, S118-single-a, S118-single-b, S144-single-a, S144-single-b, S208-single-b, D02-single-b, D06-single-a, D06-single-b. Six fresh binding-only reviews accepted explicit amendments for S111, S118, S144, S208, D02 and D06. Crossed alternative references were corrected; descriptions now distinguish literal source material, conceptual adaptations and historical contrasts. The shared integration repair allows only enumerated seedRefs/seedUse edits with exact before/after hashes, preserved original invocation proofs and a fresh binding review. Its dataset-comparison exception accepts only those proven reference differences, never changed dialogue, status or versions. [Amendment/review index](provenance-results.json), [implementation validation](provenance-code-validation.json).

11 canonical pair provenance records were explicitly amended; 7 generated pair records changed references without changing dialogue. No pair received a new individual coach-1.0 review. All ten prior pair dialogues and their historical review rows remain unchanged. S124+D06 descriptions now correctly distinguish historical versus revised disclosure behavior and the club-briefing source. S144+D126-b's final container classification does not establish a clear switch among the original disappearance theories; that reservation remains pending exact-pair review. S22+D14-a's microphone attribution, S192+D74-b's pre-existing provenance granularity discrepancy and S06+D49-b remain pending. The exact-pair integration adapter still must be implemented and verified before bulk pair production.

The affected historical S01+D13 and S192+D74 seed roles were also inspected explicitly: [reviewed pair reference inspection](reviewed-pair-reference-inspection.md). This adds no individual pair-review credit.

Remaining binding-held IDs: S61-single-a, S61-single-b, S89-single-b, S95-single-a, S95-single-b, S96-single-a, S96-single-b, S99-single-a, S99-single-b, S130-single-a, S130-single-b, S131-single-a, S131-single-b, S139-single-a, S139-single-b, S152-single-a, S152-single-b, S157-single-a, S157-single-b, S161-single-a, S161-single-b, S162-single-a, S162-single-b, S167-single-a, S167-single-b, S168-single-a, S168-single-b, S170-single-a, S170-single-b, S218-single-a, S218-single-b, S219-single-a, S219-single-b, S223-single-b, S227-single-a, S227-single-b, S230-single-a, S230-single-b, S235-single-a, S235-single-b, S236-single-a, S236-single-b, S238-single-a, S238-single-b, D14-single-a, D14-single-b. Their exact causes remain in the staged ledger; transfer wording was not cleared by hash refresh. Eligible accepted but not integrated: None. Persistent editorial IDs: S63-single-b, S80-single-b, S86-single-a, S94-single-a, S143-single-b, S178-single-b, S198-single-b, D20-single-a, D40-single-a. Interrupted IDs: D41-single-a, D41-single-b, D42-single-a, D42-single-b, D43-single-a, D43-single-b, D44-single-a, D44-single-b, D45-single-a, D45-single-b, D46-single-a, D46-single-b, D47-single-a, D47-single-b, D48-single-a, D48-single-b, D49-single-a, D49-single-b, D50-single-a, D50-single-b. Technical-exception IDs: None.

## Complete dataset comparison

Against the verified starting source copy, across 116160 records:

- 56 directly revised single dialogues.
- 11750 mechanically changed pair draft dialogues, with semantic review still pending.
- 104354 unchanged dialogues, including reviewed retentions.
- 13266 dependent pair references (13263 unreviewed drafts).
- 7 explicitly amended generated references without dialogue changes.

Previously reviewed pair references affected mechanically: S01+D13-b, S124+D06-a, S124+D06-b. All card wording, IDs and card contentVersion values, and all 449 starting completed review rows, were preserved. [Full comparison](complete-dataset-comparison.json), [transfer effects](transfer-effects.json).

## Actual validation and limitations

Every one of the 9 new integration groups passed build:examples, audit:all and the complete npm test workflow before atomic application. The provenance implementation separately passed that full workflow, including the new proof/tamper regression fixture and existing worker/manifest URL and offline regressions. A scratch fixture setup initially refused to overwrite an existing destination; its rerun used a fresh directory. An early prepare invocation was refused by the still-held reconciliation lock and made no edits; preparation succeeded after the owner finished. Those safeguards were not bypassed. D06 initially passed build and audits but failed the historical full-record equality test because of its explicitly amended seedUse. The test now traces a verified description-only amendment while retaining exact dialogue, references, versions and all other metadata; a separate full validation passed before the integration retry reused the unchanged model artifacts. The same assumption was also found in the two historical singles tests; all three now share the proof-backed helper. Both failed stages and logs remain in [D06 test recovery](D06-integration-test-recovery.json).

Passing native Chrome checks cover 66 of 66 new integrations at 320, 412 and 1280 pixels, including offline reload. Exact immutable stage manifests and scene hashes are recorded per native folder. Uncovered IDs: None. Native attempts: 9; passing native reports: 9. Any failed attempts remain in final-results.json rather than being overwritten. No physical-device, human editorial, deployment or ZIP-extraction check is claimed. Source-copy verification is separate from distribution release validation.

CLI-reported usage for this window: {"input_tokens":716515,"cached_input_tokens":194432,"cache_write_input_tokens":0,"output_tokens":220630,"reasoning_output_tokens":9456}. Unique CLI turn.completed events for new writer/reviewer invocations and separate binding reviews, including failed proof checks. Reused/copied invocation events are deduplicated. Interrupted turns lacking usage events are unknown; account quota remaining is not exposed. Authentication remained the existing ChatGPT account; no API-key billing, credit purchase or authentication change was used. Recorded execution usage through the final source checkpoint is 12410194 ms; wall-clock start/stop and the reserved checkpoint interval are reported separately. [Invocation usage and actual validation records](final-results.json).

## Source checkpoint and resume

Fresh source copy: C:\Users\Ted\OneDrive\Desktop\improv-card-game\github\improv-card-game\.audit-runs\standing-campaign\source-checkpoints\1789165252566-b88142b3-e073-4f03-891d-ece3e96522e1\source. 3301 files (200321743 bytes) matched the manifest and source guard. [Source-copy receipt](source-checkpoint-receipt.json). Preserve the campaign directory, all queue directories and pending artifacts alongside that copy; they retain attempts, failures, accepted reviews and recovery history. No ZIP was created.

With this same repository and no other integration writer, inspect saved status:

```powershell
node tools/local-audit-campaign.cjs status --campaign .audit-runs/standing-campaign/campaign.json
```

If the current window still has editorial time, resume without another grant:

```powershell
node tools/local-audit-campaign.cjs resume --campaign .audit-runs/standing-campaign/campaign.json --codex "C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe" --exclusive-editor
```

At this window's boundary, that command does not renew its limits. After the existing allowance expires, a **new explicit user authorization** is required before recording another window. Save that new authorization to its own file, then use the existing mechanism (no further window is granted by this report):

```powershell
node tools/local-audit-campaign.cjs grant-allowance --campaign .audit-runs/standing-campaign/campaign.json --authorization PATH_TO_NEW_EXPLICIT_AUTHORIZATION --minutes 240 --exclusive-editor
node tools/local-audit-campaign.cjs resume --campaign .audit-runs/standing-campaign/campaign.json --codex "C:\Users\Ted\.vscode\extensions\openai.chatgpt-26.901.22334-win32-x64\bin\windows-x86_64\codex.exe" --exclusive-editor
```

Do not reset historical elapsed time, retire an unresolved review, remove a live lock or restart completed hash-matched stages. No new editorial brief or routine batch approval is needed. Recover pending artifacts at their actual stage with only their remaining correction/technical allowances; preserve persistent exceptions for final human review. The unfinished pair adapter remains a prerequisite.

D41-D50 has twenty validated writer records and no completed second-pass review. Its first reviewer invocation hit the elapsed limit. A local reuse check verified the saved writer hash and input, zero completed editorial correction rounds, and one technical failure against the existing limit of two. The normal resume path can reuse the writer and retry fresh review after a new authorized allowance. No model was invoked by this check. [Pending resume verification](pending-resume-verification.json).

## Representative resulting exchanges

### D19-single-b

Turn every difference or disagreement into a competition you intend to win.

**A:** My tea's stronger than yours. I can handle it without milk.

**B:** Same teapot. I added milk so I could drink mine sooner.

**A:** First to finish, then. I've only got two mouthfuls left.

**B:** I've finished. I'm making another.

**A:** Fewest refills wins, then. I can make these two mouthfuls last all breakfast.

B4 causes A5: B has already finished and is refilling; A changes victory to avoiding refills.

Reservation: No rewrite needed. B's relationship to A is unspecified, but shared breakfast supplies sufficient interaction.

### D06-single-a

Probe for what others know while revealing as little as possible.

**A:** When you say you heard about the party, which part?

**B:** The cake went over the balcony. Was that before you left?

**A:** Who gave you the timing?

**B:** Nobody. Your brother says there's a video.

**A:** Have you watched it, or are we both relying on my brother?

B4 causes A5: B4 attributes a video's existence to A's brother; A5 asks whether B watched it or only heard about it.

Reservation: The humor is understated and A3's source question is conspicuously evasive, but both serve the intended behavior. Retain unchanged.

### D18-single-b

Perform expertise so confidently that no one questions you.

**A:** I'll tune your violin for the audition. I work by ear.

**B:** You've tightened that string until it snapped.

**A:** That string couldn't hold pitch. I've saved you a failure onstage.

**B:** The audition panel heard it snap. They're asking if you know what you're doing.

**A:** Tell them I rejected an unreliable string. Ask for their spare violin; I'll check that one before I approve it.

B4 causes A5: B4 says the panel heard the snap and questions A's competence; A5 supplies a defense for that audience and requests its spare violin for inspection.

Reservation: B mainly reports consequences rather than choosing an independent tactic, and A5 briefly repeats A3's defense. These are minor reservations; no rewrite is needed.
