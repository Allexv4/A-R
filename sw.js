const CACHE_NAME = 'ar-wrapped-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './Image/perfil/perfil_alex.jpg',
    './Image/perfil/perfil_rai.jpg',
    './Image/cat_flower.jpg',
    './Image/snoopy_flower.jpg',
    './Image/snoopy.jpg',
    './Image/coracao.jpg',
    './Image/gato.jpg',
    './Image/ararinha.jpg',
    './Image/boanoite.jpg',
    './Image/beijo.jpg',
    './Image/background/Aesthetic Wallpaper.jpg',
    './Image/background/download (51).jpg',
    './Image/background/download (52).jpg',
    './Image/background/download (53).jpg',
    './Image/background/download (54).jpg',
    './Image/background/wallpaper.jpg'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys =>
        Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ));
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
