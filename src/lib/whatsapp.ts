import type { WhatsAppFields } from "./messages";

export function twilioConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_WHATSAPP_FROM,
  );
}

function field(value: string): string {
  return value.replace(/\s+/g, " ").trim().slice(0, 900);
}

export function siteOrigin(): string | null {
  const explicit = process.env.SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;
  return null;
}

export async function twilioClient() {
  const twilio = (await import("twilio")).default;
  return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

export function whatsAppAddress(value: string): string {
  return value.startsWith("whatsapp:") ? value : `whatsapp:${value}`;
}

export async function sendWhatsApp(to: string, fields: WhatsAppFields): Promise<{ sid: string }> {
  if (!twilioConfigured()) {
    throw new Error("Twilio is not configured.");
  }
  const client = await twilioClient();
  const from = whatsAppAddress(process.env.TWILIO_WHATSAPP_FROM!);
  const destination = whatsAppAddress(to);
  const callback = siteOrigin();
  const contentSid = process.env.TWILIO_CONTENT_SID;
  const statusCallback = callback ? `${callback}/api/whatsapp` : undefined;
  const message = contentSid
    ? await client.messages.create({
        from,
        to: destination,
        contentSid,
        contentVariables: JSON.stringify({ "1": field(fields["1"]), "2": field(fields["2"]) }),
        ...(statusCallback ? { statusCallback } : {}),
      })
    : await client.messages.create({
        from,
        to: destination,
        body: `This is your Patro reminder for ${field(fields["1"])}. The note for today is ${field(fields["2"])}. Open Patro for the full day.`,
        ...(statusCallback ? { statusCallback } : {}),
      });
  return { sid: message.sid };
}

export async function messageStatus(sid: string): Promise<string> {
  const client = await twilioClient();
  const message = await client.messages(sid).fetch();
  return message.status;
}
