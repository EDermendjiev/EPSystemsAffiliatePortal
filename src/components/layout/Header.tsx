import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { Menu, LogOut, Settings, Globe, ArrowRightLeft } from "lucide-react";

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const { user, profile, signOut, isDemoMode, switchDemoRole, isAdmin } =
    useAuth();
  const { lang, toggleLang, t } = useLanguage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const handleSwitchDemoRole = () => {
    switchDemoRole();
    // Navigate to the appropriate default route after switching
    navigate(isAdmin ? "/dashboard" : "/admin");
  };

  const initials =
    profile?.full_name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "??";

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card/95 backdrop-blur-sm px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={onMobileMenuToggle}
        className="-m-2.5 p-2.5 text-muted-foreground lg:hidden hover:text-foreground transition-colors"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Separator on mobile */}
      <div className="h-6 w-px bg-border lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Page title area */}
        <div className="flex flex-1 items-center">
          <p className="text-sm text-muted-foreground hidden sm:block">
            {t.nav.welcomeBack[lang]},{" "}
            <span className="font-semibold text-foreground">
              {profile?.full_name || user?.email}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-x-2 lg:gap-x-3">
          {/* Demo Role Switcher */}
          {isDemoMode && (
            <button
              onClick={handleSwitchDemoRole}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border bg-accent/10 text-accent border-accent/20 hover:bg-accent/20"
              title={t.auth.demoSwitchRole[lang]}
            >
              <ArrowRightLeft className="w-3 h-3" />
              <span className="hidden sm:inline">
                {isAdmin ? t.auth.demoAdmin[lang] : t.auth.demoAffiliate[lang]}
              </span>
              <span className="sm:hidden">
                {isAdmin ? "Admin" : "Partner"}
              </span>
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "bg" ? "EN" : "BG"}
          </button>

          {/* Settings */}
          <button
            onClick={() => navigate("/settings")}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* User Avatar & Logout */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
              {initials}
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-muted"
              title={t.auth.logout[lang]}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
