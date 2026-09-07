(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.IMPROMPT_LOCAL_MODELS = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  return Object.freeze([
    Object.freeze({ id: "smollm2-360m-q8-v1", label: "Compact · SmolLM2 360M", sizeLabel: "about 386 MB",
      approximateBytes: 386000000, url: "https://huggingface.co/unsloth/SmolLM2-360M-Instruct-GGUF/resolve/7813ab8/SmolLM2-360M-Instruct-Q8_0.gguf",
      note: "Smaller download. Experimental; may give simpler or less consistent examples." }),
    Object.freeze({ id: "smollm2-1_7b-q4-v1", label: "Larger · SmolLM2 1.7B", sizeLabel: "about 1.06 GB",
      approximateBytes: 1060000000, url: "https://huggingface.co/unsloth/SmolLM2-1.7B-Instruct-GGUF/resolve/2285aee/SmolLM2-1.7B-Instruct-Q4_K_M.gguf",
      note: "More memory and computation. Not a guarantee of better hints; try on a capable device." })
  ]);
});
