import { z } from 'zod';
import type { RegistrationData } from './types';

// Validation schemas for each step
const step1Schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name is too long'),
  email: z.string().email('Please enter a valid email address'),
  ageRange: z.enum(['16-20', '21-25', '25+'], { required_error: 'Please select your age range' }),
  gender: z.enum(['male', 'female', 'prefer-not-to-say'], { required_error: 'Please select your gender' }),
  cityCountry: z.string().min(2, 'Please enter your city and country').max(100, 'Location is too long'),
});

const step2Schema = z.object({
  problemStatement: z.string().min(10, 'Please describe the problem in at least 10 characters').max(1000, 'Problem statement is too long'),
  proposedSolution: z.string().min(10, 'Please describe your solution in at least 10 characters').max(1000, 'Proposed solution is too long'),
  hackathonTrack: z.enum(['health-tech', 'fintech', 'ai-emerging-tech', 'edutech', 'climate-sustainability'], { 
    required_error: 'Please select a hackathon track' 
  }),
  uniqueImpact: z.string().min(10, 'Please explain the impact in at least 10 characters').max(1000, 'Impact description is too long'),
});

const step3Schema = z.object({
  primarySkill: z.enum(['frontend-developer', 'backend-developer', 'mobile-developer', 'ui-ux-designer', 'product-manager', 'data-analyst-ml', 'other'], { 
    required_error: 'Please select your primary skill' 
  }),
  hasHackathonExperience: z.boolean({ required_error: 'Please indicate your hackathon experience' }),
  toolsTechnologies: z.string().min(2, 'Please list at least one tool or technology').max(500, 'Tools list is too long'),
  teamSize: z.number().min(1, 'Team must have at least 1 member').max(7, 'Maximum team size is 7 members'),
  teamMembers: z.string().max(1000, 'Team members description is too long').optional(),
});

type ValidationError = { field: string; message: string };

export function validateStep1(data: Partial<RegistrationData>): ValidationError[] {
  const result = step1Schema.safeParse(data);
  if (result.success) return [];
  
  return result.error.errors.map(err => ({
    field: err.path[0] as string,
    message: err.message,
  }));
}

export function validateStep2(data: Partial<RegistrationData>): ValidationError[] {
  const result = step2Schema.safeParse(data);
  if (result.success) return [];
  
  return result.error.errors.map(err => ({
    field: err.path[0] as string,
    message: err.message,
  }));
}

export function validateStep3(data: Partial<RegistrationData>): ValidationError[] {
  const result = step3Schema.safeParse(data);
  if (result.success) return [];
  
  return result.error.errors.map(err => ({
    field: err.path[0] as string,
    message: err.message,
  }));
}

export const fullRegistrationSchema = step1Schema.merge(step2Schema).merge(step3Schema);

