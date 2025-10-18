"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  HomeIcon,
  SettingsIcon,
  UserIcon,
  BarChartIcon,
} from "@/lib/icons";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useLayout } from "@/contexts/layout-context";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const t = useTranslations("layout.sidebar");
  const pathname = usePathname();
  const { computed, toggleSidebar } = useLayout();
  const { isSidebarCollapsed: isCollapsed } = computed;

  // Navigation items from i18n (layout.ts)
  const navItems = t.raw("items") as Array<{ href: string; title: string; icon?: string }>;

  // Optional: map titles to icons as a simple heuristic
  const pickIcon = (title: string) => {
    const key = title.toLowerCase();
    if (key.includes("home")) return HomeIcon;
    if (key.includes("dashboard")) return BarChartIcon;
    if (key.includes("setting")) return SettingsIcon;
    if (key.includes("profile") || key.includes("user")) return UserIcon;
    return HomeIcon;
  };

  const sidebarClasses = cn(
    "flex flex-col bg-background border-e border-border/40 h-full transition-all duration-300 ease-in-out",
    // Width is controlled by the container in DynamicLayout
    "w-full",
    className
  );

  return (
    <aside className={sidebarClasses}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40 min-h-[65px]">
        {!isCollapsed && <h2 className="font-semibold text-lg">Next Boiler</h2>}

        {isCollapsed && <div className="w-8 h-8 rounded-md bg-primary mx-auto" />}

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 p-0 rounded-full border border-border/60 hover:bg-accent/60"
          aria-label={t(isCollapsed ? "expandLabel" : "collapseLabel")}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          ) : (
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1 overflow-hidden">
        {navItems.map((item: any) => {
          const isActive = pathname === item.href;
          const Icon = pickIcon(item.title);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg text-sm font-medium transition-all",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                  "bg-accent text-accent-foreground shadow-sm": isActive,
                  "text-muted-foreground hover:text-foreground": !isActive,
                  // Collapsed styles
                  "justify-center p-3 w-12 h-12 mx-auto": isCollapsed,
                  // Expanded styles
                  "justify-start gap-3 px-3 py-2.5": !isCollapsed,
                }
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <Icon className="h-4 w-4" />
              {!isCollapsed && <span className="truncate">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border/40">
        {!isCollapsed ? (
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium">{t("layoutSettings")}</p>
            <p>{t("sidebarVariant")}: Default</p>
            <p>{t("sidebarWidth")}: 64px</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-6 h-1 bg-muted rounded-full" />
          </div>
        )}
      </div>
    </aside>
  );
}
