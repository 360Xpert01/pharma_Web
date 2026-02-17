"use client";

import { useTranslations } from "next-intl";
import { PricingCard } from "./pricing-card";

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline";
  isPopular?: boolean;
}

export function PricingSection() {
  const t = useTranslations("home.pricing");

  const plans: PricingPlan[] = [
    {
      id: "basic",
      name: t("plans.basic.name"),
      description: t("plans.basic.description"),
      price: 9,
      period: t("period"),
      features: [
        t("plans.basic.features.0"),
        t("plans.basic.features.1"),
        t("plans.basic.features.2"),
        t("plans.basic.features.3"),
      ],
      buttonText: t("getStarted"),
      buttonVariant: "outline",
    },
    {
      id: "pro",
      name: t("plans.pro.name"),
      description: t("plans.pro.description"),
      price: 29,
      period: t("period"),
      features: [
        t("plans.pro.features.0"),
        t("plans.pro.features.1"),
        t("plans.pro.features.2"),
        t("plans.pro.features.3"),
        t("plans.pro.features.4"),
        t("plans.pro.features.5"),
      ],
      buttonText: t("getStarted"),
      buttonVariant: "default",
      isPopular: true,
    },
    {
      id: "team",
      name: t("plans.team.name"),
      description: t("plans.team.description"),
      price: 79,
      period: t("period"),
      features: [
        t("plans.team.features.0"),
        t("plans.team.features.1"),
        t("plans.team.features.2"),
        t("plans.team.features.3"),
        t("plans.team.features.4"),
        t("plans.team.features.5"),
        t("plans.team.features.6"),
        t("plans.team.features.7"),
      ],
      buttonText: t("contactSales"),
      buttonVariant: "outline",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-(--background) dark:bg-black transition-colors duration-300">
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {t("subtitle")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, idx) => (
            <PricingCard
              key={plan.id}
              plan={{
                ...plan,
                // For the second card, ensure it looks good in all themes
                ...(idx === 1
                  ? {
                      buttonVariant: "default",
                      isPopular: true,
                    }
                  : {}),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
