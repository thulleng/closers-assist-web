import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Enterprise",
  description:
    "Done-for-you AI closer service. Custom-built, hosted, and managed for your dealership or team. $5,000/mo unlimited seats. Live in 48 hours.",
};

export default function EnterpriseLayout({ children }: { children: ReactNode }) {
  return children;
}
