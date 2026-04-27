import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    // Temporary response used only as a cookie jar during the exchange
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

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("agent_profiles")
          .select("id")
          .eq("user_id", user.id)
          .single();

        const destination = profile ? "/dashboard/auto" : "/onboarding";
        const response = NextResponse.redirect(`${origin}${destination}`);

        // Copy all session cookies from the jar onto the actual redirect response
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
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
