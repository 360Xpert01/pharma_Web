"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button/button";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayRangePickerProps {
  label: string;
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
  required?: boolean;
  className?: string;
  error?: string;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function DayRangePicker({
  label,
  from,
  to,
  onChange,
  required = false,
  className = "",
  error = "",
}: DayRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDayClick = (day: string) => {
    if (!from || (from && to)) {
      onChange(day, "");
    } else {
      const fromIndex = DAYS.indexOf(from);
      const toIndex = DAYS.indexOf(day);

      if (toIndex < fromIndex) {
        // If selected day is before 'from', make it the new 'from'
        onChange(day, "");
      } else {
        onChange(from, day);
        setIsOpen(false);
      }
    }
  };

  const displayText = from && to ? `${from} - ${to}` : from ? `${from} - ...` : "Select day range";

  const hasError = !!error;

  const getInputClasses = () => {
    const baseClasses =
      "mt-1 w-full h-12 px-4 py-3 border rounded-8 outline-none transition-all cursor-pointer";

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
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <input
              type="text"
              readOnly
              aria-invalid={hasError}
              value={from && to ? `${from} - ${to}` : from ? `${from} - ...` : ""}
              placeholder="Select day range"
              className={`${getInputClasses()} ${from ? "text-black" : "text-(--gray-5)"}`}
            />
            <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 mt-0.5 h-5 w-5 text-black pointer-events-none" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3 bg-[var(--background)] border border-(--gray-3) rounded-8 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {DAYS.map((day) => {
              const isFrom = from === day;
              const isTo = to === day;
              const fromIndex = DAYS.indexOf(from);
              const toIndex = DAYS.indexOf(to);
              const currentIndex = DAYS.indexOf(day);
              const isInRange = from && to && currentIndex > fromIndex && currentIndex < toIndex;

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={cn(
                    "px-3 py-2 text-left text-sm rounded-4 transition-colors",
                    (isFrom || isTo) && "bg-(--primary) text-white",
                    isInRange && "bg-(--primary-light) text-(--primary)",
                    !isFrom && !isTo && !isInRange && "hover:bg-(--gray-1)"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-(--gray-2) flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onChange("", "");
                setIsOpen(false);
              }}
            >
              Clear
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className="mt-1 t-sm t-err">{error}</p>}
    </div>
  );
}
