"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CITIES } from "@/lib/cities";
import { COMMON_TIME_ZONES, TIME_ZONES, timeZonePlace, timeZoneRegion } from "@/lib/timezones";

type Status = { state: "idle" | "saving" | "saved" | "error"; message?: string };

const REGIONS = ["Africa", "America", "Antarctica", "Asia", "Atlantic", "Australia", "Europe", "Indian", "Pacific"];

export function SignupForm({ cityId }: { cityId: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone((TIME_ZONES as readonly string[]).includes(detected) ? detected : "Asia/Kolkata");
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ state: "saving" });
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          cityId: data.get("cityId"),
          festivals: data.get("festivals") === "on",
          fasting: data.get("fasting") === "on",
          shraddha: data.get("shraddha") === "on",
          daily: data.get("daily") === "on",
          when: data.get("when"),
          timezone,
          language: data.get("language"),
          company: data.get("company"),
        }),
      });
      const body = (await response.json()) as { error?: string; warning?: string; whatsapp?: string };
      if (!response.ok) {
        setStatus({ state: "error", message: body.error ?? "The number could not be saved." });
        return;
      }
      if (body.whatsapp === "sent") {
        setStatus({ state: "saved", message: "Saved. A confirmation is on its way to WhatsApp." });
      } else if (body.warning) {
        setStatus({ state: "saved", message: `Saved on this server. WhatsApp did not send: ${body.warning}` });
      } else {
        setStatus({ state: "saved", message: "Saved on this server. Messages start once WhatsApp sending is connected." });
      }
      form.reset();
    } catch {
      setStatus({ state: "error", message: "The number could not be saved. Check the connection and try again." });
    }
  }

  return (
    <form className="signup" onSubmit={onSubmit}>
      <div className="field-row">
        <label>
          Name
          <input name="name" autoComplete="name" required maxLength={80} />
        </label>
        <label>
          WhatsApp number
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+61 412 345 678" required />
          <span className="field-hint">Start with + and the country code. A 10-digit number with no + is saved as India.</span>
        </label>
      </div>
      <label>
        Gujarat city for the day
        <select name="cityId" defaultValue={cityId}>
          {CITIES.map((city) => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
        <span className="field-hint">Sunrise here names the tithi, wherever you live.</span>
      </label>
      <label>
        Where you live
        <select name="timezone" value={timezone} onChange={(event) => setTimezone(event.target.value)} required>
          <option value="" disabled>Your timezone</option>
          <optgroup label="Often chosen">
            {COMMON_TIME_ZONES.map((zone) => (
              <option key={zone.id} value={zone.id}>{zone.label}</option>
            ))}
          </optgroup>
          {REGIONS.map((region) => (
            <optgroup key={region} label={region}>
              {TIME_ZONES.filter((zone) => timeZoneRegion(zone) === region).map((zone) => (
                <option key={zone} value={zone}>{timeZonePlace(zone)}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <span className="field-hint">The note arrives around 7:00 in this timezone. The day inside it is still the Gujarat day.</span>
      </label>
      <fieldset>
        <legend>Send a note for</legend>
        <label className="check"><input type="checkbox" name="festivals" defaultChecked /> Festivals</label>
        <label className="check"><input type="checkbox" name="fasting" defaultChecked /> Fasts and ekadashi</label>
        <label className="check"><input type="checkbox" name="shraddha" /> Shraddha in pitru paksha</label>
        <label className="check"><input type="checkbox" name="daily" /> A panchang note every day</label>
      </fieldset>
      <fieldset>
        <legend>When</legend>
        <label className="check"><input type="radio" name="when" value="morning" defaultChecked /> Morning of that day, around 7:00 your time</label>
        <label className="check"><input type="radio" name="when" value="evening" /> The evening before, around 7:00 your time</label>
      </fieldset>
      <fieldset>
        <legend>Language</legend>
        <label className="check"><input type="radio" name="language" value="both" defaultChecked /> Gujarati and English</label>
        <label className="check"><input type="radio" name="language" value="gu" /> Gujarati</label>
        <label className="check"><input type="radio" name="language" value="en" /> English</label>
      </fieldset>
      <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="button" type="submit" disabled={status.state === "saving"}>
        {status.state === "saving" ? "Saving…" : "Send me these notes"}
      </button>
      {status.message ? <p className={status.state === "error" ? "form-error" : "form-ok"} role="status">{status.message}</p> : null}
    </form>
  );
}
