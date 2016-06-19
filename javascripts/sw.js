var cacheName = 'demo-3';
var filesToCache = [
  '/javascripts/app.js',
  '/stylesheets/main.css',
  '/stylesheets/bootstrap.min.css',
  '/data.json',
  '/images/zalia-0031-329564-1.jpg',
  '/images/zalia-2758-849564-1.jpg'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        console.log('Cache Hit');
        return response;
      }
      console.log('Cache Missed');
      return fetch(e.request);
    })
  );
});
