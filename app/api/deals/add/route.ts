import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { secret, user_id, customer_name, deal_type, front_gross, commission, units, sold_date } = body;

  if (secret !== process.env.CLOSERS_API_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!user_id || !customer_name || !deal_type || commission == null || units == null) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await supabase
    .from("deals")
    .insert({
      user_id,
      customer_name,
      deal_type,
      front_gross: front_gross ?? null,
      commission,
      units,
      sold_date: sold_date || new Date().toISOString().split("T")[0],
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, deal: data });
}
