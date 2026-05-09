import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

// Shared secret — set via CLOSERS_API_SECRET in Vercel env.
// This is how Naomi (Thul's chief of staff agent) authenticates.
const API_SECRET = process.env.CLOSERS_API_SECRET ?? "";

type DealType = "half_mini" | "full_mini" | "full_deal" | "street_purchase";
const VALID_TYPES: DealType[] = ["half_mini", "full_mini", "full_deal", "street_purchase"];

interface LogDealRequest {
  secret: string;
  user_id: string;
  customer_name: string;
  deal_type: DealType;
  vehicle?: string;
  front_gross?: number;
  commission?: number;
  units?: number;
  sold_date?: string;  // YYYY-MM-DD — defaults to today
  notes?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: LogDealRequest = await req.json();

    // ── Auth ────────────────────────────────────────────────────────────────
    if (!API_SECRET || body.secret !== API_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // ── Validate ────────────────────────────────────────────────────────────
    if (!body.user_id || !body.customer_name || !body.deal_type) {
      return NextResponse.json(
        { error: "user_id, customer_name, and deal_type are required" },
        { status: 400 }
      );
    }

    if (!VALID_TYPES.includes(body.deal_type)) {
      return NextResponse.json(
        { error: `deal_type must be one of: ${VALID_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    if (body.deal_type === "full_deal" && body.front_gross == null) {
      return NextResponse.json(
        { error: "full_deal requires front_gross" },
        { status: 400 }
      );
    }

    // ── Insert via admin client (bypasses RLS) ──────────────────────────────
    const supabase = createAdminClient();

    const dealRow = {
      user_id: body.user_id,
      customer_name: body.customer_name,
      deal_type: body.deal_type,
      vehicle: body.vehicle ?? null,
      front_gross: body.front_gross ?? null,
      commission: body.commission ?? null,
      units: body.units ?? null,
      sold_date: body.sold_date ?? new Date().toISOString().slice(0, 10),
      notes: body.notes ?? null,
    };

    const { data, error } = await supabase
      .from("deals")
      .insert(dealRow)
      .select()
      .single();

    if (error) {
      console.error("[deals/log] Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`[deals/log] Deal logged: ${body.customer_name} — ${body.deal_type} for user ${body.user_id}`);

    return NextResponse.json({ ok: true, deal: data });
  } catch (err) {
    console.error("[deals/log] Unexpected error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}

// ── GET: health check ───────────────────────────────────────────────────────

export async function GET() {
  if (!API_SECRET) {
    return NextResponse.json({ status: "not configured", reason: "CLOSERS_API_SECRET not set" });
  }
  return NextResponse.json({ status: "ready" });
}
