import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: "blue" | "green" | "amber" | "orange" | "violet";
  trend?: "up" | "down";
  trendValue?: string;
}

const palette = {
  blue:   { card: "bg-blue-500",   icon: "bg-blue-400",   text: "text-white", sub: "text-blue-100",  trend: "text-blue-100" },
  green:  { card: "bg-green-500",  icon: "bg-green-400",  text: "text-white", sub: "text-green-100", trend: "text-green-100" },
  amber:  { card: "bg-amber-500",  icon: "bg-amber-400",  text: "text-white", sub: "text-amber-100", trend: "text-amber-100" },
  orange: { card: "bg-orange-500", icon: "bg-orange-400", text: "text-white", sub: "text-orange-100",trend: "text-orange-100" },
  violet: { card: "bg-violet-500", icon: "bg-violet-400", text: "text-white", sub: "text-violet-100",trend: "text-violet-100" },
};

const StatCard = ({ title, value, subtitle, icon: Icon, color, trend, trendValue }: Props) => {
  const p = palette[color];
  return (
    <div className={`${p.card} rounded-2xl p-5 flex flex-col gap-3 shadow-sm`}>
      <div className="flex items-center justify-between">
        <p className={`text-sm font-medium ${p.sub}`}>{title}</p>
        <div className={`w-9 h-9 rounded-xl ${p.icon} flex items-center justify-center`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <div>
        <p className={`text-3xl font-bold tabular-nums ${p.text}`}>{value}</p>
        {subtitle && <p className={`text-xs mt-0.5 ${p.sub}`}>{subtitle}</p>}
      </div>
      {trend && trendValue && (
        <div className={`flex items-center gap-1 text-xs font-semibold ${p.trend}`}>
          {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trendValue}
        </div>
      )}
    </div>
  );
};

export default StatCard;
