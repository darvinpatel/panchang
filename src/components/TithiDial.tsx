type DialProps = {
  tithiIndex: number;
  fraction: number;
  elongation: number;
  tithiGu: string;
  tithiEn: string;
  pakshaEn: string;
  endsLabel: string;
};

export function TithiDial({ tithiIndex, fraction, elongation, tithiGu, tithiEn, pakshaEn, endsLabel }: DialProps) {
  const progress = Math.min(30, tithiIndex + fraction);
  const phase = ((elongation % 360) + 360) % 360;
  const waxing = phase < 180;
  const sweep = Math.cos((phase * Math.PI) / 180);
  const rx = Math.max(0.8, Math.abs(sweep) * 18);

  const moon = waxing
    ? `M 0 -18 A 18 18 0 0 1 0 18 A ${rx} 18 0 0 ${sweep > 0 ? 1 : 0} 0 -18`
    : `M 0 -18 A 18 18 0 0 0 0 18 A ${rx} 18 0 0 ${sweep > 0 ? 0 : 1} 0 -18`;

  return (
    <figure className="dial">
      <svg viewBox="0 0 280 280" role="img" aria-label={`${pakshaEn} ${tithiEn}, ending ${endsLabel}`}>
        <circle cx="140" cy="140" r="108" fill="none" stroke="rgba(227,180,90,0.35)" strokeWidth="10" />
        {Array.from({ length: 30 }, (_, index) => {
          const angle = ((index / 30) * Math.PI * 2) - Math.PI / 2;
          const inner = index % 5 === 0 ? 96 : 100;
          return (
            <line
              key={index}
              x1={140 + Math.cos(angle) * inner}
              y1={140 + Math.sin(angle) * inner}
              x2={140 + Math.cos(angle) * 112}
              y2={140 + Math.sin(angle) * 112}
              stroke={index === tithiIndex ? "#e3b45a" : "rgba(246,237,216,0.45)"}
              strokeWidth={index === tithiIndex ? 3 : 1.4}
            />
          );
        })}
        <circle
          cx="140"
          cy="140"
          r="108"
          fill="none"
          stroke="#9d2f2a"
          strokeWidth="10"
          strokeLinecap="butt"
          pathLength={30}
          strokeDasharray={`${progress} 30`}
          transform="rotate(-90 140 140)"
        />
        {Array.from({ length: 24 }, (_, index) => {
          const angle = (index / 24) * Math.PI * 2;
          return <circle key={index} cx={140 + Math.cos(angle) * 126} cy={140 + Math.sin(angle) * 126} r="2.1" fill="rgba(227,180,90,0.8)" />;
        })}
        <circle cx="140" cy="140" r="62" fill="#102820" />
        <path d={moon} transform="translate(140 118)" fill="#f3e2b3" />
      </svg>
      <figcaption>
        <strong lang="gu">{tithiGu}</strong>
        <span>{pakshaEn} {tithiEn}</span>
        <em>until {endsLabel}</em>
      </figcaption>
    </figure>
  );
}
