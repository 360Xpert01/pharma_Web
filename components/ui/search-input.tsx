"use client";

import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  width?: string;
}

export default function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  className,
  width = "w-full sm:w-64",
}: SearchInputProps) {
  const [internalValue, setInternalValue] = React.useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(internalValue);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-(--gray-9) pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "pl-10 pr-4 py-2.5 bg-(--gray-2) text-(--gray-9) rounded-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-(--light) transition-all duration-200",
          width
        )}
      />
    </div>
  );
}
