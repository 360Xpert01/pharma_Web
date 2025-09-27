import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Providers from "@/components/providers/providers";
import { LayoutProvider } from "@/contexts/layout-context";
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
          <LayoutProvider>
            <Suspense fallback={null}>
              <Providers>{children}</Providers>
            </Suspense>
          </LayoutProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
