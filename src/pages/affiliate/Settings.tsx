import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { User, Lock, Bell, Globe, Save, CheckCircle } from "lucide-react";

export default function Settings() {
  const { lang, t } = useLanguage();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  // Profile form state
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [website, setWebsite] = useState(profile?.website || "");

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notification state
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [dashNotifs, setDashNotifs] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "profile", label: t.settings.profile[lang], icon: User },
    { id: "password", label: t.settings.password[lang], icon: Lock },
    { id: "notifications", label: t.settings.notifications[lang], icon: Bell },
    { id: "language", label: t.settings.language[lang], icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t.settings.title[lang]}</h1>
        <p className="text-muted-foreground mt-2">{t.settings.subtitle[lang]}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-accent text-accent-foreground shadow-glow"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-xl border border-border p-6 shadow-card"
          >
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">{t.settings.profileInfo[lang]}</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.settings.fullName[lang]}</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.settings.phone[lang]}</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">{t.settings.website[lang]}</label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground rounded-lg font-semibold shadow-glow hover:opacity-90 transition-opacity"
                >
                  {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {saved ? t.settings.saved[lang] : t.settings.save[lang]}
                </button>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === "password" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">{t.settings.changePassword[lang]}</h3>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.settings.currentPassword[lang]}</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.settings.newPassword[lang]}</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.settings.confirmPassword[lang]}</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground rounded-lg font-semibold shadow-glow hover:opacity-90 transition-opacity"
                >
                  {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {saved ? t.settings.saved[lang] : t.settings.updatePassword[lang]}
                </button>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">{t.settings.notificationPrefs[lang]}</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-background rounded-lg border border-input cursor-pointer">
                    <div>
                      <p className="font-medium text-sm">{t.settings.emailNotifications[lang]}</p>
                      <p className="text-xs text-muted-foreground">{t.settings.emailNotifsDesc[lang]}</p>
                    </div>
                    <div
                      onClick={() => setEmailNotifs(!emailNotifs)}
                      className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative ${
                        emailNotifs ? "bg-accent" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          emailNotifs ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-background rounded-lg border border-input cursor-pointer">
                    <div>
                      <p className="font-medium text-sm">{t.settings.dashboardNotifications[lang]}</p>
                      <p className="text-xs text-muted-foreground">{t.settings.dashNotifsDesc[lang]}</p>
                    </div>
                    <div
                      onClick={() => setDashNotifs(!dashNotifs)}
                      className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative ${
                        dashNotifs ? "bg-accent" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          dashNotifs ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Language Tab */}
            {activeTab === "language" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">{t.settings.languagePref[lang]}</h3>
                <div className="grid gap-3 md:grid-cols-2 max-w-md">
                  <button
                    onClick={() => {}}
                    className={`p-4 rounded-lg border-2 transition-colors text-left ${
                      lang === "bg" ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <p className="font-semibold">🇧🇬 Български</p>
                    <p className="text-sm text-muted-foreground">Bulgarian</p>
                  </button>
                  <button
                    onClick={() => {}}
                    className={`p-4 rounded-lg border-2 transition-colors text-left ${
                      lang === "en" ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <p className="font-semibold">🇬🇧 English</p>
                    <p className="text-sm text-muted-foreground">English</p>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
