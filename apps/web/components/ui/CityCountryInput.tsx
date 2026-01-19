"use client";

import React, { useState, useEffect, useRef } from "react";

interface CityCountryInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

interface Suggestion {
  name: string;
  city?: string;
  country: string;
  state?: string;
}

export function CityCountryInput({
  label,
  value,
  onChange,
  error,
  placeholder,
}: CityCountryInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync internal state with prop value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Using Photon API (OSM based) - free and simple
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(
          query
        )}&limit=5&lang=en&osm_tag=place:city&osm_tag=place:town`
      );
      const data = await response.json();

      const items = data.features
        .map((feature: any) => ({
          name: feature.properties.name,
          city: feature.properties.city,
          country: feature.properties.country,
          state: feature.properties.state,
        }))
        .filter((item: Suggestion) => item.country); // Ensure country exists

      // Deduplicate suggestions based on formatted string
      const uniqueItems = items.filter(
        (item: Suggestion, index: number, self: Suggestion[]) =>
          index ===
          self.findIndex((t) => formatLocation(t) === formatLocation(item))
      );

      setSuggestions(uniqueItems);
      setIsOpen(true);
    } catch (err) {
      console.error("Failed to fetch cities:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const skipFetch = useRef(false);

  // Simple debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue && !skipFetch.current) {
        fetchSuggestions(inputValue);
      }
      skipFetch.current = false; // Reset flag
    }, 100);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const formatLocation = (item: Suggestion) => {
    const parts = [item.name];
    if (item.state && item.state !== item.name) parts.push(item.state);
    parts.push(item.country);
    return parts.join(", ");
  };

  const handleSelect = (item: Suggestion) => {
    const formatted = formatLocation(item);
    skipFetch.current = true;
    setInputValue(formatted);
    onChange(formatted);
    setIsOpen(false);
    setSuggestions([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInputValue(newVal);

    // Only clear the parent value if the input is cleared
    if (!newVal) {
      onChange("");
      setSuggestions([]);
      setIsOpen(false);
    }
    // Otherwise DO NOT call onChange, forcing user to select from list
  };

  const handleBlur = () => {
    // If user leaves field and input doesn't match the selected value, revert it
    if (inputValue !== value) {
      setInputValue(value);
    }
  };

  return (
    <div className="space-y-2 relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-navy-900">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => inputValue.length >= 3 && setIsOpen(true)}
          placeholder={placeholder}
          className={`input-field ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-400"
              : ""
          }`}
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-navy-900 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-100 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto py-1 animate-fadeIn">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent blur
                handleSelect(item);
              }}
              className="px-4 py-2 hover:bg-navy-50 cursor-pointer text-sm text-navy-900 flex flex-col"
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-xs text-navy-500">
                {[item.state, item.country].filter(Boolean).join(", ")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
