import { useState, useMemo } from "react";
import TopBar from "@/layout/TopBar";
import { mockKpis } from "@/mock/mock-data";
import KpiStatusBadge from "@/components/kpi/KpiStatusBadge";
import type { KpiStatus, KpiTab } from "@/app/kpi/types/kpi-types";
import { useNavigate } from "react-router-dom";
import {
  Search, Plus, FileText, MessageSquare,
  BookOpen, FlaskConical, GraduationCap, Users, Eye, Landmark, ScrollText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EmptyState from "@/components/common/EmptyState";
import type { LucideIcon } from "lucide-react";

interface TabConfig {
  key: KpiTab;
  label: string;
  icon: LucideIcon;
  gradient: string;
  activeText: string;
  activeBg: string;
  pill: string;
  ring: string;
  kpiNumBg: string;
}

const TABS: TabConfig[] = [
  {
    key: "teaching",
    label: "Teaching Learning & Resources",
    icon: BookOpen,
    gradient: "from-blue-500 to-blue-600",
    activeText: "text-blue-700",
    activeBg: "bg-blue-50 border-blue-200",
    pill: "bg-blue-100 text-blue-700",
    ring: "ring-blue-300",
    kpiNumBg: "bg-blue-100 text-blue-700",
  },
  {
    key: "research",
    label: "Research & Professional Practice",
    icon: FlaskConical,
    gradient: "from-violet-500 to-violet-600",
    activeText: "text-violet-700",
    activeBg: "bg-violet-50 border-violet-200",
    pill: "bg-violet-100 text-violet-700",
    ring: "ring-violet-300",
    kpiNumBg: "bg-violet-100 text-violet-700",
  },
  {
    key: "graduation",
    label: "Graduation Outcome",
    icon: GraduationCap,
    gradient: "from-emerald-500 to-emerald-600",
    activeText: "text-emerald-700",
    activeBg: "bg-emerald-50 border-emerald-200",
    pill: "bg-emerald-100 text-emerald-700",
    ring: "ring-emerald-300",
    kpiNumBg: "bg-emerald-100 text-emerald-700",
  },
  {
    key: "outreach",
    label: "Outreach & Inclusivity",
    icon: Users,
    gradient: "from-orange-500 to-orange-600",
    activeText: "text-orange-700",
    activeBg: "bg-orange-50 border-orange-200",
    pill: "bg-orange-100 text-orange-700",
    ring: "ring-orange-300",
    kpiNumBg: "bg-orange-100 text-orange-700",
  },
  {
    key: "perception",
    label: "Perception",
    icon: Eye,
    gradient: "from-pink-500 to-pink-600",
    activeText: "text-pink-700",
    activeBg: "bg-pink-50 border-pink-200",
    pill: "bg-pink-100 text-pink-700",
    ring: "ring-pink-300",
    kpiNumBg: "bg-pink-100 text-pink-700",
  },
  {
    key: "governance",
    label: "Governance & Digital Transformation",
    icon: Landmark,
    gradient: "from-teal-500 to-teal-600",
    activeText: "text-teal-700",
    activeBg: "bg-teal-50 border-teal-200",
    pill: "bg-teal-100 text-teal-700",
    ring: "ring-teal-300",
    kpiNumBg: "bg-teal-100 text-teal-700",
  },
  {
    key: "description",
    label: "Description",
    icon: ScrollText,
    gradient: "from-amber-500 to-amber-600",
    activeText: "text-amber-700",
    activeBg: "bg-amber-50 border-amber-200",
    pill: "bg-amber-100 text-amber-700",
    ring: "ring-amber-300",
    kpiNumBg: "bg-amber-100 text-amber-700",
  },
];

const actionLabel: Record<KpiStatus, string> = {
  not_started: "Fill Now",
  draft:       "Continue",
  submitted:   "View",
  approved:    "View",
  rejected:    "Resubmit",
  query_raised:"Reply",
};

const actionClass: Record<KpiStatus, string> = {
  not_started: "bg-primary/10 text-primary hover:bg-primary/20",
  draft:       "bg-primary/10 text-primary hover:bg-primary/20",
  submitted:   "bg-blue-100 text-blue-700 hover:bg-blue-200",
  approved:    "bg-green-100 text-green-700 hover:bg-green-200",
  rejected:    "bg-red-100 text-red-700 hover:bg-red-200",
  query_raised:"bg-orange-100 text-orange-700 hover:bg-orange-200",
};

const KpiList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<KpiTab>("teaching");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<KpiStatus | "all">("all");

  const tabKpis = useMemo(
    () => mockKpis.filter((k) => k.tab === activeTab),
    [activeTab]
  );

  const filtered = useMemo(() => {
    return tabKpis.filter((k) => {
      const matchSearch =
        k.title.toLowerCase().includes(search.toLowerCase()) ||
        String(k.kpiNumber).includes(search);
      const matchStatus = statusFilter === "all" || k.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [tabKpis, search, statusFilter]);

  const tabCounts = useMemo(() =>
    TABS.map(({ key }) => {
      const kpis = mockKpis.filter((k) => k.tab === key);
      return {
        key,
        total:    kpis.length,
        approved: kpis.filter((k) => k.status === "approved").length,
        pending:  kpis.filter((k) => ["not_started", "draft"].includes(k.status)).length,
        action:   kpis.filter((k) => ["rejected", "query_raised"].includes(k.status)).length,
      };
    }), []);

  const activeConfig = TABS.find((t) => t.key === activeTab)!;
  const current = tabCounts.find((t) => t.key === activeTab)!;

  return (
    <div className="flex flex-col flex-1">
      <TopBar title="KPI Management" breadcrumbs={["KPI Management"]} />

      <div className="p-6 space-y-5">

        {/* ── Colorful tab cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-7 gap-3">
          {TABS.map((tab) => {
            const tc = tabCounts.find((t) => t.key === tab.key)!;
            const isActive = activeTab === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setSearch(""); setStatusFilter("all"); }}
                className={cn(
                  "relative flex flex-col items-center gap-2 rounded-2xl px-3 py-4 text-center transition-all duration-200",
                  isActive
                    ? `bg-gradient-to-br ${tab.gradient} text-white shadow-lg scale-105 ring-4 ring-white ring-offset-2`
                    : "bg-white border hover:border-transparent hover:shadow-md hover:scale-102 text-foreground"
                )}
              >
                {/* Icon circle */}
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                  isActive ? "bg-white/20" : `bg-gradient-to-br ${tab.gradient}`
                )}>
                  <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-white")} />
                </div>

                {/* Label */}
                <p className={cn(
                  "text-[11px] font-semibold leading-tight",
                  isActive ? "text-white" : "text-foreground"
                )}>
                  {tab.label}
                </p>

                {/* KPI count pill */}
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full",
                  isActive ? "bg-white/25 text-white" : tab.pill
                )}>
                  {tc.total} KPIs
                </span>

                {/* Needs-action red dot */}
                {tc.action > 0 && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Active tab content ─────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">

          {/* Header bar with active tab color */}
          <div className={cn("px-5 py-3 flex items-center justify-between bg-gradient-to-r", activeConfig.gradient)}>
            <div className="flex items-center gap-3">
              <activeConfig.icon className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">{activeConfig.label}</span>
              {/* mini stats */}
              <div className="flex items-center gap-3 ml-2">
                {[
                  { label: "Total",    value: current.total,    bg: "bg-white/20" },
                  { label: "Approved", value: current.approved, bg: "bg-white/20" },
                  { label: "Pending",  value: current.pending,  bg: "bg-white/20" },
                  ...(current.action > 0
                    ? [{ label: "Action Needed", value: current.action, bg: "bg-red-500/60" }]
                    : []),
                ].map(({ label, value, bg }) => (
                  <span key={label} className={cn("text-[10px] font-semibold text-white px-2 py-0.5 rounded-full flex items-center gap-1", bg)}>
                    <span className="text-sm font-bold">{value}</span> {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/60" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-white/20 text-white placeholder:text-white/60 border border-white/30 rounded-lg outline-none focus:bg-white/30 w-40"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as KpiStatus | "all")}
                className="text-xs bg-white/20 text-white border border-white/30 rounded-lg px-2 py-1.5 outline-none focus:bg-white/30"
              >
                <option value="all" className="text-foreground bg-white">All Status</option>
                <option value="not_started" className="text-foreground bg-white">Not Started</option>
                <option value="draft" className="text-foreground bg-white">Draft</option>
                <option value="submitted" className="text-foreground bg-white">Submitted</option>
                <option value="approved" className="text-foreground bg-white">Approved</option>
                <option value="rejected" className="text-foreground bg-white">Rejected</option>
                <option value="query_raised" className="text-foreground bg-white">Query Raised</option>
              </select>
              <Button
                size="sm"
                className="gap-1.5 text-xs h-8 bg-white/20 hover:bg-white/30 text-white border border-white/30"
                onClick={() => navigate("/kpis/new")}
              >
                <Plus className="w-3.5 h-3.5" /> New
              </Button>
            </div>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <EmptyState icon={FileText} title="No KPIs found" description="Try adjusting your search or status filter." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/20">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground w-20">KPI No.</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">KPI Title</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Progress</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Docs</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Due Date</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((kpi) => (
                    <tr
                      key={kpi._id}
                      className={cn(
                        "border-b last:border-0 hover:bg-muted/20 transition-colors cursor-pointer",
                        kpi.status === "rejected"     && "bg-red-50/40",
                        kpi.status === "query_raised" && "bg-orange-50/40",
                      )}
                      onClick={() => navigate(`/kpis/${kpi._id}`)}
                    >
                      <td className="px-5 py-3.5">
                        <span className={cn(
                          "inline-flex items-center justify-center w-10 h-7 rounded-md text-xs font-bold",
                          activeConfig.kpiNumBg
                        )}>
                          {kpi.kpiNumber}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 max-w-xs">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm leading-snug">{kpi.title}</p>
                          {kpi.hasOpenQuery && (
                            <MessageSquare className="w-3.5 h-3.5 text-orange-500 shrink-0" aria-label="Open Query" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{kpi.monthYear}</p>
                      </td>
                      <td className="px-4 py-3.5"><KpiStatusBadge status={kpi.status} /></td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                kpi.completionPercent === 100 ? "bg-green-500" :
                                kpi.completionPercent >= 60   ? "bg-primary"   : "bg-amber-400"
                              )}
                              style={{ width: `${kpi.completionPercent}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground tabular-nums w-8">
                            {kpi.completionPercent}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={cn(
                          "text-xs font-semibold tabular-nums",
                          kpi.documentsUploaded < kpi.documentsRequired ? "text-amber-600" : "text-green-600"
                        )}>
                          {kpi.documentsUploaded}/{kpi.documentsRequired}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground tabular-nums">
                        {kpi.dueDate}
                      </td>
                      <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => navigate(`/kpis/${kpi._id}`)}
                          className={cn(
                            "text-xs font-semibold px-3 py-1.5 rounded-md transition-colors",
                            actionClass[kpi.status]
                          )}
                        >
                          {actionLabel[kpi.status]}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-right">
          Showing {filtered.length} of {tabKpis.length} KPIs in this tab
        </p>
      </div>
    </div>
  );
};

export default KpiList;
