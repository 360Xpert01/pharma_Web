"use client";
import { type PropsWithChildren, useMemo, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store, persistor } from "@/store";
import { LayoutProvider } from "@/contexts/layout-context";

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  // PersistGate is acceptable in client layout
  const fallback = useMemo(() => <div className="text-sm text-muted-foreground">Loading…</div>, []);
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={fallback} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <LayoutProvider>{children}</LayoutProvider>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
