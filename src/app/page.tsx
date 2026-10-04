import Link from "next/link";
import { DayDetail } from "@/components/DayDetail";
import { ObserveList } from "@/components/ObserveList";
import { TithiDial } from "@/components/TithiDial";
import { previewReminder, reminderFields } from "@/lib/messages";
import { getRange, loadToday } from "@/lib/panchang";
import { withQuery } from "@/lib/query";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const { city } = await searchParams;
  const today = loadToday(city);
  const prefs = {
    cityName: today.city.name,
    cityNameGu: today.city.nameGu,
    festivals: true,
    fasting: true,
    shraddha: false,
    daily: false,
    language: "both" as const,
  };
  const nextNote = getRange(today.city.id, today.iso, 45)
    .map((day) => {
      const fields = reminderFields(day, prefs);
      return { day, text: fields ? previewReminder(fields) : null };
    })
    .find((item) => item.text);

  return (
    <div className="wrap page">
      <section className="hero">
        <TithiDial
          tithiIndex={today.live.tithiIndex}
          fraction={today.live.fraction}
          elongation={today.live.elongation}
          tithiGu={today.live.tithiGu}
          tithiEn={today.live.tithiEn}
          pakshaEn={today.live.pakshaEn}
          endsLabel={today.live.endsLabel}
        />
        <div className="hero-copy">
          <p className="eyebrow light">{today.city.name} · as of {today.asOfLabel}</p>
          <h1>
            <span className="gu" lang="gu">{today.day.gujaratiDate}</span>
            <span className="hero-greg">{today.day.weekdayEn}, {today.day.pretty}</span>
          </h1>
          <p className="lede">
            {today.day.englishLunar}. Sunrise {today.day.sunriseLabel}, sunset {today.day.sunsetLabel}.
          </p>
          {today.differsFromSunrise ? (
            <p className="note">
              Sunrise named this day {today.day.pakshaEn} {today.day.tithiEn}. {today.live.pakshaEn} {today.live.tithiEn} is running now, until {today.live.endsLabel}.
            </p>
          ) : (
            <p className="note">
              {today.live.nakshatraEn} until {today.day.nakshatraEndLabel}. Moon in {today.live.moonEn}, sun in {today.live.sunEn}.
            </p>
          )}
        </div>
      </section>

      <div className="split">
        <DayDetail day={today.day} />
        <section>
          <div className="section-head">
            <h2>Coming up</h2>
            <Link href={withQuery("/festivals", { city: today.city.id })}>All festivals and fasts</Link>
          </div>
          <ol className="coming">
            {today.upcoming.map((day) => (
              <li key={day.iso}>
                <Link href={withQuery("/calendar", { city: today.city.id, month: day.iso.slice(0, 7), date: day.iso })}>
                  <time dateTime={day.iso}>{day.weekdayEn}, {day.pretty}</time>
                  <span className="gu" lang="gu">{day.gujaratiDate}</span>
                </Link>
                <ObserveList items={day.observances} />
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="signup-band">
        <div className="phone">
          <p className="phone-bar">{nextNote ? `Next note · ${nextNote.day.pretty}` : "WhatsApp"}</p>
          <pre>{nextNote?.text ?? "No festival or fast in the next month and a half. A daily panchang note is still available."}</pre>
        </div>
        <div>
          <p className="eyebrow light">Reminders</p>
          <h2>The same note, on WhatsApp</h2>
          <p>
            The day page tells the story, the puja, the food, and what to skip. WhatsApp sends the short version around 7:00 where you live.
            The day itself follows sunrise in {today.city.name}.
          </p>
          <Link className="button" href={withQuery("/whatsapp", { city: today.city.id })}>Get reminders</Link>
        </div>
      </section>
    </div>
  );
}
