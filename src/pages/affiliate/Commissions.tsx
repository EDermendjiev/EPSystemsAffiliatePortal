import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Download, Filter, Calendar } from "lucide-react";

const DEMO_COMMISSIONS = [
  { id: "1", date: "2025-02-05", product: "AI Chatbot", customer: "tech-startup@example.com", amount: 135.00, rate: 30, tier: "pro", status: "approved" },
  { id: "2", date: "2025-02-03", product: "Web Development", customer: "agency@example.com", amount: 240.00, rate: 20, tier: "starter", status: "pending" },
  { id: "3", date: "2025-01-28", product: "E-Commerce", customer: "ecom@example.com", amount: 160.00, rate: 20, tier: "starter", status: "paid" },
  { id: "4", date: "2025-01-25", product: "CRM System", customer: "corp@example.com", amount: 195.00, rate: 30, tier: "pro", status: "approved" },
  { id: "5", date: "2025-01-20", product: "SEO Tools", customer: "seo-firm@example.com", amount: 64.00, rate: 20, tier: "starter", status: "paid" },
  { id: "6", date: "2025-01-15", product: "AI Voice Agent", customer: "callcenter@example.com", amount: 300.00, rate: 30, tier: "pro", status: "paid" },
  { id: "7", date: "2025-01-10", product: "Internal Software", customer: "factory@example.com", amount: 450.00, rate: 30, tier: "pro", status: "rejected" },
];

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  approved: "bg-green-100 text-green-800 border-green-300",
  paid: "bg-blue-100 text-blue-800 border-blue-300",
  rejected: "bg-red-100 text-red-800 border-red-300",
};

export default function Commissions() {
  const { lang, t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = statusFilter === "all"
    ? DEMO_COMMISSIONS
    : DEMO_COMMISSIONS.filter((c) => c.status === statusFilter);

  const totalApproved = DEMO_COMMISSIONS
    .filter((c) => c.status === "approved" || c.status === "paid")
    .reduce((sum, c) => sum + c.amount, 0);

  const exportCSV = () => {
    const headers = "Date,Product,Customer,Amount,Rate,Tier,Status\n";
    const rows = filtered
      .map((c) => `${c.date},${c.product},${c.customer},${c.amount},${c.rate}%,${c.tier},${c.status}`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "commissions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.commissions.title[lang]}</h1>
          <p className="text-muted-foreground mt-2">{t.commissions.subtitle[lang]}</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
        >
          <Download className="w-4 h-4" />
          {t.commissions.export[lang]}
        </button>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-6 shadow-card"
      >
        <p className="text-sm text-muted-foreground">{t.commissions.totalEarned[lang]}</p>
        <p className="text-4xl font-bold text-accent mt-1">${totalApproved.toFixed(2)}</p>
      </motion.div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {["all", "pending", "approved", "paid", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === status
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {status === "all" ? t.commissions.all[lang] : t.commissions[status as keyof typeof t.commissions][lang]}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.date[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.product[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.customer[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.amount[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.rate[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.status[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((commission) => (
                <tr key={commission.id} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-sm">{commission.date}</td>
                  <td className="p-4 text-sm">{commission.product}</td>
                  <td className="p-4 text-sm text-muted-foreground">{commission.customer}</td>
                  <td className="p-4 text-sm font-semibold">${commission.amount.toFixed(2)}</td>
                  <td className="p-4 text-sm">{commission.rate}%</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[commission.status as keyof typeof statusStyles]}`}>
                      {t.commissions[commission.status as keyof typeof t.commissions][lang]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
