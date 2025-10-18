"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "@/lib/icons";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const t = useTranslations("layout.sidebar");
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Navigation items from i18n (layout.ts)
  const navItems = t.raw("items");

  const sidebarClasses = cn(
    "flex flex-col bg-background border-e border-border/40 h-full transition-all duration-300 ease-in-out",
    isCollapsed ? "w-16" : "w-64",
    className
  );

  return (
    <aside className={sidebarClasses}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40 min-h-[65px]">
        {!isCollapsed && <h2 className="font-semibold text-lg">{t("navigationLabel")}</h2>}

        {isCollapsed && <div className="w-8 h-8 rounded-md bg-primary mx-auto" />}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
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
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item: any) => {
          const isActive = pathname === item.href;

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
