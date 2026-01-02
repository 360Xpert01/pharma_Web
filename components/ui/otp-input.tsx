"use client";

import { useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export function OTPInput({
  length = 4,
  value,
  onChange,
  onComplete,
  disabled = false,
  error = false,
  className,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Split value into array of characters
  const values = value.split("").slice(0, length);
  while (values.length < length) {
    values.push("");
  }

  const focusInput = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  };

  const handleChange = (index: number, newValue: string) => {
    // Only allow digits
    const digit = newValue.replace(/[^0-9]/g, "").slice(-1);

    const newValues = [...values];
    newValues[index] = digit;
    const newOTP = newValues.join("");

    onChange(newOTP);

    // Auto-focus next input
    if (digit && index < length - 1) {
      focusInput(index + 1);
    }

    // Call onComplete if all fields are filled
    if (digit && newOTP.length === length && onComplete) {
      onComplete(newOTP);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace") {
      e.preventDefault();
      if (values[index]) {
        // Clear current input
        handleChange(index, "");
      } else if (index > 0) {
        // Move to previous input and clear it
        focusInput(index - 1);
        handleChange(index - 1, "");
      }
    }
    // Handle left arrow
    else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    }
    // Handle right arrow
    else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .replace(/[^0-9]/g, "")
      .slice(0, length);

    onChange(pastedData);

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, length - 1);
    focusInput(nextIndex);

    // Call onComplete if pasted data fills all fields
    if (pastedData.length === length && onComplete) {
      onComplete(pastedData);
    }
  };

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {values.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className={cn(
            "w-12 h-12 md:w-14 md:h-14 text-center text-lg md:text-xl font-semibold",
            "rounded-8 border-2 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            error
              ? "border-destructive focus:ring-destructive"
              : "border-input focus:border-primary focus:ring-primary",
            disabled && "opacity-50 cursor-not-allowed bg-muted",
            "bg-background"
          )}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
