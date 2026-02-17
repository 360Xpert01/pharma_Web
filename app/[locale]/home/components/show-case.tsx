"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Check } from "lucide-react";

export function ShowcaseSection() {
  const t = useTranslations("home");

  const features = [
    { key: "layoutSystem" },
    { key: "formBuilder" },
    { key: "realtimeDashboard" },
    { key: "enterpriseAuth" },
    { key: "uiComponents" },
    { key: "stateManagement" },
    { key: "testingSuite" },
    { key: "performance" },
    { key: "storybook" },
    { key: "socketTesting" },
    { key: "apiNetworking" },
    { key: "logging" },
    { key: "theming" },
    { key: "styling" },
  ];

  return (
    <section className="py-20 px-6 bg-(--background) dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text and Features */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-(--gray-9) dark:text-(--light) mb-6 transition-colors duration-300">
              {t("showcase.title")}
            </h2>
            <p className="text-lg text-(--gray-6) dark:text-(--gray-4) mb-8 transition-colors duration-300">
              {t("showcase.description")}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature.key} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-8 bg-(--primary-0) dark:bg-(--primary-2) border border-(--primary-1) dark:border-(--primary) shadow-soft">
                    <Check
                      className="w-6 h-6 text-(--primary) dark:text-(--primary-1)"
                      strokeWidth={2.5}
                    />
                  </span>
                  <span className="text-(--gray-8) dark:text-(--gray-2) font-medium transition-colors duration-300">
                    {t(`showcase.features.${feature.key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image Showcase */}
          <div className="pt-8 lg:pt-0">
            <div className="relative rounded-8 overflow-hidden border border-(--gray-3) dark:border-(--gray-8) bg-(--gray-1) dark:bg-(--gray-9)/50 backdrop-blur-sm p-8 transition-colors duration-300 h-full w-full flex flex-col justify-center">
              <div className="relative rounded-8 overflow-hidden w-full h-[600px] lg:h-[700px]">
                <Image
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80"
                  alt="Showcase"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
