import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/signin", "/signup"];

const isPublicRoute = (pathname: string) => {
    return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Access token missing/expired but a refresh token might still be valid —
// call the backend server-to-server to mint a fresh access_token cookie
// before deciding to redirect to /signin.
async function tryRefreshAccessToken(refreshToken: string) {
  try {
    const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { cookie: `refresh_token=${refreshToken}` },
    });

    if (!refreshResponse.ok) return null;
    return refreshResponse.headers.get("set-cookie");
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = isPublicRoute(pathname);
  const token = request.cookies.get("access_token")?.value;

  if(isPublic && token) {
    // If the user is authenticated and trying to access a public route, redirect to the dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if(!isPublic && !token) {
    const refreshToken = request.cookies.get("refresh_token")?.value;

    if (refreshToken) {
      const newCookies = await tryRefreshAccessToken(refreshToken);
      if (newCookies) {
        const response = NextResponse.next();
        response.headers.set("set-cookie", newCookies);
        return response;
      }
    }

    // If the user is not authenticated and trying to access a protected route, redirect to the signin page
    const signinUrl = new URL("/signin", request.url);
    signinUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signinUrl);

  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
}