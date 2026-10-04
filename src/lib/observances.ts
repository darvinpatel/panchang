export type Paksha = "shukla" | "krishna";
export type ObservanceKind = "festival" | "fast" | "shraddha";

export type Observance = {
  id: string;
  name: string;
  nameGu: string;
  kind: ObservanceKind;
  alsoFestival?: boolean;
  alsoFast?: boolean;
  note?: string;
};

export type LunarDay = {
  monthIndex: number;
  adhik: boolean;
  paksha: Paksha;
  tithi: number;
};

type Special = {
  id: string;
  month: number;
  paksha: Paksha;
  tithi: number;
  name: string;
  nameGu: string;
  kind?: ObservanceKind;
  alsoFast?: boolean;
  alsoFestival?: boolean;
  note?: string;
};

const SPECIAL: Special[] = [
  { id: "chaitra-navratri-1", month: 0, paksha: "shukla", tithi: 1, name: "Chaitra Navratri begins", nameGu: "ચૈત્રી નવરાત્રિ શરૂ", note: "First of the nine nights before Ram Navami." },
  { id: "ram-navami", month: 0, paksha: "shukla", tithi: 9, name: "Ram Navami", nameGu: "રામ નવમી", note: "Chaitra Navratri ends." },
  { id: "akha-trij", month: 1, paksha: "shukla", tithi: 3, name: "Akha Trij", nameGu: "અખા ત્રીજ", note: "Akshaya Tritiya." },
  { id: "rath-yatra", month: 3, paksha: "shukla", tithi: 2, name: "Rath Yatra", nameGu: "રથયાત્રા" },
  { id: "nag-pancham", month: 4, paksha: "shukla", tithi: 5, name: "Nag Pancham", nameGu: "નાગપંચમી" },
  { id: "janmashtami", month: 4, paksha: "krishna", tithi: 8, name: "Janmashtami", nameGu: "જન્માષ્ટમી", alsoFast: true, note: "Gujarat keeps Krishna Janmashtami on Shravan Vad Atham." },
  { id: "ganesh-chaturthi", month: 5, paksha: "shukla", tithi: 4, name: "Ganesh Chaturthi", nameGu: "ગણેશ ચતુર્થી" },
  { id: "rishi-panchami", month: 5, paksha: "shukla", tithi: 5, name: "Rishi Panchami", nameGu: "ઋષિ પંચમી", kind: "fast", alsoFestival: true },
  { id: "sharad-navratri-1", month: 6, paksha: "shukla", tithi: 1, name: "Navratri begins", nameGu: "નવરાત્રિ શરૂ", note: "Sharad Navratri. First garba night." },
  { id: "durga-ashtami", month: 6, paksha: "shukla", tithi: 8, name: "Durga Ashtami", nameGu: "દુર્ગા અષ્ટમી", alsoFast: true, note: "Eighth night of Navratri." },
  { id: "maha-navami", month: 6, paksha: "shukla", tithi: 9, name: "Maha Navami", nameGu: "મહા નવમી", note: "Ninth night of Navratri." },
  { id: "dussehra", month: 6, paksha: "shukla", tithi: 10, name: "Dussehra", nameGu: "દશેરા", note: "Vijaya Dashami." },
  { id: "dhanteras", month: 6, paksha: "krishna", tithi: 13, name: "Dhanteras", nameGu: "ધનતેરસ" },
  { id: "kali-chaudas", month: 6, paksha: "krishna", tithi: 14, name: "Kali Chaudas", nameGu: "કાળી ચૌદસ", note: "Narak Chaturdashi. Diwali lamps are the same evening when amavasya has begun." },
  { id: "bhai-beej", month: 7, paksha: "shukla", tithi: 2, name: "Bhai Beej", nameGu: "ભાઈ બીજ" },
  { id: "labh-pancham", month: 7, paksha: "shukla", tithi: 5, name: "Labh Pancham", nameGu: "લાભ પાંચમ" },
  { id: "tulsi-vivah", month: 7, paksha: "shukla", tithi: 12, name: "Tulsi Vivah", nameGu: "તુલસી વિવાહ", note: "Some families choose any day from Devutthana Ekadashi to Kartak Purnima." },
  { id: "vasant-panchami", month: 10, paksha: "shukla", tithi: 5, name: "Vasant Panchami", nameGu: "વસંત પંચમી" },
  { id: "maha-shivaratri", month: 10, paksha: "krishna", tithi: 14, name: "Maha Shivaratri", nameGu: "મહા શિવરાત્રિ", alsoFast: true },
];

