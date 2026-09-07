# Imprompt v0.22.0 — Local AI Nudges (experimental)

A static, mobile-first improv prompt game. Each phone has its own private Stance,
Drive, shuffled queues, coaching assignments, sessions, and Scene Log. The original
480 card instructions and content versions are unchanged in this release.

[Open Imprompt](https://scalemailted.github.io/improv-card-game/)

[![Scan to open your own independent deck](./assets/improv-card-game-qr.png)](https://scalemailted.github.io/improv-card-game/)

## Play

Draw both cards privately. Let them influence your first offers, then follow your
partner and the shared scene. Your Drive is not a win condition. Cards are accepted
unless vetoed; there is no Keep step. Veto is inside each card at bottom left and
Nudge at bottom right. Your existing deck and history do not need a reset.

## Short, varied hints

A nudge now shows one brief example, **Another angle**, and **Done**, without the
repeated introduction, privacy paragraph, or Kept status. Two sources are available:

| Source | Behavior |
| --- | --- |
| Quick examples (default) | Immediate, local examples from a finite shuffle bag. Some are exact-card/pair examples; the general fallback uses subtheme examples or the existing fusion engine. It is not generative AI. |
| Local AI (experimental) | A sampled attempt using the exact full wording of the revealed card(s), plus a short behavior plan. Runs in a Web Worker after explicit installation. |

Open **Main menu → Nudge settings → Local AI → Enable & download (~120 MB)**.
Selecting Local AI before installation does not itself authorize a download.
Downloads come from Hugging Face and jsDelivr. There is no remote inference API,
account, key, analytics service, or per-request inference bill. Asset hosts can see
ordinary download traffic; card prompts are not submitted to those hosts.

The small ready-made baseline is **FLAN-T5-small q8**, not a newly fine-tuned 31M
Imprompt model. Approximately 95 MB is model weights; runtime and tokenizer bring
the download to roughly 120 MB. RAM use is larger. Model files are not in this ZIP.

The request uses stochastic sampling and changing cues; repeated/obviously invalid
drafts are rejected. Two rejected drafts, timeout, or error show a **labeled Quick
example**. Meaningful novelty and expression of both cards cannot be guaranteed by
these heuristic checks. Another angle may eventually reuse a finite fallback.

Settings can switch back to Quick examples or remove only the optional AI files.
The worker unloads after idle time. A cached model still needs to load into memory,
and browser storage may be evicted. Use Wi-Fi for initial installation.

## Important experimental boundary

The code, UI, prompt privacy, rejection paths, and mocked worker/controller flow
were tested. External downloads and navigation are blocked in the build environment,
so the actual ONNX/WASM initialization and generated quality have **not** been
verified there. No screenshot or fixture is presented as a real model generation.
This is an integration experiment, not evidence that FLAN-T5-small is a good improv
coach. The smaller T5 Efficient Mini checkpoint needs task-specific training before
it can replace this baseline.

After deploying, use [the device test](./tools/local-ai-benchmark.html) to run twelve
actual requests across six fixed pairs. Export its JSON and judge expression of
both cards, specificity, holder-only behavior, brevity, and wait time. The test uses
public deck fixtures, not your active hand. It does not mark text as human-approved.

## Coach policies

Full Coaching, Nudges Only, After First Attempt, and Hints Off still gate access.
Full and Nudges Only both show the same concise one-example presentation in this
release; the former multi-section depth difference is intentionally removed.
After First Attempt still requires the player to unlock hints explicitly for the
scene. The AI mode cannot bypass a coach's disabled or locked hint policy.

## Deploy on GitHub Pages

Extract this archive **into the repository root**, replacing the old files. Keep
all directories and `.nojekyll`. No npm install, build, server, or credential is
needed to publish. The same project URL and relative paths are retained.
Close older running tabs and reopen after deployment. Do not clear site data unless
you intend to delete local deck/history. The optional model cache is deliberately
outside old app cache prefixes so an application update does not delete the model.

For local development: `python -m http.server 8080`, then open localhost:8080.
Do not launch the AI worker from a file:// page; use HTTPS or localhost.

## Test and review

```sh
npm test
npm run audit:all
npm run test:ai
```

These tests require Node 18+ and no model download. The AI unit tests use labeled
mock runtimes/workers; they do not prove ONNX compatibility, speed, or semantic
quality. The inherited exhaustive hint audit evaluates the **deterministic** engine,
not 345,600 neural generations.

- [Release notes](./RELEASE-NOTES-v0.22.0.md)
- [Local AI architecture and known limitations](./docs/LOCAL-AI-COACH.md)
- [Hint Bible](./docs/IMPROMPT-HINT-BIBLE.md)
- [Build verification](./reports/local-ai-verification.md)
- [Third-party downloads and licenses](./docs/LOCAL-AI-DEPENDENCIES.md)

## Source map

`ai/config.js` pins the runtime, model, assets, limits, and cache name.
`ai/hint-request.js` builds the exact-card request and screens drafts.
`ai/coach-worker.js` installs/caches assets and runs the optional model.
`ai/local-coach.js` manages consent state, cancellation, timeout, and memory lifecycle.
`hints/quick-examples.js` supplies varied immediate fallbacks.
`hint-engine.js` and `hints/concrete-fusion.js` retain the prior deterministic plans.
