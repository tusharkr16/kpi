import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TopBar from "@/layout/TopBar";
import { mockKpis, mockMonthlyTrend } from "@/mock/mock-data";
import { cn } from "@/lib/utils";
import KpiStatusBadge from "@/components/kpi/KpiStatusBadge";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Legend,
} from "recharts";
import {
  TrendingUp, AlertTriangle, CheckCircle2,
  FileText, Users, BarChart3, Bell, ShieldCheck, Download,
  ChevronRight, Star, Building2, Zap, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/* ── Mock peer universities ─────────────────────────────────────────────── */
const PEERS = [
  { name: "SRTMUN Nanded",       score: 62, rank: 3,  kpis: { teaching: 77, research: 40, graduation: 12, outreach: 55, perception: 18, governance: 90 }, highlight: true },
  { name: "Pune University",     score: 81, rank: 1,  kpis: { teaching: 88, research: 76, graduation: 65, outreach: 70, perception: 72, governance: 85 }, highlight: false },
  { name: "Mumbai University",   score: 78, rank: 2,  kpis: { teaching: 82, research: 70, graduation: 60, outreach: 68, perception: 65, governance: 80 }, highlight: false },
  { name: "Nagpur University",   score: 55, rank: 4,  kpis: { teaching: 60, research: 48, graduation: 30, outreach: 50, perception: 55, governance: 70 }, highlight: false },
  { name: "Aurangabad Univ.",    score: 49, rank: 5,  kpis: { teaching: 52, research: 38, graduation: 28, outreach: 42, perception: 44, governance: 58 }, highlight: false },
];

const RADAR_DATA = [
  { subject: "Teaching",    SRTMUN: 77, Top: 88 },
  { subject: "Research",    SRTMUN: 40, Top: 76 },
  { subject: "Graduation",  SRTMUN: 12, Top: 65 },
  { subject: "Outreach",    SRTMUN: 55, Top: 70 },
  { subject: "Perception",  SRTMUN: 18, Top: 72 },
  { subject: "Governance",  SRTMUN: 90, Top: 85 },
];

const YOY_DATA = [
  { year: "2022", score: 44 },
  { year: "2023", score: 51 },
  { year: "2024", score: 58 },
  { year: "2025", score: 62 },
];

const DEFICIT_ALERTS = [
  { kpi: "Graduation Outcome", value: "12%", threshold: "50%", severity: "critical", recommendation: "Launch apprenticeship partnership drive — target 3 new MoUs with industry this quarter." },
  { kpi: "Research Output",    value: "40%", threshold: "60%", severity: "high",     recommendation: "Increase PhD enrolment and mandate one paper per faculty annually." },
  { kpi: "Perception",         value: "18%", threshold: "40%", severity: "high",     recommendation: "Initiate NAAC re-accreditation preparation and media outreach campaign." },
  { kpi: "Faculty Vacancy",    value: "32%", threshold: "10%", severity: "critical", recommendation: "Increase faculty recruitment drive in Departments of Sciences and Humanities." },
];

const SUBMISSIONS_PENDING = mockKpis.filter((k) => k.status === "submitted").slice(0, 5);
const FLAGGED = mockKpis.filter((k) => ["rejected", "query_raised"].includes(k.status)).slice(0, 4);

const DOCS = [
  { name: "Appointment Letter – KPI 2",        kpi: "KPI 2", status: "pending",  date: "2025-06-10" },
  { name: "Advertisement Copy – KPI 3",        kpi: "KPI 3", status: "approved", date: "2025-06-08" },
  { name: "Industry MOU – KPI 7",              kpi: "KPI 7", status: "pending",  date: "2025-06-12" },
  { name: "AC Approval Minutes – KPI 5",       kpi: "KPI 5", status: "pending",  date: "2025-06-11" },
  { name: "Implementation Report – KPI 6",     kpi: "KPI 6", status: "approved", date: "2025-06-07" },
];

const DIRECTIVES = [
  { id: "d1", title: "Showcase Notice: Graduation Outcome below threshold", kpi: "KPI 7", severity: "critical", draft: "The university's Graduation Outcome KPI remains critically below the 50% threshold for two consecutive quarters. Immediate corrective action is required." },
  { id: "d2", title: "Performance Reminder: Research Output lagging",       kpi: "Multiple", severity: "high", draft: "Research & Professional Practice category shows sustained underperformance. Department heads are directed to submit improvement plans within 14 days." },
];

type Section = "executive" | "benchmarking" | "approval" | "alerts" | "vault" | "communication" | "reports";


const healthColor = (v: number) =>
  v >= 70 ? "text-green-600" : v >= 45 ? "text-amber-600" : "text-red-600";
const healthBg = (v: number) =>
  v >= 70 ? "bg-green-50 border-green-200" : v >= 45 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";

export default function VCDashboard() {
  const [searchParams] = useSearchParams();
  const active = (searchParams.get("section") as Section) ?? "executive";

  const [selectedPeer, setSelectedPeer] = useState<string>("Pune University");
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());
  const [approvedDocs, setApprovedDocs] = useState<Set<string>>(new Set());
  const [sentDirectives, setSentDirectives] = useState<Set<string>>(new Set());

  const overallScore = 62;
  const totalKpis = mockKpis.length;
  const approved  = mockKpis.filter((k) => k.status === "approved").length;
  const submitted = mockKpis.filter((k) => k.status === "submitted").length;
  const action    = mockKpis.filter((k) => ["rejected", "query_raised"].includes(k.status)).length;

  const comparePeer = PEERS.find((p) => p.name === selectedPeer) ?? PEERS[1];
  const selfPeer    = PEERS[0];

  return (
    <div className="flex flex-col flex-1">
      <TopBar title="VC Executive Dashboard" breadcrumbs={["VC Dashboard"]} />

      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-muted/20">

          {/* ── 2.1 Executive Dashboard ────────────────────────────── */}
          {active === "executive" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold">Executive Dashboard</h2>
                <p className="text-xs text-muted-foreground">Overall university KPI performance for the current reporting cycle</p>
              </div>

              {/* Score + stats row */}
              <div className="grid grid-cols-5 gap-4">
                {/* Big score card */}
                <div className={cn("col-span-1 bg-white border-2 rounded-2xl p-5 flex flex-col items-center justify-center gap-2", healthBg(overallScore))}>
                  <p className="text-xs font-medium text-muted-foreground">Overall Score</p>
                  <p className={cn("text-5xl font-extrabold tabular-nums", healthColor(overallScore))}>{overallScore}</p>
                  <p className="text-xs text-muted-foreground">/100</p>
                  <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                    <TrendingUp className="w-3 h-3" /> +4 vs last cycle
                  </div>
                </div>
                {/* Stat chips */}
                {[
                  { label: "Total KPIs",    value: totalKpis, color: "text-primary",    bg: "bg-primary/5" },
                  { label: "Approved",      value: approved,  color: "text-green-700",  bg: "bg-green-50"  },
                  { label: "Submitted",     value: submitted, color: "text-blue-700",   bg: "bg-blue-50"   },
                  { label: "Action Needed", value: action,    color: "text-red-700",    bg: "bg-red-50"    },
                ].map(({ label, value, color, bg }) => (
                  <div key={label} className={cn("bg-white border rounded-2xl p-4 flex flex-col justify-between", bg)}>
                    <p className="text-xs text-muted-foreground font-medium">{label}</p>
                    <p className={cn("text-3xl font-extrabold tabular-nums mt-2", color)}>{value}</p>
                    <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", color.replace("text-", "bg-"))} style={{ width: `${Math.round((value / totalKpis) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Radar + YoY row */}
              <div className="grid grid-cols-2 gap-5">
                {/* Radar chart */}
                <div className="bg-white border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold">Categorywise Radar</h3>
                      <p className="text-xs text-muted-foreground">SRTMUN vs Top Performer</p>
                    </div>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" />SRTMUN</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Top Peer</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={240}>
                    <RadarChart data={RADAR_DATA}>
                      <PolarGrid stroke="#f1f5f9" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748b" }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                      <Radar name="SRTMUN" dataKey="SRTMUN" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                      <Radar name="Top Peer" dataKey="Top" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Year-over-year */}
                <div className="bg-white border rounded-2xl p-5">
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold">Year-over-Year Performance</h3>
                    <p className="text-xs text-muted-foreground">Overall composite score trend</p>
                  </div>
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={YOY_DATA} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="year" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`${v}/100`, "Score"]} />
                      <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5, fill: "#3b82f6" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* KPI-wise summary table */}
              <div className="bg-white border rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b flex items-center justify-between">
                  <h3 className="text-sm font-semibold">KPI-wise Summary</h3>
                  <span className="text-xs text-muted-foreground">Current value vs. target · colour-coded status</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/20">
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground w-16">No.</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">KPI Title</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Status</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Progress</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockKpis.slice(0, 10).map((kpi) => (
                        <tr key={kpi._id} className="border-b last:border-0 hover:bg-muted/10">
                          <td className="px-4 py-2.5">
                            <span className="inline-flex items-center justify-center w-8 h-6 rounded bg-primary/10 text-primary text-xs font-bold">{kpi.kpiNumber}</span>
                          </td>
                          <td className="px-4 py-2.5 text-sm font-medium max-w-xs truncate">{kpi.title}</td>
                          <td className="px-4 py-2.5"><KpiStatusBadge status={kpi.status} /></td>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
                                <div className={cn("h-full rounded-full", kpi.completionPercent >= 70 ? "bg-green-500" : kpi.completionPercent >= 40 ? "bg-amber-400" : "bg-red-400")} style={{ width: `${kpi.completionPercent}%` }} />
                              </div>
                              <span className="text-xs tabular-nums text-muted-foreground">{kpi.completionPercent}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-2.5 text-xs text-muted-foreground">#{Math.floor(Math.random() * 5) + 1} / 5</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── 2.2 Peer Benchmarking ──────────────────────────────── */}
          {active === "benchmarking" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold">Peer Benchmarking</h2>
                <p className="text-xs text-muted-foreground">Top 5 performing universities · SRTMUN rank among all SPUs</p>
              </div>

              {/* Top 5 leaderboard */}
              <div className="bg-white border rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b"><h3 className="text-sm font-semibold">Top 5 Universities — Overall Score</h3></div>
                <div className="p-4 space-y-3">
                  {PEERS.map((peer) => (
                    <div key={peer.name} className={cn(
                      "flex items-center gap-4 p-3 rounded-xl border transition-all",
                      peer.highlight ? "bg-primary/5 border-primary/30" : "bg-muted/20 border-transparent"
                    )}>
                      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0",
                        peer.rank === 1 ? "bg-amber-100 text-amber-700" : peer.rank === 2 ? "bg-slate-100 text-slate-600" : peer.rank === 3 ? "bg-orange-100 text-orange-700" : "bg-muted text-muted-foreground"
                      )}>
                        {peer.rank === 1 ? <Star className="w-4 h-4" /> : peer.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={cn("text-sm font-semibold", peer.highlight && "text-primary")}>{peer.name}</p>
                          {peer.highlight && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">Your University</span>}
                        </div>
                        <div className="mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400" style={{ width: `${peer.score}%` }} />
                        </div>
                      </div>
                      <span className={cn("text-lg font-extrabold tabular-nums shrink-0", peer.highlight ? "text-primary" : "text-foreground")}>{peer.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peer comparison */}
              <div className="bg-white border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold">Side-by-Side Comparison</h3>
                    <p className="text-xs text-muted-foreground">Compare SRTMUN with an aspirational peer</p>
                  </div>
                  <select
                    value={selectedPeer}
                    onChange={(e) => setSelectedPeer(e.target.value)}
                    className="border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {PEERS.filter((p) => !p.highlight).map((p) => (
                      <option key={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={Object.entries(selfPeer.kpis).map(([key, val]) => ({
                      name: key.charAt(0).toUpperCase() + key.slice(1),
                      SRTMUN: val,
                      Peer: comparePeer.kpis[key as keyof typeof comparePeer.kpis] ?? 0,
                    }))}
                    barSize={16}
                    margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="SRTMUN" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Peer"   fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* KPI-wise rank table */}
              <div className="bg-white border rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b"><h3 className="text-sm font-semibold">SRTMUN Rank per KPI among all SPUs</h3></div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/20">
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">KPI</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Score</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">Rank (of 5)</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">vs Top</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(selfPeer.kpis).map(([key, val]) => {
                        const topVal = Math.max(...PEERS.map((p) => p.kpis[key as keyof typeof p.kpis] ?? 0));
                        const rank = PEERS.filter((p) => (p.kpis[key as keyof typeof p.kpis] ?? 0) > val).length + 1;
                        return (
                          <tr key={key} className="border-b last:border-0 hover:bg-muted/10">
                            <td className="px-4 py-2.5 font-medium capitalize">{key}</td>
                            <td className="px-4 py-2.5">
                              <span className={cn("font-bold tabular-nums", val >= 70 ? "text-green-600" : val >= 40 ? "text-amber-600" : "text-red-600")}>{val}%</span>
                            </td>
                            <td className="px-4 py-2.5">
                              <span className={cn("inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold", rank === 1 ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground")}>#{rank}</span>
                            </td>
                            <td className="px-4 py-2.5 text-xs text-muted-foreground">{topVal - val > 0 ? <span className="text-red-500">−{topVal - val}pts</span> : <span className="text-green-600">Top!</span>}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── 2.3 Approval Workflow ──────────────────────────────── */}
          {active === "approval" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold">Approval Workflow</h2>
                <p className="text-xs text-muted-foreground">Review flagged submissions and approve the university data pack</p>
              </div>

              {/* Flagged submissions */}
              <div className="bg-white border rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Flagged Submissions — Require VC Action</h3>
                  <span className="text-xs text-muted-foreground">{FLAGGED.length} items</span>
                </div>
                <div className="divide-y">
                  {FLAGGED.map((kpi) => (
                    <div key={kpi._id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/10">
                      <div className={cn("w-2 h-2 rounded-full shrink-0", kpi.status === "rejected" ? "bg-red-500" : "bg-orange-400")} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{kpi.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">KPI {kpi.kpiNumber} · {kpi.status === "rejected" ? "Rejected — needs resubmission" : "Query raised by SPD"}</p>
                      </div>
                      <KpiStatusBadge status={kpi.status} />
                      <Button size="sm" variant="outline" className="gap-1.5 shrink-0" onClick={() => toast.info("Opening KPI detail...")}>
                        Review <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending submissions for VC approval */}
              <div className="bg-white border rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Submitted KPIs — Pending VC Approval</h3>
                  <span className="text-xs text-muted-foreground">{SUBMISSIONS_PENDING.length} items</span>
                </div>
                <div className="divide-y">
                  {SUBMISSIONS_PENDING.map((kpi) => {
                    const done = approvedIds.has(kpi._id);
                    return (
                      <div key={kpi._id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/10">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{kpi.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">KPI {kpi.kpiNumber} · {kpi.completionPercent}% complete · Due {kpi.dueDate}</p>
                        </div>
                        {done
                          ? <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold"><CheckCircle2 className="w-4 h-4" />Approved</span>
                          : (
                            <div className="flex gap-2 shrink-0">
                              <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 gap-1.5" onClick={() => toast.error("Returned for revision")}>Return</Button>
                              <Button size="sm" className="gap-1.5 bg-green-600 hover:bg-green-700" onClick={() => { setApprovedIds((p) => new Set([...p, kpi._id])); toast.success("KPI approved!"); }}>
                                <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                              </Button>
                            </div>
                          )
                        }
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Final data pack */}
              <div className="bg-white border-2 border-primary/20 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Final Submission Approval</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Approve the university's complete data pack for June 2025 reporting period to lock it for submission.</p>
                </div>
                <Button className="gap-2 bg-primary" onClick={() => toast.success("Data pack approved and locked for submission!")}>
                  <ShieldCheck className="w-4 h-4" /> Approve Data Pack
                </Button>
              </div>
            </div>
          )}

          {/* ── 2.4 Predictive Deficit Alerts ─────────────────────── */}
          {active === "alerts" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold">Predictive Deficit Alerts</h2>
                <p className="text-xs text-muted-foreground">AI-driven forecasts · escalation alerts for critical KPIs</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {DEFICIT_ALERTS.map((alert, i) => (
                  <div key={i} className={cn(
                    "bg-white border-2 rounded-2xl p-5 space-y-3",
                    alert.severity === "critical" ? "border-red-200" : "border-amber-200"
                  )}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0", alert.severity === "critical" ? "bg-red-100" : "bg-amber-100")}>
                          <AlertTriangle className={cn("w-4 h-4", alert.severity === "critical" ? "text-red-600" : "text-amber-600")} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{alert.kpi}</p>
                          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", alert.severity === "critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700")}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn("text-2xl font-extrabold tabular-nums", alert.severity === "critical" ? "text-red-600" : "text-amber-600")}>{alert.value}</p>
                        <p className="text-xs text-muted-foreground">Target: {alert.threshold}</p>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", alert.severity === "critical" ? "bg-red-400" : "bg-amber-400")}
                        style={{ width: alert.value }} />
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3">
                      <p className="text-[11px] font-semibold text-foreground mb-1 flex items-center gap-1"><Zap className="w-3 h-3 text-primary" />Recommended Action</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{alert.recommendation}</p>
                    </div>
                    {alert.severity === "critical" && (
                      <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium bg-red-50 rounded-lg px-3 py-2">
                        <Bell className="w-3.5 h-3.5" />
                        Escalation alert sent to VC & District Officer
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Forecast chart */}
              <div className="bg-white border rounded-2xl p-5">
                <div className="mb-3">
                  <h3 className="text-sm font-semibold">2030 / 2035 Target Forecast</h3>
                  <p className="text-xs text-muted-foreground">Projected score trajectory based on current growth rate</p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={[...YOY_DATA, { year: "2026*", score: 67 }, { year: "2030*", score: 78 }, { year: "2035*", score: 88 }]}
                    margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v) => [`${v}/100`, "Score"]} />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} strokeDasharray="0" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ── 2.5 Document Vault ─────────────────────────────────── */}
          {active === "vault" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold">Document Vault</h2>
                <p className="text-xs text-muted-foreground">View all uploaded documents · approve or request changes for critical docs</p>
              </div>
              <div className="bg-white border rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b"><h3 className="text-sm font-semibold">Uploaded Documents</h3></div>
                <div className="divide-y">
                  {DOCS.map((doc, i) => {
                    const approved = approvedDocs.has(doc.name);
                    return (
                      <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/10">
                        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", approved ? "bg-green-50" : "bg-primary/10")}>
                          {approved ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <FileText className="w-4 h-4 text-primary" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.kpi} · Uploaded {doc.date}</p>
                        </div>
                        <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>
                          {approved ? "Approved" : "Pending Review"}
                        </span>
                        <div className="flex gap-2 shrink-0">
                          <Button size="sm" variant="outline" className="gap-1.5" onClick={() => toast.info("Opening document preview...")}>
                            <Eye className="w-3.5 h-3.5" /> View
                          </Button>
                          {!approved && (
                            <Button size="sm" className="gap-1.5 bg-green-600 hover:bg-green-700" onClick={() => { setApprovedDocs((p) => new Set([...p, doc.name])); toast.success("Document approved!"); }}>
                              Approve
                            </Button>
                          )}
                          {!approved && (
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200" onClick={() => toast.error("Change request sent to coordinator")}>
                              Request Change
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── 2.6 Communication & Compliance ────────────────────── */}
          {active === "communication" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold">Communication & Compliance</h2>
                <p className="text-xs text-muted-foreground">Automated directives · send queries to department coordinators</p>
              </div>

              {/* Automated directives */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Automated Directives</h3>
                {DIRECTIVES.map((d) => {
                  const sent = sentDirectives.has(d.id);
                  return (
                    <div key={d.id} className={cn("bg-white border-2 rounded-2xl p-5 space-y-3", d.severity === "critical" ? "border-red-200" : "border-amber-200")}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", d.severity === "critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700")}>
                              {d.severity.toUpperCase()}
                            </span>
                            <span className="text-xs text-muted-foreground">KPI: {d.kpi}</span>
                          </div>
                          <p className="text-sm font-semibold">{d.title}</p>
                        </div>
                        {sent
                          ? <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold shrink-0"><CheckCircle2 className="w-4 h-4" />Sent to ACS</span>
                          : (
                            <Button size="sm" className="gap-1.5 shrink-0" onClick={() => { setSentDirectives((p) => new Set([...p, d.id])); toast.success("Directive approved and sent to ACS"); }}>
                              Approve & Send
                            </Button>
                          )
                        }
                      </div>
                      <div className="bg-muted/40 rounded-xl p-3 text-xs text-muted-foreground leading-relaxed">
                        <p className="font-semibold text-foreground mb-1 text-[11px]">System-drafted notice:</p>
                        {d.draft}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Send query to coordinator */}
              <div className="bg-white border rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-semibold">Send Query to Department Coordinator</h3>
                <p className="text-xs text-muted-foreground">Internal communication within the university portal</p>
                <div className="grid grid-cols-2 gap-3">
                  <select className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Select Department Coordinator</option>
                    <option>Dr. Anita Sharma – Science Dept.</option>
                    <option>Prof. Ramesh Kulkarni – Arts Dept.</option>
                    <option>Dr. Meena Patil – Commerce Dept.</option>
                  </select>
                  <select className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Select KPI</option>
                    {mockKpis.slice(0, 6).map((k) => <option key={k._id}>KPI {k.kpiNumber} – {k.title.slice(0, 35)}…</option>)}
                  </select>
                </div>
                <textarea rows={3} placeholder="Type your query or instruction to the coordinator..." className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                <Button className="gap-2" onClick={() => toast.success("Query sent to coordinator")}>Send Query</Button>
              </div>
            </div>
          )}

          {/* ── 2.7 Reports & Export ───────────────────────────────── */}
          {active === "reports" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-bold">Reports & Export</h2>
                <p className="text-xs text-muted-foreground">Generate performance reports for BoM, Government, NAAC · export KPI data</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "University Performance Report",      subtitle: "Full KPI summary for submission to BoM / Government / NAAC", icon: Building2,  formats: ["PDF", "Excel"], color: "bg-blue-50 border-blue-200" },
                  { title: "KPI Data Export",                    subtitle: "Raw KPI data export for internal analysis",                  icon: BarChart3,  formats: ["Excel", "CSV"],  color: "bg-violet-50 border-violet-200" },
                  { title: "Peer Benchmarking Report",           subtitle: "Comparison with top 5 SPUs across all KPIs",                icon: Users,      formats: ["PDF"],           color: "bg-emerald-50 border-emerald-200" },
                  { title: "Deficit & Alert Summary",            subtitle: "AI-flagged critical KPIs and recommended actions",          icon: AlertTriangle, formats: ["PDF"],        color: "bg-amber-50 border-amber-200" },
                ].map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <div key={i} className={cn("bg-white border-2 rounded-2xl p-5 flex flex-col gap-3", r.color)}>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{r.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{r.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-auto">
                        {r.formats.map((fmt) => (
                          <Button key={fmt} size="sm" variant="outline" className="gap-1.5 text-xs"
                            onClick={() => toast.success(`Generating ${fmt} report...`)}>
                            <Download className="w-3.5 h-3.5" /> {fmt}
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Monthly trend bar chart */}
              <div className="bg-white border rounded-2xl p-5">
                <h3 className="text-sm font-semibold mb-4">Monthly Submission Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={mockMonthlyTrend} barSize={14} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Bar dataKey="submitted" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Submitted" />
                    <Bar dataKey="approved"  fill="#22c55e" radius={[4, 4, 0, 0]} name="Approved"  />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

      </div>
    </div>
  );
}