const EKADASHI: Record<number, { shukla: [string, string, string?]; krishna: [string, string, string?] }> = {
  0: { shukla: ["Kamada Ekadashi", "કામદા એકાદશી"], krishna: ["Varuthini Ekadashi", "વરૂથિની એકાદશી"] },
  1: { shukla: ["Mohini Ekadashi", "મોહિની એકાદશી"], krishna: ["Apara Ekadashi", "અપરા એકાદશી"] },
  2: { shukla: ["Nirjala Ekadashi", "નિર્જળા એકાદશી", "Traditionally kept without water."], krishna: ["Yogini Ekadashi", "યોગિની એકાદશી"] },
  3: { shukla: ["Devshayani Ekadashi", "દેવશયની એકાદશી", "Chaturmas begins."], krishna: ["Kamika Ekadashi", "કામિકા એકાદશી"] },
  4: { shukla: ["Shravana Putrada Ekadashi", "શ્રાવણ પુત્રદા એકાદશી"], krishna: ["Aja Ekadashi", "અજા એકાદશી"] },
  5: { shukla: ["Parsva Ekadashi", "પાર્શ્વ એકાદશી", "Also called Parivartini."], krishna: ["Indira Ekadashi", "ઇન્દિરા એકાદશી"] },
  6: { shukla: ["Papankusha Ekadashi", "પાપાંકુશા એકાદશી"], krishna: ["Rama Ekadashi", "રમા એકાદશી"] },
  7: { shukla: ["Devutthana Ekadashi", "દેવઉત્થાન એકાદશી", "Chaturmas ends."], krishna: ["Utpanna Ekadashi", "ઉત્પન્ના એકાદશી"] },
  8: { shukla: ["Mokshada Ekadashi", "મોક્ષદા એકાદશી", "Gita Jayanti."], krishna: ["Safala Ekadashi", "સફલા એકાદશી"] },
  9: { shukla: ["Pausha Putrada Ekadashi", "પોષ પુત્રદા એકાદશી"], krishna: ["Shattila Ekadashi", "ષટ્તિલા એકાદશી"] },
  10: { shukla: ["Jaya Ekadashi", "જયા એકાદશી"], krishna: ["Vijaya Ekadashi", "વિજયા એકાદશી"] },
  11: { shukla: ["Amalaki Ekadashi", "આમલકી એકાદશી"], krishna: ["Papamochani Ekadashi", "પાપમોચની એકાદશી"] },
};

const FESTIVAL_EKADASHI = new Set(["nirjala-ekadashi", "devshayani-ekadashi", "devutthana-ekadashi", "mokshada-ekadashi"]);

function navratri(monthIndex: number, tithi: number): Observance {
  const sharad = monthIndex === 6;
  return {
    id: `${sharad ? "sharad" : "chaitra"}-navratri-${tithi}`,
    name: `${sharad ? "Navratri" : "Chaitra Navratri"}, day ${tithi}`,
    nameGu: `${sharad ? "નવરાત્રિ" : "ચૈત્રી નવરાત્રિ"}, દિવસ ${tithi}`,
    kind: "festival",
    note: sharad ? "Garba night." : undefined,
  };
}

function toObservance(special: Special): Observance {
  return {
    id: special.id,
    name: special.name,
    nameGu: special.nameGu,
    kind: special.kind ?? "festival",
    alsoFast: special.alsoFast,
    alsoFestival: special.alsoFestival,
    note: special.note,
  };
}

