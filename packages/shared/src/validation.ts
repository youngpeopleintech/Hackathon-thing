import type { RegistrationData } from './types';

export interface ValidationError {
  field: keyof RegistrationData;
  message: string;
}

export function validateStep1(data: Partial<RegistrationData>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.interests || data.interests.length === 0) {
    errors.push({ field: 'interests', message: 'Please select at least one interest' });
  }

  if (!data.fullName?.trim()) {
    errors.push({ field: 'fullName', message: 'Full name is required' });
  }

  if (!data.email?.trim()) {
    errors.push({ field: 'email', message: 'Email address is required' });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!data.ageRange) {
    errors.push({ field: 'ageRange', message: 'Please select your age range' });
  }

  if (!data.gender) {
    errors.push({ field: 'gender', message: 'Please select your gender' });
  }

  if (!data.cityCountry?.trim()) {
    errors.push({ field: 'cityCountry', message: 'City and country is required' });
  }

  return errors;
}

// Helper to check if user is a hackathon participant
export function isHackathonParticipant(data: Partial<RegistrationData>): boolean {
  return data.interests?.includes('hackathon-participant') ?? false;
}

export function validateStep2(data: Partial<RegistrationData>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Only validate if user is a hackathon participant
  if (!isHackathonParticipant(data)) {
    return errors;
  }

  if (data.hasIdea === undefined) {
    errors.push({ field: 'hasIdea', message: 'Please select if you have a project idea' });
  }

  if (data.hasIdea) {
    if (!data.problemStatement?.trim()) {
      errors.push({ field: 'problemStatement', message: 'Please describe the problem you want to solve' });
    }

    if (!data.proposedSolution?.trim()) {
      errors.push({ field: 'proposedSolution', message: 'Please describe your proposed solution' });
    }

    if (!data.hackathonTrack) {
      errors.push({ field: 'hackathonTrack', message: 'Please select a hackathon track' });
    }

    if (!data.uniqueImpact?.trim()) {
      errors.push({ field: 'uniqueImpact', message: 'Please describe what makes your idea unique' });
    }
  }

  return errors;
}

export function validateStep3(data: Partial<RegistrationData>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.primarySkill) {
    errors.push({ field: 'primarySkill', message: 'Please select your primary skill' });
  }

  if (!data.aiSkillLevel) {
    errors.push({ field: 'aiSkillLevel', message: 'Please select your AI/Tech skill level' });
  }

  // Only require hackathon experience for hackathon participants
  if (isHackathonParticipant(data) && data.hasHackathonExperience === undefined) {
    errors.push({ field: 'hasHackathonExperience', message: 'Please indicate your hackathon experience' });
  }

  return errors;
}

export function validateRegistration(data: Partial<RegistrationData>): ValidationError[] {
  return [
    ...validateStep1(data),
    ...validateStep2(data),
    ...validateStep3(data),
  ];
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

