
self.addEventListener('push', (event) => {
  console.log('e', event)
  const data = event.data.json();
  console.log('event', data)
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: '/favicon.png',
  });
});
