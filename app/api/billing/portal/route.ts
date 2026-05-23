import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

/**
 * Redirects the user to Stripe Customer Portal to manage billing.
 */
export async function GET(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.redirect(new URL("/dashboard/settings?error=no_stripe", req.url));
  }

  const stripe = new Stripe(key, { apiVersion: "2026-03-25.dahlia" });

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/login?next=/dashboard/settings", req.url));
    }

    // Find the user's Stripe customer ID
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!sub?.stripe_customer_id) {
      return NextResponse.redirect(new URL("/pricing", req.url));
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://dealclozr.com"}/dashboard/settings`,
    });

    return NextResponse.redirect(session.url);
  } catch (err) {
    console.error("Billing portal error:", err);
    return NextResponse.redirect(new URL("/dashboard/settings?error=portal_failed", req.url));
  }
}
