"use client";
import { Button } from "@/components/ui/button/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import Image from "next/image";

interface HeroSectionProps {
  isUrdu: boolean;
}

export function HeroSection({ isUrdu }: HeroSectionProps) {
  const t = useTranslations("home");

  return (
    <section className="relative flex-1 flex items-center justify-center w-full pt-24 sm:pt-28 pb-24">
      {/* Background */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1604147495798-57beb5d6af73?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvY2slMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Waitlist Badge */}
          <div className="inline-block">
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-2">
              <span className="text-gray-300 text-sm">{t("hero.waitlistBadge")}</span>
            </div>
          </div>

          {/* Hero Title */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight ${
              isUrdu ? "leading-snug md:leading-normal tracking-wide" : ""
            }`}
          >
            {t("hero.title")}
          </h1>

          {/* Hero Description */}
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              {t("hero.description")}
            </p>
            <p className="text-gray-400 text-base md:text-lg">{t("hero.subtitle")}</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold"
              asChild
            >
              <Link href="/dashboard" aria-label={t("hero.primaryButtonLabel")}>
                {t("hero.primaryButton")}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3 text-lg font-semibold bg-transparent"
              asChild
            >
              <a href="#features" aria-label={t("hero.secondaryButtonLabel")}>
                {t("hero.secondaryButton")}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </Button>
          </div>

          <div className="relative z-10 pb-16">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <p className="text-gray-400 text-sm mb-8">{t("trusted.title")}</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="text-gray-500 font-bold text-lg">PEAOX</div>
                <div className="text-gray-500 font-bold text-lg">GitHub</div>
                <div className="text-gray-500 font-bold text-lg">Vercel</div>
                <div className="text-gray-500 font-bold text-lg">Supabase</div>
              </div>
            </div>
          </div>

          {/* Showcase Image
        <div className="pt-16">
          <div className="relative max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-gray-700 bg-gray-900/50 backdrop-blur-sm p-8">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src="/coding-dashboard.jpg"
                  alt={t("features.overlayImageAlt")}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">{t("features.showcaseTitle")}</h3>
                <p className="text-gray-400">{t("features.showcaseDescription")}</p>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </section>
  );
}
