"use client";

import { useState, useMemo } from "react";

type SortDirection = "asc" | "desc" | null;

interface UseTableSortReturn<T> {
  sortedData: T[];
  sortBy: keyof T | null;
  sortDirection: SortDirection;
  handleSort: (column: keyof T) => void;
  resetSort: () => void;
}

/**
 * Hook for client-side table sorting
 * Supports multiple column types (string, number, date)
 *
 * @example
 * const { sortedData, sortBy, sortDirection, handleSort } = useTableSort(doctors, 'name');
 *
 * <button onClick={() => handleSort('name')}>
 *   Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
 * </button>
 */
export function useTableSort<T extends Record<string, any>>(
  data: T[],
  initialSortKey?: keyof T,
  initialDirection: SortDirection = null
): UseTableSortReturn<T> {
  const [sortBy, setSortBy] = useState<keyof T | null>(initialSortKey || null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialDirection);

  const handleSort = (column: keyof T) => {
    if (sortBy === column) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortBy(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const resetSort = () => {
    setSortBy(null);
    setSortDirection(null);
  };

  const sortedData = useMemo(() => {
    if (!sortBy || !sortDirection) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      // Handle null/undefined
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      // Number comparison
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      // Date comparison
      if (aVal instanceof Date && bVal instanceof Date) {
        return sortDirection === "asc"
          ? aVal.getTime() - bVal.getTime()
          : bVal.getTime() - aVal.getTime();
      }

      // String comparison (case-insensitive)
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      if (sortDirection === "asc") {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });
  }, [data, sortBy, sortDirection]);

  return {
    sortedData,
    sortBy,
    sortDirection,
    handleSort,
    resetSort,
  };
}
