import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(key);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const email = session.customer_details?.email || null;

    // Check if we've provisioned an account for this customer
    let accountReady = false;
    let accountEmail: string | null = null;

    if (email) {
      try {
        const supabase = createAdminClient();
        const { data: existingUsers } = await supabase.auth.admin.listUsers();
        
        if (existingUsers) {
          const match = existingUsers.users.find(
            (u) => u.email?.toLowerCase() === email.toLowerCase()
          );
          if (match) {
            accountReady = true;
            accountEmail = match.email || null;
          }
        }
      } catch {
        // Admin lookup failed — account not ready yet
      }
    }

    return NextResponse.json({
      email,
      accountReady,
      accountEmail,
      status: session.payment_status,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
