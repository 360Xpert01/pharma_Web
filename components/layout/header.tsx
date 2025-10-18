"use client";

import { Link } from "@/i18n/navigation";
import { MenuIcon, CloseIcon } from "@/lib/icons";
import { ThemeToggle } from "./theme-toggle";
import { UserProfile } from "./user-profile";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { AuthButtons } from "./auth-buttons";
import Cookies from "js-cookie";
import { useLayout } from "@/contexts/layout-context";
import { useAuth } from "@/hooks/use-auth";
import MobileHamburgerMenu from "./mobile-hamburger-menu";

export function Header({ className }: { className?: string }) {
  const { computed, toggleSidebar } = useLayout();
  const { showSidebar, headerHeight, isMobile } = computed;
  const { isAuthenticated, isLoading } = useAuth();
  const t = useTranslations("layout.header");

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [hasCookieUser, setHasCookieUser] = useState<boolean>(
    () =>
      typeof window !== "undefined" && (!!Cookies.get("auth_token") || !!Cookies.get("user_email"))
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () =>
      setHasCookieUser(!!Cookies.get("auth_token") || !!Cookies.get("user_email"));
    window.addEventListener("storage", check);
    const interval = setInterval(check, 300);
    return () => {
      window.removeEventListener("storage", check);
      clearInterval(interval);
    };
  }, []);

  const headerClasses = cn(
    "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    headerHeight,
    className
  );

  const containerClasses = cn(
    "h-full px-4 lg:px-6 flex items-center justify-between",
    "max-w-7xl mx-auto"
  );

  const renderAuthSection = () => {
    if (isLoading) {
      return <div className="ml-1 w-24 h-9 animate-pulse rounded-md" />;
    }

    const showUser = isAuthenticated || hasCookieUser;
    return showUser ? (
      <UserProfile className="ml-1" />
    ) : (
      <AuthButtons variant="compact" className="ml-1" />
    );
  };

  return (
    <header className={headerClasses}>
      <div className={containerClasses}>
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden h-9 w-9 p-0"
              aria-label={t("toggleMobileNavLabel")}
            >
              {mobileNavOpen ? (
                <CloseIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          )}

          {!isMobile && showSidebar && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="hidden md:flex h-9 w-9 p-0"
              aria-label={t("toggleSidebarLabel")}
            >
              <MenuIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}

          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
            onClick={() => setMobileNavOpen(false)}
            aria-label={`${t("logoText")} - Go to Home`}
          >
            <div className="w-8 h-8 rounded-md bg-primary" aria-hidden="true" />
            <span className="hidden sm:block">{t("logoText")}</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          {renderAuthSection()}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobile && mobileNavOpen && <MobileHamburgerMenu onClose={() => setMobileNavOpen(false)} />}
    </header>
  );
}
