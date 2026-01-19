"use client";

import React from "react";
import { Textarea } from "@/components/ui/Textarea";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import type { RegistrationData, HackathonTrack } from "@ypit/shared";
import { HACKATHON_TRACK_LABELS } from "@ypit/shared";

interface StepTwoProps {
  data: Partial<RegistrationData>;
  errors: Record<string, string>;
  onChange: (
    field: keyof RegistrationData,
    value: string | boolean | number
  ) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepTwo({
  data,
  errors,
  onChange,
  onNext,
  onBack,
}: StepTwoProps) {
  const trackOptions = Object.entries(HACKATHON_TRACK_LABELS).map(
    ([value, label]) => ({
      value,
      label,
    })
  );

  const ideaOptions = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-navy-900 mb-3">
          Do you have a project idea?
        </label>
        <RadioGroup
          name="hasIdea"
          options={ideaOptions}
          value={data.hasIdea !== undefined ? String(data.hasIdea) : ""}
          onChange={(value) => onChange("hasIdea", value === "true")}
          columns={2}
          error={errors.hasIdea}
        />
      </div>

      {data.hasIdea && (
        <div className="space-y-6 animate-fadeIn">
          <Textarea
            label="What problem are you interested in solving during this hackathon?"
            hint="Short answer"
            placeholder="Describe the problem you want to tackle..."
            value={data.problemStatement || ""}
            onChange={(e) => onChange("problemStatement", e.target.value)}
            error={errors.problemStatement}
          />

          <Textarea
            label="Describe your proposed solution or idea"
            placeholder="What are you building and how does it help?"
            value={data.proposedSolution || ""}
            onChange={(e) => onChange("proposedSolution", e.target.value)}
            error={errors.proposedSolution}
          />

          <div>
            <label className="block text-sm font-medium text-navy-900 mb-3">
              Which hackathon track does your idea fall under?
            </label>
            <RadioGroup
              name="hackathonTrack"
              options={trackOptions}
              value={data.hackathonTrack || ""}
              onChange={(value) =>
                onChange("hackathonTrack", value as HackathonTrack)
              }
              columns={2}
              error={errors.hackathonTrack}
            />
          </div>

          <Textarea
            label="What makes your idea unique or impactful?"
            placeholder="How does your idea impact Africa and the world at large?"
            value={data.uniqueImpact || ""}
            onChange={(e) => onChange("uniqueImpact", e.target.value)}
            error={errors.uniqueImpact}
          />
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={onBack}>
          <svg
            className="w-5 h-5 mr-2 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue to Skills
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
