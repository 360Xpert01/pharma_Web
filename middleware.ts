import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // const locale = getLocaleFromPath(pathname);

  // Read auth flow (server-side cookie). Keep safe JSON parse.
  const authFlowData = request.cookies.get("auth_flow");
  let authFlow = null;
  try {
    authFlow = authFlowData ? JSON.parse(authFlowData.value) : null;
  } catch {
    authFlow = null;
  }

  // Redirect root path to dashboard
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/dashboard`;
    return NextResponse.redirect(url);
  }

  // Redirect root with locale to dashboard
  if (pathname === `/`) {
    const url = request.nextUrl.clone();
    url.pathname = `/dashboard`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|trpc|.*\\..*).*)"],
};
