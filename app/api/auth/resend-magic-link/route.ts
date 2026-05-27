import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

// POST /api/auth/resend-magic-link
// Resends a magic link to the given email for passwordless sign-in.
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Verify the user exists
    const { data: existingUsers, error: listError } =
      await supabase.auth.admin.listUsers();

    if (listError) {
      console.error("Failed to list users:", listError);
      return NextResponse.json(
        { error: "Could not verify account" },
        { status: 500 }
      );
    }

    const match = existingUsers.users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (!match) {
      return NextResponse.json({ error: "No account found for this email" }, { status: 404 });
    }

    // Generate a new magic link
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dealclozr.com"}/auth/callback?next=/onboarding`,
      },
    });

    if (linkError) {
      console.error("Failed to send magic link:", linkError);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    console.log(`📧 Magic link resent to ${email}`);

    // Return the magic link so the success page can display it directly
    const magicLink = linkData?.properties?.action_link || null;

    return NextResponse.json({ 
      success: true,
      magicLink,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Resend magic link error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
