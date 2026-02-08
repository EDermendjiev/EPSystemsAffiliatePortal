import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Save, CheckCircle } from "lucide-react";

export default function AdminSettings() {
  const { lang, t } = useLanguage();
  const [saved, setSaved] = useState(false);

  // Settings state
  const [cookieDuration, setCookieDuration] = useState("90");
  const [minPayout, setMinPayout] = useState("50");
  const [payoutDay, setPayoutDay] = useState("15");
  const [starterRate, setStarterRate] = useState("20");
  const [proRate, setProRate] = useState("30");
  const [eliteRate, setEliteRate] = useState("30");
  const [eliteBonus, setEliteBonus] = useState("5");
  const [proThreshold, setProThreshold] = useState("5");
  const [eliteThreshold, setEliteThreshold] = useState("20");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.admin.settingsTitle[lang]}</h1>
        <p className="text-muted-foreground mt-2">{t.admin.settingsSubtitle[lang]}</p>
      </div>

      {/* General Settings */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-6">{t.admin.generalSettings[lang]}</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.admin.cookieDuration[lang]}</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={cookieDuration}
                onChange={(e) => setCookieDuration(e.target.value)}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">{t.admin.days[lang]}</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.admin.minPayoutThreshold[lang]}</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">$</span>
              <input
                type="number"
                value={minPayout}
                onChange={(e) => setMinPayout(e.target.value)}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.admin.payoutDay[lang]}</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={payoutDay}
                onChange={(e) => setPayoutDay(e.target.value)}
                min="1"
                max="28"
                className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">{t.admin.ofMonth[lang]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Tiers */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-6">{t.admin.commissionTiers[lang]}</h3>
        <div className="space-y-6">
          {/* Starter */}
          <div className="grid gap-4 md:grid-cols-3 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-semibold text-blue-600 mb-3">Starter</p>
              <label className="text-xs text-muted-foreground">{t.admin.commissionRate[lang]}</label>
              <div className="flex items-center gap-1 mt-1">
                <input type="number" value={starterRate} onChange={(e) => setStarterRate(e.target.value)} className="w-20 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <span className="text-sm">%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-600 mb-3 invisible">.</p>
              <label className="text-xs text-muted-foreground">{t.admin.minConversions[lang]}</label>
              <p className="mt-1 text-sm font-medium">0 ({t.admin.default[lang]})</p>
            </div>
          </div>

          {/* Pro */}
          <div className="grid gap-4 md:grid-cols-3 p-4 bg-accent/5 rounded-lg border border-accent/20">
            <div>
              <p className="text-sm font-semibold text-accent mb-3">Pro</p>
              <label className="text-xs text-muted-foreground">{t.admin.commissionRate[lang]}</label>
              <div className="flex items-center gap-1 mt-1">
                <input type="number" value={proRate} onChange={(e) => setProRate(e.target.value)} className="w-20 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <span className="text-sm">%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-accent mb-3 invisible">.</p>
              <label className="text-xs text-muted-foreground">{t.admin.minConversions[lang]}</label>
              <div className="flex items-center gap-1 mt-1">
                <input type="number" value={proThreshold} onChange={(e) => setProThreshold(e.target.value)} className="w-20 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
          </div>

          {/* Elite */}
          <div className="grid gap-4 md:grid-cols-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div>
              <p className="text-sm font-semibold text-yellow-700 mb-3">Elite</p>
              <label className="text-xs text-muted-foreground">{t.admin.commissionRate[lang]}</label>
              <div className="flex items-center gap-1 mt-1">
                <input type="number" value={eliteRate} onChange={(e) => setEliteRate(e.target.value)} className="w-20 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <span className="text-sm">% +</span>
                <input type="number" value={eliteBonus} onChange={(e) => setEliteBonus(e.target.value)} className="w-20 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <span className="text-sm">% bonus</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-yellow-700 mb-3 invisible">.</p>
              <label className="text-xs text-muted-foreground">{t.admin.minConversions[lang]}</label>
              <div className="flex items-center gap-1 mt-1">
                <input type="number" value={eliteThreshold} onChange={(e) => setEliteThreshold(e.target.value)} className="w-20 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold shadow-glow hover:opacity-90 transition-opacity"
      >
        {saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
        {saved ? t.settings.saved[lang] : t.admin.saveSettings[lang]}
      </button>
    </div>
  );
}
