import { SignupForm } from "@/components/SignupForm";
import { RemoveForm } from "@/components/RemoveForm";
import { resolveCity } from "@/lib/cities";
import { previewReminder, reminderFields } from "@/lib/messages";
import { getRange, loadToday } from "@/lib/panchang";

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
    .map((day) => {
      const fields = reminderFields(day, prefs);
      return { day, text: fields ? previewReminder(fields) : null };
    })
    .find((item) => item.text);

  return (
    <div className="wrap page">
      <p className="eyebrow">WhatsApp</p>
      <h1>Notes for the days that matter</h1>
      <p className="lede narrow">
        A short note for the festivals and fasts you choose, around 7:00 where you live. The day inside it follows sunrise in {city.name}.
      </p>
      <div className="split align-start">
        <div className="phone">
          <p className="phone-bar">{nextNote ? `Next note · ${nextNote.day.pretty}` : "Next note"}</p>
          <pre>{nextNote?.text ?? "No festival or fast in the next month and a half. Turn on the daily panchang if you want a note anyway."}</pre>
        </div>
        <SignupForm key={city.id} cityId={city.id} />
      </div>
      <details className="quiet-stop">
        <summary>Stop these notes</summary>
        <RemoveForm />
      </details>
    </div>
  );
}
