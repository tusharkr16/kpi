import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "@/layout/TopBar";
import { KPI_SCHEMAS, getKpisByCategory } from "../schema/kpi-schemas";
import KpiCategoryBadge from "@/components/kpi/KpiCategoryBadge";
import type { KpiCategory } from "../schema/kpi-engine-types";
import { Search, ArrowRight, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES: { value: KpiCategory | "all"; label: string }[] = [
  { value: "all", label: "All KPIs" },
  { value: "talent_acquisition", label: "Talent Acquisition" },
  { value: "industry_partnership", label: "Industry Partnership" },
  { value: "digital_transformation", label: "Digital Transformation" },
  { value: "governance_reform", label: "Governance Reform" },
  { value: "international", label: "International" },
  { value: "faculty_development", label: "Faculty Development" },
  { value: "enrollment_access", label: "Enrollment & Access" },
  { value: "innovation_ecosystem", label: "Innovation Ecosystem" },
  { value: "student_welfare", label: "Student Welfare" },
  { value: "specialized_programs", label: "Specialized Programs" },
  { value: "research", label: "Research" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "ai_systems", label: "AI Systems" },
  { value: "alumni", label: "Alumni" },
];

const KpiSelectPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<KpiCategory | "all">("all");

  const filtered = useMemo(() => {
    const base =
      activeCategory === "all" ? KPI_SCHEMAS : getKpisByCategory(activeCategory);
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter(
      (k) =>
        k.title.toLowerCase().includes(q) ||
        k.code.toLowerCase().includes(q) ||
        k.description.toLowerCase().includes(q)
    );
  }, [search, activeCategory]);

  return (
    <div className="flex flex-col flex-1">
      <TopBar
        title="Start New KPI Submission"
        breadcrumbs={["KPI Management", "New Submission"]}
      />

      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Select a KPI to Fill</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Choose one of the 28 PM-USHA KPIs to begin your submission
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {filtered.length} of {KPI_SCHEMAS.length} KPIs
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search KPIs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActiveCategory(value)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                activeCategory === value
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-muted-foreground border-border hover:border-primary hover:text-primary"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* KPI Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <ClipboardList className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No KPIs match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((kpi, i) => (
              <button
                key={kpi.code}
                onClick={() => navigate(`/kpis/submit/${kpi.code}`)}
                className="group text-left bg-white border rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{kpi.code}</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors">
                  {kpi.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                  {kpi.description}
                </p>
                <div className="flex items-center justify-between">
                  <KpiCategoryBadge category={kpi.category} />
                  <span className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Start <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>{kpi.sections.length} sections</span>
                  <span>·</span>
                  <span>{kpi.fields.length} fields</span>
                  <span>·</span>
                  <span className="capitalize">{kpi.frequency}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiSelectPage;
