import { NavLink, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  BarChart3,
  LayoutDashboard,
  ClipboardList,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  ShieldCheck,
  Bell,
  Zap,
  Download,
  Star,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { mockQueryThreads } from "@/mock/mock-data";

const openQueryCount = mockQueryThreads.filter((q) => q.status !== "resolved").length;

const navItems = [
  { label: "Overview",            to: "/dashboard",  icon: LayoutDashboard, end: true  },
  { label: "My KPI Submissions",  to: "/kpis",       icon: ClipboardList,   end: true  },
  { label: "Documents",           to: "/documents",  icon: FileText,        end: false },
  { label: "Queries",             to: "/queries",    icon: MessageSquare,   end: false, badge: openQueryCount },
  { label: "Analytics",           to: "/analytics",  icon: BarChart3,       end: false },
];

const VC_SECTIONS = [
  { key: "executive",     label: "Executive Dashboard",  icon: BarChart3   },
  { key: "benchmarking",  label: "Peer Benchmarking",    icon: Star        },
  { key: "approval",      label: "Approval Workflow",    icon: ShieldCheck },
  { key: "alerts",        label: "Deficit Alerts",       icon: Bell        },
  { key: "vault",         label: "Document Vault",       icon: FileText    },
  { key: "communication", label: "Communication",        icon: Zap         },
  { key: "reports",       label: "Reports & Export",     icon: Download    },
];

const ACS_SECTIONS = [
  { key: "state",      label: "State-Level Dashboard", icon: BarChart3    },
  { key: "drilldown",  label: "University Drilldown",  icon: Building2    },
  { key: "dataviewer", label: "Data Viewer",           icon: ClipboardList },
];

const Sidebar = () => {
  const { user, logoutUser } = useAuthStore();
  const navigate   = useNavigate();
  const location   = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isDirector = user?.role?.type === "director";
  const isVC       = user?.role?.type === "vc";
  const isACS      = user?.role?.type === "acs";
  const isOnDashboard     = location.pathname === "/dashboard";
  const isOnNewSubmission = location.pathname.startsWith("/kpis/new") || location.pathname.startsWith("/kpis/submit");
  const activeSection     = searchParams.get("section") ?? (isVC ? "executive" : "state");

  return (
    <aside className="sticky top-0 self-start h-screen w-60 bg-white border-r flex flex-col z-40 shrink-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-primary leading-tight">KPI Monitoring</p>
            <p className="text-[10px] text-muted-foreground leading-tight">KPI Dashboard</p>
          </div>
        </div>
      </div>

      {/* University info */}
      <div className="px-5 py-3 border-b bg-muted/30">
        <p className="text-xs text-muted-foreground">University</p>
        <p className="text-sm font-medium truncate">{user?.universityName}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {/* ACS — only show Overview with sub-sections */}
        {isACS && (
          <div>
            <NavLink to="/dashboard" end
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span className="flex-1">Overview</span>
            </NavLink>
            <div className="ml-3 mt-0.5 pl-3 border-l border-border space-y-0.5">
              {ACS_SECTIONS.map(({ key, label, icon: Icon }) => (
                <button key={key} onClick={() => setSearchParams({ section: key })}
                  className={cn(
                    "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium transition-colors text-left",
                    activeSection === key ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}>
                  <Icon className="w-3.5 h-3.5 shrink-0" />{label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Non-ACS nav items */}
        {!isACS && isDirector && (
          <button
            onClick={() => navigate("/kpis/new")}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition-colors mb-2",
              isOnNewSubmission
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground border border-dashed border-primary/40 text-primary"
            )}
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">New Submission</span>
          </button>
        )}

        {!isACS && navItems.map(({ label, to, icon: Icon, badge, end }) => (
          <div key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive && !isOnNewSubmission
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="text-[10px] bg-destructive text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {badge}
                </span>
              )}
            </NavLink>

            {/* VC sub-sections under Overview */}
            {to === "/dashboard" && isVC && isOnDashboard && (
              <div className="ml-3 mt-0.5 pl-3 border-l border-border space-y-0.5">
                {VC_SECTIONS.map(({ key, label: sLabel, icon: SIcon }) => (
                  <button
                    key={key}
                    onClick={() => setSearchParams({ section: key })}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium transition-colors text-left",
                      activeSection === key
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <SIcon className="w-3.5 h-3.5 shrink-0" />
                    {sLabel}
                  </button>
                ))}
              </div>
            )}

          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t px-3 py-3 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )
          }
        >
          <Settings className="w-4 h-4" />
          Settings
        </NavLink>
        <button
          onClick={logoutUser}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
