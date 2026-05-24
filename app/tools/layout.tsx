import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pay Plan Calculator · Deal Clozr",
  description:
    "Free car sales pay plan calculator. Enter your draw, commission split, mini flat, and volume bonus — see exactly what you'll earn at every unit count. Built by a working Toyota closer.",
  openGraph: {
    title: "Pay Plan Calculator — Free Tool for Car Sales Reps",
    description:
      "See exactly what you'll earn. Draw, mini, commission split, volume bonus — run the numbers real quick. Built by a working closer.",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
