import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Providers from "@/components/providers/providers";
import { LayoutProvider } from "@/contexts/layout-context";
import { ErrorProvider } from "@/contexts/error-context";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import LoaderOverlay from "@/components/shared/loader-overlay";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "NextJS Boilerplate",
  description: "Created By Muhammad Zahid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark", "ocean"]}
        >
          <ErrorProvider maxErrors={10}>
            <ErrorBoundary 
              showDetails={process.env.NODE_ENV === 'development'}
            >
              <LayoutProvider>
                <Suspense 
                  fallback={
                    <LoaderOverlay 
                      isLoading={true} 
                      text="Next Boiler" 
                      variant="default" 
                      size="lg" 
                    />
                  }
                >
                  <Providers>{children}</Providers>
                </Suspense>
              </LayoutProvider>
            </ErrorBoundary>
          </ErrorProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
