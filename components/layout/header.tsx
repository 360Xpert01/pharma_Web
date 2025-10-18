"use client";

import { Link } from "@/i18n/navigation";
import { MenuIcon, CloseIcon } from "@/lib/icons";
import { ThemeToggle } from "./theme-toggle";
import { UserProfile } from "./user-profile";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AuthButtons } from "./auth-buttons";
import Cookies from "js-cookie";
import { useLayout } from "@/contexts/layout-context";
import { useAuth } from "@/hooks/use-auth";
import MobileHamburgerMenu from "./mobile-hamburger-menu";

export function Header({ className }: { className?: string }) {
  const { computed, toggleSidebar, state, toggleMobileMenu, closeMobileMenu, config } = useLayout();
  const { showSidebar, headerHeight, isMobile, isSidebarCollapsed } = computed;
  const { isAuthenticated, isLoading } = useAuth();
  const t = useTranslations("layout.header");

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

  // Calculate sidebar width for header offset
  let sidebarWidth = 0;
  if (showSidebar && !isMobile && config.sidebar.variant === "fixed") {
    if (isSidebarCollapsed) {
      sidebarWidth = 64; // collapsed width (w-16)
    } else {
      switch (config.sidebar.width) {
        case "sm":
          sidebarWidth = 192; // w-48
          break;
        case "md":
          sidebarWidth = 256; // w-64
          break;
        case "lg":
          sidebarWidth = 288; // w-72
          break;
        case "xl":
          sidebarWidth = 320; // w-80
          break;
        default:
          sidebarWidth = 256; // default to md
      }
    }
  }

  // Detect RTL layout
  const isRTL = typeof document !== "undefined" ? document.dir === "rtl" : false;

  // This ensures it stays at top and adjusts width/left/right based on sidebar state and direction
  const headerClasses = cn(
    "fixed top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    headerHeight,
    className
  );

  // Inline style for left/right/width offset
  const headerStyle =
    showSidebar && !isMobile && config.sidebar.variant === "fixed"
      ? isRTL
        ? { right: `${sidebarWidth}px`, left: 0, width: `calc(100% - ${sidebarWidth}px)` }
        : { left: `${sidebarWidth}px`, right: 0, width: `calc(100% - ${sidebarWidth}px)` }
      : { left: 0, right: 0, width: "100%" };

  const containerClasses = cn(
    "h-full grid grid-cols-[clamp(8px,2vw,16px)_1fr_clamp(8px,2vw,16px)] items-center"
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
    <header className={headerClasses} style={headerStyle}>
      <div className={containerClasses}>
        {/* Middle content column with built-in side gutters (no margin/padding) */}
        <div className="col-start-2 col-end-3 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (state.mobileMenuOpen ? closeMobileMenu() : toggleMobileMenu())}
                className="md:hidden h-9 w-9 p-0"
                aria-label={t("toggleMobileNavLabel")}
              >
                {state.mobileMenuOpen ? (
                  <CloseIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <MenuIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            )}

            {/* Desktop sidebar toggle removed as requested */}

            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
              onClick={() => closeMobileMenu()}
              aria-label={`${t("logoText")} - Go to Home`}
            >
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
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobile && state.mobileMenuOpen && <MobileHamburgerMenu onClose={closeMobileMenu} />}
    </header>
  );
}
