// Versão do cache (mude esse nome quando atualizar arquivos)
const CACHE_NAME = "inventario-v3";

const URLS_TO_CACHE = [
  "./",
  "home.html",
  "index.html",
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
  "splash-2732x2732.png"
];

// Instalação: guarda arquivos no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Ativação: remove caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: responde com cache ou rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Se tiver no cache, usa; senão, busca na rede
      return response || fetch(event.request);
    })
  );
});
