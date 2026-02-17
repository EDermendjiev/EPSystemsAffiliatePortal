import { useLanguage } from "@/i18n/LanguageContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Demo data for when Supabase is not connected
const DEMO_DATA = [
  { date: "Jan 01", revenue: 120 },
  { date: "Jan 05", revenue: 280 },
  { date: "Jan 10", revenue: 150 },
  { date: "Jan 15", revenue: 420 },
  { date: "Jan 20", revenue: 380 },
  { date: "Jan 25", revenue: 520 },
  { date: "Feb 01", revenue: 610 },
  { date: "Feb 05", revenue: 450 },
  { date: "Feb 10", revenue: 720 },
  { date: "Feb 15", revenue: 680 },
  { date: "Feb 20", revenue: 850 },
  { date: "Feb 25", revenue: 940 },
];

interface RevenueChartProps {
  data?: { date: string; revenue: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const { lang, t } = useLanguage();
  const chartData = data || DEMO_DATA;

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-6">{t.dashboard.revenueChart[lang]}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(150 80% 40%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(150 80% 40%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 88%)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "hsl(220 10% 46%)" }}
            axisLine={{ stroke: "hsl(220 15% 88%)" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "hsl(220 10% 46%)" }}
            axisLine={{ stroke: "hsl(220 15% 88%)" }}
            tickFormatter={(value) => `\u20AC${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0 0% 100%)",
              border: "1px solid hsl(220 15% 88%)",
              borderRadius: "0.75rem",
              fontSize: "14px",
            }}
            formatter={(value: number) => [`\u20AC${value}`, t.dashboard.revenue[lang]]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(150 80% 40%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
