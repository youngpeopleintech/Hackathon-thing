export interface RegistrationData {
  // Step 1: Basic Information & Interest
  interests: InterestType[];
  fullName: string;
  email: string;
  ageRange: AgeRange;
  gender?: Gender;
  cityCountry: string;
  participationType: ParticipationType;

  // Step 2: Project Idea (only if hackathon participant)
  hasIdea?: boolean;
  problemStatement?: string;
  proposedSolution?: string;
  hackathonTrack?: HackathonTrack;
  uniqueImpact?: string;

  // Step 3: Skills & Background
  primarySkill: PrimarySkill;
  aiSkillLevel: AISkillLevel;
  hasHackathonExperience?: boolean;
  toolsTechnologies?: string;
  teamSize?: number;
  teamMembers?: string;
}

export type InterestType =
  | 'hackathon-participant'
  | 'conference-attendee'
  | 'mentor-speaker'
  | 'volunteer'
  | 'sponsor-partner'
  | 'just-exploring';

export type AgeRange = '16-20' | '21-25' | '25+';

export type ParticipationType = 'in-person' | 'virtual' | 'undecided';

export type Gender = 'male' | 'female' | 'prefer-not-to-say';

export type HackathonTrack = 
  | 'health-tech'
  | 'fintech'
  | 'ai-emerging-tech'
  | 'edutech'
  | 'climate-sustainability';

export type PrimarySkill =
  | 'frontend-developer'
  | 'backend-developer'
  | 'mobile-developer'
  | 'ui-ux-designer'
  | 'product-manager'
  | 'data-analyst-ml'
  | 'other';

export type AISkillLevel =
  | 'curious-beginner'
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'non-technical';

export interface RegistrationResponse {
  success: boolean;
  message: string;
  registrationId?: string;
}

export const AGE_RANGE_LABELS: Record<AgeRange, string> = {
  '16-20': '16 - 20 years old',
  '21-25': '21 - 25 years old',
  '25+': '25+ years old',
};

export const GENDER_LABELS: Record<Gender, string> = {
  'male': 'Male',
  'female': 'Female',
  'prefer-not-to-say': 'Prefer not to say',
};

export const HACKATHON_TRACK_LABELS: Record<HackathonTrack, string> = {
  'health-tech': 'Health Tech',
  'fintech': 'Fintech',
  'ai-emerging-tech': 'AI / Emerging Tech',
  'edutech': 'EduTech (Education)',
  'climate-sustainability': 'Climate / Sustainability',
};

export const PRIMARY_SKILL_LABELS: Record<PrimarySkill, string> = {
  'frontend-developer': 'Frontend Developer',
  'backend-developer': 'Backend Developer',
  'mobile-developer': 'Mobile Developer',
  'ui-ux-designer': 'UI/UX Designer',
  'product-manager': 'Product Manager',
  'data-analyst-ml': 'Data Analyst/Machine Learning',
  'other': 'Other',
};

export const AI_SKILL_LEVEL_LABELS: Record<AISkillLevel, string> = {
  'curious-beginner': 'Curious Beginner (new to AI)',
  'beginner': 'Beginner (learning the basics)',
  'intermediate': 'Intermediate (some hands-on projects)',
  'advanced': 'Advanced (building or deploying AI solutions)',
  'non-technical': 'Non-Technical (product, design, business, ops)',
};

export const INTEREST_TYPE_LABELS: Record<InterestType, string> = {
  'hackathon-participant': 'Hackathon Participant',
  'conference-attendee': 'Conference Attendee',
  'mentor-speaker': 'Mentor / Speaker',
  'volunteer': 'Volunteer',
  'sponsor-partner': 'Sponsor / Partner',
  'just-exploring': 'Just exploring for now',
};

export const PARTICIPATION_TYPE_LABELS: Record<ParticipationType, string> = {
  'in-person': 'In-person (Lagos)',
  'virtual': 'Virtually',
  'undecided': 'Not sure yet',
};
