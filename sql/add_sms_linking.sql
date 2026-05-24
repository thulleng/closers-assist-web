-- Add sms_phone to agent_profiles for SMS/text integration
ALTER TABLE agent_profiles 
ADD COLUMN IF NOT EXISTS sms_phone TEXT UNIQUE;

CREATE INDEX IF NOT EXISTS idx_agent_profiles_sms_phone ON agent_profiles(sms_phone);
