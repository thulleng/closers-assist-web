import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/me/deals — user-facing deal list (cookie or Bearer auth)
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const authHeader = req.headers.get("authorization");
    let user = null;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const { data } = await supabase.auth.getUser(token);
      user = data.user ?? null;
    } else {
      const { data } = await supabase.auth.getUser();
      user = data.user ?? null;
    }

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); // optional filter: active, pending, closed, lost

    let query = supabase
      .from("deals")
      .select("id, customer_name, deal_type, vehicle, front_gross, commission, sold_date, status, notes")
      .eq("user_id", user.id)
      .order("sold_date", { ascending: false })
      .limit(50);

    if (status) {
      query = query.eq("status", status);
    }

    const { data: deals, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ deals: deals ?? [] });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
