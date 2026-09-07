import { ModelStore } from "./model-store.mjs";
import { RUNTIME_BASE, COMPAT_MODE } from "./runtime-config.mjs";

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
  let instance = null, modulePromise = null;
  async function unload() {
    const old = instance; instance = null;
    if (old) await old.exit();
  }
  async function load(model, { allowDownload = false, signal = new AbortController().signal, onProgress = noop } = {}) {
    if (!globalThis.isSecureContext || !globalThis.Worker || !globalThis.WebAssembly) {
      throw new Error("Local generation needs a recent browser on HTTPS or localhost. Built-in hints are still available.");
    }
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
        allowOffline: true, suppressNativeLog: true,
        logger: { debug: noop, log: noop, warn: noop, error: noop }
      });
      current.setCompat(COMPAT_MODE);
      instance = current;
      // CPU is the conservative default; no WebGPU/VRAM assumption. On ordinary
      // static hosting this uses one worker thread, not the main UI thread.
      const threads = globalThis.crossOriginIsolated ? Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 2) - 1)) : 1;
      await interruptible(current.loadModel([file], { n_ctx: 2048, n_batch: 128, n_ubatch: 128,
        n_threads: threads, n_parallel: 1, n_gpu_layers: 0, warmup: false }), signal, 120000,
        "Model initialization took too long. Try Compact or reload the page.");
      if (signal.aborted) throw abortError();
    } catch (error) {
      await unload().catch(() => {});
      if (error.name === "AbortError") throw error;
      if (/fetch|module script|dynamically imported/i.test(error.message)) throw new Error("The local inference engine could not load. Connect to the internet for setup, or use built-in hints.");
      throw error;
    }
  }
  async function generate(messages, { signal, kind, angle }) {
    const current = instance;
    if (!current?.isModelLoaded()) throw new Error("No local model is ready.");
    const result = await current.createChatCompletion({ messages,
      max_tokens: kind === "single" ? 85 : 110,
      temperature: 0.65, top_p: 0.9, top_k: 40,
      seed: 1753 + angle * 17, repeat_penalty: 1.1,
      stream: false, cache_prompt: true, abortSignal: signal });
    return { text: result.choices?.[0]?.message?.content || "", finishReason: result.choices?.[0]?.finish_reason };
  }
  return Object.freeze({ load, generate, unload, clearDownloads: () => store.clear() });
}
