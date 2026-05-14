-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- Adds stripe_session_id column to subscriptions table
-- for linking checkout sessions to provisioned accounts.

ALTER TABLE subscriptions 
ADD COLUMN IF NOT EXISTS stripe_session_id TEXT;

CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_session_id 
ON subscriptions(stripe_session_id);
