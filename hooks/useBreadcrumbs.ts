"use client";

import { usePathname } from "next/navigation";
import { BreadcrumbItemProps } from "@/types/shared";

interface UseBreadcrumbsReturn {
  generateFromPath: (customTitles?: Record<string, string>) => BreadcrumbItemProps[];
  currentPath: string;
}

export function useBreadcrumbs(): UseBreadcrumbsReturn {
  const pathname = usePathname();

  const generateFromPath = (customTitles?: Record<string, string>): BreadcrumbItemProps[] => {
    const segments = pathname.split("/").filter(Boolean);
    const items: BreadcrumbItemProps[] = [];

    segments.forEach((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const title =
        customTitles?.[segment] ||
        segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

      items.push({ title, href });
    });

    return items;
  };

  return {
    generateFromPath,
    currentPath: pathname,
  };
}
