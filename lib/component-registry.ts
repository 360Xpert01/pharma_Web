// Component registry for dynamic lazy loading
import { componentRegistry, createLazyRoute } from "@/lib/lazy-loading";

// Register dashboard components
componentRegistry.register("dashboard-metrics", () =>
  import("@/app/[locale]/dashboard/components/metrics-cards").then((m) => ({
    default: m.MetricsCards,
  }))
);

componentRegistry.register("dashboard-charts", () =>
  import("@/app/[locale]/dashboard/components/interactive-charts").then((m) => ({
    default: m.InteractiveCharts,
  }))
);

componentRegistry.register("dashboard-data-lists", () =>
  import("@/app/[locale]/dashboard/components/data-lists").then((m) => ({ default: m.DataLists }))
);

// Register page routes
componentRegistry.register("dashboard-page", () => import("@/app/[locale]/dashboard/page"));

componentRegistry.register("home-page", () => import("@/app/[locale]/page"));

// Auth pages
componentRegistry.register("auth-login", () => import("@/app/[locale]/(auth)/login/page"));

componentRegistry.register("auth-signup", () => import("@/app/[locale]/(auth)/signup/page"));

// Lazy route components
export const LazyDashboard = createLazyRoute(
  () => import("@/app/[locale]/dashboard/page"),
  "Dashboard"
);

export const LazyHome = createLazyRoute(() => import("@/app/[locale]/page"), "Home");

export const LazyAuthLogin = createLazyRoute(
  () => import("@/app/[locale]/(auth)/login/page"),
  "Login"
);

// Preload critical routes on app initialization
export const preloadCriticalRoutes = () => {
  componentRegistry.preload("dashboard-page");
  componentRegistry.preload("home-page");
};

// Preload all registered components (useful for offline support)
export const preloadAllComponents = () => {
  componentRegistry.preloadAll();
};
