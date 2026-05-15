-- CRM Read-Only Integration: contacts table
-- Run via Supabase SQL Editor

CREATE TABLE IF NOT EXISTS crm_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  crm_id TEXT,
  customer_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  vehicle_interest TEXT,
  source TEXT,
  notes TEXT,
  last_contact_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Dedup: one CRM lead per user
CREATE UNIQUE INDEX IF NOT EXISTS idx_crm_contacts_user_crm ON crm_contacts(user_id, crm_id) WHERE crm_id IS NOT NULL;

-- Lookup
CREATE INDEX IF NOT EXISTS idx_crm_contacts_user ON crm_contacts(user_id, last_contact_date DESC);
