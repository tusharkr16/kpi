import type { IKpiDefinition } from "./kpi-engine-types";

export const KPI_SCHEMAS: IKpiDefinition[] = [
  // ─── KPI 1 ───────────────────────────────────────────────────────
  {
    code: "KPI_01",
    title: "Global Talent Return Scheme",
    shortTitle: "Global Talent",
    category: "talent_acquisition",
    description: "Track recruitment of Indian-origin global scholars back to universities.",
    objective: "Increase world-class faculty by bringing back diaspora academics.",
    targetUnit: "scholars",
    frequency: "quarterly",
    sections: [
      { id: "scheme", title: "Scheme Details", order: 1 },
      { id: "recruitment", title: "Recruitment Progress", order: 2 },
      { id: "financial", title: "Financial Details", order: 3 },
    ],
    fields: [
      { fieldId: "scheme_name", label: "Scheme Name", type: "text", required: true, section: "scheme", order: 1, width: "full", placeholder: "Enter scheme name" },
      { fieldId: "positions_sanctioned", label: "Positions Sanctioned", type: "number", required: true, section: "recruitment", order: 1, width: "half", min: 0 },
      { fieldId: "scholars_recruited", label: "Scholars Recruited", type: "number", required: true, section: "recruitment", order: 2, width: "half", min: 0 },
      { fieldId: "pending_recruitment", label: "Pending Recruitment", type: "calculated", formula: "positions_sanctioned - scholars_recruited", required: false, section: "recruitment", order: 3, width: "half", readOnly: true },
      { fieldId: "recruitment_rate", label: "Recruitment Rate (%)", type: "calculated", formula: "(scholars_recruited / positions_sanctioned) * 100", required: false, section: "recruitment", order: 4, width: "half", readOnly: true, unit: "%" },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "scheme", order: 2, width: "full", placeholder: "Additional remarks..." },
    ],
    documents: [
      { docId: "appointment_letter", label: "Appointment Letter", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "scholar_cv", label: "Scholar CV", required: false, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 2 ───────────────────────────────────────────────────────
  {
    code: "KPI_02",
    title: "Professors of Practice",
    shortTitle: "KPI 2: Professors of Practice",
    category: "talent_acquisition",
    description: "Track industry professionals appointed as Professors of Practice (PoP) under PM-USHA.",
    objective: "Bridge academia-industry gap through practitioner faculty with 15+ years industry experience.",
    targetUnit: "professors",
    frequency: "quarterly",
    sections: [
      { id: "input", title: "Input Fields", order: 1, description: "Data to be collected at the time of engagement" },
      { id: "process", title: "Process / Monitoring Fields", order: 2, description: "Ongoing tracking of PoP activity and impact" },
      { id: "output", title: "Output Fields", order: 3, description: "Outcome / impact assessment" },
    ],
    fields: [
      // ── Input Fields ──
      { fieldId: "appointment_letter", label: "Appointment Letter", type: "file", required: true, section: "input", order: 1, width: "half", helpText: "Upload PDF · Max 5MB" },
      { fieldId: "experience_certificate", label: "Industry Experience Certificate (15+ years)", type: "file", required: true, section: "input", order: 2, width: "half", helpText: "Upload PDF · Max 5MB" },
      { fieldId: "current_affiliation", label: "Current Industry Affiliation (if part-time)", type: "text", required: false, section: "input", order: 3, width: "half", placeholder: "Name of organisation" },
      { fieldId: "field_of_expertise", label: "Field of Expertise", type: "select", required: true, section: "input", order: 4, width: "half", options: [
        { label: "Engineering & Technology", value: "engineering" },
        { label: "Management & Business", value: "management" },
        { label: "Healthcare & Medicine", value: "healthcare" },
        { label: "Law & Governance", value: "law" },
        { label: "Agriculture & Rural Development", value: "agriculture" },
        { label: "Arts & Social Sciences", value: "arts" },
        { label: "Finance & Accounting", value: "finance" },
        { label: "Information Technology", value: "it" },
        { label: "Other", value: "other" },
      ]},
      { fieldId: "category_of_engagement", label: "Category of Engagement", type: "select", required: true, section: "input", order: 5, width: "half", options: [
        { label: "(a) Industry funded", value: "industry_funded" },
        { label: "(b) HEI funded from own resources", value: "hei_funded" },
        { label: "(c) Honorary basis", value: "honorary" },
      ]},
      { fieldId: "tenure_start", label: "Tenure Start Date", type: "date", required: true, section: "input", order: 6, width: "half", helpText: "Partial autocapture from HRMS" },
      { fieldId: "tenure_end", label: "Tenure End Date", type: "date", required: false, section: "input", order: 7, width: "half" },
      { fieldId: "proposed_contribution", label: "Proposed Contribution Areas", type: "multiselect", required: true, section: "input", order: 8, width: "full", options: [
        { label: "Curriculum Design", value: "curriculum" },
        { label: "Industry Projects", value: "industry_projects" },
        { label: "Guest Lectures / Workshops", value: "lectures" },
        { label: "Mentoring Students", value: "mentoring" },
        { label: "Research Collaboration", value: "research" },
        { label: "Consultancy Services", value: "consultancy" },
        { label: "Startup / Incubation Support", value: "startup" },
      ]},

      // ── Process / Monitoring Fields ──
      { fieldId: "pops_appointed", label: "Number of PoPs Appointed", type: "number", required: true, section: "process", order: 1, width: "half", min: 0, helpText: "Partial autocapture from HRMS" },
      { fieldId: "sanctioned_teaching_posts", label: "Sanctioned Teaching Posts", type: "number", required: true, section: "process", order: 2, width: "half", min: 0, helpText: "Partial autocapture from HRMS" },
      { fieldId: "pop_ceiling_pct", label: "PoPs vs Sanctioned Ceiling (%)", type: "calculated", formula: "(pops_appointed / sanctioned_teaching_posts) * 100", required: false, section: "process", order: 3, width: "half", readOnly: true, unit: "%", helpText: "Ceiling is 10% of sanctioned posts" },
      { fieldId: "industry_projects_introduced", label: "Number of Industry Projects Introduced", type: "number", required: false, section: "process", order: 4, width: "half", min: 0 },
      { fieldId: "workshops_conducted", label: "Workshops / Seminars Conducted (jointly with regular faculty)", type: "number", required: false, section: "process", order: 5, width: "half", min: 0 },
      { fieldId: "mentorship_sessions", label: "Innovation / Entrepreneurship Mentorship Sessions", type: "number", required: false, section: "process", order: 6, width: "half", min: 0 },
      { fieldId: "joint_research_projects", label: "Joint Research Projects or Consultancy Services Initiated", type: "number", required: false, section: "process", order: 7, width: "half", min: 0 },

      // ── Output Fields ──
      { fieldId: "student_feedback_score", label: "Student Feedback on Practical Relevance", type: "number", required: false, section: "output", order: 1, width: "half", min: 0, max: 110, helpText: "Score out of 110" },
      { fieldId: "placement_rate_improvement", label: "Placement Rate Improvement in Relevant Sectors (%)", type: "percentage", required: false, section: "output", order: 2, width: "half", min: 0, max: 100, helpText: "Compared to previous year (partial from placement cell)" },
      { fieldId: "students_mentored_innovation", label: "Number of Students Mentored for Innovation / Startup Projects", type: "number", required: false, section: "output", order: 3, width: "half", min: 0 },
      { fieldId: "new_curriculum_modules", label: "New Courses / Curriculum Modules Designed with PoP Input", type: "number", required: false, section: "output", order: 4, width: "half", min: 0 },
      { fieldId: "consultancy_revenue", label: "Consultancy Revenue Generated (₹)", type: "currency", required: false, section: "output", order: 5, width: "half", min: 0, helpText: "Partial autocapture from finance system" },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "output", order: 6, width: "full", placeholder: "Any additional observations or context..." },
    ],
    documents: [
      { docId: "appointment_letter_doc", label: "Appointment Letter", description: "Official appointment letter for each PoP", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "experience_cert", label: "Industry Experience Certificate (15+ years)", description: "Certificate proving 15+ years of industry experience", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "industry_affiliation_proof", label: "Industry Affiliation Proof (if part-time)", description: "Proof of current industry organisation affiliation", required: false, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 3 ───────────────────────────────────────────────────────
  {
    code: "KPI_03",
    title: "Mission Mode Faculty Recruitment",
    shortTitle: "KPI 3: Mission Mode Faculty Recruitment",
    category: "talent_acquisition",
    description: "Track rapid faculty hiring against sanctioned strength under mission mode recruitment.",
    objective: "Fill faculty vacancies quickly to improve student-faculty ratio and teaching quality.",
    targetUnit: "faculty",
    frequency: "monthly",
    sections: [
      { id: "input",   title: "Input Fields",               order: 1, description: "Data to be collected at the time of recruitment process" },
      { id: "process", title: "Process / Monitoring Fields", order: 2, description: "Ongoing tracking of recruitment progress" },
      { id: "output",  title: "Output Fields",               order: 3, description: "Outcome / impact assessment" },
    ],
    fields: [
      // ── Input Fields ──
      { fieldId: "sanctioned_strength",      label: "Sanctioned Strength per Department",       type: "number",     required: true,  section: "input", order: 1, width: "half", min: 0, helpText: "Partial autocapture from government order upload" },
      { fieldId: "current_working_strength", label: "Current Working Strength per Department",  type: "number",     required: true,  section: "input", order: 2, width: "half", min: 0, helpText: "Yes (HRMS)" },
      { fieldId: "vacancy_percentage",       label: "Vacancy Percentage (autocalculated)",       type: "calculated", formula: "((sanctioned_strength - current_working_strength) / sanctioned_strength) * 100", required: false, section: "input", order: 3, width: "half", readOnly: true, unit: "%", helpText: "Yes (from above)" },
      { fieldId: "advertisement_date",       label: "Advertisement Date(s)",                    type: "date",       required: true,  section: "input", order: 4, width: "half", helpText: "Partial (recruitment portal)" },
      { fieldId: "applications_received",    label: "Applications Received per Position",       type: "number",     required: true,  section: "input", order: 5, width: "half", min: 0, helpText: "Partial (recruitment portal) — includes Assistant, Associate, Professor" },
      { fieldId: "shortlisted_candidates",   label: "Shortlisted Candidates per Position",      type: "number",     required: true,  section: "input", order: 6, width: "half", min: 0, helpText: "Partial (recruitment portal)" },
      { fieldId: "candidates_selected",      label: "Number of Candidates Selected (Offers Made)", type: "number", required: true,  section: "input", order: 7, width: "half", min: 0, helpText: "Partial (HRMS)" },
      { fieldId: "candidates_joined",        label: "Number of Candidates Joined",              type: "number",     required: true,  section: "input", order: 8, width: "half", min: 0, helpText: "Yes (HRMS) — offers accepted + joined" },
      { fieldId: "reservation_roster",       label: "Reservation Roster Compliance",            type: "select",     required: true,  section: "input", order: 9, width: "half", options: [
        { label: "Yes", value: "yes" },
        { label: "No — provide explanation", value: "no" },
      ]},
      { fieldId: "reservation_explanation",  label: "Explanation (if Non-Compliant)",           type: "textarea",   required: false, section: "input", order: 10, width: "full", placeholder: "Explain reason for non-compliance...", dependsOn: { fieldId: "reservation_roster", operator: "equals", value: "no" } },
      { fieldId: "government_order",         label: "Government Order / Sanction Document",     type: "file",       required: true,  section: "input", order: 11, width: "half", helpText: "Upload PDF · Max 5MB" },

      // ── Process / Monitoring Fields ──
      { fieldId: "vacancy_trend",            label: "Vacancy Trend (Departmentwise, Monthly %)", type: "percentage", required: false, section: "process", order: 1, width: "half", min: 0, max: 100, helpText: "Yes (from HRMS)" },
      { fieldId: "offer_acceptance_rate",    label: "Offer Acceptance Rate (%)",                type: "calculated", formula: "(candidates_joined / candidates_selected) * 100", required: false, section: "process", order: 2, width: "half", readOnly: true, unit: "%", helpText: "Formula: No. joined / No. selected · Partial (HRMS)" },
      { fieldId: "recruitment_stage_status", label: "Recruitment Stage Status",                 type: "select",     required: true,  section: "process", order: 3, width: "half", options: [
        { label: "Not Started",            value: "not_started" },
        { label: "Advertisement Issued",   value: "advertisement_issued" },
        { label: "Interview Completed",    value: "interview_completed" },
        { label: "Offers Issued",          value: "offers_issued" },
        { label: "Joining Completed",      value: "joining_completed" },
      ]},
      { fieldId: "process_remarks",          label: "Remarks",                                  type: "textarea",   required: false, section: "process", order: 4, width: "full", placeholder: "Any process observations..." },

      // ── Output Fields ──
      { fieldId: "student_faculty_ratio",    label: "Student-Faculty Ratio Improvement",        type: "text",       required: false, section: "output", order: 1, width: "half", placeholder: "e.g. 22:1 → 18:1", helpText: "Partial (AISHE)" },
      { fieldId: "diversity_index_sc",       label: "SC Representation (%)",                    type: "percentage", required: false, section: "output", order: 2, width: "half", min: 0, max: 100, helpText: "Partial (HRMS)" },
      { fieldId: "diversity_index_st",       label: "ST Representation (%)",                    type: "percentage", required: false, section: "output", order: 3, width: "half", min: 0, max: 100, helpText: "Partial (HRMS)" },
      { fieldId: "diversity_index_obc",      label: "OBC Representation (%)",                   type: "percentage", required: false, section: "output", order: 4, width: "half", min: 0, max: 100, helpText: "Partial (HRMS)" },
      { fieldId: "diversity_index_ews",      label: "EWS Representation (%)",                   type: "percentage", required: false, section: "output", order: 5, width: "half", min: 0, max: 100, helpText: "Partial (HRMS)" },
      { fieldId: "diversity_index_gender",   label: "Gender Representation (%)",                type: "percentage", required: false, section: "output", order: 6, width: "half", min: 0, max: 100, helpText: "Partial (HRMS)" },
      { fieldId: "output_remarks",           label: "Remarks",                                  type: "textarea",   required: false, section: "output", order: 7, width: "full", placeholder: "Any outcome observations..." },
    ],
    documents: [
      { docId: "advertisement_copy",   label: "Advertisement Copy",             description: "Published recruitment advertisement", required: true,  formats: ["pdf"], maxSizeMB: 5 },
      { docId: "joining_report",       label: "Joining Report",                 description: "Signed joining report of recruited faculty", required: true,  formats: ["pdf"], maxSizeMB: 5 },
      { docId: "selection_minutes",    label: "Selection Committee Minutes",    description: "Minutes of selection committee meeting", required: false, formats: ["pdf"], maxSizeMB: 10 },
      { docId: "reservation_roster_doc", label: "Reservation Roster Document", description: "Roster showing reservation compliance", required: false, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 4 ───────────────────────────────────────────────────────
  {
    code: "KPI_04",
    title: "Delivery Partnership Agreements & Diversified Funding",
    shortTitle: "Delivery Partnerships",
    category: "industry_partnership",
    description: "Track MOUs and partnerships with industry/foreign institutions.",
    objective: "Diversify funding and co-deliver programs with partners.",
    targetUnit: "partnerships",
    frequency: "quarterly",
    sections: [
      { id: "partnership", title: "Partnership Details", order: 1 },
      { id: "funding", title: "Funding Details", order: 2 },
      { id: "delivery", title: "Delivery Status", order: 3 },
    ],
    fields: [
      { fieldId: "total_mous_signed", label: "Total MOUs Signed", type: "number", required: true, section: "partnership", order: 1, width: "half", min: 0 },
      { fieldId: "active_partnerships", label: "Active Partnerships", type: "number", required: true, section: "partnership", order: 2, width: "half", min: 0 },
      { fieldId: "partner_type", label: "Partner Types", type: "multiselect", required: true, section: "partnership", order: 3, width: "full", options: [
        { label: "Industry", value: "industry" }, { label: "Foreign HEI", value: "foreign_hei" },
        { label: "Govt. Agency", value: "govt" }, { label: "NGO", value: "ngo" }, { label: "Research Institute", value: "research" },
      ]},
      { fieldId: "funding_received", label: "Funding Received (₹)", type: "currency", required: false, section: "funding", order: 1, width: "half", min: 0 },
      { fieldId: "in_kind_value", label: "In-kind Contribution Value (₹)", type: "currency", required: false, section: "funding", order: 2, width: "half", min: 0 },
      { fieldId: "total_funding", label: "Total External Funding (₹)", type: "calculated", formula: "funding_received + in_kind_value", required: false, section: "funding", order: 3, width: "half", readOnly: true },
      { fieldId: "courses_co_delivered", label: "Courses Co-delivered", type: "number", required: false, section: "delivery", order: 1, width: "half", min: 0 },
      { fieldId: "students_benefited", label: "Students Benefited", type: "number", required: false, section: "delivery", order: 2, width: "half", min: 0 },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "partnership", order: 4, width: "full" },
    ],
    documents: [
      { docId: "mou_copy", label: "MOU / Agreement Copy", required: true, formats: ["pdf"], maxSizeMB: 10 },
      { docId: "funding_receipt", label: "Funding Receipt", required: false, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 5 ───────────────────────────────────────────────────────
  {
    code: "KPI_05",
    title: "Curriculum Updates in Emerging Areas",
    shortTitle: "KPI 5: Curriculum Updates",
    category: "industry_partnership",
    description: "Track programmes updated with emerging topics like AI/ML, Data Science, Cybersecurity, Green Tech, Semiconductors, IoT, and Quantum.",
    objective: "Ensure curriculum stays relevant to emerging technology trends and industry needs.",
    targetUnit: "programs",
    frequency: "annual",
    sections: [
      { id: "input",   title: "Input Fields",               order: 1, description: "Data to be collected at the time of curriculum revision" },
      { id: "process", title: "Process / Monitoring Fields", order: 2, description: "Ongoing tracking of curriculum update progress" },
      { id: "output",  title: "Output Fields",               order: 3, description: "Outcome / impact assessment" },
    ],
    fields: [
      // ── Input Fields ──
      { fieldId: "ac_approval_minutes",       label: "Academic Council Approval Minutes",           type: "file",       required: true,  section: "input", order: 1, width: "half", helpText: "Upload PDF · Max 10MB" },
      { fieldId: "ac_approval_date",          label: "Date of Academic Council Approval",           type: "date",       required: true,  section: "input", order: 2, width: "half", helpText: "No autocapture" },
      { fieldId: "programmes_list",           label: "List of Programmes Updated (Program type UG/PG, Programme names)", type: "textarea", required: true, section: "input", order: 3, width: "full", placeholder: "e.g.\nUG – B.Sc. Computer Science\nPG – M.Tech. AI & ML\n...", helpText: "Partial (ERP) — No. of UG/PG programs will be auto-captured" },
      { fieldId: "emerging_topics",           label: "Emerging Topics Integrated",                  type: "multiselect",required: true,  section: "input", order: 4, width: "full", options: [
        { label: "AI / ML",                  value: "ai_ml" },
        { label: "Data Science",             value: "data_science" },
        { label: "Cybersecurity",            value: "cybersecurity" },
        { label: "Green Tech",               value: "green_tech" },
        { label: "Semiconductors",           value: "semiconductors" },
        { label: "IoT",                      value: "iot" },
        { label: "Quantum Computing",        value: "quantum" },
        { label: "Blockchain",               value: "blockchain" },
        { label: "Robotics & Automation",    value: "robotics" },
        { label: "Cloud Computing",          value: "cloud" },
      ], helpText: "No autocapture" },
      { fieldId: "new_courses_details",       label: "New Courses Introduced (Title, Credits)",     type: "textarea",   required: false, section: "input", order: 5, width: "full", placeholder: "e.g.\n1. Introduction to Quantum Computing – 3 credits\n2. Green Tech & Sustainability – 2 credits", helpText: "Partial (ERP)" },
      { fieldId: "new_courses_count",         label: "Number of New Courses Introduced (Auto Capture)", type: "number", required: true, section: "input", order: 6, width: "half", min: 0, helpText: "Partial (ERP)" },
      { fieldId: "pct_courses_revised",       label: "Percentage of Courses Revised (vs. total courses in programme)", type: "percentage", required: true, section: "input", order: 7, width: "half", min: 0, max: 100, helpText: "Partial (ERP)" },
      { fieldId: "ncrf_alignment",            label: "Alignment with National Credit Framework (NCrF)", type: "select", required: true, section: "input", order: 8, width: "half", options: [
        { label: "Yes",                      value: "yes" },
        { label: "No — provide compliance document", value: "no" },
      ], helpText: "No autocapture" },
      { fieldId: "ncrf_compliance_doc",       label: "NCrF Compliance Document",                    type: "file",       required: false, section: "input", order: 9, width: "half", helpText: "Upload if NCrF aligned · PDF · Max 5MB", dependsOn: { fieldId: "ncrf_alignment", operator: "equals", value: "yes" } },

      // ── Process / Monitoring Fields ──
      { fieldId: "pct_programmes_updated",    label: "Percentage of Programmes Updated (by department)", type: "percentage", required: false, section: "process", order: 1, width: "half", min: 0, max: 100, helpText: "Partial (ERP)" },
      { fieldId: "students_enrolled_new",     label: "Number of Students Enrolled in New Courses",  type: "number",     required: true,  section: "process", order: 2, width: "half", min: 0, helpText: "Yes (ERP)" },
      { fieldId: "total_students_programme",  label: "Total Students in Programme",                 type: "number",     required: true,  section: "process", order: 3, width: "half", min: 0, helpText: "For enrolment rate calculation" },
      { fieldId: "student_enrolment_rate",    label: "Student Enrolment Rate in New Courses (%)",   type: "calculated", formula: "(students_enrolled_new / total_students_programme) * 100", required: false, section: "process", order: 4, width: "half", readOnly: true, unit: "%", helpText: "Formula: (Enrolled / total students in programme) × 100 · Yes (ERP)" },
      { fieldId: "process_remarks",           label: "Remarks",                                     type: "textarea",   required: false, section: "process", order: 5, width: "full", placeholder: "Any process observations..." },

      // ── Output Fields ──
      { fieldId: "enrolment_in_new_pct",      label: "Student Enrolment in New Courses (%)",        type: "percentage", required: false, section: "output", order: 1, width: "half", min: 0, max: 100, helpText: "Yes (ERP)" },
      { fieldId: "student_satisfaction",      label: "Student Satisfaction with Curriculum Relevance", type: "number", required: false, section: "output", order: 2, width: "half", min: 0, max: 110, helpText: "No (survey) — score out of 110" },
      { fieldId: "employer_feedback",         label: "Employer Feedback on Curriculum Relevance",   type: "number",     required: false, section: "output", order: 3, width: "half", min: 0, max: 110, helpText: "No — score out of 110" },
      { fieldId: "placement_rate_improvement",label: "Placement Rate Improvement in Emerging Sectors (%)", type: "percentage", required: false, section: "output", order: 4, width: "half", min: 0, max: 100, helpText: "Year-on-year change · Partial (placement cell)" },
      { fieldId: "student_projects_startups", label: "Number of Student Projects / Startups in Emerging Technologies", type: "number", required: false, section: "output", order: 5, width: "half", min: 0, helpText: "No autocapture" },
      { fieldId: "output_remarks",            label: "Remarks",                                     type: "textarea",   required: false, section: "output", order: 6, width: "full", placeholder: "Any outcome observations..." },
    ],
    documents: [
      { docId: "ac_minutes_doc",    label: "Academic Council Approval Minutes", description: "Official minutes of the Academic Council meeting approving curriculum changes", required: true,  formats: ["pdf"], maxSizeMB: 10 },
      { docId: "updated_curriculum",label: "Updated Curriculum Document",        description: "Full updated curriculum / syllabus document",                                  required: true,  formats: ["pdf"], maxSizeMB: 10 },
      { docId: "ncrf_doc",          label: "NCrF Compliance Document",           description: "Document showing alignment with National Credit Framework",                    required: false, formats: ["pdf"], maxSizeMB: 5  },
      { docId: "bos_approval",      label: "BOS Approval Letter",                description: "Board of Studies approval for curriculum changes",                             required: false, formats: ["pdf"], maxSizeMB: 5  },
    ],
  },

  // ─── KPI 6 ───────────────────────────────────────────────────────
  {
    code: "KPI_06",
    title: "Adoption of Unified Digital Platforms",
    shortTitle: "Digital Platforms",
    category: "digital_transformation",
    description: "Track adoption of unified digital platforms across university functions.",
    objective: "Digitize university operations and improve student/faculty experience.",
    targetUnit: "platforms",
    frequency: "quarterly",
    sections: [
      { id: "platform", title: "Platform Details", order: 1 },
      { id: "adoption", title: "Adoption Metrics", order: 2 },
      { id: "financial", title: "Investment Details", order: 3 },
    ],
    fields: [
      { fieldId: "platform_name", label: "Platform Name", type: "text", required: true, section: "platform", order: 1, width: "half", placeholder: "e.g. SAMARTH, DigiLocker" },
      { fieldId: "platform_type", label: "Platform Type", type: "select", required: true, section: "platform", order: 2, width: "half", options: [
        { label: "ERP", value: "erp" }, { label: "LMS", value: "lms" }, { label: "HRMS", value: "hrms" },
        { label: "Student Portal", value: "student_portal" }, { label: "Research Platform", value: "research" }, { label: "Other", value: "other" },
      ]},
      { fieldId: "departments_covered", label: "Departments Covered", type: "number", required: true, section: "adoption", order: 1, width: "half", min: 0 },
      { fieldId: "total_departments", label: "Total Departments", type: "number", required: true, section: "adoption", order: 2, width: "half", min: 0 },
      { fieldId: "adoption_rate", label: "Adoption Rate (%)", type: "calculated", formula: "(departments_covered / total_departments) * 100", required: false, section: "adoption", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "active_users", label: "Active Users", type: "number", required: true, section: "adoption", order: 4, width: "half", min: 0 },
      { fieldId: "investment", label: "Investment (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "investment - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "platform", order: 3, width: "full" },
    ],
    documents: [
      { docId: "platform_screenshot", label: "Platform Screenshots / Demo", required: false, formats: ["pdf", "png", "jpg"], maxSizeMB: 10 },
      { docId: "implementation_report", label: "Implementation Report", required: true, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 7 ───────────────────────────────────────────────────────
  {
    code: "KPI_07",
    title: "Apprenticeship Embedded Degree Programs",
    shortTitle: "KPI 7: Apprenticeship Embedded Degree Programs",
    category: "industry_partnership",
    description: "Track degree programs with embedded apprenticeship components under Govt Survey + Essential Additions.",
    objective: "Ensure students gain industry experience alongside academic learning through structured apprenticeships.",
    targetUnit: "programs",
    frequency: "annual",
    sections: [
      { id: "input",   title: "Input Fields",               order: 1, description: "Includes all govt survey questions" },
      { id: "process", title: "Process / Monitoring Fields", order: 2, description: "Minimal ongoing tracking" },
      { id: "output",  title: "Output Fields",               order: 3, description: "Minimal outcome assessment" },
    ],
    fields: [
      // ── Input Fields ──
      { fieldId: "institution_type",      label: "Type of Institution",                         type: "select",      required: true,  section: "input", order: 1, width: "half", options: [
        { label: "Central",  value: "central"  },
        { label: "State",    value: "state"    },
        { label: "Deemed",   value: "deemed"   },
        { label: "Private",  value: "private"  },
        { label: "Other",    value: "other"    },
      ]},
      { fieldId: "domain_discipline",     label: "Domain / Discipline",                         type: "multiselect", required: true,  section: "input", order: 2, width: "half", options: [
        { label: "Arts",                  value: "arts"         },
        { label: "Commerce",              value: "commerce"     },
        { label: "Sciences",              value: "sciences"     },
        { label: "Management",            value: "management"   },
        { label: "Computer Applications", value: "comp_app"     },
        { label: "Other",                 value: "other"        },
      ]},
      { fieldId: "programme_type",        label: "Programme Type",                              type: "multiselect", required: true,  section: "input", order: 3, width: "half", options: [
        { label: "B.A.",    value: "ba"    },
        { label: "B.Sc.",   value: "bsc"   },
        { label: "B.Com.",  value: "bcom"  },
        { label: "BBA/BBM", value: "bba"   },
        { label: "BCA",     value: "bca"   },
        { label: "Other",   value: "other" },
      ]},
      { fieldId: "programme_details",     label: "Programme Details (Name, Year of Launch, Partner Industries)", type: "textarea", required: true, section: "input", order: 4, width: "full", placeholder: "e.g.\nB.A. (Economics) – 2025 – ABC Enterprises\nB.Sc. (IT) – 2024 – TechCorp Ltd" },
      { fieldId: "students_enrolled",     label: "Number of Students Enrolled (Programmewise)", type: "textarea",    required: true,  section: "input", order: 5, width: "full", placeholder: "e.g.\nB.A. (Economics) – 12\nB.Sc. (IT) – 28" },
      { fieldId: "total_mous_signed",     label: "Total Number of MoUs Signed",                 type: "number",      required: true,  section: "input", order: 6, width: "half", min: 0 },
      { fieldId: "stipend_amount",        label: "Stipend Amount (₹ per month)",                type: "currency",    required: false, section: "input", order: 7, width: "half", min: 0, helpText: "Additional field" },
      { fieldId: "stipend_source",        label: "Stipend Source",                              type: "select",      required: false, section: "input", order: 8, width: "half", options: [
        { label: "Government (NATS)", value: "nats"     },
        { label: "Industry",          value: "industry" },
        { label: "Both",              value: "both"     },
      ], helpText: "Additional field" },

      // ── Process / Monitoring Fields ──
      { fieldId: "completion_rate",       label: "Apprenticeship Completion Rate (%)",          type: "percentage",  required: false, section: "process", order: 1, width: "half", min: 0, max: 100 },
      { fieldId: "stipend_disbursement",  label: "Stipend Disbursement Status",                 type: "select",      required: false, section: "process", order: 2, width: "half", options: [
        { label: "On time",       value: "on_time"      },
        { label: "Delayed",       value: "delayed"      },
        { label: "Not disbursed", value: "not_disbursed"},
      ]},
      { fieldId: "process_remarks",       label: "Remarks",                                     type: "textarea",    required: false, section: "process", order: 3, width: "full", placeholder: "Any process observations..." },

      // ── Output Fields ──
      { fieldId: "employment_placement",  label: "Employment Placement Rate within 6 months (%)", type: "percentage", required: false, section: "output", order: 1, width: "half", min: 0, max: 100 },
      { fieldId: "student_satisfaction",  label: "Student Satisfaction with Apprenticeship",    type: "number",      required: false, section: "output", order: 2, width: "half", min: 0, max: 110, helpText: "Score out of 110" },
      { fieldId: "output_remarks",        label: "Remarks",                                     type: "textarea",    required: false, section: "output", order: 3, width: "full", placeholder: "Any outcome observations..." },
    ],
    documents: [
      { docId: "program_structure", label: "Program Structure Document",  description: "Full structure of apprenticeship-embedded degree program", required: true,  formats: ["pdf"], maxSizeMB: 5  },
      { docId: "industry_mou",      label: "Industry Partner MOU",        description: "Signed MoU with each industry partner",                    required: true,  formats: ["pdf"], maxSizeMB: 5  },
      { docId: "nats_registration", label: "NATS Registration Proof",     description: "Proof of registration on NATS portal (if applicable)",     required: false, formats: ["pdf"], maxSizeMB: 5  },
      { docId: "stipend_records",   label: "Stipend Disbursement Records", description: "Records of stipend payments to students",                 required: false, formats: ["pdf"], maxSizeMB: 10 },
    ],
  },

  // ─── KPI 8 ───────────────────────────────────────────────────────
  {
    code: "KPI_08",
    title: "Skill Course Integration (UGC Guidelines)",
    shortTitle: "KPI 8: Skill Course Integration",
    category: "learning_resources",
    description: "Track integration of UGC-guideline skill courses into degree programs with student enrolment and certification data.",
    objective: "Ensure >25% of students enrol in skill courses and achieve industry certifications.",
    targetUnit: "courses",
    frequency: "annual",
    sections: [
      { id: "input",   title: "Input Fields",               order: 1, description: "Data to be collected at the time of skill course integration" },
      { id: "process", title: "Monitoring / Process Fields", order: 2, description: "Ongoing tracking of enrolment and completion" },
      { id: "output",  title: "Output Fields",               order: 3, description: "Outcome and industry impact assessment" },
    ],
    fields: [
      // ── Input Fields ──
      { fieldId: "ac_approval",             label: "Academic Council Approval",                           type: "file",       required: true,  section: "input", order: 1, width: "half", helpText: "Document upload · No autocapture" },
      { fieldId: "skill_course_list",        label: "Skill Course List (title, credits, NSQF level)",      type: "textarea",   required: true,  section: "input", order: 2, width: "full", placeholder: "e.g.\n1. Python Programming – 3 credits – NSQF Level 5\n2. Digital Marketing – 2 credits – NSQF Level 4", helpText: "Text + Number + Text · No autocapture" },
      { fieldId: "pct_credits_skill",        label: "% of Total Credits Allocated to Skill Courses",       type: "percentage", required: true,  section: "input", order: 3, width: "half", min: 0, max: 100, helpText: "No autocapture" },
      { fieldId: "skill_courses_total",      label: "Number of Skill Courses Offered (Total)",             type: "number",     required: true,  section: "input", order: 4, width: "half", min: 0, helpText: "No autocapture" },
      { fieldId: "students_enrolled_skill",  label: "Number of Students Enrolled in Skill Courses (Total – UG & PG wise)", type: "number", required: true, section: "input", order: 5, width: "half", min: 0, helpText: "Yes (ERP)" },
      { fieldId: "total_student_enrolment",  label: "Total Student Enrolment (UG+PG)",                    type: "number",     required: true,  section: "input", order: 6, width: "half", min: 0, helpText: "Yes (AISHE / ERP)" },

      // ── Process / Monitoring Fields ──
      { fieldId: "pct_students_skill",       label: "% of Students Enrolled in Skill Courses (auto)",      type: "calculated", formula: "(students_enrolled_skill / total_student_enrolment) * 100", required: false, section: "process", order: 1, width: "half", readOnly: true, unit: "%", helpText: "Yes (ERP)" },
      { fieldId: "semester_completion_rate", label: "Semester-wise Course Completion Rate (%)",            type: "percentage", required: false, section: "process", order: 2, width: "half", min: 0, max: 100, helpText: "Partial (ERP)" },
      { fieldId: "students_completed_skill", label: "Number of Students Who Completed at Least One Skill Course", type: "number", required: true, section: "process", order: 3, width: "half", min: 0, helpText: "Partial (ERP)" },
      { fieldId: "dropout_rate_skill",       label: "Dropout Rate from Skill Courses (%)",                 type: "percentage", required: false, section: "process", order: 4, width: "half", min: 0, max: 100, helpText: "Partial (ERP)" },

      // ── Output Fields ──
      { fieldId: "industry_cert_rate",       label: "Industry Certification Achievement Rate (%)",          type: "percentage", required: false, section: "output", order: 1, width: "half", min: 0, max: 100, helpText: "Partial (certification body)" },
      { fieldId: "student_satisfaction",     label: "Student Satisfaction (1–10)",                         type: "number",     required: false, section: "output", order: 2, width: "half", min: 1, max: 10, helpText: "No autocapture" },
      { fieldId: "placement_rate_skill",     label: "Placement Rate Improvement among Skill-Certified Students (%)", type: "percentage", required: false, section: "output", order: 3, width: "half", min: 0, max: 100, helpText: "Partial (placement cell)" },
      { fieldId: "industry_partners_cert",   label: "Number of Industry Partners Providing Certifications", type: "number",     required: false, section: "output", order: 4, width: "half", min: 0, helpText: "No autocapture" },
    ],
    documents: [
      { docId: "ac_approval_doc",      label: "Academic Council Approval",          required: true,  formats: ["pdf"], maxSizeMB: 5 },
      { docId: "skill_course_list_doc", label: "Skill Course List & Syllabus",       required: true,  formats: ["pdf"], maxSizeMB: 10 },
      { docId: "certification_agreements", label: "Industry Certification Agreements", required: false, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 9 ───────────────────────────────────────────────────────
  {
    code: "KPI_09",
    title: "Framework for Vacancy Linked Grants",
    shortTitle: "Vacancy Grants",
    category: "governance_reform",
    description: "Track implementation of vacancy-linked grant framework.",
    objective: "Ensure grants are tied to actual faculty vacancy filling.",
    targetUnit: "grants",
    frequency: "quarterly",
    sections: [
      { id: "grants", title: "Grant Details", order: 1 },
      { id: "vacancy", title: "Vacancy Linkage", order: 2 },
    ],
    fields: [
      { fieldId: "total_grants", label: "Total Grants Received", type: "number", required: true, section: "grants", order: 1, width: "half", min: 0 },
      { fieldId: "vacancy_linked_grants", label: "Vacancy Linked Grants", type: "number", required: true, section: "grants", order: 2, width: "half", min: 0 },
      { fieldId: "linkage_rate", label: "Linkage Rate (%)", type: "calculated", formula: "(vacancy_linked_grants / total_grants) * 100", required: false, section: "grants", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "grant_amount", label: "Total Grant Amount (₹)", type: "currency", required: true, section: "grants", order: 4, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "grants", order: 5, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "grant_amount - expenditure", required: false, section: "grants", order: 6, width: "half", readOnly: true },
      { fieldId: "vacancies_filled_via_grant", label: "Vacancies Filled via Grant", type: "number", required: true, section: "vacancy", order: 1, width: "half", min: 0 },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "grants", order: 7, width: "full" },
    ],
    documents: [
      { docId: "grant_order", label: "Grant Sanction Order", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "utilization_cert", label: "Utilization Certificate", required: true, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 10 ──────────────────────────────────────────────────────
  {
    code: "KPI_10",
    title: "Foreign HEI Campuses",
    shortTitle: "Foreign Campuses",
    category: "international",
    description: "Track establishment or collaboration with foreign HEI campuses.",
    objective: "Internationalize education through foreign institution partnerships.",
    targetUnit: "campuses",
    frequency: "annual",
    sections: [
      { id: "campus", title: "Campus Details", order: 1 },
      { id: "programs", title: "Programs Offered", order: 2 },
      { id: "financial", title: "Financial Details", order: 3 },
    ],
    fields: [
      { fieldId: "foreign_hei_name", label: "Foreign HEI Name", type: "text", required: true, section: "campus", order: 1, width: "full", placeholder: "Name of foreign institution" },
      { fieldId: "country", label: "Country", type: "text", required: true, section: "campus", order: 2, width: "half" },
      { fieldId: "collaboration_type", label: "Collaboration Type", type: "select", required: true, section: "campus", order: 3, width: "half", options: [
        { label: "Full Campus", value: "full_campus" }, { label: "Twinning Program", value: "twinning" },
        { label: "Joint Degree", value: "joint_degree" }, { label: "Research Collaboration", value: "research" },
      ]},
      { fieldId: "programs_offered", label: "No. of Programs Offered", type: "number", required: true, section: "programs", order: 1, width: "half", min: 0 },
      { fieldId: "students_enrolled", label: "Students Enrolled", type: "number", required: true, section: "programs", order: 2, width: "half", min: 0 },
      { fieldId: "mou_date", label: "MOU Date", type: "date", required: true, section: "campus", order: 4, width: "half" },
      { fieldId: "mou_validity", label: "MOU Validity Date", type: "date", required: true, section: "campus", order: 5, width: "half" },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "campus", order: 6, width: "full" },
    ],
    documents: [
      { docId: "mou_copy", label: "MOU / Agreement Copy", required: true, formats: ["pdf"], maxSizeMB: 10 },
      { docId: "approval_letter", label: "UGC/Govt Approval Letter", required: true, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 11 ──────────────────────────────────────────────────────
  {
    code: "KPI_11",
    title: "Train at Least 25% Faculty on Emerging Technologies",
    shortTitle: "KPI 11: Faculty Training – Emerging Tech",
    category: "learning_resources",
    description: "Track faculty training on emerging technologies (AI/ML, Cloud, etc.) to ensure at least 25% of faculty are trained.",
    objective: "Upskill at least 25% of faculty in emerging technologies to keep curriculum industry-relevant.",
    targetUnit: "faculty",
    frequency: "quarterly",
    sections: [
      { id: "input",   title: "Input Fields",               order: 1, description: "Data collected at the time of training enrolment" },
      { id: "process", title: "Monitoring / Process Fields", order: 2, description: "Ongoing tracking of training completion and certification" },
      { id: "output",  title: "Output Fields",               order: 3, description: "Curriculum and industry impact of trained faculty" },
    ],
    fields: [
      // ── Input Fields ──
      { fieldId: "training_provider",         label: "Training Provider Name",                               type: "text",       required: true,  section: "input", order: 1, width: "half", placeholder: "e.g. NPTEL, Coursera, Industry Partner", helpText: "No autocapture" },
      { fieldId: "technology_domain",         label: "Technology Domain",                                    type: "select",     required: true,  section: "input", order: 2, width: "half", options: [
        { label: "AI / ML",              value: "ai_ml"      },
        { label: "Cloud Computing",      value: "cloud"      },
        { label: "Data Science",         value: "data_science"},
        { label: "Cybersecurity",        value: "cybersecurity"},
        { label: "IoT",                  value: "iot"        },
        { label: "Blockchain",           value: "blockchain" },
        { label: "Quantum Computing",    value: "quantum"    },
        { label: "Other",                value: "other"      },
      ], helpText: "No autocapture" },
      { fieldId: "faculty_registered",        label: "Number of Faculty Registered for Training",            type: "number",     required: true,  section: "input", order: 3, width: "half", min: 0, helpText: "Partial (LMS)" },
      { fieldId: "total_faculty_strength",    label: "Total Faculty Strength (Department-wise)",             type: "number",     required: true,  section: "input", order: 4, width: "half", min: 0, helpText: "Yes (HRMS)" },
      { fieldId: "cert_issue_date",           label: "Certificate Issue Date",                               type: "date",       required: false, section: "input", order: 5, width: "half", helpText: "Partial (LMS)" },
      { fieldId: "certification_obtained",    label: "Certification Obtained (Yes/No)",                      type: "select",     required: true,  section: "input", order: 6, width: "half", options: [
        { label: "Yes", value: "yes" },
        { label: "No",  value: "no"  },
      ], helpText: "Partial (LMS)" },

      // ── Process / Monitoring Fields ──
      { fieldId: "pct_faculty_trained",       label: "Faculty Trained (% of Total) – auto from counts",      type: "calculated", formula: "(faculty_registered / total_faculty_strength) * 100", required: false, section: "process", order: 1, width: "half", readOnly: true, unit: "%", helpText: "Yes (HRMS)" },
      { fieldId: "certification_rate",        label: "Certification Rate (%)",                               type: "percentage", required: false, section: "process", order: 2, width: "half", min: 0, max: 100, helpText: "Partial (LMS)" },
      { fieldId: "faculty_completed",         label: "Number of Faculty Who Completed Training (Cumulative)", type: "number",     required: true,  section: "process", order: 3, width: "half", min: 0, helpText: "Partial (LMS)" },

      // ── Output Fields ──
      { fieldId: "new_courses_trained_faculty", label: "New Courses Introduced by Trained Faculty",          type: "number",     required: false, section: "output", order: 1, width: "half", min: 0, helpText: "Partial (ERP)" },
      { fieldId: "student_projects_emerging",   label: "Student Projects Mentored in Emerging Tech",         type: "number",     required: false, section: "output", order: 2, width: "half", min: 0, helpText: "No autocapture" },
      { fieldId: "curriculum_revision_count",   label: "Number of Faculty Who Applied Training to Curriculum Revision", type: "number", required: false, section: "output", order: 3, width: "half", min: 0, helpText: "No (self-reported)" },
      { fieldId: "industry_recognition",        label: "Industry Recognition / Awards Received by Trained Faculty", type: "number", required: false, section: "output", order: 4, width: "half", min: 0, helpText: "No autocapture" },
    ],
    documents: [
      { docId: "training_completion_report", label: "Training Completion Report", required: true,  formats: ["pdf"], maxSizeMB: 5 },
      { docId: "certificates",               label: "Sample Certificates",         required: false, formats: ["pdf"], maxSizeMB: 10 },
      { docId: "lms_export",                 label: "LMS Training Data Export",    required: false, formats: ["pdf", "xlsx"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 12 ──────────────────────────────────────────────────────
  {
    code: "KPI_12",
    title: "GER Increase",
    shortTitle: "GER Increase",
    category: "enrollment_access",
    description: "Track Gross Enrollment Ratio improvements.",
    objective: "Increase access to higher education across demographics.",
    targetUnit: "percentage points",
    frequency: "annual",
    sections: [
      { id: "enrollment", title: "Enrollment Data", order: 1 },
      { id: "demographics", title: "Demographic Breakdown", order: 2 },
    ],
    fields: [
      { fieldId: "total_enrollment", label: "Total Student Enrollment", type: "number", required: true, section: "enrollment", order: 1, width: "half", min: 0 },
      { fieldId: "prev_year_enrollment", label: "Previous Year Enrollment", type: "number", required: true, section: "enrollment", order: 2, width: "half", min: 0 },
      { fieldId: "enrollment_growth", label: "Enrollment Growth (%)", type: "calculated", formula: "((total_enrollment - prev_year_enrollment) / prev_year_enrollment) * 100", required: false, section: "enrollment", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "ger_current", label: "Current GER (%)", type: "percentage", required: true, section: "enrollment", order: 4, width: "half", min: 0, max: 100 },
      { fieldId: "ger_target", label: "Target GER (%)", type: "percentage", required: true, section: "enrollment", order: 5, width: "half", min: 0, max: 100 },
      { fieldId: "ger_gap", label: "GER Gap", type: "calculated", formula: "ger_target - ger_current", required: false, section: "enrollment", order: 6, width: "half", readOnly: true, unit: "%" },
      { fieldId: "sc_st_enrollment", label: "SC/ST Student Enrollment", type: "number", required: true, section: "demographics", order: 1, width: "half", min: 0 },
      { fieldId: "women_enrollment", label: "Women Student Enrollment", type: "number", required: true, section: "demographics", order: 2, width: "half", min: 0 },
      { fieldId: "rural_enrollment", label: "Rural Student Enrollment", type: "number", required: false, section: "demographics", order: 3, width: "half", min: 0 },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "enrollment", order: 7, width: "full" },
    ],
    documents: [
      { docId: "aishe_report", label: "AISHE Report Extract", required: true, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 13 ──────────────────────────────────────────────────────
  {
    code: "KPI_13",
    title: "Regulatory Reforms & Autonomy",
    shortTitle: "Regulatory Reforms",
    category: "governance_reform",
    description: "Track progress in regulatory reforms and academic autonomy grants.",
    objective: "Improve institutional governance through reduced regulatory burden.",
    targetUnit: "reforms",
    frequency: "annual",
    sections: [
      { id: "reforms", title: "Reform Details", order: 1 },
      { id: "autonomy", title: "Autonomy Metrics", order: 2 },
    ],
    fields: [
      { fieldId: "reforms_implemented", label: "Reforms Implemented", type: "number", required: true, section: "reforms", order: 1, width: "half", min: 0 },
      { fieldId: "reforms_planned", label: "Reforms Planned", type: "number", required: true, section: "reforms", order: 2, width: "half", min: 0 },
      { fieldId: "reform_completion_rate", label: "Reform Completion Rate (%)", type: "calculated", formula: "(reforms_implemented / reforms_planned) * 100", required: false, section: "reforms", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "autonomy_level", label: "Autonomy Level Achieved", type: "select", required: true, section: "autonomy", order: 1, width: "half", options: [
        { label: "None", value: "none" }, { label: "Academic Autonomy", value: "academic" },
        { label: "Administrative Autonomy", value: "administrative" }, { label: "Full Autonomy", value: "full" },
      ]},
      { fieldId: "accreditation_grade", label: "NAAC/NBA Grade", type: "text", required: false, section: "autonomy", order: 2, width: "half", placeholder: "e.g. A++" },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "reforms", order: 4, width: "full" },
    ],
    documents: [
      { docId: "reform_order", label: "Reform Order / Notification", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "accreditation_cert", label: "Accreditation Certificate", required: false, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 14 ──────────────────────────────────────────────────────
  {
    code: "KPI_14",
    title: "Ensure >25% Students Enrolled in Skill Courses – Separate Tracking (Simplified)",
    shortTitle: "KPI 14: 25% Skill Enrolment Tracking",
    category: "learning_resources",
    description: "Simplified separate tracking to ensure at least 25% of total student population is enrolled in at least one skill course.",
    objective: "Verify ≥25% skill course enrolment target is met each semester/year.",
    targetUnit: "percentage",
    frequency: "annual",
    sections: [
      { id: "input",   title: "Input Fields",               order: 1, description: "Core enrolment data collection" },
      { id: "process", title: "Monitoring / Process Fields", order: 2, description: "Target tracking and gap analysis" },
      { id: "output",  title: "Output Fields",               order: 3, description: "Optional contextual output fields" },
    ],
    fields: [
      // ── Input Fields ──
      { fieldId: "students_in_skill",         label: "Total Number of Students Enrolled in at Least One Skill Course", type: "number",     required: true,  section: "input", order: 1, width: "half", min: 0, helpText: "Yes (ERP)" },
      { fieldId: "total_student_population",  label: "Total Student Population (UG+PG)",                              type: "number",     required: true,  section: "input", order: 2, width: "half", min: 0, helpText: "Yes (AISHE / ERP)" },
      { fieldId: "pct_enrolled_skill",        label: "Percentage of Students Enrolled (auto-calculated)",             type: "calculated", formula: "(students_in_skill / total_student_population) * 100", required: false, section: "input", order: 3, width: "half", readOnly: true, unit: "%", helpText: "Yes (from above)" },
      { fieldId: "reporting_period",          label: "Reporting Period",                                              type: "select",     required: true,  section: "input", order: 4, width: "half", options: [
        { label: "Semester", value: "semester" },
        { label: "Annual",   value: "annual"   },
      ], helpText: "No autocapture" },

      // ── Process / Monitoring Fields ──
      { fieldId: "target_achieved",           label: "Target Achieved (≥25%)",                                        type: "calculated", formula: "pct_enrolled_skill >= 25 ? 1 : 0", required: false, section: "process", order: 1, width: "half", readOnly: true, helpText: "Yes (auto)" },
      { fieldId: "gap_to_target",             label: "Gap to Target (Percentage Points)",                             type: "calculated", formula: "25 - pct_enrolled_skill", required: false, section: "process", order: 2, width: "half", readOnly: true, helpText: "Yes (auto)" },

      // ── Output Fields (optional) ──
      { fieldId: "skill_courses_offered_14",  label: "Number of Skill Courses Offered",                               type: "number",     required: false, section: "output", order: 1, width: "half", min: 0, helpText: "No autocapture" },
      { fieldId: "industry_cert_rate_14",     label: "Industry Certification Rate (among Enrolled) (%)",              type: "percentage", required: false, section: "output", order: 2, width: "half", min: 0, max: 100, helpText: "Partial autocapture" },
      { fieldId: "output_note",               label: "Notes", type: "textarea", required: false, section: "output", order: 3, width: "full", placeholder: "No additional output fields needed — the enrollment percentage itself is the primary outcome. However, for context, you may optionally include the fields above." },
    ],
    documents: [
      { docId: "enrollment_data",  label: "Enrollment Data Sheet",            required: true,  formats: ["pdf", "xlsx"], maxSizeMB: 5 },
      { docId: "erp_export",       label: "ERP Export of Skill Enrolments",   required: false, formats: ["pdf", "xlsx"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 15 ──────────────────────────────────────────────────────
  {
    code: "KPI_15",
    title: "Incubation Centres & Innovation Ecosystems",
    shortTitle: "Incubation Centres",
    category: "innovation_ecosystem",
    description: "Track establishment and performance of university incubation centres.",
    objective: "Foster entrepreneurship and innovation within the university.",
    targetUnit: "centres",
    frequency: "annual",
    sections: [
      { id: "centre", title: "Centre Details", order: 1 },
      { id: "startups", title: "Startup Metrics", order: 2 },
      { id: "financial", title: "Financial Details", order: 3 },
    ],
    fields: [
      { fieldId: "incubation_centres", label: "No. of Incubation Centres", type: "number", required: true, section: "centre", order: 1, width: "half", min: 0 },
      { fieldId: "centre_area_sqft", label: "Total Area (sq. ft.)", type: "number", required: false, section: "centre", order: 2, width: "half", min: 0 },
      { fieldId: "startups_incubated", label: "Startups Incubated", type: "number", required: true, section: "startups", order: 1, width: "half", min: 0 },
      { fieldId: "startups_funded", label: "Startups Received Funding", type: "number", required: false, section: "startups", order: 2, width: "half", min: 0 },
      { fieldId: "jobs_created", label: "Jobs Created by Startups", type: "number", required: false, section: "startups", order: 3, width: "half", min: 0 },
      { fieldId: "revenue_generated", label: "Revenue Generated by Startups (₹)", type: "currency", required: false, section: "startups", order: 4, width: "half", min: 0 },
      { fieldId: "patents_filed", label: "Patents Filed", type: "number", required: false, section: "startups", order: 5, width: "half", min: 0 },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "centre", order: 3, width: "full" },
    ],
    documents: [
      { docId: "centre_photos", label: "Centre Photos", required: false, formats: ["pdf", "jpg", "png"], maxSizeMB: 10 },
      { docId: "startup_list", label: "List of Incubated Startups", required: true, formats: ["pdf", "xlsx"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 16 ──────────────────────────────────────────────────────
  {
    code: "KPI_16",
    title: "Increase International Students by 20%",
    shortTitle: "KPI 16: International Students (+20%)",
    category: "outreach_inclusivity",
    description: "Track enrolment and 20% year-on-year growth of international students via applications, offers, visas, and actual enrolments.",
    objective: "Increase international student enrolment by ≥20% year-on-year.",
    targetUnit: "students",
    frequency: "annual",
    sections: [
      { id: "input",   title: "Input Fields",               order: 1, description: "Application pipeline and enrolment data" },
      { id: "process", title: "Monitoring / Process Fields", order: 2, description: "Growth tracking and target achievement" },
      { id: "output",  title: "Output Fields",               order: 3, description: "Retention, satisfaction, and academic outcomes" },
    ],
    fields: [
      // ── Input Fields ──
      { fieldId: "applications_received_intl", label: "Applications Received",                               type: "number",     required: true,  section: "input", order: 1, width: "half", min: 0, helpText: "Partial (SII portal)" },
      { fieldId: "offer_letters_issued",        label: "Offer Letters Issued",                                type: "number",     required: true,  section: "input", order: 2, width: "half", min: 0, helpText: "Partial (SII portal)" },
      { fieldId: "visas_granted",               label: "Visas Granted",                                       type: "number",     required: true,  section: "input", order: 3, width: "half", min: 0, helpText: "Partial (SII portal)" },
      { fieldId: "actual_enrolments_intl",      label: "Actual Enrolments",                                   type: "number",     required: true,  section: "input", order: 4, width: "half", min: 0, helpText: "Yes (SII portal)" },
      { fieldId: "country_of_origin_list",      label: "Country of Origin (List)",                            type: "textarea",   required: false, section: "input", order: 5, width: "full", placeholder: "e.g.\nUnited States – 12\nNigeria – 8\nAfghanistan – 5", helpText: "Yes (SII portal)" },
      { fieldId: "baseline_enrolment",          label: "Baseline Enrolment (Previous Academic Year)",         type: "number",     required: true,  section: "input", order: 6, width: "half", min: 0, helpText: "Yes (SII portal / AISHE)" },
      { fieldId: "target_enrolment_20pct",      label: "Target Enrolment for Current Year (20% Increase)",    type: "calculated", formula: "baseline_enrolment * 1.2", required: false, section: "input", order: 7, width: "half", readOnly: true, helpText: "Yes (from baseline – auto-calculated)" },

      // ── Process / Monitoring Fields ──
      { fieldId: "intl_growth_yoy",             label: "International Student Enrolment Growth (%) – Year-on-Year", type: "calculated", formula: "((actual_enrolments_intl - baseline_enrolment) / baseline_enrolment) * 100", required: false, section: "process", order: 1, width: "half", readOnly: true, unit: "%", helpText: "Yes (SII portal)" },
      { fieldId: "source_country_diversity",    label: "Source Country Diversity (Number of Countries)",      type: "number",     required: false, section: "process", order: 2, width: "half", min: 0, helpText: "Yes (SII portal)" },
      { fieldId: "target_achievement_20",       label: "Target Achievement Status (≥20% Increase)",           type: "calculated", formula: "intl_growth_yoy >= 20 ? 1 : 0", required: false, section: "process", order: 3, width: "half", readOnly: true, helpText: "Yes (auto)" },
      { fieldId: "gap_to_20_target",            label: "Gap to Target (Percentage Points)",                   type: "calculated", formula: "20 - intl_growth_yoy", required: false, section: "process", order: 4, width: "half", readOnly: true, helpText: "Yes (auto)" },

      // ── Output Fields ──
      { fieldId: "retention_rate_intl",         label: "Retention Rate of International Students (%)",        type: "percentage", required: false, section: "output", order: 1, width: "half", min: 0, max: 100, helpText: "Partial (ERP)" },
      { fieldId: "student_satisfaction_intl",   label: "Student Satisfaction Score (1–10)",                   type: "number",     required: false, section: "output", order: 2, width: "half", min: 1, max: 10, helpText: "No (survey)" },
      { fieldId: "avg_cgpa_intl",               label: "Academic Performance (Average CGPA of International Students)", type: "number", required: false, section: "output", order: 3, width: "half", min: 0, max: 10, helpText: "Yes (ERP)" },
      { fieldId: "intl_graduates",              label: "Number of International Students Who Graduated",      type: "number",     required: false, section: "output", order: 4, width: "half", min: 0, helpText: "Yes (ERP)" },
    ],
    documents: [
      { docId: "sii_portal_export",    label: "SII Portal Enrolment Export",           required: true,  formats: ["pdf", "xlsx"], maxSizeMB: 5 },
      { docId: "visa_records",         label: "Visa Grant Records",                     required: false, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "aishe_intl_data",      label: "AISHE International Student Data",       required: false, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 17 ──────────────────────────────────────────────────────
  {
    code: "KPI_17",
    title: "Model Finishing Schools",
    shortTitle: "Finishing Schools",
    category: "infrastructure",
    description: "Track establishment of model finishing schools for employability skills.",
    objective: "Improve student employability through finishing school programs.",
    targetUnit: "schools",
    frequency: "annual",
    sections: [
      { id: "school", title: "School Details", order: 1 },
      { id: "outcomes", title: "Outcome Metrics", order: 2 },
      { id: "financial", title: "Financial Details", order: 3 },
    ],
    fields: [
      { fieldId: "schools_established", label: "Finishing Schools Established", type: "number", required: true, section: "school", order: 1, width: "half", min: 0 },
      { fieldId: "students_enrolled", label: "Students Enrolled", type: "number", required: true, section: "school", order: 2, width: "half", min: 0 },
      { fieldId: "placement_rate", label: "Placement Rate (%)", type: "percentage", required: true, section: "outcomes", order: 1, width: "half", min: 0, max: 100 },
      { fieldId: "avg_package", label: "Avg. Package Offered (₹)", type: "currency", required: false, section: "outcomes", order: 2, width: "half", min: 0 },
      { fieldId: "industry_partners", label: "Industry Partners for Placement", type: "number", required: false, section: "outcomes", order: 3, width: "half", min: 0 },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "school", order: 3, width: "full" },
    ],
    documents: [
      { docId: "school_setup_report", label: "School Setup Report", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "placement_report", label: "Placement Report", required: false, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 18 ──────────────────────────────────────────────────────
  {
    code: "KPI_18",
    title: "Mega Educational Hubs / Clusters",
    shortTitle: "Edu Hubs",
    category: "international",
    description: "Track development of mega educational hubs and knowledge clusters.",
    objective: "Create world-class educational ecosystems attracting global talent.",
    targetUnit: "hubs",
    frequency: "annual",
    sections: [
      { id: "hub", title: "Hub Details", order: 1 },
      { id: "financial", title: "Financial Details", order: 2 },
    ],
    fields: [
      { fieldId: "hubs_proposed", label: "Hubs Proposed", type: "number", required: true, section: "hub", order: 1, width: "half", min: 0 },
      { fieldId: "hubs_operational", label: "Hubs Operational", type: "number", required: true, section: "hub", order: 2, width: "half", min: 0 },
      { fieldId: "institutions_in_hub", label: "Institutions in Hub", type: "number", required: false, section: "hub", order: 3, width: "half", min: 0 },
      { fieldId: "students_capacity", label: "Student Capacity", type: "number", required: false, section: "hub", order: 4, width: "half", min: 0 },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "hub", order: 5, width: "full" },
    ],
    documents: [
      { docId: "hub_plan", label: "Hub Development Plan", required: true, formats: ["pdf"], maxSizeMB: 10 },
    ],
  },

  // ─── KPI 19 ──────────────────────────────────────────────────────
  {
    code: "KPI_19",
    title: "Multiversity",
    shortTitle: "Multiversity",
    category: "infrastructure",
    description: "Track progress towards multiversity model adoption.",
    objective: "Transition universities to multidisciplinary multiversity model.",
    targetUnit: "initiatives",
    frequency: "annual",
    sections: [
      { id: "multiversity", title: "Multiversity Details", order: 1 },
      { id: "financial", title: "Financial Details", order: 2 },
    ],
    fields: [
      { fieldId: "disciplines_offered", label: "No. of Disciplines Offered", type: "number", required: true, section: "multiversity", order: 1, width: "half", min: 0 },
      { fieldId: "interdisciplinary_programs", label: "Interdisciplinary Programs", type: "number", required: true, section: "multiversity", order: 2, width: "half", min: 0 },
      { fieldId: "cross_dept_courses", label: "Cross-department Courses", type: "number", required: false, section: "multiversity", order: 3, width: "half", min: 0 },
      { fieldId: "students_in_multi_programs", label: "Students in Multi-disciplinary Programs", type: "number", required: true, section: "multiversity", order: 4, width: "half", min: 0 },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "multiversity", order: 5, width: "full" },
    ],
    documents: [
      { docId: "academic_plan", label: "Academic Restructuring Plan", required: true, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 20 ──────────────────────────────────────────────────────
  {
    code: "KPI_20",
    title: "Research Parks",
    shortTitle: "Research Parks",
    category: "innovation_ecosystem",
    description: "Track development and performance of research parks.",
    objective: "Foster applied research and industry-academia collaboration.",
    targetUnit: "parks",
    frequency: "annual",
    sections: [
      { id: "park", title: "Research Park Details", order: 1 },
      { id: "research", title: "Research Output", order: 2 },
      { id: "financial", title: "Financial Details", order: 3 },
    ],
    fields: [
      { fieldId: "parks_established", label: "Research Parks Established", type: "number", required: true, section: "park", order: 1, width: "half", min: 0 },
      { fieldId: "companies_in_park", label: "Companies in Research Park", type: "number", required: false, section: "park", order: 2, width: "half", min: 0 },
      { fieldId: "research_projects", label: "Active Research Projects", type: "number", required: true, section: "research", order: 1, width: "half", min: 0 },
      { fieldId: "patents_filed", label: "Patents Filed", type: "number", required: false, section: "research", order: 2, width: "half", min: 0 },
      { fieldId: "publications", label: "Research Publications", type: "number", required: false, section: "research", order: 3, width: "half", min: 0 },
      { fieldId: "research_funding", label: "External Research Funding Attracted (₹)", type: "currency", required: false, section: "research", order: 4, width: "half", min: 0 },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "park", order: 3, width: "full" },
    ],
    documents: [
      { docId: "park_report", label: "Research Park Annual Report", required: true, formats: ["pdf"], maxSizeMB: 10 },
    ],
  },

  // ─── KPI 21 ──────────────────────────────────────────────────────
  {
    code: "KPI_21",
    title: "Alumni Engagement & Endowment Development – Refined",
    shortTitle: "KPI 21: Alumni Engagement & Endowment",
    category: "outreach_inclusivity",
    description: "Track alumni engagement, verified database coverage, mentorship, donations, and endowment growth.",
    objective: "Build an active alumni network and grow endowment corpus year-on-year.",
    targetUnit: "INR",
    frequency: "annual",
    sections: [
      { id: "input",   title: "Input Fields",               order: 1, description: "Core alumni and endowment data" },
      { id: "process", title: "Monitoring / Process Fields", order: 2, description: "Engagement and donor tracking" },
      { id: "output",  title: "Output Fields",               order: 3, description: "Endowment and mentorship outcomes" },
    ],
    fields: [
      // ── Input Fields ──
      { fieldId: "alumni_assoc_cert",          label: "Alumni Association Registration Certificate",              type: "file",     required: true,  section: "input", order: 1, width: "half", helpText: "Document upload · No autocapture" },
      { fieldId: "alumni_db_total",            label: "Alumni Database (Total Records)",                          type: "number",   required: true,  section: "input", order: 2, width: "half", min: 0, helpText: "Partial (CRM)" },
      { fieldId: "donation_receipts",          label: "Donation Receipts (Aggregate)",                            type: "file",     required: false, section: "input", order: 3, width: "half", helpText: "Document upload · No autocapture" },
      { fieldId: "endowment_corpus_21",        label: "Endowment Fund Corpus (₹)",                               type: "currency", required: true,  section: "input", order: 4, width: "half", min: 0, helpText: "Partial (finance)" },
      { fieldId: "active_mentors_alumni",      label: "Number of Active Mentors (Alumni)",                        type: "number",   required: false, section: "input", order: 5, width: "half", min: 0, helpText: "No autocapture" },
      { fieldId: "alumni_registered_verified", label: "Number of Alumni Registered in Database (Verified Contacts)", type: "number", required: true, section: "input", order: 6, width: "half", min: 0, helpText: "Partial (CRM)" },
      { fieldId: "total_alumni_inception",     label: "Total Number of Alumni Since Inception",                   type: "number",   required: true,  section: "input", order: 7, width: "half", min: 0, helpText: "No autocapture" },

      // ── Process / Monitoring Fields ──
      { fieldId: "alumni_db_coverage",         label: "Alumni Database Coverage (%) – Registered / Total",        type: "calculated", formula: "(alumni_registered_verified / total_alumni_inception) * 100", required: false, section: "process", order: 1, width: "half", readOnly: true, unit: "%", helpText: "Yes (from above)" },
      { fieldId: "donor_retention_rate",       label: "Donor Retention Rate (%)",                                 type: "percentage", required: false, section: "process", order: 2, width: "half", min: 0, max: 100, helpText: "Partial (finance)" },
      { fieldId: "alumni_donated_current",     label: "Number of Alumni Who Donated in Current Year",             type: "number",     required: true,  section: "process", order: 3, width: "half", min: 0, helpText: "Partial (finance)" },
      { fieldId: "alumni_event_participation", label: "Alumni Participation Rate in Events (Annual) (%)",         type: "percentage", required: false, section: "process", order: 4, width: "half", min: 0, max: 100, helpText: "No autocapture" },

      // ── Output Fields ──
      { fieldId: "annual_donations",           label: "Annual Donations Received (₹)",                            type: "currency", required: false, section: "output", order: 1, width: "half", min: 0, helpText: "Partial (finance)" },
      { fieldId: "students_mentored_alumni",   label: "Students Mentored (Annual)",                               type: "number",   required: false, section: "output", order: 2, width: "half", min: 0, helpText: "No autocapture" },
      { fieldId: "endowment_growth_yoy",       label: "Total Endowment Growth (Year-on-Year ₹)",                  type: "number",   required: false, section: "output", order: 3, width: "half", min: 0, helpText: "Partial (finance)" },
      { fieldId: "alumni_chapters",            label: "Number of Alumni Chapters Established (Domestic + International)", type: "number", required: false, section: "output", order: 4, width: "half", min: 0, helpText: "No autocapture" },
      { fieldId: "alumni_satisfaction",        label: "Alumni Satisfaction Score (1–10)",                         type: "number",   required: false, section: "output", order: 5, width: "half", min: 1, max: 10, helpText: "No (survey)" },
    ],
    documents: [
      { docId: "alumni_db_extract",       label: "Alumni Database Extract",         required: false, formats: ["pdf", "xlsx"], maxSizeMB: 5 },
      { docId: "endowment_fund_stmt",     label: "Endowment Fund Statement",        required: true,  formats: ["pdf"], maxSizeMB: 5 },
      { docId: "alumni_assoc_cert_doc",   label: "Alumni Association Certificate",  required: true,  formats: ["pdf"], maxSizeMB: 5 },
      { docId: "donation_receipts_doc",   label: "Donation Receipts (Aggregate)",   required: false, formats: ["pdf"], maxSizeMB: 10 },
    ],
  },

  // ─── KPI 22 ──────────────────────────────────────────────────────
  {
    code: "KPI_22",
    title: "Manufacturing Sector Oriented Research",
    shortTitle: "Manufacturing Research",
    category: "research",
    description: "Track research projects oriented towards manufacturing sector needs.",
    objective: "Align university research with manufacturing industry requirements.",
    targetUnit: "projects",
    frequency: "annual",
    sections: [
      { id: "research", title: "Research Details", order: 1 },
      { id: "industry", title: "Industry Linkage", order: 2 },
      { id: "financial", title: "Financial Details", order: 3 },
    ],
    fields: [
      { fieldId: "research_projects", label: "Manufacturing Research Projects", type: "number", required: true, section: "research", order: 1, width: "half", min: 0 },
      { fieldId: "faculty_involved", label: "Faculty Involved", type: "number", required: true, section: "research", order: 2, width: "half", min: 0 },
      { fieldId: "publications", label: "Publications in Manufacturing Domain", type: "number", required: false, section: "research", order: 3, width: "half", min: 0 },
      { fieldId: "patents_filed", label: "Patents Filed", type: "number", required: false, section: "research", order: 4, width: "half", min: 0 },
      { fieldId: "industry_sponsors", label: "Industry Sponsored Projects", type: "number", required: false, section: "industry", order: 1, width: "half", min: 0 },
      { fieldId: "industry_funding", label: "Industry Funding Received (₹)", type: "currency", required: false, section: "industry", order: 2, width: "half", min: 0 },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "research", order: 5, width: "full" },
    ],
    documents: [
      { docId: "research_report", label: "Research Progress Report", required: true, formats: ["pdf"], maxSizeMB: 10 },
      { docId: "patent_copy", label: "Patent Application Copy", required: false, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 23 ──────────────────────────────────────────────────────
  {
    code: "KPI_23",
    title: "AI-based PhD Quality Assurance",
    shortTitle: "AI PhD QA",
    category: "ai_systems",
    description: "Track implementation of AI-based quality assurance for PhD programs.",
    objective: "Improve PhD research quality through AI-driven monitoring.",
    targetUnit: "systems",
    frequency: "annual",
    sections: [
      { id: "system", title: "System Details", order: 1 },
      { id: "phd", title: "PhD Metrics", order: 2 },
      { id: "financial", title: "Financial Details", order: 3 },
    ],
    fields: [
      { fieldId: "ai_system_deployed", label: "AI QA System Deployed?", type: "radio", required: true, section: "system", order: 1, width: "half", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
      { fieldId: "system_name", label: "System Name / Platform", type: "text", required: false, section: "system", order: 2, width: "half", dependsOn: { fieldId: "ai_system_deployed", operator: "equals", value: "yes" } },
      { fieldId: "phd_scholars_monitored", label: "PhD Scholars Monitored by AI", type: "number", required: false, section: "phd", order: 1, width: "half", min: 0, dependsOn: { fieldId: "ai_system_deployed", operator: "equals", value: "yes" } },
      { fieldId: "total_phd_scholars", label: "Total PhD Scholars", type: "number", required: true, section: "phd", order: 2, width: "half", min: 0 },
      { fieldId: "ai_coverage_rate", label: "AI Coverage Rate (%)", type: "calculated", formula: "(phd_scholars_monitored / total_phd_scholars) * 100", required: false, section: "phd", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "phd_completion_rate", label: "PhD Completion Rate (%)", type: "percentage", required: true, section: "phd", order: 4, width: "half", min: 0, max: 100 },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "system", order: 3, width: "full" },
    ],
    documents: [
      { docId: "system_demo", label: "AI System Demo / Screenshot", required: false, formats: ["pdf", "png"], maxSizeMB: 10, conditionalOn: { fieldId: "ai_system_deployed", operator: "equals", value: "yes" } },
      { docId: "phd_report", label: "PhD Program Report", required: true, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 24 ──────────────────────────────────────────────────────
  {
    code: "KPI_24",
    title: "Emerging Area Prioritization",
    shortTitle: "Emerging Areas",
    category: "research",
    description: "Track prioritization and investment in emerging research areas.",
    objective: "Focus resources on high-impact emerging fields.",
    targetUnit: "areas",
    frequency: "annual",
    sections: [
      { id: "areas", title: "Priority Areas", order: 1 },
      { id: "financial", title: "Financial Details", order: 2 },
    ],
    fields: [
      { fieldId: "priority_areas_identified", label: "Priority Areas Identified", type: "number", required: true, section: "areas", order: 1, width: "half", min: 0 },
      { fieldId: "areas_with_dedicated_resources", label: "Areas with Dedicated Resources", type: "number", required: true, section: "areas", order: 2, width: "half", min: 0 },
      { fieldId: "resource_allocation_rate", label: "Resource Allocation Rate (%)", type: "calculated", formula: "(areas_with_dedicated_resources / priority_areas_identified) * 100", required: false, section: "areas", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "faculty_dedicated", label: "Faculty Dedicated to Emerging Areas", type: "number", required: true, section: "areas", order: 4, width: "half", min: 0 },
      { fieldId: "students_involved", label: "Students Involved in Emerging Area Research", type: "number", required: false, section: "areas", order: 5, width: "half", min: 0 },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "areas", order: 6, width: "full" },
    ],
    documents: [
      { docId: "priority_plan", label: "Emerging Area Priority Plan", required: true, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 25 ──────────────────────────────────────────────────────
  {
    code: "KPI_25",
    title: "AI-based Vacancy Forecasting",
    shortTitle: "AI Vacancy Forecast",
    category: "ai_systems",
    description: "Track AI-based systems for predicting and planning faculty vacancies.",
    objective: "Use AI to proactively plan faculty hiring needs.",
    targetUnit: "systems",
    frequency: "annual",
    sections: [
      { id: "system", title: "AI System Details", order: 1 },
      { id: "outcomes", title: "Forecast Outcomes", order: 2 },
      { id: "financial", title: "Financial Details", order: 3 },
    ],
    fields: [
      { fieldId: "ai_system_deployed", label: "AI Forecasting System Deployed?", type: "radio", required: true, section: "system", order: 1, width: "half", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
      { fieldId: "system_name", label: "System/Platform Name", type: "text", required: false, section: "system", order: 2, width: "half", dependsOn: { fieldId: "ai_system_deployed", operator: "equals", value: "yes" } },
      { fieldId: "vacancies_forecasted", label: "Vacancies Forecasted by AI", type: "number", required: false, section: "outcomes", order: 1, width: "half", min: 0, dependsOn: { fieldId: "ai_system_deployed", operator: "equals", value: "yes" } },
      { fieldId: "forecast_accuracy", label: "Forecast Accuracy (%)", type: "percentage", required: false, section: "outcomes", order: 2, width: "half", min: 0, max: 100, dependsOn: { fieldId: "ai_system_deployed", operator: "equals", value: "yes" } },
      { fieldId: "hiring_lead_time_reduction", label: "Hiring Lead Time Reduction (days)", type: "number", required: false, section: "outcomes", order: 3, width: "half", min: 0 },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "system", order: 3, width: "full" },
    ],
    documents: [
      { docId: "system_report", label: "AI System Implementation Report", required: false, formats: ["pdf"], maxSizeMB: 5, conditionalOn: { fieldId: "ai_system_deployed", operator: "equals", value: "yes" } },
    ],
  },

  // ─── KPI 26 ──────────────────────────────────────────────────────
  {
    code: "KPI_26",
    title: "Student Mental Health & Well-being (AI-enabled screening and counselling) – Refined",
    shortTitle: "KPI 26: Student Mental Health & Well-being",
    category: "outreach_inclusivity",
    description: "Track AI-enabled mental health screening, counselling infrastructure, utilisation, and outcomes for students.",
    objective: "Ensure zero student suicides, reduce high-risk flags, and achieve high well-being scores through AI-enabled support.",
    targetUnit: "students",
    frequency: "quarterly",
    sections: [
      { id: "input",   title: "Input Fields",               order: 1, description: "Counselling infrastructure and screening data" },
      { id: "process", title: "Monitoring / Process Fields", order: 2, description: "Counsellor ratios, wait times, and follow-up tracking" },
      { id: "output",  title: "Output Fields",               order: 3, description: "Student well-being and risk reduction outcomes" },
    ],
    fields: [
      // ── Input Fields ──
      { fieldId: "counselling_cell_order",     label: "Counselling Cell Establishment Order",                     type: "file",     required: true,  section: "input", order: 1, width: "half", helpText: "Document upload · No autocapture" },
      { fieldId: "full_time_counsellors",      label: "Number of Full-Time Counsellors",                          type: "number",   required: true,  section: "input", order: 2, width: "half", min: 0, helpText: "Partial (HRMS)" },
      { fieldId: "wellbeing_survey_rate",      label: "Annual Well-being Survey Response Rate (%)",               type: "percentage", required: true, section: "input", order: 3, width: "half", min: 0, max: 100, helpText: "Yes (survey platform)" },
      { fieldId: "ai_risk_flags",              label: "AI Risk Flags (Aggregated Counts – Low/Medium/High)",       type: "textarea", required: false, section: "input", order: 4, width: "full", placeholder: "Low: 120, Medium: 45, High: 12", helpText: "Yes (AI platform) · Number (aggregated)" },
      { fieldId: "counselling_sessions",       label: "Counselling Sessions Conducted (Individual/Group)",         type: "number",   required: true,  section: "input", order: 5, width: "half", min: 0, helpText: "Partial (counselling log)" },
      { fieldId: "external_referrals",         label: "Referrals to External Mental Health Services",             type: "number",   required: false, section: "input", order: 6, width: "half", min: 0, helpText: "No autocapture" },
      { fieldId: "total_students_26",          label: "Total Number of Students Enrolled (UG+PG)",               type: "number",   required: true,  section: "input", order: 7, width: "half", min: 0, helpText: "Yes (AISHE / ERP)" },
      { fieldId: "students_screened",          label: "Number of Students Screened (Who Took the Survey)",        type: "number",   required: true,  section: "input", order: 8, width: "half", min: 0, helpText: "Yes (survey platform)" },

      // ── Process / Monitoring Fields ──
      { fieldId: "counsellor_student_ratio",   label: "Counsellor-Student Ratio (1:X)",                           type: "calculated", formula: "total_students_26 / full_time_counsellors", required: false, section: "process", order: 1, width: "half", readOnly: true, helpText: "Yes (from counts)" },
      { fieldId: "avg_wait_time_days",         label: "Average Wait Time for Appointment (Days)",                 type: "number",     required: false, section: "process", order: 2, width: "half", min: 0, helpText: "Partial (appointment system)" },
      { fieldId: "high_risk_followup_pct",     label: "Percentage of High-Risk Students Who Received Follow-up (%)", type: "percentage", required: false, section: "process", order: 3, width: "half", min: 0, max: 100, helpText: "Partial (counselling log)" },
      { fieldId: "group_sessions_workshops",   label: "Number of Group Counselling Sessions / Workshops Conducted", type: "number",   required: false, section: "process", order: 4, width: "half", min: 0, helpText: "No autocapture" },

      // ── Output Fields ──
      { fieldId: "student_satisfaction_counselling", label: "Student Satisfaction with Counselling (1–10)",       type: "number",   required: false, section: "output", order: 1, width: "half", min: 1, max: 10, helpText: "No (survey)" },
      { fieldId: "zero_suicides",              label: "Zero Student Suicides on Campus",                          type: "select",   required: true,  section: "output", order: 2, width: "half", options: [
        { label: "Yes", value: "yes" },
        { label: "No",  value: "no"  },
      ], helpText: "No autocapture" },
      { fieldId: "pct_improved_wellbeing",     label: "Percentage of Students Showing Improved Well-being (Self-reported) (%)", type: "percentage", required: false, section: "output", order: 3, width: "half", min: 0, max: 100, helpText: "No (follow-up survey)" },
      { fieldId: "reduction_high_risk_flags",  label: "Reduction in Moderate/High Risk Flags (Year-on-Year) (%)", type: "percentage", required: false, section: "output", order: 4, width: "half", min: 0, max: 100, helpText: "Yes (AI platform)" },
    ],
    documents: [
      { docId: "counselling_cell_order_doc", label: "Counselling Cell Establishment Order", required: true,  formats: ["pdf"], maxSizeMB: 5 },
      { docId: "counselling_report_26",      label: "Counselling Program Report",           required: true,  formats: ["pdf"], maxSizeMB: 5 },
      { docId: "ai_platform_export",         label: "AI Platform Risk Flag Export",         required: false, formats: ["pdf", "xlsx"], maxSizeMB: 5 },
      { docId: "survey_results",             label: "Well-being Survey Results",            required: false, formats: ["pdf", "xlsx"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 27 ──────────────────────────────────────────────────────
  {
    code: "KPI_27",
    title: "Museology Education & Museum-linked Internships",
    shortTitle: "Museology Education",
    category: "specialized_programs",
    description: "Track museology programs and internships linked with museums.",
    objective: "Promote heritage education and museum-linked career pathways.",
    targetUnit: "students",
    frequency: "annual",
    sections: [
      { id: "program", title: "Program Details", order: 1 },
      { id: "internship", title: "Internship Details", order: 2 },
      { id: "financial", title: "Financial Details", order: 3 },
    ],
    fields: [
      { fieldId: "museology_courses", label: "Museology Courses Offered", type: "number", required: true, section: "program", order: 1, width: "half", min: 0 },
      { fieldId: "students_enrolled", label: "Students Enrolled", type: "number", required: true, section: "program", order: 2, width: "half", min: 0 },
      { fieldId: "museum_partners", label: "Partner Museums", type: "number", required: true, section: "internship", order: 1, width: "half", min: 0 },
      { fieldId: "internship_slots", label: "Internship Slots Available", type: "number", required: true, section: "internship", order: 2, width: "half", min: 0 },
      { fieldId: "students_placed", label: "Students Placed in Internships", type: "number", required: true, section: "internship", order: 3, width: "half", min: 0 },
      { fieldId: "placement_rate", label: "Internship Placement Rate (%)", type: "calculated", formula: "(students_placed / students_enrolled) * 100", required: false, section: "internship", order: 4, width: "half", readOnly: true, unit: "%" },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "program", order: 3, width: "full" },
    ],
    documents: [
      { docId: "museum_mou", label: "Museum Partner MOU", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "internship_report", label: "Internship Completion Report", required: false, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 28 ──────────────────────────────────────────────────────
  {
    code: "KPI_28",
    title: "Forensic Science Specialized Programs",
    shortTitle: "Forensic Science",
    category: "specialized_programs",
    description: "Track establishment and growth of forensic science programs.",
    objective: "Build forensic science capacity to support justice and law enforcement.",
    targetUnit: "programs",
    frequency: "annual",
    sections: [
      { id: "program", title: "Program Details", order: 1 },
      { id: "placement", title: "Career Outcomes", order: 2 },
      { id: "financial", title: "Financial Details", order: 3 },
    ],
    fields: [
      { fieldId: "programs_offered", label: "Forensic Science Programs Offered", type: "number", required: true, section: "program", order: 1, width: "half", min: 0 },
      { fieldId: "students_enrolled", label: "Students Enrolled", type: "number", required: true, section: "program", order: 2, width: "half", min: 0 },
      { fieldId: "labs_established", label: "Forensic Labs Established", type: "number", required: true, section: "program", order: 3, width: "half", min: 0 },
      { fieldId: "faculty_specialised", label: "Specialised Faculty", type: "number", required: true, section: "program", order: 4, width: "half", min: 0 },
      { fieldId: "industry_linkages", label: "Linkages with Law Enforcement / Judiciary", type: "number", required: false, section: "placement", order: 1, width: "half", min: 0 },
      { fieldId: "graduates_placed", label: "Graduates Placed in Relevant Field", type: "number", required: false, section: "placement", order: 2, width: "half", min: 0 },
      { fieldId: "placement_rate", label: "Placement Rate (%)", type: "calculated", formula: "(graduates_placed / students_enrolled) * 100", required: false, section: "placement", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "program", order: 5, width: "full" },
    ],
    documents: [
      { docId: "program_approval", label: "Program Approval Letter", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "lab_photos", label: "Forensic Lab Photos", required: false, formats: ["pdf", "jpg", "png"], maxSizeMB: 10 },
    ],
  },
];

export const getKpiSchema = (code: string) =>
  KPI_SCHEMAS.find((k) => k.code === code);

export const getKpisByCategory = (category: string) =>
  KPI_SCHEMAS.filter((k) => k.category === category);
