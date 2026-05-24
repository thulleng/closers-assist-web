import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Only protect dashboard routes
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/dashboard") && !pathname.startsWith("/api/dashboard")) {
    return NextResponse.next();
  }

  // Allow the dashboard landing page and settings through for middleware
  // (the client component handles auth state)
  if (pathname === "/dashboard" || pathname === "/dashboard/settings") {
    return NextResponse.next();
  }

  // Try reading the Supabase session cookie
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          // Middleware cannot set cookies — that is done in the auth callback
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session, redirect to login (preserve the intended destination)
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
