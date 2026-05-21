import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Smart redirect: detect user's industry → go to their dashboard.
// Unauthenticated → show the dashboard hub.

export default async function DashboardPage() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("agent_profiles")
        .select("industry")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profile?.industry) {
        // Map industry to dashboard slug
        const slug = industryToSlug(profile.industry);
        if (slug) redirect(`/dashboard/${slug}`);
      }

      // Default for authenticated users without industry set
      redirect("/dashboard/auto");
    }
  } catch {
    // Auth failed — show hub
  }

  // Unauthenticated — render the dashboard hub
  const HubPage = await import("./hub");
  return <HubPage.default />;
}

function industryToSlug(industry: string): string | null {
  const map: Record<string, string> = {
    "automotive": "auto",
    "auto": "auto",
    "real-estate": "real-estate",
    "real_estate": "real-estate",
    "insurance": "insurance",
    "solar": "solar",
    "saas": "saas",
    "medical": "medical",
    "medical-devices": "medical",
    "retail": "retail",
    "hvac": "hvac",
    "roofing": "roofing",
    "pest-control": "pest-control",
    "home-security": "home-security",
    "mortgage": "mortgage",
    "financial-advisors": "financial-advisors",
    "recruiting": "recruiting",
    "telecom": "telecom",
    "rental": "rental",
    "project-manager": "project-manager",
    "other-sales": "other-sales",
    "other": "other-sales",
  };
  return map[industry] || null;
}
