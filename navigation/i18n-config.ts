import {
  HomeIcon,
  BarChartIcon,
  SettingsIcon,
  UsersIcon,
  FileIcon,
  PaletteIcon,
  HelpIcon,
  GlobeIcon,
  ShieldIcon,
  MailIcon,
} from "@/lib/icons";

// Navigation item interface
export interface NavigationItem {
  key: string; // For translation lookup
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavigationItem[];
  external?: boolean;
}

// Header navigation links (horizontal navigation)
export const headerNavigation: NavigationItem[] = [
  {
    key: "home",
    href: "/",
    icon: HomeIcon,
  },
  {
    key: "dashboard",
    href: "/dashboard",
    icon: BarChartIcon,
  },
  {
    key: "settings",
    href: "/settings",
    icon: SettingsIcon,
  },
];

// Sidebar navigation (vertical navigation for dashboard)
export const sidebarNavigation: NavigationItem[] = [
  {
    key: "dashboard",
    href: "/dashboard",
    icon: BarChartIcon,
  },
  {
    key: "analytics",
    href: "/analytics",
    icon: BarChartIcon,
  },
  {
    key: "users",
    href: "/users",
    icon: UsersIcon,
  },
  {
    key: "settings",
    href: "/settings",
    icon: SettingsIcon,
  },
  {
    key: "help",
    href: "/help",
    icon: HelpIcon,
  },
];

// Footer navigation links
export const footerNavigation: NavigationItem[] = [
  {
    key: "privacy",
    href: "/privacy",
  },
  {
    key: "terms",
    href: "/terms",
  },
  {
    key: "contact",
    href: "/contact",
  },
];

// Social media links
export const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: GlobeIcon, // Replace with actual social icons
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: GlobeIcon,
  },
];

// Breadcrumb configuration
export const breadcrumbConfig = {
  showHome: true,
  separator: "/",
  maxItems: 3,
};

export default {
  headerNavigation,
  sidebarNavigation,
  footerNavigation,
  socialLinks,
  breadcrumbConfig,
};
