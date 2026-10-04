import type { Observance } from "@/lib/observances";

function tags(item: Observance): string[] {
  const list: string[] = [];
  if (item.kind === "festival" || item.alsoFestival) list.push("Festival");
  if (item.kind === "fast" || item.alsoFast) list.push("Fast");
  if (item.kind === "shraddha") list.push("Shraddha");
  return list;
}

export function ObserveList({ items }: { items: Observance[] }) {
  if (items.length === 0) {
    return <p className="quiet">No festival or fast is tied to this sunrise.</p>;
  }
  return (
    <ul className="events">
      {items.map((item) => (
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
          {item.note ? <p className="quiet">{item.note}</p> : null}
        </li>
      ))}
    </ul>
  );
}
