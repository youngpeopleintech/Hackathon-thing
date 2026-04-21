-- Add participation_type to registrations
-- Optional field: 'in-person' | 'virtual' | 'undecided'
ALTER TABLE registrations
  ADD COLUMN IF NOT EXISTS participation_type TEXT
  CHECK (
    participation_type IS NULL
    OR participation_type IN ('in-person', 'virtual', 'undecided')
  );

CREATE INDEX IF NOT EXISTS idx_registrations_participation_type
  ON registrations(participation_type);
