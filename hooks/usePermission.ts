import { useAppSelector } from "@/store";
import { canAccessNav, canDo, canAccessRoute } from "@/lib/rbac";
import type { PermissionGroupName, Action } from "@/lib/rbac";

export function usePermission() {
  const rawRole = useAppSelector(
    (s) =>
      s.verifyOtp.permissionGroupName ||
      s.verifyOtp.user?.userRole ||
      s.login.permissionGroupName ||
      s.auth.user?.permissionGroupName ||
      (s.auth.user as any)?.role
  );

  const role = (rawRole === "Admin" ? "Administrator" : rawRole) as PermissionGroupName | null;

  const permissionGroupId =
    useAppSelector((s) => s.verifyOtp.permissionGroupId) ||
    useAppSelector((s) => s.login.permissionGroupId) ||
    useAppSelector((s) => s.auth.user?.permissionGroupId);

  const token = useAppSelector((s) => s.verifyOtp.token || s.auth.token);
  const userEmail = useAppSelector(
    (s) => s.verifyOtp.userEmail || s.login.userEmail || s.auth.user?.email
  );
  const userName = useAppSelector(
    (s) =>
      s.verifyOtp.user?.userName ||
      s.login.user?.userName ||
      s.verifyOtp.userName ||
      s.login.userName ||
      s.auth.user?.name ||
      // s.auth.user?.userName ||
      "User"
  );

  console.log("🔍 [Debug UserName]:", {
    verifyOtp: useAppSelector((s) => s.verifyOtp.userName),
    login: useAppSelector((s) => s.login.userName),
    auth: useAppSelector((s) => s.auth.user?.name),
    final: userName,
  });

  const permissions = {
    role,
    permissionGroupId,
    token: token ? "PRESENT" : "MISSING",
    userEmail,
    userName,
    isAuthenticated: !!token,
    isAdmin: role === "Administrator",
    isCSuite: role === "C-Suite",
    isManager: role === "Manager",
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
