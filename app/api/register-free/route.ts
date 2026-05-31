import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const { email, industry } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (!industry) {
      return NextResponse.json({ error: "Industry required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Check if user already exists
    let userId: string | null = null;
    const { data: existingUsers } = await supabase.auth.admin.listUsers();

    if (existingUsers) {
      const existing = existingUsers.users.find(
        (u) => u.email?.toLowerCase() === email.toLowerCase()
      );
      if (existing) {
        // Check if they already have a free subscription
        const { data: existingSub } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", existing.id)
          .single();

        if (existingSub) {
          return NextResponse.json(
            { error: "This email already has an account. Sign in instead." },
            { status: 409 }
          );
        }

        userId = existing.id;
      }
    }

    // Create user if not found
    if (!userId) {
      const tempPassword = Array.from(
        crypto.getRandomValues(new Uint8Array(24))
      )
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
          source: "free_tier",
          industry,
          plan: "free",
        },
      });

      if (createError) {
        console.error("Failed to create user:", createError);
        return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
      }

      if (newUser?.user) {
        userId = newUser.user.id;

        // Send magic link
        await supabase.auth.admin.generateLink({
          type: "magiclink",
          email,
          options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dealclozr.com"}/auth/callback?next=/onboarding?plan=free`,
          },
        });
      }
    }

    if (!userId) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }

    // Save free subscription record
    const { error: subError } = await supabase
      .from("subscriptions")
      .upsert(
        {
          user_id: userId,
          customer_email: email,
          status: "active",
          price_id: "free",
          plan_tier: "free",
          message_limit: 50,
          messages_used: 0,
          industry: industry,
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (subError) {
      console.error("Failed to save subscription:", subError);
    }

    // Provision agent profile
    const agentName = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
    const { error: profileErr } = await supabase
      .from("agent_profiles")
      .upsert(
        {
          user_id: userId,
          agent_name: agentName,
          industry,
          status: "provisioning",
          provisioning_status: "pending",
        },
        { onConflict: "user_id" }
      );

    if (profileErr) {
      console.error("Failed to create agent profile:", profileErr);
    }

    console.log(`✅ Free user created: ${email} (${userId}, ${industry})`);

    return NextResponse.json({
      success: true,
      message: "Check your email for the magic link.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Free registration error:", message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
