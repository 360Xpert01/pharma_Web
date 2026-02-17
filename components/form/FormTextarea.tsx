"use client";

import React from "react";

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  className?: string;
}

export default function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  error = "",
  disabled = false,
  readOnly = false,
  rows = 4,
  className = "",
}: FormTextareaProps) {
  const hasError = !!error;

  const getInputClasses = () => {
    const baseClasses =
      "mt-1 w-full px-4 py-3 border rounded-8 outline-none transition-all resize-none";

    if (readOnly || disabled) {
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
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        className={getInputClasses()}
      />
      {hasError && <p className="mt-1 t-sm t-err">{error}</p>}
    </div>
  );
}
