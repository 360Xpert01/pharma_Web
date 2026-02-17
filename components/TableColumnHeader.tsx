"use client";

import React from "react";

interface Column {
  label: string;
  className?: string; // For custom column-specific styling (e.g., width)
}

interface TableColumnHeaderProps {
  columns: Column[];
  containerClassName?: string; // For the outer wrapper styling
  gridCols?: number; // For grid layout (e.g., 5 for grid-cols-5)
  showBackground?: boolean; // Whether to show the gray background (default: true)
}

export default function TableColumnHeader({
  columns,
  containerClassName,
  gridCols,
  showBackground = true,
}: TableColumnHeaderProps) {
  // Determine if we're using grid or flex layout
  const isGridLayout = gridCols !== undefined;

  // Map grid column count to Tailwind classes (required for Tailwind purging)
  const gridColsMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
  };

  // Build the inner flex/grid container classes
  const innerContainerClasses = isGridLayout
    ? `flex-1 grid ${gridColsMap[gridCols]} gap-6`
    : containerClassName;

  return (
    <div className={`px-3 mb-3 ${showBackground ? "bg-[var(--background)] rounded-8 py-3" : ""}`}>
      <div className={isGridLayout ? "flex items-center justify-between gap-6" : ""}>
        <div className={innerContainerClasses}>
          {columns.map((column, index) => (
            <div key={index} className={column.className || ""}>
              <p className="t-th capitalize tracking-wider">{column.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
