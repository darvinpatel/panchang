import { sendSlot } from "@/lib/reminders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const slot = new URL(request.url).searchParams.get("slot") === "evening" ? "evening" : "morning";
  const result = await sendSlot(slot);
  return Response.json(result);
}
