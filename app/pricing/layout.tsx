import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One extra deal covers your AI closer for years. $29.99/mo starter. 14-day free trial. No feature gating — every tier ships the same full agent.",
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return children;
}
