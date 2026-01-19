'use client';

import React from 'react';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  name: string;
  options: CheckboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  columns?: 1 | 2 | 3;
  error?: string;
}

export function CheckboxGroup({ 
  name, 
  options, 
  values, 
  onChange, 
  columns = 2,
  error 
}: CheckboxGroupProps) {
  const handleToggle = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter(v => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div>
      <div className={`grid ${gridCols[columns]} gap-3`}>
        {options.map((option) => {
          const isChecked = values.includes(option.value);
          return (
            <label
              key={option.value}
              className={`
                flex items-center gap-3 p-4 rounded-xl cursor-pointer
                transition-all duration-200 border-2
                ${isChecked 
                  ? 'bg-cyan-50 border-cyan-500 text-navy-900' 
                  : 'bg-white border-navy-200 text-navy-700 hover:border-navy-300 hover:bg-navy-50'
                }
              `}
            >
              <input
                type="checkbox"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={() => handleToggle(option.value)}
                className="sr-only"
              />
              <div className={`
                w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
                transition-all duration-200
                ${isChecked 
                  ? 'bg-cyan-500 border-cyan-500' 
                  : 'border-navy-300 bg-white'
                }
              `}>
                {isChecked && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="font-medium text-sm">{option.label}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

