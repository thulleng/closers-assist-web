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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-iron bg-black/90 backdrop-blur-md md:hidden">
      <div className="flex items-stretch">
        {BOTTOM_NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 text-[10px] font-medium transition-colors ${
                active ? "text-deal" : "text-ash hover:text-bone"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
