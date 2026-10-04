"use client";

import { useState, type FormEvent } from "react";
import { CITIES } from "@/lib/cities";

type Status = { state: "idle" | "saving" | "saved" | "error"; message?: string };

export function SignupForm({ cityId }: { cityId: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

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
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98XXX XXXXX" required />
        </label>
      </div>
      <label>
        City for sunrise
        <select name="cityId" defaultValue={cityId}>
          {CITIES.map((city) => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
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
        <label className="check"><input type="radio" name="when" value="morning" defaultChecked /> Morning of the day, 7:00 India time</label>
        <label className="check"><input type="radio" name="when" value="evening" /> Evening before, 7:00 India time</label>
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
