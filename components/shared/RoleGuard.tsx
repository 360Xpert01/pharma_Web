import React from "react";
import { usePermission } from "@/hooks/usePermission";
import type { PermissionGroupName, Action } from "@/lib/rbac";

interface Props {
  roles?: PermissionGroupName[]; // restrict by role
  action?: Action; // restrict by action
  children: React.ReactNode;
  fallback?: React.ReactNode; // show this if blocked (default: nothing)
}

export function RoleGuard({ roles, action, children, fallback = null }: Props) {
  const { role, canDo } = usePermission();

  if (!role) return <>{fallback}</>;

  // role check
  if (roles && role !== "Administrator" && !roles.includes(role)) return <>{fallback}</>;

  // action check
  if (action && !canDo(action)) return <>{fallback}</>;

  return <>{children}</>;
}
