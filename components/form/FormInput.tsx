"use client";

import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "date" | "number" | "password";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  inputClassName?: string;
}

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  error = "",
  disabled = false,
  readOnly = false,
  className = "",
  inputClassName = "",
}: FormInputProps) {
  const hasError = !!error;

  const getInputClasses = () => {
    const baseClasses = "mt-1 w-full px-4 py-3 border rounded-xl outline-none transition-all";

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
      <label className="block text-sm font-medium text-(--gray-7)">
        {label}
        {required && <span className="text-(--destructive)">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={`${getInputClasses()} ${inputClassName}`}
      />
      {hasError && <p className="mt-1 text-sm text-(--destructive)">{error}</p>}
    </div>
  );
}
