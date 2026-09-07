# Local hint engine — v0.22.0

## Setup and everyday use

Serve the extracted project with `npm start` (Node 18+) and open `http://localhost:8080`, or deploy its contents unchanged to a static HTTPS host. The app needs no build step, backend or API key. `python -m http.server 8000` or VS Code Live Server is also suitable, provided JavaScript modules are served with an appropriate MIME type. A `file://` launch is not supported for inference or service workers.

The optional controls are Main menu → Local hint engine, or Local hint engine in the hint dialog. Choose Compact or Larger and explicitly press Download & enable. The configured downloads are approximately 386 MB and 1.06 GB respectively; memory consumption exceeds model-file size. Start with Compact on a device with limited resources. Neither model has been demonstrated superior to the authored examples in this build.

Once Ready appears, a nudge or pair hint offers Generate a fresh hint. Another angle then generates a different tactic. Before initialization or after unloading, Another angle uses built-in examples immediately. Opening/closing settings or completing initialization never swaps the hint being read.

Use saved model initializes the selected saved GGUF without redownloading it. It may still need runtime assets if these have not been cached. Initialization is required each new page session; only the model choice, successful download and validated examples persist. Browser eviction, private mode and site-data clearing can remove these files.

## Actual data flow

`app.js` establishes reveal state and the active exercise policy. `local-hint-core.js` independently checks policy and card count, then projects an allowlist from those cards: ID, type, title, full instruction, content version, subtheme and tone. It never spreads the complete deck or state object into a prompt. The request includes the requested angle and at most three recently displayed examples to avoid.

The prompt describes one holder-controlled action, includes a few authored examples, and asks for at most 40 words for a single card or 52 for a pair. Card descriptions are authoritative. The model must not establish a plot, prescribe a partner response, narrate its reasoning or restate the cards. Pair guidance seeks a single behavior that expresses both cards.

`local-hints.js` serializes requests, handles cancellation and generated-text caching, and calls a lazy runtime factory. `wllama-adapter.mjs` is the only inference-specific layer. It loads the pinned Wllama ES module and WASM binary, then runs the model in a worker with a bounded context. It uses Wllama's v3 completion interface and returns a completed response, not a partially streamed hint.

The application makes no remote inference request. Model prompts, output, Scene Log and shuffle state are not uploaded by the app. jsDelivr and Hugging Face still receive ordinary runtime/model file requests, including normal connection metadata. This is not a claim that all browser activity is anonymous or that third-party dependency delivery carries no supply-chain risk.

## Runtime and model configuration

Runtime version and CDN base live in `hints/runtime-config.mjs`; model IDs, pinned source revisions, labels and download estimates live in `hints/local-models.js`. The configured runtime is Wllama 3.6.1, not the older API used in the article. Compatibility mode is `default`, so Wllama may select its compatibility support when needed.

The adapter uses CPU mode with `n_ctx=2048`, `n_batch=128`, `n_ubatch=128`, `n_parallel=1`, and `n_gpu_layers=0`. Ordinary static hosting uses one worker thread. A cross-origin-isolated context uses up to four threads. `npm start -- --isolated` enables COOP/COEP headers for local development; this is optional and all external responses still need compatible cross-origin delivery. WebGPU is not enabled by this integration.

A deployment can replace the runtime base and model URLs with its own vetted static assets. It must supply the correct Wllama package, WASM and any required compatibility dependencies; changing the base URL alone is not a fully self-contained redistribution. No runtime-vendoring script or binary is bundled here.

The CDN, model download URLs and target browser must remain reachable/compatible. Version pinning makes the intended dependencies explicit; it does not replace a real installation test. Updating Wllama requires checking the adapter contract, cache whitelist and runtime cache version together. Change a model ID when changing its weights/revision so generated examples do not share an old model namespace.

## Storage, caching and cleanup

The game continues to use its existing deck-state storage key and version. Model preference and generated hints use separate `imprompt:local-model-preference:v1` and `imprompt:generated-hints:v1` keys. At most 100 validated generated examples are saved, keyed by model, prompt version, full card content, policy and angle.

Model files live in the app-owned OPFS directory `imprompt-local-models-v1`. A download is streamed into its own file. Its JSON completion marker is written last. A saved file needs a matching source URL/byte count, a minimum size and a GGUF header. Content-Length mismatches are rejected when a usable length is supplied. These are incomplete-file guards, not SHA-256 verification. A sudden tab kill can leave an unmarked partial file; it will not be accepted as complete and the next explicit download replaces it. HTTP range resumption is not implemented.

