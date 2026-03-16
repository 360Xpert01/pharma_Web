export type PermissionGroupName = "Administrator" | "C-Suite" | "Manager" | "Sales Representative";

// ─── Nav item access per role ─────────────────────────────────────────────────
export const ROLE_NAV_ACCESS: Record<PermissionGroupName, string[]> = {
  Administrator: ["*"],
  "C-Suite": [
    "Dashboard",
    "People & Teams",
    "Accounts",
    "Products & Samples",
    "DCR & Field Ops",
    "Analytics & Reports",
    "Compliance",
    "Support",
  ],
  Manager: [
    "Dashboard",
    "People & Teams",
    "Accounts",
    "Products & Samples",
    "DCR & Field Ops",
    "Analytics & Reports",
    "Support",
  ],
  "Sales Representative": [], // blocked at login — never reaches navbar
};

// ─── What actions each role can perform ──────────────────────────────────────
export type Action = "view" | "add" | "edit" | "delete";

export const ROLE_ACTIONS: Record<PermissionGroupName, Action[]> = {
  Administrator: ["view", "add", "edit", "delete"],
  "C-Suite": ["view"], // view only, no mutations
  Manager: ["view", "add", "edit"], // no delete
  "Sales Representative": [], // blocked
};

// ─── Route-level access ───────────────────────────────────────────────────────
export const ROLE_ROUTE_ACCESS: Record<PermissionGroupName, string[]> = {
  Administrator: ["*"],
  "C-Suite": ["/dashboard", "/support", "/ai"],
  Manager: ["/dashboard", "/support"],
  "Sales Representative": [],
};

// ─── Helper functions ─────────────────────────────────────────────────────────
export function canAccessNav(role: PermissionGroupName, navLabel: string): boolean {
  const allowed = ROLE_NAV_ACCESS[role];
  return allowed.includes("*") || allowed.includes(navLabel);
}

export function canDo(role: PermissionGroupName, action: Action): boolean {
  return ROLE_ACTIONS[role]?.includes(action) ?? false;
}

export function canAccessRoute(role: PermissionGroupName, pathname: string): boolean {
  const allowed = ROLE_ROUTE_ACCESS[role];
  if (allowed.includes("*")) return true;
  return allowed.some((r) => pathname.startsWith(r));
}
