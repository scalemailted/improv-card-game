"use strict";

const CACHE_NAME = "imprompt-v0.22.0";
const RUNTIME_CACHE = "imprompt-llm-runtime-3.6.1";
const OWNED_CACHE_PREFIXES = ["imprompt-", "two-secrets-"];
const BASE_URL = new URL("./", self.location.href);
const PRECACHE_PATHS = [
  "./",
  "./index.html",
  "./styles.css?v=0.22.0",
  "./card-bible.js?v=0.22.0",
  "./cards/core-foundations.js?v=0.22.0",
  "./cards/everyday-friction.js?v=0.22.0",
  "./cards/power-games.js?v=0.22.0",
  "./cards/relationship-knots.js?v=0.22.0",
  "./cards/emotional-pressure.js?v=0.22.0",
  "./cards/secrets-schemes.js?v=0.22.0",
  "./cards/absurd-commitment.js?v=0.22.0",
  "./cards/rules-rituals-institutions.js?v=0.22.0",
  "./cards/competition-consequences.js?v=0.22.0",
  "./cards/advanced-scene-engines.js?v=0.22.0",
  "./cards.js?v=0.22.0",
  "./hint-bible.js?v=0.22.0",
  "./hints/card-hints.js?v=0.22.0",
  "./hints/fusion-profiles.js?v=0.22.0",
  "./hints/concrete-fusion.js?v=0.22.0",
  "./hint-engine.js?v=0.22.0",
  "./hints/quick-hints.js?v=0.22.0",
  "./hints/local-models.js?v=0.22.0",
  "./hints/local-hint-core.js?v=0.22.0",
  "./hints/local-hints.js?v=0.22.0",
  "./hints/wllama-adapter.mjs?v=0.22.0",
  "./hints/model-store.mjs",
  "./hints/runtime-config.mjs",
  "./exercises.js?v=0.22.0",
  "./deck-engine.js?v=0.22.0",
  "./vendor/qrcode-core.js?v=0.22.0",
  "./app.js?v=0.22.0",
  "./manifest.webmanifest?v=0.22.0",
  "./assets/improv-card-game-qr.png?v=0.22.0",
  "./icons/icon.svg?v=0.22.0",
  "./icons/icon-192.png?v=0.22.0",
  "./icons/icon-512.png?v=0.22.0"
];
const PRECACHE_URLS = PRECACHE_PATHS.map((path) => new URL(path, BASE_URL).href);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE && OWNED_CACHE_PREFIXES.some((prefix) => name.startsWith(prefix)))
          .map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  // Only opt-in inference requests can reach these version-pinned CDN paths.
  // Cache them separately; never precache them or cache large GGUF model files.
  const runtimePath = decodeURIComponent(url.pathname);
  const isRuntime = url.hostname === "cdn.jsdelivr.net" && [
    "/npm/@wllama/wllama@3.6.1/", "/npm/@wllama/wllama-compat@3.6.1/"
  ].some((prefix) => runtimePath.startsWith(prefix));
  if (isRuntime) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok && response.type !== "opaque") {
        const copy = response.clone();
        event.waitUntil(cache.put(request, copy).catch(() => {}));
      }
      return response;
    })());
    return;
  }
  if (url.origin !== self.location.origin || /\.gguf$/i.test(url.pathname)) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(new URL("./index.html", BASE_URL).href, copy));
          }
          return response;
        })
        .catch(() => caches.match(new URL("./index.html", BASE_URL).href))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
