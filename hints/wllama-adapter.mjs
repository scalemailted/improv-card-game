import { ModelStore } from "./model-store.mjs";
import { RUNTIME_BASE, COMPAT_MODE, WLLAMA_VERSION } from "./runtime-config.mjs";

const noop = () => {};
const abortError = () => Object.assign(new Error("Cancelled."), { name: "AbortError" });
// Dynamic import cannot itself be aborted. Stop waiting for it without allowing
// a late import to initialize a model after the player cancels.
async function interruptible(promise, signal, timeout, message) {
  if (signal?.aborted) throw abortError();
  let timer, onAbort;
  const interrupted = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), timeout);
    onAbort = () => reject(abortError());
    signal?.addEventListener("abort", onAbort, { once: true });
  });
  try { return await Promise.race([promise, interrupted]); }
  finally { clearTimeout(timer); signal?.removeEventListener("abort", onAbort); }
}
export function createRuntime({ store = new ModelStore(), importRuntime = (url) => import(url) } = {}) {
  let instance = null, modulePromise = null, loadConfig = null;
  const logTail = [];
  function captureLog(level, args) {
    const message = args.map((value) => {
      try { return typeof value === "string" ? value : JSON.stringify(value); } catch (_) { return String(value); }
    }).join(" ").slice(0, 500);
    logTail.push({ level, message });
    if (logTail.length > 10) logTail.shift();
  }
  function describe() {
    return { library: `Wllama ${WLLAMA_VERSION}`, backend: "CPU / WASM", loadConfig,
      secureContext: Boolean(globalThis.isSecureContext), isolated: Boolean(globalThis.crossOriginIsolated),
      workerAvailable: Boolean(globalThis.Worker), wasmAvailable: Boolean(globalThis.WebAssembly),
      opfsAvailable: Boolean(globalThis.navigator?.storage?.getDirectory), logTail: [...logTail] };
  }
  async function unload() {
    const old = instance; instance = null;
    if (old) await old.exit();
  }
  async function load(model, { allowDownload = false, signal = new AbortController().signal, onProgress = noop } = {}) {
    if (!globalThis.isSecureContext || !globalThis.Worker || !globalThis.WebAssembly) {
      throw new Error("Local generation needs a recent browser on HTTPS or localhost. Built-in hints are still available.");
    }
    logTail.length = 0;
    const base = new URL(RUNTIME_BASE, import.meta.url);
    onProgress({ message: "Loading inference engine…" });
    try {
      // Saved-only requests check local storage before reaching any CDN.
      let file = allowDownload ? null : await store.get(model, { allowDownload: false, signal, onProgress });
      if (!modulePromise) modulePromise = importRuntime(new URL("index.js", base).href).catch((error) => { modulePromise = null; throw error; });
      const { Wllama } = await interruptible(modulePromise, signal, 30000,
        "The inference engine did not load. Check the connection and retry, or use built-in hints.");
      if (signal.aborted) throw abortError();
      if (!file) file = await store.get(model, { allowDownload, signal, onProgress });
      if (signal.aborted) throw abortError();
      onProgress({ message: "Initializing model on this device…", loaded: file.size, total: file.size });
      const current = new Wllama({ default: new URL("wasm/wllama.wasm", base).href }, {
        allowOffline: true, suppressNativeLog: false,
        logger: { debug: noop, log: noop,
          warn: (...args) => captureLog("warning", args), error: (...args) => captureLog("error", args) }
      });
      current.setCompat(COMPAT_MODE);
      instance = current;
      // CPU is the conservative default; no WebGPU/VRAM assumption. On ordinary
      // static hosting this uses one worker thread, not the main UI thread.
      const threads = globalThis.crossOriginIsolated ? Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 2) - 1)) : 1;
      loadConfig = { n_ctx: 2048, n_batch: 128, n_ubatch: 128,
        n_threads: threads, n_parallel: 1, n_gpu_layers: 0, warmup: false };
      await interruptible(current.loadModel([file], loadConfig), signal, 120000,
        "Model initialization took too long. Try Compact or reload the page.");
      if (signal.aborted) throw abortError();
    } catch (error) {
      await unload().catch(() => {});
      if (error.name === "AbortError") throw error;
      if (/fetch|module script|dynamically imported/i.test(error.message)) {
        throw new Error(`The inference runtime could not load. Check the connection or CDN blocking. Details: ${error.message}`);
      }
      throw error;
    }
  }
  async function generate(messages, { signal, kind, angle = 0, attempt = 1, requestSerial = 0, onProgress = noop } = {}) {
    const current = instance;
    if (!current?.isModelLoaded()) throw new Error("No local model is ready.");
    if (signal?.aborted) throw abortError();
    onProgress({ chunks: 0, characters: 0 });
    const stream = await current.createChatCompletion({ messages,
      max_tokens: kind === "single" ? 144 : 176,
      temperature: attempt > 1 ? 0.55 : 0.7, top_p: 0.9, top_k: 40,
      seed: (1753 + angle * 67 + attempt * 131 + requestSerial * 17) & 0x7fffffff,
      repeat_penalty: 1.08, stream: true, cache_prompt: true, abortSignal: signal });
    if (!stream || typeof stream[Symbol.asyncIterator] !== "function") {
      throw new Error("The runtime did not return the expected Wllama v3 completion stream. Check the pinned runtime version.");
    }
    let text = "", finishReason = null, chunks = 0;
    for await (const chunk of stream) {
      if (signal?.aborted || current !== instance) throw abortError();
      if (chunk?.error) throw new Error(chunk.error.message || String(chunk.error));
      const choice = chunk?.choices?.[0];
      const piece = choice?.delta?.content;
      if (typeof piece === "string" && piece) {
        text += piece; chunks++;
        if (text.length > 6000) throw new Error("The model returned an unexpectedly large response.");
        // The UI gets progress counts, NEVER unchecked text as a finished hint.
        onProgress({ chunks, characters: text.length });
      }
      if (choice?.finish_reason) finishReason = choice.finish_reason;
    }
    if (signal?.aborted) throw abortError();
    if (text && !finishReason) throw new Error("The completion stream ended without a finish reason. Retry after reloading the saved model.");
    return { text, finishReason, chunks };
  }
  return Object.freeze({ load, generate, unload, describe, clearDownloads: () => store.clear() });
}
