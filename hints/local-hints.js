/* Optional inference orchestration. Deck mutations are deliberately impossible here. */
(function (root, factory) {
  const common = typeof module === "object" && module.exports;
  const api = factory(common ? require("./local-hint-core.js") : root.IMPROMPT_LOCAL_HINT_CORE,
    common ? require("./local-models.js") : root.IMPROMPT_LOCAL_MODELS);
  if (common) module.exports = api; else root.IMPROMPT_LOCAL_HINTS = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (core, models) {
  "use strict";
  const CACHE_KEY = "imprompt:generated-hints:v1";
  const MAX_CACHE = 100;
  const abortError = () => Object.assign(new Error("Cancelled."), { name: "AbortError" });
  function createController({ runtimeFactory, storage = null, onStatus = () => {}, timeoutMs = 45000 } = {}) {
    if (typeof runtimeFactory !== "function") throw new TypeError("runtimeFactory is required.");
    let runtime = null, runtimePromise = null, model = null, operation = null, generationSerial = 0;
    let phase = "off", cache = new Map(), activeTask = null;
    try {
      const stored = JSON.parse(storage?.getItem(CACHE_KEY) || "[]");
      if (Array.isArray(stored)) cache = new Map(stored.filter((entry) => Array.isArray(entry) && typeof entry[0] === "string" && entry[0].length < 6000 && typeof entry[1] === "string" && entry[1].length < 700).slice(-MAX_CACHE));
    } catch (_) { /* Storage is optional. */ }
    function emit(next, detail = {}) { phase = next; onStatus({ phase, modelId: model?.id || null, ...detail }); }
    function persist() {
      while (cache.size > MAX_CACHE) cache.delete(cache.keys().next().value);
      try { storage?.setItem(CACHE_KEY, JSON.stringify([...cache])); } catch (_) { /* In-memory cache still works. */ }
    }
    async function getRuntime() {
      if (!runtimePromise) runtimePromise = Promise.resolve().then(runtimeFactory).then((value) => (runtime = value)).catch((error) => { runtimePromise = null; throw error; });
      return runtimePromise;
    }
    function isReady() { return Boolean(model && ["ready", "generating"].includes(phase)); }
    function cancel() { generationSerial += 1; operation?.abort(); }
    async function loadModel(modelId, { allowDownload = false } = {}) {
      if (["loading", "generating", "stopping", "clearing"].includes(phase)) throw new Error("Finish or cancel the current operation first.");
      const chosen = models.find((item) => item.id === modelId);
      if (!chosen) throw new Error("Choose one of the supplied local models.");
      model = null;
      const controller = new AbortController(); operation = controller;
      emit("loading", { message: allowDownload ? "Preparing download…" : "Looking for the saved model…" });
      const task = (async () => {
        try {
          const engine = await getRuntime();
          if (controller.signal.aborted) throw abortError();
          await engine.unload();
          await engine.load(chosen, { allowDownload, signal: controller.signal,
            onProgress: (progress) => { if (!controller.signal.aborted) emit("loading", progress); } });
          if (controller.signal.aborted) { await engine.unload(); throw abortError(); }
          model = chosen; emit("ready", { message: "Ready. Generate from any revealed card or pair." });
          return true;
        } catch (error) {
          try { await runtime?.unload(); } catch (_) {}
          model = null;
          emit(error.name === "AbortError" ? "off" : "error", { message: error.name === "AbortError" ? "Cancelled. Built-in hints are still available." : error.message });
          return false;
        } finally { if (operation === controller) operation = null; }
      })();
      activeTask = task;
      try { return await task; } finally { if (activeTask === task) activeTask = null; }
    }
    function cached(input) {
      const request = core.prepareRequest(input);
      if (!model) return null;
      const key = core.cacheKey(request, model.id), text = cache.get(key);
      if (!text) return null;
      const valid = core.validateOutput(text, request, "stop");
      if (!valid.ok) { cache.delete(key); persist(); return null; }
      return { ok: true, text, source: "cache" };
    }
    async function generate(input) {
      const request = core.prepareRequest(input); // Gate BEFORE touching model/cache.
      if (!isReady() || phase === "generating") return { ok: false, reason: "unavailable" };
      const hit = cached(input); if (hit) return hit;
      const key = core.cacheKey(request, model.id);
      const controller = new AbortController(); operation = controller;
      const serial = ++generationSerial;
      let timedOut = false, timer;
      emit("generating", { message: "Trying a new example…" });
      const task = (async () => {
        try {
          const abort = new Promise((_, reject) => controller.signal.addEventListener("abort", () => reject(abortError()), { once: true }));
          timer = setTimeout(() => { timedOut = true; controller.abort(); }, timeoutMs);
          const result = await Promise.race([runtime.generate(core.buildMessages(request), { signal: controller.signal, kind: request.kind, angle: request.angle }), abort]);
          if (serial !== generationSerial || controller.signal.aborted) throw abortError();
          const valid = core.validateOutput(result.text, request, result.finishReason);
          if (!valid.ok) return { ok: false, reason: valid.reason };
          cache.set(key, valid.text); persist();
          return { ok: true, text: valid.text, source: "generated" };
        } catch (error) {
          if (controller.signal.aborted) {
            // Terminating the worker prevents an uncooperative model from staying busy.
            try { await runtime.unload(); } catch (_) {}
            model = null;
            return { ok: false, reason: timedOut ? "timeout" : "cancelled" };
          }
          try { await runtime.unload(); } catch (_) {}
          model = null;
          return { ok: false, reason: "runtime" };
        } finally {
          clearTimeout(timer);
          if (operation === controller) operation = null;
          emit(model ? "ready" : "off", { message: model ? "Ready." : "Local model unloaded. Built-in hints remain available." });
        }
      })();
      activeTask = task;
      try { return await task; } finally { if (activeTask === task) activeTask = null; }
    }
    async function unload() {
      cancel(); emit("stopping", { message: "Stopping local model…" });
      if (activeTask) await activeTask;
      await runtime?.unload(); model = null; emit("off", { message: "Local model off. Saved downloads are kept." });
    }
    async function clearDownloads() {
      await unload(); emit("clearing", { message: "Removing local model files…" });
      try {
        const engine = await getRuntime(); await engine.clearDownloads();
        cache.clear(); persist(); emit("off", { message: "Model downloads and generated examples removed. Your deck and Scene Log are untouched." });
      } catch (error) { emit("error", { message: error.message }); }
    }
    return Object.freeze({ loadModel, generate, cached, cancel, unload, clearDownloads, isReady, getPhase: () => phase });
  }
  return Object.freeze({ createController, CACHE_KEY, MAX_CACHE });
});
