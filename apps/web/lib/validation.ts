import { z } from 'zod';
import type { RegistrationData } from './types';

const hackathonFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name is too long'),
  email: z.string().email('Please enter a valid email address'),
  cityCountry: z.string().min(2, 'Please enter your city and country').max(100, 'Location is too long'),
  participationType: z.enum(['in-person', 'virtual', 'undecided'], { required_error: 'Please select how you plan to participate' }),
  primarySkill: z.enum(['frontend-developer', 'backend-developer', 'fullstack-developer', 'mobile-developer', 'ai-ml-engineer', 'data-scientist-analyst', 'ui-ux-designer', 'product-manager', 'devops-cloud', 'cybersecurity', 'researcher-academic', 'business-strategy', 'other'], { required_error: 'Please select your primary skill' }),
  aiSkillLevel: z.enum(['curious-beginner', 'beginner', 'intermediate', 'advanced', 'non-technical'], { required_error: 'Please select your AI/Tech comfort level' }),
  ageRange: z.enum(['16-20', '21-25', '25+'], { required_error: 'Please select your age range' }),
});

type ValidationError = { field: string; message: string };

export function validateStep1(data: Partial<RegistrationData>): ValidationError[] {
  const result = hackathonFormSchema.safeParse(data);
  if (result.success) return [];
  return result.error.errors.map(err => ({
    field: err.path[0] as string,
    message: err.message,
  }));
}

// Kept for compatibility — not used in simplified flow
export function validateStep2(): ValidationError[] { return []; }
export function validateStep3(): ValidationError[] { return []; }

export const fullRegistrationSchema = hackathonFormSchema;
