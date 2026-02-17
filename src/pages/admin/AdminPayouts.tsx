import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { CreditCard, Check, Clock, DollarSign } from "lucide-react";

const DEMO_PAYOUTS = [
  { id: "1", affiliate: "Georgi R.", amount: 840.00, payment_method: "SEPA", status: "pending", created_at: "2025-02-01" },
  { id: "2", affiliate: "Ivan D.", amount: 524.00, payment_method: "Revolut", status: "processing", created_at: "2025-01-30" },
  { id: "3", affiliate: "Maria M.", amount: 312.00, payment_method: "EasyPay", status: "completed", transaction_id: "TXN-2025-001", created_at: "2025-01-15" },
  { id: "4", affiliate: "Alex K.", amount: 160.00, payment_method: "SEPA", status: "completed", transaction_id: "TXN-2025-002", created_at: "2024-12-15" },
];

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  processing: "bg-blue-100 text-blue-800 border-blue-300",
  completed: "bg-green-100 text-green-800 border-green-300",
  failed: "bg-red-100 text-red-800 border-red-300",
};

export default function AdminPayouts() {
  const { lang, t } = useLanguage();

  const totalPending = DEMO_PAYOUTS
    .filter((p) => p.status === "pending" || p.status === "processing")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.admin.payoutsTitle[lang]}</h1>
          <p className="text-muted-foreground mt-2">{t.admin.payoutsSubtitle[lang]}</p>
        </div>
        <div className="bg-card rounded-lg border border-border px-4 py-3 flex items-center gap-3">
          <Clock className="w-5 h-5 text-yellow-500" />
          <div>
            <p className="text-xs text-muted-foreground">{t.admin.pendingPayouts[lang]}</p>
            <p className="text-lg font-bold">&euro;{totalPending.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.affiliate[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.amount[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.payouts.method[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.date[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.status[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.admin.actions[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_PAYOUTS.map((payout) => (
                <tr key={payout.id} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-sm font-medium">{payout.affiliate}</td>
                  <td className="p-4 text-sm font-semibold">&euro;{payout.amount.toFixed(2)}</td>
                  <td className="p-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      {payout.payment_method}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{payout.created_at}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[payout.status as keyof typeof statusStyles]}`}>
                      {t.payouts[payout.status as keyof typeof t.payouts][lang]}
                    </span>
                  </td>
                  <td className="p-4">
                    {payout.status === "pending" && (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-accent-foreground rounded-lg text-xs font-medium hover:opacity-90 transition-opacity">
                        <DollarSign className="w-3 h-3" />
                        {t.admin.processPayout[lang]}
                      </button>
                    )}
                    {payout.status === "processing" && (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity">
                        <Check className="w-3 h-3" />
                        {t.admin.markCompleted[lang]}
                      </button>
                    )}
                    {payout.status === "completed" && (
                      <span className="text-xs text-muted-foreground">{(payout as any).transaction_id}</span>
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
