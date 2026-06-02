import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TopBar from "@/layout/TopBar";
import { mockKpis } from "@/mock/mock-data";
import { cn } from "@/lib/utils";
import KpiStatusBadge from "@/components/kpi/KpiStatusBadge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Cell,
} from "recharts";
import {
  BarChart3, Search, TrendingUp, TrendingDown,
  Building2, AlertTriangle, CheckCircle2,
  Filter, ArrowUpDown, FileText, MessageSquare, Eye, Send,
  BookOpen, FlaskConical, GraduationCap, Users, Landmark, ScrollText, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { KpiTab, KpiStatus } from "@/app/kpi/types/kpi-types";
import { useKpiSubmissionStore } from "@/store/kpi-submission-store";
import { getKpiSchema } from "@/app/kpi-engine/schema/kpi-schemas";
import { isFieldVisible } from "@/app/kpi-engine/engine/dependency-resolver";

/* ── Mock SPU data (all universities in Maharashtra) ────────────────────── */
const SPUS = [
  { id: "spu1",  name: "Pune University",               region: "Pune",       type: "State", size: "Large",  score: 81, kpis: { teaching: 88, research: 76, graduation: 65, outreach: 70, perception: 72, governance: 85 }, trend: "+6", submitted: 24, approved: 20, pending: 4  },
  { id: "spu2",  name: "Mumbai University",             region: "Mumbai",     type: "State", size: "Large",  score: 78, kpis: { teaching: 82, research: 70, graduation: 60, outreach: 68, perception: 65, governance: 80 }, trend: "+4", submitted: 22, approved: 18, pending: 4  },
  { id: "spu3",  name: "SRTMUN Nanded",                 region: "Marathwada", type: "State", size: "Medium", score: 62, kpis: { teaching: 77, research: 40, graduation: 12, outreach: 55, perception: 18, governance: 90 }, trend: "+4", submitted: 16, approved: 9,  pending: 7  },
  { id: "spu4",  name: "Nagpur University",             region: "Vidarbha",   type: "State", size: "Large",  score: 55, kpis: { teaching: 60, research: 48, graduation: 30, outreach: 50, perception: 55, governance: 70 }, trend: "+2", submitted: 14, approved: 8,  pending: 6  },
  { id: "spu5",  name: "Aurangabad University",         region: "Marathwada", type: "State", size: "Medium", score: 49, kpis: { teaching: 52, research: 38, graduation: 28, outreach: 42, perception: 44, governance: 58 }, trend: "-1", submitted: 12, approved: 6,  pending: 6  },
  { id: "spu6",  name: "Kolhapur University",           region: "Konkan",     type: "State", size: "Medium", score: 67, kpis: { teaching: 70, research: 55, graduation: 48, outreach: 60, perception: 62, governance: 74 }, trend: "+3", submitted: 18, approved: 12, pending: 6  },
  { id: "spu7",  name: "Nashik University",             region: "North MH",   type: "State", size: "Small",  score: 44, kpis: { teaching: 48, research: 32, graduation: 20, outreach: 38, perception: 40, governance: 55 }, trend: "-2", submitted: 10, approved: 5,  pending: 5  },
  { id: "spu8",  name: "Solapur University",            region: "Pune",       type: "State", size: "Small",  score: 52, kpis: { teaching: 55, research: 40, graduation: 35, outreach: 48, perception: 50, governance: 62 }, trend: "+1", submitted: 13, approved: 7,  pending: 6  },
];

const KPI_CATEGORIES = ["teaching", "research", "graduation", "outreach", "perception", "governance"] as const;
type KpiCat = typeof KPI_CATEGORIES[number];

const CAT_LABELS: Record<KpiCat, string> = {
  teaching: "Teaching & Learning", research: "Research", graduation: "Graduation",
  outreach: "Outreach", perception: "Perception", governance: "Governance",
};

const TREND_DATA = [
  { month: "Jan", vacancy: 38, ger: 52, funding: 42 },
  { month: "Feb", vacancy: 35, ger: 55, funding: 46 },
  { month: "Mar", vacancy: 32, ger: 58, funding: 50 },
  { month: "Apr", vacancy: 30, ger: 60, funding: 54 },
  { month: "May", vacancy: 28, ger: 63, funding: 58 },
  { month: "Jun", vacancy: 25, ger: 65, funding: 62 },
];

const REGIONS = ["All", "Pune", "Mumbai", "Marathwada", "Vidarbha", "Konkan", "North MH"];
const SIZES   = ["All", "Large", "Medium", "Small"];

type Section = "state" | "drilldown" | "dataviewer" | "queries";

const TAB_META: { key: KpiTab; label: string; icon: React.ElementType; color: string }[] = [
  { key: "teaching",    label: "Teaching & Learning",           icon: BookOpen,      color: "text-blue-600"   },
  { key: "research",    label: "Research & Professional",       icon: FlaskConical,  color: "text-violet-600" },
  { key: "graduation",  label: "Graduation Outcome",            icon: GraduationCap, color: "text-emerald-600"},
  { key: "outreach",    label: "Outreach & Inclusivity",        icon: Users,         color: "text-orange-600" },
  { key: "perception",  label: "Perception",                    icon: Eye,           color: "text-pink-600"   },
  { key: "governance",  label: "Governance & Digital",          icon: Landmark,      color: "text-teal-600"   },
  { key: "description", label: "Description",                   icon: ScrollText,    color: "text-amber-600"  },
];

const scoreColor = (v: number) =>
  v >= 70 ? "text-green-600" : v >= 50 ? "text-amber-600" : "text-red-600";
const scoreBg = (v: number) =>
  v >= 70 ? "bg-green-500" : v >= 50 ? "bg-amber-400" : "bg-red-400";
const scoreBadge = (v: number) =>
  v >= 70 ? "bg-green-100 text-green-700" : v >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";

export default function ACSDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = (searchParams.get("section") as Section) ?? "state";
  const setActive = (s: Section) => setSearchParams({ section: s });
  const [selectedKpi, setSelectedKpi] = useState<KpiCat>("teaching");
  const [regionFilter, setRegionFilter] = useState("All");
  const [sizeFilter, setSizeFilter]   = useState("All");
  const [search, setSearch]           = useState("");
  const [selectedSpu, setSelectedSpu] = useState<typeof SPUS[0] | null>(null);
  const [sortBy, setSortBy]           = useState<"score" | "name">("score");

  // Queries state
  type AcsThread = {
    _id: string; university: string; vcName: string; subject: string;
    status: "open" | "resolved"; priority: "high" | "medium" | "low";
    createdAt: string;
    messages: { _id: string; sender: string; role: "acs" | "vc"; text: string; sentAt: string }[];
  };
  const [acsThreads, setAcsThreads] = useState<AcsThread[]>([
    {
      _id: "aq1",
      university: "Solapur University",
      vcName: "Dr. Ramesh Kulkarni",
      subject: "KPI 3 — Mission Mode Faculty Recruitment",
      status: "open" as const,
      priority: "high" as const,
      createdAt: "2025-06-10T09:00:00Z",
      messages: [
        { _id: "am1", sender: "ACS Office", role: "acs" as const, text: "Please clarify the recruitment status for the 38 advertised positions. The submitted data shows only 32 joined — kindly provide the reason for the 6 declines and whether re-advertisement is planned.", sentAt: "2025-06-10T09:00:00Z" },
        { _id: "am2", sender: "Dr. Ramesh Kulkarni (VC)", role: "vc" as const, text: "6 candidates declined due to lower pay scale compared to private sector. We are re-advertising 4 positions. 2 positions are being absorbed by contract extension.", sentAt: "2025-06-11T11:30:00Z" },
      ],
    },
    {
      _id: "aq2",
      university: "Nagpur University",
      vcName: "Dr. Priya Deshpande",
      subject: "KPI 16 — International Student Enrolment",
      status: "open" as const,
      priority: "medium" as const,
      createdAt: "2025-06-08T14:00:00Z",
      messages: [
        { _id: "am3", sender: "ACS Office", role: "acs" as const, text: "Your international student count shows 20% growth but the SII portal data reflects only 12%. Please reconcile the discrepancy and re-upload verified enrolment data.", sentAt: "2025-06-08T14:00:00Z" },
      ],
    },
    {
      _id: "aq3",
      university: "Pune University",
      vcName: "Dr. Anjali Mehta",
      subject: "KPI 8 — Skill Course Integration",
      status: "resolved" as const,
      priority: "low" as const,
      createdAt: "2025-06-02T10:00:00Z",
      messages: [
        { _id: "am5", sender: "ACS Office", role: "acs" as const, text: "Please submit the Academic Council approval minutes for the 5 new skill courses added this semester.", sentAt: "2025-06-02T10:00:00Z" },
        { _id: "am6", sender: "Dr. Anjali Mehta (VC)", role: "vc" as const, text: "AC minutes uploaded. All 5 courses approved in the April 2025 council meeting.", sentAt: "2025-06-03T09:00:00Z" },
        { _id: "am7", sender: "ACS Office", role: "acs" as const, text: "Documents verified. Query resolved. Thank you.", sentAt: "2025-06-04T10:00:00Z" },
      ],
    },
  ]);
  const [selectedAcsThread, setSelectedAcsThread] = useState("aq1");
  const [acsReplyText, setAcsReplyText] = useState("");

  // Data Viewer state
  const [dvUniversity, setDvUniversity]   = useState(SPUS[0].id);
  const [dvTab, setDvTab]                 = useState<KpiTab>("teaching");
  const [dvSearch, setDvSearch]           = useState("");
  const [dvStatusFilter] = useState<KpiStatus | "all">("all");
  const [dvSelectedKpi, setDvSelectedKpi] = useState<string | null>(null);
  const [acsApproved, setAcsApproved]     = useState<Set<string>>(new Set());
  const [remarkMap, setRemarkMap]         = useState<Record<string, string>>({});
  const [savedRemarks, setSavedRemarks]   = useState<Set<string>>(new Set());
  const { getSubmission }                 = useKpiSubmissionStore();

  const renderVal = (value: unknown, fieldType: string, options?: { label: string; value: string }[]): string => {
    if (value === null || value === undefined || value === "") return "—";
    if (Array.isArray(value)) return options ? value.map((v) => options.find((o) => o.value === v)?.label ?? String(v)).join(", ") : value.join(", ");
    if (typeof value === "object" && (value as { name?: string }).name) return `${(value as { name: string; size: string }).name} (${(value as { name: string; size: string }).size})`;
    if (fieldType === "currency") return `₹ ${Number(value).toLocaleString("en-IN")}`;
    if (fieldType === "percentage") return `${value}%`;
    if (options) return options.find((o) => o.value === String(value))?.label ?? String(value);
    return String(value);
  };

  const filtered = SPUS
    .filter((s) => regionFilter === "All" || s.region === regionFilter)
    .filter((s) => sizeFilter   === "All" || s.size   === sizeFilter)
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === "score" ? b.score - a.score : a.name.localeCompare(b.name));

  const stateAvg = Math.round(SPUS.reduce((s, u) => s + u.score, 0) / SPUS.length);
  const kpiAvgs  = KPI_CATEGORIES.map((k) => ({
    name: CAT_LABELS[k],
    avg: Math.round(SPUS.reduce((s, u) => s + u.kpis[k], 0) / SPUS.length),
    key: k,
  }));

  const topPerformers    = [...SPUS].sort((a, b) => (b.kpis[selectedKpi] ?? 0) - (a.kpis[selectedKpi] ?? 0)).slice(0, 3);
  const bottomPerformers = [...SPUS].sort((a, b) => (a.kpis[selectedKpi] ?? 0) - (b.kpis[selectedKpi] ?? 0)).slice(0, 3);

  return (
    <div className="flex flex-col flex-1">
      <TopBar title="ACS — State-Level Monitoring" breadcrumbs={["ACS Dashboard"]} />

      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-muted/20">

          {/* ── 3.1 State-Level Dashboard ──────────────────────────── */}
          {active === "state" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold">State-Level Dashboard</h2>
                <p className="text-xs text-muted-foreground">Real-time tracking across {SPUS.length} State Public Universities in Maharashtra</p>
              </div>

              {/* Summary stat row */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "State Avg Score",  value: `${stateAvg}/100`, sub: "Composite across all KPIs", icon: BarChart3,     gradient: "from-blue-500 to-blue-600"    },
                  { label: "Total SPUs",        value: SPUS.length,       sub: "Universities tracked",       icon: Building2,    gradient: "from-violet-500 to-violet-600" },
                  { label: "High Performers",   value: SPUS.filter((s) => s.score >= 70).length, sub: "Score ≥ 70", icon: CheckCircle2, gradient: "from-emerald-500 to-emerald-600" },
                  { label: "At Risk",           value: SPUS.filter((s) => s.score < 50).length,  sub: "Score < 50", icon: AlertTriangle, gradient: "from-red-500 to-red-600" },
                ].map(({ label, value, sub, gradient, icon: Icon }) => (
                  <div key={label} className={cn("rounded-2xl p-4 bg-gradient-to-br text-white", gradient)}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-white/80 font-medium">{label}</p>
                      <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-3xl font-extrabold tabular-nums text-white">{value}</p>
                    <p className="text-xs text-white/70 mt-1">{sub}</p>
                  </div>
                ))}
              </div>

              {/* KPI-wise average progress */}
              <div className="bg-white border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">Average Completion Score — All SPUs per KPI Category</h3>
                  <span className="text-xs text-muted-foreground">State average across {SPUS.length} universities</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={kpiAvgs} barSize={36} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={0} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`${v}%`, "Avg Score"]} />
                    <Bar dataKey="avg" radius={[6, 6, 0, 0]}>
                      {kpiAvgs.map((_entry, i) => (
                        <Cell key={i} fill={["#3b82f6","#8b5cf6","#10b981","#f97316","#ec4899","#14b8a6"][i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* KPI Heat Map — colour coded per SPU */}
              <div className="bg-white border rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b flex items-center justify-between">
                  <h3 className="text-sm font-semibold">KPI-wise Heat Map — All Universities</h3>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block" />≥70</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-400 inline-block" />50–69</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-400 inline-block" />&lt;50</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b bg-muted/20">
                        <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground w-44">University</th>
                        {KPI_CATEGORIES.map((k) => (
                          <th key={k} className="px-3 py-2.5 font-semibold text-muted-foreground text-center capitalize">{k}</th>
                        ))}
                        <th className="px-3 py-2.5 font-semibold text-muted-foreground text-center">Overall</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SPUS.map((spu) => (
                        <tr key={spu.id} className="border-b last:border-0 hover:bg-muted/10 cursor-pointer"
                          onClick={() => { setSelectedSpu(spu); setActive("drilldown"); }}>
                          <td className="px-4 py-2.5 font-medium text-foreground">{spu.name}</td>
                          {KPI_CATEGORIES.map((k) => {
                            const v = spu.kpis[k];
                            return (
                              <td key={k} className="px-3 py-2.5 text-center">
                                <span className={cn("inline-flex items-center justify-center w-10 h-6 rounded-md text-xs font-bold text-white",
                                  v >= 70 ? "bg-green-500" : v >= 50 ? "bg-amber-400" : "bg-red-400"
                                )}>{v}</span>
                              </td>
                            );
                          })}
                          <td className="px-3 py-2.5 text-center">
                            <span className={cn("inline-flex items-center justify-center w-10 h-6 rounded-md text-xs font-bold", scoreBadge(spu.score))}>
                              {spu.score}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Trend analysis */}
              <div className="bg-white border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">Trend Analysis — Key State Metrics</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" />Vacancy %</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />GER</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />Industry Funding</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={TREND_DATA} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`${v}%`]} />
                    <Line type="monotone" dataKey="vacancy"  stroke="#f87171" strokeWidth={2.5} dot={{ r: 3 }} name="Vacancy %" />
                    <Line type="monotone" dataKey="ger"      stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} name="GER" />
                    <Line type="monotone" dataKey="funding"  stroke="#22c55e" strokeWidth={2.5} dot={{ r: 3 }} name="Industry Funding" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Top & Bottom performers per KPI */}
              <div className="bg-white border rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Top & Bottom Performers</h3>
                  <select value={selectedKpi} onChange={(e) => setSelectedKpi(e.target.value as KpiCat)}
                    className="border rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-primary/20">
                    {KPI_CATEGORIES.map((k) => <option key={k} value={k}>{CAT_LABELS[k]}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 divide-x">
                  <div className="p-4">
                    <p className="text-xs font-semibold text-green-700 flex items-center gap-1 mb-3"><TrendingUp className="w-3.5 h-3.5" />Top 3 — {CAT_LABELS[selectedKpi]}</p>
                    <div className="space-y-2">
                      {topPerformers.map((spu, i) => (
                        <div key={spu.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-green-50 border border-green-100 cursor-pointer hover:border-green-300"
                          onClick={() => { setSelectedSpu(spu); setActive("drilldown"); }}>
                          <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center shrink-0">#{i + 1}</span>
                          <span className="flex-1 text-xs font-medium truncate">{spu.name}</span>
                          <span className="text-sm font-extrabold text-green-700 tabular-nums">{spu.kpis[selectedKpi]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-red-700 flex items-center gap-1 mb-3"><TrendingDown className="w-3.5 h-3.5" />Bottom 3 — {CAT_LABELS[selectedKpi]}</p>
                    <div className="space-y-2">
                      {bottomPerformers.map((spu, i) => (
                        <div key={spu.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-red-50 border border-red-100 cursor-pointer hover:border-red-300"
                          onClick={() => { setSelectedSpu(spu); setActive("drilldown"); }}>
                          <span className="w-6 h-6 rounded-full bg-red-400 text-white text-xs font-bold flex items-center justify-center shrink-0">#{i + 1}</span>
                          <span className="flex-1 text-xs font-medium truncate">{spu.name}</span>
                          <span className="text-sm font-extrabold text-red-600 tabular-nums">{spu.kpis[selectedKpi]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 3.2 University-Specific Drilldown ─────────────────── */}
          {active === "drilldown" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold">University-Specific Drilldown</h2>
                <p className="text-xs text-muted-foreground">Click any university to view its full KPI dashboard · historical comparison · peer group analysis</p>
              </div>

              {/* Filters + search */}
              <div className="bg-white border rounded-2xl p-4 flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input type="text" placeholder="Search university..." value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-lg pl-8 pr-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Filter className="w-3.5 h-3.5" />Filter:</div>
                <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}
                  className="border rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-primary/20">
                  {REGIONS.map((r) => <option key={r}>{r}</option>)}
                </select>
                <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}
                  className="border rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-primary/20">
                  {SIZES.map((s) => <option key={s}>{s}</option>)}
                </select>
                <button onClick={() => setSortBy((p) => p === "score" ? "name" : "score")}
                  className="flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs hover:bg-muted transition-colors">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Sort by {sortBy === "score" ? "Name" : "Score"}
                </button>
              </div>

              {!selectedSpu ? (
                /* University table */
                <div className="bg-white border rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/20">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">University</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Region</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Size</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Overall Score</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Trend</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Submitted</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Approved</th>
                        <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((spu) => (
                        <tr key={spu.id}
                          onClick={() => setSelectedSpu(spu)}
                          className="border-b last:border-0 hover:bg-primary/5 cursor-pointer transition-colors group"
                        >
                          <td className="px-5 py-3.5">
                            <p className="text-sm font-semibold group-hover:text-primary transition-colors">{spu.name}</p>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">{spu.region}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{spu.size}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                                <div className={cn("h-full rounded-full", scoreBg(spu.score))} style={{ width: `${spu.score}%` }} />
                              </div>
                              <span className={cn("text-sm font-bold tabular-nums", scoreColor(spu.score))}>{spu.score}</span>
                              <span className="text-xs text-muted-foreground">/100</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={cn("text-xs font-semibold flex items-center gap-0.5",
                              spu.trend.startsWith("+") ? "text-green-600" : "text-red-500")}>
                              {spu.trend.startsWith("+") ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {spu.trend}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-sm font-semibold text-blue-700 tabular-nums">{spu.submitted}</td>
                          <td className="px-4 py-3.5 text-sm font-semibold text-green-700 tabular-nums">{spu.approved}</td>
                          <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setSelectedSpu(spu)}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                              View Details →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Selected university detail view */
                <div className="space-y-5">
                  {/* Back + header */}
                  <div className="flex items-center gap-3">
                    <button onClick={() => setSelectedSpu(null)}
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors">
                      ← All Universities
                    </button>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold">{selectedSpu.name}</h3>
                      <p className="text-xs text-muted-foreground">{selectedSpu.region} · {selectedSpu.type} · {selectedSpu.size}</p>
                    </div>
                    <span className={cn("text-2xl font-extrabold tabular-nums", scoreColor(selectedSpu.score))}>{selectedSpu.score}<span className="text-sm font-normal text-muted-foreground">/100</span></span>
                  </div>

                  {/* KPI breakdown */}
                  <div className="bg-white border rounded-2xl p-5">
                    <h4 className="text-sm font-semibold mb-4">KPI Category Scores</h4>
                    <div className="space-y-3">
                      {KPI_CATEGORIES.map((k) => {
                        const v = selectedSpu.kpis[k];
                        const stateAvgK = Math.round(SPUS.reduce((s, u) => s + u.kpis[k], 0) / SPUS.length);
                        return (
                          <div key={k}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium capitalize">{CAT_LABELS[k]}</span>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-muted-foreground">State avg: {stateAvgK}%</span>
                                <span className={cn("font-bold tabular-nums", scoreColor(v))}>{v}%</span>
                              </div>
                            </div>
                            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                              <div className={cn("h-full rounded-full transition-all", scoreBg(v))} style={{ width: `${v}%` }} />
                              {/* State avg marker */}
                              <div className="absolute top-0 h-full w-0.5 bg-slate-500/50" style={{ left: `${stateAvgK}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Historical comparison */}
                  <div className="bg-white border rounded-2xl p-5">
                    <h4 className="text-sm font-semibold mb-4">Historical Comparison</h4>
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart
                        data={[
                          { year: "2022", score: selectedSpu.score - 14 },
                          { year: "2023", score: selectedSpu.score - 9  },
                          { year: "2024", score: selectedSpu.score - 4  },
                          { year: "2025", score: selectedSpu.score      },
                        ]}
                        margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="year" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`${v}/100`, "Score"]} />
                        <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 5, fill: "#3b82f6" }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Peer group analysis */}
                  <div className="bg-white border rounded-2xl p-5">
                    <h4 className="text-sm font-semibold mb-1">Peer Group Analysis</h4>
                    <p className="text-xs text-muted-foreground mb-4">Compared with SPUs of similar size ({selectedSpu.size})</p>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart
                        data={SPUS.filter((s) => s.size === selectedSpu.size).map((s) => ({
                          name: s.name.split(" ")[0],
                          score: s.score,
                          fill: s.id === selectedSpu.id ? "#3b82f6" : "#cbd5e1",
                        }))}
                        barSize={32}
                        margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`${v}/100`, "Score"]} />
                        <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                          {SPUS.filter((s) => s.size === selectedSpu.size).map((s, i) => (
                            <Cell key={i} fill={s.id === selectedSpu.id ? "#3b82f6" : "#cbd5e1"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Remarks */}
                  <div className="bg-white border rounded-2xl p-5 space-y-3">
                    <h4 className="text-sm font-semibold">ACS Remarks (Read-only view + add remarks)</h4>
                    <div className="bg-muted/30 rounded-xl p-3 text-xs text-muted-foreground italic">
                      "University showing steady improvement in governance. Research and graduation outcome require targeted interventions."
                    </div>
                    <textarea rows={2} placeholder="Add your remarks as ACS officer..."
                      className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                    <Button size="sm" onClick={() => toast.success("Remarks saved successfully")}>Save Remarks</Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── 3.3 Data Viewer ───────────────────────────────────── */}
          {active === "dataviewer" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold">Data Viewer</h2>
                <p className="text-xs text-muted-foreground">View KPI submissions university-wise · add remarks · raise queries</p>
              </div>

              {/* University + Tab selector */}
              <div className="bg-white border rounded-2xl p-4 flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                  <select
                    value={dvUniversity}
                    onChange={(e) => setDvUniversity(e.target.value)}
                    className="border rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 min-w-52"
                  >
                    {SPUS.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="relative flex-1 min-w-40">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search KPI..."
                    value={dvSearch}
                    onChange={(e) => setDvSearch(e.target.value)}
                    className="w-full border rounded-lg pl-8 pr-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                {/* Summary chips */}
                {(() => {
                  const spuData = SPUS.find((s) => s.id === dvUniversity)!;
                  return (
                    <div className="flex items-center gap-2 text-xs ml-auto">
                      <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">{spuData.approved} Approved</span>
                      <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-semibold">{spuData.submitted} Submitted</span>
                      <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-semibold">{spuData.pending} Pending</span>
                    </div>
                  );
                })()}
              </div>

              {/* Tab pills */}
              <div className="flex gap-2 flex-wrap">
                {TAB_META.map(({ key, label, icon: Icon, color }) => (
                  <button
                    key={key}
                    onClick={() => setDvTab(key)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors",
                      dvTab === key
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("w-3.5 h-3.5", dvTab === key ? "text-white" : color)} />
                    {label}
                  </button>
                ))}
              </div>

              {/* KPI submissions table */}
              <div className="bg-white border rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b flex items-center justify-between">
                  <h3 className="text-sm font-semibold">
                    {TAB_META.find((t) => t.key === dvTab)?.label} — KPI Submissions
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {SPUS.find((s) => s.id === dvUniversity)?.name}
                  </span>
                </div>

                {!dvSelectedKpi ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/20">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground w-16">No.</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">KPI Title</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Progress</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Docs</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Due Date</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockKpis
                        .filter((k) => k.tab === dvTab)
                        .filter((k) => dvStatusFilter === "all" || k.status === dvStatusFilter)
                        .filter((k) => !dvSearch.trim() || k.title.toLowerCase().includes(dvSearch.toLowerCase()) || String(k.kpiNumber).includes(dvSearch))
                        .map((kpi) => {
                          const isAcsApproved = acsApproved.has(kpi._id);
                          return (
                            <tr key={kpi._id}
                              onClick={() => setDvSelectedKpi(kpi._id)}
                              className={cn("border-b last:border-0 hover:bg-muted/10 transition-colors cursor-pointer",
                                kpi.status === "rejected" && "bg-red-50/40",
                                kpi.status === "query_raised" && "bg-orange-50/40"
                              )}>
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center justify-center w-9 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold">{kpi.kpiNumber}</span>
                              </td>
                              <td className="px-4 py-3 max-w-xs">
                                <p className="text-sm font-medium leading-snug">{kpi.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{kpi.monthYear}</p>
                              </td>
                              <td className="px-4 py-3">
                                {isAcsApproved
                                  ? <span className="flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full font-semibold w-fit"><CheckCircle2 className="w-3 h-3" />ACS Approved</span>
                                  : <KpiStatusBadge status={kpi.status} />
                                }
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
                                    <div className={cn("h-full rounded-full", kpi.completionPercent === 100 ? "bg-green-500" : kpi.completionPercent >= 60 ? "bg-primary" : "bg-amber-400")}
                                      style={{ width: `${kpi.completionPercent}%` }} />
                                  </div>
                                  <span className="text-xs text-muted-foreground tabular-nums">{kpi.completionPercent}%</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className={cn("text-xs font-semibold tabular-nums", kpi.documentsUploaded < kpi.documentsRequired ? "text-amber-600" : "text-green-600")}>
                                  {kpi.documentsUploaded}/{kpi.documentsRequired}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-xs text-muted-foreground tabular-nums">{kpi.dueDate}</td>
                              <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => setDvSelectedKpi(kpi._id)}
                                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                  Review →
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                ) : (
                  /* ── KPI Summary + Approve view ── */
                  (() => {
                    const kpi = mockKpis.find((k) => k._id === dvSelectedKpi)!;
                    const kpiCode = `KPI_${String(kpi.kpiNumber).padStart(2, "0")}`;
                    const schema = getKpiSchema(kpiCode);
                    const submission = getSubmission(kpiCode);
                    const sortedSections = schema ? [...schema.sections].sort((a, b) => a.order - b.order) : [];
                    const displayValues = submission?.values ?? {};
                    const isAcsApproved = acsApproved.has(kpi._id);

                    return (
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <button onClick={() => setDvSelectedKpi(null)}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border rounded-lg px-3 py-1.5 hover:bg-muted transition-colors">
                            ← Back to KPI List
                          </button>
                          <div className="flex items-center gap-3">
                            <KpiStatusBadge status={kpi.status} />
                            {isAcsApproved
                              ? <span className="flex items-center gap-1.5 text-sm font-semibold text-green-700 bg-green-100 px-3 py-1.5 rounded-xl">
                                  <Check className="w-4 h-4 stroke-[3]" /> ACS Approved
                                </span>
                              : (
                                <Button className="gap-2 bg-green-600 hover:bg-green-700"
                                  onClick={() => { setAcsApproved((p) => new Set([...p, kpi._id])); toast.success(`KPI ${kpi.kpiNumber} approved by ACS!`); }}>
                                  <CheckCircle2 className="w-4 h-4" /> Approve KPI
                                </Button>
                              )
                            }
                          </div>
                        </div>

                        {/* KPI info */}
                        <div className="bg-white border rounded-2xl p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">KPI {kpi.kpiNumber}</span>
                                <span className="text-xs font-mono text-muted-foreground">{kpiCode}</span>
                              </div>
                              <h3 className="text-base font-bold">{kpi.title}</h3>
                              <p className="text-sm text-muted-foreground mt-0.5">{kpi.monthYear} · Due {kpi.dueDate}</p>
                            </div>
                            <div className="text-right text-xs text-muted-foreground">
                              <p>Progress: <span className="font-semibold text-foreground">{kpi.completionPercent}%</span></p>
                              <p>Docs: <span className={cn("font-semibold", kpi.documentsUploaded < kpi.documentsRequired ? "text-amber-600" : "text-green-600")}>{kpi.documentsUploaded}/{kpi.documentsRequired}</span></p>
                            </div>
                          </div>
                        </div>

                        {/* Section summaries */}
                        {schema ? (
                          sortedSections.map((section) => {
                            const fields = schema.fields
                              .filter((f) => f.section === section.id && isFieldVisible(f.dependsOn, displayValues))
                              .sort((a, b) => a.order - b.order);
                            return (
                              <div key={section.id} className="bg-white border rounded-2xl overflow-hidden">
                                <div className="px-5 py-3 bg-gradient-to-r from-primary/5 to-transparent border-b flex items-center gap-3">
                                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">{section.order}</div>
                                  <div>
                                    <h4 className="text-sm font-bold">{section.title}</h4>
                                    {section.description && <p className="text-xs text-muted-foreground">{section.description}</p>}
                                  </div>
                                  <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                                </div>
                                <div className="divide-y">
                                  {fields.map((field) => {
                                    const val = displayValues[field.fieldId];
                                    const isEmpty = val === null || val === undefined || val === "" || (Array.isArray(val) && val.length === 0);
                                    return (
                                      <div key={field.fieldId} className="grid grid-cols-[1fr_1.5fr] gap-4 px-5 py-3 hover:bg-muted/10">
                                        <p className="text-xs font-medium text-muted-foreground">{field.label}{field.required && <span className="text-destructive ml-0.5">*</span>}</p>
                                        <div className="flex items-center gap-2">
                                          {isEmpty
                                            ? <span className="text-xs text-muted-foreground/50 italic">Not filled</span>
                                            : <span className={cn("text-sm font-medium", field.type === "calculated" ? "text-primary" : "text-foreground")}>{renderVal(val, field.type, field.options)}</span>
                                          }
                                          {field.type === "calculated" && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">auto</span>}
                                          {field.type === "file" && !isEmpty && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" />uploaded</span>}
                                        </div>
                                      </div>
                                    );
                                  })}
                                  {fields.length === 0 && <div className="px-5 py-4 text-xs text-muted-foreground italic">No fields in this section.</div>}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="bg-white border rounded-2xl p-10 flex flex-col items-center gap-3 text-muted-foreground">
                            <FileText className="w-10 h-10 opacity-20" />
                            <p className="text-sm font-medium">No schema available for this KPI</p>
                          </div>
                        )}

                        {/* Approve button at bottom */}
                        {!isAcsApproved && (
                          <div className="flex justify-end pt-2">
                            <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700 px-8"
                              onClick={() => { setAcsApproved((p) => new Set([...p, kpi._id])); toast.success(`KPI ${kpi.kpiNumber} approved by ACS!`); setDvSelectedKpi(null); }}>
                              <CheckCircle2 className="w-5 h-5" /> Approve & Close
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })()
                )}
              </div>

              {/* Remarks + Query — only in list view */}
              {!dvSelectedKpi && (<>
              <div className="bg-white border rounded-2xl p-5 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold">ACS Remarks per KPI</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Add observations or instructions for each KPI submission</p>
                </div>
                <div className="space-y-3">
                  {mockKpis
                    .filter((k) => k.tab === dvTab)
                    .map((kpi) => (
                      <div key={kpi._id} className="flex items-start gap-3 p-3 border rounded-xl hover:bg-muted/10">
                        <span className="inline-flex items-center justify-center w-8 h-6 rounded bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                          {kpi.kpiNumber}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate mb-1.5">{kpi.title}</p>
                          {savedRemarks.has(kpi._id) ? (
                            <div className="flex items-start gap-2">
                              <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 flex-1 italic">
                                "{remarkMap[kpi._id]}"
                              </p>
                              <button
                                onClick={() => setSavedRemarks((p) => { const n = new Set(p); n.delete(kpi._id); return n; })}
                                className="text-xs text-primary hover:underline shrink-0"
                              >Edit</button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="Add remark..."
                                value={remarkMap[kpi._id] ?? ""}
                                onChange={(e) => setRemarkMap((p) => ({ ...p, [kpi._id]: e.target.value }))}
                                className="flex-1 border rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-primary/20"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7 px-3 shrink-0"
                                onClick={() => {
                                  if (remarkMap[kpi._id]?.trim()) {
                                    setSavedRemarks((p) => new Set([...p, kpi._id]));
                                    toast.success("Remark saved");
                                  }
                                }}
                              >Save</Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="bg-white border rounded-2xl p-5 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold">Raise Query to Coordinator</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Send a query or clarification request directly to the university coordinator</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <select className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Select KPI</option>
                    {mockKpis.filter((k) => k.tab === dvTab).map((k) => (
                      <option key={k._id} value={k._id}>KPI {k.kpiNumber} — {k.title.slice(0, 40)}…</option>
                    ))}
                  </select>
                  <select className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  placeholder="Describe your query or request additional data/documents..."
                  className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
                <Button
                  className="gap-2"
                  onClick={() => toast.success("Query raised and sent to university coordinator")}
                >
                  <MessageSquare className="w-4 h-4" /> Raise Query
                </Button>
              </div>
              </>)}
            </div>
          )}

          {/* ── Queries Section ─────────────────────────────────────── */}
          {active === "queries" && (() => {
            const thread = acsThreads.find((t) => t._id === selectedAcsThread)!;
            const statusCfg = {
              open:     { label: "Open",     className: "text-orange-600 bg-orange-50 border-orange-200" },
              resolved: { label: "Resolved", className: "text-green-600 bg-green-50 border-green-200" },
            };
            const priorityCfg = {
              high:   "bg-red-100 text-red-700",
              medium: "bg-amber-100 text-amber-700",
              low:    "bg-gray-100 text-gray-600",
            };
            const formatTime = (iso: string) => {
              const d = new Date(iso);
              return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) +
                " · " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
            };
            const handleSend = () => {
              if (!acsReplyText.trim()) return toast.error("Please enter a message");
              setAcsThreads((prev) => prev.map((t) => t._id === selectedAcsThread ? {
                ...t,
                messages: [...t.messages, {
                  _id: `am-${Date.now()}`,
                  sender: "ACS Office",
                  role: "acs" as const,
                  text: acsReplyText,
                  sentAt: new Date().toISOString(),
                }],
              } : t));
              setAcsReplyText("");
              toast.success("Message sent to VC");
            };

            return (
              <div className="flex overflow-hidden rounded-2xl border bg-white shadow-sm" style={{ height: "calc(100vh - 160px)" }}>

                {/* Left — thread list */}
                <div className="w-80 shrink-0 border-r flex flex-col overflow-hidden">
                  <div className="px-4 py-4 border-b">
                    <h3 className="text-sm font-bold">University Conversations</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {acsThreads.filter((t) => t.status === "open").length} open · {acsThreads.filter((t) => t.status === "resolved").length} resolved
                    </p>
                  </div>
                  <div className="flex-1 overflow-y-auto divide-y">
                    {acsThreads.map((t) => (
                      <button
                        key={t._id}
                        onClick={() => setSelectedAcsThread(t._id)}
                        className={cn(
                          "w-full text-left px-4 py-4 hover:bg-muted/30 transition-colors",
                          selectedAcsThread === t._id && "bg-primary/5 border-l-2 border-l-primary"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-xs font-bold text-foreground">{t.university}</p>
                          <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0", priorityCfg[t.priority])}>
                            {t.priority}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{t.vcName}</p>
                        <p className="text-xs font-medium line-clamp-1 text-foreground/80">{t.subject}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] text-muted-foreground">{t.messages.length} messages</span>
                          <span className={cn(
                            "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                            statusCfg[t.status].className
                          )}>
                            {statusCfg[t.status].label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* New query button */}
                  <div className="p-3 border-t">
                    <button
                      onClick={() => toast.info("New conversation dialog would open")}
                      className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-primary border border-dashed border-primary/40 rounded-lg py-2 hover:bg-primary/5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> New Conversation
                    </button>
                  </div>
                </div>

                {/* Right — chat */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Chat header */}
                  <div className="bg-white border-b px-6 py-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-sm">{thread.university}</p>
                        <span className="text-xs text-muted-foreground">·</span>
                        <p className="text-xs text-muted-foreground">{thread.vcName}</p>
                        <span className={cn(
                          "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                          statusCfg[thread.status].className
                        )}>
                          {statusCfg[thread.status].label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{thread.subject}</p>
                    </div>
                    {thread.status === "open" && (
                      <button
                        onClick={() => {
                          setAcsThreads((prev) => prev.map((t) => t._id === selectedAcsThread ? { ...t, status: "resolved" as const } : t));
                          toast.success("Query marked as resolved");
                        }}
                        className="text-xs font-semibold text-green-600 border border-green-300 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark Resolved
                      </button>
                    )}
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 bg-muted/10">
                    {thread.messages.map((msg) => {
                      const isAcs = msg.role === "acs";
                      return (
                        <div key={msg._id} className={cn("flex gap-3", isAcs && "flex-row-reverse")}>
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold",
                            isAcs ? "bg-primary/10 text-primary" : "bg-violet-100 text-violet-700"
                          )}>
                            {isAcs ? "ACS" : "VC"}
                          </div>
                          <div className={cn("max-w-[72%]", isAcs && "items-end flex flex-col")}>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-xs font-semibold">{msg.sender}</p>
                              <p className="text-xs text-muted-foreground">{formatTime(msg.sentAt)}</p>
                            </div>
                            <div className={cn(
                              "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                              isAcs
                                ? "bg-primary text-white rounded-tr-none"
                                : "bg-white border shadow-sm rounded-tl-none"
                            )}>
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reply box */}
                  {thread.status === "open" ? (
                    <div className="bg-white border-t p-4 space-y-3">
                      <textarea
                        rows={3}
                        value={acsReplyText}
                        onChange={(e) => setAcsReplyText(e.target.value)}
                        placeholder={`Reply to ${thread.vcName}...`}
                        className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      />
                      <div className="flex items-center justify-end">
                        <Button size="sm" className="gap-2" onClick={handleSend}>
                          <Send className="w-4 h-4" /> Send Message
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-50 border-t border-green-200 px-6 py-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <p className="text-sm text-green-700 font-medium">This conversation has been resolved.</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

      </div>
    </div>
  );
}
