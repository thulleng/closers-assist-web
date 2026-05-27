"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/hooks/useUser";
import UserMenu from "@/components/UserMenu";

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const { user, loading } = useUser();

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setHidden(false);
      } else if (y > lastY + 4) {
        setHidden(true);
      } else if (y < lastY - 4) {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md transition-transform duration-300 will-change-transform ${
        hidden ? "nav-hidden" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="relative">
            <div
              className="absolute inset-0 -z-10 rounded-md bg-deal/40 opacity-60 blur-md transition-opacity group-hover:opacity-100"
              aria-hidden
            />
            <Image
              src="/logo.webp"
              alt="Deal Clozr"
              width={36}
              height={36}
              className="h-9 w-9"
              priority
            />
          </div>
          <span className="font-display text-sm font-black tracking-wide text-white">
            DEAL <span className="text-shine">CLOZR</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/how-it-works" className="text-sm font-medium text-white/90 transition-colors hover:text-white">How it works</Link>
          <Link href="/industries" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Industries</Link>
          <Link href="/dashboard/auto" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Dashboard</Link>
          <Link href="/compare" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Compare</Link>
          <Link href="/pricing" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Pricing</Link>
          <Link href="/founder" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Founder</Link>
          <Link href="/blog" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Blog</Link>
          <Link href="/reviews" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Reviews</Link>
          <Link href="/referral" className="text-sm font-medium text-gold-light transition-colors hover:text-gold-light/80">Refer & Earn</Link>
          <Link href="/enterprise" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Enterprise</Link>
        </nav>

        <div className="flex items-center gap-3">
          {!loading && user ? (
            <UserMenu />
          ) : (
            <>
              <Link href="/pricing" className="btn-loud rounded-xl px-5 py-2.5 text-sm">Get Started</Link>
              <Link href="/login" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Sign In</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
