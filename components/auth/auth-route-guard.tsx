"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthFlowManager } from "@/lib/auth-flow";

type AuthRouteGuardProps = {
  requiresFlow?: "otp" | "reset" | "forgot";
  redirectTo?: string;
  children: React.ReactNode;
};

export function AuthRouteGuard({
  requiresFlow,
  redirectTo = "/auth/login",
  children,
}: AuthRouteGuardProps) {
  const router = useRouter();

  useEffect(() => {
    let shouldRedirect = false;

    if (requiresFlow === "otp" && !AuthFlowManager.canAccessOtp()) {
      shouldRedirect = true;
    } else if (requiresFlow === "reset" && !AuthFlowManager.canAccessReset()) {
      shouldRedirect = true;
    }

    if (shouldRedirect) {
      router.replace(redirectTo);
    }
  }, [requiresFlow, redirectTo, router]);

  // Don't render children if we're redirecting
  if (requiresFlow === "otp" && !AuthFlowManager.canAccessOtp()) {
    return null;
  }

  if (requiresFlow === "reset" && !AuthFlowManager.canAccessReset()) {
    return null;
  }

  return <>{children}</>;
}
