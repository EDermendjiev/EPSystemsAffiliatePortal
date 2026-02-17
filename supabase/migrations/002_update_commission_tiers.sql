-- Update commission tiers: recurring → one-time, new rates aligned with landing page
-- Starter: 10% (0-4 referrals), Professional: 15% (5+ referrals), Elite: 20% (15+ referrals)

UPDATE public.admin_settings
SET value = '{
  "starter": { "rate": 10, "min_conversions": 0 },
  "pro": { "rate": 15, "min_conversions": 5 },
  "elite": { "rate": 20, "min_conversions": 15 }
}'::jsonb
WHERE key = 'commission_tiers';
