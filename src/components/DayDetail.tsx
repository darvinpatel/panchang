import type { PanchangDay } from "@/lib/panchang";
import { ObserveList } from "./ObserveList";

export function DayDetail({ day, heading = "Today's panchang" }: { day: PanchangDay; heading?: string }) {
  return (
    <section className="day-detail">
      <p className="eyebrow">{heading}</p>
      <h2>
        <span className="gu" lang="gu">{day.weekdayGu}</span>
        <span>{day.pretty}</span>
      </h2>
      <p className="lunar-line">
        <span className="gu" lang="gu">{day.gujaratiDate}</span>
        <span>{day.englishLunar}</span>
      </p>
      <dl className="facts">
        <div><dt>Sunrise</dt><dd>{day.sunriseLabel}</dd></div>
        <div><dt>Sunset</dt><dd>{day.sunsetLabel}</dd></div>
        <div><dt>Tithi ends</dt><dd>{day.tithiEndLabel}</dd></div>
        <div><dt>Nakshatra</dt><dd>{day.nakshatraEn} · pada {day.pada}<small className="gu" lang="gu">{day.nakshatraGu} until {day.nakshatraEndLabel}</small></dd></div>
        <div><dt>Yoga</dt><dd>{day.yogaEn}<small className="gu" lang="gu">{day.yogaGu} until {day.yogaEndLabel}</small></dd></div>
        <div><dt>Karana</dt><dd>{day.karanaEn}<small className="gu" lang="gu">{day.karanaGu} until {day.karanaEndLabel}</small></dd></div>
        <div><dt>Moon</dt><dd>{day.moonEn}<small className="gu" lang="gu">{day.moonGu}</small></dd></div>
        <div><dt>Sun</dt><dd>{day.sunEn}<small className="gu" lang="gu">{day.sunGu}</small></dd></div>
        <div><dt>Rahu Kalam</dt><dd>{day.rahuLabel}</dd></div>
        <div><dt>Shaka</dt><dd>{day.shaka}</dd></div>
        <div><dt>Vikram</dt><dd>{day.vikram}</dd></div>
        <div><dt>Gujarati samvat</dt><dd>{day.gujaratiSamvat}</dd></div>
      </dl>
      <ObserveList items={day.observances} />
    </section>
  );
}
