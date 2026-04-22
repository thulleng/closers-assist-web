"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, LayoutDashboard, DollarSign, Menu } from "lucide-react";

const BOTTOM_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/industries", label: "Industries", icon: Layers },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pricing", label: "Pricing", icon: DollarSign },
  { href: "/how-it-works", label: "More", icon: Menu },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 backdrop-blur-xl md:hidden"
      style={{ background: "rgba(5,5,6,0.95)" }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-[env(safe-area-inset-bottom,8px)]">
        {BOTTOM_NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-1 px-3 py-1.5">
              <Icon className={`h-5 w-5 ${active ? "text-deal" : "text-ash"}`} strokeWidth={active ? 2.5 : 2} />
              <span className={`text-[10px] font-medium ${active ? "text-deal" : "text-muted"}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
