-- YPIT Hackathon Registration Schema
-- Run this in your Supabase SQL Editor to create the registrations table
-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Step 1: Basic Information & Interests
  interests TEXT[] NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  age_range TEXT NOT NULL CHECK (age_range IN ('16-20', '21-25', '25+')),
  gender TEXT NOT NULL CHECK (
    gender IN ('male', 'female', 'prefer-not-to-say')
  ),
  city_country TEXT NOT NULL,
  participation_type TEXT CHECK (
    participation_type IS NULL
    OR participation_type IN ('in-person', 'virtual', 'undecided')
  ),
  -- Step 2: Project Idea (optional, only for hackathon participants)
  has_idea BOOLEAN,
  problem_statement TEXT,
  proposed_solution TEXT,
  hackathon_track TEXT CHECK (
    hackathon_track IS NULL OR hackathon_track IN (
      'health-tech',
      'fintech',
      'ai-emerging-tech',
      'edutech',
      'climate-sustainability'
    )
  ),
  unique_impact TEXT,
  -- Step 3: Skills & Background
  primary_skill TEXT NOT NULL CHECK (
    primary_skill IN (
      'frontend-developer',
      'backend-developer',
      'mobile-developer',
      'ui-ux-designer',
      'product-manager',
      'data-analyst-ml',
      'other'
    )
  ),
  ai_skill_level TEXT NOT NULL CHECK (
    ai_skill_level IN (
      'curious-beginner',
      'beginner',
      'intermediate',
      'advanced',
      'non-technical'
    )
  ),
  has_hackathon_experience BOOLEAN NOT NULL DEFAULT FALSE,
  tools_technologies TEXT,
  team_size INTEGER CHECK (
    team_size IS NULL OR (team_size >= 1 AND team_size <= 7)
  ),
  team_members TEXT,
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  confirmation_sent BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- Create index on hackathon_track for statistics queries
CREATE INDEX IF NOT EXISTS idx_registrations_track ON registrations(hackathon_track);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_registrations_created ON registrations(created_at DESC);

-- Create index on interests for filtering by interest type
CREATE INDEX IF NOT EXISTS idx_registrations_interests ON registrations USING GIN(interests);

-- Create index on participation_type for filtering in-person vs virtual
CREATE INDEX IF NOT EXISTS idx_registrations_participation_type ON registrations(participation_type);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_registrations_updated_at ON registrations;
CREATE TRIGGER update_registrations_updated_at BEFORE
UPDATE ON registrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (full access for backend)
CREATE POLICY "Service role has full access" ON registrations FOR ALL USING (TRUE) WITH CHECK (TRUE);

-- Grant permissions
GRANT ALL ON registrations TO service_role;
GRANT SELECT ON registrations TO anon;

-- Comment on table
COMMENT ON TABLE registrations IS 'YPIT AF registration entries - supports hackathon participants, conference attendees, mentors, volunteers, sponsors, and explorers';

-- Conference waitlist table
CREATE TABLE IF NOT EXISTS conference_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conference_waitlist_email ON conference_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_conference_waitlist_created ON conference_waitlist(created_at DESC);

DROP TRIGGER IF EXISTS update_conference_waitlist_updated_at ON conference_waitlist;
CREATE TRIGGER update_conference_waitlist_updated_at BEFORE
UPDATE ON conference_waitlist FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE conference_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role has full access" ON conference_waitlist FOR ALL USING (TRUE) WITH CHECK (TRUE);

GRANT ALL ON conference_waitlist TO service_role;
GRANT SELECT ON conference_waitlist TO anon;

COMMENT ON TABLE conference_waitlist IS 'YPIT AF conference waitlist sign-ups collected before tickets go on sale';
