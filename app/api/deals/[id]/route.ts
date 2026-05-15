import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/deals/[id] — full deal detail with deal-tagged memories
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: deal, error } = await supabase
      .from("deals")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !deal) {
      return NextResponse.json({ error: "Deal not found" }, { status: 404 });
    }

    // Fetch deal-tagged memories (using content prefix convention: [deal:UUID])
    const { data: memories } = await supabase
      .from("agent_memory")
      .select("content, created_at, role")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    const dealMemories = (memories ?? []).filter((m: { content: string }) =>
      m.content.startsWith(`[deal:${id}]`)
    );

    return NextResponse.json({
      deal,
      memories: dealMemories.map((m: { content: string; created_at: string; role: string }) => ({
        content: m.content.replace(`[deal:${id}] `, ""),
        created_at: m.created_at,
        role: m.role,
      })),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// PATCH /api/deals/[id] — update notes, status, or last_contact_date
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const updates: Record<string, unknown> = {};

    if (body.notes !== undefined) updates.notes = body.notes;
    if (body.status !== undefined) updates.status = body.status;
    if (body.last_contact_date !== undefined) updates.last_contact_date = body.last_contact_date;
    if (body.vehicle !== undefined) updates.vehicle = body.vehicle;
    if (body.customer_name !== undefined) updates.customer_name = body.customer_name;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("deals")
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, deal: data });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
