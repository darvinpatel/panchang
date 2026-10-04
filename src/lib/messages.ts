import type { PanchangDay } from "./panchang";
import { wantedForMessage, type MessagePrefs } from "./observances";

export type Language = "en" | "gu" | "both";

type MessageInput = MessagePrefs & {
  daily: boolean;
  language: Language;
  cityName: string;
  cityNameGu: string;
};

export function renderMessage(day: PanchangDay, prefs: MessageInput): string | null {
  const items = day.observances.filter((item) => wantedForMessage(item, prefs));
  if (!prefs.daily && items.length === 0) return null;

  const lines: string[] = [];
  if (prefs.language !== "en") {
    lines.push(`પત્રો · ${prefs.cityNameGu}`);
    lines.push(`${day.weekdayGu}, ${day.pretty}`);
    lines.push(day.gujaratiDate);
  }
  if (prefs.language !== "gu") {
    if (lines.length) lines.push("");
    lines.push(`Patro · ${prefs.cityName}`);
    lines.push(`${day.weekdayEn}, ${day.pretty}`);
    lines.push(day.englishLunar);
  }

  if (prefs.daily) {
    lines.push("");
    if (prefs.language === "gu") {
      lines.push(`સૂર્યોદય ${day.sunriseLabel}`);
      lines.push(`સૂર્યાસ્ત ${day.sunsetLabel}`);
      lines.push(`નક્ષત્ર ${day.nakshatraGu}`);
      lines.push(`રાહુકાળ ${day.rahuLabel}`);
    } else if (prefs.language === "en") {
      lines.push(`Sunrise ${day.sunriseLabel} · Sunset ${day.sunsetLabel}`);
      lines.push(`Nakshatra ${day.nakshatraEn} · Rahu Kalam ${day.rahuLabel}`);
    } else {
      lines.push(`Sunrise ${day.sunriseLabel} · Sunset ${day.sunsetLabel}`);
      lines.push(`Nakshatra ${day.nakshatraEn} · ${day.nakshatraGu}`);
      lines.push(`Rahu Kalam ${day.rahuLabel}`);
    }
  }

  if (items.length) {
    lines.push("");
    lines.push(prefs.language === "gu" ? "આજે" : "Today");
    for (const item of items) {
      if (prefs.language === "gu") lines.push(`• ${item.nameGu}`);
      else if (prefs.language === "en") lines.push(`• ${item.name}`);
      else lines.push(`• ${item.name} · ${item.nameGu}`);
    }
  }

  return lines.join("\n");
}

export function confirmationMessage(name: string, cityName: string, cityNameGu: string, language: Language): string {
  if (language === "gu") {
    return `નમસ્તે ${name}. પત્રો ${cityNameGu}ના તહેવાર અને વ્રત આ ચેટ પર મોકલશે.`;
  }
  if (language === "en") {
    return `Namaste ${name}. Patro will send ${cityName} festivals and vrats to this chat.`;
  }
  return `Namaste ${name}. Patro will send ${cityName} festivals and vrats to this chat.\nનમસ્તે. પત્રો ${cityNameGu}ના તહેવાર અને વ્રત મોકલશે.`;
}
