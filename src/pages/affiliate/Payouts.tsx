import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { CreditCard, DollarSign, Clock, CheckCircle, Wallet } from "lucide-react";

const DEMO_PAYOUTS = [
  { id: "1", amount: 524.00, payment_method: "PayPal", status: "completed", transaction_id: "TXN-2025-001", created_at: "2025-01-15" },
  { id: "2", amount: 312.00, payment_method: "Bank Transfer", status: "completed", transaction_id: "TXN-2025-002", created_at: "2024-12-15" },
  { id: "3", amount: 840.00, payment_method: "PayPal", status: "pending", transaction_id: null, created_at: "2025-02-01" },
];

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  processing: "bg-blue-100 text-blue-800 border-blue-300",
  completed: "bg-green-100 text-green-800 border-green-300",
  failed: "bg-red-100 text-red-800 border-red-300",
};

export default function Payouts() {
  const { lang, t } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "bank">("paypal");

  const totalPaid = DEMO_PAYOUTS
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = DEMO_PAYOUTS
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t.payouts.title[lang]}</h1>
        <p className="text-muted-foreground mt-2">{t.payouts.subtitle[lang]}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border border-border p-6 shadow-card"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.payouts.totalPaid[lang]}</p>
              <p className="text-2xl font-bold">${totalPaid.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-6 shadow-card"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.payouts.pendingAmount[lang]}</p>
              <p className="text-2xl font-bold">${pendingAmount.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border p-6 shadow-card"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.payouts.minThreshold[lang]}</p>
              <p className="text-2xl font-bold">$50.00</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payment Method */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-4">{t.payouts.paymentMethod[lang]}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <button
            onClick={() => setPaymentMethod("paypal")}
            className={`p-4 rounded-lg border-2 transition-colors text-left ${
              paymentMethod === "paypal"
                ? "border-accent bg-accent/5"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-semibold">PayPal</p>
                <p className="text-sm text-muted-foreground">{t.payouts.paypalDesc[lang]}</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setPaymentMethod("bank")}
            className={`p-4 rounded-lg border-2 transition-colors text-left ${
              paymentMethod === "bank"
                ? "border-accent bg-accent/5"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-semibold">{t.payouts.bankTransfer[lang]}</p>
                <p className="text-sm text-muted-foreground">{t.payouts.bankDesc[lang]}</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">{t.payouts.history[lang]}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.date[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.amount[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.payouts.method[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.payouts.transactionId[lang]}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.commissions.status[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_PAYOUTS.map((payout) => (
                <tr key={payout.id} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-sm">{payout.created_at}</td>
                  <td className="p-4 text-sm font-semibold">${payout.amount.toFixed(2)}</td>
                  <td className="p-4 text-sm">{payout.payment_method}</td>
                  <td className="p-4 text-sm text-muted-foreground">{payout.transaction_id || "—"}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[payout.status as keyof typeof statusStyles]}`}>
                      {t.payouts[payout.status as keyof typeof t.payouts][lang]}
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
