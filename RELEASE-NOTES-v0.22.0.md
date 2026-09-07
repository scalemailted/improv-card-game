# Imprompt v0.22.0 — Optional Local AI Nudges (experimental)

This build uses the supplied v0.21.2 application as its base. It preserves the
480 playable cards, independent queues, exercise policies, sessions, and historical
Scene Log snapshots. No trained Imprompt-specific 31M model is included or claimed.

## Changed

- Revealed cards are accepted implicitly. The redundant Kept line is removed.
- Veto and Nudge remain inside the bottom-left and bottom-right of each card.
- A nudge shows one short example, Another angle, and Done. Repeated introductions,
  instruction blocks, privacy boilerplate, and angle counters are removed.
- Quick examples rotate without immediately repeating a finite option. They include
  48 subtheme example pairs plus exact-card and exact-pair examples for key fixtures.
  Family-level fallback examples are not bespoke interpretations of every card.
- Optional Local AI reads the exact title and full instruction of only the revealed
  card(s) requested. A deterministic behavior plan accompanies the request.
- A classic Web Worker runs Transformers.js 3.8.1 with FLAN-T5-small q8 using single-
  threaded WASM. No prompt or generated text is submitted to a remote inference API.
- Enable & download is explicit consent to approximately 120 MB of public model and
  runtime assets. Nothing large is in the ZIP or the ordinary app precache.
- Model revision and runtime version are pinned. A dedicated cache survives normal
  app-cache replacement; removal touches only optional AI assets.
- Requests use stochastic sampling, six varying prompt cues, and recent-output
  rejection. Sampling is not a guarantee of endless novelty or good coaching.
- Obvious long, copied, repetitive, non-actionable, or partner-prescribing drafts
  are rejected. Two failed drafts or an error show a labeled quick fallback.
- Cancellation, bounded generation time, idle memory release, and stale-result
  guards prevent late results replacing a different scene or a closed dialog.
- All four coach policies still gate hint access. Full and Nudges Only now both
  use the same concise presentation; the previous multi-block depth distinction
  is intentionally no longer exposed. After First Attempt and Hints Off remain.

## Model-size boundary

The ready-made baseline has approximately 95 MB of quantized ONNX weights; the
runtime and tokenizer bring the optional download to roughly 120 MB. This is not
16M/31M fine-tuning. Runtime RAM is greater than downloaded size. Google explicitly
labels T5 Efficient Mini as pretrained-only and requiring task-specific fine-tuning.
See docs/LOCAL-AI-COACH.md for the path to a smaller trained replacement.

## Validation boundary

Local tests cover application logic, prompt construction, output-screening
heuristics, cache ownership, failure/cancellation handling, and browser DOM layout.
Worker/model fixtures in tests are explicitly mocks, not real model outputs.
This environment blocks model/runtime downloads and browser navigation. Real ONNX
initialization, on-device generation quality, download behavior on the published
site, and physical Pixel/iPhone performance remain to be verified. Run the bundled
`tools/local-ai-benchmark.html` on the deployed origin to collect actual results.

## Deploy

Replace the repository-root files with this ZIP's contents. No build command or
API key is required. Close old tabs after deployment. Test optional model download
on Wi-Fi using Main menu → Nudge settings → Local AI → Enable & download.

## Evidence files

See reports/local-ai-verification.md, reports/tests-v0.22.0.txt,
reports/browser-dom-v0.22.0.json, and reports/structural-v0.22.0.json.
The finite-engine audit does not measure the optional neural model.
