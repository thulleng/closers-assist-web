"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Quote, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      {/* Social proof strip above the main footer */}
      <div className="border-b border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-gold-light text-gold-light" strokeWidth={1.5} />
              <span className="font-semibold text-white">4.9</span>
              <span className="text-ash">average from verified reviews</span>
            </div>
            <div className="hidden h-4 w-px bg-white/10 md:block" />
            <div className="flex items-center gap-1.5">
              <Quote className="h-3.5 w-3.5 text-deal-light" strokeWidth={2} />
              <span className="text-ash">See what closers are saying</span>
              <ArrowRight className="h-3 w-3 text-deal-light" strokeWidth={2} />
              <Link href="/reviews" className="font-semibold text-deal-light underline underline-offset-2 hover:text-white transition-colors">
                Reviews
              </Link>
            </div>
            <div className="hidden h-4 w-px bg-white/10 md:block" />
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_6px_#10B981]" />
              <span className="text-ash">Built on the floor by a working Toyota rep</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[800px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="relative">
                <div
                  className="absolute inset-0 -z-10 rounded-md bg-deal/40 blur-md"
                  aria-hidden
                />
                <Image
                  src="/logo.webp"
                  alt="Deal Clozr"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              </div>
              <span className="font-display text-[13px] font-black tracking-wider text-white">
                DEAL CLOZR
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ash">
              The AI agent that tracks every commission. Built on the floor. Deployed worldwide.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
              PRODUCT
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/how-it-works" className="text-ash transition-colors hover:text-deal-light">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-ash transition-colors hover:text-deal-light">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-ash transition-colors hover:text-deal-light">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-ash transition-colors hover:text-deal-light">
                  Skills Marketplace
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-ash transition-colors hover:text-deal-light">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
              INDUSTRIES
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/industries/auto"
                  className="text-ash transition-colors hover:text-deal-light"
                >
                  Auto
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/real-estate"
                  className="text-ash transition-colors hover:text-deal-light"
                >
                  Real Estate
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/insurance"
                  className="text-ash transition-colors hover:text-deal-light"
                >
                  Insurance
                </Link>
              </li>
              <li>
                <Link href="/industries" className="font-semibold text-deal-light transition-colors hover:text-white">
                  All 18 industries →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
              COMPANY
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/founder" className="text-ash transition-colors hover:text-deal-light">
                  Founder
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ash transition-colors hover:text-deal-light">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} Deal Clozr. Built on the sales
              floor in New Port Richey, FL.
            </p>
            <div className="mt-3 flex items-center gap-4">
              <a href="https://linkedin.com/company/dealclozr" target="_blank" rel="noopener noreferrer" className="text-xs text-ash transition-colors hover:text-deal-light">
                LinkedIn
              </a>
              <a href="https://instagram.com/dealclozr" target="_blank" rel="noopener noreferrer" className="text-xs text-ash transition-colors hover:text-deal-light">
                Instagram
              </a>
              <a href="https://tiktok.com/@dealclozr" target="_blank" rel="noopener noreferrer" className="text-xs text-ash transition-colors hover:text-deal-light">
                TikTok
              </a>
            </div>
          </div>
          <div className="flex gap-6 text-xs">
            <Link href="/privacy" className="text-muted transition-colors hover:text-ash">
              Privacy
            </Link>
            <Link href="/terms" className="text-muted transition-colors hover:text-ash">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
