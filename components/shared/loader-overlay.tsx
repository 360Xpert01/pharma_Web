"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Loader2 } from "@/lib/icons";

interface LoaderOverlayProps {
  isLoading: boolean;
  text?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "dots";
  showOverlay?: boolean;
}

// Improved Spinner Component with moving animation
const SpinnerVariants = {
  default: ({ size, isDark, mounted }: { size: string; isDark: boolean; mounted: boolean }) => (
    <div className="relative">
      <Loader2
        className={cn(
          "animate-spin",
          mounted ? "text-primary" : "text-primary",
          size === "h-8 w-8" ? "h-8 w-8" : size === "h-12 w-12" ? "h-12 w-12" : "h-10 w-10"
        )}
      />
    </div>
  ),

  minimal: ({ size, isDark, mounted }: { size: string; isDark: boolean; mounted: boolean }) => (
    <div
      className={cn(
        "animate-spin rounded-8 border-2 border-t-transparent",
        mounted ? "border-white dark:border-white" : "border-white",
        size
      )}
    />
  ),

  dots: ({ size, isDark, mounted }: { size: string; isDark: boolean; mounted: boolean }) => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "animate-bounce rounded-8",
            mounted ? "bg-(--background) dark:bg-(--background)" : "bg-(--background)",
            size === "h-8 w-8" ? "h-2 w-2" : size === "h-12 w-12" ? "h-3 w-3" : "h-4 w-4"
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  ),
};

const LoaderOverlay: React.FC<LoaderOverlayProps> = ({
  isLoading,
  text = "Next Boilerplate",
  size = "md",
  variant = "default",
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before using theme to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isLoading) return null;

  // Loader is always white, no dark/light mode logic

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const textSizeClasses = {
    sm: "text-lg sm:text-xl",
    md: "text-xl sm:text-2xl md:text-3xl",
    lg: "text-2xl sm:text-3xl md:text-4xl",
  };

  const SpinnerComponent = SpinnerVariants[variant];

  // Color for spinner and text
  const loaderColor = "text-(--light)";
  const textColor = "text-(--dark)";

  return (
    <div
      className={cn(
        "fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-sm transition-all duration-300",
        "bg-(--background)/90"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center space-y-6 p-8">
        <div className="relative">
          {/* Pass loaderColor as className override for spinner */}
          <span className={loaderColor}>
            <SpinnerComponent size={sizeClasses[size]} isDark={false} mounted={mounted} />
          </span>
        </div>

        <div className="text-center">
          <h2
            className={cn(
              "font-bold tracking-wider animate-pulse",
              textSizeClasses[size],
              textColor
            )}
            style={{ textShadow: "0 2px 8px rgba(255, 255, 255, 0.3)" }}
          >
            {text}
          </h2>
          <div className="mt-2 flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn("h-1 w-1 rounded-8 animate-pulse", "bg-(--background)/60")}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderOverlay;
