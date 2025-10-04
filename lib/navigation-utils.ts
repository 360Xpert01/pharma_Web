import type { NavigationItem } from "@/navigation/config";

/**
 * Get translated title from navigation item
 */
export function getNavItemTitle(item: NavigationItem, t: (key: string) => string): string {
  if (item.titleKey) {
    try {
      return t(item.titleKey);
    } catch {
      // Fallback to original title if translation key doesn't exist
      return item.title;
    }
  }
  return item.title;
}

/**
 * Get translated description from navigation item
 */
export function getNavItemDescription(
  item: NavigationItem,
  t: (key: string) => string
): string | undefined {
  if (item.descriptionKey) {
    try {
      return t(item.descriptionKey);
    } catch {
      // Fallback to original description if translation key doesn't exist
      return item.description;
    }
  }
  return item.description;
}

/**
 * Get translated badge from navigation item
 */
export function getNavItemBadge(
  item: NavigationItem,
  t: (key: string) => string
): string | undefined {
  if (item.badgeKey) {
    try {
      return t(item.badgeKey);
    } catch {
      // Fallback to original badge if translation key doesn't exist
      return item.badge;
    }
  }
  return item.badge;
}

/**
 * Get navigation item by href (for route matching)
 */
export function getNavItemByHref(
  href: string,
  navItems: NavigationItem[]
): NavigationItem | undefined {
  return navItems.find((item) => item.href === href);
}

/**
 * Check if a route is active (matches current path)
 */
export function isRouteActive(itemHref: string, currentPath: string): boolean {
  // Exact match for most routes
  if (itemHref === currentPath) {
    return true;
  }

  // Special case for dashboard root - should be active only on exact match
  if (itemHref === "/dashboard" && currentPath === "/dashboard") {
    return true;
  }

  // For sub-routes, check if current path starts with item href (but not for root)
  if (itemHref !== "/dashboard" && itemHref !== "/" && currentPath.startsWith(itemHref)) {
    return true;
  }

  return false;
}
