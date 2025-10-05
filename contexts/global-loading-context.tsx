"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface LoadingState {
  isLoading: boolean;
  text?: string;
  variant?: "default" | "minimal" | "dots";
  size?: "sm" | "md" | "lg";
}

interface GlobalLoadingContextType {
  loadingState: LoadingState;
  setLoading: (loading: boolean, options?: Omit<LoadingState, "isLoading">) => void;
  withLoading: <T>(
    asyncFn: () => Promise<T>,
    options?: Omit<LoadingState, "isLoading">
  ) => Promise<T>;
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined);

export const useGlobalLoading = () => {
  const context = useContext(GlobalLoadingContext);
  if (!context) {
    throw new Error("useGlobalLoading must be used within a GlobalLoadingProvider");
  }
  return context;
};

interface GlobalLoadingProviderProps {
  children: ReactNode;
  defaultText?: string;
  defaultVariant?: "default" | "minimal" | "dots";
  defaultSize?: "sm" | "md" | "lg";
}

export const GlobalLoadingProvider: React.FC<GlobalLoadingProviderProps> = ({
  children,
  defaultText = "Loading...",
  defaultVariant = "default",
  defaultSize = "md",
}) => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    text: defaultText,
    variant: defaultVariant,
    size: defaultSize,
  });

  const setLoading = useCallback((loading: boolean, options?: Omit<LoadingState, "isLoading">) => {
    setLoadingState((prev) => ({
      ...prev,
      isLoading: loading,
      ...options,
    }));
  }, []);

  const withLoading = useCallback(
    async <T,>(
      asyncFn: () => Promise<T>,
      options?: Omit<LoadingState, "isLoading">
    ): Promise<T> => {
      setLoading(true, options);
      try {
        const result = await asyncFn();
        return result;
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  return (
    <GlobalLoadingContext.Provider value={{ loadingState, setLoading, withLoading }}>
      {children}
    </GlobalLoadingContext.Provider>
  );
};
