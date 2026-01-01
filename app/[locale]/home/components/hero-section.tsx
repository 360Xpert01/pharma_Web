"use client";
import { Button } from "@/components/ui/button/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
interface HeroSectionProps {
  isUrdu: boolean;
}

export function HeroSection({ isUrdu }: HeroSectionProps) {
  const t = useTranslations("home");

  return (
    <section className="relative flex-1 flex items-center justify-center w-full pt-12 sm:pt-16 pb-24 lg:-mt-2">
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
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 transition-all duration-200 hover:bg-gray-700/80 hover:border-gray-600">
              <span
                className={`text-[var(--gray-3)] text-xs sm:text-sm font-medium ${isUrdu ? "font-urdu" : ""}`}
              >
                {t("hero.waitlistBadge")}
              </span>
            </div>
          </div>

          {/* Hero Title */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--background)] leading-tight ${isUrdu ? "leading-snug md:leading-normal tracking-wide font-urdu text-center rtl" : "text-center"}`}
            style={isUrdu ? { direction: "rtl", textAlign: "center" } : { textAlign: "center" }}
          >
            {t("hero.title")}
          </h1>

          {/* Hero Description */}
          <div className="max-w-3xl mx-auto space-y-4">
            <p
              className={`text-[var(--gray-3)] text-lg md:text-xl leading-relaxed ${isUrdu ? "font-urdu" : ""}`}
            >
              {t("hero.description")}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="bg-(--background) text-[var(--dark)] hover:bg-gray-200 px-8 py-3 text-md font-regular"
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
              className="border-gray-600 text-[var(--background)] hover:bg-gray-800 hover:text-[var(--background)] px-8 py-3 text-md font-regular bg-transparent"
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

          {/* Build Stack Section */}
          <div className="relative z-10 pt-12 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p
                className={`text-[var(--gray-4)] text-xs sm:text-sm mb-6 sm:mb-8 ${isUrdu ? "font-urdu text-center rtl" : "text-center"}`}
                style={isUrdu ? { direction: "rtl", textAlign: "center" } : { textAlign: "center" }}
              >
                {t("build.title")}
              </p>
              <div
                className={`flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 opacity-60 ${isUrdu ? "font-urdu" : ""}`}
              >
                <div className="text-[var(--gray-5)] font-bold text-sm sm:text-base md:text-lg whitespace-nowrap">
                  {t("build.stack.0.name")}
                </div>
                <div className="text-[var(--gray-5)] font-bold text-sm sm:text-base md:text-lg whitespace-nowrap">
                  {t("build.stack.1.name")}
                </div>
                <div className="text-[var(--gray-5)] font-bold text-sm sm:text-base md:text-lg whitespace-nowrap">
                  {t("build.stack.2.name")}
                </div>
                <div className="text-[var(--gray-5)] font-bold text-sm sm:text-base md:text-lg whitespace-nowrap">
                  {t("build.stack.3.name")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
