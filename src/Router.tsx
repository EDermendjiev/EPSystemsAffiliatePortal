import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

// Auth Pages
import Login from "@/pages/auth/Login";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

// Affiliate Pages
import Dashboard from "@/pages/affiliate/Dashboard";
import Referrals from "@/pages/affiliate/Referrals";
import Commissions from "@/pages/affiliate/Commissions";
import Payouts from "@/pages/affiliate/Payouts";
import Materials from "@/pages/affiliate/Materials";
import Settings from "@/pages/affiliate/Settings";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Affiliates from "@/pages/admin/Affiliates";
import Applications from "@/pages/admin/Applications";
import AdminCommissions from "@/pages/admin/AdminCommissions";
import AdminPayouts from "@/pages/admin/AdminPayouts";
import AdminMaterials from "@/pages/admin/AdminMaterials";
import AdminSettings from "@/pages/admin/AdminSettings";

export default function Router() {
  const { user, profile } = useAuth();

  const getDefaultRoute = () => {
    if (!user) return "/login";
    return profile?.role === "admin" ? "/admin" : "/dashboard";
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={user ? <Navigate to={getDefaultRoute()} /> : <Login />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Affiliate Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/commissions" element={<Commissions />} />
        <Route path="/payouts" element={<Payouts />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route
        element={
          <ProtectedRoute requireAdmin>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/affiliates" element={<Affiliates />} />
        <Route path="/admin/applications" element={<Applications />} />
        <Route path="/admin/commissions" element={<AdminCommissions />} />
        <Route path="/admin/payouts" element={<AdminPayouts />} />
        <Route path="/admin/materials" element={<AdminMaterials />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to={getDefaultRoute()} />} />
      <Route path="*" element={<Navigate to={getDefaultRoute()} />} />
    </Routes>
  );
}
