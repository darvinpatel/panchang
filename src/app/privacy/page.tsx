import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="wrap page">
      <p className="eyebrow">Privacy</p>
      <h1>What Patro keeps</h1>
      <p className="lede">
        Patro stores only what the reminder needs. The number is not sold, and it is not used for anything else.
      </p>
      <h2>What is saved</h2>
      <p>
        When you sign up, Patro keeps your name, WhatsApp number, the Gujarat city for the tithi, the timezone where you live, the kinds of notes you asked for, the language, and the time you agreed to receive them.
      </p>
      <h2>How it is used</h2>
      <p>
        That record is used to send the short WhatsApp note you chose, around 7:00 in your timezone. The day inside the note follows sunrise in the Gujarat city. The website itself can be read without an account.
      </p>
      <h2>How to stop</h2>
      <p>
        Send STOP to the Patro WhatsApp chat, or remove the number on the <Link href="/whatsapp">WhatsApp page</Link>. Either one deletes the signup.
      </p>
      <p>Patro is independent and is not affiliated with Drik Panchang.</p>
    </div>
  );
}
