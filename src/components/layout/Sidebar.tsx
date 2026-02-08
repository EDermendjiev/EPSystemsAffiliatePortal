import { NavLink } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Link as LinkIcon,
  DollarSign,
  CreditCard,
  FolderOpen,
  Settings,
  Users,
  FileText,
  BarChart3,
  Upload,
  Sliders,
} from "lucide-react";

interface SidebarProps {
  isAdmin: boolean;
  onNavigate?: () => void;
}

const affiliateNavItems = [
  { to: "/dashboard", icon: LayoutDashboard, labelKey: "dashboard" as const },
  { to: "/referrals", icon: LinkIcon, labelKey: "referrals" as const },
  { to: "/commissions", icon: DollarSign, labelKey: "commissions" as const },
  { to: "/payouts", icon: CreditCard, labelKey: "payouts" as const },
  { to: "/materials", icon: FolderOpen, labelKey: "materials" as const },
  { to: "/settings", icon: Settings, labelKey: "settings" as const },
];

const adminNavItems = [
  { to: "/admin", icon: BarChart3, labelKey: "adminDashboard" as const },
  { to: "/admin/affiliates", icon: Users, labelKey: "adminAffiliates" as const },
  { to: "/admin/applications", icon: FileText, labelKey: "adminApplications" as const },
  { to: "/admin/commissions", icon: DollarSign, labelKey: "adminCommissions" as const },
  { to: "/admin/payouts", icon: CreditCard, labelKey: "adminPayouts" as const },
  { to: "/admin/materials", icon: Upload, labelKey: "adminMaterials" as const },
  { to: "/admin/settings", icon: Sliders, labelKey: "adminSettings" as const },
];

export function Sidebar({ isAdmin, onNavigate }: SidebarProps) {
  const { lang, t } = useLanguage();
  const navItems = isAdmin ? adminNavItems : affiliateNavItems;

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r border-border px-6 pb-4">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center">
        <h1 className="text-2xl font-bold">
          <span className="text-gradient">E&P</span>
          <span className="text-foreground ml-2">Affiliates</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/admin" || item.to === "/dashboard"}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "group flex gap-x-3 rounded-lg p-3 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-accent text-accent-foreground shadow-glow"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {t.nav[item.labelKey][lang]}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Bottom section */}
        <div className="mt-auto pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            E&P Systems &copy; {new Date().getFullYear()}
          </p>
        </div>
      </nav>
    </div>
  );
}
