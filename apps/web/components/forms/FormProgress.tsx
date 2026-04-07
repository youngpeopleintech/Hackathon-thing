'use client';

import React from 'react';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: { title: string; subtitle: string }[];
}

export function FormProgress({ currentStep, totalSteps, steps }: FormProgressProps) {
  return (
    <div className="mb-10">
      <div className="af-reg-progress-row flex items-center w-full">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <React.Fragment key={stepNumber}>
              <div className="af-reg-progress-node">
                <div
                  className={`af-reg-progress-circle ${isCompleted ? 'done' : ''} ${isActive ? 'active' : ''} ${
                    !isActive && !isCompleted ? 'todo' : ''
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={`af-reg-progress-label ${isActive ? 'active' : 'inactive'}`}
                >
                  {step.title}
                </span>
              </div>

              {stepNumber < totalSteps && (
                <div className={`af-reg-progress-line ${stepNumber < currentStep ? 'done' : 'todo'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="text-center sm:text-left">
        <p className="af-reg-step-meta">
          Step {currentStep} of {totalSteps}
        </p>
        <h2 className="af-reg-step-title">{steps[currentStep - 1]?.subtitle}</h2>
      </div>
    </div>
  );
}
