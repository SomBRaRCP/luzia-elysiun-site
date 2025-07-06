// Simples: cache apenas os arquivos estáticos essenciais
const CACHE = "luzia-v1";
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./css/estilo.css",
        "./js/luzia.js",
        "./assets/logo.png"
      ])
    )
  );
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
