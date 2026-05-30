import { useNavigate } from "react-router-dom";
import TopBar from "@/layout/TopBar";
import { getKpiSchema } from "../schema/kpi-schemas";
import { ArrowRight, BookOpen, FlaskConical, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const KPI_LIST = [
  {
    code: "KPI_02",
    number: 2,
    title: "Professors of Practice",
    subtitle: "Track industry professionals appointed as Professors of Practice",
    tab: "Research & Professional Practice",
    icon: FlaskConical,
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    sections: ["Input Fields", "Process / Monitoring Fields", "Output Fields"],
  },
  {
    code: "KPI_03",
    number: 3,
    title: "Mission Mode Faculty Recruitment",
    subtitle: "Track rapid faculty hiring against vacancies under mission mode",
    tab: "Teaching Learning & Resources",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    sections: ["Input Fields", "Process / Monitoring Fields", "Output Fields"],
  },
  {
    code: "KPI_05",
    number: 5,
    title: "Curriculum Updates in Emerging Areas",
    subtitle: "Track programs updated with AI, ML, IoT, Blockchain, and other emerging tech",
    tab: "Teaching Learning & Resources",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    sections: ["Input Fields", "Process / Monitoring Fields", "Output Fields"],
  },
  {
    code: "KPI_07",
    number: 7,
    title: "Apprenticeship Embedded Degree Programs",
    subtitle: "Track degree programs with embedded apprenticeship components",
    tab: "Graduation Outcome",
    icon: GraduationCap,
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    sections: ["Input Fields", "Process / Monitoring Fields", "Output Fields"],
  },
];

const KpiSelectPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1">
      <TopBar
        title="New KPI Submission"
        breadcrumbs={["KPI Management", "New Submission"]}
      />

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Select a KPI</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Choose a KPI to fill and submit your data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {KPI_LIST.map((kpi) => {
            const schema = getKpiSchema(kpi.code);
            const Icon = kpi.icon;
            return (
              <button
                key={kpi.code}
                onClick={() => navigate(`/kpis/submit/${kpi.code}`)}
                className={cn(
                  "group text-left bg-white border-2 rounded-2xl p-0 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5",
                  kpi.border
                )}
              >
                {/* Gradient top strip */}
                <div className={cn("h-1.5 w-full bg-gradient-to-r", kpi.color)} />

                <div className="p-5">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shrink-0", kpi.color)}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", kpi.bg, kpi.text)}>
                            KPI {kpi.number}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{kpi.tab}</span>
                        </div>
                        <h3 className={cn("text-sm font-bold leading-snug group-hover:transition-colors", `group-hover:${kpi.text}`)}>
                          {kpi.title}
                        </h3>
                      </div>
                    </div>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0",
                      kpi.bg
                    )}>
                      <ArrowRight className={cn("w-4 h-4", kpi.text)} />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {kpi.subtitle}
                  </p>

                  {/* Stepper preview */}
                  <div className="flex items-center gap-1.5">
                    {kpi.sections.map((section, i) => (
                      <div key={i} className="flex items-center gap-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 min-w-0 flex-1">
                          <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0", kpi.bg, kpi.text)}>
                            {i + 1}
                          </div>
                          <span className="text-[10px] text-muted-foreground truncate">{section}</span>
                        </div>
                        {i < kpi.sections.length - 1 && (
                          <div className="w-4 h-px bg-border shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-3 border-t flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{schema?.fields.length ?? 0} fields · {schema?.documents.length ?? 0} documents required</span>
                    <span className="capitalize font-medium">{schema?.frequency}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KpiSelectPage;
