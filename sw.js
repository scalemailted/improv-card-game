"use strict";

const CACHE_NAME = "imprompt-v0.17.0";
const OWNED_CACHE_PREFIXES = ["imprompt-", "two-secrets-"];
const BASE_URL = new URL("./", self.location.href);
const PRECACHE_PATHS = [
  "./",
  "./index.html",
  "./styles.css?v=0.17.0",
  "./card-bible.js?v=0.17.0",
  "./cards/core-foundations.js?v=0.17.0",
  "./cards/everyday-friction.js?v=0.17.0",
  "./cards/power-games.js?v=0.17.0",
  "./cards/relationship-knots.js?v=0.17.0",
  "./cards/emotional-pressure.js?v=0.17.0",
  "./cards/secrets-schemes.js?v=0.17.0",
  "./cards/absurd-commitment.js?v=0.17.0",
  "./cards/rules-rituals-institutions.js?v=0.17.0",
  "./cards/competition-consequences.js?v=0.17.0",
  "./cards/advanced-scene-engines.js?v=0.17.0",
  "./cards.js?v=0.17.0",
  "./exercises.js?v=0.17.0",
  "./deck-engine.js?v=0.17.0",
  "./vendor/qrcode-core.js?v=0.17.0",
  "./app.js?v=0.17.0",
  "./manifest.webmanifest?v=0.17.0",
  "./assets/improv-card-game-qr.png?v=0.17.0",
  "./icons/icon.svg?v=0.17.0",
  "./icons/icon-192.png?v=0.17.0",
  "./icons/icon-512.png?v=0.17.0"
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
          .filter((name) => name !== CACHE_NAME && OWNED_CACHE_PREFIXES.some((prefix) => name.startsWith(prefix)))
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
  if (url.origin !== self.location.origin) {
    return;
  }

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
