import type { IKpi, IDashboardStats, IAlert, IDeadline } from "@/app/kpi/types/kpi-types";
import type { IQueryThread, IDocument } from "@/app/kpi/types/kpi-types";

export const mockKpis: IKpi[] = [
  // ── Tab 1: Teaching Learning & Resources  (KPI 3, 5, 8, 11, 14) ─────────
  { _id: "k3",  kpiNumber: 3,  tab: "teaching",    title: "Mission Mode Faculty Recruitment",                        category: "talent_acquisition",    status: "approved",     dueDate: "2025-06-30", completionPercent: 100, documentsUploaded: 3, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-10T10:00:00Z", monthYear: "June 2025", sanctionedAmount: 4000000, expenditure: 3800000, remarks: "Recruitment drive completed." },
  { _id: "k5",  kpiNumber: 5,  tab: "teaching",    title: "Curriculum Updates in Emerging Areas",                    category: "industry_partnership",  status: "submitted",    dueDate: "2025-06-20", completionPercent: 80,  documentsUploaded: 2, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-12T08:30:00Z", monthYear: "June 2025", sanctionedAmount: 500000,  expenditure: 300000,  remarks: "" },
  { _id: "k8",  kpiNumber: 8,  tab: "teaching",    title: "Integration of Skill Courses (UGC Guidelines)",          category: "industry_partnership",  status: "draft",        dueDate: "2025-06-25", completionPercent: 45,  documentsUploaded: 1, documentsRequired: 4, hasOpenQuery: false, lastUpdatedAt: "2025-06-13T16:00:00Z", monthYear: "June 2025", sanctionedAmount: 600000,  expenditure: 200000,  remarks: "" },
  { _id: "k11", kpiNumber: 11, tab: "teaching",    title: "Faculty Training in Emerging Technologies",              category: "faculty_development",   status: "approved",     dueDate: "2025-05-31", completionPercent: 100, documentsUploaded: 3, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-05-30T09:00:00Z", monthYear: "May 2025",  sanctionedAmount: 300000,  expenditure: 285000,  remarks: "Training completed." },
  { _id: "k14", kpiNumber: 14, tab: "teaching",    title: ">25% Students Enrolled in Skill Courses",                category: "enrollment_access",     status: "query_raised", dueDate: "2025-06-18", completionPercent: 60,  documentsUploaded: 2, documentsRequired: 4, hasOpenQuery: true,  lastUpdatedAt: "2025-06-11T14:00:00Z", monthYear: "June 2025", sanctionedAmount: 800000,  expenditure: 450000,  remarks: "" },

  // ── Tab 2: Research & Professional Practice  (KPI 1, 2, 4, 15, 20, 22, 23, 28) ─
  { _id: "k1",  kpiNumber: 1,  tab: "research",    title: "Global Talent Return Scheme",                             category: "talent_acquisition",    status: "approved",     dueDate: "2025-06-30", completionPercent: 100, documentsUploaded: 2, documentsRequired: 2, hasOpenQuery: false, lastUpdatedAt: "2025-06-10T10:00:00Z", monthYear: "June 2025", sanctionedAmount: 5000000, expenditure: 4800000, remarks: "All scholars onboarded." },
  { _id: "k2",  kpiNumber: 2,  tab: "research",    title: "Professors of Practice",                                  category: "talent_acquisition",    status: "submitted",    dueDate: "2025-06-22", completionPercent: 75,  documentsUploaded: 3, documentsRequired: 4, hasOpenQuery: false, lastUpdatedAt: "2025-06-09T11:00:00Z", monthYear: "June 2025", sanctionedAmount: 1200000, expenditure: 800000,  remarks: "" },
  { _id: "k4",  kpiNumber: 4,  tab: "research",    title: "Delivery Partnership Agreements (DPAs) & Diversified Funding", category: "industry_partnership", status: "query_raised", dueDate: "2025-06-20", completionPercent: 65, documentsUploaded: 1, documentsRequired: 3, hasOpenQuery: true, lastUpdatedAt: "2025-06-12T08:30:00Z", monthYear: "June 2025", sanctionedAmount: 2000000, expenditure: 1100000, remarks: "" },
  { _id: "k15", kpiNumber: 15, tab: "research",    title: "Incubation Centres & Innovation Ecosystems",              category: "innovation_ecosystem",  status: "draft",        dueDate: "2025-06-28", completionPercent: 30,  documentsUploaded: 1, documentsRequired: 4, hasOpenQuery: false, lastUpdatedAt: "2025-06-13T16:00:00Z", monthYear: "June 2025", sanctionedAmount: 3000000, expenditure: 800000,  remarks: "" },
  { _id: "k20", kpiNumber: 20, tab: "research",    title: "Research Parks",                                          category: "innovation_ecosystem",  status: "not_started",  dueDate: "2025-07-10", completionPercent: 0,   documentsUploaded: 0, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-01T00:00:00Z", monthYear: "June 2025", sanctionedAmount: 5000000, expenditure: 0,       remarks: "" },
  { _id: "k22", kpiNumber: 22, tab: "research",    title: "Manufacturing Sector Oriented Research",                  category: "research",              status: "draft",        dueDate: "2025-06-22", completionPercent: 50,  documentsUploaded: 2, documentsRequired: 5, hasOpenQuery: false, lastUpdatedAt: "2025-06-12T12:00:00Z", monthYear: "June 2025", sanctionedAmount: 4000000, expenditure: 1800000, remarks: "Work in progress." },
  { _id: "k23", kpiNumber: 23, tab: "research",    title: "AI-based PhD Quality Assurance & Thesis Management",     category: "ai_systems",            status: "not_started",  dueDate: "2025-07-15", completionPercent: 0,   documentsUploaded: 0, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-01T00:00:00Z", monthYear: "June 2025", sanctionedAmount: 1500000, expenditure: 0,       remarks: "" },
  { _id: "k28", kpiNumber: 28, tab: "research",    title: "Forensic Science Specialised Programs",                   category: "specialized_programs",  status: "not_started",  dueDate: "2025-06-30", completionPercent: 0,   documentsUploaded: 0, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-01T00:00:00Z", monthYear: "June 2025", sanctionedAmount: 1200000, expenditure: 0,       remarks: "" },

  // ── Tab 3: Graduation Outcome  (KPI 7, 17, 27) ───────────────────────────
  { _id: "k7",  kpiNumber: 7,  tab: "graduation",  title: "Apprenticeship Embedded Degree Programs",                category: "industry_partnership",  status: "not_started",  dueDate: "2025-06-25", completionPercent: 0,   documentsUploaded: 0, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-01T00:00:00Z", monthYear: "June 2025", sanctionedAmount: 800000,  expenditure: 0,       remarks: "" },
  { _id: "k17", kpiNumber: 17, tab: "graduation",  title: "Model Finishing Schools in Emerging Areas",              category: "infrastructure",        status: "draft",        dueDate: "2025-06-28", completionPercent: 35,  documentsUploaded: 1, documentsRequired: 4, hasOpenQuery: false, lastUpdatedAt: "2025-06-13T16:00:00Z", monthYear: "June 2025", sanctionedAmount: 2500000, expenditure: 700000,  remarks: "" },
  { _id: "k27", kpiNumber: 27, tab: "graduation",  title: "Museology Education, Labs & Museum-linked Internships",  category: "specialized_programs",  status: "not_started",  dueDate: "2025-07-05", completionPercent: 0,   documentsUploaded: 0, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-01T00:00:00Z", monthYear: "June 2025", sanctionedAmount: 900000,  expenditure: 0,       remarks: "" },

  // ── Tab 4: Outreach & Inclusivity  (KPI 12, 16, 21, 26) ─────────────────
  { _id: "k12", kpiNumber: 12, tab: "outreach",    title: "GER Increase (≥20% in low-GER regions)",                 category: "enrollment_access",     status: "rejected",     dueDate: "2025-06-10", completionPercent: 40,  documentsUploaded: 1, documentsRequired: 4, hasOpenQuery: false, lastUpdatedAt: "2025-06-08T11:00:00Z", monthYear: "June 2025", sanctionedAmount: 500000,  expenditure: 0,       remarks: "Documents incomplete." },
  { _id: "k16", kpiNumber: 16, tab: "outreach",    title: "Increase in International Students (20% growth)",        category: "international",         status: "submitted",    dueDate: "2025-06-18", completionPercent: 90,  documentsUploaded: 4, documentsRequired: 4, hasOpenQuery: false, lastUpdatedAt: "2025-06-13T10:00:00Z", monthYear: "June 2025", sanctionedAmount: 200000,  expenditure: 185000,  remarks: "" },
  { _id: "k21", kpiNumber: 21, tab: "outreach",    title: "Alumni Engagement & Endowment Development",              category: "alumni",                status: "not_started",  dueDate: "2025-06-25", completionPercent: 0,   documentsUploaded: 0, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-01T00:00:00Z", monthYear: "June 2025", sanctionedAmount: 800000,  expenditure: 0,       remarks: "" },
  { _id: "k26", kpiNumber: 26, tab: "outreach",    title: "Student Mental Health & Wellbeing",                      category: "student_welfare",       status: "submitted",    dueDate: "2025-06-18", completionPercent: 90,  documentsUploaded: 4, documentsRequired: 4, hasOpenQuery: false, lastUpdatedAt: "2025-06-13T10:00:00Z", monthYear: "June 2025", sanctionedAmount: 200000,  expenditure: 185000,  remarks: "" },

  // ── Tab 5: Perception  (KPI 10, 18, 19) ──────────────────────────────────
  { _id: "k10", kpiNumber: 10, tab: "perception",  title: "Foreign HEI Campuses (LoI of 10)",                       category: "international",         status: "draft",        dueDate: "2025-06-20", completionPercent: 55,  documentsUploaded: 2, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-11T14:00:00Z", monthYear: "June 2025", sanctionedAmount: 1500000, expenditure: 700000,  remarks: "" },
  { _id: "k18", kpiNumber: 18, tab: "perception",  title: "Mega Educational Hubs / Clusters",                       category: "international",         status: "not_started",  dueDate: "2025-07-10", completionPercent: 0,   documentsUploaded: 0, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-01T00:00:00Z", monthYear: "June 2025", sanctionedAmount: 8000000, expenditure: 0,       remarks: "" },
  { _id: "k19", kpiNumber: 19, tab: "perception",  title: "Multiversity (5 institutions)",                          category: "infrastructure",        status: "not_started",  dueDate: "2025-07-10", completionPercent: 0,   documentsUploaded: 0, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-01T00:00:00Z", monthYear: "June 2025", sanctionedAmount: 6000000, expenditure: 0,       remarks: "" },

  // ── Tab 6: Governance & Digital Transformation  (KPI 6, 9) ───────────────
  { _id: "k6",  kpiNumber: 6,  tab: "governance",  title: "Unified Digital Platforms (UIMS, SAMARTH)",              category: "digital_transformation",status: "submitted",    dueDate: "2025-06-15", completionPercent: 80,  documentsUploaded: 2, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-11T14:00:00Z", monthYear: "June 2025", sanctionedAmount: 1500000, expenditure: 1200000, remarks: "" },
  { _id: "k9",  kpiNumber: 9,  tab: "governance",  title: "Framework for Vacancy Linked Grants",                    category: "governance_reform",     status: "approved",     dueDate: "2025-06-10", completionPercent: 100, documentsUploaded: 3, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-08T11:00:00Z", monthYear: "June 2025", sanctionedAmount: 1000000, expenditure: 950000,  remarks: "Framework implemented." },

  // ── Tab 7: Description  (KPI 13, 24, 25) ─────────────────────────────────
  { _id: "k13", kpiNumber: 13, tab: "description", title: "Regulatory Reforms, Autonomy & Quality",                 category: "governance_reform",     status: "draft",        dueDate: "2025-06-22", completionPercent: 40,  documentsUploaded: 1, documentsRequired: 4, hasOpenQuery: false, lastUpdatedAt: "2025-06-12T12:00:00Z", monthYear: "June 2025", sanctionedAmount: 700000,  expenditure: 200000,  remarks: "" },
  { _id: "k24", kpiNumber: 24, tab: "description", title: "State-level Emerging Area Prioritization",               category: "research",              status: "not_started",  dueDate: "2025-07-01", completionPercent: 0,   documentsUploaded: 0, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-01T00:00:00Z", monthYear: "June 2025", sanctionedAmount: 600000,  expenditure: 0,       remarks: "" },
  { _id: "k25", kpiNumber: 25, tab: "description", title: "AI-based Vacancy Forecasting & Recruitment Planning",    category: "ai_systems",            status: "not_started",  dueDate: "2025-07-01", completionPercent: 0,   documentsUploaded: 0, documentsRequired: 3, hasOpenQuery: false, lastUpdatedAt: "2025-06-01T00:00:00Z", monthYear: "June 2025", sanctionedAmount: 1200000, expenditure: 0,       remarks: "" },
];

export const mockStats: IDashboardStats = {
  totalKpis: 28,
  completed: 4,
  pending: 16,
  openQueries: 2,
  healthScore: 62,
  completionByCategory: {
    talent_acquisition: 68,
    industry_partnership: 52,
    faculty_development: 91,
    enrollment_access: 30,
    research: 45,
    innovation_ecosystem: 25,
  },
  trendDelta: 5,
};

export const mockAlerts: IAlert[] = [
  { _id: "a1", type: "query",    severity: "high",   title: "Query Raised by SPD",  message: "Please re-upload expenditure certificate for Delivery Partnership Agreements KPI.", kpiId: "k4",  createdAt: "2025-06-12T08:30:00Z" },
  { _id: "a2", type: "rejected", severity: "high",   title: "KPI Rejected",         message: "GER Increase was rejected due to incomplete documents.",                            kpiId: "k12", createdAt: "2025-06-08T11:00:00Z" },
  { _id: "a3", type: "deadline", severity: "medium", title: "Deadline Approaching", message: "Alumni Engagement KPI is due in 3 days.",                                           kpiId: "k21", createdAt: "2025-06-13T00:00:00Z" },
  { _id: "a4", type: "approved", severity: "low",    title: "KPI Approved",         message: "Global Talent Return Scheme has been approved.",                                    kpiId: "k1",  createdAt: "2025-06-10T10:00:00Z" },
];

export const mockDeadlines: IDeadline[] = [
  { _id: "d1", kpiTitle: "Unified Digital Platforms (UIMS, SAMARTH)", category: "digital_transformation", dueDate: "2025-06-15", daysLeft: 2  },
  { _id: "d2", kpiTitle: "Student Mental Health & Wellbeing",          category: "student_welfare",        dueDate: "2025-06-18", daysLeft: 5  },
  { _id: "d3", kpiTitle: "Delivery Partnership Agreements",             category: "industry_partnership",  dueDate: "2025-06-20", daysLeft: 7  },
  { _id: "d4", kpiTitle: "Manufacturing Sector Oriented Research",      category: "research",              dueDate: "2025-06-22", daysLeft: 9  },
  { _id: "d5", kpiTitle: "Alumni Engagement & Endowment Development",   category: "alumni",                dueDate: "2025-06-25", daysLeft: 12 },
];

export const mockMonthlyTrend = [
  { month: "Jan", submitted: 4, approved: 3 },
  { month: "Feb", submitted: 6, approved: 5 },
  { month: "Mar", submitted: 5, approved: 4 },
  { month: "Apr", submitted: 8, approved: 7 },
  { month: "May", submitted: 9, approved: 8 },
  { month: "Jun", submitted: 6, approved: 4 },
];

export const mockQueryThreads: IQueryThread[] = [
  {
    _id: "q1", kpiId: "k4", kpiTitle: "Delivery Partnership Agreements", category: "industry_partnership", priority: "high", status: "open", createdAt: "2025-06-12T08:30:00Z",
    messages: [
      { _id: "m1", senderName: "SPD Consultant", senderRole: "spd", text: "Please re-upload the expenditure certificate with revised vendor details and stamp from authorized signatory.", attachments: [], sentAt: "2025-06-12T08:30:00Z" },
    ],
  },
  {
    _id: "q2", kpiId: "k12", kpiTitle: "GER Increase (≥20% in low-GER regions)", category: "enrollment_access", priority: "urgent", status: "open", createdAt: "2025-06-08T11:00:00Z",
    messages: [
      { _id: "m2", senderName: "SPD Consultant",  senderRole: "spd",         text: "The submitted documents are incomplete. Missing: vendor invoice, procurement approval letter.", attachments: [], sentAt: "2025-06-08T11:00:00Z" },
      { _id: "m3", senderName: "Vishal Panchal",  senderRole: "coordinator", text: "We are gathering the required documents. Will resubmit within 2 working days.",               attachments: [], sentAt: "2025-06-09T09:15:00Z" },
    ],
  },
  {
    _id: "q3", kpiId: "k6", kpiTitle: "Unified Digital Platforms (UIMS, SAMARTH)", category: "digital_transformation", priority: "medium", status: "resolved", createdAt: "2025-06-05T14:00:00Z",
    messages: [
      { _id: "m5", senderName: "SPD Consultant", senderRole: "spd",         text: "Please confirm the platform deployment date.",  attachments: [],                                    sentAt: "2025-06-05T14:00:00Z" },
      { _id: "m6", senderName: "Vishal Panchal", senderRole: "coordinator", text: "Deployment confirmed for June 15, 2025.",       attachments: [{ name: "deployment_plan.pdf", size: "1.2 MB" }], sentAt: "2025-06-06T10:00:00Z" },
    ],
  },
];

export const mockDocuments: IDocument[] = [
  { _id: "d1", name: "Appointment Letter",         fileName: "appointment_letter.pdf",      fileSize: "2.3 MB",  category: "talent_acquisition",    kpiId: "k1",  kpiTitle: "Global Talent Return Scheme",                       status: "accepted", uploadedAt: "2025-06-05T10:00:00Z", tags: ["appointment", "letter"],     version: 1 },
  { _id: "d2", name: "Expenditure Certificate",    fileName: "expenditure_cert_v2.pdf",     fileSize: "1.8 MB",  category: "industry_partnership",  kpiId: "k4",  kpiTitle: "Delivery Partnership Agreements",                   status: "rejected", uploadedAt: "2025-06-10T14:00:00Z", tags: ["certificate", "expenditure"],version: 2 },
  { _id: "d3", name: "Platform Adoption Report",   fileName: "platform_adoption_report.pdf",fileSize: "0.9 MB",  category: "digital_transformation",kpiId: "k6",  kpiTitle: "Unified Digital Platforms (UIMS, SAMARTH)",         status: "accepted", uploadedAt: "2025-06-08T09:00:00Z", tags: ["report", "digital"],         version: 1 },
  { _id: "d4", name: "Training Attendance Sheet",  fileName: "attendance_sheet.pdf",        fileSize: "1.2 MB",  category: "faculty_development",   kpiId: "k11", kpiTitle: "Faculty Training in Emerging Technologies",         status: "accepted", uploadedAt: "2025-06-06T10:00:00Z", tags: ["attendance", "training"],    version: 1 },
  { _id: "d5", name: "Training Completion Report", fileName: "training_report.pdf",         fileSize: "3.1 MB",  category: "faculty_development",   kpiId: "k11", kpiTitle: "Faculty Training in Emerging Technologies",         status: "accepted", uploadedAt: "2025-05-28T11:00:00Z", tags: ["report", "training"],        version: 1 },
  { _id: "d6", name: "Enrollment Data Sheet",      fileName: "enrollment_data.pdf",         fileSize: "0.7 MB",  category: "enrollment_access",     kpiId: "k12", kpiTitle: "GER Increase (≥20% in low-GER regions)",            status: "pending",  uploadedAt: "2025-06-07T16:00:00Z", tags: ["enrollment", "data"],        version: 1 },
  { _id: "d7", name: "Incubation Centre Photos",   fileName: "incubation_photos.zip",       fileSize: "12.4 MB", category: "innovation_ecosystem",  kpiId: "k15", kpiTitle: "Incubation Centres & Innovation Ecosystems",        status: "pending",  uploadedAt: "2025-06-12T13:00:00Z", tags: ["photos", "evidence"],        version: 1 },
  { _id: "d8", name: "Research Publication List",  fileName: "publications.pdf",            fileSize: "1.5 MB",  category: "research",              kpiId: "k22", kpiTitle: "Manufacturing Sector Oriented Research",            status: "accepted", uploadedAt: "2025-06-09T08:00:00Z", tags: ["research", "publications"],  version: 1 },
];

export const mockCategoryBreakdown = [
  { name: "Talent Acquisition",   value: 68, color: "#3b82f6" },
  { name: "Industry Partnership", value: 52, color: "#a855f7" },
  { name: "Faculty Development",  value: 91, color: "#22c55e" },
  { name: "Enrollment & Access",  value: 30, color: "#f97316" },
  { name: "Research",             value: 75, color: "#8b5cf6" },
  { name: "Innovation",           value: 45, color: "#eab308" },
];

export const mockPeerComparison = [
  { university: "Solapur University",    percent: 72, isMe: true },
  { university: "Pune University",       percent: 88 },
  { university: "Nashik University",     percent: 65 },
  { university: "Aurangabad University", percent: 79 },
  { university: "Kolhapur University",   percent: 55 },
];

export const mockWeeklyActivity = [
  { day: "Mon", actions: 3 },
  { day: "Tue", actions: 7 },
  { day: "Wed", actions: 5 },
  { day: "Thu", actions: 9 },
  { day: "Fri", actions: 4 },
  { day: "Sat", actions: 2 },
  { day: "Sun", actions: 1 },
];
