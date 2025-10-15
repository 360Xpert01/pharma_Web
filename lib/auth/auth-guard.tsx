"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getToken } from "@/lib/cookie/cookie";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const token = getToken();

  // derive locale to keep redirects consistent with middleware
  const getLocaleFromPath = (p: string) => {
    const m = p.match(/^\/(en|ur)/);
    return m?.[1] || "en";
  };
  const locale = getLocaleFromPath(pathname);

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, token, router, locale]);

  // While determining auth, render nothing to avoid flashing protected content
  if (!isAuthenticated && !token) {
    return null;
  }

  return <>{children}</>;
}
