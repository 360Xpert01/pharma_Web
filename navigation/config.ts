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
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  description?: string;
  children?: NavigationItem[];
  external?: boolean;
  titleKey?: string; // Translation key for title
  descriptionKey?: string; // Translation key for description
  badgeKey?: string; // Translation key for badge
}

// Header navigation links (horizontal navigation)
export const headerNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    titleKey: "main.dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    description: "Dashboard overview",
    descriptionKey: "routes./dashboard.description",
  },
  {
    title: "Site",
    titleKey: "main.site",
    href: "/",
    icon: GlobeIcon,
    description: "Visit main site",
    descriptionKey: "routes./.description",
    external: true,
  },
  {
    title: "Layout",
    titleKey: "main.layout",
    href: "/dashboard/layout-settings",
    icon: PaletteIcon,
    description: "Configure layout",
    descriptionKey: "routes./dashboard/layout-settings.description",
  },
  {
    title: "Settings",
    titleKey: "main.settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
    description: "Application settings",
    descriptionKey: "routes./dashboard/settings.description",
  },
];

// Sidebar navigation links (vertical navigation)
export const sidebarNavigation: NavigationItem[] = [
  {
    title: "Overview",
    titleKey: "dashboard.overview",
    href: "/dashboard",
    icon: HomeIcon,
    description: "Dashboard overview",
    descriptionKey: "routes./dashboard.description",
  },
  {
    title: "Analytics",
    titleKey: "dashboard.analytics",
    href: "/dashboard/analytics",
    icon: BarChartIcon,
    description: "View analytics and metrics",
    descriptionKey: "routes./dashboard/analytics.description",
    badge: "New",
    badgeKey: "badges.new",
  },
  {
    title: "Users",
    titleKey: "dashboard.users",
    href: "/dashboard/users",
    icon: UsersIcon,
    description: "Manage users and permissions",
    descriptionKey: "routes./dashboard/users.description",
    badge: "Demo",
    badgeKey: "badges.demo",
  },
  {
    title: "Content",
    titleKey: "dashboard.content",
    href: "/dashboard/content",
    icon: FileIcon,
    description: "Manage content and resources",
    descriptionKey: "routes./dashboard/content.description",
    badge: "Demo",
    badgeKey: "badges.demo",
  },
  {
    title: "Layout Settings",
    titleKey: "main.layoutSettings",
    href: "/dashboard/layout-settings",
    icon: PaletteIcon,
    description: "Configure layout options",
    descriptionKey: "routes./dashboard/layout-settings.description",
    badge: "Live",
    badgeKey: "badges.live",
  },
  {
    title: "Settings",
    titleKey: "main.settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
    description: "Application settings",
    descriptionKey: "routes./dashboard/settings.description",
  },
];

// Mobile navigation links (for mobile hamburger menu - header nav)
export const mobileNavigation: NavigationItem[] = [
  ...headerNavigation,
  {
    title: "Help",
    titleKey: "main.help",
    href: "/help",
    icon: HelpIcon,
    description: "Get help and support",
    descriptionKey: "routes./help.description",
  },
];

// Footer navigation links
export const footerNavigation: NavigationItem[] = [
  {
    title: "Privacy",
    titleKey: "footer.privacy",
    href: "/privacy",
    icon: ShieldIcon,
    description: "Privacy policy",
    descriptionKey: "routes./privacy.description",
  },
  {
    title: "Terms",
    titleKey: "footer.terms",
    href: "/terms",
    description: "Terms of service",
    descriptionKey: "routes./terms.description",
  },
  {
    title: "Contact",
    titleKey: "footer.contact",
    href: "/contact",
    icon: MailIcon,
    description: "Contact us",
    descriptionKey: "routes./contact.description",
  },
  {
    title: "About",
    titleKey: "footer.about",
    href: "/about",
    description: "About us",
    descriptionKey: "routes./about.description",
  },
];

// Social links for footer
export const socialLinks: NavigationItem[] = [
  {
    title: "GitHub",
    titleKey: "footer.github",
    href: "https://github.com",
    external: true,
  },
  {
    title: "Twitter",
    titleKey: "footer.twitter",
    href: "https://twitter.com",
    external: true,
  },
  {
    title: "LinkedIn",
    titleKey: "footer.linkedin",
    href: "https://linkedin.com",
    external: true,
  },
];

// Legacy exports for backward compatibility
export const headerLinks = headerNavigation.map((item) => ({
  href: item.href,
  label: item.title,
}));

export const footerLinks = footerNavigation.map((item) => ({
  href: item.href,
  label: item.title,
}));

// Export everything for easy imports
export {
  headerNavigation as header,
  sidebarNavigation as sidebar,
  mobileNavigation as mobile,
  footerNavigation as footer,
  socialLinks as social,
};
