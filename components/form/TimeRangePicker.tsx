"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button/button";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeRangePickerProps {
  label: string;
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
  required?: boolean;
  className?: string;
  error?: string;
}

export default function TimeRangePicker({
  label,
  from,
  to,
  onChange,
  required = false,
  className = "",
  error = "",
}: TimeRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatTo12Hour = (timeStr: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${hours12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const displayText =
    from && to ? `${formatTo12Hour(from)} - ${formatTo12Hour(to)}` : "00:00 AM - 00:00 PM";

  return (
    <div className={className}>
      <label className="t-label">
        {label}
        {required && <span className="text-(--destructive)">*</span>}
      </label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "mt-1 w-full h-12 px-4 py-3 text-left font-normal border-(--gray-3) rounded-8 outline-none transition-all focus:ring-2 focus:ring-(--primary) focus:border-(--primary)",
              from ? "text-black" : "text-(--gray-5)"
            )}
            iconRight={Clock}
            iconClassName="h-5 w-5 text-black"
          >
            {displayText}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4 bg-[var(--background)] border border-(--gray-3) rounded-8 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-(--gray-6)">From</label>
              <input
                type="time"
                value={from}
                onChange={(e) => onChange(e.target.value, to)}
                className="h-10 px-2 border border-(--gray-3) rounded-4 outline-none focus:border-(--primary)"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-(--gray-6)">To</label>
              <input
                type="time"
                value={to}
                onChange={(e) => onChange(from, e.target.value)}
                className="h-10 px-2 border border-(--gray-3) rounded-4 outline-none focus:border-(--primary)"
              />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-(--gray-2) flex justify-between items-center">
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
            <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className="t-err mt-1">{error}</p>}
    </div>
  );
}
