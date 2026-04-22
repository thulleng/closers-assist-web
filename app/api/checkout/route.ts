import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  console.log("STRIPE key present:", !!key);
  console.log("STRIPE key prefix:", key?.slice(0, 10));

  if (!key) {
    return NextResponse.json({ error: "STRIPE_SECRET_KEY is not set" }, { status: 500 });
  }

  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: "priceId required" }, { status: 400 });
    }

    // Fresh client per request — no caching, no stale key
    const stripe = new Stripe(key);

    const origin = req.headers.get("origin") ?? "https://closersassist.com";

    console.log("Creating checkout session for priceId:", priceId);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      allow_promotion_codes: true,
    });

    console.log("Session created:", session.id);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Stripe checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
