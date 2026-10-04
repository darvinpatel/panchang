import { addIsoDays } from "./astro";

export function zonedClock(now: Date, timeZone: string): { iso: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  let hour = Number(value("hour"));
  if (hour === 24) hour = 0;
  return {
    iso: `${value("year")}-${value("month")}-${value("day")}`,
    minutes: hour * 60 + Number(value("minute")),
  };
}

/**
 * The note is meant for 7:00 local. On the free host a daily job can land any
 * time during its UTC hour, so a half-hour timezone is covered by the next
 * hour as well. Accept the two hours from 7:00, once per day.
 */
export function dueDelivery(
  now: Date,
  timeZone: string,
  when: "morning" | "evening",
): { targetIso: string; key: string } | null {
  const { iso, minutes } = zonedClock(now, timeZone);
  const start = (when === "evening" ? 19 : 7) * 60;
  if (minutes < start || minutes >= start + 120) return null;
  const targetIso = when === "evening" ? addIsoDays(iso, 1) : iso;
  return { targetIso, key: `${targetIso}:${when}` };
}
