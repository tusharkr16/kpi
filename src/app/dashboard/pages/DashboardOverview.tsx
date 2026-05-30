import TopBar from "@/layout/TopBar";
import StatCard from "@/components/common/StatCard";
import { mockStats, mockKpis, mockMonthlyTrend } from "@/mock/mock-data";
import {
  ClipboardList, CheckCircle2, Clock, MessageSquare, Activity,
  BookOpen, FlaskConical, GraduationCap, Users, Eye, Landmark, ScrollText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import KpiStatusBadge from "@/components/kpi/KpiStatusBadge";
import { useNavigate } from "react-router-dom";
import type { KpiTab } from "@/app/kpi/types/kpi-types";
import type { LucideIcon } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

/* ── Tab definitions (mirrors KpiList) ─────────────────────────────────── */
interface TabMeta {
  key: KpiTab;
  label: string;
  icon: LucideIcon;
  gradient: string;
  bg: string;
  text: string;
  bar: string;
}

const TAB_META: TabMeta[] = [
  { key: "teaching",    label: "Teaching Learning & Resources",    icon: BookOpen,      gradient: "from-blue-500 to-blue-600",    bg: "bg-blue-50",    text: "text-blue-700",   bar: "#3b82f6" },
  { key: "research",    label: "Research & Professional Practice", icon: FlaskConical,  gradient: "from-violet-500 to-violet-600",bg: "bg-violet-50",  text: "text-violet-700", bar: "#8b5cf6" },
  { key: "graduation",  label: "Graduation Outcome",               icon: GraduationCap, gradient: "from-emerald-500 to-emerald-600",bg:"bg-emerald-50", text: "text-emerald-700",bar: "#10b981" },
  { key: "outreach",    label: "Outreach & Inclusivity",           icon: Users,         gradient: "from-orange-500 to-orange-600",bg: "bg-orange-50",  text: "text-orange-700", bar: "#f97316" },
  { key: "perception",  label: "Perception",                       icon: Eye,           gradient: "from-pink-500 to-pink-600",    bg: "bg-pink-50",    text: "text-pink-700",   bar: "#ec4899" },
  { key: "governance",  label: "Governance & Digital",             icon: Landmark,      gradient: "from-teal-500 to-teal-600",    bg: "bg-teal-50",    text: "text-teal-700",   bar: "#14b8a6" },
  { key: "description", label: "Description",                      icon: ScrollText,    gradient: "from-amber-500 to-amber-600",  bg: "bg-amber-50",   text: "text-amber-700",  bar: "#f59e0b" },
];

const DashboardOverview = () => {
  const navigate = useNavigate();

  /* ── Per-tab stats ───────────────────────────────────────────────────── */
  const tabStats = TAB_META.map((t) => {
    const kpis = mockKpis.filter((k) => k.tab === t.key);
    const approved  = kpis.filter((k) => k.status === "approved").length;
    const submitted = kpis.filter((k) => k.status === "submitted").length;
    const draft     = kpis.filter((k) => ["draft", "not_started"].includes(k.status)).length;
    const action    = kpis.filter((k) => ["rejected", "query_raised"].includes(k.status)).length;
    const completion = kpis.length
      ? Math.round(kpis.reduce((s, k) => s + k.completionPercent, 0) / kpis.length)
      : 0;
    return { ...t, total: kpis.length, approved, submitted, draft, action, completion };
  });

  /* ── Pie chart data — status distribution across all KPIs ───────────── */
  const statusCounts = [
    { name: "Approved",    value: mockKpis.filter((k) => k.status === "approved").length,     color: "#22c55e" },
    { name: "Submitted",   value: mockKpis.filter((k) => k.status === "submitted").length,    color: "#3b82f6" },
    { name: "Draft",       value: mockKpis.filter((k) => k.status === "draft").length,        color: "#94a3b8" },
    { name: "Not Started", value: mockKpis.filter((k) => k.status === "not_started").length,  color: "#e2e8f0" },
    { name: "Rejected",    value: mockKpis.filter((k) => k.status === "rejected").length,     color: "#ef4444" },
    { name: "Query Raised",value: mockKpis.filter((k) => k.status === "query_raised").length, color: "#f97316" },
  ].filter((d) => d.value > 0);

  /* ── Pending actions table ───────────────────────────────────────────── */
  const pendingKpis = mockKpis
    .filter((k) => ["not_started", "draft", "rejected", "query_raised"].includes(k.status))
    .slice(0, 5);

  return (
    <div className="flex flex-col flex-1">
      <TopBar title="Dashboard Overview" breadcrumbs={["Overview"]} />

      <div className="p-6 space-y-6">

        {/* ── Stat Cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Total KPIs"     value={mockStats.totalKpis}             subtitle="This cycle"          icon={ClipboardList} color="blue"   />
          <StatCard title="Completed"      value={mockStats.completed}             subtitle={`${Math.round((mockStats.completed / mockStats.totalKpis) * 100)}% done`} icon={CheckCircle2} color="green" trend="up" trendValue={`+${mockStats.trendDelta} vs last month`} />
          <StatCard title="Pending Action" value={mockStats.pending}               subtitle="Need attention"       icon={Clock}         color="amber"  />
          <StatCard title="Open Queries"   value={mockStats.openQueries}           subtitle="From SPD"             icon={MessageSquare} color="orange" />
          <StatCard title="Health Score"   value={`${mockStats.healthScore}/100`}  subtitle="Overall performance"  icon={Activity}      color="violet" trend="up" trendValue="Good standing" />
        </div>

        {/* ── Tab progress bar chart — one colored bar per tab ───────────── */}
        <div className="bg-white rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-sm">Progress by Tab</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Completion % per category</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={tabStats.map((t) => ({
                name: t.label,
                completion: t.completion,
                color: t.bar,
                approved: t.approved,
                total: t.total,
              }))}
              margin={{ top: 10, right: 20, left: -10, bottom: 60 }}
              barSize={48}
              barCategoryGap="25%"
              onClick={() => navigate("/kpis")}
              style={{ cursor: "pointer" }}
            >
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                tick={(props) => {
                  const { x, y, payload } = props as { x: number; y: number; payload: { value: string } };
                  return (
                    <text x={x} y={y + 10} textAnchor="middle" fill="#64748b" fontSize={11} fontWeight={500}>
                      {String(payload.value).split(" ").map((word: string, i: number) => (
                        <tspan key={i} x={x} dy={i === 0 ? 0 : 14}>{word}</tspan>
                      ))}
                    </text>
                  );
                }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                formatter={(value, _, props) => [`${value}% completion (${props.payload.approved}/${props.payload.total} approved)`, props.payload.name]}
                labelFormatter={() => ""}
                cursor={{ fill: "rgba(0,0,0,0.04)", radius: 8 }}
              />
              <Bar dataKey="completion" radius={[6, 6, 0, 0]}>
                {tabStats.map((t, i) => (
                  <Cell key={i} fill={t.bar} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Middle row: Pie chart + Bar chart ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Pie chart — KPI Status Distribution */}
          <div className="bg-white rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm">KPI Status Distribution</h2>
              <span className="text-xs text-muted-foreground">{mockKpis.length} total KPIs</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusCounts}
                  cx="40%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusCounts.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="white" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
                  formatter={(value, name) => [`${value} KPIs`, name as string]}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span style={{ fontSize: 11 }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar chart — Monthly Trend */}
          <div className="bg-white rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm">Monthly Submission Trend</h2>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Submitted</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />Approved</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockMonthlyTrend} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="submitted" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approved"  fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Pending Actions table ───────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="font-semibold text-sm">Pending Actions</h2>
            <button onClick={() => navigate("/kpis")} className="text-xs text-primary hover:underline font-medium">
              View all KPIs →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground w-16">KPI No.</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">KPI Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Due Date</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Progress</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingKpis.map((kpi) => (
                  <tr key={kpi._id} className="border-b last:border-0 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => navigate(`/kpis/${kpi._id}`)}>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center justify-center w-9 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold">
                        {kpi.kpiNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-medium text-sm max-w-xs truncate">{kpi.title}</td>
                    <td className="px-4 py-3.5"><KpiStatusBadge status={kpi.status} /></td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground tabular-nums">{kpi.dueDate}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full", kpi.completionPercent >= 60 ? "bg-primary" : "bg-amber-400")}
                            style={{ width: `${kpi.completionPercent}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground tabular-nums">{kpi.completionPercent}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => navigate(`/kpis/${kpi._id}`)}
                        className="text-xs text-primary font-semibold hover:underline"
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
