import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

// Define public routes that don't require authentication
const PUBLIC_ROUTES = ["/", "/signin", "/signup"];
const PUBLIC_API_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next")) return NextResponse.next();

  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r)))
    return NextResponse.next();

  if (PUBLIC_API_ROUTES.some((r) => pathname.startsWith(r)))
    return NextResponse.next();

  const accessToken = req.cookies.get("access_token")?.value;

  if (accessToken) {
    try {
      verifyToken(accessToken);
      return NextResponse.next();
    } catch (error) {
      console.error("Error verifying access token:", error);
    }
  }

  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (refreshToken) {
    try {
      const refreshRes = await fetch(new URL("/api/auth/refresh", req.url), {
        method: "POST",
        headers: { cookie: req.headers.get("cookie") ?? "" },
      });

      if (refreshRes.ok) {
        // get the new cookies from the refresh response and set them in the current response
        const newCookies = refreshRes.headers.get("set-cookie");
        const res = NextResponse.next();
        if (newCookies) res.headers.set("set-cookie", newCookies);
        return res;
      }
    } catch {
      // Refresh failed → redirect login
    }
  }

  const loginUrl = new URL("/signin", req.url);
  loginUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
