export type PermissionGroupName = string;

type BaseRole = "ADMIN" | "CSUITE" | "MANAGER" | "SALES" | "UNKNOWN";

export function resolveBaseRole(permissionGroup: string): BaseRole {
  const n = permissionGroup.toLowerCase();
  if (n.includes("admin") || n.includes("root")) return "ADMIN";
  if (n.includes("c-suite") || n.includes("csuite")) return "CSUITE";
  if (n.includes("manager")) return "MANAGER";
  if (n.includes("sales")) return "SALES";
  return "UNKNOWN";
}

// ─── Nav item access per role ─────────────────────────────────────────────────
export const ROLE_NAV_ACCESS: Record<BaseRole, string[]> = {
  ADMIN: ["*"],
  CSUITE: ["*", "!Control Center"],
  MANAGER: ["*", "!Control Center"],
  SALES: [],
  UNKNOWN: [],
};

// ─── What actions each role can perform ──────────────────────────────────────
export type Action = "view" | "add" | "edit" | "delete";

export const ROLE_ACTIONS: Record<BaseRole, Action[]> = {
  ADMIN: ["view", "add", "edit", "delete"],
  CSUITE: ["view"],
  MANAGER: ["view"], // Standardized to view-only/approvals (represented as 'view' for now)
  SALES: [],
  UNKNOWN: [],
};

// ─── Route-level access ───────────────────────────────────────────────────────
// Explicitly list routes that belong to "Control Center" to block them
const CONTROL_CENTER_ROUTES = [
  "/dashboard/bricks-hierarchy",
  "/dashboard/role-hierarchy",
  "/dashboard/AddPrefix",
  "/dashboard/territory-Management",
  "/dashboard/Channals",
  "/dashboard/Add-Call-points",
  "/dashboard/product-categories",
  "/dashboard/doctor-segments",
  "/dashboard/doctor-qualifications",
  "/dashboard/distributor-types",
  "/dashboard/doctor-specialities",
  "/dashboard/User-Role",
  "/dashboard/csvImports",
  "/integrations/api",
  "/integrations/import",
  "/integrations/bi",
];

export const ROLE_ROUTE_ACCESS: Record<BaseRole, string[]> = {
  ADMIN: ["*"],
  CSUITE: ["*", ...CONTROL_CENTER_ROUTES.map((r) => `!${r}`)],
  MANAGER: ["*", ...CONTROL_CENTER_ROUTES.map((r) => `!${r}`)],
  SALES: [],
  UNKNOWN: [],
};

// ─── Helper functions ─────────────────────────────────────────────────────────
export function canAccessNav(permissionGroup: string, navLabel: string): boolean {
  const baseRole = resolveBaseRole(permissionGroup);
  const allowed = ROLE_NAV_ACCESS[baseRole];
  if (allowed?.includes(`!${navLabel}`)) return false;
  return allowed?.includes("*") || allowed?.includes(navLabel) || false;
}

export function canDo(permissionGroup: string, action: Action): boolean {
  const baseRole = resolveBaseRole(permissionGroup);
  return ROLE_ACTIONS[baseRole]?.includes(action) ?? false;
}

export function canAccessRoute(permissionGroup: string, pathname: string): boolean {
  const baseRole = resolveBaseRole(permissionGroup);
  const allowed = ROLE_ROUTE_ACCESS[baseRole];

  // First check if explicitly blocked
  if (allowed?.some((r) => r.startsWith("!") && pathname.startsWith(r.slice(1)))) {
    return false;
  }

  return allowed?.includes("*") || allowed?.some((r) => pathname.startsWith(r)) || false;
}
