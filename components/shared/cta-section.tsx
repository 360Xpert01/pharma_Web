"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button/button";
import { CTASvg } from "@/components/svgs/cta-svg";

import { useParams } from "next/navigation";

export function CTASection() {
  const t = useTranslations("home");
  const params = useParams();
  const isUrdu = params.locale === "ur";

  return (
    <section className="relative w-full py-32 md:py-52 overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none">
        <CTASvg />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center pt-10 md:pt-20 ${isUrdu ? "font-urdu" : ""}`}
      >
        {/* Heading - force three lines, responsive font */}
        <h3
          className={`text-xl md:text-4xl lg:text-6xl font-bold text-foreground mb-8 leading-tight text-balance break-words ${isUrdu ? "font-urdu" : ""}`}
          style={{ display: "block", whiteSpace: "pre-line", textAlign: "center" }}
        >
          {t("cta.title")}
        </h3>

        {/* CTA Buttons */}
        <div className="flex flex-row lg:py-6 gap-2 sm:gap-4 justify-center items-center w-full flex-nowrap">
          {/* Primary Button */}
          <Button
            size="sm"
            className="min-w-0 sm:px-2 sm:py-2 lg:px-6 lg:py-6 text-xs lg:text-lg font-semibold rounded-lg transition-all duration-300 w-1/2 lg:w-1/4"
          >
            {t("cta.primaryButton")}
          </Button>

          {/* Secondary Button */}
          <Button
            variant="ghost"
            size="sm"
            className="min-w-0 px-2 py-2 lg:px-6 lg:py-6 text-xs lg:text-lg font-semibold rounded-lg transition-all duration-300 w-1/2 lg:w-1/4"
          >
            {t("cta.secondaryButton")}
          </Button>
        </div>
      </div>
    </section>
  );
}
