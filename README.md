# Imprompt · v0.24.0

**Two private cards. One shared scene.** A phone-first, client-side improv card game with 240 Stances, 240 Drives, private deck progress, guided exercises and a Scene Log.

## Playable examples, not hint lectures

Nudge opens a short performed exchange:

- **Single card:** A–B–A.
- **Stance + Drive:** A–B–A or A–B–A–B–A. A holds **both** cards.
- **Another scene:** a stored alternative, without an immediate repeat when more than one eligible scene is available.

A is the requesting player's character. B is an illustrative reply, not an instruction imposed on the real partner. The example can use concrete roles, objects and places without making them mandatory for the actual scene.

Veto and Nudge remain inside the card. Keeping the card is assumed. No language model, model installer, inference runtime or abstract coaching panel is included. General Learn to Play and coach exercise setup remain available outside hints.

## Included library

| Coverage | Count |
| --- | ---: |
| Cards | 480 |
| Individual A–B–A scenes | 960 |
| Exact Stance–Drive pairs | 57,600 |
| Pair scenes | 115,200 |
| Total stored scenes | 116,160 |
| Compressed example payload | 9.89 MB |
| Plain compatibility payload | 68.90 MB |

The runtime stores complete scenes; it never assembles them on the phone. Individual scenes have new card-specific B responses and A follow-through. Pair scenes use the exact cards' authored material and Stance-specific transfer methods. Twenty-five selected pairs have bespoke dialogue overrides. Other pair entries are **composed editorial drafts**, not 115,200 individually human-approved sketches. The complete corpus has not been live-tested. Flag weak examples during rehearsal and export those flags deliberately from Offline examples & storage.

## Publish on GitHub Pages

Extract **the ZIP contents** into the repository root, retaining `examples/`, `cards/`, `icons/` and `assets/`. Commit the complete tree. No package install or build step is needed to play.

The intended live address remains:

https://scalemailted.github.io/improv-card-game/

[![Open Imprompt on your phone](assets/improv-card-game-qr.png)](https://scalemailted.github.io/improv-card-game/)

After deployment, close older Imprompt tabs and reopen the site. This release uses new asset URLs, a new schema and content-addressed example files. Do not mix releases. Do not clear all site data: that also erases deck progress and scene history.

## Offline rehearsal

Open **Offline examples & storage → Save all examples offline**. Wait for 241 of 241 files to be saved. Reload once while connected, then test a different card pair in airplane mode before rehearsal.

Normal use downloads only needed partitions. First access to an uncached partition needs a connection. The reader decodes gzip in a worker and retains singles plus no more than four parsed Stance partitions. Browsers without native gzip decoding use the included plain JSON copies. Both representations ship in this source ZIP, but the full-library downloader saves only the usable representation.

Example storage is separate from deck/history storage. Removing downloaded examples does not clear cards, sessions or exercise settings. No network inference, API keys, telemetry, or external model downloads occur. Before a full offline download, the site host can observe which Stance partition was requested. Saving the full library eliminates that per-selection network request. Browser storage is not permanent archival storage.

## Existing coaches and players

Playable cards, IDs, content versions, deck logic, exercise definitions and prior Scene Log snapshots are unchanged. Existing saved hint policy IDs continue to work:

| Saved policy | Current behavior |
| --- | --- |
| `full` | Examples available: three- and five-turn scenes |
| `nudges` | Short scenes only: three turns |
| `after-attempt` | Same scene examples after deliberate unlock |
| `off` | No example buttons |

The shorter policy may offer only one eligible scene for a pair; Another scene is then hidden rather than pretending to generate a new answer.

## Editing and rebuilding

Canonical authoring sources:

```text
examples/authoring/single-scenes.json      # two A–B–A scenes for every actual card
examples/authoring/stance-transfers.json   # card-specific methods for pursuing a Drive
examples/authoring/pair-scenes.json        # exact-pair dialogue overrides
```

Each pair record identifies its source single-scene IDs. Card fingerprints and acknowledged source-scene hashes block silent reuse when instructions or seeds change. Edit canonical JSON, then run:

```sh
npm run build:examples
npm run audit:all
npm test
npm run test:browser
npm start
```

`npm start` serves the app on localhost:8080. Browser tests need Python Playwright and a Chromium executable. The included fixture test is explicitly not a native hosted service-worker test; see `BUILD-VERIFICATION-v0.24.0.md`.

The build emits SHA-256-addressed JSON and gzip files, regenerates the manifest and synchronizes the singleton precache. Commit the whole output together. Substantive future releases must advance the app/runtime URL version as well as the dataset identity.

See [the example authoring contract](docs/OFFLINE-ACT-IT-OUT-LIBRARY.md), [release notes](RELEASE-NOTES-v0.24.0.md), and [verification boundaries](BUILD-VERIFICATION-v0.24.0.md).
