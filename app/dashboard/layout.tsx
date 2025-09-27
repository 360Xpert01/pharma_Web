"use client";
import { type PropsWithChildren, useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";
import { DynamicLayout } from "@/components/layout/dynamic-layout";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { config, updateConfig, applyPreset } = useLayout();

  useEffect(() => {
    // Apply dashboard preset if not already configured
    if (!config.header.enabled || !config.sidebar.enabled) {
      applyPreset('dashboard');
    }
  }, [config.header.enabled, config.sidebar.enabled, applyPreset]);

  return (
    <DynamicLayout>
      {children}
    </DynamicLayout>
  );
}
