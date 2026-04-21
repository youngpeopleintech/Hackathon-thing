-- Conference waitlist: email + optional name, one row per email
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS conference_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conference_waitlist_email
  ON conference_waitlist(email);

CREATE INDEX IF NOT EXISTS idx_conference_waitlist_created
  ON conference_waitlist(created_at DESC);

-- Reuse the existing update_updated_at_column() trigger function from the
-- registrations schema.
DROP TRIGGER IF EXISTS update_conference_waitlist_updated_at ON conference_waitlist;
CREATE TRIGGER update_conference_waitlist_updated_at
  BEFORE UPDATE ON conference_waitlist
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE conference_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role has full access"
  ON conference_waitlist
  FOR ALL
  USING (TRUE)
  WITH CHECK (TRUE);

GRANT ALL ON conference_waitlist TO service_role;
GRANT SELECT ON conference_waitlist TO anon;

COMMENT ON TABLE conference_waitlist IS 'YPIT AF conference waitlist sign-ups collected before tickets go on sale';