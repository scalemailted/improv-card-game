/* Optional inference orchestration. No deck mutation or remote prompt transport. */
(function (root, factory) {
  const common = typeof module === "object" && module.exports;
  const api = factory(common ? require("./local-hint-core.js") : root.IMPROMPT_LOCAL_HINT_CORE,
    common ? require("./local-models.js") : root.IMPROMPT_LOCAL_MODELS);
  if (common) module.exports = api; else root.IMPROMPT_LOCAL_HINTS = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (core, models) {
  "use strict";
  const CACHE_KEY = "imprompt:generated-hints:v2";
  const MAX_CACHE = 100;
  const DEFAULT_TIMEOUT_MS = 180000;
  const MAX_ATTEMPTS = 2;
  const abortError = () => Object.assign(new Error("Cancelled."), { name: "AbortError" });
  const errorMessage = (error) => String(error?.message || error || "Unknown runtime error").slice(0, 1400);
  function createController({ runtimeFactory, storage = null, onStatus = () => {}, timeoutMs = DEFAULT_TIMEOUT_MS, maxAttempts = MAX_ATTEMPTS } = {}) {
    if (typeof runtimeFactory !== "function") throw new TypeError("runtimeFactory is required.");
    if (!(timeoutMs > 0 && Number.isFinite(timeoutMs))) throw new TypeError("timeoutMs must be positive.");
    if (!Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > MAX_ATTEMPTS) throw new TypeError("Use one or two attempts.");
    let runtime = null, runtimePromise = null, model = null, operation = null, generationSerial = 0;
    let phase = "off", cache = new Map(), activeTask = null, diagnostics = null;
    try {
      storage?.removeItem?.("imprompt:generated-hints:v1"); // Never reuse the old coaching prompt's output.
      const stored = JSON.parse(storage?.getItem(CACHE_KEY) || "[]");
      if (Array.isArray(stored)) cache = new Map(stored.filter((entry) => Array.isArray(entry) && typeof entry[0] === "string" && entry[0].length < 6000 && typeof entry[1] === "string" && entry[1].length < 900).slice(-MAX_CACHE));
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
    function describeRuntime() { try { return runtime?.describe?.() || null; } catch (_) { return null; } }
    function getDiagnostics() { return diagnostics ? JSON.parse(JSON.stringify(diagnostics)) : null; }
    function isReady() { return Boolean(model && ["ready", "generating"].includes(phase)); }
    function cancel() { generationSerial += 1; operation?.abort(); }
    async function loadModel(modelId, { allowDownload = false } = {}) {
      if (["loading", "generating", "stopping", "clearing"].includes(phase)) throw new Error("Finish or cancel the current operation first.");
      const chosen = models.find((item) => item.id === modelId);
      if (!chosen) throw new Error("Choose one of the supplied local models.");
      model = null;
      const controller = new AbortController(); operation = controller;
      const started = Date.now();
      diagnostics = { stage: "load", modelId: chosen.id, promptVersion: core.PROMPT_VERSION, startedAt: new Date().toISOString(), status: "loading" };
      emit("loading", { message: allowDownload ? "Preparing download…" : "Looking for the saved model…" });
      const task = (async () => {
        try {
          const engine = await getRuntime();
          if (controller.signal.aborted) throw abortError();
          await engine.unload();
          await engine.load(chosen, { allowDownload, signal: controller.signal,
            onProgress: (progress) => { if (!controller.signal.aborted) emit("loading", progress); } });
          if (controller.signal.aborted) { await engine.unload(); throw abortError(); }
          model = chosen;
          Object.assign(diagnostics, { status: "ready", elapsedMs: Date.now() - started, runtime: describeRuntime() });
          emit("ready", { message: "Ready. Opening a nudge now generates an in-character moment." });
          return true;
        } catch (error) {
          const runtimeInfo = describeRuntime();
          try { await runtime?.unload(); } catch (_) {}
          model = null;
          Object.assign(diagnostics, { status: error.name === "AbortError" ? "cancelled" : "error", elapsedMs: Date.now() - started, error: errorMessage(error), runtime: runtimeInfo });
          emit(error.name === "AbortError" ? "off" : "error", { message: error.name === "AbortError" ? "Cancelled. Built-in hints are still available." : errorMessage(error) });
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
      return { ok: true, text: valid.text, source: "cache" };
    }
    async function generate(input) {
      const request = core.prepareRequest(input); // Gate BEFORE touching model/cache.
      if (!isReady() || phase === "generating") return { ok: false, reason: "unavailable" };
      const hit = cached(input); if (hit) return hit;
      const chosen = model, key = core.cacheKey(request, chosen.id);
      const controller = new AbortController(); operation = controller;
      const serial = ++generationSerial, started = Date.now();
      let timedOut = false, timer, ticker, abortListener, activeAttempt = 1, chunks = 0;
      diagnostics = { stage: "generation", promptVersion: core.PROMPT_VERSION, modelId: chosen.id,
        kind: request.kind, cardIds: request.cards.map((card) => card.id), startedAt: new Date().toISOString(),
        status: "generating", attempts: [], timeoutMs, runtime: describeRuntime() };
      function progress() {
        if (controller.signal.aborted || serial !== generationSerial) return;
        const seconds = Math.floor((Date.now() - started) / 1000);
        const label = activeAttempt > 1 ? "Refining the performed example" : chunks ? "Performing the moment" : "Reading the card instructions";
        emit("generating", { message: `${label}… ${seconds}s${chunks ? ` · ${chunks} text chunks` : ""}`, attempt: activeAttempt, chunks, elapsedMs: Date.now() - started });
      }
      progress();
      const task = (async () => {
        try {
          const abort = new Promise((_, reject) => {
            abortListener = () => reject(abortError());
            controller.signal.addEventListener("abort", abortListener, { once: true });
          });
          timer = setTimeout(() => { timedOut = true; controller.abort(); }, timeoutMs);
          ticker = setInterval(progress, 1000);
          let repairReason = null;
          for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            if (controller.signal.aborted || serial !== generationSerial) throw abortError();
            activeAttempt = attempt; chunks = 0; progress();
            const attemptStart = Date.now();
            const record = { attempt, status: "generating", repairReason, chunks: 0, characters: 0 };
            diagnostics.attempts.push(record);
            const result = await Promise.race([runtime.generate(core.buildMessages(request, { repairReason }), {
              signal: controller.signal, kind: request.kind, angle: request.angle, attempt, requestSerial: serial,
              onProgress: (update) => {
                if (controller.signal.aborted || serial !== generationSerial) return;
                chunks = update.chunks || 0;
                record.chunks = chunks; record.characters = update.characters || 0;
              }
            }), abort]);
            if (serial !== generationSerial || controller.signal.aborted) throw abortError();
            const valid = core.validateOutput(result?.text, request, result?.finishReason);
            Object.assign(record, { elapsedMs: Date.now() - attemptStart, finishReason: result?.finishReason || null,
              output: typeof result?.text === "string" ? result.text.slice(0, 1800) : "", status: valid.ok ? "accepted" : "rejected", reason: valid.reason || null });
            if (valid.ok) {
              cache.set(key, valid.text); persist();
              diagnostics.status = "accepted";
              return { ok: true, text: valid.text, source: "generated", attempts: attempt };
            }
            repairReason = valid.reason;
          }
          diagnostics.status = "rejected";
          return { ok: false, reason: repairReason, attempts: maxAttempts };
        } catch (error) {
          const reason = controller.signal.aborted ? (timedOut ? "timeout" : "cancelled") : "runtime";
          diagnostics.status = reason;
          diagnostics.error = timedOut ? "The total generation deadline was reached." : errorMessage(error);
          diagnostics.runtime = describeRuntime();
          if (diagnostics.attempts.length && diagnostics.attempts.at(-1).status === "generating") diagnostics.attempts.at(-1).status = reason;
          try { await runtime.unload(); } catch (unloadError) { diagnostics.unloadError = errorMessage(unloadError); }
          model = null;
          return { ok: false, reason, error: diagnostics.error };
        } finally {
          clearTimeout(timer); clearInterval(ticker);
          controller.signal.removeEventListener("abort", abortListener);
          diagnostics.elapsedMs = Date.now() - started;
          if (operation === controller) operation = null;
          emit(model ? "ready" : "off", { message: model ? "Ready." : "Local model unloaded. Use saved model to enable it again." });
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
        cache.clear(); persist(); diagnostics = null;
        emit("off", { message: "Model downloads and generated examples removed. Your deck and Scene Log are untouched." });
      } catch (error) { emit("error", { message: errorMessage(error) }); }
    }
    return Object.freeze({ loadModel, generate, cached, cancel, unload, clearDownloads, isReady, getPhase: () => phase, getDiagnostics });
  }
  return Object.freeze({ createController, CACHE_KEY, MAX_CACHE, DEFAULT_TIMEOUT_MS, MAX_ATTEMPTS });
});
