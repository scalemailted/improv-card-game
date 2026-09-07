/* Optional inference configuration. Never derive model URLs from exercise invitations. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.IMPROMPT_AI_CONFIG = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const runtimeBase = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/dist/";
  const modelId = "Xenova/flan-t5-small";
  const revision = "311454e83bc784267fd7eef5940ee854144abbec";
  const modelBase = `https://huggingface.co/${modelId}/resolve/${revision}/`;
  const files = [
    ["runtime", `${runtimeBase}transformers.min.js`],
    ["factory", `${runtimeBase}ort-wasm-simd-threaded.jsep.mjs`],
    ["wasm", `${runtimeBase}ort-wasm-simd-threaded.jsep.wasm`],
    ...["config.json", "tokenizer.json", "tokenizer_config.json", "generation_config.json", "special_tokens_map.json",
      "onnx/encoder_model_quantized.onnx", "onnx/decoder_model_merged_quantized.onnx"]
      .map(name => [name, modelBase + name])
  ].map(([id, url]) => Object.freeze({ id, url }));
  return Object.freeze({
    appVersion: "0.22.0", promptVersion: "1.0.0", modelId, revision,
    modelLabel: "FLAN-T5-small · 8-bit", task: "text2text-generation", dtype: "q8", device: "wasm",
    // Deliberately outside the older service workers' imprompt-* cache prefix.
    cacheName: "impc-local-ai-flan-small-q8-v1", settingsKey: "imprompt:local-ai:v1",
    runtimeBase, modelBase, files: Object.freeze(files),
    approximateDownloadMB: 120, loadTimeoutMs: 90000, installTimeoutMs: 600000,
    generationTimeoutMs: 25000, idleUnloadMs: 180000,
    sampling: Object.freeze({ do_sample: true, temperature: 0.72, top_p: 0.90, top_k: 40,
      repetition_penalty: 1.15, no_repeat_ngram_size: 3, max_new_tokens: 80, num_beams: 1 })
  });
});
