"use client";

import { useState } from "react";
import { LogoutIcon, UserIcon, SettingsIcon, HelpIcon } from "@/lib/icons";
import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileProps {
  className?: string;
}

// Mock user data - in real app this would come from auth context/API
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "", // Could be user's avatar URL
  initials: "JD",
};

export function UserProfile({ className }: UserProfileProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Simulate logout process
    try {
      // In real app, call your logout API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login or home page
      window.location.href = "/auth/login";
    } catch (error) {
      logger.error("User logout failed", { 
        error: error instanceof Error ? error.message : String(error) 
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleProfileClick = () => {
    // Navigate to profile page
    window.location.href = "/dashboard/profile";
  };

  const handleSettingsClick = () => {
    // Navigate to settings page  
    window.location.href = "/dashboard/settings";
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full hover:bg-accent"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="text-xs font-medium">
                      {userData.initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center">
              <p className="text-sm">
                {userData.name} • Click for options
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userData.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {userData.email}
              </p>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={handleProfileClick}
            className="cursor-pointer"
          >
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={handleSettingsClick}
            className="cursor-pointer"
          >
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer">
            <HelpIcon className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
          >
            <LogoutIcon className="mr-2 h-4 w-4" />
            <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserProfile;