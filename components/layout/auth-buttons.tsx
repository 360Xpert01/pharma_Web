"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { UserIcon, UsersIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface AuthButtonsProps {
  className?: string;
  variant?: "default" | "compact";
}
export const AuthButtons = memo(function AuthButtons({
  className,
  variant = "default",
}: AuthButtonsProps) {
  const router = useRouter();
  const tAuth = useTranslations("auth.buttons");
  const tLabels = useTranslations("auth.labels");

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Button
          variant="ghost"
          size="sm"
          aria-label={tLabels("loginToAccount")}
          onClick={() => router.push("/login")}
          className="flex items-center"
        >
          <UserIcon className="h-4 w-4 mr-2" aria-hidden="true" />
          {tAuth("login")}
        </Button>
        <Button
          size="sm"
          aria-label={tLabels("createNewAccount")}
          onClick={() => router.push("/signup")}
          className="flex items-center"
        >
          <UsersIcon className="h-4 w-4 mr-2" aria-hidden="true" />
          {tAuth("signup")}
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button
        variant="outline"
        aria-label={tLabels("loginToAccount")}
        onClick={() => router.push("/login")}
        className="flex items-center"
      >
        <UserIcon className="h-4 w-4 mr-2" aria-hidden="true" />
        {tAuth("login")}
      </Button>
      <Button
        aria-label={tLabels("createNewAccount")}
        onClick={() => router.push("/signup")}
        className="flex items-center"
      >
        <UsersIcon className="h-4 w-4 mr-2" aria-hidden="true" />
        {tAuth("getStarted")}
      </Button>
    </div>
  );
});

AuthButtons.displayName = "AuthButtons";
