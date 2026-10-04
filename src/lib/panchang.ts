import type { City } from "./cities";
import { resolveCity } from "./cities";
import {
  addIsoDays,
  crossedBoundaries,
  elongation,
  findNextElongation,
  findNextMoon,
  findNextSun,
  findNextYoga,
  firstSunriseOnOrAfter,
  formatAsOf,
  formatIstTime,
  formatIstTimeOn,
  istIso,
  moonSidereal,
  observerFor,
  sunSidereal,
  sunriseOn,
  sunsetAfter,
  weekdayOfIso,
} from "./astro";
import {
  GREGORIAN_MONTHS,
  MONTHS,
  NAKSHATRAS,
  RAHU_SEGMENT,
  RASHIS,
  SAMVATSARA,
  WEEKDAYS,
  YOGAS,
  karanaAt,
  rashiIndex,
  tithiName,
  wrap360,
} from "./names";
import {
  amavasyaFast,
  annakut,
  bestuVaras,
  dhuleti,
  diwali,
  observancesFor,
  purnimaObservance,
  uttarayan,
  type Observance,
  type ObservanceKind,
} from "./observances";

export type { Observance, ObservanceKind };

export type PanchangDay = {
  iso: string;
  weekday: number;
  weekdayEn: string;
  weekdayGu: string;
  sunriseLabel: string;
  sunsetLabel: string;
  sunsetTithiIndex: number;
  rahuLabel: string;
  tithiIndex: number;
  tithi: number;
  tithiEn: string;
  tithiGu: string;
  paksha: "shukla" | "krishna";
  pakshaEn: string;
  pakshaGu: string;
  tithiEndLabel: string;
  nakshatraEn: string;
  nakshatraGu: string;
  pada: number;
  nakshatraEndLabel: string;
  yogaEn: string;
  yogaGu: string;
  yogaEndLabel: string;
  karanaEn: string;
  karanaGu: string;
  karanaEndLabel: string;
  monthIndex: number;
  monthEn: string;
  monthGu: string;
  adhik: boolean;
  gujaratiDate: string;
  englishLunar: string;
  moonEn: string;
  moonGu: string;
  sunEn: string;
  sunGu: string;
  shaka: string;
  vikram: string;
  gujaratiSamvat: string;
  pretty: string;
  observances: Observance[];
};

export type LiveSky = {
  tithiIndex: number;
  fraction: number;
  elongation: number;
  tithiEn: string;
  tithiGu: string;
  pakshaEn: string;
  pakshaGu: string;
  endsLabel: string;
  nakshatraEn: string;
  nakshatraGu: string;
  pada: number;
  yogaEn: string;
  yogaGu: string;
  karanaEn: string;
  karanaGu: string;
  moonEn: string;
  moonGu: string;
  sunEn: string;
  sunGu: string;
};

export type TodayPayload = {
  city: City;
  asOfLabel: string;
  iso: string;
  live: LiveSky;
  day: PanchangDay;
  differsFromSunrise: boolean;
  upcoming: PanchangDay[];
};

type Span = {
  start: Date;
  end: Date;
  monthIndex: number;
  adhik: boolean;
};

const SPAN_FROM = new Date("2023-11-01T00:00:00Z");
const SPAN_TO = new Date("2028-06-01T00:00:00Z");

let spans: Span[] | null = null;
const monthCache = new Map<string, PanchangDay[]>();
const monthStartCache = new Map<string, { date: Date; iso: string }>();
let uttarayanIsos: Set<string> | null = null;

function previousAmavasya(before: Date): Date {
  let cursor = new Date(before.getTime() - 32 * 86400000);
  let previous: Date | null = null;
  while (cursor < before) {
    const next = findNextElongation(cursor, 0);
    if (next >= before) break;
    previous = next;
    cursor = new Date(next.getTime() + 20 * 86400000);
  }
  if (!previous) throw new Error("Could not find the new moon before this range.");
  return previous;
}

function getSpans(): Span[] {
  if (spans) return spans;
  const moments = [previousAmavasya(SPAN_FROM)];
  let cursor = new Date(moments[0].getTime() + 20 * 86400000);
  while (cursor < SPAN_TO) {
    const next = findNextElongation(cursor, 0);
    const last = moments[moments.length - 1];
    if (next.getTime() <= last.getTime() + 10 * 86400000) {
      cursor = new Date(cursor.getTime() + 5 * 86400000);
      continue;
    }
    moments.push(next);
    if (next > SPAN_TO) break;
    cursor = new Date(next.getTime() + 20 * 86400000);
  }

  const built: Span[] = [];
  for (let index = 0; index < moments.length - 1; index += 1) {
    const start = moments[index];
    const end = moments[index + 1];
    const lonStart = sunSidereal(new Date(start.getTime() + 60 * 60 * 1000));
    const lonEnd = sunSidereal(new Date(end.getTime() - 60 * 60 * 1000));
    const bounds = crossedBoundaries(lonStart, lonEnd);
    let monthIndex: number;
    let adhik = false;
    if (bounds.length === 0) {
      adhik = true;
      const nextBoundary = Math.ceil((lonEnd + 1e-4) / 30) * 30;
      monthIndex = (nextBoundary / 30) % 12;
    } else {
      monthIndex = (bounds[0] / 30) % 12;
    }
    built.push({ start, end, monthIndex, adhik });
  }
  spans = built;
  return built;
}

