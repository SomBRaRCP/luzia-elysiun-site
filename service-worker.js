const CACHE_NAME = 'luzia-elysiun-v2';
const OFFLINE_URL = '/luzia-elysiun-site/offline.html';

const FILES_TO_CACHE = [
  '/luzia-elysiun-site/',
  '/luzia-elysiun-site/docs/index.html',
  '/luzia-elysiun-site/docs/css/estilo.css',
  '/luzia-elysiun-site/docs/js/luzia.js',
  '/luzia-elysiun-site/docs/assets/logo.png',
  '/luzia-elysiun-site/docs/offline.html',
  '/luzia-elysiun-site/docs/manifest.json'
];

self.addEventListener('install', (event) => {
  console.log('[Luzia] ✨ Instalando Service Worker...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Luzia] 📦 Pré-cache dos arquivos essenciais...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Luzia] 🔄 Ativando novo Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((key) => {
          if (key !== CACHE_NAME) {
            console.log(`[Luzia] 💨 Removendo cache antigo: ${key}`);
            return caches.delete(key);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Atende requisições para o ngrok com stale-while-revalidate
  if (request.url.includes('ngrok-free.app') && request.method === 'POST') {
    event.respondWith(
      fetch(request).catch(() => new Response(JSON.stringify({ resposta: '🌐 Sem conexão com Luzia.Local.' }), {
        headers: { 'Content-Type': 'application/json' }
      }))
    );
    return;
  }

  // Cache-first com fallback offline
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request).catch(() => {
        if (request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});
