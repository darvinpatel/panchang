import Link from "next/link";
import { DayDetail } from "@/components/DayDetail";
import { WEEKDAYS, guDigits } from "@/lib/names";
import { istIso } from "@/lib/astro";
import { getMonth, monthLabel, type PanchangDay } from "@/lib/panchang";
import { resolveCity } from "@/lib/cities";
import { withQuery } from "@/lib/query";

export const dynamic = "force-dynamic";

export const metadata = { title: "Month" };

function shiftMonth(year: number, month: number, delta: number) {
  const date = new Date(Date.UTC(year, month - 1 + delta, 1));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 };
}

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; month?: string; date?: string }>;
}) {
  const { city: cityId, month: monthParam, date } = await searchParams;
  const city = resolveCity(cityId);
  const todayIso = istIso(new Date());
  const fallback = todayIso.slice(0, 7);
  const requested = /^\d{4}-\d{2}$/.test(monthParam ?? "") ? monthParam! : fallback;
  const year = Number(requested.slice(0, 4));
  const month = Number(requested.slice(5, 7));
  const days = getMonth(city.id, year, month);
  const prev = shiftMonth(year, month, -1);
  const next = shiftMonth(year, month, 1);
  const lead = days[0]?.weekday ?? 0;
  const selected = days.find((day) => day.iso === date) ?? days.find((day) => day.iso === todayIso) ?? null;

  return (
    <div className="wrap page">
      <div className="section-head">
        <div>
          <p className="eyebrow">{city.name}</p>
          <h1>{monthLabel(year, month)}</h1>
        </div>
        <div className="pager">
          <Link href={withQuery("/calendar", { city: city.id, month: `${prev.year}-${String(prev.month).padStart(2, "0")}` })}>Previous</Link>
          <Link href={withQuery("/calendar", { city: city.id, month: todayIso.slice(0, 7), date: todayIso })}>This month</Link>
          <Link href={withQuery("/calendar", { city: city.id, month: `${next.year}-${String(next.month).padStart(2, "0")}` })}>Next</Link>
        </div>
      </div>

      <div className="month-scroll">
        <table className="month">
          <caption className="sr">{monthLabel(year, month)} in {city.name}</caption>
          <thead>
            <tr>
              {WEEKDAYS.map((day) => (
                <th key={day.en} scope="col">{day.short}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chunk(lead, days).map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) =>
                  day ? (
                    <td key={day.iso} data-today={day.iso === todayIso ? "" : undefined} data-selected={selected?.iso === day.iso ? "" : undefined}>
                      <Link href={withQuery("/calendar", { city: city.id, month: requested, date: day.iso })}>
                        <span className="greg">{Number(day.iso.slice(8))}</span>
                        <span className="gu cell-tithi" lang="gu">
                          {day.pakshaGu} {day.tithi === 15 ? day.tithiGu : guDigits(day.tithi)}
                        </span>
                        {day.observances.length > 0 ? (
                          <span className="dots" aria-label={day.observances.map((item) => item.name).join(", ")}>
                            {day.observances.some((item) => item.kind === "festival" || item.alsoFestival) ? <i className="dot festival" /> : null}
                            {day.observances.some((item) => item.kind === "fast" || item.alsoFast) ? <i className="dot fast" /> : null}
                            {day.observances.some((item) => item.kind === "shraddha") ? <i className="dot shraddha" /> : null}
                          </span>
                        ) : null}
                      </Link>
                    </td>
                  ) : (
                    <td key={`empty-${weekIndex}-${dayIndex}`} className="empty" />
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="legend">
        <i className="dot festival" /> Festival
        <i className="dot fast" /> Fast
        <i className="dot shraddha" /> Shraddha
      </p>
      {selected ? <DayDetail day={selected} heading={selected.iso === todayIso ? "Today" : selected.weekdayEn} /> : null}
    </div>
  );
}

function chunk(lead: number, days: PanchangDay[]): (PanchangDay | null)[][] {
  const cells: (PanchangDay | null)[] = [...Array.from({ length: lead }, () => null), ...days];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (PanchangDay | null)[][] = [];
  for (let index = 0; index < cells.length; index += 7) weeks.push(cells.slice(index, index + 7));
  return weeks;
}
