"use client";

import React from "react";
import { Inbox } from "lucide-react";

interface TableEmptyStateProps {
  message?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    text: string;
    onClick: () => void;
  };
}

/**
 * Reusable empty state for all tables
 *
 * @example
 * if (!data.length) return <TableEmptyState message="No doctors found" />
 *
 * @example
 * if (!data.length) return (
 *   <TableEmptyState
 *     message="No teams yet"
 *     action={{ text: "Create Team", onClick: handleCreate }}
 *   />
 * )
 */
export default function TableEmptyState({
  message = "No data found",
  description,
  icon,
  action,
}: TableEmptyStateProps) {
  return (
    <div className="w-full flex items-center justify-center py-16">
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 rounded-full bg-(--gray-1) flex items-center justify-center mb-4">
          {icon || <Inbox className="w-8 h-8 text-(--gray-5)" />}
        </div>

        <h3 className="text-lg font-semibold text-[var(--gray-9)] mb-2">{message}</h3>

        {description && <p className="text-[var(--gray-6)] mb-4">{description}</p>}

        {action && (
          <button
            onClick={action.onClick}
            className="px-4 py-2 bg-(--primary) text-[var(--light)] rounded-lg hover:bg-(--primary-2) transition cursor-pointer font-medium"
          >
            {action.text}
          </button>
        )}
      </div>
    </div>
  );
}
