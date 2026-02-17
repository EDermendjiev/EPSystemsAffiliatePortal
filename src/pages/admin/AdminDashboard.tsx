import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Users, DollarSign, Clock, FileText, Trophy } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PendingActionsCard } from "@/components/dashboard/PendingActionsCard";
import { AdminRevenueChart } from "@/components/dashboard/AdminRevenueChart";
import { TierDistributionChart } from "@/components/dashboard/TierDistributionChart";
import { RecentActivityFeed } from "@/components/dashboard/RecentActivityFeed";

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
    { title: t.admin.totalRevenue[lang], value: "€28,450", icon: DollarSign, trend: 18.7 },
    { title: t.admin.pendingCommissions[lang], value: "€690", icon: Clock, trend: null },
    { title: t.admin.pendingApps[lang], value: "8", icon: FileText, trend: null },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t.admin.dashboardTitle[lang]}</h1>
        <p className="text-muted-foreground mt-2">{t.admin.dashboardSubtitle[lang]}</p>
      </div>

      {/* Stats Cards */}
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

      {/* Pending Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <PendingActionsCard />
      </motion.div>

      {/* Revenue Chart + Tier Distribution */}
      <div className="grid gap-6 lg:grid-cols-7">
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AdminRevenueChart />
        </motion.div>
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <TierDistributionChart />
        </motion.div>
      </div>

      {/* Recent Activity + Top Performers */}
      <div className="grid gap-6 lg:grid-cols-7">
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <RecentActivityFeed />
        </motion.div>
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {/* Top Performers */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
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
                  <span className="text-sm font-bold text-accent">&euro;{performer.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
