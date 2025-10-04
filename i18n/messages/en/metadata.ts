const metadata = {
  // Default metadata
  default: {
    title: "Next.js Starter",
    description: "A modern Next.js starter with TypeScript, Tailwind CSS, and more",
    keywords: "nextjs, typescript, tailwindcss, starter, template",
  },

  // Page-specific metadata
  pages: {
    home: {
      title: "Home - Next.js Starter",
      description: "Welcome to our modern Next.js starter template",
    },
    dashboard: {
      title: "Dashboard - Next.js Starter",
      description: "Comprehensive dashboard with real-time metrics and analytics",
    },
    auth: {
      login: {
        title: "Login - Next.js Starter",
        description: "Sign in to your account",
      },
      signup: {
        title: "Sign Up - Next.js Starter",
        description: "Create a new account",
      },
      forgot: {
        title: "Forgot Password - Next.js Starter",
        description: "Reset your password",
      },
    },
    error: {
      title: "Error - Next.js Starter",
      description: "An error occurred",
    },
    notFound: {
      title: "Page Not Found - Next.js Starter",
      description: "The page you're looking for doesn't exist",
    },
  },

  // Open Graph metadata
  openGraph: {
    siteName: "Next.js Starter",
    type: "website",
    locale: "en_US",
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    site: "@nextjs",
    creator: "@nextjs",
  },
} as const;

export default metadata;
export type MetadataMessages = typeof metadata;
