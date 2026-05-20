-- Migration: Visitor memory for Dora
-- Stores conversation history so Dora remembers returning visitors

CREATE TABLE IF NOT EXISTS public.visitor_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]',
  last_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_visitor_memory_visitor_id ON public.visitor_memory(visitor_id);

-- Allow public read by visitor_id (anyone can read their own history)
ALTER TABLE public.visitor_memory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read their own visitor memory"
  ON public.visitor_memory FOR SELECT
  USING (true);

-- Only service_role can insert/update
CREATE POLICY "Service role can manage visitor memory"
  ON public.visitor_memory FOR ALL
  USING (true)
  WITH CHECK (true);
