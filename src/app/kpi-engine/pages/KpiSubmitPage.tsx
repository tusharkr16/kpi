import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "@/layout/TopBar";
import { getKpiSchema } from "../schema/kpi-schemas";
import { KpiFormRenderer } from "../components/KpiFormRenderer";
import KpiCategoryBadge from "@/components/kpi/KpiCategoryBadge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertCircle, ArrowLeft, Calendar, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const currentYear = new Date().getFullYear();
const YEARS = [currentYear - 1, currentYear, currentYear + 1];


const KpiSubmitPage = () => {
  const { code } = useParams<{ code: string }>();
  const navigate  = useNavigate();
  const schema    = code ? getKpiSchema(code) : null;

  const sortedSections = schema ? [...schema.sections].sort((a, b) => a.order - b.order) : [];

  const [activeSec,     setActiveSec]     = useState(sortedSections[0]?.id ?? "");
  const [completedSecs, setCompletedSecs] = useState<Set<string>>(new Set());
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[new Date().getMonth()]);
  const [selectedYear,  setSelectedYear]  = useState(currentYear);
  const [formValues,    setFormValues]    = useState<Record<string, unknown>>({});
  const [status,        setStatus]        = useState<"draft" | "submitted">("draft");

  const handleSave = useCallback((values: Record<string, unknown>) => setFormValues(values), []);

  const handleSubmit = useCallback((values: Record<string, unknown>) => {
    setFormValues(values);
    setStatus("submitted");
    // mark all sections complete
    if (schema) setCompletedSecs(new Set(schema.sections.map((s) => s.id)));
    toast.success("KPI submitted successfully! It is now under review.");
  }, [schema]);

  const handleSectionChange = (id: string) => {
    // mark previous section as completed when moving forward
    setCompletedSecs((prev) => {
      const next = new Set(prev);
      next.add(activeSec);
      return next;
    });
    setActiveSec(id);
  };


  if (!schema) {
    return (
      <div className="flex flex-col flex-1">
        <TopBar title="KPI Not Found" breadcrumbs={["KPI Management"]} />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <AlertCircle className="w-12 h-12 opacity-30" />
          <p>KPI schema not found for code: {code}</p>
          <Button variant="outline" onClick={() => navigate("/kpis/new")}>Back to KPI List</Button>
        </div>
      </div>
    );
  }

  const activeIdx = sortedSections.findIndex((s) => s.id === activeSec);

  return (
    <div className="flex flex-col flex-1 bg-muted/20">
      <TopBar
        title={schema.shortTitle}
        breadcrumbs={["KPI Management", "New Submission", schema.code]}
      />

      <div className="p-6 space-y-5">

        {/* ── KPI header card ─────────────────────────────────────── */}
        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-3">
              <button onClick={() => navigate("/kpis/new")} className="mt-1 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">{schema.code}</span>
                  <KpiCategoryBadge category={schema.category} />
                  {status === "submitted"
                    ? <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />Under Review</span>
                    : <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted border rounded-full px-2.5 py-0.5 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 inline-block" />Draft</span>
                  }
                </div>
                <h2 className="text-base font-bold">{schema.title}</h2>
                <p className="text-sm text-muted-foreground mt-0.5 max-w-2xl">{schema.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} disabled={status === "submitted"}
                className="border rounded-lg px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60">
                {MONTHS.map((m) => <option key={m}>{m}</option>)}
              </select>
              <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} disabled={status === "submitted"}
                className="border rounded-lg px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60">
                {YEARS.map((y) => <option key={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t flex items-center gap-6 text-xs text-muted-foreground flex-wrap">
            <span>Form: <span className={cn("font-semibold", status === "submitted" ? "text-amber-600" : "text-foreground")}>{status === "submitted" ? "Submitted" : "Draft"}</span></span>
            <span>Period: <span className="font-semibold text-foreground">{selectedMonth} {selectedYear}</span></span>
            <span className="capitalize">Frequency: <span className="font-semibold text-foreground">{schema.frequency}</span></span>
          </div>
        </div>

        {/* ── Form with stepper ───────────────────────────────────── */}
        <div className="bg-white border rounded-2xl overflow-hidden">

            {/* Stepper */}
            <div className="px-8 py-6 border-b">
              <div className="flex items-start">
                {sortedSections.map((section, idx) => {
                  const isCompleted = completedSecs.has(section.id);
                  const isActive    = section.id === activeSec;

                  return (
                    <div key={section.id} className="flex items-start flex-1 last:flex-none">
                      {/* Node + label */}
                      <button
                        className="flex flex-col items-center gap-2 group"
                        onClick={() => setActiveSec(section.id)}
                      >
                        {/* Circle */}
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all",
                          isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : isActive
                            ? "bg-primary border-primary text-white shadow-md shadow-primary/30"
                            : "bg-white border-slate-300 text-slate-400"
                        )}>
                          {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : idx + 1}
                        </div>
                        {/* Label */}
                        <span className={cn(
                          "text-xs font-semibold text-center whitespace-nowrap",
                          isCompleted ? "text-green-600"
                          : isActive  ? "text-primary"
                          : "text-slate-400"
                        )}>
                          {section.title}
                        </span>
                      </button>

                      {/* Connector line */}
                      {idx < sortedSections.length - 1 && (
                        <div className="flex-1 mt-5 mx-2">
                          <div className={cn(
                            "h-0.5 w-full transition-colors",
                            completedSecs.has(section.id) || activeIdx > idx
                              ? "bg-green-500"
                              : "bg-slate-200"
                          )} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form body */}
            <div className="p-6">
              <KpiFormRenderer
                schema={schema}
                initialValues={formValues}
                onSave={handleSave}
                onSubmit={handleSubmit}
                readOnly={status === "submitted"}
                activeSectionId={activeSec}
                onSectionChange={handleSectionChange}
              />
            </div>
          </div>

      </div>
    </div>
  );
};

export default KpiSubmitPage;
