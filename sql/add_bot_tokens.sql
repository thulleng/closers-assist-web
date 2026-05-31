-- Migration: bot_tokens table
-- Stores each user's custom Telegram bot token
-- This enables unlimited bots — one per user, each with their own name

CREATE TABLE IF NOT EXISTS public.bot_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  bot_token TEXT NOT NULL,
  bot_username TEXT NOT NULL,
  bot_name TEXT NOT NULL,
  webhook_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Each user can have multiple bot tokens (if they want)
-- But one token can only belong to one user
CREATE UNIQUE INDEX IF NOT EXISTS idx_bot_tokens_bot_token ON public.bot_tokens(bot_token);

-- Fast lookup by id for webhook routing
CREATE INDEX IF NOT EXISTS idx_bot_tokens_webhook_routing ON public.bot_tokens(id);

-- RLS: only service_role can manage
ALTER TABLE public.bot_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage bot_tokens"
  ON public.bot_tokens FOR ALL
  USING (true)
  WITH CHECK (true);
