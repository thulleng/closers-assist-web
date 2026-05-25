import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST /api/admin/provision
// Creates customer Hermes home on VM via provisioning API.
// Protected: requires SUPABASE_SERVICE_ROLE_KEY in Authorization header.

const PROVISION_API = "http://178.105.161.224:8911/provision";
const PROVISION_KEY = process.env.PROVISION_API_KEY || "dealclozr-provision-2026";

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    if (auth !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user_id } = await req.json();
    if (!user_id) {
      return NextResponse.json({ error: "user_id required" }, { status: 400 });
    }

    // Get user profile
    const supabase = await createClient();
    const { data: profile, error: profileErr } = await supabase
      .from("agent_profiles")
      .select("first_name, last_name, industry, agent_name, draw, commission_pct, company")
      .eq("user_id", user_id)
      .maybeSingle();

    if (profileErr || !profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Call VM provisioning API
    const res = await fetch(PROVISION_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PROVISION_KEY}`,
      },
      body: JSON.stringify({ user_id, profile }),
      signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: "Provisioning failed", detail: err }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Provision error:", err.message);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
