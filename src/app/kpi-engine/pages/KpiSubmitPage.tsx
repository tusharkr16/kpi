import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "@/layout/TopBar";
import { getKpiSchema } from "../schema/kpi-schemas";
import { KpiFormRenderer } from "../components/KpiFormRenderer";
import KpiCategoryBadge from "@/components/kpi/KpiCategoryBadge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertCircle, ArrowLeft, Calendar, CheckCircle2,
  Edit2, FileText, Send, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { isFieldVisible } from "../engine/dependency-resolver";
import { useKpiSubmissionStore } from "@/store/kpi-submission-store";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const currentYear = new Date().getFullYear();
const YEARS = [currentYear - 1, currentYear, currentYear + 1];

const renderValue = (value: unknown, fieldType: string, options?: { label: string; value: string }[]): string => {
  if (value === null || value === undefined || value === "") return "—";
  if (Array.isArray(value)) {
    if (options) return value.map((v) => options.find((o) => o.value === v)?.label ?? v).join(", ");
    return value.join(", ");
  }
  if (typeof value === "object" && (value as { name?: string }).name)
    return (value as { name: string; size: string }).name + " (" + (value as { name: string; size: string }).size + ")";
  if (fieldType === "currency") return `₹ ${Number(value).toLocaleString("en-IN")}`;
  if (fieldType === "percentage") return `${value}%`;
  if (options) return options.find((o) => o.value === String(value))?.label ?? String(value);
  return String(value);
};

