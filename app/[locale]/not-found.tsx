"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PageHead from "@/components/shared/page-head";
import { HomeIcon, BackIcon, SearchInputIcon, RefreshIcon } from "@/lib/icons";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface NotFoundPageProps {
  title?: string;
  description?: string;
  showSearchSuggestions?: boolean;
  customActions?: React.ReactNode;
}

// 404 Animation Component
function NotFoundAnimation() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("error.notFound");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative mb-8">
      <div className="text-center">
        <div className="relative inline-block">
          <h1 className="text-9xl font-bold text-primary/20 select-none animate-pulse">
            {t("heading")}
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Search Suggestions Component
function SearchSuggestions() {
  const t = useTranslations("error.notFound");
  const nt = useTranslations("navigation.main");

  const commonPages = [
    { name: t("primaryButton"), href: "/", icon: HomeIcon },
    { name: nt("dashboard"), href: "/dashboard", icon: SearchInputIcon },
    { name: nt("settings"), href: "/dashboard/layout-settings", icon: SearchInputIcon },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <SearchInputIcon className="h-5 w-5" />
          {t("searchTitle")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {commonPages.map((page) => {
            const Icon = page.icon;
            return (
              <Button key={page.href} asChild variant="ghost" className="justify-start h-auto py-3">
                <Link href={page.href}>
                  <Icon className="h-4 w-4 mr-2" />
                  {page.name}
                </Link>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function NotFoundPage({
  title,
  description,
  showSearchSuggestions = true,
  customActions,
}: NotFoundPageProps) {
  const t = useTranslations("error.notFound");
  const mt = useTranslations("metadata.pages.notFound");

  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [autoRedirect, setAutoRedirect] = useState(true);

  // Use translations as default values
  const pageTitle = title || mt("title");
  const pageDescription = description || mt("description");

  // Auto redirect countdown
  useEffect(() => {
    if (!autoRedirect) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, autoRedirect]);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleStopRedirect = () => {
    setAutoRedirect(false);
  };

  return (
    <>
      <PageHead title={pageTitle} description={pageDescription} />

      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
        <div className="w-full max-w-2xl space-y-8">
          <NotFoundAnimation />

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">{pageTitle}</h2>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">{pageDescription}</p>
          </div>

          {/* Auto-redirect notification */}
          {autoRedirect && countdown > 0 && (
            <Alert>
              <RefreshIcon className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{t("autoRedirectMessage").replace("{count}", countdown.toString())}</span>
                <Button variant="ghost" size="sm" onClick={handleStopRedirect}>
                  {t("cancelRedirect")}
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleGoBack} variant="outline" className="flex-1">
                  <BackIcon className="h-4 w-4 mr-2" />
                  {t("secondaryButton")}
                </Button>

                <Button asChild className="flex-1">
                  <Link href="/">
                    <HomeIcon className="h-4 w-4 mr-2" />
                    {t("primaryButton")}
                  </Link>
                </Button>

                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshIcon className="h-4 w-4 mr-2" />
                  {t("refreshButton")}
                </Button>
              </div>

              {customActions && <div className="mt-4 pt-4 border-t">{customActions}</div>}
            </CardContent>
          </Card>

          {/* Search Suggestions */}
          {showSearchSuggestions && <SearchSuggestions />}

          {/* Help Text */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t("supportText")}{" "}
              <Button variant="link" className="p-0 h-auto">
                {t("contactSupport")}
              </Button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
