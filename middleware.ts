import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocaleFromPath(pathname);

  // Read auth flow (server-side cookie). Keep safe JSON parse.
  const authFlowData = request.cookies.get("auth_flow");
  let authFlow = null;
  try {
    authFlow = authFlowData ? JSON.parse(authFlowData.value) : null;
  } catch {
    authFlow = null;
  }

  // Protect OTP page - only accessible after login attempt
  if (pathname.match(/^\/(en|ur)?\/\(auth\)\/otp$/)) {
    if (!authFlow || authFlow.step !== "awaiting-otp") {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // Protect reset password page - only accessible with valid reset token
  if (pathname.match(/^\/(en|ur)?\/\(auth\)\/reset$/)) {
    if (!authFlow || authFlow.step !== "reset-password" || !authFlow.resetToken) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // Dashboard protection - use the same token key your client sets ("auth_token")
  const authToken = request.cookies.get("auth_token");
  if (pathname.match(/^\/(en|ur)?\/dashboard/)) {
    if (!authToken) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // Default root -> locale redirect
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

function getLocaleFromPath(pathname: string): string {
  const match = pathname.match(/^\/(en|ur)/);
  return match?.[1] || routing.defaultLocale;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|trpc|.*\\..*).*)"],
};
