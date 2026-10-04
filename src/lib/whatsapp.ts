export function twilioConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_WHATSAPP_FROM,
  );
}

export async function sendWhatsApp(to: string, body: string): Promise<void> {
  if (!twilioConfigured()) {
    throw new Error("Twilio is not configured.");
  }
  const twilio = (await import("twilio")).default;
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const from = process.env.TWILIO_WHATSAPP_FROM!;
  await client.messages.create({
    from: from.startsWith("whatsapp:") ? from : `whatsapp:${from}`,
    to: to.startsWith("whatsapp:") ? to : `whatsapp:${to}`,
    body,
  });
}
