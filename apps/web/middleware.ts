import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/signin", "/signup"];

const isPublicRoute = (pathname: string) => {
    return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = isPublicRoute(pathname);
  const token = request.cookies.get("access_token")?.value;
  console.log( "token:", token, "pathname:", pathname);
  if(isPublic && token) {
    // If the user is authenticated and trying to access a public route, redirect to the dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  if(!isPublic && !token) {
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