import { useState, useMemo } from "react";
import TopBar from "@/layout/TopBar";
import { mockDocuments } from "@/mock/mock-data";
import type { IDocument } from "@/app/kpi/types/kpi-types";
import { cn } from "@/lib/utils";
import { Search, Upload, FileText, CheckCircle2, XCircle, Clock, Eye, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import KpiCategoryBadge from "@/components/kpi/KpiCategoryBadge";
import type { KpiCategory } from "@/app/kpi/types/kpi-types";
import { toast } from "sonner";

const statusConfig = {
  accepted: { label: "Accepted", icon: CheckCircle2, className: "text-green-600 bg-green-50 border-green-200" },
  rejected: { label: "Rejected", icon: XCircle,      className: "text-red-600 bg-red-50 border-red-200" },
  pending:  { label: "Pending",  icon: Clock,         className: "text-amber-600 bg-amber-50 border-amber-200" },
};

const CATEGORY_OPTIONS: { value: KpiCategory | "all"; label: string }[] = [
  { value: "all",                 label: "All Categories" },
  { value: "talent_acquisition",  label: "Talent Acquisition" },
  { value: "industry_partnership",label: "Industry Partnership" },
  { value: "digital_transformation", label: "Digital Transformation" },
  { value: "faculty_development", label: "Faculty Development" },
  { value: "enrollment_access",   label: "Enrollment & Access" },
  { value: "innovation_ecosystem",label: "Innovation Ecosystem" },
  { value: "research",            label: "Research" },
  { value: "governance_reform",   label: "Governance Reform" },
  { value: "international",       label: "International" },
  { value: "student_welfare",     label: "Student Welfare" },
  { value: "specialized_programs",label: "Specialized Programs" },
  { value: "infrastructure",      label: "Infrastructure" },
  { value: "ai_systems",          label: "AI Systems" },
  { value: "alumni",              label: "Alumni" },
  { value: "learning_resources",  label: "Teaching Learning & Resources" },
  { value: "outreach_inclusivity",label: "Outreach & Inclusivity" },
];

const DocumentsPage = () => {
  const [search,         setSearch]         = useState("");
  const [categoryFilter, setCategoryFilter] = useState<KpiCategory | "all">("all");
  const [statusFilter,   setStatusFilter]   = useState<IDocument["status"] | "all">("all");

  const filtered = useMemo(() => {
    return mockDocuments.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.kpiTitle.toLowerCase().includes(search.toLowerCase()) ||
        d.tags.some((t) => t.includes(search.toLowerCase()));
      const matchCat    = categoryFilter === "all" || d.category === categoryFilter;
      const matchStatus = statusFilter   === "all" || d.status   === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [search, categoryFilter, statusFilter]);

  const counts = {
    total:    mockDocuments.length,
    accepted: mockDocuments.filter((d) => d.status === "accepted").length,
    rejected: mockDocuments.filter((d) => d.status === "rejected").length,
    pending:  mockDocuments.filter((d) => d.status === "pending").length,
  };

  return (
    <div className="flex flex-col flex-1">
      <TopBar title="Document Vault" breadcrumbs={["Documents"]} />

      <div className="p-6 space-y-5">

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Documents", value: counts.total,    color: "text-primary",    bg: "bg-primary/5"  },
            { label: "Accepted",        value: counts.accepted, color: "text-green-600",  bg: "bg-green-50"   },
            { label: "Rejected",        value: counts.rejected, color: "text-red-600",    bg: "bg-red-50"     },
            { label: "Pending Review",  value: counts.pending,  color: "text-amber-600",  bg: "bg-amber-50"   },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={cn("rounded-xl border p-4 flex items-center gap-3", bg)}>
              <p className={cn("text-2xl font-bold tabular-nums", color)}>{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, KPI, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as KpiCategory | "all")}
            className="text-sm border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          >
            {CATEGORY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as IDocument["status"] | "all")}
            className="text-sm border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          >
            <option value="all">All Status</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
          <Button size="sm" className="gap-2 ml-auto" onClick={() => toast.info("Upload dialog would open")}>
            <Upload className="w-4 h-4" /> Upload Document
          </Button>
        </div>

        {/* Documents table */}
        <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
          {filtered.length === 0 ? (
            <div className="p-16 text-center">
              <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium">No documents found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/20">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">Document</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">KPI</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Uploaded</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Size</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Tags</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((doc) => {
                    const sc = statusConfig[doc.status];
                    const StatusIcon = sc.icon;
                    return (
                      <tr
                        key={doc._id}
                        className={cn(
                          "border-b last:border-0 hover:bg-muted/10 transition-colors",
                          doc.status === "rejected" && "bg-red-50/30",
                        )}
                      >
                        {/* Document name + file */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-sm truncate max-w-[180px]">{doc.name}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[180px]">{doc.fileName}</p>
                            </div>
                          </div>
                        </td>

                        {/* KPI title */}
                        <td className="px-4 py-3.5">
                          <p className="text-xs text-foreground max-w-[160px] truncate">{doc.kpiTitle}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">v{doc.version}</p>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3.5">
                          <KpiCategoryBadge category={doc.category} />
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3.5">
                          <span className={cn(
                            "inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border",
                            sc.className
                          )}>
                            <StatusIcon className="w-3 h-3" />
                            {sc.label}
                          </span>
                        </td>

                        {/* Uploaded date */}
                        <td className="px-4 py-3.5 text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(doc.uploadedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>

                        {/* File size */}
                        <td className="px-4 py-3.5 text-xs text-muted-foreground whitespace-nowrap">
                          {doc.fileSize}
                        </td>

                        {/* Tags */}
                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.map((tag) => (
                              <span key={tag} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => toast.info("Preview")}
                              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                              title="Preview"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toast.info("Download")}
                              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                              title="Download"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            {doc.status === "rejected" && (
                              <button
                                onClick={() => toast.success("Re-upload triggered")}
                                className="flex items-center gap-1 text-[10px] font-semibold text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
                                title="Re-upload"
                              >
                                <RefreshCw className="w-3 h-3" /> Re-upload
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-right">
          Showing {filtered.length} of {mockDocuments.length} documents
        </p>
      </div>
    </div>
  );
};

export default DocumentsPage;
