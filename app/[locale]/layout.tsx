import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { urduFont } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Providers from "@/providers/providers";
import LoaderOverlay from "@/components/shared/loader-overlay";
import { Suspense } from "react";
import "../globals.css";

export const metadata: Metadata = {
  title: "NextJs",
  description: "",
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  // Load localized messages and fall back to an empty object on error to avoid client chunk failures
  let messages: any = {};
  try {
    messages = await getMessages({ locale });
  } catch (e) {
    messages = {};
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* <Suspense
            fallback={<LoaderOverlay isLoading text="Next Boiler..." variant="default" size="lg" />}
          > */}
          <Providers>{children}</Providers>
          {/* </Suspense> */}
        </NextIntlClientProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
