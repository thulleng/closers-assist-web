import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
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
                  src="/logo.png"
                  alt="Closers Assist"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-md"
                />
              </div>
              <span className="font-display text-[13px] font-black tracking-wider text-white">
                CLOSERS <span className="text-shine">ASSIST</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ash">
              The AI agent every closer owns.
              <br />
              <span className="font-semibold text-gold-light">
                Built on the floor. Priced like a coffee.
              </span>
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
              Product
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
              Industries
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
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/founder" className="text-ash transition-colors hover:text-deal-light">
                  Founder
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-ash transition-colors hover:text-deal-light">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="mailto:thul@closersassist.com"
                  className="text-ash transition-colors hover:text-deal-light"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Closers Assist. Built on the sales
            floor in New Port Richey, FL.
          </p>
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
