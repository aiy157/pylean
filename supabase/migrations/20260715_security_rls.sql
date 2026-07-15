-- ============================================================
-- PyLearn — Security Migration
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================================

-- ── 1. Enable Row Level Security on user_progress ──────────
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Users can only read/write their own rows
CREATE POLICY "user_progress_owner_read"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_progress_owner_write"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_progress_owner_update"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_progress_owner_delete"
  ON user_progress FOR DELETE
  USING (auth.uid() = user_id);

-- ── 2. Enable RLS on user_code ─────────────────────────────
ALTER TABLE user_code ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_code_owner_read"
  ON user_code FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_code_owner_write"
  ON user_code FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_code_owner_update"
  ON user_code FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_code_owner_delete"
  ON user_code FOR DELETE
  USING (auth.uid() = user_id);

-- ── 3. XP Validation Trigger ───────────────────────────────
-- Prevents XP from jumping more than 200 per update (max normal reward)
CREATE OR REPLACE FUNCTION validate_xp_increment()
RETURNS TRIGGER AS $$
DECLARE
  old_xp INTEGER;
  new_xp INTEGER;
  diff   INTEGER;
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.xp > 200 THEN
      RAISE EXCEPTION 'Initial XP cannot exceed 200 (got %)', NEW.xp;
    END IF;
    RETURN NEW;
  END IF;

  old_xp := COALESCE(OLD.xp, 0);
  new_xp := COALESCE(NEW.xp, 0);
  diff   := new_xp - old_xp;

  IF diff < 0 THEN
    RAISE EXCEPTION 'XP cannot decrease (% to %)', old_xp, new_xp;
  END IF;

  IF diff > 200 THEN
    RAISE EXCEPTION 'XP increment too large (% in one update, max 200)', diff;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS check_xp_increment ON user_progress;
CREATE TRIGGER check_xp_increment
  BEFORE INSERT OR UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION validate_xp_increment();
