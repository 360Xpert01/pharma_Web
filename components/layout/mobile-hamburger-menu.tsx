"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloseIcon, HomeIcon, SettingsIcon, UserIcon, BarChartIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

interface MobileHamburgerMenuProps {
  className?: string;
  onClose: () => void;
}

export default function MobileHamburgerMenu({ className, onClose }: MobileHamburgerMenuProps) {
  const pathname = usePathname();
  const t = useTranslations("layout.sidebar");

  // Navigation items from i18n (layout.ts)
  const navItems = t.raw("items") as Array<{ href: string; title: string }>;

  // Lock body scroll when menu is open
  useEffect(() => {
    // Store original overflow value
    const originalOverflow = document.body.style.overflow;

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const pickIcon = (title: string) => {
    const key = title.toLowerCase();
    if (key.includes("home")) return HomeIcon;
    if (key.includes("dashboard")) return BarChartIcon;
    if (key.includes("setting")) return SettingsIcon;
    if (key.includes("profile") || key.includes("user")) return UserIcon;
    return HomeIcon;
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-background md:hidden transition-transform duration-300 ease-in-out",
          "translate-x-0",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/40 min-h-[65px]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary" />
            <h2 className="font-semibold text-lg">Next Boiler</h2>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
            aria-label={t("collapseLabel")}
          >
            <CloseIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item: any) => {
            const isActive = pathname === item.href;
            const Icon = pickIcon(item.title);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center rounded-lg text-sm font-medium transition-all",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  {
                    "bg-accent text-accent-foreground shadow-sm": isActive,
                    "text-muted-foreground hover:text-foreground": !isActive,
                    "justify-start gap-3 px-3 py-2.5": true,
                  }
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/40">
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium">{t("layoutSettings")}</p>
            <p>{t("sidebarVariant")}: Default</p>
            <p>{t("sidebarWidth")}: 64px</p>
          </div>
        </div>
      </div>
    </>
  );
}
