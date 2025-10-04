"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { type NavigationItem } from "./i18n-config";

interface NavigationMenuProps {
  items: NavigationItem[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function NavigationMenu({
  items,
  orientation = "horizontal",
  className,
}: NavigationMenuProps) {
  const t = useTranslations("navigation");

  const menuClasses = cn(
    "flex gap-2",
    {
      "flex-row items-center": orientation === "horizontal",
      "flex-col space-y-1": orientation === "vertical",
    },
    className
  );

  const linkClasses = cn(
    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
    "hover:bg-accent hover:text-accent-foreground",
    "focus:bg-accent focus:text-accent-foreground focus:outline-none"
  );

  return (
    <nav className={menuClasses}>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.key}
            href={item.href}
            className={linkClasses}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{t(item.key)}</span>
            {item.badge && (
              <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default NavigationMenu;
