-- Task 1: Agent Personality Profiles — Database Migration
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/wirzlrscphwwwyywztxu/sql/new
-- Copy and paste this entire file.

-- 1. Add personality_profile column if it doesn't exist
ALTER TABLE agent_profiles 
ADD COLUMN IF NOT EXISTS personality_profile JSONB DEFAULT '{}'::jsonb;

COMMENT ON COLUMN agent_profiles.personality_profile IS 'Persistent agent personality — voice_tone, communication style, quirks, shorthand. Evolves over time via weekly learning cron.';

-- 2. Update the auto-create trigger to include default personality
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_industry text;
  v_personality jsonb;
BEGIN
  v_industry := COALESCE(new.raw_user_meta_data ->> 'industry', 'auto');

  -- Default personality per industry
  v_personality := CASE v_industry
    WHEN 'auto' THEN '{"voice_tone":"straight-talking lot veteran","communication":"direct punches, short sentences","quirks":"references commission math constantly","shorthand":"calls customers by first name, says look before big points"}'
    WHEN 'real-estate' THEN '{"voice_tone":"calm strategist","communication":"detailed but warm","quirks":"quotes market stats off the cuff","shorthand":"refers to properties by address"}'
    WHEN 'insurance' THEN '{"voice_tone":"trusted advisor","communication":"consultative, zero jargon","quirks":"starts sentences with honestly or here is the thing","shorthand":"uses premium shorthand"}'
    WHEN 'solar' THEN '{"voice_tone":"numbers-driven closer","communication":"fast and confident","quirks":"always circles back to ROI","shorthand":"talks in kilowatt-hours and payback periods"}'
    WHEN 'saas' THEN '{"voice_tone":"strategic enterprise voice","communication":"precise and process-oriented","quirks":"uses MEDDIC terminology naturally","shorthand":"ARPU, CAC, LTV fluent"}'
    WHEN 'medical' THEN '{"voice_tone":"clinical precision","communication":"evidence-based, respectful","quirks":"references studies and outcomes","shorthand":"comfortable with medical terminology"}'
    WHEN 'retail' THEN '{"voice_tone":"energetic floor manager","communication":"enthusiastic and practical","quirks":"uses attachment-selling language","shorthand":"calls add-ons 'upgrades'"}'
    WHEN 'roofing' THEN '{"voice_tone":"blue-collar straight shooter","communication":"no-BS, practical","quirks":"references weather and seasons","shorthand":"talks squares and materials"}'
    WHEN 'hvac' THEN '{"voice_tone":"diagnostic problem-solver","communication":"methodical, honest","quirks":"thinks in system diagnostics","shorthand":"SEER, tonnage, BTU fluent"}'
    WHEN 'pest-control' THEN '{"voice_tone":"protective neighborhood expert","communication":"reassuring, urgent when needed","quirks":"references seasonal pest patterns","shorthand":"comfortable with pest biology terms"}'
    ELSE '{"voice_tone":"direct and confident","communication":"short sentences, concrete numbers","quirks":"pushes for the close naturally","shorthand":""}'
  END;

  INSERT INTO public.agent_profiles (
    user_id,
    agent_name,
    first_name,
    industry,
    personality_profile,
    created_at,
    updated_at
  ) VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'agent_name', 'Closer'),
    COALESCE(new.raw_user_meta_data ->> 'first_name', split_part(new.email, '@', 1)),
    v_industry,
    v_personality,
    now(),
    now()
  );
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
