import type { KpiCategory } from "@/app/kpi-engine/schema/kpi-engine-types";
export type { KpiCategory };

export type KpiStatus =
  | "not_started"
  | "draft"
  | "submitted"
  | "approved"
  | "rejected"
  | "query_raised";

export interface IKpi {
  _id: string;
  title: string;
  category: KpiCategory;
  status: KpiStatus;
  dueDate: string;
  completionPercent: number;
  documentsUploaded: number;
  documentsRequired: number;
  hasOpenQuery: boolean;
  lastUpdatedAt: string;
  monthYear: string;
  sanctionedAmount: number;
  expenditure: number;
  remarks?: string;
}

export interface IDashboardStats {
  totalKpis: number;
  completed: number;
  pending: number;
  openQueries: number;
  healthScore: number;
  completionByCategory: Record<string, number>;
  trendDelta: number;
}

export interface IAlert {
  _id: string;
  type: "overdue" | "query" | "approved" | "rejected" | "deadline" | "info";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  message: string;
  kpiId?: string;
  createdAt: string;
}

export interface IDeadline {
  _id: string;
  kpiTitle: string;
  category: KpiCategory;
  dueDate: string;
  daysLeft: number;
}

export interface IQueryMessage {
  _id: string;
  senderName: string;
  senderRole: "spd" | "coordinator";
  text: string;
  attachments: { name: string; size: string }[];
  sentAt: string;
}

export interface IQueryThread {
  _id: string;
  kpiId: string;
  kpiTitle: string;
  category: KpiCategory;
  priority: "urgent" | "high" | "medium" | "low";
  status: "open" | "replied" | "resolved";
  messages: IQueryMessage[];
  createdAt: string;
}

export interface IDocument {
  _id: string;
  name: string;
  fileName: string;
  fileSize: string;
  category: KpiCategory;
  kpiId: string;
  kpiTitle: string;
  status: "accepted" | "rejected" | "pending";
  uploadedAt: string;
  tags: string[];
  version: number;
}
