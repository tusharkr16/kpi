import { create } from "zustand";
import { KPI_SCHEMAS } from "@/app/kpi-engine/schema/kpi-schemas";
import type { IKpiFieldSchema } from "@/app/kpi-engine/schema/kpi-engine-types";

export interface IKpiSubmissionEntry {
  code: string;
  title: string;
  shortTitle: string;
  period: string;
  submittedAt: string;
  values: Record<string, unknown>;
}

interface KpiSubmissionStore {
  submissions: IKpiSubmissionEntry[];
  addSubmission: (entry: IKpiSubmissionEntry) => void;
  getSubmission: (code: string) => IKpiSubmissionEntry | undefined;
}

/* ── Realistic demo values per field ──────────────────────────────────────── */
const DEMO_OVERRIDES: Record<string, Record<string, unknown>> = {
  KPI_02: {
    appointment_letter:           { name: "appointment_letter_dr_sharma.pdf", size: "1.2 MB" },
    experience_certificate:       { name: "experience_cert_15yrs_dr_sharma.pdf", size: "0.8 MB" },
    current_affiliation:          "Tata Consultancy Services Ltd., Mumbai",
    field_of_expertise:           "engineering",
    category_of_engagement:       "industry_funded",
    tenure_start:                 "2025-04-01",
    tenure_end:                   "2026-03-31",
    proposed_contribution:        ["curriculum", "industry_projects", "mentoring", "lectures"],
    pops_appointed:               8,
    sanctioned_teaching_posts:    80,
    industry_projects_introduced: 5,
    workshops_conducted:          12,
    mentorship_sessions:          34,
    joint_research_projects:      3,
    student_feedback_score:       92,
    placement_rate_improvement:   18,
    students_mentored_innovation: 47,
    new_curriculum_modules:       6,
    consultancy_revenue:          380000,
    remarks: "All 8 PoPs are from top industry organisations with 15+ years of experience.",
  },
  KPI_03: {
    sanctioned_strength:          120,
    current_working_strength:     82,
    advertisement_date:           "2025-04-15",
    applications_received:        348,
    shortlisted_candidates:       96,
    candidates_selected:          38,
    candidates_joined:            32,
    reservation_roster:           "yes",
    government_order:             { name: "govt_order_faculty_recruitment_2025.pdf", size: "2.1 MB" },
    vacancy_trend:                28.5,
    recruitment_stage_status:     "joining_completed",
    process_remarks:              "32 candidates joined. 6 declined due to salary concerns.",
    student_faculty_ratio:        "24:1 → 19:1",
    diversity_index_sc:           18,
    diversity_index_st:           8,
    diversity_index_obc:          29,
    diversity_index_ews:          11,
    diversity_index_gender:       42,
    output_remarks:               "Student-faculty ratio improved. Gender diversity 42% achieved.",
  },
  KPI_05: {
    ac_approval_minutes:          { name: "ac_approval_minutes_may2025.pdf", size: "1.5 MB" },
    ac_approval_date:             "2025-05-20",
    programmes_list:              "UG – B.Sc. Computer Science\nPG – M.Tech. Artificial Intelligence\nPG – M.Sc. Data Science\nUG – B.Com. (Digital Accounting)",
    emerging_topics:              ["ai_ml", "data_science", "cybersecurity", "iot", "cloud"],
    new_courses_details:          "1. Introduction to Generative AI – 3 credits\n2. Cybersecurity Fundamentals – 2 credits\n3. Cloud Computing & DevOps – 3 credits",
    new_courses_count:            5,
    pct_courses_revised:          68,
    ncrf_alignment:               "yes",
    ncrf_compliance_doc:          { name: "ncrf_compliance_certificate_2025.pdf", size: "0.6 MB" },
    pct_programmes_updated:       72,
    students_enrolled_new:        1240,
    total_students_programme:     4800,
    enrolment_in_new_pct:         25.83,
    student_satisfaction:         98,
    employer_feedback:            104,
    placement_rate_improvement:   22,
    student_projects_startups:    14,
    output_remarks:               "14 student startups registered. Employer feedback 104/110.",
  },
  KPI_07: {
    institution_type:             "state",
    domain_discipline:            ["sciences", "management", "comp_app"],
    programme_type:               ["bsc", "bca", "bba"],
    programme_details:            "B.Sc. (IT) – 2024 – Infosys Ltd.\nBCA – 2024 – TCS Foundation\nBBA – 2025 – Mahindra & Mahindra",
    students_enrolled:            "B.Sc. (IT) – 48\nBCA – 36\nBBA – 52",
    total_mous_signed:            4,
    stipend_amount:               8500,
    stipend_source:               "both",
    completion_rate:              82,
    stipend_disbursement:         "on_time",
    process_remarks:              "All 136 enrolled students actively undergoing apprenticeship.",
    employment_placement:         76,
    student_satisfaction:         106,
    output_remarks:               "76% placed within 6 months. 3 pre-placement offers from Infosys.",
  },
};

/* ── Generate a realistic demo value for any field ─────────────────────── */
function demoValue(field: IKpiFieldSchema): unknown {
  switch (field.type) {
    case "number":
      if (field.max) return Math.floor(field.max * 0.7);
      return Math.floor(Math.random() * 80) + 20;
    case "currency":
      return Math.floor((Math.random() * 2000000) + 500000);
    case "percentage":
      return Math.floor(Math.random() * 40) + 50;
    case "text":
      return field.placeholder
        ? field.placeholder.replace(/^e\.g[.,]\s*/i, "").split("\n")[0]
        : "Sample submitted data";
    case "textarea":
      return "Detailed submission data provided by the department coordinator. All required documentation is in order and verified.";
    case "date":
      return "2025-06-10";
    case "select":
      return field.options?.[0]?.value ?? "";
    case "multiselect":
      return field.options?.slice(0, 2).map((o) => o.value) ?? [];
    case "radio":
      return field.options?.[0]?.value ?? "";
    case "file":
      return { name: `${field.fieldId}_document.pdf`, size: "1.4 MB" };
    case "calculated":
    case "readonly":
      return undefined; // computed by formula
    default:
      return "—";
  }
}

/* ── Build demo submissions for all KPI schemas ────────────────────────── */
const DEMO_SUBMISSIONS: IKpiSubmissionEntry[] = KPI_SCHEMAS.map((schema) => {
  const overrides = DEMO_OVERRIDES[schema.code] ?? {};
  const values: Record<string, unknown> = {};

  schema.fields.forEach((field) => {
    if (field.type === "calculated" || field.type === "readonly") return;
    values[field.fieldId] = overrides[field.fieldId] !== undefined
      ? overrides[field.fieldId]
      : demoValue(field);
  });

  return {
    code: schema.code,
    title: schema.title,
    shortTitle: schema.shortTitle,
    period: "June 2025",
    submittedAt: "2025-06-12T10:00:00Z",
    values,
  };
});

export const useKpiSubmissionStore = create<KpiSubmissionStore>((set, get) => ({
  submissions: DEMO_SUBMISSIONS,
  addSubmission: (entry) =>
    set((state) => ({
      submissions: [
        ...state.submissions.filter((s) => s.code !== entry.code),
        entry,
      ],
    })),
  getSubmission: (code) => get().submissions.find((s) => s.code === code),
}));
