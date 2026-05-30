import { Bell, User, ChevronRight, Plus } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { mockAlerts } from "@/mock/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  breadcrumbs?: string[];
}

const TopBar = ({ title, breadcrumbs = [] }: Props) => {
  const { user, logoutUser } = useAuthStore();
  const navigate = useNavigate();
  const unread = mockAlerts.filter((a) => a.severity === "high" || a.severity === "critical").length;
  const isDirector = user?.role?.type === "director";

  return (
    <header className="h-14 border-b bg-white flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Breadcrumb */}
      <div className="flex-1">
        <h1 className="text-base font-semibold text-foreground">{title}</h1>
        {breadcrumbs.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Home</span>
            {breadcrumbs.map((b) => (
              <span key={b} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                {b}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* New Submission — director only */}
      {isDirector && (
        <Button size="sm" className="gap-1.5" onClick={() => navigate("/kpis/new")}>
          <Plus className="w-4 h-4" />
          New Submission
        </Button>
      )}

      {/* Notification bell */}
      <div className="relative">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
        </Button>
      </div>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>
            <p className="font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground font-normal">{user?.role?.name}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" onClick={logoutUser}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default TopBar;
