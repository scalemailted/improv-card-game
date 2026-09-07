import assert from "node:assert/strict";
import test from "node:test";
import { ModelStore, MODEL_DIRECTORY } from "../hints/model-store.mjs";
import { createRuntime } from "../hints/wllama-adapter.mjs";

function missing() { return Object.assign(new Error("Missing file"), { name: "NotFoundError" }); }
class Directory {
  entries = new Map();
  async getDirectoryHandle(name, { create = false } = {}) {
    if (!this.entries.has(name)) { if (!create) throw missing(); this.entries.set(name, new Directory()); }
    return this.entries.get(name);
  }
  async getFileHandle(name, { create = false } = {}) {
    if (!this.entries.has(name)) { if (!create) throw missing(); this.entries.set(name, new Blob()); }
    const entries = this.entries;
    return {
      async getFile() { if (!entries.has(name)) throw missing(); return entries.get(name); },
      async createWritable() {
        let parts = [];
        return { async write(data) { parts.push(data); }, async close() { entries.set(name, new Blob(parts)); }, async abort() { parts = []; } };
      }
    };
  }
  async removeEntry(name) { if (!this.entries.delete(name)) throw missing(); }
}
function fixture() {
  const root = new Directory(); let fetches = 0, lockCalls = 0;
  const bytes = new Uint8Array(1048580); bytes.set(new TextEncoder().encode("GGUF"));
  const model = { id: "mock-v1", url: "https://example.invalid/brain.gguf", approximateBytes: bytes.length };
  const storage = { getDirectory: async () => root, estimate: async () => ({ quota: 2 ** 30, usage: 0 }) };
  const fetcher = async () => { fetches++; return new Response(bytes, { headers: { "content-length": String(bytes.length) } }); };
  const locks = { request: async (_name, options, work) => { lockCalls++; return (work || options)(); } };
  const store = new ModelStore({ storage, fetcher, locks });
  return { root, bytes, model, storage, store, get fetches() { return fetches; }, get lockCalls() { return lockCalls; } };
}
test("Saved-only lookup cannot initiate a model download", async () => {
  const f = fixture(); await assert.rejects(f.store.get(f.model), /No complete saved copy/); assert.equal(f.fetches, 0);
});
test("A streamed GGUF writes its completion marker last and reuses its saved copy", async () => {
  const f = fixture(); const loaded = await f.store.get(f.model, { allowDownload: true });
  assert.equal(loaded.size, f.bytes.length); assert.equal(f.fetches, 1);
  assert.equal((await f.store.get(f.model)).size, loaded.size); assert.equal(f.fetches, 1);
  assert.equal(f.lockCalls, 2);
  const dir = await f.store.directory();
  const meta = JSON.parse(await (await (await dir.getFileHandle(f.model.id + ".json")).getFile()).text());
  assert.equal(meta.bytes, loaded.size); assert.equal(meta.url, f.model.url);
});
test("A stale URL or truncated completed file is not accepted from storage", async () => {
  const f = fixture(); await f.store.get(f.model, { allowDownload: true });
  await assert.rejects(f.store.get({ ...f.model, url: f.model.url + "?changed" }), /No complete saved copy/);
  const dir = await f.store.directory(); dir.entries.set(f.model.id + ".gguf", new Blob(["GGUF"]));
  assert.equal(await f.store.saved(f.model), null);
});
test("Partial transfer cleanup touches only the requested model", async () => {
  const f = fixture(); const dir = await f.store.directory(); dir.entries.set("another-model.gguf", new Blob(["keep"]));
  f.store.fetcher = async () => new Response(f.bytes, { headers: { "content-length": String(f.bytes.length + 1) } });
  await assert.rejects(f.store.get(f.model, { allowDownload: true }), /incomplete/);
  assert.equal(dir.entries.has(f.model.id + ".gguf"), false); assert.equal(dir.entries.has(f.model.id + ".json"), false);
  assert.equal(dir.entries.has("another-model.gguf"), true);
});
test("Invalid model content never receives a completion marker", async () => {
  const f = fixture(); f.bytes[0] = 0;
  await assert.rejects(f.store.get(f.model, { allowDownload: true }), /not a complete GGUF/);
  assert.equal((await f.store.directory()).entries.size, 0);
});
test("A canceled transfer removes its partial file", async () => {
  const f = fixture(), controller = new AbortController();
  await assert.rejects(f.store.get(f.model, { allowDownload: true, signal: controller.signal, onProgress: () => controller.abort() }), { name: "AbortError" });
  assert.equal((await f.store.directory()).entries.size, 0);
});
test("Storage quota guard prevents beginning an oversized download", async () => {
  const f = fixture(); f.storage.estimate = async () => ({ quota: 10000, usage: 0 });
  await assert.rejects(f.store.get(f.model, { allowDownload: true }), /Not enough browser storage/); assert.equal(f.fetches, 0);
});
test("Clearing the model directory preserves unrelated origin storage", async () => {
  const f = fixture(); f.root.entries.set("unrelated-folder", new Directory());
  await f.store.get(f.model, { allowDownload: true }); await f.store.clear();
  assert.equal(f.root.entries.has(MODEL_DIRECTORY), false); assert.equal(f.root.entries.has("unrelated-folder"), true);
});

