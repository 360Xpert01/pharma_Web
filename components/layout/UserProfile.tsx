"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut, User, Settings, Shield, HelpCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { persistor, useAppDispatch } from "@/store";
import { logout as logoutAction } from "@/store/slices/auth/verifyOtp";
import { logout as loginLogoutAction } from "@/store/slices/auth/loginSlice";
import { logout as authLogoutAction } from "@/store/slices/auth-slice";
import { usePermission } from "@/hooks/usePermission";
import { getUserProfile } from "@/store/slices/auth/getUserProfileSlice";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store";

export const UserProfile = () => {
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const { userName, userRole, avatar } = usePermission();
  const { loading: profileLoading } = useAppSelector((state) => state.getUserProfile);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const result = getUserProfile();
  console.log("result of user profile", result);

  const profilePicture = avatar || "/girlPic.png";

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      // 1. Dispatch logout actions to clear Redux state
      await dispatch(logoutAction());
      await dispatch(loginLogoutAction());
      await dispatch(authLogoutAction());

      // 2. Clear Redux persist store
      await persistor.purge();

      // 3. Clear cookies - specifically the userSession cookie
      document.cookie = "userSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      // 4. Clear all other cookies
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }

      // 5. Clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      // 6. Close dropdown
      setShowProfileDropdown(false);

      // 7. Redirect to login with locale
      router.push(`/${locale}/login`);
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect even if there's an error
      router.push(`/${locale}/login`);
    }
  };

  return (
    <div className="relative" ref={profileRef}>
      <div
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        className="flex items-center gap-2 p-2 text-(--gray-7) bg-(--gray-1) hover:text-(--gray-9) hover:bg-(--gray-0) rounded-8 transition-colors cursor-pointer border"
      >
        <div className="w-8 h-8 bg-(--gray-2) rounded-8 flex items-center justify-center">
          <Image
            src={profilePicture}
            alt="Profile"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>
        <div>
          <div className="t-label-b truncate">{userName ?? "Guest"}</div>
          <div className="t-cap">{userRole ?? "Role"}</div>
        </div>
      </div>

      {/* Profile Dropdown */}
      {showProfileDropdown && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-(--background) rounded-8 shadow-soft border border-(--header-border) py-2 z-50">
          {/* Profile Info */}
          <div className="px-4 py-3 border-b border-(--gray-2)">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-(--gray-2) rounded-8 flex items-center justify-center">
                <Image
                  src={profilePicture}
                  alt="Profile"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="t-label-b">{userName ?? "User"}</div>
                <div className="t-cap">{userRole ?? "Role"}</div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-(--destructive) hover:bg-(--destructive-0) transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};
