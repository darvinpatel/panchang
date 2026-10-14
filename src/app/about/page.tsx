import Link from "next/link";

export const metadata = {
  title: "About",
  description: "Learn about Panchang, a free personal project providing Gujarati panchang reminders via WhatsApp.",
};

export default function AboutPage() {
  return (
    <div className="wrap page">
      <div className="split align-start">
        <div>
          <p className="eyebrow">About</p>
          <h1>What is Panchang?</h1>
          
          <p>
            Panchang (WhatsApp sender name "Panchaang") is a <strong>free personal and community project</strong> that 
            provides the daily Gujarati panchang alongside short WhatsApp utility reminders.
          </p>

          <p>
            Subscribers who opt in receive timely notifications about upcoming Gujarati Hindu festivals 
            and fast days (vrats) for their chosen Gujarat city. These are purely informational reminders 
            designed to help you stay connected with cultural and religious observances.
          </p>

          <h2>What we send</h2>
          <ul>
            <li>Notifications about upcoming festivals and vrats</li>
            <li>Daily panchang information for your selected city</li>
            <li>Timely reminders about observances</li>
          </ul>

          <p className="note" style={{ color: "var(--ink-soft)", marginTop: "1.5rem" }}>
            <strong>No marketing or promotional messages.</strong> This service is strictly limited 
            to panchang information and festival reminders.
          </p>
        </div>

        <section className="panel">
          <h2>Who runs this?</h2>
          <p>
            Panchang is run by <strong>Darvin Patel</strong> in Sydney, Australia. 
            This is a personal passion project created to serve the Gujarati community.
          </p>

          <p style={{ marginTop: "1.5rem" }}>
            <Link href="/contact" className="button">Get in touch</Link>
          </p>

          <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--line)" }}>
            <h3 style={{ 
              margin: "0 0 0.5rem", 
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "1rem",
              fontWeight: 600
            }}>
              Want to receive reminders?
            </h3>
            <p style={{ margin: "0 0 0.8rem" }}>
              Sign up to get festival and vrat reminders on WhatsApp.
            </p>
            <Link href="/whatsapp" className="button">Subscribe to WhatsApp</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
