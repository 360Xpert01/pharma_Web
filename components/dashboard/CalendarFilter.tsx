"use client";

import React, { useState } from "react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarFilterProps {
  onDateChange?: (startDate: Date, endDate: Date) => void;
  className?: string;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

type QuickFilter = "current-month" | "past-month" | "current-quarter" | "past-quarter" | "custom";

export default function CalendarFilter({ onDateChange, className }: CalendarFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [activeFilter, setActiveFilter] = useState<QuickFilter>("current-month");

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(prevMonthDays - i);
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(i);
    }

    return { days, startingDayOfWeek, daysInMonth };
  };

  const { days, startingDayOfWeek, daysInMonth } = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number | null, isPrevMonth: boolean, isNextMonth: boolean) => {
    if (day === null) return;

    let clickedDate: Date;
    if (isPrevMonth) {
      clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, day);
    } else if (isNextMonth) {
      clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day);
    } else {
      clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    }

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: clickedDate, end: null });
      setActiveFilter("custom");
    } else {
      if (clickedDate < selectedRange.start) {
        setSelectedRange({ start: clickedDate, end: selectedRange.start });
      } else {
        setSelectedRange({ start: selectedRange.start, end: clickedDate });
      }
      onDateChange?.(selectedRange.start, clickedDate);
    }
  };

  const handleQuickFilter = (filter: QuickFilter) => {
    setActiveFilter(filter);
    const today = new Date();
    let start: Date, end: Date;

    switch (filter) {
      case "current-month":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "past-month":
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case "current-quarter":
        const currentQuarter = Math.floor(today.getMonth() / 3);
        start = new Date(today.getFullYear(), currentQuarter * 3, 1);
        end = new Date(today.getFullYear(), (currentQuarter + 1) * 3, 0);
        break;
      case "past-quarter":
        const pastQuarter = Math.floor(today.getMonth() / 3) - 1;
        start = new Date(today.getFullYear(), pastQuarter * 3, 1);
        end = new Date(today.getFullYear(), (pastQuarter + 1) * 3, 0);
        break;
      default:
        return;
    }

    setSelectedRange({ start, end });
    onDateChange?.(start, end);
  };

  const formatDisplayDate = () => {
    if (selectedRange.start && selectedRange.end) {
      return `${selectedRange.start.toLocaleDateString()} - ${selectedRange.end.toLocaleDateString()}`;
    } else if (selectedRange.start) {
      return selectedRange.start.toLocaleDateString();
    }
    return `${months[new Date().getMonth()]}, ${new Date().getFullYear()}`;
  };

  const isDateInRange = (day: number | null, isPrevMonth: boolean, isNextMonth: boolean) => {
    if (day === null || !selectedRange.start) return false;

    let date: Date;
    if (isPrevMonth) {
      date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, day);
    } else if (isNextMonth) {
      date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day);
    } else {
      date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    }

    if (selectedRange.end) {
      return date >= selectedRange.start && date <= selectedRange.end;
    }
    return date.getTime() === selectedRange.start.getTime();
  };

  return (
    <>
      <div className={cn("relative", className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-(--gray-1) text-(--gray-9) rounded-8 border border-(--gray-3) hover:bg-(--gray-2) transition-colors"
        >
          <Calendar className="w-4 h-4 text-(--gray-6)" />
          <span className="t-md">{formatDisplayDate()}</span>
          <ChevronDown
            className={cn("w-4 h-4 text-(--gray-6) transition-transform", isOpen && "rotate-180")}
          />
        </button>

        {/* Dropdown Calendar */}
        {isOpen && (
          <div className="absolute top-full mt-2 right-0 w-[600px] bg-(--background) rounded-8 shadow-lg border border-(--gray-2) z-50 overflow-hidden">
            <div className="p-6 flex gap-6">
              {/* Left Side - Calendar */}
              <div className="flex-1">
                {/* Month/Year Header */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-(--gray-1) rounded-8 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-(--gray-6)" />
                  </button>
                  <span className="t-h4 text-(--gray-9)">
                    {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-(--gray-1) rounded-8 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-(--gray-6)" />
                  </button>
                </div>

                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="text-center t-cap text-(--gray-5) py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    const isPrevMonth = index < startingDayOfWeek;
                    const isNextMonth = index >= startingDayOfWeek + daysInMonth;
                    const isInRange = isDateInRange(day, isPrevMonth, isNextMonth);

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateClick(day, isPrevMonth, isNextMonth)}
                        className={cn(
                          "aspect-square flex items-center justify-center rounded-8 transition-colors t-sm",
                          isPrevMonth || isNextMonth ? "text-(--gray-4)" : "text-(--gray-9)",
                          isInRange ? "bg-(--primary) text-white" : "hover:bg-(--gray-1)"
                        )}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Side - Quick Filters */}
              <div className="w-40 border-l border-(--gray-2) pl-6">
                <div className="space-y-2">
                  <button
                    onClick={() => handleQuickFilter("current-month")}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-8 transition-colors t-sm",
                      activeFilter === "current-month"
                        ? "text-(--primary) font-medium"
                        : "text-(--gray-6) hover:bg-(--gray-1)"
                    )}
                  >
                    Current Month
                  </button>
                  <button
                    onClick={() => handleQuickFilter("past-month")}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-8 transition-colors t-sm",
                      activeFilter === "past-month"
                        ? "text-(--primary) font-medium"
                        : "text-(--gray-6) hover:bg-(--gray-1)"
                    )}
                  >
                    Past Month
                  </button>
                  <button
                    onClick={() => handleQuickFilter("current-quarter")}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-8 transition-colors t-sm",
                      activeFilter === "current-quarter"
                        ? "text-(--primary) font-medium"
                        : "text-(--gray-6) hover:bg-(--gray-1)"
                    )}
                  >
                    Current Quarter
                  </button>
                  <button
                    onClick={() => handleQuickFilter("past-quarter")}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-8 transition-colors t-sm",
                      activeFilter === "past-quarter"
                        ? "text-(--primary) font-medium"
                        : "text-(--gray-6) hover:bg-(--gray-1)"
                    )}
                  >
                    Past Quarter
                  </button>
                  <button
                    onClick={() => setActiveFilter("custom")}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-8 transition-colors t-sm",
                      activeFilter === "custom"
                        ? "text-(--primary) font-medium"
                        : "text-blue-500 hover:bg-(--gray-1)"
                    )}
                  >
                    Custom Range
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </>
  );
}
