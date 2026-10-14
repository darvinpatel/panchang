import type { Metadata } from "next";
import Link from "next/link";
import { contactEmail, operatorName, whatsappDisplay, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email or WhatsApp Darvin Patel about Patro, the Gujarati panchang and its reminders.",
};

export default function ContactPage() {
  return (
    <div className="wrap page">
      <p className="eyebrow">Contact</p>
      <h1>Write or message</h1>
      <p className="lede narrow">
        {operatorName} reads these. Use them for a question about the calendar, a reminder that did not arrive, or stopping the notes.
      </p>
      <dl className="contact-list">
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </dd>
        </div>
        <div>
          <dt>WhatsApp</dt>
          <dd>
            <a href={whatsappHref}>{whatsappDisplay}</a>
          </dd>
        </div>
      </dl>
      <p className="page-next">
        <Link href="/about">About Patro</Link>
        <Link href="/whatsapp">Get or stop reminders</Link>
      </p>
    </div>
  );
}
