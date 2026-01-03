'use client';

import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  columns?: 1 | 2 | 3;
  error?: string;
}

export function RadioGroup({ name, options, value, onChange, columns = 2, error }: RadioGroupProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className="space-y-2">
      <div className={`grid ${gridCols[columns]} gap-3`}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`radio-option ${value === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <span className="radio-dot" />
            <span className="text-sm text-navy-800">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

