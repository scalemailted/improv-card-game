/* Local inference worker. All remote requests below download fixed, public assets.
   Prompts and generated text are never sent to any server. */
"use strict";
importScripts('./config.js?v=0.22.0', './hint-request.js?v=0.22.0');
const config = self.IMPROMPT_AI_CONFIG;
const requests = self.IMPROMPT_AI_REQUEST;
let generator = null;
let busy = false;
const objectURLs = [];
const send = (id, type, data = {}) => self.postMessage({ id, type, ...data });
const fileById = id => config.files.find(f => f.id === id);

async function inspectCache() {
  const cache = await caches.open(config.cacheName);
  let count = 0, bytes = 0;
  for (const f of config.files) {
    const r = await cache.match(f.url);
    if (r) { count++; bytes += Number(r.headers.get('x-imprompt-bytes') || r.headers.get('content-length') || 0); }
  }
  return { installed: count === config.files.length, cachedFiles: count, totalFiles: config.files.length, bytes };
}

async function downloadAssets(id) {
  const cache = await caches.open(config.cacheName);
  for (let i = 0; i < config.files.length; i++) {
    const f = config.files[i];
    if (await cache.match(f.url)) { send(id, 'progress', { phase: 'download', file: f.id, fileIndex: i + 1, totalFiles: config.files.length, progress: 100, cached: true }); continue; }
    const response = await fetch(f.url, { credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store' });
    if (!response.ok || !response.body) throw new Error(`Download failed (${response.status}): ${f.id}`);
    const total = Number(response.headers.get('content-length')) || 0;
    let loaded = 0, lastUpdate = 0;
    const reader = response.body.getReader();
    const stream = new ReadableStream({
      async pull(controller) {
        try {
          const { done, value } = await reader.read();
          if (done) { controller.close(); return; }
          loaded += value.byteLength;
          if (Date.now() - lastUpdate > 150) {
            send(id, 'progress', { phase: 'download', file: f.id, fileIndex: i + 1,
              totalFiles: config.files.length, loaded, total, progress: total ? Math.min(99, loaded / total * 100) : null });
            lastUpdate = Date.now();
          }
          controller.enqueue(value);
        } catch (err) { controller.error(err); }
      },
      cancel(reason) { return reader.cancel(reason); }
    });
    // Cache.put resolves only after the complete stream is stored. Interrupted files
    // are not treated as installed; completed earlier files can be reused on retry.
    const headers = new Headers({ 'Content-Type': response.headers.get('content-type') || 'application/octet-stream' });
    if (total) headers.set('x-imprompt-bytes', String(total));
    await cache.put(f.url, new Response(stream, { status: 200, headers }));
    send(id, 'progress', { phase: 'download', file: f.id, fileIndex: i + 1, totalFiles: config.files.length, loaded, total: loaded, progress: 100 });
  }
  return inspectCache();
}

async function assetBlobURL(cache, id, mime) {
  const response = await cache.match(fileById(id).url);
  if (!response) throw new Error('AI files are missing. Open Nudge settings and download again.');
  const url = URL.createObjectURL(new Blob([await response.arrayBuffer()], { type: mime }));
  objectURLs.push(url); return url;
}

async function loadGenerator(id) {
  if (generator) return;
  if (!(await inspectCache()).installed) throw new Error('The optional model is not fully downloaded.');
  send(id, 'progress', { phase: 'loading', message: 'Loading the model into memory…' });
  const cache = await caches.open(config.cacheName);
  const moduleURL = await assetBlobURL(cache, 'runtime', 'text/javascript');
  const factoryURL = await assetBlobURL(cache, 'factory', 'text/javascript');
  const wasmURL = await assetBlobURL(cache, 'wasm', 'application/wasm');
  const { pipeline, env } = await import(moduleURL);
  // Transformers.js requires allowLocalModels=true with local_files_only.
  // The custom cache supplies the pinned remote-key responses without a download.
  env.allowLocalModels = true;
  env.allowRemoteModels = false;
  env.useBrowserCache = false;
  env.useFSCache = false;
  env.useCustomCache = true;
  env.customCache = {
    async match(key) {
      const url = typeof key === 'string' ? key : key.url;
      const direct = await cache.match(url);
      if (direct) return direct;
      // Transformers.js may use a file-cache key relative to the model id.
      const suffix = url.replace(/^https:\/\/huggingface\.co\//, '').replace(/^\/+/, '');
      return cache.match('https://huggingface.co/' + suffix);
    },
    async put() { /* inference is read-only; installation owns writes */ }
  };
  env.backends.onnx.wasm.numThreads = 1;
  env.backends.onnx.wasm.proxy = false;
  env.backends.onnx.wasm.wasmPaths = { mjs: factoryURL, wasm: wasmURL };
  // local_files_only prevents hidden re-downloads and accidental inference-network use.
  generator = await pipeline(config.task, config.modelId, {
    revision: config.revision, dtype: config.dtype, device: config.device,
    local_files_only: true,
    session_options: { logSeverityLevel: 3 }
  });
  send(id, 'progress', { phase: 'ready', message: 'Ready on this device.' });
}

async function generate(id, payload) {
  if (!generator) throw new Error('Load the model before requesting a nudge.');
  const begin = performance.now(); let rejected = [];
  for (let attempt = 0; attempt < 2; attempt++) {
    const prompt = requests.buildPrompt(payload, attempt);
    const output = await generator(prompt, { ...config.sampling,
      temperature: config.sampling.temperature + attempt * 0.06,
      max_new_tokens: payload.kind === 'single' ? 64 : 80 });
    const raw = output?.[0]?.generated_text || '';
    const check = requests.validateOutput(raw, payload);
    if (check.ok) return { text: check.text, source: 'local-ai', attempts: attempt + 1,
      elapsedMs: Math.round(performance.now() - begin), modelId: config.modelId };
    rejected.push(check.reasons);
  }
  return { text: null, source: 'fallback', reason: 'quality-check', rejected,
    elapsedMs: Math.round(performance.now() - begin) };
}
self.onmessage = async ({ data }) => {
  const { id, command, payload } = data || {};
  if (busy) { send(id, 'error', { message: 'The local model is busy.' }); return; }
  busy = true;
  try {
    if (command === 'inspect') send(id, 'result', await inspectCache());
    else if (command === 'install') send(id, 'result', await downloadAssets(id));
    else if (command === 'load') { await loadGenerator(id); send(id, 'result', { ready: true }); }
    else if (command === 'generate') {
      if (!payload || !['single', 'combination'].includes(payload.kind)) throw new Error('Invalid hint request.');
      send(id, 'result', await generate(id, payload));
    } else throw new Error('Unknown local AI command.');
  } catch (err) { send(id, 'error', { message: String(err?.message || err) }); }
  finally { busy = false; }
};
