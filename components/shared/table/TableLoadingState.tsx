"use client";

import React from "react";

interface TableLoadingStateProps {
  message?: string;
  rows?: number;
  columns?: number;
  variant?: "spinner" | "skeleton";
}

/**
 * Reusable loading state for all tables
 *
 * @example
 * if (loading) return <TableLoadingState message="Loading doctors..." />
 *
 * @example
 * if (loading) return <TableLoadingState variant="skeleton" rows={5} columns={4} />
 */
export default function TableLoadingState({
  message = "Loading...",
  rows = 3,
  columns = 4,
  variant = "spinner",
}: TableLoadingStateProps) {
  if (variant === "skeleton") {
    return (
      <div className="w-full space-y-3 animate-pulse">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-[var(--background)] rounded-8 p-4 border border-[var(--gray-2)]"
          >
            <div className="flex gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="flex-1 h-4 bg-[var(--gray-2)] rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-8 border-4 border-solid border-[var(--primary)] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-[var(--gray-6)]">{message}</p>
      </div>
    </div>
  );
}
