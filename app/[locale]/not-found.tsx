"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Home, RefreshCw, Search, AlertTriangle } from "lucide-react";
import { DynamicLayout } from "@/components/layout/dynamic-layout";
import { useLayout } from "@/contexts/layout-context";

export default function LocalizedNotFound() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("error.notFound");
  const tCommon = useTranslations("common");
  const { applyPreset } = useLayout();

  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Apply website preset for 404 page
  useEffect(() => {
    applyPreset("website");
  }, [applyPreset]);

  // Auto-redirect countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (countdown !== null && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => (prev && prev > 1 ? prev - 1 : 0));
      }, 1000);
    } else if (countdown === 0) {
      setIsRedirecting(true);
      router.push(`/${locale}`);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [countdown, router, locale]);

  const handleGoHome = () => {
    setIsRedirecting(true);
    router.push(`/${locale}`);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const startAutoRedirect = () => {
    setCountdown(10);
  };

  const cancelAutoRedirect = () => {
    setCountdown(null);
  };

  // Popular/suggested pages
  const popularPages = [
    { title: tCommon("navigation.home"), href: `/${locale}`, icon: Home },
    { title: tCommon("navigation.dashboard"), href: `/${locale}/dashboard`, icon: Search },
  ];

  return (
    <DynamicLayout>
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Main 404 Display */}
          <div className="text-center space-y-4">
            <div className="relative">
              <h1 className="text-9xl md:text-[12rem] font-black text-muted-foreground/20 select-none">
                {t("heading")}
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertTriangle className="h-16 w-16 md:h-20 md:w-20 text-destructive animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t("title")}</h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">{t("description")}</p>
            </div>
          </div>

          {/* Action Card */}
          <Card className="border-dashed">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">
                {tCommon("actions.chooseOption") || "What would you like to do?"}
              </CardTitle>
              <CardDescription>
                {tCommon("actions.continueMessage") ||
                  "Choose an option below to continue browsing"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleGoHome}
                  className="flex items-center gap-2"
                  size="lg"
                  disabled={isRedirecting}
                >
                  <Home className="h-4 w-4" />
                  {isRedirecting
                    ? tCommon("status.redirecting") || "Redirecting..."
                    : t("primaryButton")}
                </Button>

                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t("secondaryButton")}
                </Button>

                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <RefreshCw className="h-4 w-4" />
                  {t("refreshButton")}
                </Button>
              </div>

              {/* Auto Redirect Section */}
              {countdown === null && !isRedirecting && (
                <div className="text-center">
                  <Button
                    onClick={startAutoRedirect}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("autoRedirectMessage").replace("{count}", "10")}
                  </Button>
                </div>
              )}

              {countdown !== null && countdown > 0 && (
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {t("autoRedirectMessage").replace("{count}", countdown.toString())}
                  </p>
                  <Button onClick={cancelAutoRedirect} variant="ghost" size="sm">
                    {t("cancelRedirect")}
                  </Button>
                </div>
              )}

              <Separator />

              {/* Popular Pages */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-center text-muted-foreground uppercase tracking-wider">
                  {t("searchTitle")}
                </h3>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  {popularPages.map((page) => {
                    const Icon = page.icon;
                    return (
                      <Button
                        key={page.href}
                        onClick={() => router.push(page.href)}
                        variant="ghost"
                        className="flex items-center gap-2 justify-start sm:justify-center"
                      >
                        <Icon className="h-4 w-4" />
                        {page.title}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardContent>

            <CardFooter className="text-center pt-6">
              <p className="text-sm text-muted-foreground w-full">
                {t("supportText")}{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm font-normal underline"
                  onClick={() => (window.location.href = "mailto:support@example.com")}
                >
                  {t("contactSupport")}
                </Button>
              </p>
            </CardFooter>
          </Card>

          {/* Additional Help */}
          <div className="text-center text-xs text-muted-foreground space-y-1">
            <p>Error Code: 404 • {t("title")}</p>
            <p>
              {tCommon("troubleshooting.clearCache") ||
                "If the problem persists, try clearing your browser cache"}
            </p>
          </div>
        </div>
      </div>
    </DynamicLayout>
  );
}
