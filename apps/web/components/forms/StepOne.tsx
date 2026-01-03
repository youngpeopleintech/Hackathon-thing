'use client';

import React from 'react';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Button } from '@/components/ui/Button';
import type { RegistrationData, AgeRange, Gender } from '@ypit/shared';
import { AGE_RANGE_LABELS, GENDER_LABELS } from '@ypit/shared';

interface StepOneProps {
  data: Partial<RegistrationData>;
  errors: Record<string, string>;
  onChange: (field: keyof RegistrationData, value: string | boolean | number) => void;
  onNext: () => void;
}

export function StepOne({ data, errors, onChange, onNext }: StepOneProps) {
  const ageOptions = Object.entries(AGE_RANGE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const genderOptions = Object.entries(GENDER_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <div className="space-y-6">
      <Input
        label="Full Name"
        placeholder="Enter your first and last name"
        value={data.fullName || ''}
        onChange={(e) => onChange('fullName', e.target.value)}
        error={errors.fullName}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="your.email@example.com"
        value={data.email || ''}
        onChange={(e) => onChange('email', e.target.value)}
        error={errors.email}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-3">Age</label>
          <RadioGroup
            name="ageRange"
            options={ageOptions}
            value={data.ageRange || ''}
            onChange={(value) => onChange('ageRange', value as AgeRange)}
            columns={1}
            error={errors.ageRange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-900 mb-3">Gender</label>
          <RadioGroup
            name="gender"
            options={genderOptions}
            value={data.gender || ''}
            onChange={(value) => onChange('gender', value as Gender)}
            columns={1}
            error={errors.gender}
          />
        </div>
      </div>

      <Input
        label="City & Country"
        placeholder="e.g., Lagos, Nigeria"
        value={data.cityCountry || ''}
        onChange={(e) => onChange('cityCountry', e.target.value)}
        error={errors.cityCountry}
      />

      <div className="flex justify-end pt-4">
        <Button onClick={onNext}>
          Continue to Project Idea
          <svg className="w-5 h-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

