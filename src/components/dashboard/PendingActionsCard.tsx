import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { FileText, DollarSign, CreditCard, ChevronRight, CheckCircle } from "lucide-react";

interface PendingActionsCardProps {
  pendingApplications?: number;
  pendingCommissions?: number;
  pendingPayouts?: number;
}

export function PendingActionsCard({
  pendingApplications = 3,
  pendingCommissions = 2,
  pendingPayouts = 1,
}: PendingActionsCardProps) {
  const { lang, t } = useLanguage();

  const items = [
    {
      count: pendingApplications,
      label: t.admin.pendingApplicationsAction[lang],
      icon: FileText,
      href: "/admin/applications",
    },
    {
      count: pendingCommissions,
      label: t.admin.pendingCommissionsAction[lang],
      icon: DollarSign,
      href: "/admin/commissions",
    },
    {
      count: pendingPayouts,
      label: t.admin.pendingPayoutsAction[lang],
      icon: CreditCard,
      href: "/admin/payouts",
    },
  ];

  return (
    <div className="bg-card rounded-xl border border-border border-l-4 border-l-yellow-400 p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-4">{t.admin.pendingActionsTitle[lang]}</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          const hasPending = item.count > 0;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 rounded-lg p-4 transition-colors ${
                hasPending
                  ? "bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950/30 dark:hover:bg-yellow-950/50"
                  : "bg-green-50 hover:bg-green-100 dark:bg-green-950/30 dark:hover:bg-green-950/50"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  hasPending
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400"
                    : "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
                }`}
              >
                {hasPending ? (
                  <Icon className="w-5 h-5" />
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-2xl font-bold ${hasPending ? "text-yellow-700 dark:text-yellow-400" : "text-green-700 dark:text-green-400"}`}>
                  {hasPending ? item.count : ""}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {hasPending ? item.label : t.admin.noPendingItems[lang]}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
