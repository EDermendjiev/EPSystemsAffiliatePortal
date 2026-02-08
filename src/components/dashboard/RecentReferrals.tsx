import { useLanguage } from "@/i18n/LanguageContext";
import { ExternalLink } from "lucide-react";

// Demo data
const DEMO_REFERRALS = [
  { id: "1", customer: "tech-startup@example.com", product: "AI Chatbot", amount: 450, date: "2025-02-05", status: "approved" },
  { id: "2", customer: "agency@example.com", product: "Web Development", amount: 1200, date: "2025-02-03", status: "pending" },
  { id: "3", customer: "ecom@example.com", product: "E-Commerce", amount: 800, date: "2025-01-28", status: "paid" },
  { id: "4", customer: "corp@example.com", product: "CRM System", amount: 650, date: "2025-01-25", status: "approved" },
  { id: "5", customer: "seo-firm@example.com", product: "SEO Tools", amount: 320, date: "2025-01-20", status: "paid" },
];

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  approved: "bg-green-100 text-green-800 border-green-300",
  paid: "bg-blue-100 text-blue-800 border-blue-300",
  rejected: "bg-red-100 text-red-800 border-red-300",
};

interface RecentReferralsProps {
  data?: typeof DEMO_REFERRALS;
}

export function RecentReferrals({ data }: RecentReferralsProps) {
  const { lang, t } = useLanguage();
  const referrals = data || DEMO_REFERRALS;

  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t.dashboard.recentReferrals[lang]}</h3>
        <a
          href="/commissions"
          className="text-sm text-accent hover:underline flex items-center gap-1"
        >
          {t.common.viewAll[lang]}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                {t.commissions.customer[lang]}
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                {t.commissions.product[lang]}
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                {t.commissions.amount[lang]}
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                {t.commissions.date[lang]}
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                {t.commissions.status[lang]}
              </th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral) => (
              <tr
                key={referral.id}
                className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <td className="p-4 text-sm">{referral.customer}</td>
                <td className="p-4 text-sm">{referral.product}</td>
                <td className="p-4 text-sm font-semibold">
                  ${referral.amount.toFixed(2)}
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {referral.date}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      statusStyles[referral.status as keyof typeof statusStyles]
                    }`}
                  >
                    {t.commissions[referral.status as keyof typeof t.commissions][lang]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
