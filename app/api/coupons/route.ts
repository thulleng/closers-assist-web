import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
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
    const [codes, coupons] = await Promise.all([
      stripe.promotionCodes.list({ limit: 50, active: true, expand: ["data.coupon"] }),
      stripe.coupons.list({ limit: 50 }),
    ]);

    return NextResponse.json({
      codes: codes.data.map((pc) => ({
        code: pc.code,
        active: pc.active,
        coupon: pc.coupon.name || pc.coupon.id,
        percent_off: pc.coupon.percent_off,
        duration: pc.coupon.duration,
        duration_months: pc.coupon.duration_in_months,
        max_redemptions: pc.max_redemptions,
        times_redeemed: pc.times_redeemed,
      })),
      coupons: coupons.data.map((c) => ({
        id: c.id,
        name: c.name,
        percent_off: c.percent_off,
        duration: c.duration,
        duration_months: c.duration_in_months,
        times_redeemed: c.times_redeemed,
        valid: c.valid,
      })),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
