-- Impact report waitlist. One row per email.
-- Run in the Supabase SQL editor before the public form can save signups.

CREATE TABLE IF NOT EXISTS impact_report_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_impact_report_waitlist_email
  ON impact_report_waitlist(email);

CREATE INDEX IF NOT EXISTS idx_impact_report_waitlist_created
  ON impact_report_waitlist(created_at DESC);

DROP TRIGGER IF EXISTS update_impact_report_waitlist_updated_at ON impact_report_waitlist;
CREATE TRIGGER update_impact_report_waitlist_updated_at
  BEFORE UPDATE ON impact_report_waitlist
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE impact_report_waitlist ENABLE ROW LEVEL SECURITY;

GRANT ALL ON impact_report_waitlist TO service_role;

COMMENT ON TABLE impact_report_waitlist IS 'Emails waiting for The Artificial Future impact report';
