const home = {
  // Main hero section
  hero: {
    title: "Ship fast with a configurable, typed, and scalable Next.js starter",
    description:
      "Includes Redux Toolkit + Persist, React Query, Zod + React Hook Form, next-themes with light/dark/ocean, axios with interceptors, and a powerful configurable layout system that adapts to websites, dashboards, and portals.",
    primaryButton: "Open Dashboard",
    primaryButtonLabel: "Open dashboard",
    secondaryButton: "Try Layout Settings",
    secondaryButtonLabel: "Try layout settings",
  },

  // Feature showcase
  features: {
    layoutSystemTitle: "Configurable Layout System",
    layoutSystemDescription:
      "Dynamically configure headers, sidebars, footers, and content layouts with real-time preview.",
    layoutSystemIcon: "🎨",
  },

  // Navigation
  navigation: {
    home: "Home",
    dashboard: "Dashboard",
    settings: "Settings",
    docs: "Documentation",
    about: "About",
  },
} as const;

export default home;
export type HomeMessages = typeof home;
