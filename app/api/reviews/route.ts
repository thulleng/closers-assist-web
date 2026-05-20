import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

// GET — fetch approved reviews (public)
export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("GET reviews error:", error);
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }

    return NextResponse.json({ reviews: data });
  } catch (err) {
    console.error("GET reviews unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST — submit a new review (public, goes to pending)
export async function POST(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const body = await req.json();

    const { name, rating, review_text, role, company, location } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name is required (min 2 chars)" }, { status: 400 });
    }
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
    }
    if (!review_text || typeof review_text !== "string" || review_text.trim().length < 10) {
      return NextResponse.json({ error: "Review text is required (min 10 chars)" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        name: name.trim(),
        rating,
        review_text: review_text.trim(),
        role: role?.trim() || null,
        company: company?.trim() || null,
        location: location?.trim() || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("POST review error:", error);
      return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
    }

    return NextResponse.json({ review: data, message: "Review submitted for approval" }, { status: 201 });
  } catch (err) {
    console.error("POST review unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
