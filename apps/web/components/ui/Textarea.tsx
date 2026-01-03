'use client';

import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function Textarea({ label, hint, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-navy-900">
        {label}
        {hint && <span className="text-navy-500 font-normal ml-2 text-xs">({hint})</span>}
      </label>
      <textarea
        className={`input-field min-h-[100px] resize-y ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

