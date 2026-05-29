import { cn } from "@/lib/utils";
import type { KpiStatus } from "@/app/kpi/types/kpi-types";

const config: Record<KpiStatus, { label: string; className: string }> = {
  not_started: { label: "Not Started", className: "bg-gray-100 text-gray-600" },
  draft: { label: "Draft", className: "bg-blue-100 text-blue-700" },
  submitted: { label: "Submitted", className: "bg-amber-100 text-amber-700" },
  approved: { label: "Approved", className: "bg-green-100 text-green-700" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700" },
  query_raised: { label: "Query Raised", className: "bg-orange-100 text-orange-700" },
};

const KpiStatusBadge = ({ status }: { status: KpiStatus }) => {
  const { label, className } = config[status];
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", className)}>
      {label}
    </span>
  );
};

export default KpiStatusBadge;
