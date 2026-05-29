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
}

export const KpiFormRenderer = ({ schema, initialValues = {}, onSave, onSubmit, readOnly }: Props) => {
  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [activeSection, setActiveSection] = useState(schema.sections[0]?.id ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback((fieldId: string, value: unknown) => {
    setValues((prev) => {
      const next = { ...prev, [fieldId]: value };
      // recompute calculated fields
      schema.fields
        .filter((f) => (f.type === "calculated" || f.type === "readonly") && f.formula)
        .forEach((f) => {
          next[f.fieldId] = evaluateFormula(f.formula!, next);
        });
      return next;
    });
    setErrors((prev) => ({ ...prev, [fieldId]: "" }));
  }, [schema.fields]);

  // autosave debounce
  useEffect(() => {
    if (!onSave) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      onSave(values);
    }, 2000);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [values, onSave]);

  const sortedSections = [...schema.sections].sort((a, b) => a.order - b.order);

  const visibleFieldsForSection = (sectionId: string): IKpiFieldSchema[] =>
    schema.fields
      .filter((f) => f.section === sectionId && isFieldVisible(f.dependsOn, values))
      .sort((a, b) => a.order - b.order);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    schema.fields.forEach((f) => {
      if (!f.required) return;
      if (!isFieldVisible(f.dependsOn, values)) return;
      if (f.type === "calculated" || f.type === "readonly") return;
      const val = values[f.fieldId];
      if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0)) {
        newErrors[f.fieldId] = `${f.label} is required`;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit?.(values);
  };

  const currentSectionIndex = sortedSections.findIndex((s) => s.id === activeSection);
  const isFirst = currentSectionIndex === 0;
  const isLast = currentSectionIndex === sortedSections.length - 1;

  return (
    <div className="flex gap-6">
      {/* Section Nav */}
      <div className="w-44 shrink-0 space-y-1">
        {sortedSections.map((section) => {
          const sectionFields = visibleFieldsForSection(section.id);
          const hasErrors = sectionFields.some((f) => errors[f.fieldId]);
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors",
                activeSection === section.id
                  ? "bg-primary text-white"
                  : hasErrors
                  ? "text-destructive bg-destructive/5 hover:bg-destructive/10"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="block">{section.title}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <div className="flex-1 space-y-6">
        {sortedSections.map((section) => {
          if (section.id !== activeSection) return null;
          const fields = visibleFieldsForSection(section.id);
          return (
            <div key={section.id}>
              <div className="mb-5">
                <h3 className="text-base font-semibold">{section.title}</h3>
                {section.description && (
                  <p className="text-sm text-muted-foreground mt-0.5">{section.description}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div
                    key={field.fieldId}
                    className={cn(
                      field.width === "full" ? "col-span-2" : field.width === "third" ? "col-span-1" : "col-span-1"
                    )}
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
                  <div className="col-span-2 text-sm text-muted-foreground py-8 text-center">
                    No fields in this section.
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Navigation + Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <button
            onClick={() => setActiveSection(sortedSections[currentSectionIndex - 1]?.id)}
            disabled={isFirst}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="flex items-center gap-2">
            {!readOnly && (
              <Button variant="outline" size="sm" className="gap-2" onClick={() => { onSave?.(values); toast.success("Draft saved"); }}>
                <Save className="w-4 h-4" /> Save Draft
              </Button>
            )}
            {!readOnly && isLast ? (
              <Button size="sm" className="gap-2" onClick={handleSubmit}>
                <Send className="w-4 h-4" /> Submit
              </Button>
            ) : !readOnly ? (
              <Button size="sm" className="gap-2" onClick={() => setActiveSection(sortedSections[currentSectionIndex + 1]?.id)}>
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
