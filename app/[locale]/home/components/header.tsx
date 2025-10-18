"use client";

import LanguageSwitcher from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserProfile } from "@/components/layout/user-profile";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // Full-width fixed header overlaying the hero; becomes solid on scroll
        "fixed top-0 left-0 right-0 z-40 w-full border-b transition-all",
        scrolled
          ? "bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur border-border/60 shadow-sm"
          : "bg-transparent border-transparent text-white"
      )}
    >
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo / Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold transition-colors">{t("brand")}</h1>
            </div>

            {/* Right side controls */}
            <div
              className={cn(
                "flex items-center gap-4",
                !scrolled &&
                  // Force white icons/text for nested controls when over dark hero
                  "[&_button]:!text-white [&_svg]:!text-white [&_span]:!text-white [&_a]:!text-white"
              )}
            >
              <LanguageSwitcher />
              <ThemeToggle />
              <UserProfile />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
