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
  rejected: { label: "Rejected", icon: XCircle, className: "text-red-600 bg-red-50 border-red-200" },
  pending: { label: "Pending", icon: Clock, className: "text-amber-600 bg-amber-50 border-amber-200" },
};

const DocumentsPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<KpiCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<IDocument["status"] | "all">("all");

  const filtered = useMemo(() => {
    return mockDocuments.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.kpiTitle.toLowerCase().includes(search.toLowerCase()) ||
        d.tags.some((t) => t.includes(search.toLowerCase()));
      const matchCat = categoryFilter === "all" || d.category === categoryFilter;
      const matchStatus = statusFilter === "all" || d.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [search, categoryFilter, statusFilter]);

  const counts = {
    total: mockDocuments.length,
    accepted: mockDocuments.filter((d) => d.status === "accepted").length,
    rejected: mockDocuments.filter((d) => d.status === "rejected").length,
    pending: mockDocuments.filter((d) => d.status === "pending").length,
  };

  return (
    <div className="flex flex-col flex-1">
      <TopBar title="Document Vault" breadcrumbs={["Documents"]} />

      <div className="p-6 space-y-5">

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Documents", value: counts.total, color: "text-primary", bg: "bg-primary/5" },
            { label: "Accepted", value: counts.accepted, color: "text-green-600", bg: "bg-green-50" },
            { label: "Rejected", value: counts.rejected, color: "text-red-600", bg: "bg-red-50" },
            { label: "Pending Review", value: counts.pending, color: "text-amber-600", bg: "bg-amber-50" },
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
            <option value="all">All Categories</option>
            <option value="construction">Construction</option>
            <option value="equipment">Equipment</option>
            <option value="soft">Soft</option>
            <option value="renovation">Renovation</option>
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

        {/* Document grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((doc) => {
            const sc = statusConfig[doc.status];
            const StatusIcon = sc.icon;
            return (
              <div
                key={doc._id}
                className={cn("bg-white rounded-xl border overflow-hidden hover:shadow-sm transition-shadow", doc.status === "rejected" && "border-red-200")}
              >
                {/* Top strip */}
                <div className={cn("flex items-center justify-between px-4 py-2 border-b text-xs font-medium border", sc.className)}>
                  <div className="flex items-center gap-1.5">
                    <StatusIcon className="w-3.5 h-3.5" />
                    {sc.label}
                  </div>
                  <span className="text-muted-foreground font-normal">v{doc.version}</span>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.fileName} · {doc.fileSize}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">KPI</span>
                      <span className="font-medium truncate max-w-[160px] text-right">{doc.kpiTitle}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <KpiCategoryBadge category={doc.category} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Uploaded</span>
                      <span>{new Date(doc.uploadedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.map((tag) => (
                      <span key={tag} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1 border-t">
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs" onClick={() => toast.info("Preview")}>
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs" onClick={() => toast.info("Download")}>
                      <Download className="w-3.5 h-3.5" /> Download
                    </Button>
                    {doc.status === "rejected" && (
                      <Button size="sm" className="flex-1 gap-1.5 text-xs" onClick={() => toast.success("Re-upload triggered")}>
                        <RefreshCw className="w-3.5 h-3.5" /> Re-upload
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border p-16 text-center">
            <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium">No documents found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters.</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-right">Showing {filtered.length} of {mockDocuments.length} documents</p>
      </div>
    </div>
  );
};

export default DocumentsPage;