export function observancesFor(day: LunarDay): Observance[] {
  const items: Observance[] = [];

  if (!day.adhik) {
    const specials = SPECIAL.filter(
      (item) => item.month === day.monthIndex && item.paksha === day.paksha && item.tithi === day.tithi,
    );
    if (specials.length > 0) {
      items.push(...specials.map(toObservance));
    } else if (day.paksha === "shukla" && day.tithi >= 2 && day.tithi <= 7 && (day.monthIndex === 0 || day.monthIndex === 6)) {
      items.push(navratri(day.monthIndex, day.tithi));
    }
  }

  if (day.tithi === 11) {
    const row = EKADASHI[day.monthIndex];
    const [name, nameGu, note] = row[day.paksha];
    const id = `${name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "")}`;
    items.push({
      id: day.adhik ? `adhik-${id}` : id,
      name: day.adhik ? `Adhik ${name}` : name,
      nameGu: day.adhik ? `અધિક ${nameGu}` : nameGu,
      kind: "fast",
      alsoFestival: !day.adhik && FESTIVAL_EKADASHI.has(id),
      note: day.adhik ? "Extra lunar month. The fast is kept; the special name varies by tradition." : note,
    });
  }

  if (day.tithi === 13 && !items.some((item) => item.id === "dhanteras")) {
    items.push({
      id: `${day.paksha}-pradosh-${day.monthIndex}${day.adhik ? "-adhik" : ""}`,
      name: day.paksha === "shukla" ? "Shukla Pradosh" : "Krishna Pradosh",
      nameGu: day.paksha === "shukla" ? "સુદ પ્રદોષ" : "વદ પ્રદોષ",
      kind: "fast",
      note: "Pradosh vrat. The puja is in the evening twilight.",
    });
  } else if (items.some((item) => item.id === "dhanteras")) {
    items.push({
      id: `pradosh-${day.monthIndex}`,
      name: "Pradosh",
      nameGu: "પ્રદોષ",
      kind: "fast",
      note: "Dhanteras falls on Pradosh.",
    });
  }

  if (day.paksha === "krishna" && day.tithi === 4) {
    items.push({
      id: `sankashti-${day.monthIndex}${day.adhik ? "-adhik" : ""}`,
      name: "Sankashti Chaturthi",
      nameGu: "સંકષ્ટી ચતુર્થી",
      kind: "fast",
      note: "Fast until moonrise, then Ganesh puja.",
    });
  }

  if (day.paksha === "krishna" && day.tithi === 14 && !items.some((item) => item.id === "maha-shivaratri" || item.id === "kali-chaudas")) {
    items.push({
      id: `masik-shivaratri-${day.monthIndex}${day.adhik ? "-adhik" : ""}`,
      name: "Masik Shivaratri",
      nameGu: "માસિક શિવરાત્રિ",
      kind: "fast",
    });
  }

  if (!day.adhik && day.monthIndex === 5 && day.paksha === "krishna") {
    if (day.tithi === 15) {
      items.push({
        id: "sarva-pitru",
        name: "Sarva Pitru Amavasya",
        nameGu: "સર્વ પિતૃ અમાસ",
        kind: "shraddha",
        note: "Mahalaya, for ancestors whose tithi is not known.",
      });
    } else {
      const names = ["", "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi"];
      const gu = ["", "પડવો", "બીજ", "ત્રીજ", "ચોથ", "પાંચમ", "છઠ", "સાતમ", "આઠમ", "નોમ", "દશમ", "અગિયારસ", "બારસ", "તેરસ", "ચૌદસ"];
      items.push({
        id: `shraddha-${day.tithi}`,
        name: `${names[day.tithi]} Shraddha`,
        nameGu: `${gu[day.tithi]} શ્રાદ્ધ`,
        kind: "shraddha",
        note: "Pitru paksha.",
      });
    }
  }

  return items;
}

