import type { Metadata } from "next";
import Link from "next/link";
import { contactEmail, operatorName } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Patro is a personal Gujarati amanta panchang for festivals, ekadashi, and other fasts, run by Darvin Patel.",
};

export default function AboutPage() {
  return (
    <div className="wrap page">
      <p className="eyebrow">About</p>
      <h1>A Gujarati panchang, kept by one person</h1>
      <p className="lede narrow">
        Patro is a personal project by {operatorName}. It is a Gujarati amanta panchang for festivals, ekadashi, and other fasts, with a short WhatsApp note if you want one.
      </p>
      <div className="about-points">
        <section>
          <h2>What it shows</h2>
          <p>
            Choose a city in Gujarat. The day page names the tithi at sunrise, then the festivals and fasts, the puja, the food, and what to skip.
          </p>
        </section>
        <section>
          <h2>Who runs it</h2>
          <p>
            {operatorName} runs Patro alone, as a personal project. It is independent and is not affiliated with Drik Panchang. Write to{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </section>
        <section>
          <h2>How a day is counted</h2>
          <p>
            The day follows sunrise in the Gujarat city you choose. WhatsApp reminders go out around 7:00 where you live.
          </p>
        </section>
      </div>
      <p className="page-next">
        <Link href="/contact">Contact</Link>
        <Link href="/whatsapp">WhatsApp reminders</Link>
      </p>
    </div>
  );
}
