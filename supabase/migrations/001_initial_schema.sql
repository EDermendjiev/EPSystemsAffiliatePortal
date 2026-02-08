-- E&P Systems Affiliate Portal — Initial Schema
-- Run this migration in your Supabase SQL editor

-- ============================================
-- 1. Profiles (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'affiliate' CHECK (role IN ('affiliate', 'admin')),
  full_name TEXT,
  phone TEXT,
  website TEXT,
  social_links JSONB,
  payment_method JSONB,
  notification_preferences JSONB DEFAULT '{"email": true, "dashboard": true}'::jsonb,
  language TEXT NOT NULL DEFAULT 'bg',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, language)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'language', 'bg')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. Affiliate Applications
-- ============================================
CREATE TABLE IF NOT EXISTS public.affiliate_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  social_media TEXT,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.affiliate_applications ENABLE ROW LEVEL SECURITY;

-- Public can submit applications (from landing page)
CREATE POLICY "Anyone can submit applications"
  ON public.affiliate_applications FOR INSERT
  WITH CHECK (true);

-- Admins can read/update all applications
CREATE POLICY "Admins can read applications"
  ON public.affiliate_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update applications"
  ON public.affiliate_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE INDEX idx_applications_status ON public.affiliate_applications(status);
CREATE INDEX idx_applications_email ON public.affiliate_applications(email);

-- ============================================
-- 3. Referral Links
-- ============================================
CREATE TABLE IF NOT EXISTS public.referral_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  campaign_name TEXT,
  product_category TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.referral_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Affiliates can read own links"
  ON public.referral_links FOR SELECT
  USING (auth.uid() = affiliate_id);

CREATE POLICY "Affiliates can insert own links"
  ON public.referral_links FOR INSERT
  WITH CHECK (auth.uid() = affiliate_id);

CREATE POLICY "Affiliates can update own links"
  ON public.referral_links FOR UPDATE
  USING (auth.uid() = affiliate_id);

CREATE POLICY "Admins can read all links"
  ON public.referral_links FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE INDEX idx_referral_links_affiliate ON public.referral_links(affiliate_id);
CREATE INDEX idx_referral_links_code ON public.referral_links(code);

-- ============================================
-- 4. Clicks
-- ============================================
CREATE TABLE IF NOT EXISTS public.clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_link_id UUID NOT NULL REFERENCES public.referral_links(id) ON DELETE CASCADE,
  visitor_ip TEXT,
  user_agent TEXT,
  country TEXT,
  clicked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;

-- Public can insert clicks (tracking endpoint)
CREATE POLICY "Anyone can insert clicks"
  ON public.clicks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Affiliates can read own clicks"
  ON public.clicks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.referral_links
      WHERE referral_links.id = clicks.referral_link_id
      AND referral_links.affiliate_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all clicks"
  ON public.clicks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE INDEX idx_clicks_link ON public.clicks(referral_link_id);
CREATE INDEX idx_clicks_date ON public.clicks(clicked_at);

-- ============================================
-- 5. Conversions
-- ============================================
CREATE TABLE IF NOT EXISTS public.conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_link_id UUID NOT NULL REFERENCES public.referral_links(id) ON DELETE CASCADE,
  customer_email TEXT NOT NULL,
  product_type TEXT,
  contract_value NUMERIC(12,2) NOT NULL DEFAULT 0,
  subscription_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.conversions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Affiliates can read own conversions"
  ON public.conversions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.referral_links
      WHERE referral_links.id = conversions.referral_link_id
      AND referral_links.affiliate_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all conversions"
  ON public.conversions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE INDEX idx_conversions_link ON public.conversions(referral_link_id);

-- ============================================
-- 6. Commissions
-- ============================================
CREATE TABLE IF NOT EXISTS public.commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  conversion_id UUID NOT NULL REFERENCES public.conversions(id),
  tier TEXT NOT NULL DEFAULT 'starter',
  rate NUMERIC(5,2) NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'paid')),
  payout_id UUID REFERENCES public.payouts(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Affiliates can read own commissions"
  ON public.commissions FOR SELECT
  USING (auth.uid() = affiliate_id);

CREATE POLICY "Admins can manage all commissions"
  ON public.commissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE INDEX idx_commissions_affiliate ON public.commissions(affiliate_id);
CREATE INDEX idx_commissions_status ON public.commissions(status);
CREATE INDEX idx_commissions_payout ON public.commissions(payout_id);

-- ============================================
-- 7. Payouts
-- ============================================
CREATE TABLE IF NOT EXISTS public.payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  transaction_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Affiliates can read own payouts"
  ON public.payouts FOR SELECT
  USING (auth.uid() = affiliate_id);

CREATE POLICY "Affiliates can insert own payouts"
  ON public.payouts FOR INSERT
  WITH CHECK (auth.uid() = affiliate_id);

CREATE POLICY "Admins can manage all payouts"
  ON public.payouts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE INDEX idx_payouts_affiliate ON public.payouts(affiliate_id);
CREATE INDEX idx_payouts_status ON public.payouts(status);

-- ============================================
-- 8. Marketing Materials
-- ============================================
CREATE TABLE IF NOT EXISTS public.marketing_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  file_type TEXT NOT NULL,
  tier_requirement TEXT,
  downloads INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.marketing_materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read materials"
  ON public.marketing_materials FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage materials"
  ON public.marketing_materials FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 9. Admin Settings
-- ============================================
CREATE TABLE IF NOT EXISTS public.admin_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read settings"
  ON public.admin_settings FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage settings"
  ON public.admin_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert default settings
INSERT INTO public.admin_settings (key, value) VALUES
  ('cookie_duration', '90'::jsonb),
  ('min_payout_threshold', '50'::jsonb),
  ('payout_day', '15'::jsonb),
  ('commission_tiers', '{
    "starter": { "rate": 20, "min_conversions": 0 },
    "pro": { "rate": 30, "min_conversions": 5 },
    "elite": { "rate": 30, "bonus": 5, "min_conversions": 20 }
  }'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- Updated_at triggers
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.affiliate_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_commissions_updated_at
  BEFORE UPDATE ON public.commissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_payouts_updated_at
  BEFORE UPDATE ON public.payouts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
