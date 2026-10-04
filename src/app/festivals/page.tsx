import Link from "next/link";
import { ObserveList } from "@/components/ObserveList";
import { resolveCity } from "@/lib/cities";
import { istIso } from "@/lib/astro";
import { matchesKind, type ObservanceKind } from "@/lib/observances";
import { listByKind } from "@/lib/panchang";
import { withQuery } from "@/lib/query";

export const dynamic = "force-dynamic";

export const metadata = { title: "Festivals and fasts" };

const FILTERS: { id: "all" | ObservanceKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "festival", label: "Festivals" },
  { id: "fast", label: "Fasts" },
  { id: "shraddha", label: "Shraddha" },
];

export default async function FestivalsPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; kind?: string }>;
}) {
  const { city: cityId, kind: kindParam } = await searchParams;
  const city = resolveCity(cityId);
  const kind = FILTERS.some((item) => item.id === kindParam) ? (kindParam as "all" | ObservanceKind) : "all";
  const today = istIso(new Date());
  const days = listByKind(city.id, today, kind);

  return (
    <div className="wrap page">
      <p className="eyebrow">{city.name}</p>
      <h1>Festivals and fasts</h1>
      <p className="lede narrow">
        The next hundred days, named by the tithi at sunrise. Navratri, Diwali, Uttarayan, ekadashi, and the monthly vrats are included.
      </p>
      <div className="filters" role="tablist" aria-label="Filter observances">
        {FILTERS.map((filter) => (
          <Link
            key={filter.id}
            href={withQuery("/festivals", { city: city.id, kind: filter.id === "all" ? undefined : filter.id })}
            aria-current={kind === filter.id ? "page" : undefined}
          >
            {filter.label}
          </Link>
        ))}
      </div>
      {days.length === 0 ? (
        <p className="quiet">Nothing in this list for the next hundred days.</p>
      ) : (
        <ol className="coming">
          {days.map((day) => (
            <li key={day.iso}>
              <Link href={withQuery("/calendar", { city: city.id, month: day.iso.slice(0, 7), date: day.iso })}>
                <time dateTime={day.iso}>{day.weekdayEn}, {day.pretty}</time>
                <span className="gu" lang="gu">{day.gujaratiDate}</span>
              </Link>
              <ObserveList items={day.observances.filter((item) => matchesKind(item, kind))} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
