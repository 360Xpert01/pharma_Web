"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useLayout } from "@/contexts/layout-context";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { DynamicLayout } from "@/components/layout/dynamic-layout";

export default function HomePage() {
  const { applyPreset } = useLayout();
  const t = useTranslations("home");
  const params = useParams();
  const isUrdu = params.locale === "ur";

  useEffect(() => {
    // Apply website preset for landing page
    applyPreset("website");
  }, [applyPreset]);

  return (
    <DynamicLayout>
      {/* Landing page content - this will be wrapped by the dynamic layout */}
      <div className="min-h-screen flex flex-col">
        {/* Custom header for landing page when using website preset */}
        <div className="flex-1 py-16">
          <div className="mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1
                className={`text-3xl md:text-4xl font-bold text-balance ${
                  isUrdu ? "leading-snug md:leading-normal tracking-wide" : ""
                }`}
              >
                {t("hero.title")}
              </h1>
              <p className="text-muted-foreground leading-relaxed">{t("hero.description")}</p>
              <div className="flex gap-3">
                <Button asChild>
                  <a href="/dashboard" aria-label={t("hero.primaryButtonLabel")}>
                    {t("hero.primaryButton")}
                  </a>
                </Button>
                <Button variant="secondary" asChild>
                  <a href="/dashboard/layout-settings" aria-label={t("hero.secondaryButtonLabel")}>
                    {t("hero.secondaryButton")}
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-lg border p-6">
              <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">{t("features.layoutSystemIcon")}</div>
                  <p className="text-sm text-muted-foreground">{t("features.layoutSystemTitle")}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {t("features.layoutSystemDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DynamicLayout>
  );
}
