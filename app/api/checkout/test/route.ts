import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

/**
 * TEST MODE checkout — uses STRIPE_TEST_SECRET_KEY instead of live key.
 * All other behavior identical to production checkout.
 */
export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_TEST_SECRET_KEY;

  if (!key) {
    return NextResponse.json(
      { error: "STRIPE_TEST_SECRET_KEY is not set" },
      { status: 500 }
    );
  }

  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: "priceId required" }, { status: 400 });
    }

    const stripe = new Stripe(key);

    const origin = req.headers.get("origin") ?? "https://closersassist.com";

    console.log("[TEST] Creating test checkout session for priceId:", priceId);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      allow_promotion_codes: true,
    });

    console.log("[TEST] Session created:", session.id);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[TEST] Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
