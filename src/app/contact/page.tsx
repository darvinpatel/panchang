export const metadata = {
  title: "Contact",
  description: "Get in touch with the Panchang team.",
};

export default function ContactPage() {
  return (
    <div className="wrap page">
      <div className="split align-start">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Get in touch</h1>
          
          <p className="lede narrow">
            Have questions, feedback, or need support? We're here to help.
          </p>

          <section className="panel" style={{ marginTop: "2rem" }}>
            <h2>Email</h2>
            <p>
              For general inquiries, support, or feedback:
            </p>
            <p style={{ fontSize: "1.15rem", margin: "0.5rem 0" }}>
              <a href="mailto:contact@darvinpatel.com">contact@darvinpatel.com</a>
            </p>
          </section>

          <section className="panel" style={{ marginTop: "1.5rem" }}>
            <h2>WhatsApp</h2>
            <p>
              You can also reach us via WhatsApp:
            </p>
            <p style={{ fontSize: "1.15rem", margin: "0.5rem 0" }}>
              <a href="https://wa.me/61485022858">+61 485 022 858</a>
            </p>
            <p className="note" style={{ color: "var(--ink-soft)", fontSize: "0.92rem" }}>
              This is the same number used for sending panchang reminders.
            </p>
          </section>
        </div>

        <div>
          <section className="panel">
            <h2>About response times</h2>
            <p>
              Panchang is run as a personal project by Darvin Patel. We aim to respond to 
              all inquiries within a few days, though response times may vary.
            </p>
            
            <p style={{ marginTop: "1rem" }}>
              Thank you for your patience and for being part of our community.
            </p>
          </section>

          <section className="panel" style={{ marginTop: "1.5rem" }}>
            <h2>For WhatsApp issues</h2>
            <p>
              If you're having trouble with WhatsApp reminders:
            </p>
            <ul>
              <li>Check if you're still subscribed</li>
              <li>Verify your phone number is correct</li>
              <li>Ensure WhatsApp is working on your device</li>
            </ul>
            <p style={{ marginTop: "0.8rem" }}>
              If issues persist, please email us with your phone number and city.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
