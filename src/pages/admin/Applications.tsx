import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Check, X, ExternalLink, Filter } from "lucide-react";

const DEMO_APPLICATIONS = [
  { id: "1", name: "Dimitar S.", email: "dimitar@blog.bg", phone: "+359 88 111 2222", website: "https://techblog.bg", social_links: "twitter.com/dimitarS", reason: "I run a tech blog with 15,000 monthly readers focused on software tools and AI solutions. I've been recommending similar products for 2 years.", status: "pending", created_at: "2025-02-06" },
  { id: "2", name: "Elena K.", email: "elena@agency.com", phone: "+359 89 333 4444", website: "https://digitalagency.bg", social_links: "linkedin.com/in/elena-k", reason: "Our digital agency serves 50+ clients who regularly need web development, SEO, and CRM solutions. We'd love to refer them to E&P Systems.", status: "pending", created_at: "2025-02-05" },
  { id: "3", name: "Petar M.", email: "petar@youtube.com", phone: "+359 87 555 6666", website: null, social_links: "youtube.com/@petartech", reason: "I have a YouTube channel with 8,000 subscribers focused on tech reviews and tutorials. My audience is always looking for new software tools.", status: "pending", created_at: "2025-02-04" },
  { id: "4", name: "Yordan T.", email: "yordan@example.com", phone: "+359 88 777 8888", website: null, social_links: null, reason: "I'm interested in earning commissions by promoting your products.", status: "rejected", created_at: "2025-02-01", rejection_reason: "Application too brief, no evidence of audience." },
  { id: "5", name: "Anna B.", email: "anna@marketing.bg", phone: "+359 89 999 0000", website: "https://annamarketing.bg", social_links: "instagram.com/annamarketing", reason: "I'm a professional digital marketer with 5+ years experience in affiliate marketing. I've generated over \u20AC50,000 in affiliate revenue across various programs.", status: "approved", created_at: "2025-01-28" },
];

export default function Applications() {
  const { lang, t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState("pending");

  const filtered = statusFilter === "all"
    ? DEMO_APPLICATIONS
    : DEMO_APPLICATIONS.filter((a) => a.status === statusFilter);

  const pendingCount = DEMO_APPLICATIONS.filter((a) => a.status === "pending").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.admin.applicationsTitle[lang]}</h1>
        <p className="text-muted-foreground mt-2">
          {t.admin.applicationsSubtitle[lang]} ({pendingCount} {t.admin.pendingReview[lang]})
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {["pending", "approved", "rejected", "all"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === status
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.admin[status as keyof typeof t.admin][lang]}
          </button>
        ))}
      </div>

      {/* Applications */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{app.name}</h3>
                  <p className="text-sm text-muted-foreground">{app.email}</p>
                </div>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  app.status === "pending" ? "bg-yellow-100 text-yellow-800 border-yellow-300" :
                  app.status === "approved" ? "bg-green-100 text-green-800 border-green-300" :
                  "bg-red-100 text-red-800 border-red-300"
                }`}>
                  {t.admin[app.status as keyof typeof t.admin][lang]}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm mb-4">
                <div><span className="text-muted-foreground">{t.admin.phone[lang]}:</span> {app.phone}</div>
                {app.website && (
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">{t.admin.website[lang]}:</span>
                    <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-1">
                      {app.website} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                {app.social_links && (
                  <div><span className="text-muted-foreground">{t.admin.social[lang]}:</span> {app.social_links}</div>
                )}
                <div><span className="text-muted-foreground">{t.admin.applied[lang]}:</span> {app.created_at}</div>
              </div>

              {/* Reason */}
              <div className="bg-muted rounded-lg p-3 mb-4">
                <p className="text-xs text-muted-foreground mb-1 font-medium">{t.admin.reason[lang]}:</p>
                <p className="text-sm">{app.reason}</p>
              </div>

              {/* Rejection reason */}
              {app.status === "rejected" && (app as any).rejection_reason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-xs text-red-600 mb-1 font-medium">{t.admin.rejectionReason[lang]}:</p>
                  <p className="text-sm text-red-700">{(app as any).rejection_reason}</p>
                </div>
              )}

              {/* Actions */}
              {app.status === "pending" && (
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg font-semibold shadow-glow hover:opacity-90 transition-opacity">
                    <Check className="w-4 h-4" />
                    {t.admin.approve[lang]}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    <X className="w-4 h-4" />
                    {t.admin.reject[lang]}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
