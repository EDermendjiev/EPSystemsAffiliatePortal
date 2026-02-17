import { useLanguage } from "@/i18n/LanguageContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DEMO_TIER_DATA = [
  { name: "Starter", value: 28, color: "hsl(217 91% 60%)" },
  { name: "Professional", value: 14, color: "hsl(150 80% 40%)" },
  { name: "Elite", value: 5, color: "hsl(45 93% 47%)" },
];

interface TierDistributionChartProps {
  data?: { name: string; value: number; color: string }[];
}

export function TierDistributionChart({ data }: TierDistributionChartProps) {
  const { lang, t } = useLanguage();
  const chartData = data || DEMO_TIER_DATA;

  const tierNames: Record<string, { bg: string; en: string }> = {
    Starter: { bg: "Стартов", en: "Starter" },
    Professional: { bg: "Професионален", en: "Professional" },
    Elite: { bg: "Елит", en: "Elite" },
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-4">{t.admin.tierDistribution[lang]}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            dataKey="value"
            strokeWidth={2}
            stroke="hsl(0 0% 100%)"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0 0% 100%)",
              border: "1px solid hsl(220 15% 88%)",
              borderRadius: "0.75rem",
              fontSize: "14px",
            }}
            formatter={(value: number, _name: string, props: any) => {
              const localName = tierNames[props?.payload?.name]?.[lang] || props?.payload?.name || _name;
              return [value, localName];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-2 mt-2">
        {chartData.map((tier) => (
          <div key={tier.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: tier.color }}
            />
            <span className="text-sm text-muted-foreground flex-1">
              {tierNames[tier.name]?.[lang] || tier.name}
            </span>
            <span className="text-sm font-semibold">
              {tier.value} {t.admin.affiliatesCount[lang]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
