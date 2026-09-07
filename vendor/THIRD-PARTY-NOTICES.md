# Third-Party Notices

## QR Code Generator core

The bundled QR matrix generator in `qrcode-core.js` is derived from Kazuhiko Arase's QR Code Generator for JavaScript.

MIT License

Copyright (c) 2009 Kazuhiko Arase

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Optional local inference dependencies (not bundled)

Imprompt v0.22.0 lazily loads Wllama 3.6.1 from jsDelivr only when local-model setup is requested. Wllama is MIT-licensed and incorporates upstream components with their own notices. Its binaries, package code and compatibility assets are not distributed in this archive. See https://github.com/ngxson/wllama for the authoritative license and upstream notices. A deployment that vendors the runtime must preserve those notices.

The configured SmolLM2 instruction models are Apache-2.0-licensed upstream models distributed here only as references to external GGUF downloads, not as bundled weights. Source cards: https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct and https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct. Quantized distribution references: https://huggingface.co/unsloth/SmolLM2-360M-Instruct-GGUF and https://huggingface.co/unsloth/SmolLM2-1.7B-Instruct-GGUF. Review and retain the relevant notices when redistributing weights.
