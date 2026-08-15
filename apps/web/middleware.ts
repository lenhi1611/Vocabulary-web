import { NextRequest, NextResponse } from "next/server";

type Access = "public" | "auth";

type RouteRule = {
  match: (pathname: string) => boolean;
  access: Access;
  // Only relevant when access === "public". If true (default), an
  // authenticated user hitting this route is redirected to /dashboard —
  // e.g. /signin shouldn't be visible once logged in. Set false for routes
  // that stay visible either way, like the home page.
  redirectIfAuthed?: boolean;
  // Roles allowed to access this route. Omitted/empty = any authenticated user.
  // Requires the JWT payload to carry a `role` claim (not yet issued by the server).
  roles?: string[];
};

const exact = (path: string) => (pathname: string) => pathname === path;
const prefix = (path: string) => (pathname: string) => pathname.startsWith(path);

// Order matters: first matching rule wins. Anything that matches nothing
// below falls through to DEFAULT_ACCESS.
const ROUTES: RouteRule[] = [
  { match: exact("/"), access: "public", redirectIfAuthed: false },
  { match: prefix("/demo"), access: "public", redirectIfAuthed: false },
  { match: prefix("/signin"), access: "public" },
  { match: prefix("/signup"), access: "public" },

  // Example of a future role-gated route — uncomment once the backend
  // issues a `role` claim on the access token:
  // { match: prefix("/admin"), access: "auth", roles: ["ADMIN"] },
];

const DEFAULT_ACCESS: Access = "auth";

function resolveRoute(pathname: string): RouteRule {
  return (
    ROUTES.find((route) => route.match(pathname)) ?? {
      match: () => true,
      access: DEFAULT_ACCESS,
    }
  );
}

type AccessTokenPayload = {
  userId: string;
  email: string;
  role?: string;
};

// Edge middleware can't verify the JWT signature (no Node crypto), so this
// only decodes the payload for routing decisions. The server still verifies
// the signature on every request via auth.middleware.ts — treat this as a
// UX shortcut, never as the source of truth for authorization.
function decodeAccessToken(token: string): AccessTokenPayload | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function hasRequiredRole(rule: RouteRule, token: string): boolean {
  if (!rule.roles || rule.roles.length === 0) return true;
  const payload = decodeAccessToken(token);
  return !!payload?.role && rule.roles.includes(payload.role);
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
  const rule = resolveRoute(pathname);
  const token = request.cookies.get("access_token")?.value;

  if (rule.access === "public") {
    if (token && rule.redirectIfAuthed !== false) {
      // Already authenticated and trying to access a public-only route.
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // rule.access === "auth" from here on.
  if (!token) {
    const refreshToken = request.cookies.get("refresh_token")?.value;

    if (refreshToken) {
      const newCookies = await tryRefreshAccessToken(refreshToken);
      if (newCookies) {
        const response = NextResponse.next();
        response.headers.set("set-cookie", newCookies);
        return response;
      }
    }

    const signinUrl = new URL("/signin", request.url);
    signinUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signinUrl);
  }

  if (!hasRequiredRole(rule, token)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
