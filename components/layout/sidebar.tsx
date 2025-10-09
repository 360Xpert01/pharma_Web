"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "@/lib/icons";
import { useLayout } from "@/contexts/layout-context";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { sidebarNavigation } from "@/navigation/config";
import { getNavItemTitle, getNavItemBadge, isRouteActive } from "@/lib/navigation-utils";
import { useTranslations } from "next-intl";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { config, state, computed, toggleSidebar } = useLayout();
  const { sidebarWidth } = computed;
  const pathname = usePathname();
  const t = useTranslations("navigation");

  const sidebarClasses = cn(
    "flex flex-col bg-background border-e border-border/40 h-full",
    "transition-all duration-300 ease-in-out",
    {
      // Width based on collapsed state
      [sidebarWidth]: !state.sidebarOpen || !config.sidebar.collapsible,
      "w-16": state.sidebarOpen && config.sidebar.collapsible, // Collapsed width
    },
    className
  );

  const isCollapsed = state.sidebarOpen && config.sidebar.collapsible;

  return (
    <div className={sidebarClasses}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40 min-h-[65px]">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg">{t("labels.navigation")}</h2>
          </div>
        )}

        {isCollapsed && <div className="w-8 h-8 rounded-md bg-primary mx-auto" />}

        {config.sidebar.collapsible && !isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0"
            aria-label={t("labels.collapseSidebar")}
          >
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          </Button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {isCollapsed && config.sidebar.collapsible && (
        <div className="p-2 border-b border-border/40">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="w-full h-10 p-0"
            aria-label={t("labels.expandSidebar")}
          >
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </Button>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {sidebarNavigation.map((item) => {
          const isActive = isRouteActive(item.href, pathname);
          const Icon = item.icon;
          const translatedTitle = getNavItemTitle(item, t);
          const translatedBadge = getNavItemBadge(item, t);

          return (
            <div key={item.href} className="relative">
              <Link
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
                title={isCollapsed ? translatedTitle : undefined}
              >
                {Icon && (
                  <Icon
                    className={cn("flex-shrink-0", {
                      "h-5 w-5": isCollapsed,
                      "h-4 w-4": !isCollapsed,
                    })}
                  />
                )}
                {!isCollapsed && (
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="truncate">{translatedTitle}</span>
                    {translatedBadge && (
                      <span className="px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded">
                        {translatedBadge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border/40">
        {!isCollapsed ? (
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium">{t("main.layoutSettings")}</p>
            <p>
              {t("layout.variant")}: {config.sidebar.variant}
            </p>
            <p>
              {t("layout.width")}: {config.sidebar.width}
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-6 h-1 bg-muted rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}
