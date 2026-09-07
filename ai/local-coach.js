/* Main-thread controller. No inference or network activity during ordinary play. */
(function (root, factory) {
  const common = typeof module === 'object' && module.exports;
  const api = factory(root, common ? require('./config.js') : root.IMPROMPT_AI_CONFIG);
  if (common) module.exports = api; else root.IMPROMPT_LOCAL_COACH = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root, config) {
  'use strict';
  class LocalCoach {
    constructor(options = {}) {
      this.workerFactory = options.workerFactory || (() => new Worker(new URL('./ai/coach-worker.js?v=0.22.0', document.baseURI)));
      try { this.storage = options.storage || root.localStorage; }
      catch { this.storage = null; }
      this.storage ||= { getItem: () => null, setItem: () => {} };
      this.cacheStorage = options.cacheStorage || root.caches;
      this.onChange = options.onChange || (() => {});
      this.worker = null; this.pending = null; this.serial = 0; this.ready = false;
      this.installed = false; this.busy = false; this.idleTimer = null; this.lastStatus = '';
      try { this.enabled = JSON.parse(this.storage.getItem(config.settingsKey) || '{}').enabled === true; }
      catch { this.enabled = false; }
    }
    static supported() { return Boolean(root.isSecureContext && root.Worker && root.WebAssembly && root.caches); }
    notify(update) { this.lastStatus = update.message || this.lastStatus; this.onChange({ enabled: this.enabled, installed: this.installed, ready: this.ready, busy: this.busy, ...update }); }
    preference(value) {
      this.enabled = Boolean(value);
      try { this.storage.setItem(config.settingsKey, JSON.stringify({ enabled: this.enabled, modelId: config.modelId, revision: config.revision })); } catch { /* session-only preference when storage is blocked */ }
      this.notify({});
    }
    async inspect() {
      if (!this.cacheStorage) return { installed: false, cachedFiles: 0, bytes: 0 };
      const cache = await this.cacheStorage.open(config.cacheName);
      let count = 0, bytes = 0;
      for (const f of config.files) { const r = await cache.match(f.url); if (r) { count++; bytes += Number(r.headers.get('x-imprompt-bytes') || r.headers.get('content-length') || 0); } }
      this.installed = count === config.files.length;
      this.notify({}); return { installed: this.installed, cachedFiles: count, bytes };
    }
    ensureWorker() {
      if (this.worker) return;
      const worker = this.workerFactory(); this.worker = worker;
      worker.onmessage = ({ data }) => {
        if (!this.pending || data.id !== this.pending.id) return;
        if (data.type === 'progress') { this.notify(data); return; }
        const task = this.pending; this.pending = null; clearTimeout(task.timer);
        this.busy = false; this.notify({});
        if (data.type === 'error') task.reject(new Error(data.message || 'The local model could not run.'));
        else task.resolve(data);
      };
      worker.onerror = event => {
        event.preventDefault?.();
        this.cancel(event.message || 'The local worker could not start.');
      };
    }
    send(command, payload, timeout) {
      if (this.pending) return Promise.reject(new Error('A local AI request is already running.'));
      this.ensureWorker(); clearTimeout(this.idleTimer); this.busy = true;
      return new Promise((resolve, reject) => {
        const id = ++this.serial;
        const timer = setTimeout(() => this.cancel(command === 'generate' ? 'Generation took too long. A quick example is still available.' : 'Model loading took too long. Try again from Nudge settings.'), timeout);
        this.pending = { id, resolve, reject, timer, command };
        this.worker.postMessage({ id, command, payload });
        this.notify({});
      });
    }
    async install() {
      this.preference(false);
      const result = await this.send('install', null, config.installTimeoutMs);
      this.installed = result.installed; this.preference(result.installed);
      this.notify({ phase: 'installed', message: 'Downloaded. The model loads when you request a nudge.' });
      this.release(); return result;
    }
    async generate(payload) {
      if (!this.enabled) throw new Error('Local AI is off.');
      try {
        if (!this.ready) {
          await this.send('load', null, config.loadTimeoutMs);
          this.ready = true;
        }
        this.notify({ phase: 'generating', message: 'Trying a new example…' });
        const result = await this.send('generate', payload, config.generationTimeoutMs);
        this.idleTimer = setTimeout(() => this.release(), config.idleUnloadMs);
        return result;
      } catch (error) {
        // A failed runtime may retain large tensors/blob URLs; terminate, but keep files.
        this.cancel();
        throw error;
      }
    }
    cancel(message = 'Cancelled.') {
      const task = this.pending; this.pending = null;
      if (task) { clearTimeout(task.timer); const err = new Error(message); err.name = message === 'Cancelled.' ? 'AbortError' : 'Error'; task.reject(err); }
      if (this.worker) this.worker.terminate();
      this.worker = null; this.ready = false; this.busy = false; clearTimeout(this.idleTimer);
      this.notify({});
    }
    release() { if (!this.busy) this.cancel(); }
    disable() { this.cancel(); this.preference(false); }
    async remove() { this.disable(); await this.cacheStorage.delete(config.cacheName); this.installed = false; this.notify({ message: 'Local AI files removed. Your cards and history are untouched.' }); }
  }
  return Object.freeze({ LocalCoach, config });
});
