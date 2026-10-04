import { SignupForm } from "@/components/SignupForm";
import { RemoveForm } from "@/components/RemoveForm";
import { resolveCity } from "@/lib/cities";
import { renderMessage } from "@/lib/messages";
import { getRange, loadToday } from "@/lib/panchang";
import { storeConfigured } from "@/lib/db";
import { twilioConfigured } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata = { title: "WhatsApp reminders" };

export default async function WhatsAppPage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const { city: cityId } = await searchParams;
  const city = resolveCity(cityId);
  const today = loadToday(city.id);
  const prefs = {
    cityName: city.name,
    cityNameGu: city.nameGu,
    festivals: true,
    fasting: true,
    shraddha: false,
    daily: false,
    language: "both" as const,
  };
  const nextNote = getRange(city.id, today.iso, 45)
    .map((day) => ({ day, text: renderMessage(day, prefs) }))
    .find((item) => item.text);
  const ready = twilioConfigured();

  return (
    <div className="wrap page">
      <p className="eyebrow">WhatsApp</p>
      <h1>Notes for the days that matter</h1>
      <p className="lede narrow">
        Patro texts the sunrise panchang for {city.name}. Festivals and fasts go out only on the day they fall.
        A daily note is optional.
      </p>
      <div className="split align-start">
        <div className="phone">
          <p className="phone-bar">{nextNote ? `Next note · ${nextNote.day.pretty}` : "Next note"}</p>
          <pre>{nextNote?.text ?? "No festival or fast in the next month and a half. Turn on the daily panchang if you want a note anyway."}</pre>
        </div>
        <SignupForm key={city.id} cityId={city.id} />
      </div>
      <section className="panel">
        <h2>How sending works</h2>
        <ol className="steps">
          <li>You save a WhatsApp number and the Gujarat city whose sunrise should name the day.</li>
          <li>Each morning at 7:00, or the evening before, Patro checks that city’s tithi.</li>
          <li>You get a note only when the day matches what you asked for.</li>
        </ol>
        <p className={ready ? "form-ok" : "quiet"}>
          {ready ? "WhatsApp sending is connected on this server." : "WhatsApp sending is not connected yet. Numbers are still saved."}
        </p>
        <details>
          <summary>Connect Twilio</summary>
          <ol className="steps">
            <li>Create a Twilio account and open the WhatsApp sandbox, or add a WhatsApp sender.</li>
            <li>In <code>.env.local</code>, set <code>TWILIO_ACCOUNT_SID</code>, <code>TWILIO_AUTH_TOKEN</code>, and <code>TWILIO_WHATSAPP_FROM</code>.</li>
            <li>Set <code>CRON_SECRET</code>. Call <code>/api/reminders?slot=morning</code> and <code>slot=evening</code> with <code>Authorization: Bearer</code> that secret.</li>
          </ol>
          <p className="quiet">
            {storeConfigured()
              ? "Numbers are saved in private storage on this host, so the morning and evening jobs can still find them after a restart."
              : "This server is still using a local file. Connect a Vercel Blob store so signups survive a hosted deploy."}
          </p>
        </details>
      </section>
      <section className="panel">
        <h2>Stop messages</h2>
        <RemoveForm />
      </section>
    </div>
  );
}
