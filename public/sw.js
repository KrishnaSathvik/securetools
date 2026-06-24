// Service Worker for SecureTools
const CACHE_NAME = 'securetools-v2';
const urlsToCache = [
  '/',
  '/password-generator',
  '/text-encryptor',
  '/security-headers-checker',
  '/two-factor-auth',
  '/random-data-generator',
  '/password-strength-analyzer',
  '/about',
  '/privacy',
  '/terms',
  '/faq',
  '/blog',
  '/comparisons',
  '/offline.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)).catch(() => undefined)
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/offline.html');
        }
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      )
    )
  );
});
