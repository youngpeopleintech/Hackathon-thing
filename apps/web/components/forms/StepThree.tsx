'use client';

import React from 'react';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Button } from '@/components/ui/Button';
import { TagInput } from '@/components/ui/TagInput';
import type { RegistrationData, PrimarySkill, AISkillLevel } from '@/lib/types';
import { PRIMARY_SKILL_LABELS, AI_SKILL_LEVEL_LABELS } from '@/lib/types';

interface StepThreeProps {
  data: Partial<RegistrationData>;
  errors: Record<string, string>;
  onChange: (field: keyof RegistrationData, value: string | boolean | number) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function StepThree({ data, errors, onChange, onSubmit, onBack, isSubmitting }: StepThreeProps) {
  const isHackathonParticipant = data.interests?.includes('hackathon-participant') ?? false;

  const skillOptions = Object.entries(PRIMARY_SKILL_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const aiSkillLevelOptions = Object.entries(AI_SKILL_LEVEL_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const experienceOptions = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-navy-900 mb-3">
          What best describes your primary skill?
        </label>
        <RadioGroup
          name="primarySkill"
          options={skillOptions}
          value={data.primarySkill || ''}
          onChange={(value) => onChange('primarySkill', value as PrimarySkill)}
          columns={2}
          error={errors.primarySkill}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 mb-1">
          AI / Tech Skill Level
        </label>
        <p className="text-xs text-navy-500 mb-3">
          Be honest — this helps us design the experience
        </p>
        <RadioGroup
          name="aiSkillLevel"
          options={aiSkillLevelOptions}
          value={data.aiSkillLevel || ''}
          onChange={(value) => onChange('aiSkillLevel', value as AISkillLevel)}
          columns={1}
          error={errors.aiSkillLevel}
        />
      </div>

      {isHackathonParticipant && (
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-3">
            Have you participated in a hackathon before?
          </label>
          <RadioGroup
            name="hasHackathonExperience"
            options={experienceOptions}
            value={data.hasHackathonExperience !== undefined ? String(data.hasHackathonExperience) : ''}
            onChange={(value) => onChange('hasHackathonExperience', value === 'true')}
            columns={2}
            error={errors.hasHackathonExperience}
          />
        </div>
      )}

      <TagInput
        label="What tools or technologies are you most comfortable with?"
        placeholder="e.g., React, Python, TensorFlow, Figma..."
        value={data.toolsTechnologies || ''}
        onChange={(value) => onChange('toolsTechnologies', value)}
        error={errors.toolsTechnologies}
        maxTags={10}
      />

      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={onBack} disabled={isSubmitting}>
          <svg className="w-5 h-5 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back
        </Button>
        <Button onClick={onSubmit} isLoading={isSubmitting}>
          Submit Registration
        </Button>
      </div>
    </div>
  );
}
