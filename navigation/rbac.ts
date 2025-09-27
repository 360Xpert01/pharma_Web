export type Role = "guest" | "user" | "admin";

export const permissions = {
  dashboard: ["user", "admin"] as Role[],
  adminPanel: ["admin"] as Role[],
};

export function canAccess(role: Role, resource: keyof typeof permissions) {
  return permissions[resource].includes(role);
}
