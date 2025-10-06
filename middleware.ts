import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocaleFromPath(pathname);

  // 🔒 Auth flow protection
  const authFlowData = request.cookies.get("auth_flow");
  let authFlow = null;

  try {
    authFlow = authFlowData ? JSON.parse(authFlowData.value) : null;
  } catch {
    // Invalid JSON, treat as no flow data
  }

  // Protect OTP page - only accessible after login attempt
  if (pathname.match(/^\/(en|ur)?\/auth\/otp$/)) {
    if (!authFlow || authFlow.step !== "awaiting-otp") {
      return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
    }
  }

  // Protect reset password page - only accessible with valid reset token
  if (pathname.match(/^\/(en|ur)?\/auth\/reset$/)) {
    if (!authFlow || authFlow.step !== "reset-password" || !authFlow.resetToken) {
      return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
    }
  }

  // 🔒 Dashboard protection
  if (pathname.match(/^\/(en|ur)?\/dashboard/)) {
    const isAuthenticated = request.cookies.get("user_logged_in");
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
    }
  }

  // 🌐 Default locale redirect
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}`; // e.g. '/en'
    return NextResponse.redirect(url);
  }

  // 🌍 All other i18n behavior
  return intlMiddleware(request);
}

function getLocaleFromPath(pathname: string): string {
  const match = pathname.match(/^\/(en|ur)/);
  return match?.[1] || routing.defaultLocale;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|api|trpc|.*\\..*).*)", // Match everything except these
  ],
};
