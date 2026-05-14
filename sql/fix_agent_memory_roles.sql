-- Allow memory roles: fact, summary, obsidian
-- Run this in Supabase SQL Editor: https://wirzlrscphwwwyywztxu.supabase.co → SQL Editor

ALTER TABLE agent_memory DROP CONSTRAINT IF EXISTS agent_memory_role_check;
ALTER TABLE agent_memory ADD CONSTRAINT agent_memory_role_check 
  CHECK (role IN ('user', 'assistant', 'fact', 'summary', 'obsidian'));
