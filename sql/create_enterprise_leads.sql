-- Run this in Supabase SQL Editor alongside create_subscriptions.sql
-- Stores enterprise booking form submissions

CREATE TABLE IF NOT EXISTS enterprise_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    team_size TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);
