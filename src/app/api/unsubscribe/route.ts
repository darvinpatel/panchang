import { normalizePhone } from "@/lib/phone";
import { removeSubscriber } from "@/lib/subscribers";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { phone?: string } | null;
  const phone = body?.phone ? normalizePhone(body.phone) : null;
  if (!phone) {
    return Response.json({ error: "Enter the mobile number you signed up with." }, { status: 400 });
  }
  const removed = await removeSubscriber(phone);
  return Response.json({ ok: true, removed });
}
