import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

const API_SECRET = process.env.CLOSERS_API_SECRET ?? "";

// POST /api/webhooks/crm — receive CRM data from Zapier
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!API_SECRET || body.secret !== API_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { user_id, customer_name, email, phone, vehicle_interest, source, crm_id, notes } = body;

    if (!user_id || !customer_name) {
      return NextResponse.json({ error: "user_id and customer_name required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Upsert by crm_id to avoid duplicates
    const { data, error } = await supabase
      .from("crm_contacts")
      .upsert(
        {
          user_id,
          customer_name,
          email: email ?? null,
          phone: phone ?? null,
          vehicle_interest: vehicle_interest ?? null,
          source: source ?? null,
          crm_id: crm_id ?? null,
          notes: notes ?? null,
          last_contact_date: new Date().toISOString().slice(0, 10),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,crm_id" }
      )
      .select()
      .single();

    if (error) {
      // If no unique constraint exists yet, fall back to insert
      if (error.code === "42P01") {
        return NextResponse.json({ error: "crm_contacts table not found. Run SQL migration." }, { status: 500 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, contact: data });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
