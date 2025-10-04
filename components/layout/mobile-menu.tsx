"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  CloseIcon,
  HomeIcon,
  BarChartIcon,
  SettingsIcon,
  UsersIcon,
  FileIcon,
  PaletteIcon,
} from "@/lib/icons";
import { useLayout } from "@/contexts/layout-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  className?: string;
}

export function MobileMenu({ className }: MobileMenuProps) {
  const { config, state, closeMobileMenu } = useLayout();
  const pathname = usePathname();
  const t = useTranslations("layout.navigation");

  // Same navigation items as sidebar - now using translations
  const navigationItems = [
    {
      title: t("dashboard"),
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: t("analytics"),
      href: "/dashboard/analytics",
      icon: BarChartIcon,
    },
    {
      title: t("users"),
      href: "/dashboard/users",
      icon: UsersIcon,
    },
    {
      title: t("content"),
      href: "/dashboard/content",
      icon: FileIcon,
    },
    {
      title: t("layoutSettings"),
      href: "/dashboard/layout-settings",
      icon: PaletteIcon,
    },
    {
      title: t("settings"),
      href: "/dashboard/settings",
      icon: SettingsIcon,
    },
  ];

  if (!state.mobileMenuOpen) return null;

  const menuClasses = cn(
    "fixed top-0 left-0 h-full w-64 bg-background border-r border-border/40 z-50",
    "transform transition-transform duration-300 ease-in-out",
    "md:hidden", // Only show on mobile
    {
      "translate-x-0": state.mobileMenuOpen,
      "-translate-x-full": !state.mobileMenuOpen,
    },
    className
  );

  const handleLinkClick = () => {
    // Close mobile menu when navigating
    closeMobileMenu();
  };

  return (
    <div className={menuClasses}>
      {/* Mobile menu header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        <h2 className="font-semibold text-lg">Menu</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={closeMobileMenu}
          aria-label={t("closeMobileMenu")}
        >
          <CloseIcon className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                {
                  "bg-accent text-accent-foreground": isActive,
                  "text-muted-foreground": !isActive,
                }
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile menu footer */}
      <div className="p-4 border-t border-border/40">
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Mobile Menu</p>
          <p>Layout: {config.sidebar.variant}</p>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
