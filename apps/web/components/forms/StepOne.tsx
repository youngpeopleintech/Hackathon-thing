"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { CityCountryInput } from "@/components/ui/CityCountryInput";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import type { RegistrationData, AgeRange, ParticipationType, PrimarySkill, AISkillLevel } from "@/lib/types";
import { AGE_RANGE_LABELS, PARTICIPATION_TYPE_LABELS, PRIMARY_SKILL_LABELS, AI_SKILL_LEVEL_LABELS } from "@/lib/types";

interface StepOneProps {
  data: Partial<RegistrationData>;
  errors: Record<string, string>;
  onChange: (field: keyof RegistrationData, value: string | boolean | number | string[]) => void;
  onNext: () => void;
}

export function StepOne({ data, errors, onChange, onNext }: StepOneProps) {
  const participationOptions = Object.entries(PARTICIPATION_TYPE_LABELS).map(([value, label]) => ({ value, label }));
  const skillOptions = Object.entries(PRIMARY_SKILL_LABELS).map(([value, label]) => ({ value, label }));
  const aiLevelOptions = Object.entries(AI_SKILL_LEVEL_LABELS).map(([value, label]) => ({ value, label }));
  const ageOptions = Object.entries(AGE_RANGE_LABELS).map(([value, label]) => ({ value, label }));

  return (
    <div className="space-y-6">
      <Input
        label="Full Name"
        placeholder="Enter your first and last name"
        value={data.fullName || ""}
        onChange={(e) => onChange("fullName", e.target.value)}
        error={errors.fullName}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="your.email@example.com"
        value={data.email || ""}
        onChange={(e) => onChange("email", e.target.value)}
        error={errors.email}
      />

      <CityCountryInput
        label="City & Country"
        placeholder="e.g., Lagos, Nigeria"
        value={data.cityCountry || ""}
        onChange={(value) => onChange("cityCountry", value)}
        error={errors.cityCountry}
      />

      <div>
        <label className="block text-sm font-medium text-navy-900 mb-1">
          How do you plan to participate?
        </label>
        <p className="text-xs text-navy-500 mb-3">The hackathon runs in Lagos and online simultaneously.</p>
        <RadioGroup
          name="participationType"
          options={participationOptions}
          value={data.participationType || ""}
          onChange={(value) => onChange("participationType", value as ParticipationType)}
          columns={3}
          error={errors.participationType}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 mb-2">
          What best describes your primary skill?
        </label>
        <select
          className="af-reg-select"
          value={data.primarySkill || ""}
          onChange={(e) => onChange("primarySkill", e.target.value as PrimarySkill)}
        >
          <option value="" disabled>Select your primary skill...</option>
          {skillOptions.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.primarySkill && <p className="af-reg-field-error">{errors.primarySkill}</p>}
        {data.primarySkill === 'other' && (
          <Input
            label=""
            placeholder="Please describe your skill or background"
            value={data.primarySkillOther || ""}
            onChange={(e) => onChange("primarySkillOther", e.target.value)}
            error={errors.primarySkillOther}
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 mb-1">
          AI / Tech comfort level
        </label>
        <p className="text-xs text-navy-500 mb-3">Be honest — this helps us design the experience.</p>
        <RadioGroup
          name="aiSkillLevel"
          options={aiLevelOptions}
          value={data.aiSkillLevel || ""}
          onChange={(value) => onChange("aiSkillLevel", value as AISkillLevel)}
          columns={1}
          error={errors.aiSkillLevel}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 mb-3">Age</label>
        <RadioGroup
          name="ageRange"
          options={ageOptions}
          value={data.ageRange || ""}
          onChange={(value) => onChange("ageRange", value as AgeRange)}
          columns={3}
          error={errors.ageRange}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onNext}>
          Register for the Hackathon
          <svg className="w-5 h-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
