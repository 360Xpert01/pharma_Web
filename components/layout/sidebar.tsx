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

  let navItems = t.raw("items");
  if (!Array.isArray(navItems)) navItems = [];

  const pickIcon = (title: string) => {
    const key = title.toLowerCase();
    if (key.includes("home") || key.includes("ہوم")) return HomeIcon;
    if (key.includes("dashboard") || key.includes("ڈیش بورڈ")) return BarChartIcon;
    if (key.includes("setting") || key.includes("سیٹنگز")) return SettingsIcon;
    if (
      key.includes("profile") ||
      key.includes("پروفائل") ||
      key.includes("user") ||
      key.includes("صارف")
    )
      return UserIcon;
    return HomeIcon;
  };

  // Detect RTL (Urdu) layout
  const isRTL = typeof document !== "undefined" ? document.dir === "rtl" : false;

  const sidebarClasses = cn(
    "flex flex-col bg-background border-e border-border/40 h-full transition-all duration-300 ease-in-out",
    "w-full",
    className
  );

  return (
    <aside className={sidebarClasses}>
      {/* Sidebar Header */}
      <div
        className={cn(
          "relative flex items-center justify-between border-b border-border/40 min-h-[63px]",
          isRTL ? "p-1" : "p-2"
        )}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-8 bg-primary" />
            <span className={cn("font-semibold text-md", isRTL ? "mt-1" : "text-left")}>
              {t("navigationLabel")}
            </span>
          </div>
        )}

        {isCollapsed && <div className="w-8 h-8 rounded-8 bg-primary mx-auto" />}

        {/* Overlay chevron aligned to Next Boiler header border */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "absolute -end-4 -bottom-1/2 -translate-y-1/2 h-9 w-9 p-0 rounded-8",
            "border border-border/60 bg-background shadow-soft ring-1 ring-border/50 hover:bg-accent/60 z-9999"
          )}
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
                "flex rounded-8 text-sm font-medium transition-all",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                  "bg-accent text-accent-foreground shadow-soft": isActive,
                  "text-muted-foreground hover:text-foreground": !isActive,
                  // Collapsed styles
                  "justify-center p-3 w-12 h-12 mx-auto": isCollapsed,
                  // Expanded styles
                  "justify-start gap-3 px-3 py-2.5 items-center": !isCollapsed && !isRTL,
                  "justify-start gap-2 px-3 py-2.5 items-center": !isCollapsed && isRTL,
                }
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <Icon className="h-4 w-4" />
              {!isCollapsed && (
                <span className={cn("whitespace-normal", isRTL ? "text-right w-full" : "truncate")}>
                  {item.title}
                </span>
              )}
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
            <div className="w-6 h-1 bg-muted rounded-8" />
          </div>
        )}
      </div>
    </aside>
  );
}
