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

export async function sendWhatsApp(to: string, fields: WhatsAppFields): Promise<void> {
  if (!twilioConfigured()) {
    throw new Error("Twilio is not configured.");
  }
  const twilio = (await import("twilio")).default;
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const fromAddress = process.env.TWILIO_WHATSAPP_FROM!;
  const from = fromAddress.startsWith("whatsapp:") ? fromAddress : `whatsapp:${fromAddress}`;
  const destination = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;
  const contentSid = process.env.TWILIO_CONTENT_SID;
  if (contentSid) {
    await client.messages.create({
      from,
      to: destination,
      contentSid,
      contentVariables: JSON.stringify({ "1": field(fields["1"]), "2": field(fields["2"]) }),
    });
    return;
  }
  await client.messages.create({
    from,
    to: destination,
    body: `This is your Patro reminder for ${field(fields["1"])}.\nThe note for today is ${field(fields["2"])}.`,
  });
}
