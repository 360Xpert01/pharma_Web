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
    "/privacy": {
      en: "/privacy",
      ur: "/privacy",
    },
    "/terms": {
      en: "/terms",
      ur: "/terms",
    },
    "/contact": {
      en: "/contact",
      ur: "/contact",
    },
    "/about": {
      en: "/about",
      ur: "/about",
    },
    "/docs": {
      en: "/docs",
      ur: "/docs",
    },
    "/support": {
      en: "/support",
      ur: "/support",
    },
    "/changelog": {
      en: "/changelog",
      ur: "/changelog",
    },
  },
} as const);

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
