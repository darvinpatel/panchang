export function Toran() {
  return (
    <div className="toran" aria-hidden="true">
      {Array.from({ length: 28 }, (_, index) => (
        <svg key={index} viewBox="0 0 36 22">
          <path d="M18 1c6 4 10 9 8 16-4-3-6-3-8-3s-4 0-8 3C8 10 12 5 18 1z" fill={index % 2 === 0 ? "#1f6b52" : "#9d2f2a"} />
          <path d="M18 4c3.2 3 5.2 6 4.2 10-2-1.6-3-1.6-4.2-1.6S15.8 12.4 13.8 14C12.8 10 14.8 7 18 4z" fill="#e3b45a" />
        </svg>
      ))}
    </div>
  );
}
