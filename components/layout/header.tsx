"use client";
import { Link } from "@/i18n/navigation";
import { MenuIcon, CloseIcon } from "@/lib/icons";
import { ThemeToggle } from "./theme-toggle";
import { UserProfile } from "./user-profile";
import { MobileNavigationMenu } from "./mobile-navigation-menu";
import { LanguageSwitcher } from "./language-switcher";
import { NavigationMenu } from "@/components/navigation/navigation-menu";
import { AuthButtons } from "@/components/auth/auth-buttons";
import { useLayout } from "@/contexts/layout-context";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { headerNavigation } from "@/navigation/config";
import { getNavItemTitle } from "@/lib/navigation-utils";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { config, state, computed, toggleSidebar } = useLayout();
  const { showSidebar, headerHeight, isMobile } = computed;
  const { isAuthenticated, isLoading } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const t = useTranslations("navigation");
  const tLayout = useTranslations("layout");

  const headerClasses = cn(
    "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    headerHeight,
    className
  );

  const containerClasses = cn("h-full px-4 lg:px-6 flex items-center justify-between", {
    "max-w-7xl mx-auto": config.content.maxWidth === "container",
    "max-w-4xl mx-auto": config.content.maxWidth === "prose",
  });

  // Memoized auth section for better performance
  const renderAuthSection = () => {
    if (isLoading) {
      return <div className="ml-1 w-24 h-9 bg-muted animate-pulse rounded-md" />;
    }

    return isAuthenticated && config.header.showUserMenu ? (
      <UserProfile className="ml-1" />
    ) : (
      <AuthButtons variant="compact" className="ml-1" />
    );
  };

  return (
    <header className={headerClasses}>
      <div className={containerClasses}>
        {/* Left section: Mobile nav toggle + Logo + Desktop sidebar toggle */}
        <div className="flex items-center gap-3">
          {/* Mobile navigation hamburger button */}
          {isMobile && config.header.showNavigation && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden h-9 w-9 p-0"
              aria-label={tLayout("header.toggleMobileNavLabel")}
            >
              {mobileNavOpen ? (
                <CloseIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          )}

          {/* Desktop sidebar toggle */}
          {!isMobile && showSidebar && config.sidebar.collapsible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="hidden md:flex h-9 w-9 p-0"
              aria-label={tLayout("header.toggleSidebarLabel")}
            >
              <MenuIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}

          {/* Logo/Brand */}
          {config.header.showLogo && (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
              onClick={() => setMobileNavOpen(false)}
              aria-label={`${tLayout("header.logoText")} - ${t("labels.goToHome")}`}
            >
              <div className="w-8 h-8 rounded-md bg-primary" aria-hidden="true" />
              <span className="hidden sm:block">{tLayout("header.logoText")}</span>
            </Link>
          )}
        </div>

        {/* Center section: Desktop Navigation */}
        {config.header.showNavigation && config.navigation.style === "horizontal" && (
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {headerNavigation.map((item) => {
              const translatedTitle = getNavItemTitle(item, t);

              return (
                <Link
                  key={item.href}
                  href={item.href as any}
                  className="text-foreground/80 hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {translatedTitle}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right section: Language switcher + Theme toggle + Auth/User profile */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Optimized auth section with loading state */}
          {renderAuthSection()}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && mobileNavOpen && config.header.showNavigation && (
        <MobileNavigationMenu isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      )}
    </header>
  );
}
