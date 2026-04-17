export function ConstellationMap({ constellation }) {
  const backgroundStars = [
    { x: 8, y: 12, size: 0.35 }, { x: 14, y: 68, size: 0.45 }, { x: 20, y: 18, size: 0.3 },
    { x: 24, y: 82, size: 0.4 }, { x: 30, y: 12, size: 0.35 }, { x: 34, y: 64, size: 0.55 },
    { x: 40, y: 18, size: 0.3 }, { x: 48, y: 74, size: 0.5 }, { x: 52, y: 14, size: 0.35 },
    { x: 60, y: 88, size: 0.45 }, { x: 66, y: 10, size: 0.4 }, { x: 76, y: 72, size: 0.35 },
    { x: 84, y: 16, size: 0.55 }, { x: 92, y: 64, size: 0.45 }
  ];

  return (
    <svg viewBox="0 0 100 100" className="constellation-map" role="img" aria-label={constellation.name}>
      <defs>
        <linearGradient id="night-sky-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#061320" />
          <stop offset="60%" stopColor="#0a1d31" />
          <stop offset="100%" stopColor="#132436" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="100" rx="10" className="sky-backdrop" />
      <path d="M 0 90 Q 50 72 100 90 L 100 100 L 0 100 Z" className="sky-horizon" />
      {backgroundStars.map((star, index) => (
        <circle key={`bg-${index}`} cx={star.x} cy={star.y} r={star.size} className="background-star" />
      ))}
      {constellation.lines.map(([from, to]) => {
        const first = constellation.stars[from];
        const second = constellation.stars[to];
        return (
          <line
            key={`${from}-${to}`}
            x1={first.x}
            y1={first.y}
            x2={second.x}
            y2={second.y}
            className="constellation-line"
          />
        );
      })}
      {constellation.stars.map((star) => (
        <g key={star.label}>
          <circle cx={star.x} cy={star.y} r={Math.max(1.4, 4 - (star.magnitude || 2.5))} className="constellation-star" />
          <text x={star.x + 2.4} y={star.y - 2.4} className="constellation-label">
            {star.label}
          </text>
        </g>
      ))}
      <circle cx="50" cy="50" r="48" className="sky-vignette" />
    </svg>
  );
}
