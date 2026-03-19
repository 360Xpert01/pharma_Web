import { useAppSelector } from "@/store";
import { canAccessNav, canDo, canAccessRoute } from "@/lib/rbac";
import type { PermissionGroupName, Action } from "@/lib/rbac";

export function usePermission() {
  const { rawRole, permissionGroupId, token, userEmail, userName, avatar, roleId } = useAppSelector(
    (s) => ({
      rawRole:
        s.getUserProfile.user?.userRole ||
        s.getUserProfile.user?.permissionGroupName ||
        s.getUserProfile.user?.role ||
        s.verifyOtp.permissionGroupName ||
        s.verifyOtp.user?.userRole ||
        s.login.permissionGroupName ||
        s.auth.user?.permissionGroupName ||
        (s.auth.user as any)?.role,
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
    })
  );

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
    roleId,
    avatar,
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
