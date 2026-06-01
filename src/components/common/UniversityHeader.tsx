import { useAuthStore } from "@/store/auth-store";

const UniversityHeader = () => {
  const { user } = useAuthStore();
  const isACS = user?.role?.type === "acs";

  return (
    <div className="bg-white border-b shrink-0 z-50">
      <div className="px-6 py-3 flex items-center justify-between gap-6">

        {/* Left — Govt of Maharashtra seal */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Seal_of_Maharashtra.svg"
            alt="Seal of Maharashtra"
            width={90}
            height={90}
            className="object-contain"
          />
        </div>

        {/* Center — Title block */}
        <div className="flex-1 text-center">
          <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-0.5">
            Government of Maharashtra
          </p>
          {isACS ? (
            <>
              <h1 className="text-lg font-bold text-foreground leading-tight">
                HIGHER AND TECHNICAL EDUCATION DEPARTMENT
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Mantralaya, Mumbai – 400 032, Maharashtra State, India
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                State-Level KPI Monitoring · All State Public Universities
              </p>
            </>
          ) : (
            <>
              <h1 className="text-lg font-bold text-foreground leading-tight">
                SWAMI RAMANAND TEERTH MARATHWADA UNIVERSITY
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Nanded – 431 606, Maharashtra State, India
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Established 17th September 1994 · NAAC Re-accredited 'B++' · UGC U/s 2(f) &amp; 12(B)
              </p>
            </>
          )}
          <div className="mt-1.5 inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-semibold text-primary tracking-wide uppercase">
              KPI Monitoring Dashboard
            </span>
          </div>
        </div>

        {/* Right — Emblem of India */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            alt="Emblem of India"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>

      </div>
    </div>
  );
};

export default UniversityHeader;
