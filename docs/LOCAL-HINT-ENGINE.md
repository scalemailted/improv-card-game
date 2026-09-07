# Local hint engine — v0.22.1

## Start and upgrade

Run `npm start` from the extracted project and open `http://localhost:8080`. No npm install or build step is required. Node 18+ is needed for this local server. Static HTTPS deployment is also supported by the application design; inference must not be launched with `file://`.

After replacing an older deployment, close its open tabs and reopen the same URL so the new service worker can activate. The app-shell cache is now `imprompt-v0.22.1`. Keep the same browser origin (including port) to reuse stored model downloads and deck data. Do not clear all site data just to refresh the JavaScript.

Only the old `imprompt:generated-hints:v1` cache is invalidated. Saved GGUF files, the independent deck and Scene Log are not removed. New examples use `imprompt:generated-hints:v2` and the prompt version `2.0.0-performance`.

## Everyday use

Open **Main menu → Local hint engine**. Select the model and use **Use saved model**, or explicitly authorize its first download with **Download & enable**. The configured model files are approximately 386 MB and 1.06 GB, plus runtime files and working memory. Model weights are not in this ZIP. Loading is required again after a page reload; downloads are not automatically authorized.

Once the model is ready, opening **Need a nudge?** or **How might these work together?** starts generation automatically, unless a matching valid generated example is already cached. The labeled built-in example remains visible while AI works. **Another angle** requests a different performed moment. **Act it out** starts generation in a hint that was already open when the model was enabled. Loading completion itself never swaps a hint being read.

**Stop generating** cancels work and unloads the worker, retaining the downloaded file. Use saved model reinitializes it. With AI off, Another angle continues to cycle built-in examples. Closing the hint, changing cards or completing a scene invalidates pending output.

## The performance task

The model receives the exact full instructions for only the requested revealed card or pair. It is assigned the role of the improviser, not a coach:

- A Stance defines how the character sees and responds to the situation.
- A Drive defines what the character wants now.
- For a pair, pursue the Drive through the Stance in one connected move.

It imagines a small illustrative situation and returns only a present-tense first-person action followed by in-character dialogue. Example of the desired form (authored illustration, NOT a measured model result):

> [I turn the haunted copier’s invoice facedown.] “Before we discuss who ordered it, what is the maintenance budget?”

These concrete details demonstrate a tactic; they are not mandatory facts for the player's actual scene. No complete scene simulation, partner dialogue, reasoning transcript or instructional paragraph is requested. The few-shot examples use this same performance format. Single-card examples are selected by Stance versus Drive; pair examples show one action carrying both pressures.

`hints/local-hint-core.js` owns the prompt, request boundary, cache identity and output checks. It accepts bracketed, parenthesized, italic or plain first-person stage directions and normalizes accepted text to `[I act.] “I speak.”`. It rejects plain coaching, missing action/dialogue, incomplete text, obvious partner scripting, restatement and duplicate examples. Maximum output is 48 words for a single card and 60 for a pair; the prompt targets 20–35. Exact copies of the few-shot examples are rejected.

These checks are deliberately heuristic. Passing them does NOT prove that the model integrated the cards correctly or produced good improv. The small model can still give weak or irrelevant performances. Actual model quality has not been measured in this build environment.

## Retry, streaming and failure behavior

`hints/local-hints.js` permits one operation at a time. A rejected output gets at most **one targeted repair attempt** using the same revealed cards and a specific correction, such as “perform instead of advising” or “finish the quoted line.” Rejected text is not repeated as a successful assistant example. Runtime errors and cancellation are not automatically retried.

Both attempts share a **180-second total deadline**, rather than the old 45-second cutoff. This is a safety limit, not a promised waiting time. There is no endless retry loop. The hint dialog shows elapsed time and received text-chunk counts, including during a repair attempt. A text chunk is not necessarily one model token.

`hints/wllama-adapter.mjs` uses Wllama 3.6.1's streaming completion API. Raw chunks are accumulated privately; the UI receives counts, not unvalidated prose. A complete accepted result replaces the current example. Errors, rejection and cancellation keep the previous example correctly labeled. Token budgets are 144 for a single card and 176 for a pair. A response at the exact token limit is usable only if the entire output already parses as a completed action and closed, punctuated dialogue.

The runtime-import deadline is 30 seconds; model initialization has 120 seconds. Error messages are preserved, not reduced to an unexplained `runtime` label. The adapter retains a bounded tail of warning/error logs. The controller records elapsed time, model, prompt version, requested card IDs, attempt results, finish reasons and bounded rejected output. Diagnostics are kept only in this page's memory, not sent to a server.

