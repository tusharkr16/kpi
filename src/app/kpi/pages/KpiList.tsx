import { useState, useMemo } from "react";
import TopBar from "@/layout/TopBar";
import { mockKpis } from "@/mock/mock-data";
import KpiStatusBadge from "@/components/kpi/KpiStatusBadge";
import KpiCategoryBadge from "@/components/kpi/KpiCategoryBadge";
import type { KpiStatus } from "@/app/kpi/types/kpi-types";
import type { KpiCategory } from "@/app/kpi-engine/schema/kpi-engine-types";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, Plus, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EmptyState from "@/components/common/EmptyState";

const ALL = "all";

const statusOptions: { label: string; value: KpiStatus | "all" }[] = [
  { label: "All Status", value: ALL },
  { label: "Not Started", value: "not_started" },
  { label: "Draft", value: "draft" },
  { label: "Submitted", value: "submitted" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Query Raised", value: "query_raised" },
];

const categoryOptions: { label: string; value: KpiCategory | "all" }[] = [
  { label: "All Categories", value: ALL },
  { label: "Talent Acquisition", value: "talent_acquisition" },
  { label: "Industry Partnership", value: "industry_partnership" },
  { label: "Digital Transformation", value: "digital_transformation" },
  { label: "Governance Reform", value: "governance_reform" },
  { label: "International", value: "international" },
  { label: "Faculty Development", value: "faculty_development" },
  { label: "Enrollment & Access", value: "enrollment_access" },
  { label: "Innovation Ecosystem", value: "innovation_ecosystem" },
  { label: "Student Welfare", value: "student_welfare" },
  { label: "Specialized Programs", value: "specialized_programs" },
  { label: "Research", value: "research" },
  { label: "Infrastructure", value: "infrastructure" },
  { label: "AI Systems", value: "ai_systems" },
  { label: "Alumni", value: "alumni" },
];

const actionLabel: Record<KpiStatus, string> = {
  not_started: "Fill Now",
  draft: "Continue",
  submitted: "View",
  approved: "View",
  rejected: "Resubmit",
  query_raised: "Reply",
};

const KpiList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<KpiStatus | "all">(ALL);
  const [categoryFilter, setCategoryFilter] = useState<KpiCategory | "all">(ALL);

  const filtered = useMemo(() => {
    return mockKpis.filter((k) => {
      const matchSearch = k.title.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === ALL || k.status === statusFilter;
      const matchCat = categoryFilter === ALL || k.category === categoryFilter;
      return matchSearch && matchStatus && matchCat;
    });
  }, [search, statusFilter, categoryFilter]);

  const counts = useMemo(() => ({
    total: mockKpis.length,
    approved: mockKpis.filter((k) => k.status === "approved").length,
    pending: mockKpis.filter((k) => ["not_started", "draft"].includes(k.status)).length,
    needsAction: mockKpis.filter((k) => ["rejected", "query_raised"].includes(k.status)).length,
  }), []);

  return (
    <div className="flex flex-col flex-1">
      <TopBar title="KPI Management" breadcrumbs={["KPI Management"]} />

      <div className="p-6 space-y-5">

        {/* Summary pills */}
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Total", value: counts.total, color: "bg-blue-50 text-blue-700 border-blue-200" },
            { label: "Approved", value: counts.approved, color: "bg-green-50 text-green-700 border-green-200" },
            { label: "Pending", value: counts.pending, color: "bg-amber-50 text-amber-700 border-amber-200" },
            { label: "Needs Action", value: counts.needsAction, color: "bg-red-50 text-red-700 border-red-200" },
          ].map(({ label, value, color }) => (
            <div key={label} className={cn("px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2", color)}>
              <span className="text-lg font-bold tabular-nums">{value}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Filters bar */}
        <div className="bg-white rounded-xl border p-4 flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search KPIs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as KpiStatus | "all")}
              className="text-sm border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            >
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as KpiCategory | "all")}
            className="text-sm border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          >
            {categoryOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <Button size="sm" className="ml-auto flex items-center gap-2" onClick={() => navigate("/kpis/new")}>
            <Plus className="w-4 h-4" />
            Add KPI
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border overflow-hidden">
          {filtered.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No KPIs found"
              description="Try adjusting your search or filters."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground w-8">#</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">KPI Name</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Progress</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Documents</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Due Date</th>
                    <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((kpi, idx) => (
                    <tr
                      key={kpi._id}
                      className={cn(
                        "border-b last:border-0 hover:bg-muted/20 transition-colors cursor-pointer",
                        kpi.status === "rejected" && "bg-red-50/40",
                        kpi.status === "query_raised" && "bg-orange-50/40",
                      )}
                      onClick={() => navigate(`/kpis/${kpi._id}`)}
                    >
                      <td className="px-5 py-3.5 text-xs text-muted-foreground tabular-nums">{idx + 1}</td>
                      <td className="px-4 py-3.5 max-w-[220px]">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{kpi.title}</p>
                          {kpi.hasOpenQuery && (
                            <MessageSquare className="w-3.5 h-3.5 text-orange-500 shrink-0" aria-label="Open Query" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{kpi.monthYear}</p>
                      </td>
                      <td className="px-4 py-3.5"><KpiCategoryBadge category={kpi.category} /></td>
                      <td className="px-4 py-3.5"><KpiStatusBadge status={kpi.status} /></td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                kpi.completionPercent === 100 ? "bg-green-500" :
                                kpi.completionPercent >= 60 ? "bg-primary" : "bg-amber-400"
                              )}
                              style={{ width: `${kpi.completionPercent}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground tabular-nums">{kpi.completionPercent}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={cn(
                          "text-xs tabular-nums font-medium",
                          kpi.documentsUploaded < kpi.documentsRequired ? "text-amber-600" : "text-green-600"
                        )}>
                          {kpi.documentsUploaded}/{kpi.documentsRequired}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground tabular-nums">{kpi.dueDate}</td>
                      <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => navigate(`/kpis/${kpi._id}`)}
                          className={cn(
                            "text-xs font-semibold px-3 py-1.5 rounded-md transition-colors",
                            kpi.status === "rejected"
                              ? "bg-red-100 text-red-700 hover:bg-red-200"
                              : kpi.status === "query_raised"
                              ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                              : kpi.status === "approved"
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-primary/10 text-primary hover:bg-primary/20"
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
          Showing {filtered.length} of {mockKpis.length} KPIs
        </p>
      </div>
    </div>
  );
};

export default KpiList;
