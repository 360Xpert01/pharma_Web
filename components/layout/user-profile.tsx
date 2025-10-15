"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LogoutIcon, UserIcon, SettingsIcon, HelpIcon } from "@/lib/icons";
import { logger } from "@/logger/logger";
import { useAuth } from "@/hooks/use-auth";
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

  // If user is not authenticated, don't render the component
  if (!isAuthenticated || !user) {
    return null;
  }

  const userInitials = getUserInitials(user.name, user.email);

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

      logger.info("User logged out successfully", { userId: user.id, email: user.email });

      // Redirect to login page
      router.push("/auth/login");
    } catch (error) {
      logger.error("User logout failed", {
        error: error instanceof Error ? error.message : String(error),
        userId: user.id,
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleProfileClick = () => {
    router.push("/dashboard/profile");
  };

  const handleSettingsClick = () => {
    router.push("/dashboard/settings");
  };

  const handleHelpClick = () => {
    router.push("/help");
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-accent">
                  <Avatar className="h-8 w-8">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name ?? "User avatar"} />
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
                {user.name} • {t("clickForOptions")}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
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
