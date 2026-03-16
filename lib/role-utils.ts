import { PermissionGroup } from "@/store/slices/permissionGroup/getAllPermissionGroupsSlice";

export type RoleLevel = "company" | "department" | "position" | "role";

/**
 * Check if a permission group ID corresponds to an administrative role.
 */
export const isAdminRole = (
  pgId: string | undefined,
  permissionGroups: PermissionGroup[]
): boolean => {
  if (!pgId) return false;
  const pg = permissionGroups.find((g) => g.id === pgId);
  if (!pg) return false;

  const normalized = pg.name.toLowerCase().trim();
  const adminKeywords = ["admin", "administrator", "adminstrater", "adminstrator", "root"];
  return adminKeywords.some((kw) => normalized === kw || normalized.includes(kw));
};
