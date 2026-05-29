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
    shortTitle: "Prof. of Practice",
    category: "talent_acquisition",
    description: "Track industry professionals appointed as Professors of Practice.",
    objective: "Bridge academia-industry gap through practitioner faculty.",
    targetUnit: "professors",
    frequency: "quarterly",
    sections: [
      { id: "appointment", title: "Appointment Details", order: 1 },
      { id: "impact", title: "Impact & Reach", order: 2 },
      { id: "financial", title: "Financial Details", order: 3 },
    ],
    fields: [
      { fieldId: "positions_created", label: "PoP Positions Created", type: "number", required: true, section: "appointment", order: 1, width: "half", min: 0 },
      { fieldId: "positions_appointed", label: "PoP Positions Appointed", type: "number", required: true, section: "appointment", order: 2, width: "half", min: 0 },
      { fieldId: "appointment_rate", label: "Appointment Rate (%)", type: "calculated", formula: "(positions_appointed / positions_created) * 100", required: false, section: "appointment", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "avg_experience", label: "Avg. Industry Experience (years)", type: "number", required: true, section: "appointment", order: 4, width: "half", min: 0 },
      { fieldId: "courses_delivered", label: "Courses Delivered by PoPs", type: "number", required: false, section: "impact", order: 1, width: "half", min: 0 },
      { fieldId: "students_impacted", label: "Students Impacted", type: "number", required: false, section: "impact", order: 2, width: "half", min: 0 },
      { fieldId: "industry_sectors", label: "Industry Sectors", type: "multiselect", required: true, section: "appointment", order: 5, width: "full", options: [
        { label: "IT & Software", value: "it" }, { label: "Manufacturing", value: "manufacturing" },
        { label: "Healthcare", value: "healthcare" }, { label: "Finance", value: "finance" },
        { label: "Agriculture", value: "agriculture" }, { label: "Energy", value: "energy" }, { label: "Other", value: "other" },
      ]},
      { fieldId: "sanctioned_amount", label: "Sanctioned Honorarium (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "appointment", order: 6, width: "full" },
    ],
    documents: [
      { docId: "appointment_order", label: "Appointment Order", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "industry_proof", label: "Industry Affiliation Proof", required: true, formats: ["pdf"], maxSizeMB: 5 },
    ],
  },

  // ─── KPI 3 ───────────────────────────────────────────────────────
  {
    code: "KPI_03",
    title: "Mission Mode Faculty Recruitment",
    shortTitle: "Faculty Recruitment",
    category: "talent_acquisition",
    description: "Track rapid faculty hiring against vacancies under mission mode.",
    objective: "Fill faculty vacancies quickly to improve teaching quality.",
    targetUnit: "faculty",
    frequency: "monthly",
    sections: [
      { id: "vacancy", title: "Vacancy Details", order: 1 },
      { id: "recruitment", title: "Recruitment Pipeline", order: 2 },
      { id: "financial", title: "Budget Details", order: 3 },
    ],
    fields: [
      { fieldId: "total_vacancies", label: "Total Faculty Vacancies", type: "number", required: true, section: "vacancy", order: 1, width: "half", min: 0 },
      { fieldId: "vacancies_advertised", label: "Vacancies Advertised", type: "number", required: true, section: "vacancy", order: 2, width: "half", min: 0 },
      { fieldId: "applications_received", label: "Applications Received", type: "number", required: true, section: "recruitment", order: 1, width: "half", min: 0 },
      { fieldId: "interviews_conducted", label: "Interviews Conducted", type: "number", required: true, section: "recruitment", order: 2, width: "half", min: 0 },
      { fieldId: "offers_made", label: "Offers Made", type: "number", required: true, section: "recruitment", order: 3, width: "half", min: 0 },
      { fieldId: "joinings_completed", label: "Joinings Completed", type: "number", required: true, section: "recruitment", order: 4, width: "half", min: 0 },
      { fieldId: "fill_rate", label: "Fill Rate (%)", type: "calculated", formula: "(joinings_completed / total_vacancies) * 100", required: false, section: "recruitment", order: 5, width: "half", readOnly: true, unit: "%" },
      { fieldId: "acceptance_rate", label: "Offer Acceptance Rate (%)", type: "calculated", formula: "(joinings_completed / offers_made) * 100", required: false, section: "recruitment", order: 6, width: "half", readOnly: true, unit: "%" },
      { fieldId: "budget_allocated", label: "Budget Allocated (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Budget Utilized (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "budget_allocated - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "vacancy", order: 3, width: "full" },
    ],
    documents: [
      { docId: "advertisement_copy", label: "Advertisement Copy", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "joining_report", label: "Joining Report", required: true, formats: ["pdf"], maxSizeMB: 5 },
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
    shortTitle: "Curriculum Updates",
    category: "industry_partnership",
    description: "Track programs updated with AI, ML, IoT, Blockchain, etc.",
    objective: "Ensure curriculum stays relevant to emerging technology trends.",
    targetUnit: "programs",
    frequency: "annual",
    sections: [
      { id: "programs", title: "Program Details", order: 1 },
      { id: "emerging", title: "Emerging Areas", order: 2 },
    ],
    fields: [
      { fieldId: "total_programs", label: "Total Programs in University", type: "number", required: true, section: "programs", order: 1, width: "half", min: 0 },
      { fieldId: "programs_updated", label: "Programs with Updated Curriculum", type: "number", required: true, section: "programs", order: 2, width: "half", min: 0 },
      { fieldId: "update_rate", label: "Update Rate (%)", type: "calculated", formula: "(programs_updated / total_programs) * 100", required: false, section: "programs", order: 3, width: "half", readOnly: true, unit: "%" },
      { fieldId: "courses_added", label: "New Courses Added", type: "number", required: true, section: "programs", order: 4, width: "half", min: 0 },
      { fieldId: "emerging_areas", label: "Emerging Areas Covered", type: "multiselect", required: true, section: "emerging", order: 1, width: "full", options: [
        { label: "Artificial Intelligence", value: "ai" }, { label: "Machine Learning", value: "ml" },
        { label: "IoT", value: "iot" }, { label: "Blockchain", value: "blockchain" },
        { label: "Cybersecurity", value: "cybersecurity" }, { label: "Robotics", value: "robotics" },
        { label: "Data Science", value: "data_science" }, { label: "Cloud Computing", value: "cloud" },
      ]},
      { fieldId: "students_enrolled", label: "Students Enrolled in New Courses", type: "number", required: false, section: "programs", order: 5, width: "half", min: 0 },
      { fieldId: "curriculum_update_date", label: "Last Curriculum Update Date", type: "date", required: true, section: "programs", order: 6, width: "half" },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "programs", order: 7, width: "full" },
    ],
    documents: [
      { docId: "curriculum_doc", label: "Updated Curriculum Document", required: true, formats: ["pdf"], maxSizeMB: 10 },
      { docId: "approval_letter", label: "BOS/Academic Council Approval", required: true, formats: ["pdf"], maxSizeMB: 5 },
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
    shortTitle: "Apprenticeship Programs",
    category: "industry_partnership",
    description: "Track degree programs with embedded apprenticeship components.",
    objective: "Ensure students gain industry experience alongside academic learning.",
    targetUnit: "programs",
    frequency: "annual",
    sections: [
      { id: "programs", title: "Program Details", order: 1 },
      { id: "industry", title: "Industry Partners", order: 2 },
      { id: "financial", title: "Financial Details", order: 3 },
    ],
    fields: [
      { fieldId: "programs_with_apprenticeship", label: "Programs with Apprenticeship", type: "number", required: true, section: "programs", order: 1, width: "half", min: 0 },
      { fieldId: "students_enrolled", label: "Students Enrolled", type: "number", required: true, section: "programs", order: 2, width: "half", min: 0 },
      { fieldId: "apprenticeship_hours", label: "Avg. Apprenticeship Hours/Student", type: "number", required: true, section: "programs", order: 3, width: "half", min: 0 },
      { fieldId: "completion_rate", label: "Completion Rate (%)", type: "percentage", required: true, section: "programs", order: 4, width: "half", min: 0, max: 100 },
      { fieldId: "industry_partners", label: "No. of Industry Partners", type: "number", required: true, section: "industry", order: 1, width: "half", min: 0 },
      { fieldId: "stipend_provided", label: "Stipend Provided to Students?", type: "radio", required: true, section: "industry", order: 2, width: "half", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
      { fieldId: "avg_stipend", label: "Avg. Monthly Stipend (₹)", type: "currency", required: false, section: "industry", order: 3, width: "half", min: 0, dependsOn: { fieldId: "stipend_provided", operator: "equals", value: "yes" } },
      { fieldId: "sanctioned_amount", label: "Sanctioned Amount (₹)", type: "currency", required: true, section: "financial", order: 1, width: "half", min: 0 },
      { fieldId: "expenditure", label: "Expenditure (₹)", type: "currency", required: true, section: "financial", order: 2, width: "half", min: 0 },
      { fieldId: "balance", label: "Balance (₹)", type: "calculated", formula: "sanctioned_amount - expenditure", required: false, section: "financial", order: 3, width: "half", readOnly: true },
      { fieldId: "remarks", label: "Remarks", type: "textarea", required: false, section: "programs", order: 5, width: "full" },
    ],
    documents: [
      { docId: "program_structure", label: "Program Structure Document", required: true, formats: ["pdf"], maxSizeMB: 5 },
      { docId: "industry_mou", label: "Industry Partner MOU", required: true, formats: ["pdf"], maxSizeMB: 5 },
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
