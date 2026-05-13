-- Add telegram_chat_id to agent_profiles for Telegram bot integration
-- Users link their Telegram account by starting a chat with @ClosersAssistBot

ALTER TABLE agent_profiles 
ADD COLUMN IF NOT EXISTS telegram_chat_id BIGINT UNIQUE;

-- Index for fast lookup by telegram_chat_id (webhook lookup)
CREATE INDEX IF NOT EXISTS idx_agent_profiles_telegram_chat_id ON agent_profiles(telegram_chat_id);
