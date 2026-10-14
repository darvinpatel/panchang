import { normalizePhone } from "@/lib/phone";
import { clearPending, confirmSend, listSubscribers, removeSubscriber } from "@/lib/subscribers";
import { siteOrigin } from "@/lib/whatsapp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STOP = new Set(["stop", "stopall", "unsubscribe", "cancel", "quit", "end"]);

function phoneFrom(address: string): string | null {
  return normalizePhone(address.replace(/^whatsapp:/i, ""));
}

function escapeXml(value: string): string {
  return value.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char] ?? char);
}

function xml(message?: string): Response {
  const inner = message ? `<Message>${escapeXml(message)}</Message>` : "";
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response>${inner}</Response>`, {
    headers: { "content-type": "text/xml" },
  });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const params: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === "string") params[key] = value;
  }

  const token = process.env.TWILIO_AUTH_TOKEN;
  const signature = request.headers.get("x-twilio-signature");
  if (!token || !signature) return new Response("Unauthorized", { status: 401 });
  const twilio = (await import("twilio")).default;
  const origin = siteOrigin();
  const path = new URL(request.url).pathname;
  const url = origin ? `${origin}${path}` : request.url;
  if (!twilio.validateRequest(token, signature, url, params)) {
    return new Response("Unauthorized", { status: 403 });
  }

  const status = params.MessageStatus;
  if (status && status !== "received") {
    const phone = phoneFrom(params.To ?? "");
    const sid = params.MessageSid;
    if (phone && sid) {
      const person = (await listSubscribers()).find((item) => item.phone === phone && item.pendingSid === sid);
      if (person?.pendingKey && (status === "delivered" || status === "read")) {
        await confirmSend(phone, person.pendingKey);
      }
      if (person?.pendingKey && (status === "failed" || status === "undelivered")) {
        await clearPending(phone, person.pendingKey);
      }
    }
    return xml();
  }

  const word = (params.Body ?? "").trim().toLowerCase().replace(/[.!]+$/g, "");
  if (STOP.has(word)) {
    const phone = phoneFrom(params.From ?? "");
    if (phone) await removeSubscriber(phone);
    return xml("Patro will stop these notes. Sign up again on the site if you want them back.");
  }
  return xml();
}
