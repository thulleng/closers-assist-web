import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase-admin";

const API_SECRET = process.env.CLOSERS_API_SECRET ?? "";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");
    if (!API_SECRET || secret !== API_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const supabase = createAdminClient();

    // ── Stripe: subscriptions + MRR ──────────────────────────
    let mrr = 0;
    let activeSubs = 0;
    let totalCustomers = 0;
    let stripeError: string | null = null;

    try {
      const subs = await getStripe().subscriptions.list({ status: "active", limit: 100 });
      activeSubs = subs.data.length;
      totalCustomers = (await getStripe().customers.list({ limit: 100 })).data.length;

      for (const sub of subs.data) {
        const s = sub as unknown as { items?: { data?: Array<{ price?: { unit_amount?: number }; quantity?: number }> } };
        const items = s.items?.data ?? [];
        for (const item of items) {
          const amount = item.price?.unit_amount ?? 0;
          const qty = item.quantity ?? 1;
          mrr += (amount / 100) * qty;
        }
      }
    } catch (e) {
      stripeError = e instanceof Error ? e.message : String(e);
    }

    // ── Supabase: users + deals ─────────────────────────────
    const now = new Date();
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;

    const [authUsers, dealsMonth, dealsTotal, profiles] = await Promise.all([
      supabase.auth.admin.listUsers().catch(() => ({ data: { users: [], total: 0 } })),
      supabase.from("deals").select("id", { count: "exact", head: true }).gte("sold_date", monthStart),
      supabase.from("deals").select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const usersData = authUsers.data as any;
    const totalUsers = usersData?.total ?? usersData?.users?.length ?? 0;
    const profileCount = profiles.count ?? 0;
    const dealsThisMonth = dealsMonth.count ?? 0;
    const dealsAllTime = dealsTotal.count ?? 0;

    // Active this month: users with deals logged this month
    const { count: activeThisMonth } = await supabase
      .from("deals")
      .select("user_id", { count: "exact", head: true })
      .gte("sold_date", monthStart);

    // ── Churn signals ────────────────────────────────────────
    const lastMonthStart = now.getMonth() === 0
      ? `${now.getFullYear() - 1}-12-01`
      : `${now.getFullYear()}-${String(now.getMonth()).padStart(2, "0")}-01`;

    const { count: lastMonthActive } = await supabase
      .from("deals")
      .select("user_id", { count: "exact", head: true })
      .gte("sold_date", lastMonthStart)
      .lt("sold_date", monthStart);

    return NextResponse.json({
      stripe: stripeError ? { error: stripeError } : {
        mrr,
        active_subscriptions: activeSubs,
        total_customers: totalCustomers,
        arpu: activeSubs > 0 ? Math.round(mrr / activeSubs) : 0,
      },
      platform: {
        total_users: totalUsers,
        profiles_created: profileCount,
        active_users_this_month: activeThisMonth ?? 0,
        active_users_last_month: lastMonthActive ?? 0,
        deals_this_month: dealsThisMonth,
        deals_all_time: dealsAllTime,
      },
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
