import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Check, X, Filter, DollarSign } from "lucide-react";

const DEMO_COMMISSIONS = [
  { id: "1", affiliate: "Georgi R.", product: "AI Chatbot", amount: 450.00, rate: 30, tier: "pro", status: "pending", date: "2025-02-05" },
  { id: "2", affiliate: "Ivan D.", product: "Web Development", amount: 240.00, rate: 20, tier: "starter", status: "pending", date: "2025-02-03" },
  { id: "3", affiliate: "Maria M.", product: "E-Commerce", amount: 160.00, rate: 20, tier: "starter", status: "approved", date: "2025-01-28" },
  { id: "4", affiliate: "Georgi R.", product: "CRM System", amount: 195.00, rate: 30, tier: "pro", status: "paid", date: "2025-01-25" },
  { id: "5", affiliate: "Alex K.", product: "SEO Tools", amount: 64.00, rate: 20, tier: "starter", status: "approved", date: "2025-01-20" },
  { id: "6", affiliate: "Ivan D.", product: "AI Voice Agent", amount: 300.00, rate: 30, tier: "pro", status: "paid", date: "2025-01-15" },
];

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  approved: "bg-green-100 text-green-800 border-green-300",
  paid: "bg-blue-100 text-blue-800 border-blue-300",
  rejected: "bg-red-100 text-red-800 border-red-300",
};

export default function AdminCommissions() {
  const { lang, t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = statusFilter === "all"
    ? DEMO_COMMISSIONS
    : DEMO_COMMISSIONS.filter((c) => c.status === statusFilter);

  const totalPending = DEMO_COMMISSIONS
    .filter((c) => c.status === "pending")
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.admin.commissionsTitle[lang]}</h1>
          <p className="text-muted-foreground mt-2">{t.admin.commissionsSubtitle[lang]}</p>
        </div>
        <div className="bg-card rounded-lg border border-border px-4 py-3 flex items-center gap-3">
          <DollarSign className="w-5 h-5 text-yellow-500" />
          <div>
            <p className="text-xs text-muted-foreground">{t.admin.pendingApproval[lang]}</p>
            <p className="text-lg font-bold">${totalPending.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
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
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.affiliate[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.product[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.amount[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.rate[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.date[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.status[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.actions[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((commission) => (
                <tr key={commission.id} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-sm font-medium">{commission.affiliate}</td>
                  <td className="p-4 text-sm">{commission.product}</td>
                  <td className="p-4 text-sm font-semibold">${commission.amount.toFixed(2)}</td>
                  <td className="p-4 text-sm">{commission.rate}%</td>
                  <td className="p-4 text-sm text-muted-foreground">{commission.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[commission.status as keyof typeof statusStyles]}`}>
                      {t.commissions[commission.status as keyof typeof t.commissions][lang]}
                    </span>
                  </td>
                  <td className="p-4">
                    {commission.status === "pending" && (
                      <div className="flex gap-1">
                        <button className="p-1.5 bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
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
