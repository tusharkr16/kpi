import TopBar from "@/layout/TopBar";
import { mockKpis } from "@/mock/mock-data";
import { cn } from "@/lib/utils";
import { CalendarClock, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import KpiCategoryBadge from "@/components/kpi/KpiCategoryBadge";
import KpiStatusBadge from "@/components/kpi/KpiStatusBadge";
import { useNavigate } from "react-router-dom";

const getUrgency = (daysLeft: number) => {
  if (daysLeft <= 3) return { label: "Critical", color: "text-red-600 bg-red-50 border-red-200", dot: "bg-red-500 animate-pulse", icon: AlertTriangle };
  if (daysLeft <= 7) return { label: "Soon", color: "text-amber-600 bg-amber-50 border-amber-200", dot: "bg-amber-400", icon: Clock };
  return { label: "Upcoming", color: "text-blue-600 bg-blue-50 border-blue-200", dot: "bg-blue-400", icon: CalendarClock };
};

const getDaysLeft = (dueDate: string) => {
  const due = new Date(dueDate);
  const now = new Date("2025-06-13");
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

const DeadlinesPage = () => {
  const navigate = useNavigate();

  const kpisWithDays = mockKpis
    .filter((k) => k.status !== "approved")
    .map((k) => ({ ...k, daysLeft: getDaysLeft(k.dueDate) }))
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const critical = kpisWithDays.filter((k) => k.daysLeft <= 3);
  const soon = kpisWithDays.filter((k) => k.daysLeft > 3 && k.daysLeft <= 7);
  const upcoming = kpisWithDays.filter((k) => k.daysLeft > 7);

  const Section = ({ title, items, emptyMsg }: { title: string; items: typeof kpisWithDays; emptyMsg: string }) => (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{title}</h2>
      {items.length === 0 ? (
        <div className="bg-white rounded-xl border p-6 text-center">
          <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">{emptyMsg}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((kpi) => {
            const urgency = getUrgency(kpi.daysLeft);
            const UrgIcon = urgency.icon;
            return (
              <div
                key={kpi._id}
                onClick={() => navigate(`/kpis/${kpi._id}`)}
                className={cn(
                  "bg-white rounded-xl border p-4 flex items-center gap-4 cursor-pointer hover:shadow-sm transition-shadow",
                  kpi.daysLeft <= 3 && "border-red-200"
                )}
              >
                {/* Day counter */}
                <div className={cn("w-14 h-14 rounded-xl border flex flex-col items-center justify-center shrink-0", urgency.color)}>
                  <p className="text-xl font-bold tabular-nums leading-none">{kpi.daysLeft}</p>
                  <p className="text-[10px] font-medium">days</p>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-sm font-semibold truncate">{kpi.title}</p>
                    <KpiCategoryBadge category={kpi.category} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Due: <strong>{kpi.dueDate}</strong></span>
                    <span>{kpi.monthYear}</span>
                    <span>Docs: {kpi.documentsUploaded}/{kpi.documentsRequired}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", kpi.completionPercent >= 80 ? "bg-green-500" : kpi.completionPercent >= 50 ? "bg-primary" : "bg-amber-400")}
                        style={{ width: `${kpi.completionPercent}%` }}
                      />
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground">{kpi.completionPercent}%</span>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <KpiStatusBadge status={kpi.status} />
                  <div className={cn("flex items-center gap-1 text-xs font-medium", urgency.color.split(" ")[0])}>
                    <UrgIcon className="w-3.5 h-3.5" />
                    {urgency.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col flex-1">
      <TopBar title="Deadlines" breadcrumbs={["Deadlines"]} />

      <div className="p-6 space-y-6">

        {/* Summary pills */}
        <div className="flex flex-wrap gap-3">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{critical.length} Critical (≤3 days)</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{soon.length} Due Soon (≤7 days)</span>
          </div>
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <CalendarClock className="w-4 h-4" />
            <span>{upcoming.length} Upcoming</span>
          </div>
        </div>

        <Section title="⚠ Critical — Due in 3 days or less" items={critical} emptyMsg="No critical deadlines right now." />
        <Section title="⏳ Due Soon — Within 7 days" items={soon} emptyMsg="Nothing due in the next 7 days." />
        <Section title="📅 Upcoming" items={upcoming} emptyMsg="No upcoming deadlines." />
      </div>
    </div>
  );
};

export default DeadlinesPage;
