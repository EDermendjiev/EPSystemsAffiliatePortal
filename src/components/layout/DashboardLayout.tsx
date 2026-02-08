import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileSidebar } from "./MobileSidebar";
import { useAuth } from "@/contexts/AuthContext";

export function DashboardLayout() {
  const { isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Sidebar isAdmin={isAdmin} />
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        <Header onMobileMenuToggle={() => setMobileOpen(true)} />
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isAdmin={isAdmin}
        open={mobileOpen}
        onOpenChange={setMobileOpen}
      />
    </div>
  );
}
