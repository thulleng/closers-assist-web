import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") || "";

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

  let error = null;

  if (code) {
    // Magic link / OAuth callback
    const result = await supabase.auth.exchangeCodeForSession(code);
    error = result.error;
  } else if (tokenHash && type === "recovery") {
    // Password reset callback
    const result = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "recovery" });
    error = result.error;
  }

  if (!error) {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // For password reset, redirect to the next param (set new password page)
      if (tokenHash && type === "recovery") {
        const destination = next || "/login?reset=true";
        const response = NextResponse.redirect(`${origin}${destination}`);

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

      // Normal login: check profile, route accordingly
      const { data: profile } = await supabase
        .from("agent_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      const destination = next || (profile ? "/dashboard/auto" : "/onboarding");
      const response = NextResponse.redirect(`${origin}${destination}`);

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

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
