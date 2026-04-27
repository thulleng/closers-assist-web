import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Temporary response used as a cookie jar — captures cookie clearings from signOut()
  const cookieJar = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieJar.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.signOut();

  const response = NextResponse.redirect(new URL("/", request.url));

  // Copy cleared session cookies from the jar onto the redirect response
  cookieJar.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite as "lax" | "strict" | "none" | undefined,
      path: cookie.path,
      maxAge: cookie.maxAge,
    });
  });

  return response;
}
