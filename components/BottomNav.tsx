"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  Layers,
  LayoutDashboard,
  DollarSign,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  User,
  Zap,
  Store,
} from "lucide-react";

const BOTTOM_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/industries", label: "Industries", icon: Layers },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pricing", label: "Pricing", icon: DollarSign },
];

const DRAWER_LINKS = [
  {
    href: "/how-it-works",
    label: "How It Works",
    subtitle: "Four steps. Ready to close.",
    icon: BookOpen,
  },
  {
    href: "/founder",
    label: "Founder",
    subtitle: "Built by a working rep.",
    icon: User,
  },
  {
    href: "/blog",
    label: "Blog",
    subtitle: "Plays, scripts, and field notes.",
    icon: Zap,
  },
  {
    href: "/skills-marketplace",
    label: "Skills Marketplace",
    subtitle: "Add-ons for your agent.",
    icon: Store,
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed left-0 right-0 z-50 md:hidden transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ bottom: "60px" }}
      >
        <div
          className="rounded-t-2xl border-t border-white/10 px-4 pt-3 pb-4"
          style={{ background: "rgba(5,5,6,0.98)" }}
        >
          {/* Drag handle */}
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />

          {/* Links */}
          <div className="space-y-1">
            {DRAWER_LINKS.map(({ href, label, subtitle, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
                onClick={() => setDrawerOpen(false)}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-deal/10">
                  <Icon className="h-5 w-5 text-deal-light" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-white">{label}</div>
                  <div className="text-[12px] text-muted">{subtitle}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted flex-shrink-0" strokeWidth={2} />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/pricing"
            className="btn-loud mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px]"
            onClick={() => setDrawerOpen(false)}
          >
            Get Started
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      {/* Tab bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 backdrop-blur-xl md:hidden"
        style={{ background: "rgba(5,5,6,0.95)" }}
      >
        <div className="flex items-center justify-around px-2 pt-2 pb-[env(safe-area-inset-bottom,8px)]">
          {BOTTOM_NAV.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href ||
              (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-1 px-3 py-1.5"
              >
                <Icon
                  className={`h-5 w-5 ${active ? "text-deal" : "text-ash"}`}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span
                  className={`text-[10px] font-medium ${
                    active ? "text-deal" : "text-muted"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setDrawerOpen((prev) => !prev)}
            className="flex flex-col items-center gap-1 px-3 py-1.5"
          >
            {drawerOpen ? (
              <X className="h-5 w-5 text-deal" strokeWidth={2.5} />
            ) : (
              <Menu className="h-5 w-5 text-ash" strokeWidth={2} />
            )}
            <span
              className={`text-[10px] font-medium ${
                drawerOpen ? "text-deal" : "text-muted"
              }`}
            >
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
