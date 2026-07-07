-- SQL Schema for PyLearn Curriculum & Auto-save
-- Run this in your Supabase SQL Editor

-- 1. Create modules table
CREATE TABLE IF NOT EXISTS public.modules (
  id bigint PRIMARY KEY,
  title jsonb NOT NULL,
  description jsonb NOT NULL,
  required_xp integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
  id text PRIMARY KEY,
  module_id bigint REFERENCES public.modules(id) ON DELETE CASCADE,
  "order" integer NOT NULL,
  title jsonb NOT NULL,
  content jsonb NOT NULL,
  xp_reward integer NOT NULL DEFAULT 10,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: 'exercises' table already exists, but ensure it has these columns:
-- id (text), module_id (bigint), difficulty (text), "order" (integer), 
-- title (jsonb), description (jsonb), starter_code (text), hint (jsonb), 
-- test_cases (jsonb), xp_reward (integer), is_custom (boolean), created_at (timestamptz)

-- 3. Create user_code table for auto-save
CREATE TABLE IF NOT EXISTS public.user_code (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  exercise_id text NOT NULL,
  code text NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, exercise_id)
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_code ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies
-- Modules: Allow everyone to read, allow anon to insert/update (since admin uses client-side auth)
CREATE POLICY "Allow public read access to modules" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Allow public all access to modules" ON public.modules USING (true) WITH CHECK (true);

-- Lessons: Allow everyone to read, allow anon to insert/update
CREATE POLICY "Allow public read access to lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Allow public all access to lessons" ON public.lessons USING (true) WITH CHECK (true);

-- User Code: Users can only read and write their own code
CREATE POLICY "Users can manage their own code" ON public.user_code
  FOR ALL USING (auth.uid() = user_id);

-- Note: Ensure exercises table also allows read/write if you want admin to edit it from the frontend!
-- CREATE POLICY "Allow public all access to exercises" ON public.exercises USING (true) WITH CHECK (true);
