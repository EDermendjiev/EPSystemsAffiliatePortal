import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  Mail,
  Lock,
  Sparkles,
  Loader2,
  Globe,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"password" | "magic">("password");
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signInWithMagicLink } = useAuth();
  const { lang, toggleLang, t } = useLanguage();
  const navigate = useNavigate();
  const isDemoMode = !isSupabaseConfigured();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || t.auth.loginError[lang]);
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithMagicLink(email);
      setMagicLinkSent(true);
    } catch (err: any) {
      setError(err.message || t.auth.loginError[lang]);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: "admin" | "affiliate") => {
    localStorage.setItem("ep-demo-role", role);
    await signIn("demo@epsystems.com", "demo");
    navigate(role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4">
      {/* Language switcher */}
      <button
        onClick={toggleLang}
        className="fixed top-4 right-4 flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm"
      >
        <Globe className="w-3.5 h-3.5" />
        {lang === "bg" ? "EN" : "BG"}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-card p-8 border border-border">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gradient">E&P</span>{" "}
              <span className="text-foreground">Systems</span>
            </h1>
            <p className="text-lg font-semibold text-foreground">
              {t.auth.welcome[lang]}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              {t.auth.loginSubtitle[lang]}
            </p>
          </div>

          {isDemoMode ? (
            /* Demo Mode: Profile Selector */
            <>
              {/* Demo badge */}
              <div className="flex items-center justify-center gap-2 mb-6 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg mx-auto w-fit">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-accent">
                  {t.auth.demoMode[lang]}
                </span>
              </div>

              <p className="text-sm text-muted-foreground text-center mb-5">
                {t.auth.demoSelectProfile[lang]}
              </p>

              <div className="space-y-3">
                {/* Admin Card */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDemoLogin("admin")}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:border-accent/50 hover:shadow-glow transition-all text-left group"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">
                      {t.auth.demoAdmin[lang]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.auth.demoAdminDesc[lang]}
                    </p>
                  </div>
                </motion.button>

                {/* Affiliate Card */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDemoLogin("affiliate")}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:border-accent/50 hover:shadow-glow transition-all text-left group"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">
                      {t.auth.demoAffiliate[lang]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.auth.demoAffiliateDesc[lang]}
                    </p>
                  </div>
                </motion.button>
              </div>
            </>
          ) : (
            /* Standard Login Form */
            <>
              {/* Tabs */}
              <div className="flex rounded-lg bg-muted p-1 mb-6">
                <button
                  onClick={() => setActiveTab("password")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "password"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  {t.auth.password[lang]}
                </button>
                <button
                  onClick={() => setActiveTab("magic")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "magic"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {t.auth.magicLink[lang]}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive"
                >
                  {error}
                </motion.div>
              )}

              {/* Password Login */}
              {activeTab === "password" && (
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t.auth.email[lang]}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.auth.emailPlaceholder[lang]}
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t.auth.passwordLabel[lang]}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold shadow-glow hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : null}
                    {loading ? t.auth.loggingIn[lang] : t.auth.loginBtn[lang]}
                  </button>
                </form>
              )}

              {/* Magic Link */}
              {activeTab === "magic" && (
                <>
                  {magicLinkSent ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {t.auth.magicLinkSent[lang]}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t.auth.checkEmail[lang]}
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleMagicLink} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          {t.auth.email[lang]}
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.auth.emailPlaceholder[lang]}
                            required
                            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold shadow-glow hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                        {t.auth.sendMagicLink[lang]}
                      </button>
                    </form>
                  )}
                </>
              )}

              {/* Footer Links */}
              <div className="mt-6 text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-accent hover:underline"
                >
                  {t.auth.forgotPassword[lang]}
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
