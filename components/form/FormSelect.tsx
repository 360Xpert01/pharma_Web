"use client";

import React, { useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  selectClassName?: string;
}

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  error = "",
  disabled = false,
  loading = false,
  className = "",
  selectClassName = "",
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasError = !!error;

  const getSelectClasses = () => {
    const baseClasses =
      "mt-1 w-full h-12 px-4 pr-10 py-3 border rounded-8 outline-none transition-all appearance-none";

    if (disabled) {
      return `${baseClasses} border-(--gray-3) bg-(--gray-0) text-(--gray-7) cursor-not-allowed`;
    }

    if (hasError) {
      return `${baseClasses} border-(--destructive) focus:ring-2 focus:ring-(--destructive) focus:border-(--destructive)`;
    }

    return `${baseClasses} border-(--gray-3) focus:ring-2 focus:ring-(--primary) focus:border-(--primary)`;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      <label className="t-label">
        {label}
        {required && <span className="text-(--destructive)"> *</span>}
      </label>

      {/* Select */}
      <select
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(false);
          e.target.blur();
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || loading}
        className={`${getSelectClasses()} ${selectClassName}`}
      >
        <option value="">{loading ? "Loading..." : placeholder}</option>

        {!loading &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>

      {/* Custom Dropdown Icon */}
      <span
        className={`pointer-events-none absolute right-4 top-[45px] text-black transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {/* Error */}
      {hasError && <p className="mt-1 t-sm t-err">{error}</p>}
    </div>
  );
}
