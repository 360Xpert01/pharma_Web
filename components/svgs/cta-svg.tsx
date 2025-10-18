import React from "react";

export function CTASvg() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1440 700"
      preserveAspectRatio="none"
      style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.2))" }}
    >
      {/* Gradient Definition using theme colors */}
      <defs>
        <linearGradient id="topRoundedGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary, #6366f1)" stopOpacity="0.1" />
          <stop offset="20%" stopColor="var(--color-background, #18181b)" stopOpacity="1" />
          <stop offset="60%" stopColor="var(--color-background, #18181b)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--color-background, #18181b)" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Responsive curve: subtle on mobile, more pronounced on desktop */}
      <path
        d="M 0 120 Q 360 60, 720 80 Q 1080 60, 1440 120 L 1440 700 L 0 700 Z"
        fill="url(#topRoundedGradient)"
        className="block md:hidden"
      />
      <path
        d="M 0 300 Q 360 100, 720 120 Q 1080 100, 1440 300 L 1440 700 L 0 700 Z"
        fill="url(#topRoundedGradient)"
        className="hidden md:block"
      />
    </svg>
  );
}
