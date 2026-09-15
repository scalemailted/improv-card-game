# Quality calibration 001 — feedback preparation, reader blocked

Allowance-009 remains the source checkpoint. **No production allowance was granted, no queue resumed, and no staged acceptance or pair was integrated.** Actual repository completion records still show 824/960 singles integrated and 10/115,200 pairs individually reviewed. Allowance-009's 880 two-pass count is historical evidence, not new work here. All acceptance decisions remain model-only decisions; none has been relabeled human approval.

## What is available

- [Dialogue-only human packet](human-cold-read.md): twelve exact current shipped examples, anonymous and randomized in display order; feedback fields blank.
- [Card-reveal packet](human-card-fidelity.md): exact card instructions, to be read only after the cold-read answers are saved; no rationale or scores.
- [Separate readable answer key](answer-key.md) and [machine provenance](answer-key.json): IDs, exact dialogue, exact instructions, source/data hashes, release/dataset IDs, review references, example types, and development/held-out membership.
- [Proposed writer/reader instructions](proposed-instructions.md): proposals only, not installed in the runner or rubric.
- [Blank comparison template](comparison-template.md): not a populated or randomized before/after experiment.
- [Preservation checks](verification.json) and [blocked invocation record](blocked-reader.json).

## Missing actual failure cases

No exact human-rejected exchange, line-specific comment, or failure ID was found in the conversation's supplied requests, current checkpoint/handoff, rubric, reference ledgers, or targeted repository feedback search. General reports of confusion/disjointedness are not attributed to any sampled scene. No case is labeled a human failure by inference. Supply the displayed exchange or scene ID, the comment, and the first confusing line; if the displayed text differs from this dataset, preserve and identify that revision separately.

The sample has six individually model-reviewed singles, two individually model-reviewed pairs, one authored pair pending individual review, and three compiled pairs pending individual review. It deliberately includes the exact endorsed hamster, interview, bakery, shelf and picnic references, recent integrated Drive examples, the still-pending S06+D49-b issue, and compiled combinations. The reference provenance is explicit; only the hamster has the rubric's exact transcript endorsement. These selections are feedback coverage, not substitutes for the missing rejected cases.

Eight development cases and four held-out cases were assigned before any fresh findings. Display randomization and split membership are frozen in the answer key. Held-out responses must not be used to tune proposed instructions. No generalization result is available yet, and the mix is diagnostic rather than statistically representative of the library.

## Cold read, fidelity and rewrite status

The fresh-reader command was rejected before execution by automatic approval review. Therefore **no fresh cold-read findings, card-fidelity findings, model/human agreements, usage, or calibrated success are claimed**. The staged CLI helper uses separate fresh invocations: dialogue-only output must be complete, validated and hashed before the fidelity invocation can receive cards and the frozen cold read. It supplies no writer scores, historical approvals or human labels. No process exit alone counts as evidence.

No candidate rewrites were produced. The request ties repair to a small set with actual human feedback, which is absent. Inventing that feedback or rewriting arbitrary samples would defeat calibration. The comparison template stays unpopulated until failures are identified. The proposed instructions are hypotheses, not lessons validated against nonexistent results. Missing human feedback and blocked fresh reading are distinct outstanding requirements.

## Preservation and verification

Compared 5998 protected file hashes before/after: current source, generated dataset, rubric, completed editorial records, campaign state and queue JSON, all D191-D200 batch attempts including interrupted D191-b, and top-level allowance-009 evidence were unchanged. The check does not rehash every older duplicate validation-stage/source-checkpoint directory. This task writes only its new report directory and task helpers; it does not change older campaign artifacts.

Verified all twelve exported generated records and manifest-referenced shard hashes, dialogue hashes, ABABA speaker ordering, source review hash matches where completed, and exact hamster text against the rubric. Read-only process inspection found only the Codex app server, not another editor; sandbox CIM access was denied, then approved read-only inspection succeeded. Existing unrelated typing_extensions.py working-tree changes were preserved.

An initial overly broad preservation scan was stopped before writing any packet, then a second broad scan was similarly stopped; neither edited campaign/source records or invoked a model. The final scoped scan and packet generation completed. App build/audits/tests/native/offline checks were not rerun: no application, runner, canonical dialogue, dataset, public version or rubric change was made. No new claim replaces allowance-009's archived verification. No ZIP, commit, push, deployment, tool installation, credential access or authentication change occurred.

S06+D49-b remains pending. The pair-integration adapter remains unimplemented and a prerequisite to any future bulk pair production. Sampling and structural verification add **zero** individual pair reviews. Nineteen staged acceptances, twenty binding holds, sixteen persistent editorial exceptions, interrupted D191-b and eighty untouched singles remain at the saved checkpoint.

## Required next inputs

1. Exact rejected dialogue/IDs and line-specific human comments. A request for these was sent during preparation; no feedback was fabricated.
2. Direct approval for the bounded transmission rejected by automatic review: these twelve anonymous dialogue records to OpenAI through existing ChatGPT-authenticated Codex for cold reading, followed by only their exact instructions and frozen readings for fidelity. No production allowance, billing change or authentication change is requested.

After that approval, the prepared calibration-only commands are **node .checkpoint-work/calibration-001.cjs cold**, then **node .checkpoint-work/calibration-001.cjs fidelity**, and **node .checkpoint-work/calibration-001.cjs verify**. The second command requires a validated first-stage artifact. These commands have not successfully executed their model stages; do not describe them as verified end-to-end or use them to bypass the rejected permission. No campaign grant/resume command should be run for this task.
