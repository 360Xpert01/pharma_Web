"use client";
import React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface LoaderOverlayProps {
  isLoading: boolean;
  text?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "dots";
}

// Spinner Component with Strategy Pattern
const SpinnerVariants = {
  default: ({ size, isDark }: { size: string; isDark: boolean }) => (
    <div className="relative">
      <div
        className={cn(
          "animate-spin rounded-full border-4 border-t-transparent",
          size,
          isDark 
            ? "border-primary border-t-transparent" 
            : "border-primary border-t-transparent"
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30",
          size === "h-8 w-8" ? "h-4 w-4" : 
          size === "h-12 w-12" ? "h-6 w-6" : "h-8 w-8",
          "bg-primary"
        )}
      />
    </div>
  ),
  
  minimal: ({ size, isDark }: { size: string; isDark: boolean }) => (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-t-transparent border-primary",
        size
      )}
    />
  ),
  
  dots: ({ size, isDark }: { size: string; isDark: boolean }) => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "animate-bounce rounded-full bg-primary",
            size === "h-8 w-8" ? "h-2 w-2" : 
            size === "h-12 w-12" ? "h-3 w-3" : "h-4 w-4"
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
};

const LoaderOverlay: React.FC<LoaderOverlayProps> = ({ 
  isLoading, 
  text = "Next Boiler",
  size = "md",
  variant = "default"
}) => {
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  if (!isLoading) return null;

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };

  const textSizeClasses = {
    sm: "text-lg sm:text-xl",
    md: "text-xl sm:text-2xl md:text-3xl",
    lg: "text-2xl sm:text-3xl md:text-4xl"
  };

  const SpinnerComponent = SpinnerVariants[variant];

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-sm transition-all duration-300",
        isDark 
          ? "bg-black/80" 
          : "bg-white/80"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center space-y-6 p-8">
        <div className="relative">
          <SpinnerComponent 
            size={sizeClasses[size]} 
            isDark={isDark}
          />
        </div>
        
        <div className="text-center">
          <h2 
            className={cn(
              "font-bold tracking-wider animate-pulse",
              textSizeClasses[size],
              isDark ? "text-white" : "text-gray-900"
            )}
            style={{
              textShadow: isDark 
                ? "0 2px 8px rgba(59, 130, 246, 0.5)" 
                : "0 2px 8px rgba(59, 130, 246, 0.3)"
            }}
          >
            {text}
          </h2>
          <div className="mt-2 flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1 w-1 rounded-full animate-pulse",
                  isDark ? "bg-primary/60" : "bg-primary/40"
                )}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoaderOverlay;
