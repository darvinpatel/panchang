import {
  Body,
  EclipticGeoMoon,
  Observer,
  SearchRiseSet,
  SunPosition,
} from "astronomy-engine";
import { wrap360 } from "./names";

const ARCSEC_PER_DAY = 50.29 / 365.2425;
const LAHIRI_EPOCH_JD = 2451544.5;
const LAHIRI_EPOCH_DEG = 23 + 51 / 60 + 12 / 3600;

export function julianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

/** Chitrapaksha / Lahiri ayanamsa. Calibrated to 23°51'12" on 1 Jan 2000. */
export function lahiriAyanamsa(date: Date): number {
  const days = julianDay(date) - LAHIRI_EPOCH_JD;
  return LAHIRI_EPOCH_DEG + (days * ARCSEC_PER_DAY) / 3600;
}

export function sunSidereal(date: Date): number {
  return wrap360(SunPosition(date).elon - lahiriAyanamsa(date));
}

export function moonSidereal(date: Date): number {
  return wrap360(EclipticGeoMoon(date).lon - lahiriAyanamsa(date));
}

/** Tropical elongation. Ayanamsa cancels, so this is the tithi angle. */
export function elongation(date: Date): number {
  return wrap360(EclipticGeoMoon(date).lon - SunPosition(date).elon);
}

export function forward(from: number, to: number): number {
  return wrap360(to - from);
}

function findCrossing(start: Date, target: number, read: (date: Date) => number, dailyMotion: number): Date {
  let origin = start;
  let startAngle = read(origin);
  let need = forward(startAngle, target);
  if (need < 0.02) {
    origin = new Date(start.getTime() + 3 * 60 * 60 * 1000);
    startAngle = read(origin);
    need = forward(startAngle, target);
  }

  let lo = origin.getTime();
  let hi = lo + (need / dailyMotion) * 86400000 + 6 * 60 * 60 * 1000;
  let guard = 0;
  while (forward(startAngle, read(new Date(hi))) + 0.02 < need && guard < 24) {
    hi += 12 * 60 * 60 * 1000;
    guard += 1;
  }

  for (let i = 0; i < 48; i += 1) {
    const mid = (lo + hi) / 2;
    const traveled = forward(startAngle, read(new Date(mid)));
    if (traveled < need) lo = mid;
    else hi = mid;
  }
  return new Date((lo + hi) / 2);
}

export function findNextElongation(start: Date, target: number): Date {
  return findCrossing(start, target, elongation, 11.5);
}

export function findNextMoon(start: Date, target: number): Date {
  return findCrossing(start, target, moonSidereal, 12);
}

export function findNextYoga(start: Date, target: number): Date {
  return findCrossing(start, target, (date) => wrap360(sunSidereal(date) + moonSidereal(date)), 13);
}

export function findNextSun(start: Date, target: number): Date {
  return findCrossing(start, target, sunSidereal, 0.95);
}

export function observerFor(latitude: number, longitude: number): Observer {
  return new Observer(latitude, longitude, 0);
}

export function istIso(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function istMidnight(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, -5, -30, 0));
}

export function sunriseOn(observer: Observer, iso: string): Date {
  const found = SearchRiseSet(Body.Sun, observer, +1, istMidnight(iso), 1.2);
  if (!found) throw new Error(`No sunrise for ${iso}`);
  return found.date;
}

export function sunsetAfter(observer: Observer, sunrise: Date): Date {
  const found = SearchRiseSet(Body.Sun, observer, -1, new Date(sunrise.getTime() + 60_000), 1.2);
  if (!found) throw new Error("No sunset");
  return found.date;
}

export function firstSunriseOnOrAfter(observer: Observer, instant: Date): Date {
  const found = SearchRiseSet(Body.Sun, observer, +1, new Date(instant.getTime() - 60_000), 3);
  if (found && found.date.getTime() + 500 >= instant.getTime()) return found.date;
  const next = SearchRiseSet(Body.Sun, observer, +1, instant, 3);
  if (!next) throw new Error("Sunrise not found");
  return next.date;
}

export function addIsoDays(iso: string, days: number): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return date.toISOString().slice(0, 10);
}

export function weekdayOfIso(iso: string): number {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

export function formatIstTime(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function formatIstTimeOn(date: Date, iso: string): string {
  const time = formatIstTime(date);
  const endIso = istIso(date);
  if (endIso === iso) return time;
  const [, month, day] = endIso.split("-");
  const label = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Number(month) - 1];
  return `${time}, ${Number(day)} ${label}`;
}

export function formatAsOf(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    day: "numeric",
    month: "short",
  }).format(date);
}

export function crossedBoundaries(lonStart: number, lonEnd: number): number[] {
  const travel = forward(lonStart, lonEnd);
  const bounds: number[] = [];
  let boundary = Math.ceil((lonStart + 1e-6) / 30) * 30;
  while (bounds.length < 3) {
    const distance = forward(lonStart, boundary % 360);
    if (distance >= travel - 1e-4) break;
    bounds.push(((boundary % 360) + 360) % 360);
    boundary += 30;
  }
  return bounds;
}
