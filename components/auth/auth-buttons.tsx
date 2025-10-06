"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { UserIcon, UsersIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface AuthButtonsProps {
  className?: string;
  variant?: "default" | "compact";
}

/**
 * Optimized AuthButtons component with proper i18n support
 * Memoized for performance optimization
 */
export const AuthButtons = memo<AuthButtonsProps>(({ className, variant = "default" }) => {
  const tAuth = useTranslations("auth.buttons");
  const tLabels = useTranslations("auth.labels");

  const baseClasses = "flex items-center gap-2";
  const containerClasses = cn(baseClasses, className);

  if (variant === "compact") {
    return (
      <div className={containerClasses}>
        <Button variant="ghost" size="sm" asChild aria-label={tLabels("loginToAccount")}>
          <Link href="/auth/login">
            <UserIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            {tAuth("login")}
          </Link>
        </Button>
        <Button size="sm" asChild aria-label={tLabels("createNewAccount")}>
          <Link href="/auth/signup">
            <UsersIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            {tAuth("signup")}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button variant="outline" asChild aria-label={tLabels("loginToAccount")}>
        <Link href="/auth/login">
          <UserIcon className="h-4 w-4 mr-2" aria-hidden="true" />
          {tAuth("login")}
        </Link>
      </Button>
      <Button asChild aria-label={tLabels("createNewAccount")}>
        <Link href="/auth/signup">
          <UsersIcon className="h-4 w-4 mr-2" aria-hidden="true" />
          {tAuth("getStarted")}
        </Link>
      </Button>
    </div>
  );
});

AuthButtons.displayName = "AuthButtons";
