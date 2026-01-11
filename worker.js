const cacheName = "planning-pocker";
const cacheDomains = [self.location.origin];

self.addEventListener("fetch", (event) => {
  if (!cacheDomains.includes(new URL(event.request.url).origin)) {
    return;
  }
  event.respondWith(
    (async () => {
      const result = await caches.match(event.request.url);
      return result || fetch(event.request.url);
    })(),
  );

  (async () => {
    const cache = await caches.open(cacheName);
    await cache.add(event.request.url);
  })();
});
