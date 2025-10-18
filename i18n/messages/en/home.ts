const home = {
  // Brand / Header
  brand: "Next Boilerplate",
  // Main hero section
  hero: {
    title: "Build modern apps with a powerful Next.js boilerplate",
    description:
      "Type-safe, scalable, and production-ready. Includes Redux Toolkit, React Query, Zod, React Hook Form, next-themes, shadcn/ui, socket.io, i18n, authentication, and a flexible layout system.",
    subtitle:
      "All-in-one starter for SaaS, dashboards, and web apps. Fast, beautiful, and developer-focused.",
    waitlistBadge: "Production Ready Boilerplate",
    primaryButton: "View Dashboard",
    primaryButtonLabel: "View dashboard",
    secondaryButton: "Explore Layouts",
    secondaryButtonLabel: "Explore layouts",
  },

  // Feature showcase
  features: {
    overlayImageAlt: "Platform showcase",
    showcaseTitle: "Modern Developer Experience",
    showcaseDescription: "Everything you need to build, scale, and launch production-grade apps.",
    title: "What makes this boilerplate special?",
    subtitle:
      "A complete toolkit for SaaS, dashboards, and web apps. Built for speed, flexibility, and best practices.",
    aiAutomation: {
      title: "Type-Safe Everywhere",
      description:
        "Full TypeScript support across backend, frontend, and API for maximum safety and DX.",
    },
    lightningFast: {
      title: "Lightning Fast UI",
      description:
        "Optimized with Next.js, shadcn/ui, and Tailwind for instant, beautiful interfaces.",
    },
    enterpriseSecurity: {
      title: "Authentication & Security",
      description: "Built-in auth, protected routes, and secure best practices out of the box.",
    },
    scalableInfrastructure: {
      title: "Scalable State & Data",
      description: "Redux Toolkit, React Query, and Zod for robust state, async, and validation.",
    },
    cloudNative: {
      title: "Socket.io & Real-Time",
      description: "First-class socket.io integration for real-time features and collaboration.",
    },
    developerFirst: {
      title: "Internationalization (i18n)",
      description: "Next-intl and full RTL/LTR support for global-ready apps.",
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

  cta: {
    title: "Start your app with Next.js boilerplate",
    primaryButton: "Get Started",
    secondaryButton: "Live Demo",
  },
  showcase: {
    title: "Complete Starter Kit for Modern Web Apps",
    description:
      "A production-ready Next.js starter with dynamic layout system, advanced form builder, real-time dashboard, enterprise authentication, and modern UI components.",
    imageAlt: "Dashboard and app preview",
    showcaseTitle: "Powerful & Modern Development Experience",
    showcaseDescription:
      "Build modern applications with all essential features, integrations, and tooling included.",
    features: {
      layoutSystem: "Dynamic Layout System (multiple variants, responsive, state persistence)",
      formBuilder: "Advanced Form Builder (type-safe, 20+ fields, dynamic validation)",
      realtimeDashboard: "Real-time Dashboard (Socket.IO, WebSocket, live updates)",
      enterpriseAuth: "Enterprise Authentication (role-based access, full auth flow)",
      uiComponents: "Modern UI Components (shadcn/ui, Radix UI, custom themes)",
      stateManagement: "State Management (Redux Toolkit, React Query, persistence)",
      testingSuite: "Testing Suite (unit, integration, E2E, coverage)",
      performance: "Performance Optimized (server components, lazy loading, bundle optimization)",
      storybook: "Storybook Integration (isolated component development, client logging)",
      socketTesting: "Local Socket.IO Testing (Express.js test server)",
      apiNetworking: "API & Networking (Axios, middleware, type-safe endpoints, error handling)",
      logging: "Logging System (client-side Pino, structured output)",
      theming: "Theming & UI (next-themes, 3 themes, CSS variables, theme toggle)",
      styling: "Styling Architecture (Tailwind CSS 4, design system, responsive, animations)",
    },
  },
  build: {
    title: "Built with",
    stack: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Shadcn Ui" },
      { name: "Storybook" },
    ],
  },
  pricing: {
    title: "Simple, transparent pricing",
    subtitle: "Flexible plans for SaaS, dashboards, and web apps.",
    period: "/month",
    getStarted: "Get Started",
    contactSales: "Contact Sales",
    mostPopular: "Most Popular",
    plans: {
      basic: {
        name: "Starter",
        description: "All core features for solo developers",
        price: "50",
        features: ["1 project", "All integrations", "Authentication & i18n", "Basic support"],
      },
      pro: {
        name: "Pro",
        description: "Advanced features for growing teams",
        price: "100",
        features: [
          "5 projects",
          "Socket.io & real-time",
          "Priority support",
          "Custom layouts",
          "Advanced analytics",
          "API access",
        ],
      },
      team: {
        name: "Enterprise",
        description: "Full power for organizations",
        price: "200",
        features: [
          "Unlimited projects",
          "SSO & custom integrations",
          "24/7 support",
          "White-labeling",
          "Dedicated onboarding",
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
