import { BreadcrumbItemProps } from "@/types/shared";

export const breadcrumbUtils = {
  /**
   * Truncate breadcrumbs with ellipsis when exceeding max items
   */
  truncateItems: (items: BreadcrumbItemProps[], maxItems: number): BreadcrumbItemProps[] => {
    if (items.length <= maxItems) return items;

    return [...items.slice(0, 1), { title: "...", href: "#" }, ...items.slice(-(maxItems - 2))];
  },

  /**
   * Generate breadcrumbs from path segments
   */
  generateFromSegments: (
    segments: string[],
    customTitles?: Record<string, string>
  ): BreadcrumbItemProps[] => {
    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const title =
        customTitles?.[segment] ||
        segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

      return { title, href };
    });
  },

  /**
   * Create home breadcrumb item
   */
  createHomeItem: (label: string = "Home"): BreadcrumbItemProps => ({
    title: label,
    href: "/",
  }),

  /**
   * Validate breadcrumb items
   */
  validateItems: (items: BreadcrumbItemProps[]): boolean => {
    return items.every(
      (item) =>
        typeof item.title === "string" && typeof item.href === "string" && item.title.length > 0
    );
  },
};
