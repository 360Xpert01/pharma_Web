"use client";

import React from "react";

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
  const hasError = !!error;

  const getSelectClasses = () => {
    const baseClasses = "mt-1 w-full h-12 px-4 py-3 border rounded-8 outline-none transition-all";

    if (disabled) {
      return `${baseClasses} border-(--gray-3) bg-(--gray-0) text-(--gray-7) cursor-not-allowed`;
    }

    if (hasError) {
      return `${baseClasses} border-(--destructive) focus:ring-2 focus:ring-(--destructive) focus:border-(--destructive)`;
    }

    return `${baseClasses} border-(--gray-3) focus:ring-2 focus:ring-(--primary) focus:border-(--primary)`;
  };

  return (
    <div className={className}>
      <label className="t-label">
        {label}
        {required && <span className="text-(--destructive)">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
      {hasError && <p className="mt-1 t-sm t-err">{error}</p>}
    </div>
  );
}
