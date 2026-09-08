"use strict";
const CACHE_NAME = "imprompt-v0.25.0";
const BASE_URL = new URL("./", self.location.href);
const PRECACHE_PATHS = [
  "./",
  "./index.html",
  "./styles.css?v=0.25.0",
  "./card-bible.js?v=0.25.0",
  "./cards/core-foundations.js?v=0.25.0",
  "./cards/everyday-friction.js?v=0.25.0",
  "./cards/power-games.js?v=0.25.0",
  "./cards/relationship-knots.js?v=0.25.0",
  "./cards/emotional-pressure.js?v=0.25.0",
  "./cards/secrets-schemes.js?v=0.25.0",
  "./cards/absurd-commitment.js?v=0.25.0",
  "./cards/rules-rituals-institutions.js?v=0.25.0",
  "./cards/competition-consequences.js?v=0.25.0",
  "./cards/advanced-scene-engines.js?v=0.25.0",
  "./cards.js?v=0.25.0",
  "./hint-bible.js?v=0.25.0",
  "./exercises.js?v=0.25.0",
  "./deck-engine.js?v=0.25.0",
  "./vendor/qrcode-core.js?v=0.25.0",
  "./examples/manifest.js?v=0.25.0",
  "./examples/library-client.js?v=0.25.0",
  "./app.js?v=0.25.0",
  "./examples/library-worker.js?v=0.25.0",
  "./manifest.webmanifest?v=0.25.0",
  "./assets/improv-card-game-qr.png?v=0.25.0",
  "./icons/icon.svg?v=0.25.0",
  "./icons/icon-192.png?v=0.25.0",
  "./icons/icon-512.png?v=0.25.0",
  "./examples/data/singles.5cd8cc09c6fb.json.gz",
  "./examples/data/singles.5cd8cc09c6fb.json"
];
const PRECACHE_URLS = PRECACHE_PATHS.map(path=>new URL(path,BASE_URL).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(PRECACHE_URLS))));
// No forced activation: finish the existing scene before replacing its app shell.
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const names=await caches.keys();
  await Promise.all(names.filter(name=>name!==CACHE_NAME&&(/^(?:imprompt-v|two-secrets-)/.test(name))).map(name=>caches.delete(name)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(BASE_URL.pathname))return;
 // The worker verifies and owns the compressed library cache. Do not store two
 // copies or intercept its cache deletion. Singles are a tiny app-shell exception.
 if(url.pathname.includes('/examples/data/')&&!PRECACHE_URLS.includes(url.href))return;
 if(request.mode==='navigate'){
  // Only the application entry is an offline navigation fallback, not JSON/tools.
  if(![BASE_URL.pathname,new URL('./index.html',BASE_URL).pathname].includes(url.pathname))return;
  event.respondWith((async()=>{
   try{const response=await fetch(request);if(!response.ok)throw Error('Navigation failed');const cache=await caches.open(CACHE_NAME);await cache.put(new URL('./index.html',BASE_URL).href,response.clone());return response;}
   catch{return (await caches.open(CACHE_NAME)).match(new URL('./index.html',BASE_URL).href);}
  })());return;
 }
 if(!PRECACHE_URLS.includes(url.href))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE_NAME),hit=await cache.match(request);
  if(hit)return hit;const response=await fetch(request);if(response.ok)await cache.put(request,response.clone());return response;
 })());
});
