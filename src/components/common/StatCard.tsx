import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: "up" | "down";
  trendValue?: string;
}

const StatCard = ({ title, value, subtitle, icon: Icon, iconColor = "text-primary", trend, trendValue }: Props) => {
  return (
    <div className="bg-white rounded-xl border p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <div className={cn("w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center", iconColor)}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold tabular-nums text-foreground">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {trend && trendValue && (
        <div className={cn("flex items-center gap-1 text-xs font-medium", trend === "up" ? "text-green-600" : "text-destructive")}>
          {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trendValue}
        </div>
      )}
    </div>
  );
};

export default StatCard;
