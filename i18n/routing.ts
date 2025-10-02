import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ur"] as const,
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/dashboard": "/dashboard",
    "/auth/login": {
      en: "/auth/login",
      ur: "/auth/login",
    },
    "/auth/signup": {
      en: "/auth/signup",
      ur: "/auth/signup",
    },
    "/auth/forgot": {
      en: "/auth/forgot",
      ur: "/auth/forgot",
    },
    "/auth/otp": {
      en: "/auth/otp",
      ur: "/auth/otp",
    },
    "/auth/reset": {
      en: "/auth/reset",
      ur: "/auth/reset",
    },
  },
} as const);

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
