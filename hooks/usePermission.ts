import { useAppSelector } from "@/store";
import { canAccessNav, canDo, canAccessRoute } from "@/lib/rbac";
import type { PermissionGroupName, Action } from "@/lib/rbac";

export function usePermission() {
  const { rawRole, permissionGroupId, token, userEmail, userName } = useAppSelector((s) => ({
    rawRole:
      s.verifyOtp.permissionGroupName ||
      s.verifyOtp.user?.userRole ||
      s.login.permissionGroupName ||
      s.auth.user?.permissionGroupName ||
      (s.auth.user as any)?.role,
    permissionGroupId:
      s.verifyOtp.permissionGroupId || s.login.permissionGroupId || s.auth.user?.permissionGroupId,
    token: s.verifyOtp.token || s.auth.token,
    userEmail: s.verifyOtp.userEmail || s.login.userEmail || s.auth.user?.email,
    userName:
      s.verifyOtp.user?.userName ||
      s.login.user?.userName ||
      s.verifyOtp.userName ||
      s.login.userName ||
      s.auth.user?.name ||
      "User",
  }));

  const role = rawRole as string | null;
  const isAdmin = !!(
    role &&
    (role.toLowerCase().includes("admin") || role.toLowerCase().includes("root"))
  );

  const permissions = {
    role,
    permissionGroupId,
    token: token ? "PRESENT" : "MISSING",
    userEmail,
    userName,
    userRole: rawRole,
    isAuthenticated: !!token,
    isAdmin,
    isCSuite: !!(
      role &&
      (role.toLowerCase().includes("c-suite") || role.toLowerCase().includes("csuite"))
    ),
    isManager: !!(role && role.toLowerCase().includes("manager")),
  };

  console.log("🔐 [Permission State]:", permissions);

  return {
    ...permissions,
    canSeeNav: (label: string) => {
      const allowed = role ? canAccessNav(role, label) : false;
      console.log(`  🔍 [Nav Access] '${label}':`, allowed);
      return allowed;
    },
    canVisit: (path: string) => {
      const allowed = role ? canAccessRoute(role, path) : false;
      console.log(`  🔍 [Route Access] '${path}':`, allowed);
      return allowed;
    },
    canDo: (action: Action) => {
      const allowed = role ? canDo(role, action) : false;
      console.log(`  🔍 [Action Access] '${action}':`, allowed);
      return allowed;
    },
  };
}
