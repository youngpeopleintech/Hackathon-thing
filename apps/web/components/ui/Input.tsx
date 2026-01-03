'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-navy-900">
        {label}
      </label>
      <input
        className={`input-field ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

