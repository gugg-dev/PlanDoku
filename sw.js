// PlanDoku Service Worker – Offline-Betrieb
const VERSION = 'plandoku-v1.1.0';
const ASSETS = [
  './', './index.html', './manifest.json',
  './icon-180.png', './icon-192.png', './icon-512.png',
  './lib/pdf.min.js', './lib/pdf.worker.min.js', './lib/jspdf.umd.min.js', './lib/jszip.min.js', './lib/msal-browser.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || req.url.endsWith('.html') || req.url.endsWith('/');
  if (isPage) {
    // Netzwerk zuerst (Updates), sonst Cache (offline)
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
  } else {
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
  }
});
