// 👇 VitePWA will inject this with build asset list
self.addEventListener("install", (event) => {
  console.log("Service worker installing...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activating...");
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener("push", (event) => {
  console.log("e", event);
  const data = event.data.json();
  console.log("event", data);
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: "/favicon.png",
  });
});

