"use client";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type LayoutContextValue = {
  header: boolean;
  setHeader: (v: boolean) => void;
};

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

export function LayoutProvider({ children }: PropsWithChildren) {
  const [header, setHeaderState] = useState<boolean>(true);
  const setHeader = useCallback((v: boolean) => setHeaderState(v), []);
  const value = useMemo(() => ({ header, setHeader }), [header, setHeader]);
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used within LayoutProvider");
  return ctx;
}