const PURNIMA_NAMED: Record<number, Observance> = {
  0: { id: "hanuman-jayanti", name: "Hanuman Jayanti", nameGu: "હનુમાન જયંતી", kind: "festival", note: "Chaitra Purnima in the Gujarati calendar." },
  3: { id: "guru-purnima", name: "Guru Purnima", nameGu: "ગુરુ પૂર્ણિમા", kind: "festival", alsoFast: true },
  4: { id: "raksha-bandhan", name: "Raksha Bandhan", nameGu: "રક્ષાબંધન", kind: "festival", note: "Shravan full-moon night." },
  6: { id: "sharad-purnima", name: "Sharad Purnima", nameGu: "શરદ પૂર્ણિમા", kind: "festival", alsoFast: true, note: "Kojagari, the full-moon night." },
  7: { id: "dev-diwali", name: "Dev Diwali", nameGu: "દેવ દિવાળી", kind: "festival", alsoFast: true, note: "Kartak full-moon night." },
  11: { id: "holi", name: "Holika Dahan", nameGu: "હોળી", kind: "festival", alsoFast: true, note: "The bonfire on the Fagan full-moon night. Dhuleti is the next day." },
};

/** Full-moon night: the civil day whose sunset falls in purnima. */
export function purnimaObservance(monthIndex: number, adhik: boolean): Observance {
  if (adhik) {
    return { id: `purnima-adhik-${monthIndex}`, name: "Purnima", nameGu: "પૂનમ", kind: "fast" };
  }
  return PURNIMA_NAMED[monthIndex] ?? {
    id: `purnima-${monthIndex}`,
    name: "Purnima",
    nameGu: "પૂનમ",
    kind: "fast",
  };
}

export function diwali(): Observance {
  return {
    id: "diwali",
    name: "Diwali",
    nameGu: "દિવાળી",
    kind: "festival",
    alsoFast: true,
    note: "Lakshmi puja on the evening amavasya is running.",
  };
}

export function bestuVaras(): Observance {
  return {
    id: "bestu-varas",
    name: "Bestu Varas",
    nameGu: "બેસતું વર્ષ",
    kind: "festival",
    note: "Gujarati new year, the morning after Diwali.",
  };
}

export function annakut(): Observance {
  return {
    id: "annakut",
    name: "Annakut",
    nameGu: "અન્નકૂટ",
    kind: "festival",
    note: "Govardhan puja, kept with Bestu Varas in Gujarat.",
  };
}

export function amavasyaFast(monthIndex: number, adhik: boolean): Observance {
  return {
    id: `amavasya-${monthIndex}${adhik ? "-adhik" : ""}`,
    name: "Amavasya",
    nameGu: "અમાસ",
    kind: "fast",
  };
}

export function dhuleti(): Observance {
  return {
    id: "dhuleti",
    name: "Dhuleti",
    nameGu: "ધુળેટી",
    kind: "festival",
    note: "The colour festival, the day after Holika Dahan.",
  };
}

export function uttarayan(): Observance {
  return {
    id: "uttarayan",
    name: "Uttarayan",
    nameGu: "ઉત્તરાયણ",
    kind: "festival",
    note: "Makar Sankranti. Gujarat flies kites as the sun enters Makara.",
  };
}

export function matchesKind(item: Observance, kind: "all" | ObservanceKind): boolean {
  if (kind === "all") return true;
  if (kind === "festival") return item.kind === "festival" || Boolean(item.alsoFestival);
  if (kind === "fast") return item.kind === "fast" || Boolean(item.alsoFast);
  return item.kind === "shraddha";
}

export type MessagePrefs = {
  festivals: boolean;
  fasting: boolean;
  shraddha: boolean;
};

export function wantedForMessage(item: Observance, prefs: MessagePrefs): boolean {
  if ((item.kind === "festival" || item.alsoFestival) && prefs.festivals) return true;
  if ((item.kind === "fast" || item.alsoFast) && prefs.fasting) return true;
  if (item.kind === "shraddha" && prefs.shraddha) return true;
  return false;
}
