import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentReferrals } from "@/components/dashboard/RecentReferrals";
import { CommissionTierCard } from "@/components/dashboard/CommissionTierCard";
import { MousePointerClick, TrendingUp, DollarSign, Clock } from "lucide-react";

export default function Dashboard() {
  const { lang, t } = useLanguage();

  // Demo stats — will be replaced with useAffiliateStats() hook
  const statsCards = [
    {
      title: t.dashboard.totalClicks[lang],
      value: "1,247",
      icon: MousePointerClick,
      trend: 12.5,
    },
    {
      title: t.dashboard.conversions[lang],
      value: "23",
      icon: TrendingUp,
      trend: 8.2,
    },
    {
      title: t.dashboard.totalRevenue[lang],
      value: "\u20AC3,420",
      icon: DollarSign,
      trend: 15.3,
    },
    {
      title: t.dashboard.pendingPayout[lang],
      value: "\u20AC840",
      icon: Clock,
      trend: null,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">{t.dashboard.title[lang]}</h1>
        <p className="text-muted-foreground mt-2">{t.dashboard.subtitle[lang]}</p>
      </div>

      {/* Stats Grid */}
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

      {/* Charts & Tier Row */}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RevenueChart />
        </div>
        <div className="lg:col-span-3">
          <CommissionTierCard currentTier="starter" conversions={3} nextTierAt={5} />
        </div>
      </div>

      {/* Recent Referrals */}
      <RecentReferrals />
    </div>
  );
}
