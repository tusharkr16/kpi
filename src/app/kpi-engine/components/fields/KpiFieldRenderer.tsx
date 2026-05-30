import { useRef } from "react";
import type { IKpiFieldSchema } from "../../schema/kpi-engine-types";
import { evaluateFormula } from "../../engine/formula-evaluator";
import { cn } from "@/lib/utils";
import { Upload, X, FileText, CheckCircle2 } from "lucide-react";

interface Props {
  field: IKpiFieldSchema;
  value: unknown;
  values: Record<string, unknown>;
  onChange: (fieldId: string, value: unknown) => void;
  disabled?: boolean;
}

const inputClass =
  "w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-muted disabled:text-muted-foreground";

export const KpiFieldRenderer = ({ field, value, values, onChange, disabled }: Props) => {
  const isDisabled = disabled || field.readOnly || field.type === "calculated" || field.type === "readonly";

  const computedValue =
    (field.type === "calculated" || field.type === "readonly") && field.formula
      ? evaluateFormula(field.formula, values)
      : value;

  const displayValue = String(computedValue ?? "");

  const handleChange = (newVal: unknown) => {
    if (!isDisabled) onChange(field.fieldId, newVal);
  };

  if (field.type === "calculated" || field.type === "readonly") {
    return (
      <div className="space-y-1.5">
        <Label field={field} />
        <div className="w-full border rounded-lg px-3 py-2 text-sm bg-muted/50 text-foreground font-medium">
          {displayValue || "—"}
          {field.unit && <span className="ml-1 text-muted-foreground">{field.unit}</span>}
        </div>
        {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <FileUploadField field={field} value={value} onChange={onChange} disabled={disabled} />
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="space-y-1.5">
        <Label field={field} />
        <textarea
          rows={3}
          value={displayValue}
          placeholder={field.placeholder}
          disabled={isDisabled}
          onChange={(e) => handleChange(e.target.value)}
          className={cn(inputClass, "resize-none")}
        />
        {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className="space-y-1.5">
        <Label field={field} />
        <select
          value={displayValue}
          disabled={isDisabled}
          onChange={(e) => handleChange(e.target.value)}
          className={cn(inputClass, "bg-white")}
        >
          <option value="">{field.placeholder ?? "Select..."}</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
      </div>
    );
  }

  if (field.type === "multiselect") {
    const selected: string[] = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div className="space-y-1.5">
        <Label field={field} />
        <div className="border rounded-lg p-2 space-y-1.5 bg-white">
          {field.options?.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/30 rounded px-2 py-1">
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                disabled={isDisabled}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...selected, opt.value]
                    : selected.filter((v) => v !== opt.value);
                  handleChange(next);
                }}
                className="accent-primary"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <div className="space-y-1.5">
        <Label field={field} />
        <div className="flex flex-wrap gap-4">
          {field.options?.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name={field.fieldId}
                value={opt.value}
                checked={displayValue === opt.value}
                disabled={isDisabled}
                onChange={() => handleChange(opt.value)}
                className="accent-primary"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
      </div>
    );
  }

  const inputType =
    field.type === "number" || field.type === "currency" || field.type === "percentage"
      ? "number"
      : field.type === "date"
      ? "date"
      : "text";

  return (
    <div className="space-y-1.5">
      <Label field={field} />
      <div className="relative">
        {field.type === "currency" && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
        )}
        <input
          type={inputType}
          value={displayValue}
          placeholder={field.placeholder}
          disabled={isDisabled}
          min={field.min}
          max={field.max}
          onChange={(e) => handleChange(e.target.value)}
          className={cn(inputClass, field.type === "currency" && "pl-6")}
        />
        {field.unit && field.type !== "currency" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {field.unit}
          </span>
        )}
        {field.type === "percentage" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
        )}
      </div>
      {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
    </div>
  );
};

const Label = ({ field }: { field: IKpiFieldSchema }) => (
  <label className="text-sm font-medium flex items-center gap-1">
    {field.label}
    {field.required && <span className="text-destructive">*</span>}
  </label>
);

interface FileUploadProps {
  field: IKpiFieldSchema;
  value: unknown;
  onChange: (fieldId: string, value: unknown) => void;
  disabled?: boolean;
}

interface UploadedFile { name: string; size: string; }

const FileUploadField = ({ field, value, onChange, disabled }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploaded = value as UploadedFile | null | undefined;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKB = file.size / 1024;
    const sizeStr = sizeKB >= 1024
      ? `${(sizeKB / 1024).toFixed(1)} MB`
      : `${Math.round(sizeKB)} KB`;
    onChange(field.fieldId, { name: file.name, size: sizeStr });
    // reset so same file can be re-selected
    e.target.value = "";
  };

  const handleRemove = () => {
    onChange(field.fieldId, null);
  };

  return (
    <div className="space-y-1.5">
      <Label field={field} />

      {uploaded ? (
        /* Uploaded state */
        <div className="flex items-center gap-3 border border-green-200 bg-green-50 rounded-xl px-4 py-3">
          <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-800 truncate">{uploaded.name}</p>
            <p className="text-xs text-green-600">{uploaded.size}</p>
          </div>
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="w-6 h-6 rounded-full bg-green-200 hover:bg-green-300 flex items-center justify-center transition-colors shrink-0"
            >
              <X className="w-3 h-3 text-green-700" />
            </button>
          )}
        </div>
      ) : (
        /* Drop zone / upload button */
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "w-full border-2 border-dashed rounded-xl px-4 py-5 flex flex-col items-center gap-2 transition-colors",
            disabled
              ? "border-muted bg-muted/30 cursor-not-allowed opacity-60"
              : "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer group"
          )}
        >
          <div className="w-10 h-10 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
            <Upload className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              Click to upload
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">PDF, DOC, DOCX · Max 5MB</p>
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />

      {field.helpText && <p className="text-xs text-muted-foreground">{field.helpText}</p>}
    </div>
  );
};
