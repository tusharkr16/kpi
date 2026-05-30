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
    title: "Skill Course Integration",
    shortTitle: "Skill Courses",
    category: "industry_partnership",
    description: "Track integration of skill-based courses into regular degree programs.",
    objective: "Enhance employability through practical skill course integration.",
    targetUnit: "courses",
    frequency: "annual",
    sections: [
      { id: "courses", title: "Course Details", order: 1 },
      { id: "financial", title: "Financial Details", order: 2 },
    ],
    fields: [
      { fieldId: "skill_courses_added", label: "Skill Courses Added", type: "number", required: true, section: "courses", order: 1, width: "half", min: 0 },
      { fieldId: "programs_integrated", label: "Programs with Skill Integration", type: "number", required: true, section: "courses", order: 2, width: "half", min: 0 },
      { fieldId: "students_enrolled", label: "Students Enrolled in Skill Courses", type: "number", required: true, section: "courses", order: 3, width: "half", min: 0 },
      { fieldId: "certification_partners", label: "Certification Partners", type: "text", required: false, section: "courses", order: 4, width: "half", placeholder: "e.g. NASSCOM, NSDC" },
      { fieldId: "certified_students", label: "Students Who Got Certified", type: "number", required: false, section: "courses", order: 5, width: "half", min: 0 },
      { fieldId: "certification_rate", label: "Certification Rate (%)", type: "calculated", formula: "(certified_students / students_enrolled) * 100", required: false, section: "courses", order: 6, width: "half", readOnly: true, unit: "%" },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "courses", order: 7, width: "full" },
    ],
    documents: [
      { docId: "course_list", label: "List of Skill Courses", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "certification_proof", label: "Certification Partner Agreement", required: false, formats: ["pdf"], maxSizeMB: 5 },
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
    title: "Faculty Training in Emerging Technologies",
    shortTitle: "Faculty Training",
    category: "faculty_development",
    description: "Track faculty trained in emerging technologies like AI, ML, Data Science.",
    objective: "Upskill faculty to teach modern technology subjects effectively.",
    targetUnit: "faculty",
    frequency: "quarterly",
    sections: [
      { id: "training", title: "Training Details", order: 1 },
      { id: "financial", title: "Financial Details", order: 2 },
    ],
    fields: [
      { fieldId: "total_faculty", label: "Total Faculty Strength", type: "number", required: true, section: "training", order: 1, width: "half", min: 0 },
      { fieldId: "faculty_trained", label: "Faculty Trained", type: "number", required: true, section: "training", order: 2, width: "half", min: 0 },
      { fieldId: "training_rate", label: "Training Coverage (%)", type: "calculated", formula: "(faculty_trained / total_faculty) * 100", required: false, section: "training", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "technologies_covered", label: "Technologies Covered", type: "multiselect", required: true, section: "training", order: 4, width: "full", options: [
        { label: "AI/ML", value: "ai_ml" }, { label: "Data Science", value: "data_science" },
        { label: "Cloud Computing", value: "cloud" }, { label: "Cybersecurity", value: "cybersecurity" },
        { label: "IoT", value: "iot" }, { label: "Blockchain", value: "blockchain" }, { label: "Robotics", value: "robotics" },
      ]},
      { fieldId: "avg_training_hours", label: "Avg. Training Hours per Faculty", type: "number", required: true, section: "training", order: 5, width: "half", min: 0 },
      { fieldId: "certified_faculty", label: "Faculty Who Got Certified", type: "number", required: false, section: "training", order: 6, width: "half", min: 0 },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "training", order: 7, width: "full" },
    ],
    documents: [
      { docId: "training_report", label: "Training Completion Report", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "certificates", label: "Sample Certificates", required: false, formats: ["pdf"], maxSizeMB: 10 },
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
    title: ">25% Students Enrolled in Skill Courses",
    shortTitle: "25% Skill Enrollment",
    category: "enrollment_access",
    description: "Track if at least 25% of students are enrolled in skill courses.",
    objective: "Ensure minimum skill course participation across student population.",
    targetUnit: "percentage",
    frequency: "annual",
    sections: [
      { id: "enrollment", title: "Enrollment Details", order: 1 },
    ],
    fields: [
      { fieldId: "total_students", label: "Total Students Enrolled", type: "number", required: true, section: "enrollment", order: 1, width: "half", min: 0 },
      { fieldId: "students_in_skill_courses", label: "Students in Skill Courses", type: "number", required: true, section: "enrollment", order: 2, width: "half", min: 0 },
      { fieldId: "skill_enrollment_percent", label: "Skill Enrollment (%)", type: "calculated", formula: "(students_in_skill_courses / total_students) * 100", required: false, section: "enrollment", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "target_met", label: "25% Target Met?", type: "calculated", formula: "skill_enrollment_percent >= 25 ? 1 : 0", required: false, section: "enrollment", order: 4, width: "half", readOnly: true },
      { fieldId: "skill_courses_offered", label: "No. of Skill Courses Offered", type: "number", required: true, section: "enrollment", order: 5, width: "half", min: 0 },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "enrollment", order: 6, width: "full" },
    ],
    documents: [
      { docId: "enrollment_data", label: "Enrollment Data Sheet", required: true, formats: ["pdf", "xlsx"], maxSizeMB: 5 },
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
    title: "Increase International Students",
    shortTitle: "International Students",
    category: "international",
    description: "Track the enrollment and growth of international students.",
    objective: "Attract international students to enhance global exposure.",
    targetUnit: "students",
    frequency: "annual",
    sections: [
      { id: "enrollment", title: "International Enrollment", order: 1 },
      { id: "financial", title: "Financial Details", order: 2 },
    ],
    fields: [
      { fieldId: "international_students", label: "International Students Enrolled", type: "number", required: true, section: "enrollment", order: 1, width: "half", min: 0 },
      { fieldId: "prev_year_international", label: "Previous Year International Students", type: "number", required: true, section: "enrollment", order: 2, width: "half", min: 0 },
      { fieldId: "growth_rate", label: "Growth Rate (%)", type: "calculated", formula: "((international_students - prev_year_international) / prev_year_international) * 100", required: false, section: "enrollment", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "countries_represented", label: "Countries Represented", type: "number", required: true, section: "enrollment", order: 4, width: "half", min: 0 },
      { fieldId: "scholarship_provided", label: "Scholarships Provided", type: "number", required: false, section: "enrollment", order: 5, width: "half", min: 0 },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "enrollment", order: 6, width: "full" },
    ],
    documents: [
      { docId: "enrollment_list", label: "International Student Enrollment List", required: true, formats: ["pdf", "xlsx"], maxSizeMB: 5 },
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
    title: "Alumni Engagement & Endowment Development",
    shortTitle: "Alumni Engagement",
    category: "alumni",
    description: "Track alumni engagement activities and endowment fund development.",
    objective: "Build strong alumni network and generate endowment contributions.",
    targetUnit: "INR",
    frequency: "annual",
    sections: [
      { id: "alumni", title: "Alumni Engagement", order: 1 },
      { id: "endowment", title: "Endowment Details", order: 2 },
    ],
    fields: [
      { fieldId: "registered_alumni", label: "Registered Alumni", type: "number", required: true, section: "alumni", order: 1, width: "half", min: 0 },
      { fieldId: "active_alumni", label: "Active/Engaged Alumni", type: "number", required: true, section: "alumni", order: 2, width: "half", min: 0 },
      { fieldId: "engagement_rate", label: "Engagement Rate (%)", type: "calculated", formula: "(active_alumni / registered_alumni) * 100", required: false, section: "alumni", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "events_conducted", label: "Alumni Events Conducted", type: "number", required: false, section: "alumni", order: 4, width: "half", min: 0 },
      { fieldId: "endowment_corpus", label: "Endowment Corpus (₹)", type: "currency", required: true, section: "endowment", order: 1, width: "half", min: 0 },
      { fieldId: "new_contributions", label: "New Contributions This Year (₹)", type: "currency", required: true, section: "endowment", order: 2, width: "half", min: 0 },
      { fieldId: "scholarships_from_endowment", label: "Scholarships Given from Endowment", type: "number", required: false, section: "endowment", order: 3, width: "half", min: 0 },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "alumni", order: 5, width: "full" },
    ],
    documents: [
      { docId: "alumni_database", label: "Alumni Database Extract", required: false, formats: ["pdf", "xlsx"], maxSizeMB: 5 },
      { docId: "endowment_statement", label: "Endowment Fund Statement", required: true, formats: ["pdf"], maxSizeMB: 5 },
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
    title: "Student Mental Health & Well-being",
    shortTitle: "Student Well-being",
    category: "student_welfare",
    description: "Track mental health support infrastructure and utilization.",
    objective: "Ensure comprehensive mental health support for all students.",
    targetUnit: "students",
    frequency: "quarterly",
    sections: [
      { id: "infrastructure", title: "Support Infrastructure", order: 1 },
      { id: "utilization", title: "Utilization Metrics", order: 2 },
      { id: "financial", title: "Financial Details", order: 3 },
    ],
    fields: [
      { fieldId: "counsellors_available", label: "Counsellors Available", type: "number", required: true, section: "infrastructure", order: 1, width: "half", min: 0 },
      { fieldId: "counselling_centres", label: "Counselling Centres", type: "number", required: true, section: "infrastructure", order: 2, width: "half", min: 0 },
      { fieldId: "total_students", label: "Total Students", type: "number", required: true, section: "infrastructure", order: 3, width: "half", min: 0 },
      { fieldId: "student_counsellor_ratio", label: "Student:Counsellor Ratio", type: "calculated", formula: "total_students / counsellors_available", required: false, section: "infrastructure", order: 4, width: "half", readOnly: true },
      { fieldId: "sessions_conducted", label: "Counselling Sessions Conducted", type: "number", required: true, section: "utilization", order: 1, width: "half", min: 0 },
      { fieldId: "students_reached", label: "Students Reached", type: "number", required: true, section: "utilization", order: 2, width: "half", min: 0 },
      { fieldId: "reach_rate", label: "Reach Rate (%)", type: "calculated", formula: "(students_reached / total_students) * 100", required: false, section: "utilization", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "awareness_programs", label: "Awareness Programs Conducted", type: "number", required: false, section: "utilization", order: 4, width: "half", min: 0 },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "infrastructure", order: 5, width: "full" },
    ],
    documents: [
      { docId: "counselling_report", label: "Counselling Program Report", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "awareness_photos", label: "Awareness Program Photos", required: false, formats: ["pdf", "jpg", "png"], maxSizeMB: 10 },
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
