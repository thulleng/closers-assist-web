-- Run this in Supabase SQL Editor
-- https://supabase.com/dashboard/project/wirzlrscphwwwyywztxu/sql/new
--
-- Adds provisioning columns to agent_profiles.
-- Without these, the Stripe webhook creates a Hetzner VM but
-- can't save the server link — the whole payment flow silently fails.

ALTER TABLE agent_profiles 
ADD COLUMN IF NOT EXISTS hetzner_server_id INTEGER;

ALTER TABLE agent_profiles 
ADD COLUMN IF NOT EXISTS hetzner_server_ip TEXT;

ALTER TABLE agent_profiles 
ADD COLUMN IF NOT EXISTS provisioning_status TEXT DEFAULT 'pending';
