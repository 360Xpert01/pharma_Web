"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "@/lib/icons";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface MobileHamburgerMenuProps {
  className?: string;
  onClose: () => void;
}

export default function MobileHamburgerMenu({ className, onClose }: MobileHamburgerMenuProps) {
  const pathname = usePathname();
  const t = useTranslations("layout.sidebar");

  // Navigation items from i18n (layout.ts)
  const navItems = t.raw("items");

  return (
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
          <h2 className="font-semibold text-lg">{t("navigationLabel")}</h2>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
          aria-label={t("collapseLabel")}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item: any) => {
          const isActive = pathname === item.href;

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
  );
}
