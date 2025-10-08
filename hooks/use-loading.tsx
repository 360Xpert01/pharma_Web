"use client";

import { useCallback } from "react";
import { useGlobalLoading } from "@/contexts/global-loading-context";

export interface UseLoadingOptions {
  text?: string;
  variant?: "default" | "minimal" | "dots";
  size?: "sm" | "md" | "lg";
}

export const useLoading = (defaultOptions?: UseLoadingOptions) => {
  const { loadingState, setLoading, withLoading } = useGlobalLoading();

  const startLoading = useCallback(
    (options?: UseLoadingOptions) => {
      setLoading(true, { ...defaultOptions, ...options });
    },
    [setLoading, defaultOptions]
  );

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  const executeWithLoading = useCallback(
    <T,>(asyncFn: () => Promise<T>, options?: UseLoadingOptions): Promise<T> => {
      return withLoading(asyncFn, { ...defaultOptions, ...options });
    },
    [withLoading, defaultOptions]
  );

  const executeWithLoadingAndErrorHandling = useCallback(
    <T,>(
      asyncFn: () => Promise<T>,
      options?: UseLoadingOptions & {
        onError?: (error: any) => void;
        onSuccess?: (result: T) => void;
      }
    ): Promise<T | null> => {
      const { onError, onSuccess, ...loadingOptions } = options || {};

      return new Promise(async (resolve) => {
        try {
          const result = await withLoading(asyncFn, { ...defaultOptions, ...loadingOptions });
          onSuccess?.(result);
          resolve(result);
        } catch (error) {
          onError?.(error);
          console.error("Error in async operation:", error);
          resolve(null);
        }
      });
    },
    [withLoading, defaultOptions]
  );

  return {
    isLoading: loadingState.isLoading,
    loadingState,
    startLoading,
    stopLoading,
    executeWithLoading,
    executeWithLoadingAndErrorHandling,
  };
};
