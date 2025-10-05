"use client";
import { type PropsWithChildren, useMemo, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store, persistor } from "@/store";
import { LayoutProvider } from "@/contexts/layout-context";
import { GlobalLoadingProvider } from "@/contexts/global-loading-context";
import LoaderOverlay from "@/components/shared/loader-overlay";
import GlobalLoadingOverlay from "@/components/shared/global-loading-overlay";
import { AppInitializer } from "./app-initializer";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  // Use LoaderOverlay instead of plain text for PersistGate
  const fallback = useMemo(
    () => <LoaderOverlay isLoading={true} text="Next Boilerplate" variant="default" size="md" />,
    []
  );

  return (
    <GlobalLoadingProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={fallback} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <LayoutProvider>
              <AppInitializer>
                {children}
                <GlobalLoadingOverlay />
                <Toaster />
              </AppInitializer>
            </LayoutProvider>
          </QueryClientProvider>
        </PersistGate>
      </ReduxProvider>
    </GlobalLoadingProvider>
  );
}
