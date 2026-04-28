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
  Brain,
  Puzzle,
  UserCog,
  Store,
  ArrowRight,
  CheckCircle2,
  Bug,
  Wind,
  Landmark,
  TrendingUp,
  Users,
  Radio,
  KeyRound,
  ClipboardList,
  Handshake,
} from "lucide-react";
import RoiCalculator from "@/components/RoiCalculator";
import PhoneMockup from "@/components/PhoneMockup";
import FadeIn from "@/components/FadeIn";
import Counter from "@/components/Counter";
import LiveScoreboard from "@/components/LiveScoreboard";
import RealChat from "@/components/RealChat";
import EmailCapture from "@/components/EmailCapture";
import FoundersCircle from "@/components/FoundersCircle";

const industries = [
  {href:"/industries/auto",name:"Auto",icon:"Car",copy:"Pay plan math, trade valuations, CXI tracking, follow-up scripts.",live:true,image:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600"},
  {href:"/industries/real-estate",name:"Real Estate",icon:"Home",copy:"Listing prep, buyer nurture, commission splits, open house follow-ups.",live:true,image:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600"},
  {href:"/industries/insurance",name:"Insurance",icon:"Shield",copy:"Book of business, renewal tracking, cross-sell triggers, policy Q&A.",live:true,image:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600"},
  {href:"/industries/solar",name:"Solar",icon:"Sun",copy:"Quote math, utility bill analysis, proposal scripts, objection handling.",live:true,image:"https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600"},
  {href:"/industries/saas",name:"SaaS",icon:"Monitor",copy:"Pipeline pulse, discovery questions, demo prep, procurement maze.",live:true,image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600"},
  {href:"/industries/medical",name:"Medical Devices",icon:"HeartPulse",copy:"Protocol knowledge, rep-surgeon scripts, territory planning.",live:true,image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600"},
  {href:"/industries/retail",name:"Retail (Big Ticket)",icon:"ShoppingBag",copy:"Product specs, financing math, close-the-lap scripts for furniture and appliances.",live:true,image:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600"},
  {href:"/industries/pest-control",name:"Pest Control",icon:"Bug",copy:"Service plan objections, seasonal upsells, renewal retention scripts.",live:true,image:"/images/pest_control.jpg"},
  {href:"/industries/hvac",name:"HVAC",icon:"Wind",copy:"System upgrade objections, service agreements, financing calculator.",live:true,image:"https://images.unsplash.com/photo-1732395805034-e0bf859665e5?w=600"},
  {href:"/industries/roofing",name:"Roofing",icon:"Home",copy:"Insurance claim walkthroughs, repair-to-replace closer, storm territory playbook.",live:true,image:"https://images.unsplash.com/photo-1635424824849-1b09bdcc55b1?w=600"},
  {href:"/industries/home-security",name:"Home Security",icon:"Shield",copy:"Competitor rebuttals, monitoring contract scripts, smart home upsell playbook.",live:true,image:"https://images.unsplash.com/photo-1558002038-1055907df827?w=600"},
  {href:"/industries/mortgage",name:"Mortgage & Lending",icon:"Landmark",copy:"Rate objections, product explainers, pre-approval pipeline.",live:true,image:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600"},
  {href:"/industries/financial-advisors",name:"Financial Advisors",icon:"TrendingUp",copy:"Fee objections, robo-advisor rebuttals, AUM consolidation scripts.",live:true,image:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600"},
  {href:"/industries/recruiting",name:"Recruiting & Staffing",icon:"Users",copy:"Fee objections, candidate prep, job order closer, counter-offer playbook.",live:true,image:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600"},
  {href:"/industries/telecom",name:"Telecom & Cell Towers",icon:"Radio",copy:"Tower lease objections, enterprise deal coach, bandwidth upsell playbook.",live:true,image:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600"},
  {href:"/industries/rental",name:"Rental",icon:"KeyRound",copy:"Pricing disputes, damage deposit scripts, cancellation pushback, 5-star review asks.",live:true,image:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600"},
  {href:"/industries/project-manager",name:"Project Manager",icon:"ClipboardList",copy:"SOW defense, change order closer, budget objections, verbal-yes-to-signed-contract.",live:true,image:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600"},
  {href:"/industries/other-sales",name:"Other Sales",icon:"Handshake",copy:"Universal objections: price, timing, think about it, decision-maker stalls, ghosting.",live:true,image:"https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"},
];


const iconMap: Record<string, React.ReactNode> = {
  Car: <Car className="h-5 w-5" />,
  Home: <HomeIcon className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Sun: <Sun className="h-5 w-5" />,
  Monitor: <Monitor className="h-5 w-5" />,
  HeartPulse: <HeartPulse className="h-5 w-5" />,
  ShoppingBag: <ShoppingBag className="h-5 w-5" />,
  Bug: <Bug className="h-5 w-5" />,
  Wind: <Wind className="h-5 w-5" />,
  Landmark: <Landmark className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Radio: <Radio className="h-5 w-5" />,
  KeyRound: <KeyRound className="h-5 w-5" />,
  ClipboardList: <ClipboardList className="h-5 w-5" />,
  Handshake: <Handshake className="h-5 w-5" />,
};



const layers = [
  {
    icon: Brain,
    tag: "LAYER 1",
    title: "Core Brain",
    body: "Closing fundamentals, objection handling, follow-up logic. Built by us. Gets smarter every week.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600",
  },
  {
    icon: Puzzle,
    tag: "LAYER 2",
    title: "Industry Pack",
    body: "Auto-loaded by role. Your world, your vocabulary, your math — from minute one.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600",
  },
  {
    icon: UserCog,
    tag: "LAYER 3",
    title: "Your Layer",
    body: "Pay plan, scripts, brochures, CRM data, memory. Unlimited. Uncapped. Yours.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1 — HERO — Cinematic AI theme */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        {/* Radial red glow behind headline */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(220,38,38,0.18) 0%, transparent 70%)" }}
          aria-hidden
        />

        {/* Animated grid / circuit overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(220,38,38,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden
        />
        {/* Subtle vignette over grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, #0a0a0a 80%)" }}
          aria-hidden
        />

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
          {/* Eyebrow badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-800/50 bg-red-950/40 px-4 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-red-400">
              AI Sales Agent · Live on the Floor
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-black tracking-tight">
            <span className="block text-7xl leading-[0.92] text-white md:text-9xl">
              CLOSE MORE.
            </span>
            <span
              className="block text-7xl leading-[0.92] md:text-9xl"
              style={{ color: "#dc2626" }}
            >
              AI Sales Coach.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
            Your personal AI sales agent. Trained on your industry.
            Remembers every deal.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="rounded-xl px-8 py-4 text-[15px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "#dc2626" }}
            >
              Get Started Free
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-xl border border-white/30 px-8 py-4 text-[15px] font-bold text-white backdrop-blur transition-colors hover:border-white/60 hover:bg-white/5"
            >
              See It In Action
            </Link>
          </div>

          {/* Stat strip */}
          <p className="mt-10 text-sm uppercase tracking-widest text-gray-500">
            18 Industries &nbsp;·&nbsp; $0 Setup &nbsp;·&nbsp; &lt;3s to Deploy
          </p>
        </div>
      </section>

      {/* 1.5 — LIVE SCOREBOARD + FOUNDER PROOF (the new heat) */}
      <section className="relative overflow-hidden loud-bg-alt">
        <div className="grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <FadeIn>
            <div className="mb-10 max-w-3xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-deal" />
                <span className="text-xs font-medium uppercase tracking-widest text-deal">
                  What it looks like in the wild
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-6xl">
                Reps winning.{" "}
                <span className="text-shine font-black">Right now.</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ash">
                Every deal. Every commission. Every flipped objection. Demo
                data for now &mdash; real feed when reps are on the platform.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-4 lg:grid-cols-[1.2fr,1fr] lg:items-start">
            <FadeIn>
              <LiveScoreboard />
            </FadeIn>

            <FadeIn delay={150}>
              {/* Founder testimonial card */}
              <div className="loud-card relative overflow-hidden rounded-2xl p-7">
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%)",
                  }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(251,191,36,0.15), transparent 70%)",
                  }}
                  aria-hidden
                />
                <div className="relative">
                  <div className="mb-3 font-display text-6xl font-black leading-none text-shine">
                    &ldquo;
                  </div>
                  <p className="text-xl font-semibold leading-snug text-white md:text-2xl">
                    My CRM is a graveyard of dead leads.{" "}
                    <span className="text-shine">
                      Closers Assist is the only tool
                    </span>{" "}
                    that actually helps me close the ones I&rsquo;m about to
                    lose.
                  </p>
                  <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-display text-xs font-black text-white shadow-[0_4px_16px_rgba(16,185,129,0.5)]"
                      style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
                    >
                      TL
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold text-white">
                        Thul Leng
                      </div>
                      <div className="text-[11px] text-ash">
                        Sun Toyota · Florida · the guy who built it
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gold-light">
                        APRIL
                      </div>
                      <div className="font-display text-lg font-black text-shine">
                        $31,400
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={250}>
            <div className="mt-6">
              <RealChat />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 1.75 — DEAL BOARD (new visual section) */}
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-14 max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-light shadow-[0_0_8px_#FBBF24]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                  The deal board
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                Every deal.
                <br />
                <span className="text-shine font-black">
                  Every stage. Every dollar.
                </span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ash md:text-xl">
                Watch deals flow from objection to close. Your pipeline,
                rendered in green.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="grid gap-4 md:grid-cols-3">
              {/* Column 1 — Objection */}
              <div
                className="rounded-2xl border border-white/10 p-5 backdrop-blur"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(245,158,11,0.08), rgba(15,15,18,0.6))",
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-warn shadow-[0_0_8px_#F59E0B]" />
                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-warn">
                      Objection
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-ash">
                    3 deals
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[12px] font-bold text-white">
                        Kevin M.
                      </span>
                      <span className="font-mono text-[10px] text-ash">
                        RAV4
                      </span>
                    </div>
                    <div className="text-[11px] text-ash">
                      &ldquo;$499/mo too high&rdquo;
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="inline-block h-1 w-8 rounded-full bg-warn" />
                      <span className="text-[10px] text-warn">
                        Price
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[12px] font-bold text-white">
                        Patrick G.
                      </span>
                      <span className="font-mono text-[10px] text-ash">
                        Tundra
                      </span>
                    </div>
                    <div className="text-[11px] text-ash">
                      &ldquo;Trade value too low&rdquo;
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="inline-block h-1 w-8 rounded-full bg-warn" />
                      <span className="text-[10px] text-warn">
                        Trade
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-black/20 p-3 opacity-60">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[12px] font-bold text-white">
                        Vu T.
                      </span>
                      <span className="font-mono text-[10px] text-ash">
                        Tacoma
                      </span>
                    </div>
                    <div className="text-[11px] text-ash">
                      &ldquo;Need to think&rdquo;
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2 — Closing (with glow) */}
              <div
                className="rounded-2xl border border-deal/40 p-5 backdrop-blur shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(16,185,129,0.12), rgba(15,15,18,0.6))",
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-deal" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                      Closing
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-deal-light">
                    2 deals
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="rounded-xl border border-deal/30 bg-black/40 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[12px] font-bold text-white">
                        Zaeli C.
                      </span>
                      <span className="font-mono text-[10px] text-deal-light">
                        Camry
                      </span>
                    </div>
                    <div className="mb-2 text-[11px] text-ash">
                      Numbers approved. F&amp;I next.
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 overflow-hidden rounded-full bg-white/10">
                        <div className="h-1.5 w-[85%] rounded-full bg-deal" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-deal-light">
                        85%
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-deal/30 bg-black/40 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[12px] font-bold text-white">
                        Jinda B.
                      </span>
                      <span className="font-mono text-[10px] text-deal-light">
                        Highlander
                      </span>
                    </div>
                    <div className="mb-2 text-[11px] text-ash">
                      Signing paperwork now.
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 overflow-hidden rounded-full bg-white/10">
                        <div className="h-1.5 w-[95%] rounded-full bg-deal" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-deal-light">
                        95%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3 — Won (gold glow) */}
              <div
                className="relative overflow-hidden rounded-2xl border border-gold/40 p-5 backdrop-blur shadow-[0_0_40px_rgba(251,191,36,0.25)]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(251,191,36,0.12), rgba(15,15,18,0.6))",
                }}
              >
                {/* Confetti coin burst */}
                <div
                  className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(251,191,36,0.5), transparent 70%)",
                  }}
                  aria-hidden
                />
                <div className="relative mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-light/20 text-gold-light">
                      <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor"><path d="M6 1L7.5 4.5H11L8.5 6.5L9.5 10L6 8L2.5 10L3.5 6.5L1 4.5H4.5L6 1Z"/></svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                      Won
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-gold-light">
                    April total
                  </span>
                </div>
                <div className="relative mb-4 text-center">
                  <div className="text-[9px] font-bold uppercase tracking-[1.5px] text-gold-light">
                    Commission stacked
                  </div>
                  <div className="font-display text-[44px] font-black leading-none tracking-[-0.03em] text-mega-amber">
                    $31,400
                  </div>
                  <div className="mt-1 text-[10px] text-white/70">
                    18.5 units · 32 deals total
                  </div>
                </div>
                <div className="relative space-y-1.5">
                  <div className="flex items-center gap-2 rounded-md bg-black/30 px-2.5 py-1.5">
                    <span className="text-[10px]">✓</span>
                    <span className="flex-1 text-[11px] text-white">
                      Jinda B.
                    </span>
                    <span className="font-mono text-[11px] font-bold text-gold-light">
                      +$2,500
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-black/30 px-2.5 py-1.5">
                    <span className="text-[10px]">✓</span>
                    <span className="flex-1 text-[11px] text-white">
                      Idaliz F.
                    </span>
                    <span className="font-mono text-[11px] font-bold text-gold-light">
                      +$200
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-black/30 px-2.5 py-1.5">
                    <span className="text-[10px]">✓</span>
                    <span className="flex-1 text-[11px] text-white">
                      Fernando F.
                    </span>
                    <span className="font-mono text-[11px] font-bold text-gold-light">
                      +$200
                    </span>
                  </div>
                  <div className="text-center text-[10px] text-ash">
                    + 7 more deals
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2 — ROI CALCULATOR + PHONE MOCKUP */}
      <section className="relative overflow-hidden loud-bg">
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-12 max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-light shadow-[0_0_8px_#FBBF24]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                  Live ROI calculator
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                One deal pays for{" "}
                <span className="text-mega-amber font-black">10 years.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ash md:text-xl">
                Drag the sliders. Watch the green number. This is the math,
                not a pitch.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <RoiCalculator />
            </FadeIn>
            <FadeIn delay={200}>
              <PhoneMockup />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3 — FOUNDER STORY — with portrait-style photo */}
      <section className="relative overflow-hidden loud-bg-alt">
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                <img
                  src="/images/thul-founder.jpg"
                  alt="Thul Leng at Sun Toyota, New Port Richey, Florida"
                  className="absolute inset-0 h-full w-full object-cover object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-pit via-pit/30 to-transparent" />
                {/* Green corner glow */}
                <div
                  className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(16,185,129,0.35), transparent 70%)",
                  }}
                  aria-hidden
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-deal/40 bg-black/70 px-3.5 py-1.5 backdrop-blur">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-deal" />
                    </span>
                    <span className="text-[11px] font-semibold text-white">
                      Thul — Sun Toyota, New Port Richey, FL
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
                  <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                    Built on the floor
                  </span>
                </div>
                <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                  Built on the sales floor.
                  <br />
                  <span className="text-shine">Not in a boardroom.</span>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-ash md:text-xl">
                  My name is Thul. I sell Toyotas at Sun Toyota in Florida. I
                  built Closers Assist because my CRM doesn&rsquo;t close
                  deals — I do. Every tool on the market treats closers like
                  data entry clerks. We needed an agent that knows our pay
                  plan, our scripts, our objections, our customers.{" "}
                  <span className="font-semibold text-white">
                    So I built one. Now it&rsquo;s yours.
                  </span>
                </p>
                <Link
                  href="/founder"
                  className="mt-8 inline-flex items-center gap-1 text-[15px] font-bold text-gold-light transition-all hover:gap-2"
                >
                  Read the full story
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3.5 — BEFORE/AFTER TRANSFORMATION (new visual) */}
      <section className="relative overflow-hidden loud-bg-alt">
        <div className="grid-pattern opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-12 max-w-3xl text-center mx-auto">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-light shadow-[0_0_8px_#FBBF24]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                  Founder&rsquo;s month
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                One month.{" "}
                <span className="text-shine font-black">
                  One difference.
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ash">
                Thul&rsquo;s own numbers. March vs April. Same floor, same
                reps, same customers. Different tool.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="relative grid items-stretch gap-6 md:grid-cols-[1fr,auto,1fr]">
              {/* MARCH — muted */}
              <div
                className="relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-10"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(40,40,46,0.5), rgba(20,20,24,0.8))",
                }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-muted" />
                  <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-muted">
                    March 2026 &middot; no tool
                  </span>
                </div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-[2.5px] text-ash">
                  Take home
                </div>
                <div className="font-display text-[72px] font-black leading-none tracking-[-0.03em] text-ash md:text-[96px]">
                  $4,200
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/5 pt-5">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[1.5px] text-muted">
                      Units
                    </div>
                    <div className="font-display text-2xl font-black text-ash">
                      3.5
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[1.5px] text-muted">
                      Deals
                    </div>
                    <div className="font-display text-2xl font-black text-ash">
                      8
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[1.5px] text-muted">
                      CXI
                    </div>
                    <div className="font-display text-2xl font-black text-ash">
                      4.8
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-[12px] italic text-muted">
                  &ldquo;Grinding. Tired. Losing deals I should&rsquo;ve
                  closed.&rdquo;
                </div>
              </div>

              {/* Center arrow */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div
                    className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(16,185,129,0.5), transparent 70%)",
                    }}
                    aria-hidden
                  />
                  <div
                    className="relative flex h-14 w-14 items-center justify-center rounded-full text-2xl font-black text-white glow-pulse"
                    style={{
                      background:
                        "linear-gradient(135deg, #10B981, #059669)",
                    }}
                  >
                    →
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-[9px] font-bold uppercase tracking-[1.5px] text-deal-light">
                      Installed
                    </div>
                    <div className="text-[10px] text-ash">Closers Assist</div>
                  </div>
                </div>
              </div>

              {/* APRIL — glowing */}
              <div
                className="relative overflow-hidden rounded-3xl border border-deal/40 p-8 md:p-10 shadow-[0_0_60px_rgba(16,185,129,0.25)]"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(16,185,129,0.2), rgba(20,20,24,0.8))",
                }}
              >
                {/* Ambient corner glow */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(251,191,36,0.4), transparent 70%)",
                  }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(16,185,129,0.4), transparent 70%)",
                  }}
                  aria-hidden
                />

                {/* Floating coins */}
                <div
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full font-black text-[14px] text-[#422006] float-up"
                  style={{
                    background:
                      "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
                    boxShadow:
                      "0 8px 20px rgba(251,191,36,0.5), inset 0 2px 4px rgba(255,255,255,0.4)",
                  }}
                  aria-hidden
                >
                  $
                </div>
                <div
                  className="absolute bottom-6 right-10 flex h-7 w-7 items-center justify-center rounded-full font-black text-[10px] text-[#422006] float-down"
                  style={{
                    background:
                      "linear-gradient(135deg, #FBBF24 0%, #D97706 100%)",
                    boxShadow: "0 6px 16px rgba(251,191,36,0.45)",
                  }}
                  aria-hidden
                >
                  $
                </div>

                <div className="relative mb-3 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-deal" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                    April 2026 &middot; with Closers Assist
                  </span>
                </div>
                <div className="relative mb-1 text-[10px] font-bold uppercase tracking-[2.5px] text-deal-light">
                  Take home
                </div>
                <div className="relative font-display text-[72px] font-black leading-none tracking-[-0.03em] text-mega md:text-[96px]">
                  $31,400
                </div>
                <div className="relative mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-2.5 py-1 text-[11px] font-bold text-gold-light">
                  <span>↑</span>
                  +$27,200 &middot; +648%
                </div>
                <div className="relative mt-6 grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[1.5px] text-deal-light">
                      Units
                    </div>
                    <div className="font-display text-2xl font-black text-white">
                      18.5
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[1.5px] text-deal-light">
                      Deals
                    </div>
                    <div className="font-display text-2xl font-black text-white">
                      32
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[1.5px] text-deal-light">
                      CXI
                    </div>
                    <div className="font-display text-2xl font-black text-white">
                      5.0
                    </div>
                  </div>
                </div>
                <div className="relative mt-5 text-[12px] font-semibold italic text-white">
                  &ldquo;Every lead stays warm. Every objection has a
                  play.&rdquo;
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="mt-10 text-center text-[13px] text-ash">
              <span className="font-bold text-gold-light">
                Real numbers from Thul&rsquo;s pay stubs.
              </span>{" "}
              Your mileage will vary — the math will not.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 4 — INDUSTRIES — with scene photos per card */}
      <section className="relative overflow-hidden loud-bg">
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-12 max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  Eighteen doors. One brand.
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                One agent. Eighteen industries.
                <br />
                <span className="text-shine font-black">Zero compromises.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <FadeIn key={ind.name} delay={i * 60}>
                <Link
                  href={ind.href}
                  className="loud-card group block overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pit via-pit/40 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-black/60 backdrop-blur shadow-[0_8px_20px_rgba(16,185,129,0.3)]">
                      {iconMap[ind.icon]}
                    </div>
                    {ind.live && (
                      <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-white shadow-[0_4px_16px_rgba(16,185,129,0.5)]"
                        style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        Live
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="mb-1.5 text-lg font-bold text-white">
                      {ind.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-ash">
                      {ind.copy}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — ARCHITECTURE — 3 layer cards */}
      <section className="relative overflow-hidden loud-bg-alt">
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-12 max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F97316] shadow-[0_0_8px_#F97316]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#EA580C]">
                  How it&rsquo;s built
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                A brain. A playbook.{" "}
                <span className="text-shine font-black">Your voice.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-3">
            {layers.map((layer, i) => (
              <FadeIn key={layer.title} delay={i * 100}>
                <div className="loud-card group relative overflow-hidden rounded-2xl">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={layer.image}
                      alt={layer.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg border border-white/40 bg-white/95 backdrop-blur shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
                      <layer.icon
                        className="h-5 w-5 text-[#EA580C]"
                        strokeWidth={2.2}
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[1.5px] text-[#0D9488] backdrop-blur">
                      {layer.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-black tracking-tight text-white">
                      {layer.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-300">
                      {layer.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div
              className="mt-10 flex items-start gap-3 rounded-2xl border border-[#F97316]/30 p-6 backdrop-blur"
              style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(20,184,166,0.06))" }}
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#EA580C]"
                strokeWidth={2.5}
              />
              <p className="text-[15px] leading-relaxed text-[#0A0A0F]">
                Every tier gets full capability.{" "}
                <span className="font-bold text-[#EA580C]">
                  Tiers only differ by scale.
                </span>{" "}
                No feature gating, ever.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6 — MARKETPLACE */}
      <section className="relative overflow-hidden loud-bg">
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-light shadow-[0_0_8px_#FBBF24]" />
                  <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                    Skills Marketplace
                  </span>
                </div>
                <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                  Install a skill.
                  <br />
                  Build a skill.
                  <br />
                  <span className="text-mega-amber font-black">Get paid.</span>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-ash">
                  Think App Store for closers. Cold Call Coach. Deal Math.
                  Follow-Up Writer. Install the ones you want. Build your own.
                  Publish them.{" "}
                  <span className="font-semibold text-gold-light">
                    We split 70/30 in your favor.
                  </span>
                </p>
                <Link
                  href="/marketplace"
                  className="mt-8 inline-flex items-center gap-1 text-[15px] font-bold text-gold-light transition-all hover:gap-2"
                >
                  Browse the marketplace
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="loud-card rounded-2xl p-7">
                <div className="mb-5 flex items-center gap-2">
                  <Store
                    className="h-4 w-4 text-gold-light"
                    strokeWidth={2.2}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                    Launch skills
                  </span>
                </div>
                {[
                  { name: "Cold Call Coach", price: "$4.99/mo", tag: "LIVE" },
                  { name: "Deal Math", price: "$2.99/mo", tag: "LIVE" },
                  {
                    name: "Follow-Up Writer",
                    price: "$3.99/mo",
                    tag: "LIVE",
                  },
                  {
                    name: "Objection Killer",
                    price: "$4.99/mo",
                    tag: "LIVE",
                  },
                  { name: "Pipeline Pulse", price: "Free", tag: "LIVE" },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between border-b border-white/8 py-4 last:border-b-0"
                  >
                    <div>
                      <div className="text-[15px] font-bold text-white">
                        {s.name}
                      </div>
                      <div className="font-mono text-xs text-ash">
                        {s.price}
                      </div>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-white shadow-[0_4px_12px_rgba(16,185,129,0.4)]"
                      style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
                    >
                      {s.tag}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7 — PRICING SNAPSHOT */}
      <section className="relative overflow-hidden loud-bg-alt">
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-12 max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  Pricing
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                Less than Starbucks.
                <br />
                <span className="text-shine font-black">More than a coach.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$29.99",
                unit: "/ mo",
                seats: "1 rep",
                detail: "For the solo closer who wants to make more money this month.",
              },
              {
                name: "Pro",
                price: "$624.75",
                unit: "/ mo",
                seats: "Up to 25 reps",
                detail:
                  "For the manager rolling it out to the team. Works out to $24.99/rep.",
                featured: true,
              },
              {
                name: "Elite",
                price: "Custom",
                unit: "",
                seats: "100+ reps",
                detail:
                  "For the dealership. Starting at $19.99/rep — contact for your rate.",
              },
            ].map((p, i) => (
              <FadeIn key={p.name} delay={i * 80}>
                <div
                  className={`loud-card rounded-2xl p-7 ${
                    p.featured
                      ? "ring-2 ring-deal shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                      : ""
                  }`}
                >
                  <div
                    className={`mb-2 text-[10px] font-bold uppercase tracking-[1.5px] ${
                      p.featured ? "text-gold-light" : "text-ash"
                    }`}
                  >
                    {p.name}
                    {p.featured && " · Most popular"}
                  </div>
                  <div className="mb-3 text-sm text-ash">{p.seats}</div>
                  <div className="mb-3 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-black text-mega">
                      {p.price}
                    </span>
                    <span className="text-sm text-ash">{p.unit}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-ash">
                    {p.detail}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={300}>
            <div
              className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-deal/30 p-6 backdrop-blur"
              style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(30,30,35,0.6))" }}
            >
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl shadow-[0_8px_20px_rgba(16,185,129,0.35)]"
                style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.05))" }}
              >
                <Shield
                  className="h-6 w-6 text-deal-light"
                  strokeWidth={2.2}
                />
              </div>
              <p className="flex-1 text-[15px] text-white">
                <span className="font-bold text-shine">
                  Beat your last month or it&rsquo;s free.
                </span>{" "}
                <span className="text-ash">
                  No contracts. Cancel anytime.
                </span>
              </p>
              <Link href="/pricing" className="btn-loud rounded-xl px-5 py-2.5 text-sm">
                Get Started
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7.25 — COMPARISON TABLE */}
      <section className="relative overflow-hidden border-t border-iron loud-bg-alt">
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-12 max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  Head to head
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-5xl">
                Your CRM tracks deals.{" "}
                <span className="text-deal">We close them.</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ash">
                Everything else was built for managers. This was built for the
                rep on the floor.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
              {/* Header row */}
              <div className="grid grid-cols-4 border-b border-iron">
                <div className="p-4 text-xs font-medium uppercase tracking-widest text-muted" />
                <div className="border-l border-iron p-4 text-center text-sm text-ash">
                  Your CRM
                </div>
                <div className="border-l border-iron p-4 text-center text-sm text-ash">
                  Generic AI
                </div>
                <div className="border-l border-iron bg-deal/5 p-4 text-center">
                  <span className="font-display text-sm font-bold text-deal">
                    CLOSERS ASSIST
                  </span>
                </div>
              </div>

              {/* Data rows */}
              {[
                "Knows your pay plan",
                "Word-for-word scripts",
                "Built for live deals",
                "Industry-specific objections",
                "Remembers your customers",
                "Under $30/mo",
              ].map((row, i) => (
                <div
                  key={row}
                  className={`grid grid-cols-4 ${i < 5 ? "border-b border-iron" : ""}`}
                >
                  <div className="p-4 text-sm text-bone">{row}</div>
                  <div className="flex items-center justify-center border-l border-iron p-4 text-lg">
                    ❌
                  </div>
                  <div className="flex items-center justify-center border-l border-iron p-4 text-lg">
                    ❌
                  </div>
                  <div className="flex items-center justify-center border-l border-iron bg-deal/5 p-4 text-lg">
                    <span className="text-deal">✅</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-10 text-center">
              <Link href="/pricing" className="btn-loud rounded-xl px-5 py-2.5 text-sm">
                Get Started
              </Link>
              <p className="mt-4 text-sm text-muted">
                14-day free trial. No credit card required.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7.5 — FOUNDERS CIRCLE */}
      <FoundersCircle formspreeId="mwvargdv" />

      {/* 8 — FINAL CTA */}
      <section className="relative overflow-hidden loud-bg">
        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center md:py-36">
          <FadeIn>
            <h2 className="font-display text-5xl font-black leading-[0.95] tracking-[-0.03em] text-white md:text-7xl">
              Your CRM is a graveyard.<br />
              <span className="text-shine font-black">This isn&rsquo;t.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mx-auto mt-7 max-w-xl text-lg text-ash md:text-xl">
              Give yourself the edge your desk won&rsquo;t.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="mt-10">
              <Link href="/pricing" className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg">
                Get Started — $29.99/mo
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <p className="mt-4 text-sm text-muted">No credit card. Cancel anytime. Beat your last month or it&rsquo;s free.</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
