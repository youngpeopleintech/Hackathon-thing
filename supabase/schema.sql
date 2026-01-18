-- YPIT Hackathon Registration Schema
-- Run this in your Supabase SQL Editor to create the registrations table
-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Step 1: Basic Information
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  age_range TEXT NOT NULL CHECK (age_range IN ('16-20', '21-25', '25+')),
  gender TEXT NOT NULL CHECK (
    gender IN ('male', 'female', 'prefer-not-to-say')
  ),
  city_country TEXT NOT NULL,
  -- Step 2: Project Idea
  problem_statement TEXT NOT NULL,
  proposed_solution TEXT NOT NULL,
  hackathon_track TEXT NOT NULL CHECK (
    hackathon_track IN (
      'health-tech',
      'fintech',
      'ai-emerging-tech',
      'edutech',
      'climate-sustainability'
    )
  ),
  unique_impact TEXT NOT NULL,
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
  has_hackathon_experience BOOLEAN NOT NULL DEFAULT FALSE,
  tools_technologies TEXT,
  team_size INTEGER NOT NULL CHECK (
    team_size >= 1
    AND team_size <= 7
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
COMMENT ON TABLE registrations IS 'YPIT Hackathon registration entries';
