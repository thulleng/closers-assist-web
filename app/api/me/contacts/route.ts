import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/me/contacts — user's CRM contacts
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

    const { data: contacts, error } = await supabase
      .from("crm_contacts")
      .select("*")
      .eq("user_id", user.id)
      .order("last_contact_date", { ascending: false })
      .limit(50);

    if (error) {
      if (error.code === "42P01") {
        return NextResponse.json({ contacts: [], note: "crm_contacts table not yet created" });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ contacts: contacts ?? [] });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
