"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mobileNavigation } from "@/navigation/config";

interface MobileNavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function MobileNavigationMenu({ isOpen, onClose, className }: MobileNavigationMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className={cn(
      "absolute top-full left-0 right-0 bg-background/95",
      "border-b border-border/40 shadow-lg md:hidden",
      className
    )}>
      <nav className="p-4 space-y-2 overflow-y-auto">
        {mobileNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
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
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.description && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default MobileNavigationMenu;