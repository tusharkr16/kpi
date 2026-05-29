import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "@/layout/TopBar";
import { mockKpis } from "@/mock/mock-data";
import KpiStatusBadge from "@/components/kpi/KpiStatusBadge";
import KpiCategoryBadge from "@/components/kpi/KpiCategoryBadge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Upload, CheckCircle2, AlertTriangle, MessageSquare,
  FileText, Save, Send, RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import type { KpiStatus } from "@/app/kpi/types/kpi-types";

const steps = [
  { id: 1, label: "Fill Form" },
  { id: 2, label: "Attach Docs" },
  { id: 3, label: "Submit" },
  { id: 4, label: "Review" },
  { id: 5, label: "Approved" },
];

const statusToStep: Record<KpiStatus, number> = {
  not_started: 1,
  draft: 2,
  submitted: 4,
  query_raised: 4,
  rejected: 3,
  approved: 5,
};

const mockDocuments = [
  { id: "doc1", name: "Work Order Certificate", required: true, uploaded: true, fileName: "work_order_cert.pdf" },
  { id: "doc2", name: "Expenditure Certificate", required: true, uploaded: true, fileName: "expenditure_cert.pdf" },
  { id: "doc3", name: "Completion Certificate", required: true, uploaded: false, fileName: null },
  { id: "doc4", name: "Photo Evidence", required: false, uploaded: true, fileName: "photos.zip" },
  { id: "doc5", name: "Vendor Invoice", required: true, uploaded: false, fileName: null },
];

const mockQueryThread = {
  text: "Please re-upload the expenditure certificate with revised vendor details and stamp from authorized signatory.",
  raisedBy: "SPD Consultant",
  raisedAt: "June 12, 2025 · 8:30 AM",
};

const KpiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const kpi = mockKpis.find((k) => k._id === id);

  const [formData, setFormData] = useState({
    title: kpi?.title ?? "",
    sanctionedAmount: kpi?.sanctionedAmount?.toString() ?? "",
    expenditure: kpi?.expenditure?.toString() ?? "",
    completionPercent: kpi?.completionPercent?.toString() ?? "",
    remarks: kpi?.remarks ?? "",
  });
  const [replyText, setReplyText] = useState("");
  const [activeTab, setActiveTab] = useState<"form" | "documents" | "query">("form");

  if (!kpi) {
    return (
      <div className="flex flex-col flex-1">
        <TopBar title="KPI Not Found" breadcrumbs={["KPI Management", "Detail"]} />
        <div className="p-6">
          <Button variant="outline" onClick={() => navigate("/kpis")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to KPIs
          </Button>
        </div>
      </div>
    );
  }

  const currentStep = statusToStep[kpi.status];
  const balance = (Number(formData.sanctionedAmount) - Number(formData.expenditure)).toLocaleString("en-IN");

  const handleSaveDraft = () => toast.success("Draft saved successfully");
  const handleSubmit = () => toast.success("KPI submitted for review");
  const handleResubmit = () => toast.success("KPI resubmitted successfully");
  const handleReply = () => {
    if (!replyText.trim()) return toast.error("Please enter a reply");
    toast.success("Reply sent successfully");
    setReplyText("");
  };

  return (
    <div className="flex flex-col flex-1">
      <TopBar title={kpi.title} breadcrumbs={["KPI Management", kpi.title]} />

      <div className="p-6 space-y-5">

        {/* Back + Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/kpis")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base font-bold">{kpi.title}</h1>
                <KpiCategoryBadge category={kpi.category} />
                <KpiStatusBadge status={kpi.status} />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{kpi.monthYear} · Due: {kpi.dueDate}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">Documents</p>
            <p className={cn(
              "text-sm font-semibold tabular-nums",
              kpi.documentsUploaded < kpi.documentsRequired ? "text-amber-600" : "text-green-600"
            )}>
              {kpi.documentsUploaded}/{kpi.documentsRequired} uploaded
            </p>
          </div>
        </div>

        {/* Alert banner for query/rejection */}
        {kpi.status === "query_raised" && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-orange-800">Query Raised by SPD</p>
              <p className="text-sm text-orange-700 mt-0.5">{mockQueryThread.text}</p>
              <p className="text-xs text-orange-500 mt-1">By {mockQueryThread.raisedBy} · {mockQueryThread.raisedAt}</p>
            </div>
            <button
              onClick={() => setActiveTab("query")}
              className="text-xs font-semibold text-orange-700 hover:underline shrink-0"
            >
              Reply →
            </button>
          </div>
        )}

        {kpi.status === "rejected" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">KPI Rejected</p>
              <p className="text-sm text-red-700 mt-0.5">Documents were incomplete. Please re-upload required documents and resubmit.</p>
            </div>
          </div>
        )}

        {/* Stepper */}
        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center">
            {steps.map((step, idx) => {
              const done = step.id < currentStep;
              const active = step.id === currentStep;
              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                      done ? "bg-green-500 border-green-500 text-white" :
                      active ? "bg-primary border-primary text-white" :
                      "bg-white border-muted-foreground/30 text-muted-foreground"
                    )}>
                      {done ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                    </div>
                    <p className={cn(
                      "text-[10px] mt-1 font-medium",
                      active ? "text-primary" : done ? "text-green-600" : "text-muted-foreground"
                    )}>
                      {step.label}
                    </p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={cn(
                      "flex-1 h-0.5 mx-2 mt-[-12px]",
                      done ? "bg-green-400" : "bg-muted"
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted/40 p-1 rounded-lg w-fit">
          {[
            { key: "form", label: "KPI Form", icon: FileText },
            { key: "documents", label: "Documents", icon: Upload },
            { key: "query", label: "Query / Reply", icon: MessageSquare },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                activeTab === key
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
              {key === "query" && kpi.hasOpenQuery && (
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "form" && (
          <div className="bg-white rounded-xl border p-6 space-y-6">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-sm font-medium">KPI Title <span className="text-destructive">*</span></label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="border-t pt-5">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">Financial Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Sanctioned Amount (₹) <span className="text-destructive">*</span></label>
                  <input
                    type="number"
                    value={formData.sanctionedAmount}
                    onChange={(e) => setFormData((p) => ({ ...p, sanctionedAmount: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Expenditure (₹) <span className="text-destructive">*</span></label>
                  <input
                    type="number"
                    value={formData.expenditure}
                    onChange={(e) => setFormData((p) => ({ ...p, expenditure: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Balance (₹)</label>
                  <div className="w-full border rounded-lg px-3 py-2 text-sm bg-muted/30 text-muted-foreground tabular-nums">
                    ₹{balance}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-5">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">Completion</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Completion % <span className="text-destructive">*</span></label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={0} max={100}
                      value={formData.completionPercent}
                      onChange={(e) => setFormData((p) => ({ ...p, completionPercent: e.target.value }))}
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className="font-semibold text-primary text-sm">{formData.completionPercent}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-5">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">Remarks</h3>
              <textarea
                rows={3}
                value={formData.remarks}
                onChange={(e) => setFormData((p) => ({ ...p, remarks: e.target.value }))}
                placeholder="Add any remarks or notes..."
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t">
              <p className="text-xs text-muted-foreground">Auto-saved</p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={handleSaveDraft} className="gap-2">
                  <Save className="w-4 h-4" /> Save Draft
                </Button>
                {kpi.status === "rejected" ? (
                  <Button size="sm" onClick={handleResubmit} className="gap-2">
                    <RefreshCw className="w-4 h-4" /> Resubmit
                  </Button>
                ) : kpi.status !== "approved" && kpi.status !== "submitted" ? (
                  <Button size="sm" onClick={handleSubmit} className="gap-2">
                    <Send className="w-4 h-4" /> Submit for Review
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Required Documents</h3>
              <span className={cn(
                "text-sm font-medium tabular-nums",
                mockDocuments.filter((d) => d.required && !d.uploaded).length > 0
                  ? "text-amber-600" : "text-green-600"
              )}>
                {mockDocuments.filter((d) => d.uploaded).length}/{mockDocuments.length} uploaded
              </span>
            </div>
            <div className="space-y-3">
              {mockDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-colors",
                    doc.uploaded ? "bg-green-50/50 border-green-200" : "bg-amber-50/50 border-amber-200"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                    doc.uploaded ? "bg-green-100" : "bg-amber-100"
                  )}>
                    <FileText className={cn("w-5 h-5", doc.uploaded ? "text-green-600" : "text-amber-600")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{doc.name}</p>
                      {doc.required && <span className="text-xs text-destructive">Required</span>}
                    </div>
                    {doc.uploaded && doc.fileName ? (
                      <p className="text-xs text-muted-foreground mt-0.5">{doc.fileName}</p>
                    ) : (
                      <p className="text-xs text-amber-600 mt-0.5">Not uploaded</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {doc.uploaded ? (
                      <>
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                        </span>
                        <Button variant="outline" size="sm" onClick={() => toast.success("Re-upload triggered")}>
                          Re-upload
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => toast.success("Upload triggered")} className="gap-2">
                        <Upload className="w-4 h-4" /> Upload
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "query" && (
          <div className="bg-white rounded-xl border p-6 space-y-4">
            {kpi.hasOpenQuery ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Query Thread</h3>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">Open</span>
                </div>

                {/* SPD message */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-semibold">{mockQueryThread.raisedBy}</p>
                        <span className="text-xs text-muted-foreground">{mockQueryThread.raisedAt}</span>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-xl rounded-tl-none p-4">
                        <p className="text-sm text-foreground">{mockQueryThread.text}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reply box */}
                <div className="border-t pt-4 space-y-3">
                  <label className="text-sm font-medium">Your Reply</label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Upload className="w-4 h-4" /> Attach Document
                    </Button>
                    <Button size="sm" onClick={handleReply} className="gap-2">
                      <Send className="w-4 h-4" /> Send Reply
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <p className="font-medium">No open queries</p>
                <p className="text-sm text-muted-foreground mt-1">You have no pending queries from SPD for this KPI.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default KpiDetail;
