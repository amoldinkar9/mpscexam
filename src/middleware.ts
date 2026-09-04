import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Check if accessing via friday. subdomain (e.g. friday.mpscexam.in or friday.localhost:3000)
  const isFridaySubdomain =
    hostname.startsWith("friday.") ||
    hostname.includes("friday.mpscexam.in");

  // Skip static assets, APIs, and Next.js internals
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes(".") // static files like favicon.ico, images, etc.
  ) {
    return NextResponse.next();
  }

  // If on friday subdomain and requesting the root "/", rewrite to "/admin"
  if (isFridaySubdomain) {
    if (url.pathname === "/") {
      return NextResponse.rewrite(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
