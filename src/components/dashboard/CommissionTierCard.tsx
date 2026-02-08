import { useLanguage } from "@/i18n/LanguageContext";
import { Trophy, ArrowUp } from "lucide-react";

interface CommissionTierCardProps {
  currentTier?: "starter" | "pro" | "elite";
  conversions?: number;
  nextTierAt?: number;
}

export function CommissionTierCard({
  currentTier = "starter",
  conversions = 3,
  nextTierAt = 5,
}: CommissionTierCardProps) {
  const { lang, t } = useLanguage();

  const tiers = {
    starter: { name: t.dashboard.tierStarter[lang], rate: "20%", color: "text-blue-500" },
    pro: { name: t.dashboard.tierPro[lang], rate: "30%", color: "text-accent" },
    elite: { name: t.dashboard.tierElite[lang], rate: "30% + Bonus", color: "text-yellow-500" },
  };

  const tier = tiers[currentTier];
  const progress = currentTier === "elite" ? 100 : (conversions / nextTierAt) * 100;

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{t.dashboard.commissionTier[lang]}</h3>
        <Trophy className={`w-6 h-6 ${tier.color}`} />
      </div>

      {/* Current Tier */}
      <div className="text-center py-6 flex-1 flex flex-col justify-center">
        <p className="text-sm text-muted-foreground mb-1">
          {t.dashboard.currentTier[lang]}
        </p>
        <p className={`text-3xl font-bold ${tier.color}`}>{tier.name}</p>
        <p className="text-2xl font-bold text-foreground mt-2">{tier.rate}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {t.dashboard.commissionRate[lang]}
        </p>
      </div>

      {/* Progress to next tier */}
      {currentTier !== "elite" && (
        <div className="mt-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">
              {t.dashboard.nextTier[lang]}
            </span>
            <span className="font-medium">
              {conversions}/{nextTierAt} {t.dashboard.conversionsNeeded[lang]}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-accent h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-accent">
            <ArrowUp className="w-3 h-3" />
            {nextTierAt - conversions} {t.dashboard.moreToGo[lang]}
          </div>
        </div>
      )}
    </div>
  );
}
