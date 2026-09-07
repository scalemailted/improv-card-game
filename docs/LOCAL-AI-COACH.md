# Local AI Coach — v0.22.0 experimental integration

## What is actually implemented

The exact title and full instruction of the requested revealed card(s) are sent to
a local worker, together with a deterministic behavioral plan, a changing prompt
cue, and up to six recently displayed examples for duplicate checking. There is no
chat history and no access to another phone's hand. Generation does not choose
cards, mark cards kept, mutate a queue, or write Scene Log content.

A single-card request contains only that card. A pair request requires both cards
revealed and contains Stance then Drive. Both the UI and the payload builder check
access. The request builder copies a whitelist of fields, not the saved deck.
Text is rendered with textContent, never treated as HTML.

## Ready-made baseline, not a trained tiny coach

The configured model is Xenova/flan-t5-small at revision
`311454e83bc784267fd7eef5940ee854144abbec` using the q8 encoder and merged decoder.
The runtime is `@huggingface/transformers@3.8.1`, using its **bundled**
`dist/transformers.min.js` and matching JSEP WASM factory and binary. The separate
`transformers.web.min.js` is not used because its external imports require bundling.

The public listing gives about 35.8 MB encoder and 59.3 MB decoder weights.
Runtime/tokenizer/configuration add overhead, producing an approximate 120 MB
installation. This is neither a measured RAM budget nor the proposed tens-of-MB
fine-tuned mini-model deployment.

Google's 31.23M T5 Efficient Mini is pretrained-only and needs fine-tuning. No such
training was performed here. A smaller custom model would require a high-quality
pair/example corpus, held-out pair evaluation, training, quantization, browser
export, and physical-device latency tests. Changing a model name cannot substitute
for that work. The deployment configuration is centralized for a later validated
replacement, but an arbitrary replacement is not guaranteed to share the same
ONNX filenames, tokenizer, task, or supported operators.

## Stochastic generation and rejection

Sampling is enabled: temperature 0.72, top-p 0.90, top-k 40, one beam, repetition
penalty 1.15, no-repeat 3-gram. A second attempt increases temperature slightly.
Single-card output is limited to 64 new tokens; pairs to 80. The target is one short
imperative example, not a lesson or scene. The screen rejects obvious length,
format, copied-instruction, repeated-output, missing lexical anchor, non-action
opening, partner-prescription, and some out-of-scope patterns.

These are **heuristics**. Lexical anchors can reject valid synonyms or accept a
superficial use of both cards. A plausible sentence may still be unhelpful, impose
an unwanted premise, or be inappropriate. This is not a semantic safety or quality
guarantee. Strong output must be tested by performers. No claim is made that all
57,600 hands have been tested with this neural model.

Two failed drafts trigger a labeled quick fallback. A generation timeout also
falls back. Pending work can be cancelled immediately by closing the dialog or
choosing an instant example. Request sequence checks prevent late replies changing
another hand's hint. Accepted text is shown only when the user deliberately asks;
an already-read quick example is not silently replaced in the background.

## Downloads and cache

The default mode performs no AI download and creates no worker. Initial consent
fetches exactly ten fixed public asset URLs from Hugging Face and jsDelivr. Model
URLs use the pinned revision; prompts are never interpolated into URLs or sent to
an inference endpoint. Hosts still receive normal download connection metadata.
Completed files are committed to CacheStorage; retry retains completed earlier
files. Interrupted files restart, rather than implementing HTTP byte-range resume.
No cryptographic per-file integrity manifest is claimed in this prototype.

Cache name: `impc-local-ai-flan-small-q8-v1`.
Preference key: `imprompt:local-ai:v1`.
These are distinct from deck storage and from historical `imprompt-*` service-worker
cache cleanup prefixes. Removing the AI deletes this one cache, not localStorage,
exercise definitions, history, or app assets. The model is not bundled in the app
precache. Ordinary application upgrades should not re-download identical model
files. Browser eviction or storage clearing can still remove them.

At inference load time, cached runtime/WASM bytes are imported from Blob URLs.
Transformers.js uses a read-only custom cache and `local_files_only: true`.
`allowLocalModels` must be true for that option; `allowRemoteModels` is false.
Missing required files fail instead of fetching a new remote model. Optional local
file probes by the library may produce same-origin misses, but never contain a
prompt. WASM uses one thread in its own worker, avoiding the SharedArrayBuffer
cross-origin isolation requirement of multithreaded CPU mode. No WebGPU path is
claimed in this build.

The controller terminates the worker on cancellation/error timeouts and after
three idle minutes. Cached bytes are not the same as a loaded model. The worker
holds more RAM than the download size and may be reclaimed by a mobile browser.
Default limits: 10 minutes installation, 90 seconds model load, 25 seconds combined
generation attempts. These are guardrails, not performance predictions.

## Offline boundary and real-device test

The app precaches its own worker source, helpers, and quick examples. Optional
inference is designed to work offline only after all optional assets and app assets
are cached. That full browser path has not been exercised in the build environment:
external downloads and browser URL navigation were blocked. Unit tests with a mock
runtime cannot establish real ONNX initialization or quality.

Deploy `tools/local-ai-benchmark.html` under the same project origin. It uses six
fixed public pairs and two requests per pair. Export actual timing/result JSON.
Check online installation; repeated requests; cancel during load and generation;
close and reopen; cached offline inference; a changed card; each coach policy;
and removal without deck/history loss. Mark quality separately from technical
success. The 31M specialization should be considered only after this benchmark
establishes whether neural generation adds value over the quick examples.

## Quick examples are not disguised AI

Fallbacks consist of two example actions per formal subtheme, a small curated set
of exact-card overrides, five exact-pair fixtures, and concise versions of existing
fusion outputs for other pairs. A shuffle bag avoids immediate repetition. This is
a finite, authored/compositional library, not a bespoke neural example for all 480
cards. It remains available before installation and on unsupported devices.

## References checked for implementation

- https://huggingface.co/google/t5-efficient-mini
- https://huggingface.co/Xenova/flan-t5-small/tree/main/onnx
- https://huggingface.co/api/models/Xenova/flan-t5-small
- https://github.com/huggingface/transformers.js/tree/3.8.1
- https://raw.githubusercontent.com/huggingface/transformers.js/3.8.1/src/utils/hub.js
- https://onnxruntime.ai/docs/tutorials/web/env-flags-and-session-options.html
