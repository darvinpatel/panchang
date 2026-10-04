"use client";

import { useState, type FormEvent } from "react";

export function RemoveForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const phone = new FormData(form).get("phone");
    setMessage(null);
    const response = await fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const body = (await response.json()) as { error?: string; removed?: boolean };
    if (!response.ok) {
      setError(true);
      setMessage(body.error ?? "That number could not be removed.");
      return;
    }
    setError(false);
    setMessage(body.removed ? "Removed. This number will not get more notes." : "That number was not on the list.");
    form.reset();
  }

  return (
    <form className="remove-form" onSubmit={onSubmit}>
      <label>
        WhatsApp number to remove
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="98XXX XXXXX" />
      </label>
      <button className="button button-quiet" type="submit">Remove number</button>
      {message ? <p className={error ? "form-error" : "form-ok"} role="status">{message}</p> : null}
    </form>
  );
}
