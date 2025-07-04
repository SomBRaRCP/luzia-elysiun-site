self.addEventListener('install', function(event) {
    console.log('✨ Luzia SW instalado.');
});

self.addEventListener('fetch', function(event) {
    console.log('🔄 Interceptando requisição:', event.request.url);
});