function spanAt(sunrise: Date): Span {
  const match = getSpans().find((span) => sunrise >= span.start && sunrise < span.end);
  if (!match) throw new Error("That date is outside Patro's range of 2024–2027.");
  return match;
}

function monthStart(city: City, span: Span): { date: Date; iso: string } {
  const key = `${city.id}:${span.start.toISOString()}`;
  const cached = monthStartCache.get(key);
  if (cached) return cached;
  const date = firstSunriseOnOrAfter(observerFor(city.latitude, city.longitude), span.start);
  const value = { date, iso: istIso(date) };
  monthStartCache.set(key, value);
  return value;
}

function vikramYear(city: City, sunrise: Date): number {
  const chaitra = [...getSpans()].reverse().find((span) => {
    if (span.adhik || span.monthIndex !== 0) return false;
    return monthStart(city, span).date.getTime() <= sunrise.getTime();
  });
  if (!chaitra) throw new Error("Could not place Vikram samvat.");
  return Number(monthStart(city, chaitra).iso.slice(0, 4)) - 78 + 135;
}

function samvat(city: City, sunrise: Date): { shaka: string; vikram: string; gujarati: string } {
  const vikram = vikramYear(city, sunrise);
  const shakaYear = vikram - 135;
  const kartik = [...getSpans()].reverse().find((span) => {
    if (span.adhik || span.monthIndex !== 7) return false;
    return monthStart(city, span).date.getTime() <= sunrise.getTime();
  });
  if (!kartik) throw new Error("Could not place Gujarati samvat.");
  const gujaratiYear = vikramYear(city, monthStart(city, kartik).date);
  return {
    shaka: `${shakaYear} ${SAMVATSARA[(shakaYear + 11) % 60]}`,
    vikram: `${vikram} ${SAMVATSARA[(vikram + 9) % 60]}`,
    gujarati: `${gujaratiYear} ${SAMVATSARA[(gujaratiYear + 8) % 60]}`,
  };
}

function uttarayanDates(): Set<string> {
  if (uttarayanIsos) return uttarayanIsos;
  const dates = new Set<string>();
  let cursor = new Date(SPAN_FROM);
  while (cursor < SPAN_TO) {
    const next = findNextSun(cursor, 270);
    if (next > SPAN_TO) break;
    dates.add(istIso(next));
    cursor = new Date(next.getTime() + 20 * 86400000);
  }
  uttarayanIsos = dates;
  return dates;
}

function skyAt(instant: Date, isoForEnd: string) {
  const angle = elongation(instant);
  let tithiIndex = Math.floor(angle / 12);
  if (tithiIndex >= 30) tithiIndex = 0;
  const paksha: "shukla" | "krishna" = tithiIndex < 15 ? "shukla" : "krishna";
  const tithi = (tithiIndex % 15) + 1;
  const names = tithiName(paksha, tithi);
  const fraction = (angle % 12) / 12;
  const moon = moonSidereal(instant);
  const sun = sunSidereal(instant);
  const nakIndex = Math.floor(moon / (360 / 27)) % 27;
  const pada = Math.floor((moon % (360 / 27)) / (360 / 108)) + 1;
  const yogaIndex = Math.floor(wrap360(sun + moon) / (360 / 27)) % 27;
  const karana = karanaAt(angle);
  const moonRashi = RASHIS[rashiIndex(moon)];
  const sunRashi = RASHIS[rashiIndex(sun)];
  const tithiEnd = findNextElongation(instant, ((tithiIndex + 1) * 12) % 360);
  const nakEnd = findNextMoon(instant, ((nakIndex + 1) * (360 / 27)) % 360);
  const yogaEnd = findNextYoga(instant, ((yogaIndex + 1) * (360 / 27)) % 360);
  const karanaEnd = findNextElongation(instant, ((karana.index + 1) * 6) % 360);
  return {
    tithiIndex,
    fraction,
    elongation: angle,
    paksha,
    tithi,
    tithiEn: names.en,
    tithiGu: names.gu,
    pakshaEn: paksha === "shukla" ? "Shukla" : "Krishna",
    pakshaGu: paksha === "shukla" ? "સુદ" : "વદ",
    tithiEnd,
    tithiEndLabel: formatIstTimeOn(tithiEnd, isoForEnd),
    nakshatraEn: NAKSHATRAS[nakIndex].en,
    nakshatraGu: NAKSHATRAS[nakIndex].gu,
    pada,
    nakshatraEndLabel: formatIstTimeOn(nakEnd, isoForEnd),
    yogaEn: YOGAS[yogaIndex].en,
    yogaGu: YOGAS[yogaIndex].gu,
    yogaEndLabel: formatIstTimeOn(yogaEnd, isoForEnd),
    karanaEn: karana.en,
    karanaGu: karana.gu,
    karanaEndLabel: formatIstTimeOn(karanaEnd, isoForEnd),
    moonEn: moonRashi.en,
    moonGu: moonRashi.gu,
    sunEn: sunRashi.en,
    sunGu: sunRashi.gu,
  };
}

