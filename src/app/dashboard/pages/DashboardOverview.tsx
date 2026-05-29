import TopBar from "@/layout/TopBar";
import StatCard from "@/components/common/StatCard";
import { mockStats, mockAlerts, mockDeadlines, mockKpis, mockMonthlyTrend } from "@/mock/mock-data";
import {
  ClipboardList, CheckCircle2, Clock, MessageSquare, Activity,
  AlertTriangle, CalendarClock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import KpiStatusBadge from "@/components/kpi/KpiStatusBadge";
import KpiCategoryBadge from "@/components/kpi/KpiCategoryBadge";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

const severityConfig = {
  critical: { dot: "bg-red-500 animate-pulse", border: "border-l-red-500", bg: "bg-red-50" },
  high: { dot: "bg-orange-500", border: "border-l-orange-500", bg: "bg-orange-50" },
  medium: { dot: "bg-amber-400", border: "border-l-amber-400", bg: "bg-amber-50" },
  low: { dot: "bg-green-500", border: "border-l-green-500", bg: "bg-green-50" },
};

const categoryColors: Record<string, string> = {
  construction: "#3b82f6",
  equipment: "#a855f7",
  soft: "#22c55e",
  renovation: "#f97316",
};

const DashboardOverview = () => {
  const navigate = useNavigate();
  const pendingKpis = mockKpis.filter((k) =>
    ["not_started", "draft", "rejected", "query_raised"].includes(k.status)
  ).slice(0, 5);

  const categoryProgress = Object.entries(mockStats.completionByCategory).map(([cat, pct]) => ({
    category: cat.charAt(0).toUpperCase() + cat.slice(1),
    key: cat,
    percent: pct,
  }));

  return (
    <div className="flex flex-col flex-1">
      <TopBar title="Dashboard Overview" breadcrumbs={["Overview"]} />

      <div className="p-6 space-y-6">

        {/* Critical alert banner */}
        {mockAlerts.some((a) => a.severity === "critical" || a.severity === "high") && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-700">Action Required</p>
              <p className="text-xs text-red-600">
                You have {mockAlerts.filter((a) => a.severity === "high" || a.severity === "critical").length} high-priority alerts that need your attention.
              </p>
            </div>
            <button
              onClick={() => navigate("/kpis")}
              className="text-xs font-medium text-red-700 underline underline-offset-2 shrink-0"
            >
              View KPIs →
            </button>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total KPIs"
            value={mockStats.totalKpis}
            subtitle="This cycle"
            icon={ClipboardList}
            iconColor="text-primary"
          />
          <StatCard
            title="Completed"
            value={mockStats.completed}
            subtitle={`${Math.round((mockStats.completed / mockStats.totalKpis) * 100)}% done`}
            icon={CheckCircle2}
            iconColor="text-green-600"
            trend="up"
            trendValue={`+${mockStats.trendDelta} vs last month`}
          />
          <StatCard
            title="Pending Action"
            value={mockStats.pending}
            subtitle="Need attention"
            icon={Clock}
            iconColor="text-amber-500"
          />
          <StatCard
            title="Open Queries"
            value={mockStats.openQueries}
            subtitle="From SPD"
            icon={MessageSquare}
            iconColor="text-orange-500"
          />
          <StatCard
            title="Health Score"
            value={`${mockStats.healthScore}/100`}
            subtitle="Overall performance"
            icon={Activity}
            iconColor="text-primary"
            trend="up"
            trendValue="Good standing"
          />
        </div>

        {/* Middle row */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">

          {/* Category Progress */}
          <div className="lg:col-span-4 bg-white rounded-xl border p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm">KPI Completion by Category</h2>
              <span className="text-xs text-muted-foreground">June 2025</span>
            </div>
            <div className="space-y-4">
              {categoryProgress.map(({ category, key, percent }) => (
                <div key={key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: categoryColors[key] }}
                      />
                      <span className="font-medium">{category}</span>
                    </div>
                    <span className="text-muted-foreground font-medium tabular-nums">{percent}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%`, backgroundColor: categoryColors[key] }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Health score bar */}
            <div className="pt-3 border-t flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Overall Health Score</p>
                <p className="text-2xl font-bold text-primary tabular-nums">{mockStats.healthScore}<span className="text-sm font-normal text-muted-foreground">/100</span></p>
              </div>
              <div className="w-28 h-28 relative flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="#3b82f6" strokeWidth="3"
                    strokeDasharray={`${mockStats.healthScore} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-lg font-bold text-primary">{mockStats.healthScore}</span>
              </div>
            </div>
          </div>

          {/* Alerts panel */}
          <div className="lg:col-span-3 bg-white rounded-xl border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm">Alerts & Notifications</h2>
              <span className="text-xs text-muted-foreground">{mockAlerts.length} total</span>
            </div>
            <div className="space-y-2">
              {mockAlerts.map((alert) => {
                const sc = severityConfig[alert.severity];
                return (
                  <div
                    key={alert._id}
                    className={cn(
                      "flex gap-3 p-3 rounded-lg border-l-4 cursor-pointer hover:opacity-80 transition-opacity",
                      sc.border, sc.bg
                    )}
                    onClick={() => alert.kpiId && navigate(`/kpis/${alert.kpiId}`)}
                  >
                    <div className={cn("w-2 h-2 rounded-full mt-1 shrink-0", sc.dot)} />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground">{alert.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{alert.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">

          {/* Monthly trend chart */}
          <div className="lg:col-span-4 bg-white rounded-xl border p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm">Monthly Submission Trend</h2>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Submitted</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />Approved</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={mockMonthlyTrend} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
                />
                <Bar dataKey="submitted" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approved" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Deadlines */}
          <div className="lg:col-span-3 bg-white rounded-xl border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-primary" />
                Upcoming Deadlines
              </h2>
            </div>
            <div className="space-y-2">
              {mockDeadlines.map((d) => (
                <div
                  key={d._id}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
                  onClick={() => navigate("/kpis")}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold tabular-nums",
                    d.daysLeft <= 3 ? "bg-red-100 text-red-700" :
                    d.daysLeft <= 7 ? "bg-amber-100 text-amber-700" :
                    "bg-blue-100 text-blue-700"
                  )}>
                    {d.daysLeft}d
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate">{d.kpiTitle}</p>
                    <p className="text-xs text-muted-foreground">{d.dueDate}</p>
                  </div>
                  <KpiCategoryBadge category={d.category} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending KPIs quick table */}
        <div className="bg-white rounded-xl border">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="font-semibold text-sm">Pending Actions</h2>
            <button
              onClick={() => navigate("/kpis")}
              className="text-xs text-primary hover:underline font-medium"
            >
              View all KPIs →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">KPI Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Due Date</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Progress</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingKpis.map((kpi) => (
                  <tr key={kpi._id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3 font-medium text-sm truncate max-w-[200px]">{kpi.title}</td>
                    <td className="px-4 py-3"><KpiCategoryBadge category={kpi.category} /></td>
                    <td className="px-4 py-3"><KpiStatusBadge status={kpi.status} /></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground tabular-nums">{kpi.dueDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${kpi.completionPercent}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground tabular-nums">{kpi.completionPercent}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => navigate(`/kpis/${kpi._id}`)}
                        className="text-xs text-primary font-medium hover:underline"
                      >
                        {kpi.status === "rejected" ? "Resubmit" :
                         kpi.status === "query_raised" ? "Reply" :
                         kpi.status === "draft" ? "Continue" : "Fill Now"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;
