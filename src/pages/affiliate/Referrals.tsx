import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Plus, Copy, QrCode, TrendingUp, ExternalLink } from "lucide-react";

// Demo data
const DEMO_LINKS = [
  { id: "1", code: "EP-IVAN123", campaign_name: "Blog Campaign", product_category: "AI Chatbots", is_active: true, clicks: 342, conversions: 12 },
  { id: "2", code: "EP-SEO2025", campaign_name: "SEO Newsletter", product_category: "SEO Tools", is_active: true, clicks: 187, conversions: 5 },
  { id: "3", code: "EP-WEBDEV", campaign_name: "Web Dev Promo", product_category: "Web Development", is_active: true, clicks: 95, conversions: 3 },
  { id: "4", code: "EP-SOCIAL1", campaign_name: "Social Media Push", product_category: "E-Commerce", is_active: false, clicks: 421, conversions: 8 },
];

export default function Referrals() {
  const { lang, t } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(`https://epsystems.com/ref/${code}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.referrals.title[lang]}</h1>
          <p className="text-muted-foreground mt-2">{t.referrals.subtitle[lang]}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg font-semibold shadow-glow hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          {t.referrals.createLink[lang]}
        </button>
      </div>

      {/* Links Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DEMO_LINKS.map((link, index) => (
          <motion.div
            key={link.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-glow transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{link.campaign_name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{link.product_category}</p>
                </div>
                <span
                  className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    link.is_active
                      ? "bg-green-100 text-green-800 border-green-300"
                      : "bg-gray-100 text-gray-600 border-gray-300"
                  }`}
                >
                  {link.is_active ? t.referrals.active[lang] : t.referrals.inactive[lang]}
                </span>
              </div>

              {/* Link URL */}
              <div className="bg-muted rounded-lg p-3 flex items-center justify-between mb-4">
                <code className="text-xs truncate flex-1 text-muted-foreground">
                  epsystems.com/ref/{link.code}
                </code>
                <button
                  onClick={() => copyToClipboard(link.code, link.id)}
                  className="ml-2 p-1.5 hover:bg-background rounded transition-colors"
                >
                  <Copy className={`w-4 h-4 ${copiedId === link.id ? "text-accent" : "text-muted-foreground"}`} />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">{t.referrals.clicks[lang]}</p>
                  <p className="text-xl font-bold">{link.clicks}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t.referrals.conversionsLabel[lang]}</p>
                  <p className="text-xl font-bold">{link.conversions}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                  <QrCode className="w-4 h-4" />
                  {t.referrals.qrCode[lang]}
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                  <TrendingUp className="w-4 h-4" />
                  {t.referrals.stats[lang]}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
