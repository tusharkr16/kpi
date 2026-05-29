import { cn } from "@/lib/utils";
import type { KpiCategory } from "@/app/kpi-engine/schema/kpi-engine-types";

const config: Record<KpiCategory, { label: string; className: string }> = {
  talent_acquisition: { label: "Talent Acquisition", className: "bg-blue-50 text-blue-700 border border-blue-200" },
  industry_partnership: { label: "Industry Partnership", className: "bg-purple-50 text-purple-700 border border-purple-200" },
  digital_transformation: { label: "Digital Transformation", className: "bg-cyan-50 text-cyan-700 border border-cyan-200" },
  governance_reform: { label: "Governance Reform", className: "bg-orange-50 text-orange-700 border border-orange-200" },
  international: { label: "International", className: "bg-green-50 text-green-700 border border-green-200" },
  faculty_development: { label: "Faculty Development", className: "bg-indigo-50 text-indigo-700 border border-indigo-200" },
  enrollment_access: { label: "Enrollment & Access", className: "bg-teal-50 text-teal-700 border border-teal-200" },
  innovation_ecosystem: { label: "Innovation Ecosystem", className: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
  student_welfare: { label: "Student Welfare", className: "bg-pink-50 text-pink-700 border border-pink-200" },
  specialized_programs: { label: "Specialized Programs", className: "bg-rose-50 text-rose-700 border border-rose-200" },
  research: { label: "Research", className: "bg-violet-50 text-violet-700 border border-violet-200" },
  infrastructure: { label: "Infrastructure", className: "bg-slate-50 text-slate-700 border border-slate-200" },
  ai_systems: { label: "AI Systems", className: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  alumni: { label: "Alumni", className: "bg-amber-50 text-amber-700 border border-amber-200" },
};

const KpiCategoryBadge = ({ category }: { category: KpiCategory }) => {
  const cfg = config[category] ?? { label: category, className: "bg-muted text-muted-foreground border" };
  return (
    <span className={cn("px-2 py-0.5 rounded text-xs font-medium", cfg.className)}>
      {cfg.label}
    </span>
  );
};

export default KpiCategoryBadge;
