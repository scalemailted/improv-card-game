/* App-owned model storage. No inference code or scene information lives here. */
export const MODEL_DIRECTORY = "imprompt-local-models-v1";
const abortError = () => Object.assign(new Error("Cancelled."), { name: "AbortError" });
const checkAbort = (signal) => { if (signal?.aborted) throw abortError(); };
async function hasGGUFHeader(file) {
  return new TextDecoder().decode(await file.slice(0, 4).arrayBuffer()) === "GGUF";
}
export class ModelStore {
  constructor({ storage = globalThis.navigator?.storage, fetcher = globalThis.fetch?.bind(globalThis), locks = globalThis.navigator?.locks } = {}) {
    this.storage = storage; this.fetcher = fetcher; this.locks = locks;
  }
  async directory() {
    if (!this.storage?.getDirectory) throw new Error("This browser cannot save local models. Use a recent Chrome or Edge on HTTPS or localhost; built-in hints still work.");
    return (await this.storage.getDirectory()).getDirectoryHandle(MODEL_DIRECTORY, { create: true });
  }
  async saved(model) {
    const directory = await this.directory();
    try {
      const meta = JSON.parse(await (await (await directory.getFileHandle(`${model.id}.json`)).getFile()).text());
      const file = await (await directory.getFileHandle(`${model.id}.gguf`)).getFile();
      if (meta.url !== model.url || file.size !== meta.bytes || file.size < 1048576 || !await hasGGUFHeader(file)) return null;
      return file;
    } catch (error) {
      if (["NotFoundError", "SyntaxError"].includes(error.name)) return null;
      throw error;
    }
  }
  async get(model, { allowDownload = false, signal, onProgress = () => {} } = {}) {
    const work = async () => {
      checkAbort(signal);
      const existing = await this.saved(model);
      if (existing) { onProgress({ message: "Loading saved model…", loaded: existing.size, total: existing.size }); return existing; }
      if (!allowDownload) throw new Error("No complete saved copy of this model. Choose Download & enable while online.");
      if (this.storage.estimate) {
        const { quota, usage } = await this.storage.estimate();
        if (Number.isFinite(quota) && quota - (usage || 0) < model.approximateBytes + 32000000) throw new Error("Not enough browser storage for this model. Try Compact or free space first.");
      }
      return this.download(model, { signal, onProgress });
    };
    // A second tab must not overwrite a file while this tab is downloading it.
    return this.locks?.request ? this.locks.request(MODEL_DIRECTORY, { mode: "exclusive", ...(signal ? { signal } : {}) }, work) : work();
  }
  async download(model, { signal, onProgress }) {
    const directory = await this.directory();
    let writer = null, reader = null;
    try {
      await directory.removeEntry(`${model.id}.json`).catch((error) => { if (error.name !== "NotFoundError") throw error; });
      const response = await this.fetcher(model.url, { signal, credentials: "omit", referrerPolicy: "no-referrer" });
      if (!response.ok || !response.body) throw new Error(`Model download failed (${response.status}). Check the connection and try again.`);
      const length = Number(response.headers.get("content-length"));
      const knownLength = Number.isFinite(length) && length > 0 && !response.headers.get("content-encoding") ? length : null;
      const total = knownLength || model.approximateBytes;
      writer = await (await directory.getFileHandle(`${model.id}.gguf`, { create: true })).createWritable();
      reader = response.body.getReader();
      let loaded = 0, lastProgress = 0;
      while (true) {
        checkAbort(signal);
        const chunk = await reader.read();
        if (chunk.done) break;
        await writer.write(chunk.value);
        loaded += chunk.value.byteLength;
        if (Date.now() - lastProgress >= 150) {
          lastProgress = Date.now();
          onProgress({ loaded, total, approximateTotal: !knownLength, message: "Downloading model…" });
        }
      }
      checkAbort(signal);
      if (knownLength && loaded !== knownLength) throw new Error("The download was incomplete. Retry to replace the partial file.");
      await writer.close(); writer = null;
      const file = await (await directory.getFileHandle(`${model.id}.gguf`)).getFile();
      if (file.size < 1048576 || !await hasGGUFHeader(file)) throw new Error("The downloaded file is not a complete GGUF model.");
      checkAbort(signal);
      const metadata = await (await directory.getFileHandle(`${model.id}.json`, { create: true })).createWritable();
      await metadata.write(JSON.stringify({ url: model.url, bytes: file.size, savedAt: new Date().toISOString() }));
      await metadata.close();
      // A complete marker is written last. A crash cannot mark half a model ready.
      return file;
    } catch (error) {
      try { await reader?.cancel(); } catch (_) {}
      try { await writer?.abort(); } catch (_) {}
      await directory.removeEntry(`${model.id}.json`).catch(() => {});
      await directory.removeEntry(`${model.id}.gguf`).catch(() => {});
      if (error.name === "QuotaExceededError") throw new Error("Browser storage filled during download. Free space or use the Compact model.");
      if (error instanceof TypeError && !signal?.aborted) throw new Error("Could not reach the model download. Check the connection or download-blocking settings and retry.");
      if (signal?.aborted) throw abortError();
      throw error;
    } finally { try { reader?.releaseLock(); } catch (_) {} }
  }
  async clear() {
    const work = async () => {
      const root = await this.storage.getDirectory();
      await root.removeEntry(MODEL_DIRECTORY, { recursive: true }).catch((error) => { if (error.name !== "NotFoundError") throw error; });
    };
    return this.locks?.request ? this.locks.request(MODEL_DIRECTORY, work) : work();
  }
}
