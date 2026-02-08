import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import type { Profile } from "@/lib/database.types";

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  switchDemoRole: () => void;
  isAdmin: boolean;
  isAffiliate: boolean;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_ADMIN_PROFILE: Profile = {
  id: "demo-admin-id",
  role: "admin",
  full_name: "Demo Admin",
  phone: "+359 88 000 0000",
  website: "https://epsystems.com",
  social_links: null,
  payment_method: null,
  notification_preferences: { email: true, dashboard: true },
  language: "bg",
  avatar_url: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const DEMO_AFFILIATE_PROFILE: Profile = {
  id: "demo-affiliate-id",
  role: "affiliate",
  full_name: "Demo Partner",
  phone: "+359 88 111 1111",
  website: "https://partner-site.com",
  social_links: null,
  payment_method: { type: "paypal", email: "partner@example.com" },
  notification_preferences: { email: true, dashboard: true },
  language: "bg",
  avatar_url: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const DEMO_ROLE_KEY = "ep-demo-role";

function getDemoProfile(role?: string): Profile {
  const storedRole = role || localStorage.getItem(DEMO_ROLE_KEY) || "admin";
  return storedRole === "affiliate" ? DEMO_AFFILIATE_PROFILE : DEMO_ADMIN_PROFILE;
}

function getDemoUser(profile: Profile): User {
  return {
    id: profile.id,
    email: profile.role === "admin" ? "admin@epsystems.com" : "partner@epsystems.com",
  } as User;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const isDemoMode = !isSupabaseConfigured();

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (data) setProfile(data);
  };

  useEffect(() => {
    if (isDemoMode) {
      // Demo mode: don't auto-login, let the login page handle profile selection
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (isDemoMode) {
      const demoProfile = getDemoProfile();
      setProfile(demoProfile);
      setUser(getDemoUser(demoProfile));
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signInWithMagicLink = async (email: string) => {
    if (isDemoMode) {
      const demoProfile = getDemoProfile();
      setProfile(demoProfile);
      setUser(getDemoUser(demoProfile));
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (isDemoMode) {
      setUser(null);
      setProfile(null);
      setSession(null);
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    if (isDemoMode) return;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  const updatePassword = async (newPassword: string) => {
    if (isDemoMode) return;
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  };

  const refreshProfile = async () => {
    if (user && !isDemoMode) {
      await fetchProfile(user.id);
    }
  };

  const switchDemoRole = useCallback(() => {
    if (!isDemoMode) return;
    const currentRole = profile?.role || "admin";
    const newRole = currentRole === "admin" ? "affiliate" : "admin";
    localStorage.setItem(DEMO_ROLE_KEY, newRole);
    const newProfile = getDemoProfile(newRole);
    setProfile(newProfile);
    setUser(getDemoUser(newProfile));
  }, [isDemoMode, profile?.role]);

  const value: AuthContextValue = {
    user,
    profile,
    session,
    loading,
    signIn,
    signInWithMagicLink,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile,
    switchDemoRole,
    isAdmin: profile?.role === "admin",
    isAffiliate: profile?.role === "affiliate",
    isDemoMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
