import { resolveCity } from "@/lib/cities";
import { confirmationFields, nextReminderDay, type Language } from "@/lib/messages";
import { normalizePhone } from "@/lib/phone";
import { reserveSignup, saveSubscriber } from "@/lib/subscribers";
import { isTimeZone } from "@/lib/timezones";
import { sendWhatsApp, twilioConfigured } from "@/lib/whatsapp";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!(await reserveSignup(ip))) {
    return Response.json({ error: "Too many signups from this connection. Try again in an hour." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "The form could not be read." }, { status: 400 });
  if (typeof body.company === "string" && body.company.trim()) {
    return Response.json({ ok: true, whatsapp: "saved" });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? normalizePhone(body.phone) : null;
  const city = resolveCity(typeof body.cityId === "string" ? body.cityId : undefined);
  const when = body.when === "evening" ? "evening" : "morning";
  const timezone = typeof body.timezone === "string" ? body.timezone : "";
  const language: Language = body.language === "en" || body.language === "gu" ? body.language : "both";
  const festivals = body.festivals === true;
  const fasting = body.fasting === true;
  const shraddha = body.shraddha === true;
  const daily = body.daily === true;

  if (name.length < 1 || name.length > 80) {
    return Response.json({ error: "Enter a name." }, { status: 400 });
  }
  if (!phone) {
    return Response.json({ error: "Start with + and the country code. A 10-digit number with no + is saved as India." }, { status: 400 });
  }
  if (!isTimeZone(timezone)) {
    return Response.json({ error: "Choose the timezone where you live." }, { status: 400 });
  }
  if (!festivals && !fasting && !shraddha && !daily) {
    return Response.json({ error: "Choose at least one kind of note." }, { status: 400 });
  }
  if (body.consent !== true) {
    return Response.json({ error: "Confirm that these notes can come to your WhatsApp." }, { status: 400 });
  }

  const choices = [
    festivals ? "festivals" : "",
    fasting ? "fasts and ekadashi" : "",
    shraddha ? "shraddha" : "",
    daily ? "a daily panchang" : "",
  ].filter(Boolean);
  const next = nextReminderDay(new Date(), timezone, when, city.id, {
    cityName: city.name,
    cityNameGu: city.nameGu,
    festivals,
    fasting,
    shraddha,
    daily,
    language,
  });

  await saveSubscriber({
    name,
    phone,
    cityId: city.id,
    festivals,
    fasting,
    shraddha,
    daily,
    when,
    timezone,
    language,
    consentAt: new Date().toISOString(),
  });

  const saved = {
    ok: true,
    choices,
    when,
    next: next ? `${next.weekdayEn}, ${next.pretty}` : null,
  };

  if (!twilioConfigured()) {
    return Response.json({ ...saved, whatsapp: "saved" });
  }

  try {
    await sendWhatsApp(phone, confirmationFields(name, city.name, city.nameGu, language));
    return Response.json({ ...saved, whatsapp: "queued" });
  } catch {
    return Response.json({ ...saved, whatsapp: "saved" });
  }
}
