import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";
import type { RoutePermissionProps } from "@/types/permission";

export const ProtectedRoute: React.FC<RoutePermissionProps> = ({
  permission,
  redirectTo = "/unauthorized",
  children,
}) => {
  const { hasPermission } = usePermissions();
  const location = useLocation();

  if (!hasPermission(permission)) {
    // Redirect to unauthorized page or specified redirect
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Higher-order component for route protection
export const withRouteProtection = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  permission: string,
  redirectTo?: string
) => {
  return function WithRouteProtectionComponent(props: P) {
    const { hasPermission } = usePermissions();
    const location = useLocation();

    if (!hasPermission(permission)) {
      return <Navigate to={redirectTo || "/unauthorized"} state={{ from: location }} replace />;
    }

    return <WrappedComponent {...props} />;
  };
};
