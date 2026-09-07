# Optional AI dependencies

No third-party model, WASM binary, or Transformers.js bundle is redistributed in
this ZIP. The app requests these only after the user authorizes installation.

- FLAN-T5-small ONNX conversion: Xenova/flan-t5-small, Apache-2.0 model listing.
  Original model: google/flan-t5-small. See model cards and repository licenses.
- Transformers.js 3.8.1: Apache-2.0, huggingface/transformers.js.
- ONNX Runtime Web matching that distribution: MIT, microsoft/onnxruntime.
- The existing bundled QR generator keeps its original attribution in vendor/.

Pinned model revision and exact runtime URLs are in ai/config.js. Its source
manifests should be rechecked before replacing dependencies. The downloaded
bundles retain their embedded license notices. Existing Imprompt project source
is not automatically relicensed by these third-party terms.

https://huggingface.co/Xenova/flan-t5-small
https://huggingface.co/google/flan-t5-small
https://github.com/huggingface/transformers.js/blob/3.8.1/LICENSE
https://github.com/microsoft/onnxruntime/blob/main/LICENSE
