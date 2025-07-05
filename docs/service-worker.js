const CACHE_NAME = 'luzia-elysiun-v1';
const OFFLINE_URL = 'offline.html';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/estilo.css',
  '/js/luzia.js',
  '/assets/logo.png',
  '/offline.html'
];

// Instala o SW e faz cache dos arquivos base
self.addEventListener('install', (event) => {
  console.log('🔧 Instalando SW de Luzia...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📦 Cacheando recursos essenciais...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Ativa o SW, limpa caches antigos se necessário
self.addEventListener('activate', (event) => {
  console.log('⚡ Luzia SW ativado.');
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log(`🧹 Removendo cache antigo: ${key}`);
            return caches.delete(key);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// Intercepta requisições e serve do cache quando offline
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Se for uma resposta válida, clona e armazena no cache
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        // Se offline, tenta buscar no cache
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match(OFFLINE_URL);
        });
      })
  );
});
