import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Real talk from the showroom, the kitchen table, and the closing booth. Written by working closers.",
};

export default function BlogPage() {
  return (
    <ComingSoon
      eyebrow="Blog"
      title="Real talk from the showroom."
      body="Pay Plan Decoded. The Objection Library. AI for Closers. Launching with 15 posts across three pillars — written by working reps, not content marketers. First drop shipping soon."
    />
  );
}
