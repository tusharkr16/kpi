import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "@/layout/TopBar";
import { getKpiSchema } from "../schema/kpi-schemas";
import { Search, BookOpen, FlaskConical, GraduationCap, ArrowRight, ClipboardList, Users, HeartHandshake, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const KPI_LIST = [
  {
    code: "KPI_02", number: 2,
    title: "Professors of Practice",
    subtitle: "Track industry professionals appointed as Professors of Practice",
    tab: "Research & Professional Practice",
    icon: FlaskConical,
    gradient: "from-violet-500 to-violet-600",
    bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-500",
  },
  {
    code: "KPI_03", number: 3,
    title: "Mission Mode Faculty Recruitment",
    subtitle: "Track rapid faculty hiring against vacancies under mission mode",
    tab: "Teaching Learning & Resources",
    icon: BookOpen,
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500",
  },
  {
    code: "KPI_05", number: 5,
    title: "Curriculum Updates in Emerging Areas",
    subtitle: "Track programs updated with AI, ML, IoT, Blockchain, and other emerging tech",
    tab: "Teaching Learning & Resources",
    icon: BookOpen,
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500",
  },
  {
    code: "KPI_07", number: 7,
    title: "Apprenticeship Embedded Degree Programs",
    subtitle: "Track degree programs with embedded apprenticeship components",
    tab: "Graduation Outcome",
    icon: GraduationCap,
    gradient: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500",
  },
  // ── Learning & Resources ───────────────────────────────────────
  {
    code: "KPI_08", number: 8,
    title: "Skill Course Integration (UGC Guidelines)",
    subtitle: "Track UGC-guideline skill courses, enrolment, and industry certifications",
    tab: "Teaching Learning & Resources",
    icon: BookOpen,
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500",
  },
  {
    code: "KPI_11", number: 11,
    title: "Train at Least 25% Faculty on Emerging Technologies",
    subtitle: "Track faculty training coverage on AI/ML, Cloud, and other emerging tech",
    tab: "Teaching Learning & Resources",
    icon: BookOpen,
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500",
  },
  {
    code: "KPI_14", number: 14,
    title: "Ensure >25% Students Enrolled in Skill Courses",
    subtitle: "Simplified tracking to verify ≥25% skill course enrolment target is met",
    tab: "Teaching Learning & Resources",
    icon: BookOpen,
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500",
  },
  // ── Outreach & Inclusivity ─────────────────────────────────────
  {
    code: "KPI_16", number: 16,
    title: "Increase International Students by 20%",
    subtitle: "Track 20% year-on-year growth of international student enrolments",
    tab: "Outreach & Inclusivity",
    icon: Users,
    gradient: "from-orange-500 to-orange-600",
    bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500",
  },
  {
    code: "KPI_21", number: 21,
    title: "Alumni Engagement & Endowment Development – Refined",
    subtitle: "Track alumni database coverage, donations, mentorship, and endowment growth",
    tab: "Outreach & Inclusivity",
    icon: HeartHandshake,
    gradient: "from-orange-500 to-orange-600",
    bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500",
  },
  {
    code: "KPI_26", number: 26,
    title: "Student Mental Health & Well-being (AI-enabled)",
    subtitle: "AI screening, counselling infrastructure, and student well-being outcomes",
    tab: "Outreach & Inclusivity",
    icon: Brain,
    gradient: "from-orange-500 to-orange-600",
    bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500",
  },
];

const KpiSelectPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = KPI_LIST.filter(
    (k) =>
      k.title.toLowerCase().includes(search.toLowerCase()) ||
      k.tab.toLowerCase().includes(search.toLowerCase()) ||
      String(k.number).includes(search)
  );

  return (
    <div className="flex flex-col flex-1">
      <TopBar title="New KPI Submission" breadcrumbs={["KPI Management", "New Submission"]} />

      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold">Select a KPI to Submit</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Choose one of the available KPIs to begin filling your data</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search KPI..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg pl-9 pr-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 w-52"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-[56px_1fr_200px_100px_90px_120px] border-b bg-muted/30 px-4 py-3 text-xs font-semibold text-muted-foreground gap-3 items-center">
            <span>No.</span>
            <span>KPI Title</span>
            <span>Category Tab</span>
            <span>Frequency</span>
            <span>Fields</span>
            <span className="text-right">Action</span>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
              <ClipboardList className="w-8 h-8 opacity-30" />
              <p className="text-sm">No KPIs match your search.</p>
            </div>
          ) : (
            <div className="divide-y">
              {filtered.map((kpi) => {
                const schema = getKpiSchema(kpi.code);
                const Icon: LucideIcon = kpi.icon;
                const isHovered = hovered === kpi.code;

                return (
                  <div
                    key={kpi.code}
                    onClick={() => navigate(`/kpis/submit/${kpi.code}`)}
                    onMouseEnter={() => setHovered(kpi.code)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      "grid grid-cols-[56px_1fr_200px_100px_90px_120px] px-4 py-4 gap-3 items-center cursor-pointer transition-colors",
                      isHovered ? "bg-primary/5" : "hover:bg-muted/20"
                    )}
                  >
                    {/* KPI Number */}
                    <div>
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br shrink-0",
                        kpi.gradient
                      )}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Title + subtitle */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", kpi.bg, kpi.text)}>
                          KPI {kpi.number}
                        </span>
                      </div>
                      <p className={cn("text-sm font-semibold leading-snug transition-colors", isHovered ? "text-primary" : "text-foreground")}>
                        {kpi.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{kpi.subtitle}</p>
                    </div>

                    {/* Tab */}
                    <div>
                      <span className={cn("inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full", kpi.bg, kpi.text)}>
                        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", kpi.dot)} />
                        {kpi.tab}
                      </span>
                    </div>

                    {/* Frequency */}
                    <div>
                      <span className="text-xs font-medium capitalize text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                        {schema?.frequency ?? "—"}
                      </span>
                    </div>

                    {/* Fields count */}
                    <div className="text-sm font-semibold tabular-nums text-foreground">
                      {schema?.fields.length ?? 0}
                      <span className="text-xs font-normal text-muted-foreground ml-1">fields</span>
                    </div>

                    {/* Action */}
                    <div className="flex justify-end">
                      <span className={cn(
                        "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all",
                        isHovered
                          ? "bg-primary text-white"
                          : cn(kpi.bg, kpi.text)
                      )}>
                        Fill Now <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-right">
          Showing {filtered.length} of {KPI_LIST.length} KPIs available for submission
        </p>
      </div>
    </div>
  );
};

export default KpiSelectPage;
