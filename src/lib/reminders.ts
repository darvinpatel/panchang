import { dueDelivery } from "./clock";
import { resolveCity } from "./cities";
import { reminderFields } from "./messages";
import { getDay } from "./panchang";
import { clearPending, confirmSend, listSubscribers, markPending, rememberSend } from "./subscribers";
import { isTimeZone } from "./timezones";
import { messageStatus, sendWhatsApp, twilioConfigured } from "./whatsapp";

const fallbackZone = "Asia/Kolkata";

export async function sendDue(now = new Date()) {
  const subscribers = await listSubscribers();
  if (!twilioConfigured()) {
    return { matched: 0, sent: 0, skipped: subscribers.length, errors: 0, reason: "Twilio is not configured." };
  }

  let matched = 0;
  let sent = 0;
  let skipped = 0;
  let errors = 0;
  for (const subscriber of subscribers) {
    const zone = subscriber.timezone && isTimeZone(subscriber.timezone) ? subscriber.timezone : fallbackZone;
    const due = dueDelivery(now, zone, subscriber.when);
    if (!due) {
      skipped += 1;
      continue;
    }
    if (subscriber.pendingKey === due.key && subscriber.pendingSid) {
      const status = await messageStatus(subscriber.pendingSid).catch(() => "unknown");
      if (status === "delivered" || status === "read") {
        await confirmSend(subscriber.phone, due.key);
        skipped += 1;
        continue;
      }
      if (status === "failed" || status === "undelivered") {
        await clearPending(subscriber.phone, due.key);
      } else {
        skipped += 1;
        continue;
      }
    }
    if (subscriber.lastSent === due.key) {
      skipped += 1;
      continue;
    }
    matched += 1;
    const city = resolveCity(subscriber.cityId);
    const day = getDay(city.id, due.targetIso);
    if (!day) {
      skipped += 1;
      continue;
    }
    const fields = reminderFields(day, {
      cityName: city.name,
      cityNameGu: city.nameGu,
      festivals: subscriber.festivals,
      fasting: subscriber.fasting,
      shraddha: subscriber.shraddha,
      daily: subscriber.daily,
      language: subscriber.language,
    });
    if (!fields) {
      await rememberSend(subscriber.phone, due.key);
      skipped += 1;
      continue;
    }
    try {
      const delivery = await sendWhatsApp(subscriber.phone, fields);
      await markPending(subscriber.phone, due.key, delivery.sid);
      sent += 1;
    } catch {
      errors += 1;
    }
  }
  return { matched, sent, skipped, errors };
}
