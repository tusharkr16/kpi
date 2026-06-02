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
  Download,
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
];

const VC_SECTIONS = [
  { key: "executive",  label: "Executive Dashboard", icon: BarChart3    },
  { key: "dataviewer", label: "Data Viewer",         icon: ClipboardList },
  { key: "vault",      label: "Document Vault",      icon: FileText     },
  { key: "reports",    label: "Reports & Export",    icon: Download     },
];

const ACS_SECTIONS = [
  { key: "state",      label: "State-Level Dashboard", icon: BarChart3    },
  { key: "drilldown",  label: "University Drilldown",  icon: Building2    },
  { key: "dataviewer", label: "Data Viewer",           icon: ClipboardList },
  { key: "queries",    label: "Queries",               icon: MessageSquare },
];

const Sidebar = () => {
  const { user, logoutUser } = useAuthStore();
  const navigate   = useNavigate();
  const location   = useLocation();
  const [searchParams] = useSearchParams();
  const isVC       = user?.role?.type === "vc";
  const isACS      = user?.role?.type === "acs";
  const isOnDashboard     = location.pathname === "/dashboard";
  const isOnNewSubmission = location.pathname.startsWith("/kpis/new") || location.pathname.startsWith("/kpis/submit");
  const activeSection     = searchParams.get("section") ?? (isVC ? "executive" : "state");

  return (
    <aside className="h-full w-60 bg-white border-r flex flex-col z-40 shrink-0 overflow-hidden">

      {/* University info — hidden for ACS (state-level role, not university-specific) */}
      {!isACS && (
        <div className="px-5 py-3 border-b bg-muted/30">
          <p className="text-xs text-muted-foreground">University</p>
          <p className="text-sm font-medium truncate">{user?.universityName}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {/* ACS — flat independent nav items */}
        {isACS && ACS_SECTIONS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => navigate(`/dashboard?section=${key}`)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              activeSection === key && isOnDashboard
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">{label}</span>
            {key === "queries" && (
              <span className="text-[10px] bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">
                2
              </span>
            )}
          </button>
        ))}

        {/* New Submission — coordinator & director */}
        {!isACS && !isVC && (
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

        {/* VC — flat independent nav items */}
        {isVC && VC_SECTIONS.map(({ key, label: sLabel, icon: SIcon }) => (
          <button
            key={key}
            onClick={() => navigate(`/dashboard?section=${key}`)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              activeSection === key && isOnDashboard
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <SIcon className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">{sLabel}</span>
          </button>
        ))}

        {/* Coordinator / Director nav items */}
        {!isACS && !isVC && navItems.map(({ label, to, icon: Icon, badge, end }) => (
          <NavLink
            key={to}
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
