"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const root = path.resolve(__dirname, "..");
function setup() {
  const handlers = {}, added = [], deleted = [], fetched = [], written = [], saved = new Map();
  const cache = { addAll: async urls => added.push(...urls), match: async req => saved.get(req.url || req), put: async (req, res) => { saved.set(req.url || req, res); written.push(req.url || req); } };
  const caches = { open: async () => cache, match: cache.match, keys: async () => ["imprompt-v0.21.2", "imprompt-v0.22.0", "imprompt-llm-runtime-3.6.1", "unrelated-cache"], delete: async key => deleted.push(key) };
  vm.runInNewContext(fs.readFileSync(path.join(root, "sw.js"), "utf8"), {
    URL, caches, fetch: async req => { fetched.push(req.url); return new Response("fixture"); },
    self: { location: new URL("https://example.test/imprompt/sw.js"), clients: { claim: async () => {} }, addEventListener: (name, callback) => { handlers[name] = callback; } }
  });
  return { handlers, added, deleted, fetched, written };
}
async function dispatch(f, name, request) {
  const tasks = []; let response;
  f.handlers[name]({ request, waitUntil: task => tasks.push(task), respondWith: task => { response = task; tasks.push(task); } });
  for (let i = 0; i < tasks.length; i++) await tasks[i];
  return response;
}
test("Offline app shell contains every HTML script and local adapter dependency, but no external model/runtime", async () => {
  const f = setup(); await dispatch(f, "install");
  for (const url of f.added) {
    const parsed = new URL(url); assert.equal(parsed.origin, "https://example.test");
    let relative = parsed.pathname.replace(/^\/imprompt\//, ""); if (!relative) relative = "index.html";
    assert.ok(fs.existsSync(path.join(root, relative)), relative);
    assert.ok(!/\.gguf$/.test(relative));
  }
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  for (const match of html.matchAll(/<script src="([^\"]+)"/g)) {
    assert.ok(f.added.includes(new URL(match[1], "https://example.test/imprompt/").href), match[1]);
  }
  for (const module of ["hints/model-store.mjs", "hints/runtime-config.mjs", "hints/wllama-adapter.mjs?v=0.22.0"]) {
    assert.ok(f.added.includes(new URL(module, "https://example.test/imprompt/").href));
  }
});
test("App activation keeps current runtime and unrelated cache data", async () => {
  const f = setup(); await dispatch(f, "activate"); assert.deepEqual(f.deleted, ["imprompt-v0.21.2"]);
});
test("The optional version-pinned runtime is cached only when requested", async () => {
  const f = setup(); const request = { method: "GET", mode: "cors", url: "https://cdn.jsdelivr.net/npm/@wllama/wllama@3.6.1/esm/index.js" };
  await dispatch(f, "fetch", request); assert.equal(f.fetched.length, 1); assert.equal(f.written.length, 1);
  await dispatch(f, "fetch", request); assert.equal(f.fetched.length, 1);
});
test("Remote model files, self-hosted GGUF files, and unrelated CDNs are not copied into the PWA cache", async () => {
  const f = setup();
  for (const url of ["https://huggingface.co/test/resolve/main/model.gguf", "https://example.test/imprompt/models/model.gguf", "https://other.example/runtime.js"]) {
    assert.equal(await dispatch(f, "fetch", { method: "GET", mode: "cors", url }), undefined);
  }
  assert.equal(f.fetched.length, 0); assert.equal(f.written.length, 0);
});
test("HTML identifiers and the installed package version are internally consistent", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]); assert.equal(new Set(ids).size, ids.length);
  assert.equal(require("../package.json").version, "0.22.0"); assert.doesNotMatch(html, /\?v=0\.21\./);
});
