const CACHE_NAME = 'luzia-elysiun-v1';
const OFFLINE_URL = '/luzia-elysiun-site/offline.html';

const FILES_TO_CACHE = [
  '/luzia-elysiun-site/',
  '/luzia-elysiun-site/docs/index.html',
  '/luzia-elysiun-site/docs/css/estilo.css',
  '/luzia-elysiun-site/docs/js/luzia.js',
  '/luzia-elysiun-site/docs/assets/logo.png',
  '/luzia-elysiun-site/docs/offline.html'
];

self.addEventListener('install', (event) => {
  console.log('[Luzia] ⛺ Instalando service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Luzia] 📦 Arquivos em cache...');
     return cache.addAll(FILES_TO_CACHE);
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
