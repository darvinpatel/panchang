import { getRange, liveSky } from "../src/lib/panchang.ts";

const live = liveSky(new Date("2026-10-04T07:46:00Z"));
console.log("live 2026-10-04 07:46Z", {
  tithi: `${live.pakshaEn} ${live.tithiEn}`,
  moon: live.moonEn,
  sun: live.sunEn,
  nakshatra: live.nakshatraEn,
  yoga: live.yogaEn,
  karana: live.karanaEn,
  elongation: live.elongation.toFixed(2),
});

const days = getRange("ahmedabad", "2026-09-20", 40);
const oct4 = days.find((day) => day.iso === "2026-10-04");
console.log("Ahmedabad sunrise 4 Oct", oct4 && {
  lunar: oct4.englishLunar,
  gu: oct4.gujaratiDate,
  nakshatra: oct4.nakshatraEn,
  sun: oct4.sunEn,
  moon: oct4.moonEn,
  shaka: oct4.shaka,
  vikram: oct4.vikram,
  gujarati: oct4.gujaratiSamvat,
  sunrise: oct4.sunriseLabel,
  sunset: oct4.sunsetLabel,
  observances: oct4.observances.map((item) => item.name),
});

console.log("\nObservances 20 Sep – 30 Oct 2026");
for (const day of days) {
  if (day.observances.length === 0) continue;
  console.log(day.iso, day.englishLunar, "—", day.observances.map((item) => item.name).join(", "));
}

if (!oct4 || oct4.tithiEn !== "Navami" || oct4.paksha !== "krishna" || oct4.monthEn !== "Bhadarvo") {
  throw new Error(`Expected Bhadarvo Krishna Navami, got ${oct4?.englishLunar}`);
}
if (!oct4.shaka.startsWith("1948") || !oct4.vikram.startsWith("2083") || !oct4.gujaratiSamvat.startsWith("2082")) {
  throw new Error(`Samvat mismatch ${oct4.shaka} / ${oct4.vikram} / ${oct4.gujaratiSamvat}`);
}
if (live.moonEn !== "Mithuna" || live.sunEn !== "Kanya" || live.nakshatraEn !== "Punarvasu") {
  throw new Error("Sky did not match the 4 Oct 2026 reference.");
}
console.log("\nchecks passed");
