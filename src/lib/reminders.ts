import { istIso, addIsoDays } from "./astro";
import { resolveCity } from "./cities";
import { renderMessage } from "./messages";
import { getDay } from "./panchang";
import { listSubscribers } from "./subscribers";
import { sendWhatsApp, twilioConfigured } from "./whatsapp";

export async function sendSlot(slot: "morning" | "evening", now = new Date()) {
  const today = istIso(now);
  const targetIso = slot === "evening" ? addIsoDays(today, 1) : today;
  const subscribers = (await listSubscribers()).filter((item) => item.when === slot);
  if (!twilioConfigured()) {
    return { targetIso, matched: subscribers.length, sent: 0, skipped: subscribers.length, errors: 0, reason: "Twilio is not configured." };
  }

  let sent = 0;
  let skipped = 0;
  let errors = 0;
  for (const subscriber of subscribers) {
    const city = resolveCity(subscriber.cityId);
    const day = getDay(city.id, targetIso);
    if (!day) {
      skipped += 1;
      continue;
    }
    const body = renderMessage(day, {
      cityName: city.name,
      cityNameGu: city.nameGu,
      festivals: subscriber.festivals,
      fasting: subscriber.fasting,
      shraddha: subscriber.shraddha,
      daily: subscriber.daily,
      language: subscriber.language,
    });
    if (!body) {
      skipped += 1;
      continue;
    }
    try {
      await sendWhatsApp(subscriber.phone, body);
      sent += 1;
    } catch {
      errors += 1;
    }
  }
  return { targetIso, matched: subscribers.length, sent, skipped, errors };
}
