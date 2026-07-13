import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

// PATCH — approve or reject a review (admin only, service_role)
export async function PATCH(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const body = await req.json();
    const { id, status } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Review ID required" }, { status: 400 });
    }
    if (!status || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Status must be 'approved' or 'rejected'" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("reviews")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("PATCH review error:", error);
      return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
    }

    return NextResponse.json({ review: data, message: `Review ${status}` });
  } catch (err) {
    console.error("PATCH review unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
