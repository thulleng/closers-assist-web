-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- Creates a database trigger that auto-creates an agent_profile row
-- every time a new user signs up via Supabase Auth.

-- Step 1: Create the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.agent_profiles (
    user_id,
    agent_name,
    first_name,
    industry,
    created_at,
    updated_at
  ) VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'agent_name', 'Closer'),
    COALESCE(new.raw_user_meta_data ->> 'first_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data ->> 'industry', 'auto'),
    now(),
    now()
  );
  RETURN new;
END;
$$;

-- Step 2: Wire the trigger to auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
