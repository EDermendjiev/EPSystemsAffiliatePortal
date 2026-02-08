export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id">>;
      };
      affiliate_applications: {
        Row: AffiliateApplication;
        Insert: Omit<AffiliateApplication, "id" | "created_at" | "updated_at" | "reviewed_by" | "reviewed_at">;
        Update: Partial<Omit<AffiliateApplication, "id">>;
      };
      referral_links: {
        Row: ReferralLink;
        Insert: Omit<ReferralLink, "id" | "created_at">;
        Update: Partial<Omit<ReferralLink, "id">>;
      };
      clicks: {
        Row: Click;
        Insert: Omit<Click, "id">;
        Update: Partial<Omit<Click, "id">>;
      };
      conversions: {
        Row: Conversion;
        Insert: Omit<Conversion, "id" | "created_at">;
        Update: Partial<Omit<Conversion, "id">>;
      };
      commissions: {
        Row: Commission;
        Insert: Omit<Commission, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Commission, "id">>;
      };
      payouts: {
        Row: Payout;
        Insert: Omit<Payout, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Payout, "id">>;
      };
      marketing_materials: {
        Row: MarketingMaterial;
        Insert: Omit<MarketingMaterial, "id" | "created_at">;
        Update: Partial<Omit<MarketingMaterial, "id">>;
      };
      admin_settings: {
        Row: AdminSetting;
        Insert: AdminSetting;
        Update: Partial<AdminSetting>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export interface Profile {
  id: string;
  role: "affiliate" | "admin";
  full_name: string | null;
  phone: string | null;
  website: string | null;
  social_links: Json | null;
  payment_method: Json | null;
  notification_preferences: Json | null;
  language: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface AffiliateApplication {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  website: string | null;
  social_media: string | null;
  reason: string | null;
  status: "pending" | "approved" | "rejected";
  reviewed_by: string | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReferralLink {
  id: string;
  affiliate_id: string;
  code: string;
  campaign_name: string | null;
  product_category: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Click {
  id: string;
  referral_link_id: string;
  visitor_ip: string | null;
  user_agent: string | null;
  country: string | null;
  clicked_at: string;
}

export interface Conversion {
  id: string;
  referral_link_id: string;
  customer_email: string;
  product_type: string | null;
  contract_value: number;
  subscription_type: string | null;
  created_at: string;
}

export interface Commission {
  id: string;
  affiliate_id: string;
  conversion_id: string;
  tier: string;
  rate: number;
  amount: number;
  status: "pending" | "approved" | "rejected" | "paid";
  payout_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Payout {
  id: string;
  affiliate_id: string;
  amount: number;
  payment_method: string;
  status: "pending" | "processing" | "completed" | "failed";
  transaction_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface MarketingMaterial {
  id: string;
  title: string;
  category: string;
  file_url: string;
  thumbnail_url: string | null;
  file_type: string;
  tier_requirement: string | null;
  downloads: number;
  created_at: string;
}

export interface AdminSetting {
  key: string;
  value: Json;
}
