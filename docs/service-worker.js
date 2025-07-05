const CACHE_NAME = 'luzia-elysiun-v2';

const FILES_TO_CACHE = [
  '/luzia-elysiun-site/',
  '/luzia-elysiun-site/index.html',
  '/luzia-elysiun-site/css/estilo.css',
  '/luzia-elysiun-site/js/luzia.js',
  '/luzia-elysiun-site/assets/logo.png'
  // remova '/luzia-elysiun-site/offline.html' se ele não existe
];

self.addEventListener('install', (event) => {
  console.log('🔧 Instalando SW de Luzia...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📦 Cacheando recursos essenciais...');
      return cache.addAll(FILES_TO_CACHE);
    }).catch((err) => {
      console.error('⚠️ Falha ao cachear arquivos:', err);
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
