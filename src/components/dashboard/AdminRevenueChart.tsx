import { useLanguage } from "@/i18n/LanguageContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DEMO_CHART_DATA = [
  { month: "Sep", revenue: 2400 },
  { month: "Oct", revenue: 3800 },
  { month: "Nov", revenue: 5200 },
  { month: "Dec", revenue: 4100 },
  { month: "Jan", revenue: 6800 },
  { month: "Feb", revenue: 7200 },
];

interface AdminRevenueChartProps {
  data?: { month: string; revenue: number }[];
}

export function AdminRevenueChart({ data }: AdminRevenueChartProps) {
  const { lang, t } = useLanguage();
  const chartData = data || DEMO_CHART_DATA;

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-6">{t.admin.monthlyRevenue[lang]}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 88%)" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220 10% 46%)" }} />
          <YAxis tick={{ fontSize: 12, fill: "hsl(220 10% 46%)" }} tickFormatter={(v) => `€${v}`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0 0% 100%)",
              border: "1px solid hsl(220 15% 88%)",
              borderRadius: "0.75rem",
            }}
            formatter={(value: number) => [`€${value}`, t.admin.revenue[lang]]}
          />
          <Bar dataKey="revenue" fill="hsl(150 80% 40%)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
