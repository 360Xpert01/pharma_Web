export type PermissionGroupName = string;

type BaseRole = "ADMIN" | "CSUITE" | "MANAGER" | "SALES" | "UNKNOWN";

function resolveBaseRole(permissionGroup: string): BaseRole {
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
  CSUITE: [
    "Dashboard",
    "People & Teams",
    "Accounts",
    "Products & Samples",
    "DCR & Field Ops",
    "Analytics & Reports",
    "Compliance",
    "Support",
  ],
  MANAGER: [
    "Dashboard",
    "People & Teams",
    "Accounts",
    "Products & Samples",
    "DCR & Field Ops",
    "Analytics & Reports",
    "Support",
  ],
  SALES: [],
  UNKNOWN: [],
};

// ─── What actions each role can perform ──────────────────────────────────────
export type Action = "view" | "add" | "edit" | "delete";

export const ROLE_ACTIONS: Record<BaseRole, Action[]> = {
  ADMIN: ["view", "add", "edit", "delete"],
  CSUITE: ["view"],
  MANAGER: ["view", "add", "edit"],
  SALES: [],
  UNKNOWN: [],
};

// ─── Route-level access ───────────────────────────────────────────────────────
export const ROLE_ROUTE_ACCESS: Record<BaseRole, string[]> = {
  ADMIN: ["*"],
  CSUITE: ["/dashboard", "/support", "/ai"],
  MANAGER: ["/dashboard", "/support"],
  SALES: [],
  UNKNOWN: [],
};

// ─── Helper functions ─────────────────────────────────────────────────────────
export function canAccessNav(permissionGroup: string, navLabel: string): boolean {
  const baseRole = resolveBaseRole(permissionGroup);
  const allowed = ROLE_NAV_ACCESS[baseRole];
  return allowed?.includes("*") || allowed?.includes(navLabel) || false;
}

export function canDo(permissionGroup: string, action: Action): boolean {
  const baseRole = resolveBaseRole(permissionGroup);
  return ROLE_ACTIONS[baseRole]?.includes(action) ?? false;
}

export function canAccessRoute(permissionGroup: string, pathname: string): boolean {
  const baseRole = resolveBaseRole(permissionGroup);
  const allowed = ROLE_ROUTE_ACCESS[baseRole];
  return allowed?.includes("*") || allowed?.some((r) => pathname.startsWith(r)) || false;
}
