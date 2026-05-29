import TopBar from "@/layout/TopBar";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import { mockMonthlyTrend, mockCategoryBreakdown, mockPeerComparison, mockWeeklyActivity, mockStats } from "@/mock/mock-data";
import { cn } from "@/lib/utils";
import { TrendingUp, Award, Target, BarChart3 } from "lucide-react";

const radarData = [
  { subject: "Construction", A: 68 },
  { subject: "Equipment", A: 52 },
  { subject: "Soft", A: 91 },
  { subject: "Renovation", A: 30 },
  { subject: "Docs", A: 75 },
  { subject: "Queries", A: 85 },
];

const statusDistribution = [
  { name: "Approved", value: 2, color: "#22c55e" },
  { name: "Submitted", value: 2, color: "#f59e0b" },
  { name: "Draft", value: 2, color: "#3b82f6" },
  { name: "Not Started", value: 2, color: "#94a3b8" },
  { name: "Rejected", value: 1, color: "#ef4444" },
  { name: "Query Raised", value: 1, color: "#f97316" },
];

const AnalyticsPage = () => {
  const myRank = mockPeerComparison.findIndex((p) => p.isMe) + 1;

  return (
    <div className="flex flex-col flex-1">
      <TopBar title="Analytics" breadcrumbs={["Analytics"]} />

      <div className="p-6 space-y-6">

        {/* Top summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Completion Rate", value: `${Math.round((mockStats.completed / mockStats.totalKpis) * 100)}%`, icon: Target, color: "text-primary", bg: "bg-primary/10" },
            { label: "Health Score", value: `${mockStats.healthScore}/100`, icon: BarChart3, color: "text-green-600", bg: "bg-green-100" },
            { label: "State Rank", value: `#${myRank} of ${mockPeerComparison.length}`, icon: Award, color: "text-amber-600", bg: "bg-amber-100" },
            { label: "Trend", value: `+${mockStats.trendDelta}%`, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-100" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-xl border p-5 flex items-center gap-4">
              <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", bg)}>
                <Icon className={cn("w-5 h-5", color)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className={cn("text-xl font-bold tabular-nums", color)}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">

          {/* Monthly trend */}
          <div className="lg:col-span-4 bg-white rounded-xl border p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm">Monthly Submission & Approval Trend</h2>
              <span className="text-xs text-muted-foreground">Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={mockMonthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="submitted" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Submitted" />
                <Line type="monotone" dataKey="approved" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Approved" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* KPI status donut */}
          <div className="lg:col-span-3 bg-white rounded-xl border p-5 space-y-4">
            <h2 className="font-semibold text-sm">KPI Status Distribution</h2>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {statusDistribution.map((s) => (
                <div key={s.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className="font-medium ml-auto">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">

          {/* Peer comparison */}
          <div className="lg:col-span-4 bg-white rounded-xl border p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm">University Peer Comparison</h2>
              <span className="text-xs text-muted-foreground">State level · June 2025</span>
            </div>
            <div className="space-y-3">
              {mockPeerComparison
                .sort((a, b) => b.percent - a.percent)
                .map((p, idx) => (
                  <div key={p.university} className={cn("flex items-center gap-3", p.isMe && "")}>
                    <span className={cn(
                      "text-xs font-bold w-5 text-center tabular-nums shrink-0",
                      idx === 0 ? "text-amber-500" : "text-muted-foreground"
                    )}>
                      #{idx + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className={cn("text-xs font-medium", p.isMe && "text-primary font-bold")}>
                          {p.university} {p.isMe && "(You)"}
                        </span>
                        <span className="text-xs tabular-nums font-semibold">{p.percent}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all", p.isMe ? "bg-primary" : "bg-slate-300")}
                          style={{ width: `${p.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Radar + weekly activity */}
          <div className="lg:col-span-3 space-y-5">
            {/* Radar */}
            <div className="bg-white rounded-xl border p-5 space-y-3">
              <h2 className="font-semibold text-sm">Performance Radar</h2>
              <ResponsiveContainer width="100%" height={160}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#f1f5f9" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                  <Radar dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Weekly activity */}
            <div className="bg-white rounded-xl border p-5 space-y-3">
              <h2 className="font-semibold text-sm">Weekly Activity</h2>
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={mockWeeklyActivity} barSize={20}>
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="actions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category breakdown bar */}
        <div className="bg-white rounded-xl border p-5 space-y-4">
          <h2 className="font-semibold text-sm">Category-wise Completion</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={mockCategoryBreakdown} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
                formatter={(v) => [`${v}%`, "Completion"]}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {mockCategoryBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsPage;
