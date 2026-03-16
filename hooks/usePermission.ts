import { useAppSelector } from "@/store";
import { canAccessNav, canDo, canAccessRoute } from "@/lib/rbac";
import type { PermissionGroupName, Action } from "@/lib/rbac";

export function usePermission() {
  // verifyOtp is the confirmed post-login source
  // fall back to auth (set one step earlier in the flow - requestOtp)
  const role = (useAppSelector((s) => s.verifyOtp.permissionGroupName) ??
    useAppSelector((s) => s.login.permissionGroupName)) as PermissionGroupName | null;

  const permissionGroupId =
    useAppSelector((s) => s.verifyOtp.permissionGroupId) ??
    useAppSelector((s) => s.login.permissionGroupId);

  const token = useAppSelector((s) => s.verifyOtp.token);
  const userEmail = useAppSelector((s) => s.verifyOtp.userEmail ?? s.login.userEmail);

  const permissions = {
    role,
    permissionGroupId,
    token: token ? "PRESENT" : "MISSING",
    userEmail,
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
