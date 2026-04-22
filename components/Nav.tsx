"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
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
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        hidden ? "nav-hidden" : ""
      } ${
        scrolled
          ? "border-white/10 bg-black/80"
          : "border-transparent bg-black/40"
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
              src="/logo.png"
              alt="Closers Assist"
              width={36}
              height={36}
              className="h-9 w-9 rounded-md"
              priority
            />
          </div>
          <span className="hidden font-display text-sm font-black tracking-wide text-white sm:inline">
            CLOSERS <span className="text-shine">ASSIST</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-ash transition-colors hover:text-deal-light"
          >
            How it works
          </Link>
          <Link
            href="/industries"
            className="text-sm font-medium text-ash transition-colors hover:text-deal-light"
          >
            Industries
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-ash transition-colors hover:text-deal-light"
          >
            Dashboard
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-ash transition-colors hover:text-deal-light"
          >
            Pricing
          </Link>
          <Link
            href="/founder"
            className="text-sm font-medium text-ash transition-colors hover:text-deal-light"
          >
            Founder
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-ash transition-colors hover:text-deal-light"
          >
            Blog
          </Link>
        </nav>

        <Link
          href="/#waitlist"
          className="btn-loud rounded-xl px-5 py-2.5 text-sm"
        >
          Join Waitlist
        </Link>
      </div>
    </header>
  );
}
