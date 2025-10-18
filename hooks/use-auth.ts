"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import Cookies from "js-cookie";
import type { User } from "@/types/user";
import { useAppSelector } from "@/store";

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  refreshAuth: () => void;
}

// Cookie keys for type safety
const COOKIE_KEYS = {
  USER_LOGGED_IN: "user_logged_in",
  AUTH_TOKEN: "auth_token",
  USER_EMAIL: "user_email",
  USER_ID: "user_id",
  USER_NAME: "user_name",
  USER_AVATAR: "user_avatar",
  USER_ROLE: "user_role",
} as const;

/**
 * Optimized custom auth hook that combines Redux state and cookie-based authentication
 * Ensures consistent authentication state across the application with proper error handling
 */
export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [cookieUser, setCookieUser] = useState<User | null>(null);

  // Get Redux auth state with memoization
  const { reduxUser, reduxToken } = useAppSelector(
    (state) => ({
      reduxUser: state.auth.user,
      reduxToken: state.auth.token,
    }),
    (left, right) => left.reduxUser === right.reduxUser && left.reduxToken === right.reduxToken
  );

  // Optimized auth state checker with error handling
  const checkAuthState = useCallback(() => {
    try {
      const userLoggedIn = Cookies.get(COOKIE_KEYS.USER_LOGGED_IN);
      const authToken = Cookies.get(COOKIE_KEYS.AUTH_TOKEN);
      const userEmail = Cookies.get(COOKIE_KEYS.USER_EMAIL);
      const userId = Cookies.get(COOKIE_KEYS.USER_ID);

      if (userLoggedIn && authToken && userEmail && userId) {
        const userRole = Cookies.get(COOKIE_KEYS.USER_ROLE);
        const userData: User = {
          id: userId,
          email: userEmail,
          name: Cookies.get(COOKIE_KEYS.USER_NAME) || "",
          avatar: Cookies.get(COOKIE_KEYS.USER_AVATAR) || "",
          role: userRole === "admin" || userRole === "user" ? userRole : "user",
        };
        setCookieUser(userData);
        // Client-side logging only
        if (typeof window !== "undefined" && typeof process === "undefined") {
          console.debug("Cookie-based auth state updated", { userId, email: userEmail });
        }
      } else {
        setCookieUser(null);
      }
    } catch (error) {
      // Client-side logging only
      if (typeof window !== "undefined" && typeof process === "undefined") {
        console.error(
          "Error checking auth state:",
          error instanceof Error ? error.message : String(error)
        );
      }
      setCookieUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Manual refresh function for components that need to trigger auth refresh
  const refreshAuth = useCallback(() => {
    checkAuthState();
  }, [checkAuthState]);

  // Initialize auth state and set up monitoring
  useEffect(() => {
    checkAuthState();

    // Optimized interval - only check if document is visible
    const interval = setInterval(() => {
      if (!document.hidden) {
        checkAuthState();
      }
    }, 2000); // Reduced frequency to 2 seconds for better performance

    // Listen for visibility changes to immediately check when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAuthState();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkAuthState]);

  // Memoized computed values for optimal performance
  const authState = useMemo(() => {
    const isAuthenticated = Boolean(cookieUser?.email) || Boolean(reduxToken && reduxUser);
    const user = cookieUser || reduxUser;

    return {
      isAuthenticated,
      user,
      isLoading,
      refreshAuth,
    };
  }, [cookieUser, reduxToken, reduxUser, isLoading, refreshAuth]);

  return authState;
}
