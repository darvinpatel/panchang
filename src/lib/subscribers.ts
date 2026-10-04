import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { BlobNotFoundError, BlobPreconditionFailedError, get, put } from "@vercel/blob";
import { storeConfigured } from "./db";
import type { Language } from "./messages";
import { normalizePhone } from "./phone";

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

type StoreFile = {
  subscribers: Subscriber[];
  attempts: { ip: string; at: number }[];
};

const blobPath = "subscribers.json";
const filePath = path.join(process.cwd(), "data", "subscribers.json");
const hits = new Map<string, number[]>();
let queue: Promise<unknown> = Promise.resolve();
const hour = 60 * 60 * 1000;
const day = 24 * hour;

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function emptyStore(): StoreFile {
  return { subscribers: [], attempts: [] };
}

function freshAttempts(attempts: { ip: string; at: number }[], now: number) {
  return attempts.filter((item) => now - item.at < day);
}

async function readBlob(): Promise<{ etag?: string; data: StoreFile }> {
  let result;
  try {
    result = await get(blobPath, { access: "private", useCache: false });
  } catch (error) {
    if (error instanceof BlobNotFoundError) return { data: emptyStore() };
    throw error;
  }
  if (!result || result.statusCode !== 200 || !result.stream) return { data: emptyStore() };
  const parsed = JSON.parse(await new Response(result.stream).text()) as StoreFile;
  return {
    etag: result.blob.etag,
    data: {
      subscribers: Array.isArray(parsed.subscribers) ? parsed.subscribers : [],
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
    },
  };
}

async function writeBlob(data: StoreFile, etag?: string): Promise<void> {
  await put(blobPath, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
    ...(etag ? { ifMatch: etag } : {}),
  });
}

async function updateBlob<T>(change: (data: StoreFile) => T): Promise<T> {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const current = await readBlob();
    const data: StoreFile = {
      subscribers: current.data.subscribers,
      attempts: freshAttempts(current.data.attempts, Date.now()),
    };
    const result = change(data);
    try {
      await writeBlob(data, current.etag);
      return result;
    } catch (error) {
      if (error instanceof BlobPreconditionFailedError) continue;
      throw error;
    }
  }
  throw new Error("The signup list was busy. Try again.");
}

async function readFileStore(): Promise<Subscriber[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as Subscriber[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFileStore(subscribers: Subscriber[]): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(subscribers, null, 2));
}

function memoryAllowsSignup(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < hour);
  if (recent.length >= 8) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export async function reserveSignup(ip: string): Promise<boolean> {
  if (!storeConfigured()) return memoryAllowsSignup(ip);
  return updateBlob((data) => {
    const now = Date.now();
    const recent = data.attempts.filter((item) => item.ip === ip && now - item.at < hour);
    if (recent.length >= 8) return false;
    data.attempts.push({ ip, at: now });
    return true;
  });
}

export async function listSubscribers(): Promise<Subscriber[]> {
  if (!storeConfigured()) return enqueue(readFileStore);
  const { data } = await readBlob();
  return data.subscribers;
}

export async function saveSubscriber(input: Omit<Subscriber, "id" | "createdAt">): Promise<Subscriber> {
  if (!storeConfigured()) {
    return enqueue(async () => {
      const subscribers = await readFileStore();
      const existing = subscribers.find((item) => item.phone === input.phone);
      if (existing) {
        Object.assign(existing, input);
        await writeFileStore(subscribers);
        return existing;
      }
      const created: Subscriber = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      subscribers.push(created);
      await writeFileStore(subscribers);
      return created;
    });
  }

  return updateBlob((data) => {
    const existing = data.subscribers.find((item) => item.phone === input.phone);
    if (existing) {
      Object.assign(existing, input);
      return existing;
    }
    const created: Subscriber = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    data.subscribers.push(created);
    return created;
  });
}

export async function removeSubscriber(phoneInput: string): Promise<boolean> {
  const phone = normalizePhone(phoneInput);
  if (!phone) return false;
  if (!storeConfigured()) {
    return enqueue(async () => {
      const subscribers = await readFileStore();
      const next = subscribers.filter((item) => item.phone !== phone);
      if (next.length === subscribers.length) return false;
      await writeFileStore(next);
      return true;
    });
  }

  return updateBlob((data) => {
    const next = data.subscribers.filter((item) => item.phone !== phone);
    const removed = next.length !== data.subscribers.length;
    data.subscribers = next;
    return removed;
  });
}
