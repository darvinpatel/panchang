import {
  Body,
  EclipticGeoMoon,
  Observer,
  SearchRiseSet,
  SunPosition,
} from "astronomy-engine";

function wrap(deg) {
  const x = deg % 360;
  return x < 0 ? x + 360 : x;
}

function lahiri(date) {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const days = jd - 2451544.5;
  const arcsecPerDay = 50.29 / 365.2425;
  return 23 + 51 / 60 + 12 / 3600 + (days * arcsecPerDay) / 3600;
}

function sunSid(date) {
  return wrap(SunPosition(date).elon - lahiri(date));
}
function moonSid(date) {
  return wrap(EclipticGeoMoon(date).lon - lahiri(date));
}
function elongation(date) {
  return wrap(EclipticGeoMoon(date).lon - SunPosition(date).elon);
}

const when = new Date("2026-10-04T07:46:00Z");
const el = elongation(when);
const tithi = Math.floor(el / 12);
console.log({
  ayanamsa: lahiri(when),
  sunTropical: SunPosition(when).elon,
  moonTropical: EclipticGeoMoon(when).lon,
  sunSidereal: sunSid(when),
  moonSidereal: moonSid(when),
  elongation: el,
  tithiIndex: tithi,
});

const ahmedabad = new Observer(23.0225, 72.5714, 55);
const midnight = new Date(Date.UTC(2026, 9, 4, -5, -30, 0));
const sunrise = SearchRiseSet(Body.Sun, ahmedabad, +1, midnight, 1);
const sunset = SearchRiseSet(Body.Sun, ahmedabad, -1, sunrise.date, 1);
console.log({
  midnight: midnight.toISOString(),
  sunrise: sunrise?.date.toISOString(),
  sunset: sunset?.date.toISOString(),
  sunriseElongation: elongation(sunrise.date),
  sunriseTithi: Math.floor(elongation(sunrise.date) / 12),
});
