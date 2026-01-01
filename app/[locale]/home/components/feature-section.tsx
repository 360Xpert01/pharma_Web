"use client";
import { useTranslations } from "next-intl";
import { Sparkles, Zap, Shield, Rocket, Cloud, Code2 } from "lucide-react";
import { FeatureCard } from "./feature-card";
import type { Feature } from "../types/";

export function FeaturesSection() {
  const t = useTranslations("home");

  const features: Feature[] = [
    {
      id: "ai-automation",
      title: t("features.aiAutomation.title") || "AI-Powered Automation",
      description:
        t("features.aiAutomation.description") ||
        "Automate repetitive tasks with advanced machine learning algorithms.",
      icon: Sparkles,
      isNew: true,
      href: "#",
    },
    {
      id: "lightning-fast",
      title: t("features.lightningFast.title") || "Lightning Fast",
      description:
        t("features.lightningFast.description") ||
        "Optimized for speed with sub-millisecond response times.",
      icon: Zap,
      href: "#",
    },
    {
      id: "enterprise-security",
      title: t("features.enterpriseSecurity.title") || "Enterprise Security",
      description:
        t("features.enterpriseSecurity.description") ||
        "Bank-grade security with end-to-end encryption.",
      icon: Shield,
      href: "#",
    },
    {
      id: "scalable-infrastructure",
      title: t("features.scalableInfrastructure.title") || "Scalable Infrastructure",
      description:
        t("features.scalableInfrastructure.description") ||
        "Built to scale with your needs, from startup to enterprise.",
      icon: Rocket,
      href: "#",
    },
    {
      id: "cloud-native",
      title: t("features.cloudNative.title") || "Cloud Native",
      description:
        t("features.cloudNative.description") ||
        "Deploy anywhere with our cloud-native architecture.",
      icon: Cloud,
      href: "#",
    },
    {
      id: "developer-first",
      title: t("features.developerFirst.title") || "Developer First",
      description:
        t("features.developerFirst.description") ||
        "Built by developers, for developers with great DX.",
      icon: Code2,
      href: "#",
    },
  ];

  return (
    <section className="relative z-10 py-20 px-6 bg-(--background) dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("features.title") || "Features that set us apart"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-balance">
            {t("features.subtitle") ||
              "Everything you need to build modern applications at scale. Built for developers, designed for growth."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
