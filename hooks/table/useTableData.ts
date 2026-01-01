"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store";
import type { AppDispatch } from "@/store";

interface UseTableDataOptions<T> {
  selector: (state: any) => {
    data: T[];
    loading: boolean;
    error: string | null;
  };
  fetchAction: any; // Redux async thunk
  fetchOnMount?: boolean;
  refetchOnFocus?: boolean;
}

interface UseTableDataReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Unified hook for fetching and managing table data from Redux
 * Handles loading, error states, and provides refetch functionality
 *
 * @example
 * const { data: doctors, loading, error, refetch } = useTableData({
 *   selector: (state) => state.allDoctors,
 *   fetchAction: getAllDoctors,
 * });
 *
 * if (loading) return <TableLoadingState />;
 * if (error) return <TableErrorState error={error} onRetry={refetch} />;
 * if (!doctors.length) return <TableEmptyState />;
 */
export function useTableData<T = any>(options: UseTableDataOptions<T>): UseTableDataReturn<T> {
  const { selector, fetchAction, fetchOnMount = true, refetchOnFocus = false } = options;

  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

  // Get data from Redux state
  const { data, loading, error } = selector((state: any) => state);

  // Fetch function
  const refetch = () => {
    dispatch(fetchAction());
  };

  // Fetch on mount
  useEffect(() => {
    if (fetchOnMount && !hasFetched.current) {
      refetch();
      hasFetched.current = true;
    }
  }, [fetchOnMount]);

  // Refetch on window focus (optional)
  useEffect(() => {
    if (!refetchOnFocus) return;

    const handleFocus = () => {
      refetch();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refetchOnFocus]);

  return {
    data: data || [],
    loading,
    error,
    refetch,
  };
}
