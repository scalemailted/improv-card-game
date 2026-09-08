# Offline Dialogue Library — v0.25.0

The runtime retrieves completed five-turn dialogue, not generated coaching. See the current [Example Bible](IMPROMPT-HINT-BIBLE.md) and [single-card review](SINGLE-CARD-DIALOGUE-AUDIT-v0.25.0.md).

## Source, runtime and review

Canonical inputs are `examples/authoring/single-scenes.json`, `stance-transfers.json`, and `pair-scenes.json`. The builder emits one singles partition and 240 Stance partitions, with 240 Drive records each. Each record contains its ID, `format: "ABABA"`, five `{speaker, text}` beats, example version, provenance and editorial status. Pair records also retain the two exact single-seed IDs.

The 960 singles and 50 bespoke pair scenes were internally rewritten. Their status is not independent human approval. The remaining 115,150 pair scenes are `pair-review-pending`. The compiler keeps a coherent Drive spine and frames A1/A3 with the Stance, but cannot establish semantic fusion or wit. Do not equate exact lookup coverage with individually authored pair coverage.

Separate `action` fields are rejected. A1 must establish enough context in speech. Five turns are retained even under the brief policy; select the shorter completed exchange, never cut off A5.

## Worker and storage

The content-addressed manifest binds files to their SHA-256 hashes and exact card revisions. Gzip data is decoded with `DecompressionStream` and checked before JSON is displayed. Plain JSON copies are provided for older-browser compatibility. The worker holds at most four pair partitions plus singles, and explicit offline-install progress reports only completed saved files.

The dataset uses a separate cache name derived from the dataset ID. New example releases do not invalidate local deck state or historical prompt snapshots. The previous dataset is not automatically counted as complete for the new release. Do not delete deck storage when troubleshooting examples.

## Editing controls

A changed card instruction requires a fresh acknowledged fingerprint for its source scenes. A changed single scene requires updating its pair input bindings. These are integrity gates, not review evidence. Keep review notes and before/after history in the editorial directory, outside the compact modal.

All content is shipped with the static app. There are no model weights, model installer, LLM runtime, inference calls, or dynamic text synthesis during gameplay. Random selection chooses from finite stored alternatives.
