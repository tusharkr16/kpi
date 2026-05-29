import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "@/layout/TopBar";
import { getKpiSchema } from "../schema/kpi-schemas";
import { KpiFormRenderer } from "../components/KpiFormRenderer";
import KpiCategoryBadge from "@/components/kpi/KpiCategoryBadge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  FileText,
  MessageSquare,
  ClipboardList,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currentYear = new Date().getFullYear();
const YEARS = [currentYear - 1, currentYear, currentYear + 1];

type TabType = "form" | "documents" | "query";

interface UploadedDoc {
  docId: string;
  fileName: string;
  status: "pending" | "accepted" | "rejected";
}

const KpiSubmitPage = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const schema = code ? getKpiSchema(code) : null;

  const [activeTab, setActiveTab] = useState<TabType>("form");
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});
  const [status, setStatus] = useState<"draft" | "submitted">("draft");
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
  const [queryText, setQueryText] = useState("");
  const [queryMessages, setQueryMessages] = useState<{ text: string; from: "user" | "spd"; time: string }[]>([]);

  const handleSave = useCallback((values: Record<string, unknown>) => {
    setFormValues(values);
    // silent autosave — no toast
  }, []);

  const handleSubmit = useCallback((values: Record<string, unknown>) => {
    setFormValues(values);
    setStatus("submitted");
    toast.success("KPI submitted successfully! It is now under review.");
  }, []);

  const handleUpload = (docId: string) => {
    const fake: UploadedDoc = { docId, fileName: `document_${docId}.pdf`, status: "pending" };
    setUploadedDocs((prev) => {
      const idx = prev.findIndex((d) => d.docId === docId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = fake;
        return next;
      }
      return [...prev, fake];
    });
    toast.success("Document uploaded successfully");
  };

  const handleSendQuery = () => {
    if (!queryText.trim()) return;
    setQueryMessages((prev) => [
      ...prev,
      { text: queryText, from: "user", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setQueryText("");
    setTimeout(() => {
      setQueryMessages((prev) => [
        ...prev,
        { text: "Thank you for your message. Our SPD team will review it shortly.", from: "spd", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 1200);
  };

  if (!schema) {
    return (
      <div className="flex flex-col flex-1">
        <TopBar title="KPI Not Found" breadcrumbs={["KPI Management"]} />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <AlertCircle className="w-12 h-12 opacity-30" />
          <p>KPI schema not found for code: {code}</p>
          <Button variant="outline" onClick={() => navigate("/kpis/new")}>
            Back to KPI List
          </Button>
        </div>
      </div>
    );
  }

  const tabs: { key: TabType; label: string; icon: React.ElementType }[] = [
    { key: "form", label: "KPI Form", icon: ClipboardList },
    { key: "documents", label: `Documents (${schema.documents.length})`, icon: FileText },
    { key: "query", label: `Queries (${queryMessages.length})`, icon: MessageSquare },
  ];

  const requiredDocs = schema.documents.filter((d) => d.required);
  const uploadedRequired = requiredDocs.filter((d) => uploadedDocs.some((u) => u.docId === d.docId));

  return (
    <div className="flex flex-col flex-1">
      <TopBar
        title={schema.shortTitle}
        breadcrumbs={["KPI Management", "New Submission", schema.code]}
      />

      <div className="p-6 space-y-5">
        {/* Header card */}
        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <button
                onClick={() => navigate("/kpis/new")}
                className="mt-0.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{schema.code}</span>
                  <KpiCategoryBadge category={schema.category} />
                  {status === "submitted" && (
                    <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded px-2 py-0.5 font-medium">
                      <Clock className="w-3 h-3" /> Under Review
                    </span>
                  )}
                  {status === "draft" && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted border rounded px-2 py-0.5 font-medium">
                      Draft
                    </span>
                  )}
                </div>
                <h2 className="text-base font-semibold">{schema.title}</h2>
                <p className="text-sm text-muted-foreground mt-0.5 max-w-xl">{schema.description}</p>
              </div>
            </div>

            {/* Period selector */}
            <div className="flex items-center gap-2 shrink-0">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                disabled={status === "submitted"}
                className="border rounded px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-60"
              >
                {MONTHS.map((m) => <option key={m}>{m}</option>)}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                disabled={status === "submitted"}
                className="border rounded px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-60"
              >
                {YEARS.map((y) => <option key={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 pt-4 border-t flex items-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className={cn("w-2 h-2 rounded-full", status === "submitted" ? "bg-amber-500" : "bg-muted-foreground/30")} />
              Form: <span className={cn("font-medium", status === "submitted" ? "text-amber-600" : "text-foreground")}>
                {status === "submitted" ? "Submitted" : "Draft"}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              {uploadedRequired.length === requiredDocs.length && requiredDocs.length > 0
                ? <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                : <span className="w-2 h-2 rounded-full bg-muted-foreground/30 inline-block" />}
              Documents: <span className="font-medium text-foreground">{uploadedRequired.length}/{requiredDocs.length} required</span>
            </span>
            <span>Period: <span className="font-medium text-foreground">{selectedMonth} {selectedYear}</span></span>
            <span>Frequency: <span className="font-medium text-foreground capitalize">{schema.frequency}</span></span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="flex border-b">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                  activeTab === key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* FORM TAB */}
            {activeTab === "form" && (
              <KpiFormRenderer
                schema={schema}
                initialValues={formValues}
                onSave={handleSave}
                onSubmit={handleSubmit}
                readOnly={status === "submitted"}
              />
            )}

            {/* DOCUMENTS TAB */}
            {activeTab === "documents" && (
              <div className="space-y-4">
                {schema.documents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No document requirements for this KPI.</p>
                ) : (
                  schema.documents.map((doc) => {
                    const uploaded = uploadedDocs.find((u) => u.docId === doc.docId);
                    return (
                      <div key={doc.docId} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{doc.label}</p>
                            {doc.required && <span className="text-[10px] bg-destructive/10 text-destructive rounded px-1.5 py-0.5 font-medium">Required</span>}
                          </div>
                          {doc.description && <p className="text-xs text-muted-foreground mt-0.5">{doc.description}</p>}
                          <p className="text-xs text-muted-foreground mt-1">
                            Formats: {doc.formats.join(", ").toUpperCase()} · Max {doc.maxSizeMB}MB
                          </p>
                          {uploaded && (
                            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> {uploaded.fileName}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleUpload(doc.docId)}
                          disabled={status === "submitted"}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                        >
                          <Upload className="w-4 h-4" />
                          {uploaded ? "Re-upload" : "Upload"}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* QUERY TAB */}
            {activeTab === "query" && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Raise a query or clarification with the SPD review team.
                </p>
                <div className="border rounded-lg overflow-hidden">
                  <div className="h-64 overflow-y-auto p-4 space-y-3 bg-muted/20">
                    {queryMessages.length === 0 ? (
                      <p className="text-xs text-muted-foreground text-center py-8">No messages yet. Start a conversation with SPD.</p>
                    ) : (
                      queryMessages.map((msg, i) => (
                        <div key={i} className={cn("flex", msg.from === "user" ? "justify-end" : "justify-start")}>
                          <div className={cn(
                            "max-w-xs px-3 py-2 rounded-lg text-sm",
                            msg.from === "user"
                              ? "bg-primary text-white"
                              : "bg-white border text-foreground"
                          )}>
                            <p>{msg.text}</p>
                            <p className={cn("text-[10px] mt-1", msg.from === "user" ? "text-white/70" : "text-muted-foreground")}>
                              {msg.from === "spd" ? "SPD Team · " : ""}{msg.time}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="border-t p-3 flex gap-2">
                    <input
                      type="text"
                      value={queryText}
                      onChange={(e) => setQueryText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendQuery()}
                      placeholder="Type your query..."
                      className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <Button size="sm" onClick={handleSendQuery} disabled={!queryText.trim()}>
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiSubmitPage;