// Adapter contract tests use an injected fake Wllama, not a real model/worker.
globalThis.isSecureContext = true; globalThis.Worker = function Worker() {};
function fakeEngine() {
  const calls = [];
  class Wllama {
    constructor(...args) { calls.push(["construct", ...args]); }
    setCompat(mode) { calls.push(["compat", mode]); }
    async loadModel(...args) { calls.push(["load", ...args]); }
    isModelLoaded() { return true; }
    async createChatCompletion(options) { calls.push(["generate", options]); return { choices: [{ message: { content: "A mock example." }, finish_reason: "stop" }] }; }
    async exit() { calls.push(["exit"]); }
  }
  return { Wllama, calls };
}
test("Saved-only adapter failure does not fetch the inference CDN", async () => {
  let imports = 0;
  const runtime = createRuntime({ store: { get: async () => { throw new Error("No complete saved copy"); } }, importRuntime: async () => { imports++; } });
  await assert.rejects(runtime.load({}, { allowDownload: false }), /No complete saved copy/); assert.equal(imports, 0);
});
test("A hanging CDN import can be canceled without initializing any model", async () => {
  const controller = new AbortController(); let storageCalls = 0;
  const runtime = createRuntime({ store: { get: async () => { storageCalls++; } }, importRuntime: () => new Promise(() => {}) });
  const loading = runtime.load({}, { allowDownload: true, signal: controller.signal }); controller.abort();
  await assert.rejects(loading, { name: "AbortError" }); assert.equal(storageCalls, 0);
});
test("Adapter uses a bounded CPU context and the v3 completion contract", async () => {
  const engine = fakeEngine();
  const runtime = createRuntime({ store: { get: async () => new Blob(["GGUF"]) }, importRuntime: async () => engine });
  await runtime.load({}, { allowDownload: true });
  const config = engine.calls.find(c => c[0] === "load")[2];
  assert.equal(config.n_ctx, 2048); assert.equal(config.n_gpu_layers, 0); assert.equal(config.n_threads, 1);
  const signal = new AbortController().signal;
  const result = await runtime.generate([{ role: "user", content: "fixture" }], { signal, kind: "combination", angle: 2 });
  assert.deepEqual(result, { text: "A mock example.", finishReason: "stop" });
  const options = engine.calls.find(c => c[0] === "generate")[1];
  assert.equal(options.abortSignal, signal); assert.equal(options.stream, false); assert.equal(options.max_tokens, 110);
  await runtime.unload(); assert.equal(engine.calls.filter(c => c[0] === "exit").length, 1);
});
test("Canceling model initialization exits the unready runtime", async () => {
  const engine = fakeEngine(), controller = new AbortController();
  engine.Wllama.prototype.loadModel = async () => { controller.abort(); return new Promise(() => {}); };
  const runtime = createRuntime({ store: { get: async () => new Blob(["GGUF"]) }, importRuntime: async () => engine });
  await assert.rejects(runtime.load({}, { allowDownload: true, signal: controller.signal }), { name: "AbortError" });
  assert.equal(engine.calls.filter(c => c[0] === "exit").length, 1);
});
