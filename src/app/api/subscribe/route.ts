import { resolveCity } from "@/lib/cities";
import { confirmationMessage, type Language } from "@/lib/messages";
import { normalizePhone } from "@/lib/phone";
import { reserveSignup, saveSubscriber } from "@/lib/subscribers";
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
  const language: Language = body.language === "en" || body.language === "gu" ? body.language : "both";
  const festivals = body.festivals === true;
  const fasting = body.fasting === true;
  const shraddha = body.shraddha === true;
  const daily = body.daily === true;

  if (name.length < 1 || name.length > 80) {
    return Response.json({ error: "Enter a name." }, { status: 400 });
  }
  if (!phone) {
    return Response.json({ error: "Enter a mobile number, with the country code if it is not an Indian number." }, { status: 400 });
  }
  if (!festivals && !fasting && !shraddha && !daily) {
    return Response.json({ error: "Choose at least one kind of note." }, { status: 400 });
  }

  await saveSubscriber({
    name,
    phone,
    cityId: city.id,
    festivals,
    fasting,
    shraddha,
    daily,
    when,
    language,
  });

  if (!twilioConfigured()) {
    return Response.json({ ok: true, whatsapp: "saved" });
  }

  try {
    await sendWhatsApp(phone, confirmationMessage(name, city.name, city.nameGu, language));
    return Response.json({ ok: true, whatsapp: "sent" });
  } catch (error) {
    const warning = error instanceof Error ? error.message.slice(0, 180) : "WhatsApp could not be sent.";
    return Response.json({ ok: true, whatsapp: "saved", warning });
  }
}
