"use client";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { usePathname } from "@/routes/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export default function DashboardNav({ items, setOpen, isMobileNav = false }: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!items?.length) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return path === "/";
    }
    return path.startsWith(href);
  };

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          if (item.logout) {
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium transition-colors duration-200",
                      "hover:bg-primary/10 hover:text-primary",
                      isMobileNav || (!isMinimized && !isMobileNav) ? "" : ""
                    )}
                    onClick={async () => {
                      await logout();
                      if (setOpen) setOpen(false);
                      navigate("/auth/signin");
                    }}
                  >
                    <Icon className="ml-2.5 size-5 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">{item.title}</span>
                    ) : (
                      ""
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? "hidden" : "inline-block"}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            );
          }
          return (
            item.href && (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.disabled ? "/" : item.href}
                    className={cn(
                      "group flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium transition-colors duration-200",
                      isActive(item.href)
                        ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                        : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                  >
                    <Icon
                      className={cn(
                        "ml-2.5 size-5 transition-colors duration-200",
                        isActive(item.href)
                          ? "text-white"
                          : "text-muted-foreground group-hover:text-primary"
                      )}
                    />

                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">{item.title}</span>
                    ) : (
                      ""
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? "hidden" : "inline-block"}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
