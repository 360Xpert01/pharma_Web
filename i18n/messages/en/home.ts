const home = {
  // Brand / Header
  brand: "PEAOX",
  // Main hero section
  hero: {
    title: "Ship fast with a configurable, typed, and scalable Next.js starter",
    description:
      "Includes Redux Toolkit + Persist, React Query, Zod + React Hook Form, next-themes with light/dark/ocean, axios with interceptors, and a powerful configurable layout system that adapts to websites, dashboards, and portals.",
    subtitle: "Open-source, batteries-included starter to build modern apps",
    waitlistBadge: "Production Ready Starter",
    primaryButton: "Open Dashboard",
    primaryButtonLabel: "Open dashboard",
    secondaryButton: "Try Layout Settings",
    secondaryButtonLabel: "Try layout settings",
  },

  // Feature showcase
  features: {
    title: "Powerful Features",
    subtitle: "Everything you need to build modern applications",
    overlayImageAlt: "Dashboard preview",
    showcaseTitle: "Beautiful UI + UX",
    showcaseDescription: "Pre-styled components and pages to get you moving fast",
    layoutSystemTitle: "Configurable Layout System",
    layoutSystemDescription:
      "Dynamically configure headers, sidebars, footers, and content layouts with real-time preview.",
    layoutSystemIcon: "🎨",
    fast: {
      title: "Lightning Fast",
      description: "Optimized performance for production-ready applications",
    },
    secure: {
      title: "Secure by Default",
      description: "Built-in security best practices and protections",
    },
    scalable: {
      title: "Highly Scalable",
      description: "Grows with your application needs",
    },
    developer: {
      title: "Developer Friendly",
      description: "Intuitive APIs and comprehensive documentation",
    },
  },

  // Navigation
  navigation: {
    home: "Home",
    dashboard: "Dashboard",
    settings: "Settings",
    docs: "Documentation",
    about: "About",
  },

  // Trusted by
  trusted: {
    title: "Trusted by teams using",
    nextjs: "React Framework",
    tailwind: "Utility-first CSS",
    shadcn: "Component Library",
    vercel: "Deployment Platform",
  },
  pricing: {
    title: "Simple, transparent pricing",
    subtitle: "Choose the plan that works best for you and your team.",
    period: "/month",
    getStarted: "Get Started",
    contactSales: "Contact Sales",
    mostPopular: "Most Popular",
    plans: {
      basic: {
        name: "Basic",
        description: "Essential features for individuals",
        price: "9",
        features: ["1 user", "5 projects", "5GB storage", "Basic support"],
      },
      pro: {
        name: "Pro",
        description: "Advanced features for professionals",
        price: "29",
        features: [
          "5 users",
          "Unlimited projects",
          "50GB storage",
          "Priority support",
          "Advanced analytics",
          "API access",
        ],
      },
      team: {
        name: "Team",
        description: "Everything a growing team needs",
        price: "79",
        features: [
          "Unlimited users",
          "Unlimited projects",
          "500GB storage",
          "24/7 support",
          "Advanced analytics",
          "API access",
          "SSO authentication",
          "Custom integrations",
        ],
      },
    },
  },
} as const;

export default home;
export type HomeMessages = typeof home;
