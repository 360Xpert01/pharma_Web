"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { logger } from "@/logger/logger";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon, SettingsIcon, HelpIcon, LogoutIcon } from "@/lib/icons";

interface UserProfileProps {
  className?: string;
}

// Helper function to generate user initials
const getUserInitials = (name?: string, email?: string): string => {
  if (name) {
    const nameParts = name.trim().split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
  if (email) {
    return email.substring(0, 2).toUpperCase();
  }
  return "U";
};

export function UserProfile({ className }: UserProfileProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const t = useTranslations("layout.profile");
  const router = useRouter();

  const { isAuthenticated, user } = useAuth();

  // Local fallback user state: use auth user if available, otherwise try cookies
  const [localUser, setLocalUser] = useState<any | null>(() => {
    if (user) return user;
    const email = Cookies.get("user_email");
    if (!email) return null;
    return {
      id: Cookies.get("user_id") || "",
      name: Cookies.get("user_name") || "",
      email,
      avatar: Cookies.get("user_avatar") || "",
      role: Cookies.get("user_role") || "",
    };
  });

  // Sync fallback when auth hook provides a user later
  useEffect(() => {
    if (user && (!localUser || localUser.id !== user.id)) {
      setLocalUser(user);
    }
  }, [user]);

  // Render only when we either have auth or the cookie fallback user
  if (!isAuthenticated && !localUser) {
    return null;
  }

  const activeUser = user ?? localUser;
  const userInitials = getUserInitials(activeUser?.name, activeUser?.email);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Remove auth-related cookies
      Cookies.remove("user_email", { path: "/" });
      Cookies.remove("user_name", { path: "/" });
      Cookies.remove("user_avatar", { path: "/" });
      Cookies.remove("user_id", { path: "/" });
      Cookies.remove("user_role", { path: "/" });
      Cookies.remove("auth_token", { path: "/" });

      logger.info("User logged out successfully", {
        userId: activeUser?.id,
        email: activeUser?.email,
      });

      // Clear fallback local user
      setLocalUser(null);

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      logger.error("User logout failed", {
        error: error instanceof Error ? error.message : String(error),
        userId: activeUser?.id,
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleProfileClick = () => router.push("/dashboard/profile");
  const handleSettingsClick = () => router.push("/dashboard/settings");
  const handleHelpClick = () => router.push("/help");

  return (
    <div className={cn("inline-flex items-center", className)}>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  // variant="ghost"
                  className={cn("relative p-0 rounded-full hover:bg-accent/60", className)}
                  aria-label={t("clickForOptions")}
                >
                  <Avatar className="h-8 w-8">
                    {activeUser?.avatar ? (
                      <AvatarImage
                        src={activeUser.avatar}
                        alt={activeUser.name ?? activeUser.email ?? "User avatar"}
                      />
                    ) : (
                      <AvatarFallback className="text-xs font-medium">
                        {userInitials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>

            <TooltipContent side="bottom" align="center">
              <p className="text-sm">
                {activeUser?.name ?? activeUser?.email} • {t("clickForOptions")}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{activeUser?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{activeUser?.email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>{t("profile")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleSettingsClick} className="cursor-pointer">
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>{t("settings")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleHelpClick} className="cursor-pointer">
            <HelpIcon className="mr-2 h-4 w-4" />
            <span>{t("help")}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
          >
            <LogoutIcon className="mr-2 h-4 w-4" />
            <span>{isLoggingOut ? t("loggingOut") : t("logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserProfile;
