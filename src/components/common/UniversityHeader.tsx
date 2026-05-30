const UniversityHeader = () => {
  return (
    <div className="bg-white border-b sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between gap-6">

        {/* Left — Govt of Maharashtra seal */}
        <div className="flex items-center gap-3 shrink-0">
          <MaharashtraSeal />
        </div>

        {/* Center — Title block */}
        <div className="flex-1 text-center">
          <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-0.5">
            Government of Maharashtra
          </p>
          <h1 className="text-lg font-bold text-foreground leading-tight">
            SWAMI RAMANAND TEERTH MARATHWADA UNIVERSITY
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Nanded – 431 606, Maharashtra State, India
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Established 17th September 1994 · NAAC Re-accredited 'B++' · UGC U/s 2(f) &amp; 12(B)
          </p>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-semibold text-primary tracking-wide uppercase">
              KPI Monitoring Dashboard
            </span>
          </div>
        </div>

        {/* Right — SRTMUN emblem */}
        <div className="flex items-center gap-3 shrink-0">
          <SrtmunEmblem />
        </div>

      </div>
    </div>
  );
};

/* ── Maharashtra Government Seal (SVG) ───────────────────────────────────── */
const MaharashtraSeal = () => (
  <div className="flex flex-col items-center gap-1">
    <svg width="64" height="64" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer petal ring */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24;
        const rad = (angle * Math.PI) / 180;
        const cx = 60 + 50 * Math.sin(rad);
        const cy = 60 - 50 * Math.cos(rad);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="5"
            ry="8"
            transform={`rotate(${angle}, ${cx}, ${cy})`}
            fill="#1a1a1a"
          />
        );
      })}
      {/* Inner circle bg */}
      <circle cx="60" cy="60" r="40" fill="white" stroke="#1a1a1a" strokeWidth="1.5" />
      {/* Fountain base */}
      <rect x="44" y="82" width="32" height="4" rx="2" fill="#1a1a1a" />
      <rect x="50" y="78" width="20" height="4" rx="2" fill="#1a1a1a" />
      {/* Fountain bowl */}
      <ellipse cx="60" cy="74" rx="16" ry="5" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="60" y1="69" x2="60" y2="50" stroke="#1a1a1a" strokeWidth="1.5" />
      {/* Water sprays */}
      {[-30, -15, 0, 15, 30].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={i}
            x1="60" y1="50"
            x2={60 + 14 * Math.sin(r)}
            y2={50 - 14 * Math.cos(r)}
            stroke="#1a1a1a"
            strokeWidth="1.2"
          />
        );
      })}
      {/* Lamp top */}
      <circle cx="60" cy="48" r="3" fill="#1a1a1a" />
    </svg>
    <span className="text-[9px] font-semibold text-foreground tracking-tight text-center leading-tight">
      Govt. of<br />Maharashtra
    </span>
  </div>
);

/* ── SRTMUN Emblem (SVG) ─────────────────────────────────────────────────── */
const SrtmunEmblem = () => (
  <div className="flex flex-col items-center gap-1">
    <svg width="64" height="64" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer lotus petals */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 360) / 12;
        const rad = (angle * Math.PI) / 180;
        const cx = 60 + 46 * Math.sin(rad);
        const cy = 60 - 46 * Math.cos(rad);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="7"
            ry="12"
            transform={`rotate(${angle}, ${cx}, ${cy})`}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="1.5"
          />
        );
      })}
      {/* Inner white circle */}
      <circle cx="60" cy="60" r="38" fill="white" stroke="#1a1a1a" strokeWidth="1" />
      {/* Atom nucleus */}
      <circle cx="60" cy="45" r="4" fill="#1a1a1a" />
      {/* Atom orbits */}
      <ellipse cx="60" cy="45" rx="14" ry="6" fill="none" stroke="#1a1a1a" strokeWidth="1.2" />
      <ellipse cx="60" cy="45" rx="14" ry="6" fill="none" stroke="#1a1a1a" strokeWidth="1.2" transform="rotate(60,60,45)" />
      <ellipse cx="60" cy="45" rx="14" ry="6" fill="none" stroke="#1a1a1a" strokeWidth="1.2" transform="rotate(120,60,45)" />
      {/* Electron dots */}
      <circle cx="74" cy="45" r="2" fill="#1a1a1a" />
      <circle cx="53" cy="56" r="2" fill="#1a1a1a" />
      <circle cx="53" cy="34" r="2" fill="#1a1a1a" />
      {/* Eagle body */}
      <ellipse cx="60" cy="72" rx="8" ry="6" fill="#1a1a1a" />
      {/* Eagle wings */}
      <path d="M52 70 Q38 62 28 68 Q36 72 52 74Z" fill="#1a1a1a" />
      <path d="M68 70 Q82 62 92 68 Q84 72 68 74Z" fill="#1a1a1a" />
      {/* Eagle head */}
      <circle cx="60" cy="64" r="5" fill="#1a1a1a" />
      {/* Open book */}
      <path d="M40 85 Q60 80 80 85 L80 95 Q60 90 40 95Z" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      <line x1="60" y1="80" x2="60" y2="95" stroke="#1a1a1a" strokeWidth="1.2" />
    </svg>
    <span className="text-[9px] font-semibold text-foreground tracking-tight text-center leading-tight">
      SRTMU<br />Nanded
    </span>
  </div>
);

export default UniversityHeader;
