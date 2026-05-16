import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Admin: list all promotion codes (read-only, no mutations)
 * Deploy → hit once → delete. One-time use.
 */
export async function GET(req: NextRequest) {
  // Simple shared-secret auth — delete this endpoint after use
  const token = req.nextUrl.searchParams.get("token");
  if (token !== "clo-admin-2026") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "STRIPE_SECRET_KEY not set" }, { status: 500 });
  }

  const stripe = new Stripe(key);

  try {
    // Fetch all promotion codes
    const codes = await stripe.promotionCodes.list({ limit: 100, active: true });
    
    // Fetch all coupons
    const coupons = await stripe.coupons.list({ limit: 100 });

    return NextResponse.json({
      promotionCodes: codes.data.map((pc) => ({
        code: pc.code,
        active: pc.active,
        coupon: pc.coupon.id,
        couponName: pc.coupon.name,
        percentOff: pc.coupon.percent_off,
        amountOff: pc.coupon.amount_off,
        duration: pc.coupon.duration,
        durationInMonths: pc.coupon.duration_in_months,
        maxRedemptions: pc.max_redemptions,
        timesRedeemed: pc.times_redeemed,
        expiresAt: pc.expires_at,
      })),
      coupons: coupons.data.map((c) => ({
        id: c.id,
        name: c.name,
        percentOff: c.percent_off,
        amountOff: c.amount_off,
        duration: c.duration,
        durationInMonths: c.duration_in_months,
        timesRedeemed: c.times_redeemed,
        valid: c.valid,
      })),
      totalCodes: codes.data.length,
      totalCoupons: coupons.data.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
