import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Car,
  Home as HomeIcon,
  Shield,
  Sun,
  Monitor,
  HeartPulse,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "One agent. Seven industries. Zero compromises. Closers Assist for Auto, Real Estate, Insurance, Solar, SaaS, Medical Devices, and Retail.",
};

const industries = [
  {
    icon: Car,
    name: "Auto",
    copy: "Pay plan math, trade valuations, CXI tracking, follow-up scripts. Built by a working Toyota rep.",
    href: "/industries/auto",
    live: true,
    image:
      "https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?w=800&q=80&auto=format&fit=crop",
  },
  {
    icon: HomeIcon,
    name: "Real Estate",
    copy: "Listing prep, buyer nurture, commission splits, open house follow-ups.",
    href: "/industries/real-estate",
    live: true,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop",
  },
  {
    icon: Shield,
    name: "Insurance",
    copy: "Book of business, renewal tracking, cross-sell triggers, policy Q&A.",
    href: "/industries/insurance",
    live: true,
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop",
  },
  {
    icon: Sun,
    name: "Solar",
    copy: "Quote math, utility bill analysis, proposal scripts, objection handling.",
    href: "/industries/solar",
    live: true,
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80&auto=format&fit=crop",
  },
  {
    icon: Monitor,
    name: "SaaS",
    copy: "Pipeline pulse, discovery questions, demo prep, procurement maze.",
    href: "/industries/saas",
    live: true,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
  },
  {
    icon: HeartPulse,
    name: "Medical Devices",
    copy: "Protocol knowledge, rep-surgeon scripts, territory planning.",
    href: "/industries/medical",
    live: true,
    image:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80&auto=format&fit=crop",
  },
  {
    icon: ShoppingBag,
    name: "Retail (Big Ticket)",
    copy: "Product specs, financing math, close-the-lap scripts for furniture, appliances, jewelry, marine, RV, powersports.",
    href: "/industries/retail",
    live: true,
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80&auto=format&fit=crop",
  },
];

export default function IndustriesPage() {
  return (
    <section className="relative overflow-hidden loud-bg">
      <div className="grid-pattern opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <FadeIn>
          <div className="mb-14 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                Industries
              </span>
            </div>
            <h1 className="font-display text-5xl font-black leading-[0.98] tracking-[-0.02em] text-white md:text-7xl">
              One agent. Seven industries.
              <br />
              <span className="text-shine font-black">Zero compromises.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ash md:text-xl">
              A closer is a closer. The industry is the wrapper. Pick yours —
              Closers Assist auto-loads your world the second you sign up.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <FadeIn key={ind.name} delay={i * 60}>
              <Link
                href={ind.href}
                className="loud-card group flex h-full flex-col overflow-hidden rounded-2xl"
              >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={ind.image}
                  alt={ind.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate via-slate/30 to-transparent" />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-iron bg-pit/80 backdrop-blur">
                  <ind.icon className="h-5 w-5 text-deal" strokeWidth={2} />
                </div>
                <div className="absolute right-4 top-4">
                  {ind.live ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-deal px-2.5 py-1 font-mono text-[10px] font-medium tracking-widest text-pit">
                      <span className="h-1.5 w-1.5 rounded-full bg-pit" />
                      LIVE
                    </span>
                  ) : (
                    <span className="rounded-full bg-pit/80 px-2.5 py-1 font-mono text-[10px] font-medium tracking-widest text-ash backdrop-blur">
                      SOON
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 text-lg font-medium text-bone">
                  {ind.name}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-ash">
                  {ind.copy}
                </p>
                {ind.live && (
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-deal transition-all group-hover:gap-2">
                    Explore {ind.name}
                    <ArrowRight
                      className="h-3.5 w-3.5"
                      strokeWidth={2.5}
                    />
                  </div>
                )}
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
      </div>
    </section>
  );
}
