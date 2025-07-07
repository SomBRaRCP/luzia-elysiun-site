self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('luzia-v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './css/estilo.css',
        './js/luzia.js',
        './assets/logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
