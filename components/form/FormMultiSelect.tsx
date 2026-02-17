"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface FormMultiSelectProps {
  label: string;
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function FormMultiSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select options",
  required = false,
  error = "",
  disabled = false,
  loading = false,
  className = "",
}: FormMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hasError = !!error;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled && !loading) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  const getSelectedLabels = () => {
    return options
      .filter((opt) => value.includes(opt.value))
      .map((opt) => ({ value: opt.value, label: opt.label }));
  };

  const getContainerClasses = () => {
    const baseClasses =
      "relative mt-1 w-[82%] min-h-[48px] px-3 py-2 border rounded-lg bg-white transition-all cursor-pointer";

    if (disabled) {
      return `${baseClasses} border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed`;
    }

    if (hasError) {
      return `${baseClasses} border-red-500 focus-within:ring-2 focus-within:ring-red-200`;
    }

    if (isOpen) {
      return `${baseClasses} border-blue-500 ring-2 ring-blue-100`;
    }

    return `${baseClasses} border-gray-300 hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100`;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Main Container */}
      <div className={getContainerClasses()} onClick={handleToggle}>
        <div className="flex items-center justify-between gap-2 min-h-[32px]">
          {/* Selected Items or Placeholder */}
          <div
            className="flex gap-1.5 flex-1 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {loading ? (
              <span className="text-gray-400 text-sm">Loading...</span>
            ) : value.length === 0 ? (
              <span className="text-gray-400 text-sm">{placeholder}</span>
            ) : (
              getSelectedLabels().map((item) => (
                <span
                  key={item.value}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500 text-white rounded-md text-sm font-medium whitespace-nowrap flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.label}
                  <button
                    type="button"
                    onClick={(e) => handleRemove(item.value, e)}
                    className="hover:bg-blue-600 rounded-full p-0.5 transition-colors flex items-center justify-center"
                    aria-label={`Remove ${item.label}`}
                  >
                    <X size={14} strokeWidth={2.5} className="cursor-pointer" />
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Chevron Icon */}
          <ChevronDown
            size={20}
            className={`text-gray-400 transition-transform flex-shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && !loading && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-4 py-8 text-gray-400 text-center text-sm">
                No options available
              </div>
            ) : (
              options.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`px-4 py-3 cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {/* Custom Checkbox */}
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        isSelected ? "bg-blue-500 border-blue-500" : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm">{option.label}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {hasError && <p className="mt-1 t-sm t-err">{error}</p>}
    </div>
  );
}
