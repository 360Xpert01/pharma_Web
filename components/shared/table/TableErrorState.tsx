"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface TableErrorStateProps {
  error: string | Error;
  onRetry?: () => void;
  retryText?: string;
  title?: string;
}

/**
 * Reusable error state for all tables
 *
 * @example
 * if (error) return <TableErrorState error={error} onRetry={() => dispatch(fetchData())} />
 *
 * @example
 * if (error) return <TableErrorState error="Failed to load" title="Oops!" />
 */
export default function TableErrorState({
  error,
  onRetry,
  retryText = "Retry",
  title = "Error loading data",
}: TableErrorStateProps) {
  const errorMessage = typeof error === "string" ? error : error.message;

  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="text-center max-w-md">
        <div className="mx-auto w-12 h-12 rounded-full bg-[var(--destructive-0)] flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6 text-[var(--destructive)]" />
        </div>

        <h3 className="text-lg font-semibold text-[var(--gray-9)] mb-2">{title}</h3>

        <p className="text-[var(--gray-6)] mb-4">{errorMessage}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-[var(--primary)] text-[var(--light)] rounded-lg hover:bg-[var(--primary-2)] transition cursor-pointer font-medium"
          >
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
}
