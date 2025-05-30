import "dotenv/config";
import webpush from "web-push";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY
);

webpush.setVapidDetails(
  "mailto:you@example.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

console.log("🔄 Listening to notifications_queue...");
// Subscription object received from client

supabase
  .channel("notifications-channel")
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "notifications_queue",
    },
    async (payload) => {
      console.log("📬 New row:", payload.new);

      const subscription = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", payload.new.user_id);

      const subscriptions = {
        endpoint: subscription.data[0].endpoint,
        keys: {
          auth: subscription.data[0].auth,
          p256dh: subscription.data[0].p256dh,
        },
      };
      const notificationPayload = {
        title: "New Like",
        message: payload.new?.message,
        userId: payload.new?.user_id,
      };

      for (const s of subscription.data) {
        const subscriptions = {
          endpoint: s.endpoint,
          keys: {
            auth: s.auth,
            p256dh: s.p256dh,
          },
        };

        await webpush.sendNotification(
          subscriptions,
          JSON.stringify(notificationPayload)
        );
      }
    }
  )
  .subscribe();
