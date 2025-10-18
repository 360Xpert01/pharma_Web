"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useLayout } from "@/contexts/layout-context";
import { withLazyLoading } from "@/lib/lazy-loading";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { Header } from "./components/header";
import { HeroSection } from "./components/hero-section";
import { PricingSection } from "@/components/shared/pricing-section";

const LazyDynamicLayout = withLazyLoading(DynamicLayout, {
  fallbackText: "Loading page layout...",
  fallbackVariant: "default",
  fallbackSize: "md",
});

export default function HomePage() {
  const { applyPreset, updateConfig } = useLayout();
  const t = useTranslations("home");
  const params = useParams();
  const isUrdu = params.locale === "ur";

  useEffect(() => {
    applyPreset("minimal");
    updateConfig({
      content: { maxWidth: "full", padding: "none", centered: false },
      footer: { enabled: true, fixed: false, variant: "detailed", showOnMobile: true },
    });
  }, [applyPreset, updateConfig]);

  return (
    <LazyDynamicLayout>
      <div className="min-h-screen flex flex-col relative overflow-hidden w-full">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <HeroSection isUrdu={isUrdu} />
        <PricingSection />
      </div>
    </LazyDynamicLayout>
  );
}
