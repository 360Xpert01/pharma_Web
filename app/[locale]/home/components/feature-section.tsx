"use client";
import { useTranslations } from "next-intl";
import { FeatureCard } from "./feature-card";
import { Feature } from "../types";

export function FeaturesSection() {
  const t = useTranslations("home");

  const features: Feature[] = [
    {
      id: "fast",
      title: t("features.fast.title") || "Lightning Fast",
      description:
        t("features.fast.description") || "Optimized performance for production-ready applications",
      icon: "⚡",
    },
    {
      id: "secure",
      title: t("features.secure.title") || "Secure by Default",
      description:
        t("features.secure.description") || "Built-in security best practices and protections",
      icon: "🔒",
    },
    {
      id: "scalable",
      title: t("features.scalable.title") || "Highly Scalable",
      description: t("features.scalable.description") || "Grows with your application needs",
      icon: "📈",
    },
    {
      id: "developer",
      title: t("features.developer.title") || "Developer Friendly",
      description:
        t("features.developer.description") || "Intuitive APIs and comprehensive documentation",
      icon: "👨‍💻",
    },
  ];

  return (
    <section id="features" className="relative z-10 py-20 px-6 bg-gray-950/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("features.title") || "Powerful Features"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t("features.subtitle") || "Everything you need to build modern applications"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