## Diagnosing a problem

On failure, expand **Generation details** in the hint. The actual runtime error appears first when available. Local hint settings also provide **Last local-engine operation**, including download/initialization failures. Copy details is an explicit clipboard action. Review the contents before sharing: they can contain the revealed cards' generated text, but not the hidden hand or Scene Log.

“No complete saved copy” means Use saved model found no valid local GGUF. An import/fetch error means the runtime/CDN could not load. “Timeout” means generation did not finish within its total deadline. “Rejected” with an output means inference ran but failed the specified output checks. A generic built-in hint remaining on screen is not evidence that AI produced that text; its source label remains Built-in example.

## Runtime, hosting and privacy

The runtime pin and CDN base remain in `hints/runtime-config.mjs`; model choices and pinned URLs remain in `hints/local-models.js`. Existing model IDs/weights are unchanged. The adapter uses CPU/WASM with `n_ctx=2048`, `n_batch=128`, `n_ubatch=128`, `n_parallel=1`, `n_gpu_layers=0` and up to four threads when the browser is cross-origin isolated. WebGPU has not been added in this patch.

The bundled `npm start` server now sends COOP/COEP headers by default to make multithreading possible locally. Use `npm start -- --single-thread` to test without isolation. Static hosts that do not provide isolation headers use the single-thread path. Actual compatibility still depends on browser support and the runtime/model hosts' cross-origin responses.

No model/runtime request occurs merely from opening the game. Wllama and GGUF files are fetched only after an explicit enable action. Hugging Face and jsDelivr receive ordinary file-download connection metadata, not card prompts. Inference is local. This does not imply that downloading third-party code is free of supply-chain risk.

The input allowlist excludes the full deck, unrevealed cards, another performer's hand, saved game, Scene Log and unrelated request fields. Hint-policy and unlock checks run before inference and before cache access. Generated output and diagnostic text are inserted using `textContent`, never as HTML.

## Storage and offline operation

At most 100 accepted examples are cached, keyed by prompt version, model, full card content, policy and angle. Browser storage failures leave an in-memory cache available. Model files remain in the app-owned OPFS directory `imprompt-local-models-v1`; completion metadata is written last. Byte counts and GGUF headers guard against some partial downloads; this is not a cryptographic integrity check.

The service worker caches app assets separately from the optional, requested pinned inference runtime. GGUF files are not duplicated in the service-worker cache. A saved model alone does not establish offline readiness: runtime and compatibility assets must also be cached, and initialization must work. Browser eviction or site-data clearing can remove them. Test a closed-and-reopened offline session on the deployment.

## Tests

`npm test` runs the game/library tests, all 57,600 fallback card-pair checks and the prompt, controller, mocked-runtime and service-worker unit tests. `npm run audit:all` audits the existing card/editorial/fallback hint library. These require no external model.

`npm run test:browser` uses Python Playwright and Chromium. It executes the actual game scripts with an injected fake inference adapter in an offline DOM fixture. It tests automatic/manual generation, cache reuse, error/rejection diagnostics, cancellation, hidden-card boundaries, policies, deck integrity and mobile/desktop layout. It does NOT exercise a real model.

`npm run test:deployment` starts a local server and tests a real browser navigation, service-worker installation, offline reload and a saved-only missing-model failure. It downloads no model. The build environment blocked this browser navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`, so that test's browser/PWA results are not verified here. The local HTTP/header check did succeed before the browser block.

For actual model execution, start the game server, close other loaded-model tabs, and open `http://localhost:8080/tools/real-model-check.html`. This separate opt-in page runs six fixed requests through the production adapter, records accepted/rejected outputs, timing and diagnostics, and does not read or change game state. It does not contain fake inference. Download consent is a separate unchecked checkbox. Human review is still necessary even when all outputs pass format checks.

Python browser tools require Playwright and Chromium (`python -m pip install playwright`, then `python -m playwright install chromium`, or set `CHROMIUM_PATH` to an installed browser). App use itself does not require these test dependencies.

See `BUILD-VERIFICATION-v0.22.1.md` for the executed checks and limitations.

## Primary upstream references checked for this refactor

- Wllama source and v3 guide: https://github.com/ngxson/wllama and https://github.com/ngxson/wllama/blob/master/guides/intro-v3.md
- Streaming/abort implementation: https://github.com/ngxson/wllama/blob/master/src/wllama.ts
- Runtime package: https://cdn.jsdelivr.net/npm/@wllama/wllama@3.6.1/
- Model documentation: https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct

These references establish the intended interfaces and model documentation, not successful live execution in this build environment.
