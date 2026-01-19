"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { CityCountryInput } from "@/components/ui/CityCountryInput";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { Button } from "@/components/ui/Button";
import type { RegistrationData, AgeRange, Gender, InterestType } from "@/lib/types";
import { AGE_RANGE_LABELS, GENDER_LABELS, INTEREST_TYPE_LABELS } from "@/lib/types";

interface StepOneProps {
  data: Partial<RegistrationData>;
  errors: Record<string, string>;
  onChange: (
    field: keyof RegistrationData,
    value: string | boolean | number | string[]
  ) => void;
  onNext: () => void;
}

export function StepOne({ data, errors, onChange, onNext }: StepOneProps) {
  const interestOptions = Object.entries(INTEREST_TYPE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

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
      {/* Interest in YPIT AF - First Question */}
      <div>
        <label className="block text-sm font-medium text-navy-900 mb-1">
          Interest in YPIT AF
        </label>
        <p className="text-xs text-navy-500 mb-3">
          How do you plan to engage? (Select all that apply)
        </p>
        <CheckboxGroup
          name="interests"
          options={interestOptions}
          values={(data.interests as InterestType[]) || []}
          onChange={(values) => onChange("interests", values)}
          columns={2}
          error={errors.interests}
        />
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-3">
            Age
          </label>
          <RadioGroup
            name="ageRange"
            options={ageOptions}
            value={data.ageRange || ""}
            onChange={(value) => onChange("ageRange", value as AgeRange)}
            columns={1}
            error={errors.ageRange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-900 mb-3">
            Gender
          </label>
          <RadioGroup
            name="gender"
            options={genderOptions}
            value={data.gender || ""}
            onChange={(value) => onChange("gender", value as Gender)}
            columns={1}
            error={errors.gender}
          />
        </div>
      </div>

      <CityCountryInput
        label="City & Country"
        placeholder="e.g., Lagos, Nigeria"
        value={data.cityCountry || ""}
        onChange={(value) => onChange("cityCountry", value)}
        error={errors.cityCountry}
      />

      <div className="flex justify-end pt-4">
        <Button onClick={onNext}>
          Continue
          <svg
            className="w-5 h-5 ml-2 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
