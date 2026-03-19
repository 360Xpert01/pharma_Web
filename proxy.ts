import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // const locale = getLocaleFromPath(pathname);

  const session = request.cookies.get("userSession")?.value;
  const isLoggedIn = session ? true : false;

  // Allow /login and /otp without a session
  const isAuthPath = pathname.includes("/login") || pathname.includes("/otp");

  if (!isLoggedIn && !isAuthPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isLoggedIn && isAuthPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  const isRootPath =
    pathname === "/" || pathname === "/en" || pathname === "/hi" || pathname === "/ur";
  if (isRootPath) {
    const url = request.nextUrl.clone();
    url.pathname = isLoggedIn ? "/dashboard" : "/login";
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|trpc|.*\\..*).*)"],
};
