import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

// Shared secret — same as /api/deals/log
const API_SECRET = process.env.CLOSERS_API_SECRET ?? "";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");
    const userId = searchParams.get("user_id");

    // ── Auth ────────────────────────────────────────────────────────────────
    if (!API_SECRET || secret !== API_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!userId) {
      return NextResponse.json({ error: "user_id is required" }, { status: 400 });
    }

    // ── Month filter ────────────────────────────────────────────────────────
    const monthParam = searchParams.get("month"); // YYYY-MM
    const now = new Date();
    const [year, month] = monthParam
      ? monthParam.split("-").map(Number)
      : [now.getFullYear(), now.getMonth() + 1];

    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const lastDay = new Date(year, month, 0).getDate(); // month is 1-indexed, day 0 = last day of prev month
    const endDate = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    // ── Query ───────────────────────────────────────────────────────────────
    const supabase = createAdminClient();

    const { data: deals, error } = await supabase
      .from("deals")
      .select("*")
      .eq("user_id", userId)
      .gte("sold_date", startDate)
      .lte("sold_date", endDate)
      .order("sold_date", { ascending: false });

    if (error) {
      console.error("[deals/list] Query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // ── Aggregate ───────────────────────────────────────────────────────────
    let units = 0;
    let commission = 0;
    let frontGross = 0;

    for (const d of deals ?? []) {
      units += d.units ?? 0;
      commission += d.commission ?? 0;
      frontGross += d.front_gross ?? 0;
    }

    // Bonus ladder (Sun Toyota — hardcoded for Thul)
    const bonusLadder = [
      { units: 11, bonus: 500 },
      { units: 15, bonus: 1000 },
      { units: 20, bonus: 2000 },
    ];
    const nextBonus = bonusLadder.find((b) => units < b.units);

    return NextResponse.json({
      ok: true,
      month: `${year}-${String(month).padStart(2, "0")}`,
      deals: deals ?? [],
      summary: {
        units,
        commission,
        front_gross: frontGross,
        deal_count: (deals ?? []).length,
        next_bonus: nextBonus
          ? { at: nextBonus.units, amount: nextBonus.bonus, units_needed: nextBonus.units - units }
          : null,
      },
    });
  } catch (err) {
    console.error("[deals/list] Unexpected error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
