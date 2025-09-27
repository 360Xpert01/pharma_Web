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
  MailIcon
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
}

// Header navigation links (horizontal navigation)
export const headerNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: HomeIcon,
    description: "Dashboard overview"
  },
  {
    title: "Site",
    href: "/",
    icon: GlobeIcon,
    description: "Visit main site",
    external: true
  },
  {
    title: "Layout",
    href: "/dashboard/layout-settings",
    icon: PaletteIcon,
    description: "Configure layout"
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
    description: "Application settings"
  }
];

// Sidebar navigation links (vertical navigation)
export const sidebarNavigation: NavigationItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: HomeIcon,
    description: "Dashboard overview"
  },
  {
    title: "Analytics", 
    href: "/dashboard/analytics",
    icon: BarChartIcon,
    description: "View analytics and metrics",
    badge: "New"
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: UsersIcon,
    description: "Manage users and permissions",
    badge: "Demo"
  },
  {
    title: "Content",
    href: "/dashboard/content",
    icon: FileIcon,
    description: "Manage content and resources",
    badge: "Demo"
  },
  {
    title: "Layout Settings",
    href: "/dashboard/layout-settings",
    icon: PaletteIcon,
    description: "Configure layout options",
    badge: "Live"
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
    description: "Application settings"
  }
];

// Mobile navigation links (for mobile hamburger menu - header nav)
export const mobileNavigation: NavigationItem[] = [
  ...headerNavigation,
  {
    title: "Help",
    href: "/help",
    icon: HelpIcon,
    description: "Get help and support"
  }
];

// Footer navigation links
export const footerNavigation: NavigationItem[] = [
  {
    title: "Privacy",
    href: "/privacy",
    icon: ShieldIcon,
    description: "Privacy policy"
  },
  {
    title: "Terms", 
    href: "/terms",
    description: "Terms of service"
  },
  {
    title: "Contact",
    href: "/contact",
    icon: MailIcon,
    description: "Contact us"
  },
  {
    title: "About",
    href: "/about",
    description: "About us"
  }
];

// Social links for footer
export const socialLinks: NavigationItem[] = [
  {
    title: "GitHub",
    href: "https://github.com",
    external: true
  },
  {
    title: "Twitter", 
    href: "https://twitter.com",
    external: true
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com", 
    external: true
  }
];

// Legacy exports for backward compatibility
export const headerLinks = headerNavigation.map(item => ({
  href: item.href,
  label: item.title
}));

export const footerLinks = footerNavigation.map(item => ({
  href: item.href,
  label: item.title
}));

// Export everything for easy imports
export {
  headerNavigation as header,
  sidebarNavigation as sidebar, 
  mobileNavigation as mobile,
  footerNavigation as footer,
  socialLinks as social
};