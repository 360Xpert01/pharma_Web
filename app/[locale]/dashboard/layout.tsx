"use client";

import { type PropsWithChildren, useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";

// Import Poppins directly yahan (sirf dashboard ke liye)
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-poppins",
});

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { config, updateConfig, applyPreset } = useLayout();

  useEffect(() => {
    if (!config.header.enabled || !config.sidebar.enabled) {
      applyPreset("dashboard");
    }
  }, [config.header.enabled, config.sidebar.enabled, applyPreset]);

  return (
    <div className={`${poppins.className} min-h-screen bg-gray-50`}>
      <DynamicLayout>{children}</DynamicLayout>
    </div>
  );
}
