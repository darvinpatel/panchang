import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { normalizePhone } from "./phone";
import type { Language } from "./messages";

export type Subscriber = {
  id: string;
  name: string;
  phone: string;
  cityId: string;
  festivals: boolean;
  fasting: boolean;
  shraddha: boolean;
  daily: boolean;
  when: "morning" | "evening";
  language: Language;
  createdAt: string;
};

const filePath = path.join(process.cwd(), "data", "subscribers.json");

let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readAll(): Promise<Subscriber[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as Subscriber[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(subscribers: Subscriber[]): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(subscribers, null, 2));
}

export function listSubscribers(): Promise<Subscriber[]> {
  return enqueue(readAll);
}

export function saveSubscriber(input: Omit<Subscriber, "id" | "createdAt">): Promise<Subscriber> {
  return enqueue(async () => {
    const subscribers = await readAll();
    const existing = subscribers.find((item) => item.phone === input.phone);
    if (existing) {
      Object.assign(existing, input);
      await writeAll(subscribers);
      return existing;
    }
    const created: Subscriber = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    subscribers.push(created);
    await writeAll(subscribers);
    return created;
  });
}

export function removeSubscriber(phoneInput: string): Promise<boolean> {
  return enqueue(async () => {
    const phone = normalizePhone(phoneInput);
    if (!phone) return false;
    const subscribers = await readAll();
    const next = subscribers.filter((item) => item.phone !== phone);
    if (next.length === subscribers.length) return false;
    await writeAll(next);
    return true;
  });
}
