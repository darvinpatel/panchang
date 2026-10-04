import type { Metadata } from "next";
import { Besley, Literata, Noto_Serif_Gujarati } from "next/font/google";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Toran } from "@/components/Toran";
import "./globals.css";

const display = Besley({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Literata({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const gujarati = Noto_Serif_Gujarati({
  subsets: ["gujarati"],
  weight: ["500", "600", "700"],
  variable: "--font-gujarati",
});

export const metadata: Metadata = {
  title: {
    default: "Patro — Gujarati festivals and vrats on WhatsApp",
    template: "%s · Patro",
  },
  description:
    "A Gujarati amanta panchang for festivals, ekadashi, and other fasts, with WhatsApp reminders for a Gujarat city.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${gujarati.variable}`}>
      <body>
        <a className="skip" href="#content">Skip to the panchang</a>
        <Suspense fallback={<div className="site-header" />}>
          <Header />
        </Suspense>
        <Toran />
        <main id="content">{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <p>The day follows sunrise in the Gujarat city you choose.</p>
            <p>Patro is independent and is not affiliated with Drik Panchang.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
