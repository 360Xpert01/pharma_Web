"use client";

import React, { useState } from "react";
import { ListFilter, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  label: string;
  options: FilterOption[];
}

interface FilterDropdownProps {
  filters?: FilterConfig[];
  onApply?: (filters: Record<string, string>) => void;
  onClear?: () => void;
  className?: string;
}

const defaultFilters: FilterConfig[] = [
  {
    label: "Role",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Manager", value: "manager" },
      { label: "Sales Rep", value: "sales_rep" },
      { label: "Doctor", value: "doctor" },
      { label: "Pharmacist", value: "pharmacist" },
    ],
  },
  {
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Pending", value: "pending" },
      { label: "Suspended", value: "suspended" },
    ],
  },
  {
    label: "Date Range",
    options: [
      { label: "Last 30 Days", value: "last_30" },
      { label: "Last 7 Days", value: "last_7" },
      { label: "This Month", value: "this_month" },
      { label: "Last Month", value: "last_month" },
      { label: "Custom Range", value: "custom" },
    ],
  },
];

export default function FilterDropdown({
  filters = defaultFilters,
  onApply,
  onClear,
  className,
}: FilterDropdownProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (filterLabel: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterLabel]: value,
    }));
  };

  const handleApply = () => {
    onApply?.(selectedFilters);
    setIsFilterOpen(false);
  };

  const handleClear = () => {
    setSelectedFilters({});
    onClear?.();
  };

  return (
    <>
      <div className={cn("relative", className)}>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-center p-3.5 bg-(--primary) text-(--light) rounded-8 cursor-pointer transition-colors shadow-soft hover:bg-(--primary-2)"
          aria-label="Filter"
        >
          <ListFilter className="w-4 h-4" />
        </button>

        {/* Filter Dropdown */}
        {isFilterOpen && (
          <div className="absolute cursor-pointer right-0 mt-2 w-72 bg-(--background) rounded-8 shadow-soft border border-(--gray-2) z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-5 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="t-h4">Filter by</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-(--gray-4) hover:text-(--gray-6) transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dynamic Filters */}
              {filters.map((filter, index) => (
                <div key={index}>
                  <label className="t-label block mb-1.5">{filter.label}</label>
                  <select
                    value={selectedFilters[filter.label] || filter.options[0].value}
                    onChange={(e) => handleFilterChange(filter.label, e.target.value)}
                    className="w-full px-3 py-2.5 border border-(--gray-3) rounded-8 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition"
                  >
                    {filter.options.map((option, optIndex) => (
                      <option key={optIndex} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  onClick={handleClear}
                  className="flex-1 px-4 py-2.5 border border-(--gray-3) text-(--gray-7) rounded-8 text-sm font-medium hover:bg-(--gray-0) transition"
                >
                  Clear All
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 px-4 py-2.5 bg-(--primary) text-(--light) rounded-8 text-sm font-medium hover:bg-(--primary-2) transition shadow-soft"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay when filter is open */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-40 bg-opacity-10" onClick={() => setIsFilterOpen(false)} />
      )}
    </>
  );
}
