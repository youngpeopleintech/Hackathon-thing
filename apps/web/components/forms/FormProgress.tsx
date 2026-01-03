'use client';

import React from 'react';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: { title: string; subtitle: string }[];
}

export function FormProgress({ currentStep, totalSteps, steps }: FormProgressProps) {
  return (
    <div className="mb-8">
      {/* Step indicators */}
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    transition-all duration-300
                    ${isCompleted ? 'bg-navy-900 text-white' : ''}
                    ${isActive ? 'bg-navy-900 text-white ring-4 ring-navy-900/20' : ''}
                    ${!isActive && !isCompleted ? 'bg-gray-100 text-gray-400 border border-gray-200' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium hidden sm:block ${isActive ? 'text-navy-900' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
              
              {stepNumber < totalSteps && (
                <div 
                  className={`
                    flex-1 h-0.5 mx-2 transition-all duration-300
                    ${stepNumber < currentStep ? 'bg-navy-900' : 'bg-gray-200'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Current step info */}
      <div className="text-center sm:text-left">
        <p className="text-navy-500 text-sm">
          Step {currentStep} of {totalSteps}
        </p>
        <h2 className="text-xl font-heading font-bold text-navy-900 mt-1">
          {steps[currentStep - 1]?.subtitle}
        </h2>
      </div>
    </div>
  );
}

