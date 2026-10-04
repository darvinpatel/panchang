"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CITIES } from "@/lib/cities";
import { withQuery } from "@/lib/query";

const LINKS = [
  { href: "/", label: "Today" },
  { href: "/calendar", label: "Month" },
  { href: "/festivals", label: "Festivals" },
  { href: "/whatsapp", label: "WhatsApp" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const city = params.get("city") ?? undefined;
  const month = params.get("month") ?? undefined;
  const kind = params.get("kind") ?? undefined;

  return (
    <header className="site-header">
      <div className="wrap header-bar">
        <Link href={withQuery("/", { city })} className="brand">
          <span className="brand-mark" lang="gu">પ</span>
          <span>
            <strong>Patro</strong>
            <small lang="gu">ગુજરાતી પંચાંગ</small>
          </span>
        </Link>
        <nav className="nav" aria-label="Sections">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            const query: Record<string, string | undefined> = { city };
            if (link.href === "/calendar") query.month = month;
            if (link.href === "/festivals") query.kind = kind;
            return (
              <Link key={link.href} href={withQuery(link.href, query)} aria-current={active ? "page" : undefined}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <label className="city-form">
          <span className="sr">City</span>
          <select
            aria-label="Gujarat city"
            value={city ?? "ahmedabad"}
            onChange={(event) => {
              const next = new URLSearchParams(params.toString());
              next.set("city", event.target.value);
              router.push(`${pathname}?${next.toString()}`);
            }}
          >
            {CITIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
}
