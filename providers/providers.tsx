"use client";
import { type PropsWithChildren, useMemo, useState, Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store, persistor } from "@/store";
import { ThemeProvider } from "@/providers/theme-provider";
import { LayoutProvider } from "@/contexts/layout-context";
import { GlobalLoadingProvider } from "@/contexts/global-loading-context";
import LoaderOverlay from "@/components/shared/loader-overlay";
import GlobalLoadingOverlay from "@/components/shared/global-loading-overlay";
import { AppInitializer } from "./app-initializer";
import { Toaster } from "@/components/ui/sonner";
import { ErrorProvider } from "@/contexts/error-context";
import { ErrorBoundary } from "@/components/shared/error-boundary";

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const fallback = useMemo(
    () => <LoaderOverlay isLoading={true} text="Next Boilerplate" variant="default" size="md" />,
    []
  );

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={fallback} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider themes={["light", "dark", "ocean"]}>
            <GlobalLoadingProvider>
              <ErrorProvider maxErrors={10}>
                <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
                  <LayoutProvider>
                    <AppInitializer>
                      <Suspense fallback={fallback}>
                        {children}
                        <GlobalLoadingOverlay />
                        <Toaster />
                      </Suspense>
                    </AppInitializer>
                  </LayoutProvider>
                </ErrorBoundary>
              </ErrorProvider>
            </GlobalLoadingProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
