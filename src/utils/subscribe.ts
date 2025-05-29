import supabase from "./supabase";
import { urlBase64ToUint8Array } from "./urlBase";

export const subscribeUser = async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    const reg = await navigator.serviceWorker.register("/sw.js");
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        import.meta.env.VITE_VAPID_PUBLIC_KEY
      ),
    });

    const { endpoint } = subscription as PushSubscription;
    const { keys } = subscription.toJSON();

    const { error } = await supabase.from("subscriptions").upsert({
      user_id: "1",
      endpoint,
      auth: keys?.auth,
      p256dh: keys?.p256dh,
    });
    if (error) {
      console.error("Err");
    }
  }
};

export const unsubscribeUser = async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    const reg = await navigator.serviceWorker.ready;
    const subscription = await reg.pushManager.getSubscription();

    if (subscription) {
      const successful = await subscription.unsubscribe();
      if (successful) {
        console.log("User unsubscribed from push notifications.");

        // Optionally notify your backend to delete this subscription
        await fetch("/api/delete-subscription", {
          method: "POST",
          body: JSON.stringify({ endpoint: subscription.endpoint }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        console.warn("Unsubscription failed.");
      }
    } else {
      console.log("No active push subscription found.");
    }
  }
};
