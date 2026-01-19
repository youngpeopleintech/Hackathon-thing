import { z } from 'zod';
import type { RegistrationData } from './types';

// Validation schemas for each step
const step1Schema = z.object({
  interests: z.array(z.enum([
    'hackathon-participant',
    'conference-attendee',
    'mentor-speaker',
    'volunteer',
    'sponsor-partner',
    'just-exploring',
  ])).min(1, 'Please select at least one interest'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name is too long'),
  email: z.string().email('Please enter a valid email address'),
  ageRange: z.enum(['16-20', '21-25', '25+'], { required_error: 'Please select your age range' }),
  gender: z.enum(['male', 'female', 'prefer-not-to-say'], { required_error: 'Please select your gender' }),
  cityCountry: z.string().min(2, 'Please enter your city and country').max(100, 'Location is too long'),
});

const step2IdeaSchema = z.object({
  hasIdea: z.literal(true),
  problemStatement: z.string().min(10, 'Please describe the problem in at least 10 characters').max(1000, 'Problem statement is too long'),
  proposedSolution: z.string().min(10, 'Please describe your solution in at least 10 characters').max(1000, 'Proposed solution is too long'),
  hackathonTrack: z.enum(['health-tech', 'fintech', 'ai-emerging-tech', 'edutech', 'climate-sustainability'], { 
    required_error: 'Please select a hackathon track' 
  }),
  uniqueImpact: z.string().min(10, 'Please explain the impact in at least 10 characters').max(1000, 'Impact description is too long'),
});

const step2NoIdeaSchema = z.object({
  hasIdea: z.literal(false),
  problemStatement: z.string().optional(),
  proposedSolution: z.string().optional(),
  hackathonTrack: z.enum(['health-tech', 'fintech', 'ai-emerging-tech', 'edutech', 'climate-sustainability']).optional(),
  uniqueImpact: z.string().optional(),
});

const step2Schema = z.discriminatedUnion('hasIdea', [
  step2IdeaSchema,
  step2NoIdeaSchema,
], {
  errorMap: (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_union_discriminator) {
      return { message: "Please select if you have a project idea" };
    }
    return { message: ctx.defaultError };
  }
});

const step3BaseSchema = z.object({
  primarySkill: z.enum(['frontend-developer', 'backend-developer', 'mobile-developer', 'ui-ux-designer', 'product-manager', 'data-analyst-ml', 'other'], { 
    required_error: 'Please select your primary skill' 
  }),
  aiSkillLevel: z.enum(['curious-beginner', 'beginner', 'intermediate', 'advanced', 'non-technical'], {
    required_error: 'Please select your AI/Tech skill level'
  }),
  toolsTechnologies: z.string().max(500, 'Tools list is too long').optional(),
});

const step3HackathonSchema = step3BaseSchema.extend({
  hasHackathonExperience: z.boolean({ required_error: 'Please indicate your hackathon experience' }),
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
  // Only validate if user is a hackathon participant
  if (!data.interests?.includes('hackathon-participant')) {
    return [];
  }
  
  const result = step2Schema.safeParse(data);
  if (result.success) return [];
  
  return result.error.errors.map(err => ({
    field: err.path[0] as string,
    message: err.message,
  }));
}

export function validateStep3(data: Partial<RegistrationData>): ValidationError[] {
  const isHackathonParticipant = data.interests?.includes('hackathon-participant') ?? false;
  const schema = isHackathonParticipant ? step3HackathonSchema : step3BaseSchema;
  
  const result = schema.safeParse(data);
  if (result.success) return [];
  
  return result.error.errors.map(err => ({
    field: err.path[0] as string,
    message: err.message,
  }));
}

export const fullRegistrationSchema = step1Schema.and(step3BaseSchema);
