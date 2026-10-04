import type { PanchangDay } from "./panchang";
import { wantedForMessage, type MessagePrefs } from "./observances";
import { practiceFor } from "./practice";

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

export type WhatsAppFields = { "1": string; "2": string };

export function reminderFields(day: PanchangDay, prefs: MessageInput): WhatsAppFields | null {
  const items = day.observances.filter((item) => wantedForMessage(item, prefs));
  if (!prefs.daily && items.length === 0) return null;

  const heading =
    prefs.language === "gu"
      ? `${prefs.cityNameGu}, ${day.weekdayGu} ${day.pretty}`
      : `${prefs.cityName}, ${day.weekdayEn} ${day.pretty}`;
  const parts: string[] = [];
  if (prefs.daily) {
    parts.push(
      prefs.language === "gu"
        ? `સૂર્યોદય ${day.sunriseLabel}, નક્ષત્ર ${day.nakshatraGu}`
        : `Sunrise ${day.sunriseLabel}, nakshatra ${day.nakshatraEn}`,
    );
  }
  if (items.length) {
    parts.push(
      items
        .map((item) => {
          const practice = practiceFor(item.id);
          if (prefs.language === "gu") return practice ? `${item.nameGu}. ${practice.briefGu}` : item.nameGu;
          if (prefs.language === "en") return practice ? `${item.name}. ${practice.briefEn}` : item.name;
          const en = practice ? `${item.name}. ${practice.briefEn}` : item.name;
          const gu = practice ? practice.briefGu : item.nameGu;
          return `${en} (${gu})`;
        })
        .join(" "),
    );
  }
  const note = parts.join(" ");
  const compactItems = items
    .map((item) => {
      const practice = practiceFor(item.id);
      if (prefs.language === "gu") return practice ? `${item.nameGu}. ${practice.briefGu}` : item.nameGu;
      return practice ? `${item.name}. ${practice.briefEn}` : item.name;
    })
    .join(" ");
  const compact = [prefs.daily ? parts[0] : "", compactItems].filter(Boolean).join(" ");
  return { "1": heading, "2": note.length <= 700 ? note : compact };
}

export function previewReminder(fields: WhatsAppFields): string {
  return `This is your Patro reminder for ${fields["1"]}.\nThe note for today is ${fields["2"]}.`;
}

export function confirmationFields(name: string, cityName: string, cityNameGu: string, language: Language): WhatsAppFields {
  if (language === "gu") {
    return { "1": `${name}, ${cityNameGu}`, "2": `${cityNameGu}ના તહેવાર અને વ્રત આ ચેટ પર મોકલાશે` };
  }
  if (language === "en") {
    return { "1": `${name}, ${cityName}`, "2": `${cityName} festivals and vrats will come to this chat` };
  }
  return {
    "1": `${name}, ${cityName}`,
    "2": `${cityName} festivals and vrats will come to this chat. ${cityNameGu}ના તહેવાર અને વ્રત મોકલાશે`,
  };
}
