import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { urduFont } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Providers from "@/providers/providers";
import "../globals.css";

// Poppins – Google se direct load
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Ceturo",
  description: "Premium Pharma CRM Dashboard",
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params; // ❗️ no await

  let messages: Record<string, any> = {};
  try {
    messages = (await getMessages({ locale })) ?? {};
  } catch (error) {
    console.warn("Translation messages failed to load:", error);
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${poppins.variable} ${GeistSans.variable} ${GeistMono.variable} ${urduFont.variable}`}
    >
      <body className="font-poppins antialiased bg-gray-50 text-gray-900">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
          {/* <Analytics /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