function buildDay(city: City, iso: string): PanchangDay {
  const observer = observerFor(city.latitude, city.longitude);
  const sunrise = sunriseOn(observer, iso);
  const sunset = sunsetAfter(observer, sunrise);
  const sunsetTithiIndex = Math.floor(elongation(sunset) / 12) % 30;
  const sky = skyAt(sunrise, iso);
  const span = spanAt(sunrise);
  const month = MONTHS[span.monthIndex];
  const years = samvat(city, sunrise);
  const weekday = weekdayOfIso(iso);
  const week = WEEKDAYS[weekday];
  const segment = RAHU_SEGMENT[weekday];
  const daylight = sunset.getTime() - sunrise.getTime();
  const rahuStart = new Date(sunrise.getTime() + ((segment - 1) * daylight) / 8);
  const rahuEnd = new Date(sunrise.getTime() + (segment * daylight) / 8);
  const [year, monthNumber, dayNumber] = iso.split("-").map(Number);
  const prefix = span.adhik ? "Adhik " : "";
  const prefixGu = span.adhik ? "અધિક " : "";
  const observances = observancesFor({
    monthIndex: span.monthIndex,
    adhik: span.adhik,
    paksha: sky.paksha,
    tithi: sky.tithi,
  });
  if (uttarayanDates().has(iso)) observances.unshift(uttarayan());

  return {
    iso,
    weekday,
    weekdayEn: week.en,
    weekdayGu: week.gu,
    sunriseLabel: formatIstTime(sunrise),
    sunsetLabel: formatIstTime(sunset),
    sunsetTithiIndex,
    rahuLabel: `${formatIstTime(rahuStart)} – ${formatIstTime(rahuEnd)}`,
    tithiIndex: sky.tithiIndex,
    tithi: sky.tithi,
    tithiEn: sky.tithiEn,
    tithiGu: sky.tithiGu,
    paksha: sky.paksha,
    pakshaEn: sky.pakshaEn,
    pakshaGu: sky.pakshaGu,
    tithiEndLabel: sky.tithiEndLabel,
    nakshatraEn: sky.nakshatraEn,
    nakshatraGu: sky.nakshatraGu,
    pada: sky.pada,
    nakshatraEndLabel: sky.nakshatraEndLabel,
    yogaEn: sky.yogaEn,
    yogaGu: sky.yogaGu,
    yogaEndLabel: sky.yogaEndLabel,
    karanaEn: sky.karanaEn,
    karanaGu: sky.karanaGu,
    karanaEndLabel: sky.karanaEndLabel,
    monthIndex: span.monthIndex,
    monthEn: `${prefix}${month.en}`,
    monthGu: `${prefixGu}${month.gu}`,
    adhik: span.adhik,
    gujaratiDate: `${prefixGu}${month.gu} ${sky.pakshaGu} ${sky.tithiGu}`,
    englishLunar: `${prefix}${month.en}, ${sky.pakshaEn} ${sky.tithiEn}`,
    moonEn: sky.moonEn,
    moonGu: sky.moonGu,
    sunEn: sky.sunEn,
    sunGu: sky.sunGu,
    shaka: years.shaka,
    vikram: years.vikram,
    gujaratiSamvat: years.gujarati,
    pretty: `${dayNumber} ${GREGORIAN_MONTHS[monthNumber - 1]} ${year}`,
    observances,
  };
}

