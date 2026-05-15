-- Add whatsapp_phone to agent_profiles for WhatsApp integration
ALTER TABLE agent_profiles 
ADD COLUMN IF NOT EXISTS whatsapp_phone TEXT UNIQUE;

CREATE INDEX IF NOT EXISTS idx_agent_profiles_whatsapp_phone ON agent_profiles(whatsapp_phone);
