# Imprompt hint audit: bounded-batch handoff

## Start here

This runnable source is **v0.26.0-preview.1**, a checkpoint based on the supplied v0.25.0 archive. Only `S67+D101-a` has been changed in this checkpoint. Its exact headteacher/hamster dialogue was endorsed by the user. All other 116,159 scenes retain v0.25.0 wording. Do not call the full new-rubric review complete.

Read `docs/COACH-REVIEW-RUBRIC.md`, `CHECKPOINT-STATUS.md`, `docs/IMPROMPT-HINT-BIBLE.md`, and `editorial/0.26.0-preview.1/checkpoint-review.json`. The last file contains an actual original/revision pair, both score passes, evidence and explicit non-live review status.

The three linked JSON drafts from the interrupted earlier attempt could not be recovered. Their names are listed in `recovery-manifest.json`. Do not fabricate their contents or count unseen work as completed.

## Copyable task for the next agent

> Work on ONE bounded hint-audit batch in this repository. Read AGENTS.md and the coach-review rubric. Start with `editorial/batches/singles-001/batch.json`: ten Stance cards, twenty single-card scenes. Read the exact instructions and every turn. Score every original using coach-1.0, explain the specific cause-and-effect weakness, rewrite where needed, then independently re-read the revised dialogue and score it using the same rubric. Keep A1 self-descriptive, B2 responsive, A3 card-driven, B4 consequential, and A5 a heightening caused by B4. Do not add generic coaching, stage-direction paragraphs, runtime AI, new cards, or automatic humour scores. Preserve IDs and all unrelated source. Keep unreviewed material visibly pending. Write a bounded review ledger, source edits, tests, and a checkpoint summary; run build, audits and tests; stop after this batch. Do not claim a full-corpus audit. Treat changed singles' dependent pair scenes as newly affected drafts, not automatically re-reviewed improvements.

For a pair-first batch, replace the batch path with `editorial/batches/pairs-001/batch.json`. It contains five actual pairs / ten scenes; the hamster scene is a read-only reference already reviewed. Read both cards' single examples as seeds. The goal is a causal blend, not prefixing Stance wording onto a Drive conversation.

## Batch export commands

The two first packets are already included and have **blank scores**. The exporter never changes the app or assigns a score.

```sh
# New 10-card / 20-scene packet. Refuses to overwrite an existing output directory.
npm run review:export -- --kind single --start S11 --limit 10 --out editorial/batches/singles-002

# New exact-pair packet. Use + in a pair key, not a comma between the two cards.
npm run review:export -- --kind pair --keys S67+D101,S22+D14,S124+D06,S192+D74,S01+D13 --out editorial/batches/pairs-002

# JSON to stdout for a fresh selection of pending items.
npm run review:export -- --kind pair --start S01+D01 --limit 10
```

Do not export or attempt to rank the whole 115,200-pair-scene corpus in one response. Finish a small coherent batch and save it before starting another. Manual selection of flagged pairs takes priority over exhaustive order.

## Canonical authoring files

- `examples/authoring/single-scenes.json`: two five-turn scenes for each exact card.
- `examples/authoring/pair-scenes.json`: bespoke pair overrides. An entry has two alternatives. When adding an override for a previously compiled pair, review both alternatives and document both, not just a new closing line.
- `examples/authoring/stance-transfers.json`: build-time composition inputs, **not** proof of a semantic review.
- `examples/data/`: generated content-addressed JSON and gzip. Never edit it directly.
- `editorial/v0.25.0/`: immutable baseline review history. Do not rewrite its before/after ledger to make new edits pass old assertions.

Retain scene IDs (e.g. `S67+D101-a`), card IDs, card wording, card contentVersion, deck/session/QR behaviour and the compact ABABA renderer. Increment only the changed scene's `exampleVersion`. Version the app's assets and dataset for each deployed checkpoint; do not reuse this preview's URLs for incompatible changes.

## Source binding and dependency rules

A single-scene edit can affect hundreds of compiled pairs. In particular, the Stance compiler verifies `seedBindingHashes`, and bespoke scenes cite `seedRefs`. Re-read transfer inputs before acknowledging new hashes; do not blindly refresh hashes and call the affected pairs reviewed. Rebuild the data and record exactly which dependent records changed. Their status remains `pair-review-pending` unless individually reviewed.

The existing `audit:dialogue` and dialogue tests deliberately pin the untouched v0.25.0 single scenes to their original ledger. A new single-scene batch must add an explicit amendment chain from that recorded baseline hash to the new hash, then extend those checks for the exact reviewed amendments. Never disable the baseline checks or change all historical version assertions globally. This checkpoint does not provide an automatic semantic merge/importer.

For completed new reviews use a versioned `editorial/<checkpoint>/...-review.json` with the same wrapper and record shape as the existing checkpoint review. Pending packet drafts belong under `editorial/batches/`, not in the completed-ledger scan. If revisiting a previously reviewed ID, add explicit supersession handling to the ledger reader; do not leave conflicting completed records or silently remove the older evidence.

## Verification before handing back a ZIP

```sh
npm run build:examples
npm run audit:all
npm test
npm run test:browser
```

Document native-browser versus mocked tests accurately. A file/hash/format pass is not a humour pass. When an assertion fails, distinguish an obsolete wording fixture from a real regression. Retain meaningful coverage. Compare the generated dataset against the prior checkpoint and report the exact revised count.

Save a full source ZIP with `index.html` at its root. Include the batch ledger, rubric, before/after text, second-pass findings, pending item counts and test logs. Do not ship model weights, dependencies, temporary server processes, secrets, or font files.

## Definition of done for ONE batch

Every selected scene has a first-pass assessment and a second-pass decision; changes have specific evidence; both alternatives remain useful; card meanings and stored player state are preserved; no unseen scenes are promoted; the code and dataset agree; tests were actually run; and the next batch boundary is written down. Passing one batch is progress, not completion of the full audit.
