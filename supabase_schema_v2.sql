-- SQL Schema V2 for PyLearn Security Updates
-- Run this in your Supabase SQL Editor to secure the database

-- 1. Add is_admin column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- (Optional) Make yourself an admin by running this line separately:
-- UPDATE public.profiles SET is_admin = true WHERE username = 'YOUR_USERNAME';

-- 2. Drop the old insecure policies
DROP POLICY IF EXISTS "Allow public all access to modules" ON public.modules;
DROP POLICY IF EXISTS "Allow public all access to lessons" ON public.lessons;
DROP POLICY IF EXISTS "Allow public all access to exercises" ON public.exercises;

-- 3. Re-create secure policies for modules
-- Read: Everyone
-- Write: Only Admins
CREATE POLICY "Admins can manage modules" ON public.modules
  FOR ALL
  USING ( (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true )
  WITH CHECK ( (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true );

-- 4. Re-create secure policies for lessons
CREATE POLICY "Admins can manage lessons" ON public.lessons
  FOR ALL
  USING ( (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true )
  WITH CHECK ( (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true );

-- 5. Re-create secure policies for exercises
-- Ensure RLS is enabled on exercises first
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to exercises" ON public.exercises
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage exercises" ON public.exercises
  FOR ALL
  USING ( (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true )
  WITH CHECK ( (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true );

-- 6. Secure the allpass_config table (if it exists)
-- Prevent public from reading the plaintext passcode
ALTER TABLE IF EXISTS public.allpass_config ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to allpass_config" ON public.allpass_config;
-- Only admins can read/write the passcode
CREATE POLICY "Admins can manage allpass config" ON public.allpass_config
  FOR ALL
  USING ( (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true )
  WITH CHECK ( (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true );