const KpiSubmitPage = () => {
  const { code } = useParams<{ code: string }>();
  const navigate  = useNavigate();
  const { user }  = useAuthStore();
  const { addSubmission } = useKpiSubmissionStore();
  const schema    = code ? getKpiSchema(code) : null;
  const role      = user?.role?.type ?? "coordinator";
  const isViewer  = role === "vc" || role === "acs";

  const sortedSections = schema ? [...schema.sections].sort((a, b) => a.order - b.order) : [];

  // Steps: sections (up to 3) + "Summary" as the last step
  const steps = [...sortedSections.slice(0, 3), { id: "summary", title: "Summary", order: 99 }];

  const [activeStep,     setActiveStep]     = useState(isViewer ? "summary" : (steps[0]?.id ?? "summary"));
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set(isViewer ? steps.map((s) => s.id) : []));
  const [selectedMonth,  setSelectedMonth]  = useState(MONTHS[new Date().getMonth()]);
  const [selectedYear,   setSelectedYear]   = useState(currentYear);
  const [formValues,     setFormValues]     = useState<Record<string, unknown>>({});
  const [status,         setStatus]         = useState<"draft" | "submitted">(isViewer ? "submitted" : "draft");

  const handleSave = useCallback((values: Record<string, unknown>) => setFormValues(values), []);

  const handleFormSubmit = useCallback((values: Record<string, unknown>) => {
    setFormValues(values);
    setStatus("submitted");
    if (schema) setCompletedSteps(new Set(steps.map((s) => s.id)));
    setActiveStep("summary");
    toast.success("All sections complete — review your summary.");
  }, [schema, steps]);

  const goToStep = (stepId: string) => {
    if (stepId !== "summary") {
      setCompletedSteps((prev) => { const n = new Set(prev); n.add(activeStep); return n; });
    }
    setActiveStep(stepId);
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

  /* ── Mock submitted values for viewer roles ─────────────────────────── */
  const displayValues: Record<string, unknown> = isViewer && Object.keys(formValues).length === 0
    ? schema.fields.reduce((acc, f) => {
        if (f.type === "number" || f.type === "currency") acc[f.fieldId] = Math.floor(Math.random() * 80) + 10;
        else if (f.type === "percentage") acc[f.fieldId] = Math.floor(Math.random() * 60) + 20;
        else if (f.type === "select" && f.options?.length) acc[f.fieldId] = f.options[0].value;
        else if (f.type === "multiselect" && f.options?.length) acc[f.fieldId] = [f.options[0].value];
        else if (f.type === "date") acc[f.fieldId] = "2025-06-15";
        else if (f.type === "text" || f.type === "textarea") acc[f.fieldId] = "Sample submitted data";
        else if (f.type === "radio" && f.options?.length) acc[f.fieldId] = f.options[0].value;
        return acc;
      }, {} as Record<string, unknown>)
    : formValues;

  return (
    <div className="flex flex-col flex-1 bg-muted/20">
      <TopBar
        title={schema.shortTitle}
        breadcrumbs={["KPI Management", "New Submission", schema.code]}
      />

      <div className="p-6 space-y-5">

        {/* ── KPI header card ──────────────────────────────────────── */}
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
                    ? <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5 font-medium"><CheckCircle2 className="w-3 h-3" />Submitted</span>
                    : <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted border rounded-full px-2.5 py-0.5 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 inline-block" />Draft</span>
                  }
                  {isViewer && (
                    <span className="text-[10px] bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
                      {role === "vc" ? "VC View" : "ACS View"} — Read Only
                    </span>
                  )}
                </div>
                <h2 className="text-base font-bold">{schema.title}</h2>
                <p className="text-sm text-muted-foreground mt-0.5 max-w-2xl">{schema.description}</p>
              </div>
            </div>

            {!isViewer && (
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
            )}
          </div>

          <div className="mt-4 pt-4 border-t flex items-center gap-6 text-xs text-muted-foreground flex-wrap">
            <span>Status: <span className={cn("font-semibold", status === "submitted" ? "text-green-600" : "text-foreground")}>{status === "submitted" ? "Submitted" : "Draft"}</span></span>
            {!isViewer && <span>Period: <span className="font-semibold text-foreground">{selectedMonth} {selectedYear}</span></span>}
            <span className="capitalize">Frequency: <span className="font-semibold text-foreground">{schema.frequency}</span></span>
            <span>{schema.fields.length} fields · {sortedSections.length} sections</span>
          </div>
        </div>

        {/* ── 4-step stepper ───────────────────────────────────────── */}
        <div className="bg-white border rounded-2xl overflow-hidden">
          <div className="px-10 py-6 border-b">
            <div className="flex items-start">
              {steps.map((step, idx) => {
                const isCompleted = completedSteps.has(step.id);
                const isActive    = step.id === activeStep;
                const isSummary   = step.id === "summary";
                const canClick    = isViewer || isCompleted || isActive || idx === 0 || completedSteps.has(steps[idx - 1]?.id ?? "");

                return (
                  <div key={step.id} className="flex items-start flex-1 last:flex-none">
                    <button
                      className="flex flex-col items-center gap-2 group disabled:cursor-not-allowed"
                      onClick={() => canClick && goToStep(step.id)}
                      disabled={!canClick}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all",
                        isCompleted && !isActive
                          ? "bg-green-500 border-green-500 text-white"
                          : isActive
                            ? "bg-primary border-primary text-white shadow-md shadow-primary/30"
                            : "bg-white border-slate-200 text-slate-400"
                      )}>
                        {isCompleted && !isActive
                          ? <Check className="w-5 h-5 stroke-[3]" />
                          : isSummary
                            ? <FileText className="w-4 h-4" />
                            : idx + 1}
                      </div>
                      <span className={cn(
                        "text-xs font-semibold text-center whitespace-nowrap",
                        isCompleted && !isActive ? "text-green-600"
                          : isActive ? "text-primary"
                          : "text-slate-400"
                      )}>
                        {step.title}
                      </span>
                    </button>
                    {idx < steps.length - 1 && (
                      <div className="flex-1 mt-5 mx-3">
                        <div className={cn(
                          "h-0.5 w-full transition-colors",
                          completedSteps.has(step.id) ? "bg-green-500" : "bg-slate-200"
                        )} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Summary pane ───────────────────────────────────────── */}
          {activeStep === "summary" && (
            <div className="p-6 space-y-4">
              {sortedSections.map((section) => {
                const fields = schema.fields
                  .filter((f) => f.section === section.id && isFieldVisible(f.dependsOn, displayValues))
                  .sort((a, b) => a.order - b.order);

                return (
                  <div key={section.id} className="border rounded-xl overflow-hidden">
                    <div className="px-5 py-3 bg-gradient-to-r from-primary/5 to-transparent border-b flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {section.order}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold">{section.title}</h3>
                        {section.description && <p className="text-xs text-muted-foreground">{section.description}</p>}
                      </div>
                      {!isViewer && (
                        <button
                          onClick={() => setActiveStep(section.id)}
                          className="flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                      )}
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>

                    <div className="divide-y">
                      {fields.filter((f) => f.type !== "calculated" || displayValues[f.fieldId] !== undefined).map((field) => {
                        const val = displayValues[field.fieldId];
                        const isEmpty = val === null || val === undefined || val === "" || (Array.isArray(val) && val.length === 0);
                        return (
                          <div key={field.fieldId} className="grid grid-cols-[1fr_1.5fr] gap-4 px-5 py-3 hover:bg-muted/10 transition-colors">
                            <div>
                              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                {field.label}
                                {field.required && <span className="text-destructive">*</span>}
                              </p>
                              {field.helpText && <p className="text-[10px] text-muted-foreground/70 mt-0.5">{field.helpText}</p>}
                            </div>
                            <div className="flex items-center gap-2">
                              {isEmpty ? (
                                <span className="text-xs text-muted-foreground/50 italic">Not filled</span>
                              ) : (
                                <span className={cn("text-sm font-medium", field.type === "calculated" ? "text-primary" : "text-foreground")}>
                                  {renderValue(val, field.type, field.options)}
                                </span>
                              )}
                              {field.type === "calculated" && (
                                <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">auto</span>
                              )}
                              {field.type === "file" && !isEmpty && (
                                <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3 h-3" /> uploaded
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {fields.length === 0 && (
                        <div className="px-5 py-4 text-xs text-muted-foreground italic">No fields in this section.</div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Footer actions */}
              {!isViewer && (
                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => setActiveStep(steps[0]?.id ?? "")}>
                    <Edit2 className="w-3.5 h-3.5" /> Back to Edit
                  </Button>
                  <Button
                    size="sm"
                    className="gap-2 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      addSubmission({
                        code: schema.code,
                        title: schema.title,
                        shortTitle: schema.shortTitle,
                        period: `${selectedMonth} ${selectedYear}`,
                        submittedAt: new Date().toISOString(),
                        values: displayValues,
                      });
                      toast.success("KPI submitted and saved to My KPI Submissions!");
                      navigate("/kpis");
                    }}
                  >
                    <Send className="w-3.5 h-3.5" /> Final Submit
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* ── Form pane (coordinator + section steps) ─────────────── */}
          {activeStep !== "summary" && !isViewer && (
            <div className="p-6">
              <KpiFormRenderer
                schema={schema}
                initialValues={formValues}
                onSave={handleSave}
                onSubmit={handleFormSubmit}
                readOnly={status === "submitted"}
                activeSectionId={activeStep}
                onSectionChange={(id) => {
                  setCompletedSteps((prev) => { const n = new Set(prev); n.add(activeStep); return n; });
                  // If moving past last section, go to summary
                  const idx = sortedSections.findIndex((s) => s.id === id);
                  if (idx >= sortedSections.length) setActiveStep("summary");
                  else setActiveStep(id);
                }}
              />
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default KpiSubmitPage;