function applyEveningFestivals(days: PanchangDay[]): void {
  for (const day of days) {
    if (day.sunsetTithiIndex === 14) {
      const item = purnimaObservance(day.monthIndex, day.adhik);
      if (!day.observances.some((obs) => obs.id === item.id)) day.observances.push(item);
    }
    if (day.sunsetTithiIndex === 29) {
      if (!day.adhik && day.monthIndex === 6) {
        if (!day.observances.some((obs) => obs.id === "diwali")) day.observances.unshift(diwali());
      } else if (!day.observances.some((obs) => obs.id === "sarva-pitru" || obs.id.startsWith("amavasya"))) {
        day.observances.push(amavasyaFast(day.monthIndex, day.adhik));
      }
    }
  }

  for (let index = 1; index < days.length; index += 1) {
    const previous = days[index - 1];
    const day = days[index];
    if (previous.observances.some((obs) => obs.id === "holi") && !day.observances.some((obs) => obs.id === "dhuleti")) {
      day.observances.unshift(dhuleti());
    }
    if (previous.observances.some((obs) => obs.id === "diwali")) {
      day.observances = day.observances.filter((obs) => obs.id !== "diwali" && !obs.id.startsWith("amavasya"));
      if (!day.observances.some((obs) => obs.id === "bestu-varas")) {
        day.observances.unshift(bestuVaras(), annakut());
      }
    }
  }
}

export function getMonth(cityId: string, year: number, month: number): PanchangDay[] {
  const city = resolveCity(cityId);
  const key = `${city.id}:${year}-${month}`;
  const cached = monthCache.get(key);
  if (cached) return cached;

  const firstIso = `${year}-${String(month).padStart(2, "0")}-01`;
  const startIso = addIsoDays(firstIso, -1);
  const days: PanchangDay[] = [];
  for (let iso = startIso; iso.slice(0, 7) <= firstIso.slice(0, 7); iso = addIsoDays(iso, 1)) {
    if (year < 2024 || year > 2027) {
      throw new Error("Patro covers January 2024 through December 2027.");
    }
    days.push(buildDay(city, iso));
  }
  applyEveningFestivals(days);
  const trimmed = days.filter((day) => day.iso.startsWith(firstIso.slice(0, 7)));
  monthCache.set(key, trimmed);
  return trimmed;
}

export function getDay(cityId: string, iso: string): PanchangDay | undefined {
  const [year, month] = iso.split("-").map(Number);
  return getMonth(cityId, year, month).find((day) => day.iso === iso);
}

export function getRange(cityId: string, startIso: string, dayCount: number): PanchangDay[] {
  const out: PanchangDay[] = [];
  let year = Number(startIso.slice(0, 4));
  let month = Number(startIso.slice(5, 7));
  for (let step = 0; step < 18 && out.length < dayCount; step += 1) {
    const days = getMonth(cityId, year, month);
    for (const day of days) {
      if (day.iso >= startIso) out.push(day);
      if (out.length >= dayCount) break;
    }
    month += 1;
    if (month === 13) {
      month = 1;
      year += 1;
    }
  }
  return out;
}

export function liveSky(instant: Date): LiveSky {
  const sky = skyAt(instant, istIso(instant));
  return {
    tithiIndex: sky.tithiIndex,
    fraction: sky.fraction,
    elongation: sky.elongation,
    tithiEn: sky.tithiEn,
    tithiGu: sky.tithiGu,
    pakshaEn: sky.pakshaEn,
    pakshaGu: sky.pakshaGu,
    endsLabel: sky.tithiEndLabel,
    nakshatraEn: sky.nakshatraEn,
    nakshatraGu: sky.nakshatraGu,
    pada: sky.pada,
    yogaEn: sky.yogaEn,
    yogaGu: sky.yogaGu,
    karanaEn: sky.karanaEn,
    karanaGu: sky.karanaGu,
    moonEn: sky.moonEn,
    moonGu: sky.moonGu,
    sunEn: sky.sunEn,
    sunGu: sky.sunGu,
  };
}

export function loadToday(cityId?: string, now = new Date()): TodayPayload {
  const city = resolveCity(cityId);
  const iso = istIso(now);
  const day = getDay(city.id, iso);
  if (!day) throw new Error("Today is outside the calendar range.");
  const upcoming = getRange(city.id, iso, 70).filter((item) => item.observances.length > 0).slice(0, 6);
  const live = liveSky(now);
  return {
    city,
    asOfLabel: formatAsOf(now),
    iso,
    live,
    day,
    differsFromSunrise: live.tithiIndex !== day.tithiIndex,
    upcoming,
  };
}

export function monthLabel(year: number, month: number): string {
  return `${GREGORIAN_MONTHS[month - 1]} ${year}`;
}

export function listByKind(cityId: string, startIso: string, kind: "all" | ObservanceKind): PanchangDay[] {
  return getRange(cityId, startIso, 100).filter((day) =>
    day.observances.some((item) => {
      if (kind === "all") return item.kind === "festival" || item.kind === "fast" || item.kind === "shraddha";
      if (kind === "festival") return item.kind === "festival" || item.alsoFestival;
      if (kind === "fast") return item.kind === "fast" || item.alsoFast;
      return item.kind === "shraddha";
    }),
  );
}