Where available, Web Locks serialize model-store access across tabs. Browser storage quotas and eviction still apply. Removing model downloads and generated text unloads inference and removes only the app-owned model directory and generated cache. It preserves the independent deck, Scene Log and unrelated origin data. The small runtime/PWA cache and model preference are intentionally retained.

The service worker pre-caches the normal app shell and local adapter source, not external runtime files or GGUF weights. Requested, version-pinned CDN runtime resources are cached separately when possible. GGUF transfers bypass service-worker caching to avoid storing another copy of each model.

Offline built-in hints require a successfully installed app-shell cache. Offline generated hints additionally require a complete saved model, cached runtime/compatibility assets, sufficient memory and successful initialization. A saved model alone is not a guarantee of offline readiness. Test a closed-and-reopened offline session on the actual deployment.

## Failure behavior and UI guarantees

Generation is limited to one operation at a time. The adapter stops waiting for runtime import after 30 seconds and initialization after 120 seconds; these are failure deadlines, not performance promises. The controller aborts generation at 45 seconds. Canceling/timing out generation unloads its worker; a subsequent use requires reinitialization from saved files. Closing an in-progress generation, hiding the page or leaving it invalidates the pending result.

A response must be nonempty, complete, brief, formatted as prose and sufficiently different from the card description and recent examples. Obvious role-control language, multiple numbered suggestions and certain coaching boilerplate are rejected. Output is inserted with textContent, not HTML. Rejection keeps the current example and lets the performer request another angle. There is no hidden automatic retry loop.

These are heuristic checks. They cannot establish that a suggestion is funny, respects every contextual boundary, or actually integrates both cards. Human playtesting remains necessary. “Built-in coaching” stays labeled as authored guidance even when the primary example is generated; it is not presented as an explanation of the model's sentence.

## Automated verification

Run:

```bash
npm test
npm run audit:all
```

No third-party Node packages or model weights are needed for these checks. They include the existing library/game tests, all 57,600 pair combinations in the fallback engine, 35 new node:test cases for local requests, controller lifecycle, storage, the mocked Wllama adapter and service-worker assets, plus checks of every built-in nudge.

The optional offline browser DOM suite requires Python Playwright and Chromium:

```bash
python -m pip install playwright
python -m playwright install chromium
npm run test:browser
```

An installed Chromium can be selected with the `CHROMIUM_PATH` environment variable. The browser test deliberately mounts HTML/CSS/scripts as an offline document and injects a fake adapter only into its test fixture. Production code contains no fake inference branch. This test covers 320/390 px layouts, desktop layout, private-card request composition, policies, loading controls, explicit generation, rejection, cancellation, Veto and Scene Log integrity. It does not exercise network hosting, actual model execution or the installed service worker lifecycle.

## Deployment acceptance checks still required

On the intended HTTPS site, open DevTools Network before using the model. Confirm that ordinary play sends no requests for GGUF/Wllama, then enable Compact. Verify download progress, successful initialization and a generated single-card and pair example. Inspect requests to confirm no prompt upload. Record first-load memory and generation latency on the target phone.

Cancel a model download, retry it, close a generation, and try a new hint. Test all hint policies and an older saved deck. Close the app, disable networking, reopen it, and test built-in hints plus Use saved model. Try quota/blocked-download failure. After deployment over an older PWA, close all old tabs to allow the new worker to activate; do not clear all site data unless discarding the deck is intended.

Evaluate at least a representative set of same-pack, cross-pack and conflicting pairs. Check specificity, holder agency, brevity and whether both cards are materially expressed. Compare accepted generated outputs with the built-in examples; count rejections rather than hiding them. This is needed before claiming model quality improvements.

## Upstream references

Wllama project and API: https://github.com/ngxson/wllama and https://ngxson.github.io/wllama/docs/

Pinned runtime directory: https://cdn.jsdelivr.net/npm/@wllama/wllama@3.6.1/esm/

Original instruction models: https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct and https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct

Configured GGUF distributions: https://huggingface.co/unsloth/SmolLM2-360M-Instruct-GGUF and https://huggingface.co/unsloth/SmolLM2-1.7B-Instruct-GGUF

Browser storage behavior: https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria
