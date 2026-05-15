-- Per-Deal Memory Threads: schema additions
-- Run via Supabase SQL editor

-- Add deal status tracking
ALTER TABLE deals ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
-- active = still working, pending = waiting on customer, closed = sold, lost = walked

-- Add last contact date for follow-up
ALTER TABLE deals ADD COLUMN IF NOT EXISTS last_contact_date DATE;

-- Tag agent memories to specific deals
ALTER TABLE agent_memory ADD COLUMN IF NOT EXISTS deal_id UUID REFERENCES deals(id) ON DELETE SET NULL;

-- Index for deal-tagged memory queries
CREATE INDEX IF NOT EXISTS idx_agent_memory_deal_id ON agent_memory(deal_id);

-- Index for deal status filtering
CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(user_id, status);
