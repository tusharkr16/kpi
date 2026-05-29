import { NavLink } from "react-router-dom";
import {
  BarChart3,
  LayoutDashboard,
  ClipboardList,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  CalendarClock,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { mockQueryThreads } from "@/mock/mock-data";

const openQueryCount = mockQueryThreads.filter((q) => q.status !== "resolved").length;

const navItems = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "My KPI Submissions", to: "/kpis", icon: ClipboardList },
  { label: "New Submission", to: "/kpis/new", icon: Plus },
  { label: "Documents", to: "/documents", icon: FileText },
  { label: "Queries", to: "/queries", icon: MessageSquare, badge: openQueryCount },
  { label: "Deadlines", to: "/deadlines", icon: CalendarClock },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
];

const Sidebar = () => {
  const { user, logoutUser } = useAuthStore();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-primary leading-tight">KPI Monitoring</p>
            <p className="text-[10px] text-muted-foreground leading-tight">PM-USHA Dashboard</p>
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
        {navItems.map(({ label, to, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
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
