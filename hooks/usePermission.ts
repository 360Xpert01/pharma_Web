import { useAppSelector } from "@/store";
import { canAccessNav, canDo, canAccessRoute } from "@/lib/rbac";
import type { PermissionGroupName, Action } from "@/lib/rbac";

export function usePermission() {
  const {
    permissionGroupName,
    userRole,
    permissionGroupId,
    token,
    userEmail,
    userName,
    avatar,
    roleId,
  } = useAppSelector((s) => ({
    permissionGroupName:
      s.getUserProfile.user?.permissionGroupName ||
      s.verifyOtp.permissionGroupName ||
      s.login.permissionGroupName ||
      s.auth.user?.permissionGroupName ||
      s.getUserProfile.user?.userRole ||
      s.getUserProfile.user?.role ||
      s.verifyOtp.user?.userRole ||
      (s.auth.user as any)?.role,
    userRole:
      s.getUserProfile.user?.userRole ||
      s.getUserProfile.user?.role ||
      s.verifyOtp.user?.userRole ||
      (s.auth.user as any)?.role ||
      s.getUserProfile.user?.permissionGroupName ||
      s.verifyOtp.permissionGroupName ||
      s.login.permissionGroupName ||
      s.auth.user?.permissionGroupName,
    roleId:
      s.getUserProfile.user?.roleId ||
      s.verifyOtp.user?.roleId ||
      s.login.user?.roleId ||
      s.auth.user?.roleId,
    permissionGroupId:
      s.getUserProfile.user?.permissionGroupId ||
      s.verifyOtp.permissionGroupId ||
      s.login.permissionGroupId ||
      s.auth.user?.permissionGroupId,
    token: s.verifyOtp.token || s.auth.token,
    userEmail:
      s.getUserProfile.user?.email ||
      s.verifyOtp.userEmail ||
      s.login.userEmail ||
      s.auth.user?.email,
    userName:
      s.getUserProfile.user?.userName ||
      s.getUserProfile.user?.name ||
      s.getUserProfile.user?.firstName ||
      s.verifyOtp.user?.userName ||
      s.login.user?.userName ||
      s.verifyOtp.userName ||
      s.login.userName ||
      s.auth.user?.name ||
      "User",
    avatar: s.getUserProfile.user?.avatar,
  }));

  const pgName = permissionGroupName as string | null;
  const isAdmin = !!(
    pgName &&
    (pgName.toLowerCase().includes("admin") || pgName.toLowerCase().includes("root"))
  );

  const permissions = {
    role: userRole,
    permissionGroupName: pgName,
    permissionGroupId,
    token: token ? "PRESENT" : "MISSING",
    userEmail,
    userName,
    userRole,
    roleId,
    avatar,
    isAuthenticated: !!token,
    isAdmin,
    isCSuite: !!(
      pgName &&
      (pgName.toLowerCase().includes("c-suite") || pgName.toLowerCase().includes("csuite"))
    ),
    isManager: !!(pgName && pgName.toLowerCase().includes("manager")),
  };

  console.log("🔐 [Permission State]:", {
    ...permissions,
    rawRoleSource: permissionGroupName,
  });

  return {
    ...permissions,
    canSeeNav: (label: string) => {
      const allowed = pgName ? canAccessNav(pgName, label) : false;
      console.log(`  🔍 [Nav Access] '${label}' (via PG: ${pgName}):`, allowed);
      return allowed;
    },
    canVisit: (path: string) => {
      const allowed = pgName ? canAccessRoute(pgName, path) : false;
      console.log(`  🔍 [Route Access] '${path}' (via PG: ${pgName}):`, allowed);
      return allowed;
    },
    canDo: (action: Action) => {
      const allowed = pgName ? canDo(pgName, action) : false;
      console.log(`  🔍 [Action Access] '${action}' (via PG: ${pgName}):`, allowed);
      return allowed;
    },
  };
}
