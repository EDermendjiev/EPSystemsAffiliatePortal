import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Search, Eye, MoreVertical } from "lucide-react";

const DEMO_AFFILIATES = [
  { id: "1", full_name: "Georgi R.", email: "georgi@example.com", tier: "elite", conversions: 28, revenue: 3400, created_at: "2024-06-15" },
  { id: "2", full_name: "Ivan D.", email: "ivan@example.com", tier: "pro", conversions: 15, revenue: 1200, created_at: "2024-08-20" },
  { id: "3", full_name: "Maria M.", email: "maria@example.com", tier: "pro", conversions: 12, revenue: 950, created_at: "2024-09-01" },
  { id: "4", full_name: "Alex K.", email: "alex@example.com", tier: "starter", conversions: 8, revenue: 640, created_at: "2024-10-10" },
  { id: "5", full_name: "Nina P.", email: "nina@example.com", tier: "starter", conversions: 6, revenue: 480, created_at: "2024-11-05" },
  { id: "6", full_name: "Stefan V.", email: "stefan@example.com", tier: "starter", conversions: 2, revenue: 160, created_at: "2025-01-12" },
];

const tierStyles = {
  starter: "bg-blue-100 text-blue-800 border-blue-300",
  pro: "bg-green-100 text-green-800 border-green-300",
  elite: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

export default function Affiliates() {
  const { lang, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedAffiliate, setSelectedAffiliate] = useState<typeof DEMO_AFFILIATES[0] | null>(null);

  const filtered = DEMO_AFFILIATES.filter(
    (a) =>
      a.full_name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.admin.affiliatesTitle[lang]}</h1>
        <p className="text-muted-foreground mt-2">{t.admin.affiliatesSubtitle[lang]}</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.admin.searchAffiliates[lang]}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.name[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.auth.email[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.tier[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.conversions[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.revenue[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.joined[lang]}</th>
                <th className="w-[50px] p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((affiliate) => (
                <tr key={affiliate.id} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-sm font-medium">{affiliate.full_name}</td>
                  <td className="p-4 text-sm text-muted-foreground">{affiliate.email}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${tierStyles[affiliate.tier as keyof typeof tierStyles]}`}>
                      {affiliate.tier}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{affiliate.conversions}</td>
                  <td className="p-4 text-sm font-semibold">&euro;{affiliate.revenue.toFixed(2)}</td>
                  <td className="p-4 text-sm text-muted-foreground">{affiliate.created_at}</td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedAffiliate(affiliate)}
                      className="p-1.5 hover:bg-muted rounded transition-colors"
                    >
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAffiliate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedAffiliate(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-6 w-full max-w-md border border-border shadow-card mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">{selectedAffiliate.full_name}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t.auth.email[lang]}</span><span>{selectedAffiliate.email}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t.admin.tier[lang]}</span><span className="capitalize font-medium">{selectedAffiliate.tier}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t.admin.conversions[lang]}</span><span>{selectedAffiliate.conversions}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t.admin.revenue[lang]}</span><span className="font-semibold text-accent">&euro;{selectedAffiliate.revenue.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t.admin.joined[lang]}</span><span>{selectedAffiliate.created_at}</span></div>
            </div>
            <button
              onClick={() => setSelectedAffiliate(null)}
              className="w-full mt-6 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              {t.common.close[lang]}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
