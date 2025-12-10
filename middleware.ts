import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // const locale = getLocaleFromPath(pathname);

  const session = request.cookies.get("userSession")?.value;
  const isLoggedIn = session ? true : false;

  if (!isLoggedIn && !pathname.includes("/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isLoggedIn && pathname.includes("/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (pathname === "/" || pathname === "/en" || pathname === "/hi") {
    const url = request.nextUrl.clone();
    url.pathname = isLoggedIn ? "/dashboard" : "/login";
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|trpc|.*\\..*).*)"],
};
