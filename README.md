# Imprompt · v0.25.0

**Two private cards. One shared scene.** A phone-first, client-side improv game with 240 Stances, 240 Drives, independent deck progress, guided exercises and a Scene Log.

## Dialogue-first examples

Nudge now opens **five spoken turns: A–B–A–B–A**. A establishes the situation in dialogue; B answers; A demonstrates the card; B develops the pressure; A heightens that same interaction. No separate grey stage directions, narrator, hint lecture or model installer.

All 960 single-card examples have been rewritten, two per card. Their median is **36 words across the complete exchange**; the longest is 57. The card instructions themselves are unchanged.

A is the requesting player's character and holds both cards in a pair example. B's lines are illustrative, not instructions to another player's phone. Examples can use specific places, objects and relationships without making them mandatory during play.

## Included content and review limits

| Coverage | Count |
| --- | ---: |
| Playable cards | 480 |
| Rewritten single-card scenes | 960 |
| Exact Stance–Drive pair lookups | 57,600 |
| Pair scenes, all five-turn | 115,200 |
| Internally rewritten bespoke pair scenes | 50 across 25 pairs |
| Compiled pair drafts pending individual review | 115,150 |
| Complete gzip example payload | 12.35 MB |
| Plain JSON compatibility payload | 72.83 MB |

**The internal rewrite is not independent human/live validation.** Every single-card entry has a specific editorial rationale and a before/after ledger. The large pair corpus is not individually certified as witty or coherent. Its revised compiler keeps both B responses and A's final payoff from the same five-turn Drive scene, rather than grafting on unrelated stock endings. Exact-card Stance frames can still produce weak fusions; flag those for bespoke revision.

Veto and Nudge remain inside each card. Keeping is assumed. **Another scene** cycles stored alternatives without immediate repetition when more than one eligible alternative exists. Nothing is generated on the phone.

## Publish

Extract the **complete ZIP contents** into the repository root, including `examples/`, `cards/`, `icons/` and `assets/`. Commit the complete tree. No build or dependency install is required to play.

The public address remains:

https://scalemailted.github.io/improv-card-game/

[![Open Imprompt on your phone](assets/improv-card-game-qr.png)](https://scalemailted.github.io/improv-card-game/)

This release has new versioned asset URLs and a new content-addressed dataset. Do not mix files from releases. After deployment, close older Imprompt tabs and reopen. **Do not clear all site data**, which also removes saved deck/history.

## Offline rehearsal

Select **Offline examples & storage → Save all examples offline**. Wait for all **241** files. Reload once online, then test another pair in airplane mode before rehearsal.

The worker decompresses only the needed partition and keeps singles plus at most four parsed Stance partitions. The ZIP ships gzip and plain compatibility representations, but the installer saves only the representation the browser can use. Browser data may be cleared or evicted; missing offline records produce a clear error, not generic fallback advice.

Removing the example cache does not remove your deck or history. No inference service, third-party model request, API key, or telemetry is used. Before a full offline download, the static host can observe which Stance partition is requested. Complete offline storage avoids per-selection requests.

A new dataset does not inherit the previous version's offline completeness. Save this version's library before an offline session.

## Existing players and coaches

Playable card files, IDs, content versions, card catalog, Card Bible, deck engine and exercise engine are unchanged. Current prompts and historical Scene Log snapshots remain intact.

| Saved policy ID | Current behavior |
| --- | --- |
| `full` | All available five-turn scenes |
| `nudges` | Brief scenes: selects the shorter complete five-turn exchange |
| `after-attempt` | Unlock examples only after the player marks an attempt |
| `off` | No example controls |

A shorter example is selected by whole-scene word count, never by deleting the last two turns. Another scene is hidden when there is only one eligible choice.

## Audit and editing

- [Full single-card audit](docs/SINGLE-CARD-DIALOGUE-AUDIT-v0.25.0.md): 480 rationale notes and all 960 replacement scenes.
- [Bespoke pair references](docs/PAIR-REFERENCE-SCENES-v0.25.0.md): 50 exchanges and their causal fusion notes.
- [Example Bible](docs/IMPROMPT-HINT-BIBLE.md).
- `editorial/v0.25.0/single-dialogue-ledger.json` and `.csv`: exact before/after provenance.
- `examples/authoring/single-scenes.json`: canonical single scenes.
- `examples/authoring/stance-transfers.json`: draft-composition transfer inputs.
- `examples/authoring/pair-scenes.json`: bespoke pair overrides.

```sh
npm run build:examples
npm run audit:all
npm test
npm run test:browser
npm start
```

The builder checks exact card fingerprints and source bindings. These prevent silent stale reuse, not semantic mistakes. `audit:dialogue` verifies internal-review coverage and dialogue structure; it does not calculate a humour score.

Browser checks require Python Playwright and Chromium. The included transport-fixture tests are explicitly separate from a native hosted service-worker install or a physical Pixel benchmark. See `BUILD-VERIFICATION-v0.25.0.md` for the actual test scope.
