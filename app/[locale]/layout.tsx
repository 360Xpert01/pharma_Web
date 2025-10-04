import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { urduFont } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Providers from "@/components/providers/providers";
import { LayoutProvider } from "@/contexts/layout-context";
import { ErrorProvider } from "@/contexts/error-context";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import LoaderOverlay from "@/components/shared/loader-overlay";
import { Suspense } from "react";
import "../globals.css";

export const metadata: Metadata = {
  title: "NextJS Boilerplate",
  description: "Created By Muhammad Zahid",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  const bodyClasses =
    locale === "ur"
      ? `font-urdu ${urduFont.variable} ${GeistSans.variable} ${GeistMono.variable} antialiased`
      : `font-sans ${GeistSans.variable} ${GeistMono.variable} ${urduFont.variable} antialiased`;

  return (
    <html lang={locale} suppressHydrationWarning dir={locale === "ur" ? "rtl" : "ltr"}>
      <body className={bodyClasses}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={["light", "dark", "ocean"]}
          >
            <ErrorProvider maxErrors={10}>
              <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
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
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
