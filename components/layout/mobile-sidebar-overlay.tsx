"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { X } from "@/lib/icons";
import { useLayout } from "@/contexts/layout-context";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { sidebarNavigation } from "@/navigation/config";
import { useTranslations } from "next-intl";

interface MobileHamburgerMenuProps {
  className?: string;
}

// This component shows the sidebar navigation as a mobile overlay
// (This is different from the mobile navigation menu which shows header nav links)
export function MobileHamburgerMenu({ className }: MobileHamburgerMenuProps) {
  const { state, closeMobileMenu } = useLayout();
  const pathname = usePathname();
  const t = useTranslations("layout.sidebar");

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (state.mobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [state.mobileMenuOpen]);

  const handleLinkClick = () => {
    closeMobileMenu();
  };

  const handleBackdropClick = () => {
    // Close menu when clicking outside the content area
    closeMobileMenu();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Allow natural scrolling within the menu
    e.stopPropagation();
  };

  // Don't render if mobile menu is closed
  if (!state.mobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 md:hidden" onClick={handleBackdropClick}>
      {/* Full Screen Menu Panel */}
      <div
        className={cn(
          // Full screen positioning
          "flex flex-col h-full w-full",
          // Background styling
          "bg-background",
          // Animation
          "transform transition-transform duration-300 ease-in-out",
          // Show/hide animation
          {
            "translate-x-0": state.mobileMenuOpen,
            "-translate-x-full": !state.mobileMenuOpen,
          },
          className
        )}
        onTouchStart={handleTouchStart}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile menu header */}
        <div className="flex items-center justify-between p-4 border-b border-border/40 bg-background/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary" />
            <h2 className="font-semibold text-lg">{t("navigationLabel")}</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeMobileMenu}
            className="h-9 w-9 p-0"
            aria-label="Close mobile menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarNavigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            // Get translated title based on href
            const getTranslatedTitle = (href: string) => {
              switch (href) {
                case "/dashboard":
                  return t("navigationLabel");
                case "/":
                  return t("home");
                case "/dashboard/layout-settings":
                  return t("layout");
                case "/dashboard/settings":
                  return t("settings");
                case "/dashboard/analytics":
                  return t("analytics");
                case "/dashboard/reports":
                  return t("reports");
                case "/dashboard/users":
                  return t("users");
                case "/dashboard/help":
                  return t("help");
                default:
                  return item.title;
              }
            };

            const translatedTitle = getTranslatedTitle(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                  "hover:bg-accent hover:text-accent-foreground active:scale-95",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  {
                    "bg-accent text-accent-foreground shadow-sm": isActive,
                    "text-muted-foreground hover:text-foreground": !isActive,
                  }
                )}
              >
                {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="truncate">{translatedTitle}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu footer */}
        <div className="p-4 border-t border-border/40 bg-background/60">
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium">{t("navigationLabel")}</p>
            <p>{t("mobileVersion")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileHamburgerMenu;
