import { useState, useCallback, useEffect, useRef } from "react";
import type { IKpiDefinition, IKpiFieldSchema } from "../schema/kpi-engine-types";
import { isFieldVisible } from "../engine/dependency-resolver";
import { evaluateFormula } from "../engine/formula-evaluator";
import { KpiFieldRenderer } from "./fields/KpiFieldRenderer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Save, Send, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

interface Props {
  schema: IKpiDefinition;
  initialValues?: Record<string, unknown>;
  onSave?: (values: Record<string, unknown>) => void;
  onSubmit?: (values: Record<string, unknown>) => void;
  readOnly?: boolean;
  activeSectionId?: string;
  onSectionChange?: (id: string) => void;
}

export const KpiFormRenderer = ({
  schema,
  initialValues = {},
  onSave,
  onSubmit,
  readOnly,
  activeSectionId,
  onSectionChange,
}: Props) => {
  const sortedSections = [...schema.sections].sort((a, b) => a.order - b.order);
  const [internalSection, setInternalSection] = useState(sortedSections[0]?.id ?? "");
  const activeSection = activeSectionId ?? internalSection;

  const setActiveSection = (id: string) => {
    setInternalSection(id);
    onSectionChange?.(id);
  };

  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback((fieldId: string, value: unknown) => {
    setValues((prev) => {
      const next = { ...prev, [fieldId]: value };
      schema.fields
        .filter((f) => (f.type === "calculated" || f.type === "readonly") && f.formula)
        .forEach((f) => { next[f.fieldId] = evaluateFormula(f.formula!, next); });
      return next;
    });
    setErrors((prev) => ({ ...prev, [fieldId]: "" }));
  }, [schema.fields]);

  useEffect(() => {
    if (!onSave) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => { onSave(values); }, 2000);
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [values, onSave]);

  const visibleFieldsForSection = (sectionId: string): IKpiFieldSchema[] =>
    schema.fields
      .filter((f) => f.section === sectionId && isFieldVisible(f.dependsOn, values))
      .sort((a, b) => a.order - b.order);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    schema.fields.forEach((f) => {
      if (!f.required || !isFieldVisible(f.dependsOn, values)) return;
      if (f.type === "calculated" || f.type === "readonly") return;
      const val = values[f.fieldId];
      if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0))
        newErrors[f.fieldId] = `${f.label} is required`;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) { toast.error("Please fill all required fields"); return false; }
    return true;
  };

  const currentSectionIndex = sortedSections.findIndex((s) => s.id === activeSection);
  const isFirst = currentSectionIndex === 0;
  const isLast  = currentSectionIndex === sortedSections.length - 1;

  const currentSection = sortedSections[currentSectionIndex];
  const fields = currentSection ? visibleFieldsForSection(currentSection.id) : [];

  return (
    <div className="space-y-6">
      {/* Section heading */}
      <div>
        <h3 className="text-base font-bold text-foreground">{currentSection?.title}</h3>
        {currentSection?.description && (
          <p className="text-sm text-muted-foreground mt-0.5">{currentSection.description}</p>
        )}
      </div>

      {/* Fields grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-5">
        {fields.map((field) => (
          <div
            key={field.fieldId}
            className={cn(field.width === "full" ? "col-span-2" : "col-span-1")}
          >
            <KpiFieldRenderer
              field={field}
              value={values[field.fieldId]}
              values={values}
              onChange={handleChange}
              disabled={readOnly}
            />
            {errors[field.fieldId] && (
              <p className="text-xs text-destructive mt-1">{errors[field.fieldId]}</p>
            )}
          </div>
        ))}
        {fields.length === 0 && (
          <div className="col-span-2 text-sm text-muted-foreground py-10 text-center">
            No fields in this section.
          </div>
        )}
      </div>

      {/* Prev / Next / Save / Submit */}
      <div className="flex items-center justify-between pt-5 border-t">
        <button
          onClick={() => setActiveSection(sortedSections[currentSectionIndex - 1]?.id)}
          disabled={isFirst}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <div className="flex items-center gap-2">
          {!readOnly && (
            <Button variant="outline" size="sm" className="gap-2"
              onClick={() => { onSave?.(values); toast.success("Draft saved"); }}>
              <Save className="w-4 h-4" /> Save Draft
            </Button>
          )}
          {!readOnly && isLast ? (
            <Button size="sm" className="gap-2" onClick={() => { if (validate()) onSubmit?.(values); }}>
              <Send className="w-4 h-4" /> Submit
            </Button>
          ) : !readOnly ? (
            <Button size="sm" className="gap-2"
              onClick={() => setActiveSection(sortedSections[currentSectionIndex + 1]?.id)}>
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
