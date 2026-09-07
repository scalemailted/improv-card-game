#!/usr/bin/env node
"use strict";
// Development server only. No package install or build step is needed.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 8080);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be between 1 and 65535.");
const isolated = process.argv.includes("--isolated");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".webmanifest": "application/manifest+json", ".wasm": "application/wasm", ".gguf": "application/octet-stream", ".png": "image/png", ".svg": "image/svg+xml", ".md": "text/plain; charset=utf-8" };
const server = http.createServer(async (req, res) => {
  try {
    if (!["GET", "HEAD"].includes(req.method)) { res.writeHead(405, { Allow: "GET, HEAD" }); res.end(); return; }
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let file = path.resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    let stat = await fs.promises.stat(file);
    if (stat.isDirectory()) { file = path.join(file, "index.html"); stat = await fs.promises.stat(file); }
    const headers = { "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream", "Content-Length": stat.size, "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff" };
    if (isolated) { headers["Cross-Origin-Opener-Policy"] = "same-origin"; headers["Cross-Origin-Embedder-Policy"] = "require-corp"; }
    res.writeHead(200, headers);
    if (req.method === "HEAD") res.end();
    else fs.createReadStream(file).on("error", () => res.destroy()).pipe(res);
  } catch (error) {
    res.writeHead(error.code === "ENOENT" || error.code === "ENOTDIR" ? 404 : 400);
    res.end("The requested file could not be served.");
  }
});
server.on("error", (error) => { console.error(error.message); process.exitCode = 1; });
server.listen(port, "127.0.0.1", () => console.log(`Imprompt: http://localhost:${port}/${isolated ? " (cross-origin isolation enabled)" : ""}`));
