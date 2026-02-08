import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number | null;
  trendLabel?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, trendLabel }: StatsCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-glow transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className="p-3 bg-accent/10 rounded-lg">
          <Icon className="w-6 h-6 text-accent" />
        </div>
      </div>

      {trend !== null && trend !== undefined && (
        <div className="mt-4 flex items-center gap-1.5">
          {trend >= 0 ? (
            <TrendingUp className="w-4 h-4 text-accent" />
          ) : (
            <TrendingDown className="w-4 h-4 text-destructive" />
          )}
          <span
            className={cn(
              "text-sm font-medium",
              trend >= 0 ? "text-accent" : "text-destructive"
            )}
          >
            {trend >= 0 ? "+" : ""}
            {trend.toFixed(1)}%
          </span>
          {trendLabel && (
            <span className="text-xs text-muted-foreground">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
