import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Users, DollarSign, FileText, TrendingUp, Trophy } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
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

const DEMO_TOP_PERFORMERS = [
  { name: "Georgi R.", conversions: 28, revenue: 3400 },
  { name: "Ivan D.", conversions: 15, revenue: 1200 },
  { name: "Maria M.", conversions: 12, revenue: 950 },
  { name: "Alex K.", conversions: 8, revenue: 640 },
  { name: "Nina P.", conversions: 6, revenue: 480 },
];

export default function AdminDashboard() {
  const { lang, t } = useLanguage();

  const statsCards = [
    { title: t.admin.totalAffiliates[lang], value: "47", icon: Users, trend: 5.2 },
    { title: t.admin.totalRevenue[lang], value: "$28,450", icon: DollarSign, trend: 18.7 },
    { title: t.admin.pendingApps[lang], value: "8", icon: FileText, trend: null },
    { title: t.admin.conversionRate[lang], value: "4.2%", icon: TrendingUp, trend: 1.3 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t.admin.dashboardTitle[lang]}</h1>
        <p className="text-muted-foreground mt-2">{t.admin.dashboardSubtitle[lang]}</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Revenue Chart */}
        <div className="lg:col-span-4 bg-card rounded-xl border border-border p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-6">{t.admin.monthlyRevenue[lang]}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={DEMO_CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220 10% 46%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220 10% 46%)" }} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 100%)",
                  border: "1px solid hsl(220 15% 88%)",
                  borderRadius: "0.75rem",
                }}
                formatter={(value: number) => [`$${value}`, t.admin.revenue[lang]]}
              />
              <Bar dataKey="revenue" fill="hsl(150 80% 40%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers */}
        <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">{t.admin.topPerformers[lang]}</h3>
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {DEMO_TOP_PERFORMERS.map((performer, index) => (
              <div key={performer.name} className="flex items-center gap-4">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0 ? "bg-yellow-100 text-yellow-800" :
                  index === 1 ? "bg-gray-100 text-gray-600" :
                  index === 2 ? "bg-orange-100 text-orange-800" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{performer.name}</p>
                  <p className="text-xs text-muted-foreground">{performer.conversions} {t.admin.conversions[lang]}</p>
                </div>
                <span className="text-sm font-bold text-accent">${performer.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
