# Imprompt v0.23.0 — Offline Act-It-Out Library

A mobile-first improv card game. Each phone privately manages its own 240 Stances, 240 Drives, exercises, scenes and history. No account, backend, synchronization or inference service is required.

[Open Imprompt](https://scalemailted.github.io/improv-card-game/)

[![Open Imprompt on your phone](assets/improv-card-game-qr.png)](https://scalemailted.github.io/improv-card-game/)

## New in this release

Nudges now retrieve stored **performed moments**: a short first-person action and one spoken line. No neural model is loaded or downloaded. Veto and Nudge remain inside each card. There is no Keep step or repeated coaching introduction. Another angle cycles through the available examples for the same selection.

| Dataset | Included |
| --- | ---: |
| Single cards | 480 |
| Single-card examples | 960 (two per card) |
| Exact Stance–Drive pairs | 57,600 |
| Stored pair examples | 115,204 (at least two per pair) |
| All examples | 116,164 |
| Bespoke pair overrides | 32 pairs / 68 examples |
| Complete gzip data | 3,858,519 bytes (3.86 MB) |
| Complete plain JSON data | 28,044,035 bytes (28.04 MB) |
| Maximum observed example length | 36 words, action and dialogue together |

These are measured dataset bytes; the app shell, file-system/cache overhead and optional plain fallback copies are additional. The ZIP contains both gzip and plain files and is larger than the gzip-only download.

**Editorial status: preview.** The 480 cards have individually drafted example material. Most pair examples were precomputed by combining an exact Stance's individually authored action/speech frame with an exact Drive's individually authored request. They are not generated from category text during play, but they are also not 115,204 individually written or human-approved scenes. Thirty-two pairs have bespoke examples. All records disclose their provenance. Structural coverage is not semantic-quality certification. Use Flag for review when a combination feels artificial, misses a card, or needs a better tactic.

## Deploy on GitHub Pages

Copy this ZIP's contents directly to the root of the existing `improv-card-game` repository. Preserve the directory structure, particularly `examples/`, `cards/`, `assets/` and `icons/`. No npm install or build is needed to deploy: all runtime files are included.

Continue using the repository's existing GitHub Pages branch/root configuration. After deployment, close old Imprompt tabs and reopen the site so the waiting service worker can activate. Do not clear all browser site data; that would erase local deck/history. This release keeps the existing state keys and does not modify card content.

## Before an offline rehearsal

1. Open the deployed site while online and let the app finish loading.
2. Choose **Offline examples & storage** in the main menu.
3. Select **Save all examples offline** and wait for **241 of 241** files to be saved.
4. Reload once while online to ensure the current app shell is controlled by its service worker.
5. Test airplane mode: reopen the app and request a previously unseen combination, not only the last one viewed.

Normal use downloads only a needed partition. An uncached pair needs a connection. The full download stores the entire compressed dataset but does not parse it all into RAM. Browser storage may be cleared or evicted; reopening the storage panel checks the saved file count. The Save/Verify operation additionally reads and verifies integrity. Older browsers without native gzip decompression can use the larger plain JSON edition.

**Remove downloaded examples** only clears this example edition, not the game deck/history. The tiny single-card files also belong to the core app-shell cache and may remain available after that removal. **Remove previous AI files** is an optional, confirmed cleanup for the old model directory/caches; close other Imprompt tabs first. It never clears all site storage.

## During play

Reveal a card to make Nudge available. A revealed card is implicitly accepted unless vetoed. Reveal both cards to use **How might these work together?**

Hints show an action and a line. Their specific object or situation is illustrative, not a new rule for the scene. The partner remains free to respond. **Another angle** selects another saved example without immediately repeating the last. Two choices eventually repeat; this is finite selection, not stochastic language generation. Recent selection history is bounded to 96 card/pair keys.

Coach policies still apply: Full Coaching and Nudges Only both use this brief demonstration format; After First Attempt requires the existing explicit unlock; Hints Off disables hints. Exercise QR links never include selected cards, examples, shuffle state or history.

**Flag for review** saves only a local record of the example and selected card IDs. Export flags from Offline examples & storage when you choose to share feedback. Nothing is uploaded automatically.

## Privacy

No example request is submitted to a model/API. All example files are static and served from this site. When a pair partition is not cached, its URL includes the Stance ID; an ordinary site host can observe that download. Downloading the complete corpus before rehearsal avoids card-specific network requests during subsequent hint use. Pair Drives, prompt text, game history and player identity are not added to fetch URLs. Generic Invite still shares only the fixed public game URL.

## Source organization

```text
examples/
  source/stance-performances.txt   # exact-ID Stance material
  source/drive-performances.txt    # exact-ID Drive material
  source/pair-overrides.json       # bespoke pair examples and rationales
  data/*.json.gz                  # compressed static records
  data/*.json                     # plain compatibility alternatives
  manifest.json                  # hashes, versions, files and provenance counts
  manifest.js                    # browser manifest
  library-client.js              # policy gate, worker RPC and shuffled choices
  library-worker.js              # fetch, integrity, decompression and bounded cache
```

The browser reads completed records only. Dataset compilation happens in `tools/build-examples.cjs`, not in the player's hint request. One single-card file plus one pair file per Stance keeps lookups small. The worker holds singles and at most four decoded pair files. Each pair file contains examples for its 240 possible Drives. It uses a dedicated Cache Storage namespace; game localStorage is separate.

Card IDs, instructions and their `contentVersion` are fingerprinted. A changed instruction with a stale example dataset produces an explicit error rather than showing an example for an older meaning. Dataset filenames and cache namespace are content-versioned.

Old finite hint-engine files remain as historical authoring/regression references; they are **not loaded by the app** and do not act as hidden fallbacks. The inference adapter, model selector, model storage/download code and model workers have been removed. Historical release notes describe their original versions only.

## Development and tests

Node 18+ is used for local scripts; no npm dependencies are needed.

```bash
npm start                  # local static server; HTTP, not file://
npm test
npm run build:examples
npm run audit:examples
npm run audit:all
```

The browser test needs Python Playwright and a Chromium executable:

```bash
npm run test:browser
```

The browser test explicitly uses in-memory worker/storage fixtures for application interactions, plus actual browser gzip decompression. The production worker is separately exercised with real packaged bytes, hashes and native Node decompression using fixture network/cache transports. Neither is a substitute for the deployed Pixel/offline smoke test above. See [build verification](BUILD-VERIFICATION-v0.23.0.md).

After editing example source, rebuild, re-audit and update the singles filenames in `sw.js` if changed. The generated manifest is self-versioned by source/card hashes. A future deployment must also bump app asset versions and cache name; do not mix release asset query versions.

## Documentation

- [Release notes](RELEASE-NOTES-v0.23.0.md)
- [Offline Example Bible and authoring contract](docs/OFFLINE-ACT-IT-OUT-LIBRARY.md)
- [Editorial sample review](reports/example-review-sample.md)
- [Data audit](reports/offline-example-audit.json)
- [Source preservation audit](reports/source-preservation-v0.23.0.json)
- [Build verification and remaining checks](BUILD-VERIFICATION-v0.23.0.md)
- [Scene Craft Guide](docs/SCENE-CRAFT-GUIDE.md)

The existing Card Bible, editorial consolidation and staged publication records remain in `docs/` and `editorial/`. Pack publication status is unchanged: Core Foundations is published; the nine expansions remain playtest packs.
