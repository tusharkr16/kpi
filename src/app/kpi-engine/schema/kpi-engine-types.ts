export type FieldType =
  | "text"
  | "number"
  | "currency"
  | "percentage"
  | "select"
  | "multiselect"
  | "radio"
  | "date"
  | "textarea"
  | "calculated"
  | "readonly"
  | "file";

export type KpiCategory =
  | "talent_acquisition"
  | "industry_partnership"
  | "digital_transformation"
  | "governance_reform"
  | "international"
  | "faculty_development"
  | "enrollment_access"
  | "innovation_ecosystem"
  | "student_welfare"
  | "specialized_programs"
  | "research"
  | "infrastructure"
  | "ai_systems"
  | "alumni"
  | "learning_resources"
  | "outreach_inclusivity";

export type KpiStatus =
  | "not_started"
  | "draft"
  | "submitted"
  | "under_review"
  | "query_raised"
  | "rejected"
  | "approved"
  | "locked";

export interface IDependencyRule {
  fieldId: string;
  operator: "equals" | "not_equals" | "greater_than" | "less_than";
  value: unknown;
}

export interface IFieldOption {
  label: string;
  value: string;
}

export interface IKpiFieldSchema {
  fieldId: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required: boolean;
  section: string;
  order: number;
  width: "full" | "half" | "third";
  defaultValue?: unknown;
  options?: IFieldOption[];
  min?: number;
  max?: number;
  formula?: string;
  dependsOn?: IDependencyRule;
  readOnly?: boolean;
  helpText?: string;
  unit?: string;
}

export interface IKpiSection {
  id: string;
  title: string;
  order: number;
  description?: string;
}

export interface IDocumentRequirement {
  docId: string;
  label: string;
  description?: string;
  required: boolean;
  formats: string[];
  maxSizeMB: number;
  conditionalOn?: IDependencyRule;
}

export interface IKpiDefinition {
  code: string;
  title: string;
  shortTitle: string;
  category: KpiCategory;
  description: string;
  objective: string;
  targetUnit: string;
  frequency: "monthly" | "quarterly" | "annual";
  sections: IKpiSection[];
  fields: IKpiFieldSchema[];
  documents: IDocumentRequirement[];
  icon?: string;
}

export interface IKpiSubmission {
  _id: string;
  kpiCode: string;
  monthYear: string;
  status: KpiStatus;
  data: Record<string, unknown>;
  documents: ISubmissionDoc[];
  lastSavedAt: string;
  submittedAt?: string;
}

export interface ISubmissionDoc {
  docId: string;
  fileName: string;
  fileSize: string;
  status: "pending" | "accepted" | "rejected";
  uploadedAt: string;
}
