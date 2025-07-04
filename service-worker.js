const CACHE_NAME = 'luzia-elysiun-v1';
const URLS_TO_CACHE = [
  '/index.html',
  '/css/estilo.css',
  '/js/luzia.js',
  '/assets/logo.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  console.log('[Luzia] ⛺ Instalando service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Luzia] 📦 Arquivos em cache...');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Luzia] 🔄 Service worker ativado!');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Luzia] 💨 Limpando cache antigo:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  console.log('[Luzia] 🔍 Buscando:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
