'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

// Common technologies/tools for suggestions
const SUGGESTED_TECHNOLOGIES = [
  // Frontend
  'React', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Sass', 'Redux', 'Zustand',
  // Backend
  'Node.js', 'Express.js', 'NestJS', 'Python', 'Django', 'Flask', 'FastAPI', 'Java', 'Spring Boot', 'Go', 'Rust', 'Ruby', 'Ruby on Rails', 'PHP', 'Laravel', 'C#', '.NET',
  // Mobile
  'React Native', 'Flutter', 'Swift', 'SwiftUI', 'Kotlin', 'Android', 'iOS', 'Expo',
  // Database
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Supabase', 'Firebase', 'Prisma', 'GraphQL',
  // AI/ML
  'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenAI API', 'LangChain', 'Hugging Face', 'Pandas', 'NumPy', 'Jupyter',
  // Cloud & DevOps
  'AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Vercel', 'Netlify', 'Heroku', 'Linux', 'Git', 'GitHub', 'GitLab', 'CI/CD',
  // Design
  'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'Canva', 'Framer',
  // Other
  'REST API', 'WebSocket', 'Blockchain', 'Solidity', 'Web3', 'Ethereum', 'Unity', 'Unreal Engine', 'Three.js', 'WebGL',
];

interface TagInputProps {
  label: string;
  placeholder?: string;
  value: string; // comma-separated tags
  onChange: (value: string) => void;
  error?: string;
  maxTags?: number;
}

export function TagInput({ 
  label, 
  placeholder = 'Type to search or add...', 
  value, 
  onChange, 
  error,
  maxTags = 10
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse current tags from comma-separated string
  const tags = value ? value.split(',').map(t => t.trim()).filter(Boolean) : [];

  // Filter suggestions based on input
  const filteredSuggestions = inputValue.length > 0
    ? SUGGESTED_TECHNOLOGIES.filter(tech => 
        tech.toLowerCase().includes(inputValue.toLowerCase()) &&
        !tags.some(tag => tag.toLowerCase() === tech.toLowerCase())
      ).slice(0, 8)
    : [];

  // Check if input matches any suggestion exactly (case-insensitive)
  const exactMatch = SUGGESTED_TECHNOLOGIES.find(
    tech => tech.toLowerCase() === inputValue.toLowerCase()
  );

  // Show "Create new" option if no exact match and input has value
  const showCreateOption = inputValue.length > 0 && 
    !exactMatch && 
    !tags.some(tag => tag.toLowerCase() === inputValue.toLowerCase());

  const addTag = useCallback((tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;
    if (tags.length >= maxTags) return;
    if (tags.some(t => t.toLowerCase() === trimmedTag.toLowerCase())) return;

    const newTags = [...tags, trimmedTag];
    onChange(newTags.join(', '));
    setInputValue('');
    setIsOpen(false);
    setHighlightedIndex(0);
  }, [tags, maxTags, onChange]);

  const removeTag = useCallback((indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    onChange(newTags.join(', '));
  }, [tags, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalOptions = filteredSuggestions.length + (showCreateOption ? 1 : 0);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % totalOptions);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + totalOptions) % totalOptions);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (totalOptions > 0) {
        if (highlightedIndex < filteredSuggestions.length) {
          addTag(filteredSuggestions[highlightedIndex]);
        } else if (showCreateOption) {
          addTag(inputValue);
        }
      } else if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset highlight when suggestions change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [inputValue]);

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-navy-900 mb-2">
        {label}
      </label>
      
      <div 
        className={`
          flex flex-wrap gap-2 p-3 rounded-lg border-2 bg-white
          transition-colors duration-200 cursor-text min-h-[48px]
          ${error 
            ? 'border-red-300 focus-within:border-red-500' 
            : 'border-navy-200 focus-within:border-cyan-500'
          }
        `}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Tags */}
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium border border-cyan-200"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="ml-1 hover:text-cyan-900 focus:outline-none"
              aria-label={`Remove ${tag}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}

        {/* Input */}
        {tags.length < maxTags && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : 'Add more...'}
            className="flex-1 min-w-[120px] outline-none bg-transparent text-navy-900 placeholder:text-navy-400"
          />
        )}
      </div>

      {/* Suggestions dropdown */}
      {isOpen && (filteredSuggestions.length > 0 || showCreateOption) && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-navy-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addTag(suggestion)}
              className={`
                w-full px-4 py-2.5 text-left text-sm transition-colors
                ${index === highlightedIndex 
                  ? 'bg-cyan-50 text-cyan-700' 
                  : 'text-navy-700 hover:bg-navy-50'
                }
              `}
            >
              <span className="font-medium">{suggestion}</span>
            </button>
          ))}
          
          {showCreateOption && (
            <button
              type="button"
              onClick={() => addTag(inputValue)}
              className={`
                w-full px-4 py-2.5 text-left text-sm transition-colors border-t border-navy-100
                ${highlightedIndex === filteredSuggestions.length 
                  ? 'bg-cyan-50 text-cyan-700' 
                  : 'text-navy-700 hover:bg-navy-50'
                }
              `}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create "<span className="font-medium">{inputValue}</span>"
              </span>
            </button>
          )}
        </div>
      )}

      {/* Helper text */}
      <div className="mt-1.5 flex justify-between text-xs">
        <span className={error ? 'text-red-500' : 'text-navy-500'}>
          {error || 'Type to search or create new tags'}
        </span>
        <span className="text-navy-400">
          {tags.length}/{maxTags} tags
        </span>
      </div>
    </div>
  );
}

