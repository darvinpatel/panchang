import type { Observance } from "@/lib/observances";
import { practiceFor } from "@/lib/practice";

function tags(item: Observance): string[] {
  const list: string[] = [];
  if (item.kind === "festival" || item.alsoFestival) list.push("Festival");
  if (item.kind === "fast" || item.alsoFast) list.push("Fast");
  if (item.kind === "shraddha") list.push("Shraddha");
  return list;
}

export function ObserveList({ items, detail = false }: { items: Observance[]; detail?: boolean }) {
  if (items.length === 0) {
    return <p className="quiet">No festival or fast is tied to this sunrise.</p>;
  }
  const fastAndShraddha = detail && items.some((item) => item.kind === "fast" || item.alsoFast) && items.some((item) => item.kind === "shraddha");
  return (
    <>
    {fastAndShraddha ? (
      <p className="quiet practice-note">
        A fast and a shraddha fall on this same morning. If you are keeping the fast, do not eat the rice. Offer it, or let someone who is not fasting eat it. Your own food stays without grain until tomorrow morning.
        <span className="gu" lang="gu">આ સવારે ઉપવાસ અને શ્રાદ્ધ બંને છે. ઉપવાસ રાખો છો તો ભાત ન ખાશો. ધરાવો, અથવા જે ઉપવાસે નથી તેને ખવડાવો. તમારું પોતાનું પારણું બીજા દિવસે સવાર સુધી અનાજ વગરનું રહે.</span>
      </p>
    ) : null}
    <ul className="events">
      {items.map((item) => {
        const practice = practiceFor(item.id);
        return (
          <li key={item.id}>
            <div className="event-title">
              <strong>{item.name}</strong>
              <span className="tags">
                {tags(item).map((tag) => (
                  <span key={tag} className={`tag tag-${tag.toLowerCase()}`}>{tag}</span>
                ))}
              </span>
            </div>
            <p className="gu" lang="gu">{item.nameGu}</p>
            {practice ? (
              detail ? <PracticeBody practice={practice} /> : <p className="quiet">{practice.briefEn}<span className="gu" lang="gu">{practice.briefGu}</span></p>
            ) : item.note ? (
              <p className="quiet">{item.note}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
    </>
  );
}

function PracticeBody({ practice }: { practice: NonNullable<ReturnType<typeof practiceFor>> }) {
  return (
    <div className="practice">
      <section>
        <h3>What this day is</h3>
        <p>{practice.storyEn}</p>
        <p className="gu" lang="gu">{practice.storyGu}</p>
      </section>
      <section>
        <h3>What to do</h3>
        <ul>{practice.pujaEn.map((line) => <li key={line}>{line}</li>)}</ul>
        <ul className="gu" lang="gu">{practice.pujaGu.map((line) => <li key={line}>{line}</li>)}</ul>
      </section>
      <section>
        <h3>What to eat</h3>
        <ul>{practice.foodEn.map((line) => <li key={line}>{line}</li>)}</ul>
        <ul className="gu" lang="gu">{practice.foodGu.map((line) => <li key={line}>{line}</li>)}</ul>
      </section>
      <section>
        <h3>What to skip</h3>
        <ul>{practice.avoidEn.map((line) => <li key={line}>{line}</li>)}</ul>
        <ul className="gu" lang="gu">{practice.avoidGu.map((line) => <li key={line}>{line}</li>)}</ul>
      </section>
    </div>
  );
}
