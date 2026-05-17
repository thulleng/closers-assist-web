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
  Check,
  X,
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
import HeroVisual from "@/components/HeroVisual";
import FloatingParticles from "@/components/FloatingParticles";
import TiltCard from "@/components/TiltCard";
import MobileCTABar from "@/components/MobileCTABar";
import WaitlistCounter from "@/components/WaitlistCounter";
import NewsletterSection from "@/components/NewsletterSection";
import DemoChat from "@/components/DemoChat";
import FAQ from "@/components/FAQ";
import TrustStrip from "@/components/TrustStrip";

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
      {/* DEMO CHAT — Meet Your Real Personal Assistant Today */}
      <section className="relative overflow-hidden loud-bg min-h-screen md:min-h-[900px] flex items-center">
        {/* ===== DRAMATIC BACKGROUND — Dora's World ===== */}

        {/* Layer 1: Subtle vignette — keeps edges dark for readability */}
        <div className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: "radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(5,5,6,0.3) 70%, rgba(5,5,6,0.6) 100%)"
          }}
        />

        {/* Layer 1.5: Cyberpunk AI image — 100% REAL, Ken Burns motion */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage: "url(/dora-bg.jpg)",
            backgroundSize: "110%",
            backgroundPosition: "center 35%",
            animation: "kenburns 30s ease-in-out infinite alternate",
          }}
        />

        {/* Layer 1.6: Scan lines — subtle cyberpunk feel */}
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(16,185,129,0.3) 2px, rgba(16,185,129,0.3) 3px)",
            animation: "scan-line 8s linear infinite",
          }}
        />

        {/* Layer 2: Massive glow orbs — the atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
          {/* Central pink/green mega-glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full animate-pulse-slow"
            style={{
              background: "radial-gradient(circle at 50% 45%, rgba(236,72,153,0.22) 0%, rgba(16,185,129,0.14) 30%, rgba(251,191,36,0.08) 50%, transparent 70%)",
              filter: "blur(70px)",
              animationDuration: "5s"
            }}
          />
          {/* Secondary warm glow — upper right */}
          <div className="absolute top-[15%] right-[15%] w-[550px] h-[550px] rounded-full opacity-30 animate-pulse-slow"
            style={{
              background: "radial-gradient(circle, rgba(251,191,36,0.3) 0%, rgba(236,72,153,0.12) 40%, transparent 65%)",
              filter: "blur(60px)",
              animationDuration: "6s"
            }}
          />
          {/* Cool accent — lower left */}
          <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full opacity-25 animate-pulse-slow"
            style={{
              background: "radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(16,185,129,0.1) 50%, transparent 70%)",
              filter: "blur(50px)",
              animationDuration: "4.5s"
            }}
          />
        </div>

        {/* Layer 3: Hexagonal tech grid — subtle, rotating slowly */}
        <div className="absolute inset-0 pointer-events-none z-[3] opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 20 L55 45 L30 60 L5 45 L5 20 Z' fill='none' stroke='%2310B981' stroke-width='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
            animation: "subtle-drift 20s linear infinite"
          }}
        />

        {/* Layer 4: Radiating light rays from center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[3] w-[900px] h-[900px] opacity-[0.06]"
          style={{
            background: "conic-gradient(from 0deg, #EC4899 0deg, transparent 15deg, #10B981 40deg, transparent 55deg, #FBBF24 80deg, transparent 95deg, #EC4899 120deg, transparent 135deg, #10B981 160deg, transparent 175deg, #FBBF24 200deg, transparent 215deg, #EC4899 240deg, transparent 255deg, #10B981 280deg, transparent 295deg, #FBBF24 320deg, transparent 335deg, #EC4899 360deg)",
            filter: "blur(2px)",
            animation: "spin 60s linear infinite"
          }}
        />

        {/* Layer 5: Removed — replaced by real hero image (dora-bg.jpg) */}

        {/* Layer 6: Floating particles — more, bigger, dramatic */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
          {[...Array(35)].map((_, i) => {
            const size = 2 + Math.random() * 6;
            const isBig = i < 6; // first 6 are larger "hero" particles
            return (
              <div
                key={i}
                className="absolute rounded-full animate-float"
                style={{
                  width: `${isBig ? 4 + Math.random() * 6 : size}px`,
                  height: `${isBig ? 4 + Math.random() * 6 : size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 3 === 0 ? '#EC4899' : i % 3 === 1 ? '#10B981' : '#FBBF24',
                  opacity: isBig ? 0.25 + Math.random() * 0.35 : 0.2 + Math.random() * 0.35,
                  animationDuration: `${4 + Math.random() * 8}s`,
                  animationDelay: `${Math.random() * 5}s`,
                  boxShadow: isBig ? `0 0 ${6 + Math.random() * 8}px currentColor` : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20 md:py-28 text-center w-full">
          {/* Frosted glass backdrop — makes content pop against 100% image */}
          <div className="absolute inset-4 rounded-3xl pointer-events-none"
            style={{
              background: "rgba(5,5,6,0.35)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          />
          <FadeIn>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/15 px-4 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_12px_#EC4899]" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[2px] text-pink-300">
                Live now
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-7xl font-black leading-[1.05] tracking-[-0.02em] text-white mb-4 relative"
              style={{ textShadow: "0 0 40px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)" }}>
              Meet Your Real Personal Assistant Today
              <br />
              <span className="text-pink-300 font-black" style={{ textShadow: "0 0 40px rgba(236,72,153,0.7), 0 0 80px rgba(236,72,153,0.4)" }}>— Dora!!!</span>
              <br />
              <span className="text-shine font-black text-2xl sm:text-6xl" style={{ textShadow: "0 0 50px rgba(16,185,129,0.8), 0 0 100px rgba(16,185,129,0.4), 0 2px 8px rgba(0,0,0,0.5)" }}>Let's Explore Together!</span>
            </h2>
            <p className="text-lg sm:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed font-bold relative"
              style={{ textShadow: "0 0 40px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)" }}>
              Ask her anything — pricing, features, whether she can really handle your life AND your deals. <span className="text-pink-300 font-black">She's got opinions.</span> 😏
            </p>
          </FadeIn>
          {/* Directional cue — tells new users exactly where to start */}
          <FadeIn delay={100}>
            <div className="mb-6 flex flex-col items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/10 px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base font-bold text-deal-light animate-pulse-slow">
                👇 Start here — ask me anything
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="relative">
              {/* Chat card glow — animated pulse */}
              <div className="absolute -inset-4 rounded-3xl blur-2xl"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(236,72,153,0.35) 0%, rgba(16,185,129,0.2) 40%, transparent 70%)",
                  animation: "glow-breathe 3s ease-in-out infinite",
                }}
              />
              <div className="relative">
                <DemoChat />
              </div>
            </div>
            {/* Secondary CTA — for visitors who don't want to chat */}
            <div className="mt-8 text-center">
              <a href="/pricing" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-deal-light transition-colors">
                Or skip the chat — <span className="text-deal underline underline-offset-4">see plans &amp; pricing →</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 1 — HERO — LOUD rebuild with 3D money card */}
      <section className="relative overflow-hidden loud-bg bg-ai-gradient">
        <div className="grid-pattern" />
        <div className="grain" />
        <FloatingParticles />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 md:pb-32 md:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr,1fr]">
            {/* LEFT COLUMN — copy */}
            <div>
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-gradient-to-r from-deal/20 to-gold/15 px-3.5 py-1.5 backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                    The best AI agent in the business · Built by a working rep
                  </span>
                </div>
              </div>

              <div>
                <h1 className="font-display text-[48px] font-black leading-[0.95] tracking-[-0.02em] text-white md:text-[72px]">
                  You can&rsquo;t clone
                  <br />
                  yourself.
                  <br />
                  <span className="text-shine font-black">
                    We did.
                  </span>
                </h1>
              </div>

              <div>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash md:text-xl">
                  An AI employee that handles your deals AND your life.
                  <br />
                  <span className="mt-2 inline-block font-semibold text-gold-light">
                    Never drops a ball. Never forgets a detail. Never clocks out.
                  </span>
                </p>
              </div>

              <div>
                <div className="mt-8 max-w-md">
                  <EmailCapture
                    placeholder="your@email.com"
                    buttonText="Deploy My Agent"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-muted">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2
                      className="h-3.5 w-3.5 text-deal"
                      strokeWidth={2.5}
                    />
                    No credit card
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2
                      className="h-3.5 w-3.5 text-deal"
                      strokeWidth={2.5}
                    />
                    No contracts. Cancel anytime.
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2
                      className="h-3.5 w-3.5 text-deal"
                      strokeWidth={2.5}
                    />
                    Cancel in 1 click
                  </span>
                  <Link
                    href="#tutorial"
                    className="text-gold-light hover:underline"
                  >
                    ▶ Watch it close a deal in under 2 minutes
                  </Link>
                </div>
              </div>

              {/* Waitlist counter */}
              <div className="mt-6">
                <WaitlistCounter />
              </div>
            </div>

            {/* RIGHT COLUMN — 3D money card visual + AI core */}
            <div>
              <div className="relative mx-auto h-[620px] w-full max-w-[380px]">
                {/* AI Core visual — layered behind the phone */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-90">
                  <HeroVisual size={420} />
                </div>

                {/* Ambient green glow behind phone */}
                <div
                  className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 60%)",
                  }}
                  aria-hidden
                />
                {/* Gold glow behind phone (secondary) */}
                <div
                  className="absolute right-0 top-20 h-[200px] w-[200px] rounded-full blur-3xl opacity-60"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 70%)",
                  }}
                  aria-hidden
                />

                {/* Rotating orbit ring */}
                <div
                  className="absolute left-1/2 top-1/2 h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-deal/20 spin-slower"
                  aria-hidden
                />

                {/* Floating coins around phone */}
                <div
                  className="absolute -left-2 top-24 z-20 flex h-14 w-14 items-center justify-center rounded-full font-black text-[20px] text-[#422006] float-up"
                  style={{
                    background:
                      "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
                    boxShadow:
                      "0 10px 30px rgba(251,191,36,0.5), inset 0 2px 4px rgba(255,255,255,0.4)",
                  }}
                  aria-hidden
                >
                  $
                </div>
                <div
                  className="absolute -right-4 top-48 z-20 flex h-10 w-10 items-center justify-center rounded-full font-black text-[14px] text-[#422006] float-down"
                  style={{
                    background:
                      "linear-gradient(135deg, #FBBF24 0%, #D97706 100%)",
                    boxShadow:
                      "0 8px 20px rgba(251,191,36,0.4), inset 0 2px 4px rgba(255,255,255,0.4)",
                  }}
                  aria-hidden
                >
                  $
                </div>
                <div
                  className="absolute -right-6 bottom-40 z-20 flex h-12 w-12 items-center justify-center rounded-full font-black text-[16px] text-[#422006] float-side"
                  style={{
                    background:
                      "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
                    boxShadow:
                      "0 8px 24px rgba(251,191,36,0.45), inset 0 2px 4px rgba(255,255,255,0.4)",
                  }}
                  aria-hidden
                >
                  $
                </div>

                {/* iPhone mockup */}
                <div
                  className="relative mx-auto h-[620px] w-[300px] rounded-[52px] p-[10px]"
                  style={{
                    background:
                      "linear-gradient(180deg, #1a1a1e 0%, #0a0a0b 50%, #1a1a1e 100%)",
                    boxShadow:
                      "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Phone inner screen */}
                  <div
                    className="relative h-full w-full overflow-hidden rounded-[42px]"
                    style={{ background: "#050506" }}
                  >
                    {/* Notch */}
                    <div
                      className="absolute left-1/2 top-0 z-30 h-[26px] w-[110px] -translate-x-1/2 rounded-b-[18px]"
                      style={{ background: "#000" }}
                      aria-hidden
                    />

                    {/* Status bar */}
                    <div className="relative z-20 flex items-center justify-between px-7 pt-3 text-[11px] font-semibold text-white">
                      <span>9:41</span>
                      <span className="flex items-center gap-1">
                        <span className="text-[9px]">●●●●</span>
                        <span className="text-[10px]">5G</span>
                        <span
                          className="ml-1 inline-block h-2.5 w-5 rounded-[3px] border border-white/80 pr-0.5"
                          aria-hidden
                        >
                          <span className="block h-full w-4/5 rounded-[1px] bg-white" />
                        </span>
                      </span>
                    </div>

                    {/* App header */}
                    <div className="relative z-10 mt-6 flex items-center gap-2.5 border-b border-white/5 px-4 pb-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg font-display text-[11px] font-black text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, #10B981, #059669)",
                          boxShadow: "0 4px 12px rgba(16,185,129,0.4)",
                        }}
                      >
                        CA
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 text-[13px] font-bold text-white">
                          Closers Assist
                          <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-deal">
                            <svg
                              viewBox="0 0 10 10"
                              className="h-2 w-2 text-white"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <path d="M2 5L4 7L8 3" strokeLinecap="round" />
                            </svg>
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-ash">
                          <span className="h-1.5 w-1.5 rounded-full bg-deal pulse-ring" />
                          Live · Typing...
                        </div>
                      </div>
                    </div>

                    {/* Chat messages */}
                    <div className="space-y-2.5 px-3.5 pt-3.5">
                      {/* User message */}
                      <div className="flex justify-end">
                        <div
                          className="max-w-[75%] rounded-[18px] rounded-tr-[4px] px-3.5 py-2 text-[12px] text-white shadow-sm"
                          style={{
                            background:
                              "linear-gradient(135deg, #10B981, #059669)",
                          }}
                        >
                          Customer says $499/mo is too high on the RAV4 XLE.
                        </div>
                      </div>

                      {/* Agent typing response */}
                      <div className="flex">
                        <div className="max-w-[82%] space-y-1.5">
                          <div className="rounded-[18px] rounded-tl-[4px] bg-white/8 px-3.5 py-2 text-[11px] text-white/90 backdrop-blur">
                            Pulling pay plan, lease incentives, and RAV4 XLE
                            residual math...
                          </div>
                          <div className="rounded-[18px] rounded-tl-[4px] bg-white/8 px-3.5 py-2.5 text-[11px] text-white backdrop-blur">
                            <div className="mb-1.5 text-[9px] font-bold uppercase tracking-wider text-deal-light">
                              3 plays for you
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 rounded-md border-l-2 border-deal bg-white/5 py-1 pl-2">
                                <span className="flex-1 text-[10.5px]">
                                  <span className="font-bold">
                                    Reframe to weekly cost
                                  </span>
                                  <br />
                                  <span className="text-white/70">
                                    $115/wk. Less than a tank.
                                  </span>
                                </span>
                                <span className="font-mono text-[9px] font-bold text-deal-light">
                                  78%
                                </span>
                              </div>
                              <div className="flex items-center gap-2 rounded-md border-l-2 border-deal/60 bg-white/5 py-1 pl-2">
                                <span className="flex-1 text-[10.5px]">
                                  <span className="font-bold">
                                    Drop to 36mo
                                  </span>
                                  <br />
                                  <span className="text-white/70">
                                    $449/mo. Same residual.
                                  </span>
                                </span>
                                <span className="font-mono text-[9px] font-bold text-deal-light">
                                  71%
                                </span>
                              </div>
                              <div className="flex items-center gap-2 rounded-md border-l-2 border-deal/40 bg-white/5 py-1 pl-2">
                                <span className="flex-1 text-[10.5px]">
                                  <span className="font-bold">
                                    Pivot: Hybrid
                                  </span>
                                  <br />
                                  <span className="text-white/70">
                                    +$20 saves $110/mo gas.
                                  </span>
                                </span>
                                <span className="font-mono text-[9px] font-bold text-deal-light">
                                  64%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live commission ticker pinned at bottom */}
                    <div
                      className="absolute bottom-4 left-3 right-3 z-20 overflow-hidden rounded-2xl backdrop-blur-md"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1))",
                        border: "1px solid rgba(16,185,129,0.4)",
                        boxShadow:
                          "0 20px 40px rgba(16,185,129,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                      }}
                    >
                      <div className="flex items-center gap-2.5 px-3.5 py-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-deal text-xl font-black text-white shadow-[0_4px_12px_rgba(16,185,129,0.5)]">
                          ✓
                        </div>
                        <div className="flex-1">
                          <div className="text-[9px] font-bold uppercase tracking-wider text-deal-light">
                            Deal closed · Just now
                          </div>
                          <div className="text-[13px] font-bold text-white">
                            RAV4 XLE &middot; $499/mo
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-[9px] text-white/70">
                            +COMM
                          </div>
                          <div className="font-display text-base font-black text-white">
                            $2,500
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating "closed" notification badge */}
                <div
                  className="absolute -right-6 top-6 z-30 rounded-2xl px-3 py-2 text-[10px] font-bold text-white shadow-[0_12px_32px_rgba(16,185,129,0.5)] float-up"
                  style={{
                    background:
                      "linear-gradient(135deg, #10B981, #059669)",
                  }}
                >
                  <div className="text-[8px] font-bold uppercase tracking-wider text-white/80">
                    ✓ Closed
                  </div>
                  <div className="font-display text-sm font-black">
                    +$2,500
                  </div>
                </div>

                {/* Floating "5.0 CXI" badge */}
                <div
                  className="absolute -left-6 bottom-28 z-30 rounded-2xl px-3 py-2 text-[10px] font-bold text-white shadow-[0_12px_32px_rgba(251,191,36,0.45)] float-down"
                  style={{
                    background:
                      "linear-gradient(135deg, #FBBF24, #D97706)",
                  }}
                >
                  <div className="text-[8px] font-bold uppercase tracking-wider text-[#422006]">
                    ★ CXI
                  </div>
                  <div className="font-display text-sm font-black text-[#422006]">
                    5.0
                  </div>
                </div>

                {/* Real data badge */}
                <div className="absolute -bottom-4 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-lg border border-deal/30 bg-black/80 px-3 py-1.5 text-[10px] font-semibold text-deal-light backdrop-blur">
                  REAL UI &middot; Thul&rsquo;s floor &middot; Sun Toyota
                </div>
              </div>
            </div>
          </div>

          {/* HUGE stat strip — the math closers can't argue with */}
          <div>
            <div className="mt-20 rounded-2xl border border-white/8 bg-black/40 p-5 sm:p-8 backdrop-blur">
              <div className="mb-5 text-center text-[10px] font-bold uppercase tracking-[2px] text-ash">
                The math closers can&rsquo;t argue with
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                <div className="text-center">
                  <Counter to={18} duration={2000} className="font-display text-[28px] font-black leading-none tracking-[-0.03em] text-mega sm:text-[40px] md:text-[56px] lg:text-[72px]" />
                  <div className="mt-1 sm:mt-2 text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-ash">
                    Industries
                  </div>
                </div>
                <div className="border-x border-white/10 text-center">
                  <div className="font-display text-[28px] font-black leading-none tracking-[-0.03em] text-mega sm:text-[40px] md:text-[56px] lg:text-[72px]">
                    24/7
                  </div>
                  <div className="mt-1 sm:mt-2 text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-ash">
                    Always on
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-display text-[28px] font-black leading-none tracking-[-0.03em] text-mega sm:text-[40px] md:text-[56px] lg:text-[72px]">
                    &lt;3s
                  </div>
                  <div className="mt-1 sm:mt-2 text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-ash">
                    Question to play
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING STRIP — We're not a tool. We're the best. */}
      <section className="relative overflow-hidden border-t border-white/5 bg-black">
        <div className="relative mx-auto max-w-4xl px-6 py-10 text-center md:py-14">
          <FadeIn>
            <p className="font-display text-xl font-black leading-snug tracking-[-0.01em] text-white md:text-2xl">
              We don&rsquo;t build AI <span className="text-ash">tools</span>.
              {' '}We build <span className="text-shine">AI employees</span> —
              the only ones in the world that handle
              {' '}<span className="text-deal-light">your deals</span> AND{' '}
              <span className="text-gold-light">your life</span>.
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[2px] text-muted">
              Category-defining · Floor-built · No competition
            </p>
          </FadeIn>
        </div>
      </section>

      {/* THREE BENEFITS — what makes your AI employee unstoppable */}
      <section className="relative overflow-hidden border-t border-white/5">
        <div className="grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_#FBBF24]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                  Why closers choose us
                </span>
              </div>
              <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
                More than a bot.
                <br />
                <span className="text-shine font-black">This is your employee.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Benefit 1 — Memory */}
            <FadeIn delay={100}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/50 p-7 backdrop-blur transition-all hover:border-deal/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-deal/15 text-2xl">
                  🧠
                </div>
                <h3 className="mb-3 font-display text-xl font-black text-white">
                  Never forgets a deal
                </h3>
                <p className="text-sm leading-relaxed text-ash">
                  Remembers every customer. Every objection. Every close. Six months later, a customer walks back on the lot — Closers Assist knows exactly what you said, what they pushed back on, and what closed them last time.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-deal/20 bg-deal/5 px-3 py-1 text-[10px] font-semibold text-deal-light">
                  Persistent memory across sessions
                </div>
              </div>
            </FadeIn>

            {/* Benefit 2 — Zero setup */}
            <FadeIn delay={200}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/50 p-7 backdrop-blur transition-all hover:border-deal/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-deal/15 text-2xl">
                  ⚡
                </div>
                <h3 className="mb-3 font-display text-xl font-black text-white">
                  Zero setup. Zero training.
                </h3>
                <p className="text-sm leading-relaxed text-ash">
                  Pick your industry. Start closing. No prompt engineering. No training period. No IT ticket. You already know how to text — that&rsquo;s the entire interface.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-deal/20 bg-deal/5 px-3 py-1 text-[10px] font-semibold text-deal-light">
                  Close your first deal in under 2 minutes
                </div>
              </div>
            </FadeIn>

            {/* Benefit 3 — Your voice */}
            <FadeIn delay={300}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/50 p-7 backdrop-blur transition-all hover:border-deal/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-deal/15 text-2xl">
                  🎯
                </div>
                <h3 className="mb-3 font-display text-xl font-black text-white">
                  Sounds like you. Not a bot.
                </h3>
                <p className="text-sm leading-relaxed text-ash">
                  Your scripts. Your style. Your floor. Closers Assist learns how YOU talk — not some generic AI that sounds like a press release. Every play reads like you typed it between customers.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-deal/20 bg-deal/5 px-3 py-1 text-[10px] font-semibold text-deal-light">
                  Built on Thul&rsquo;s floor at Sun Toyota
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* WHAT YOUR AGENT DOES — Two columns: Business + Personal */}
      <section className="relative overflow-hidden loud-bg-alt border-t border-white/5">
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  What your agent does
                </span>
              </div>
              <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
                One agent.
                <br />
                <span className="text-shine font-black">Your entire life. Handled.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Closes Deals */}
            <FadeIn delay={50}>
              <div className="group relative overflow-hidden rounded-2xl border border-deal/20 bg-black/50 p-8 backdrop-blur transition-all hover:border-deal/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-deal/15 text-2xl">
                  💼
                </div>
                <h3 className="mb-2 font-display text-2xl font-black text-white">
                  Closes Deals
                </h3>
                <p className="mb-5 text-sm text-ash">Your agent handles the revenue side — so you focus on closing, not admin.</p>
                <ul className="space-y-3 text-sm text-ash">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-deal" strokeWidth={2.5} />
                    <span>Follows up with leads automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-deal" strokeWidth={2.5} />
                    <span>Manages pipeline stage-by-stage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-deal" strokeWidth={2.5} />
                    <span>Drafts contracts & invoices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-deal" strokeWidth={2.5} />
                    <span>Syncs with email & CRM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-deal" strokeWidth={2.5} />
                    <span>Never lets a cold lead go cold</span>
                  </li>
                </ul>
              </div>
            </FadeIn>

            {/* Handles Life */}
            <FadeIn delay={150}>
              <div className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-black/50 p-8 backdrop-blur transition-all hover:border-gold/40 hover:shadow-[0_0_40px_rgba(251,191,36,0.1)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-2xl">
                  🏠
                </div>
                <h3 className="mb-2 font-display text-2xl font-black text-white">
                  Handles Life
                </h3>
                <p className="mb-5 text-sm text-ash">Your agent remembers the personal stuff — so you never drop a ball at home.</p>
                <ul className="space-y-3 text-sm text-ash">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" strokeWidth={2.5} />
                    <span>Books appointments & reservations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" strokeWidth={2.5} />
                    <span>Reminds you of birthdays & events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" strokeWidth={2.5} />
                    <span>Researches flights & hotels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" strokeWidth={2.5} />
                    <span>Summarizes school newsletters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" strokeWidth={2.5} />
                    <span>Manages your to-do list</span>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* THE UNCOPYABLE EDGE — 7 moats competitors can't touch */}
      <section className="relative overflow-hidden loud-bg border-t border-white/5">
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_#FBBF24]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                  The uncopyable edge
                </span>
              </div>
              <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl mb-4">
                They can copy our features.
                <br />
                <span className="text-shine font-black">They can't copy this.</span>
              </h2>
              <p className="text-lg text-ash max-w-2xl mx-auto">
                Every AI company claims to be different. Here's what makes it true — backed by results, not marketing.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* Moat 1: Dual-Domain */}
            <FadeIn delay={0}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/40 p-6 backdrop-blur transition-all hover:border-gold/30 h-full flex flex-col">
                <div className="mb-3 text-3xl">🧠</div>
                <h3 className="mb-2 font-display text-lg font-black text-white">Deals + Life. One brain.</h3>
                <p className="text-sm leading-relaxed text-ash mb-3 flex-1">
                  No other AI agent handles your professional AND personal life. Your closer doesn't clock out when the deal closes — neither does your agent.
                </p>
                <div className="rounded-xl border border-gold/10 bg-gold/5 p-3 text-xs text-gold-light/80 leading-relaxed">
                  <span className="font-bold text-gold-light">Real result:</span> "I forgot my wife's birthday. My agent reminded me at 9 AM with a gift idea based on something she mentioned 3 months ago." — Beta user
                </div>
              </div>
            </FadeIn>

            {/* Moat 2: Built on the Floor */}
            <FadeIn delay={50}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/40 p-6 backdrop-blur transition-all hover:border-gold/30 h-full flex flex-col">
                <div className="mb-3 text-3xl">🏗️</div>
                <h3 className="mb-2 font-display text-lg font-black text-white">Built on a Toyota lot. Not a boardroom.</h3>
                <p className="text-sm leading-relaxed text-ash mb-3 flex-1">
                  Thul Leng closes cars 6 days a week at Sun Toyota. He built ClosersAssist between customers — not with VC money. Every play in our agent comes from a real floor.
                </p>
                <div className="rounded-xl border border-gold/10 bg-gold/5 p-3 text-xs text-gold-light/80 leading-relaxed">
                  <span className="font-bold text-gold-light">Real result:</span> The RAV4 XLE demo on our homepage? Actual deal math from Thul's floor. Not a mockup. Not a simulation.
                </div>
              </div>
            </FadeIn>

            {/* Moat 3: Your Pay Plan */}
            <FadeIn delay={100}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/40 p-6 backdrop-blur transition-all hover:border-gold/30 h-full flex flex-col">
                <div className="mb-3 text-3xl">💰</div>
                <h3 className="mb-2 font-display text-lg font-black text-white">Knows YOUR pay plan. Tracks real bonus tiers.</h3>
                <p className="text-sm leading-relaxed text-ash mb-3 flex-1">
                  Not generic commission tracking. Your agent learns YOUR specific pay plan — stair-step bonuses, spiffs, backend gross targets — and pushes you toward the next tier.
                </p>
                <div className="rounded-xl border border-gold/10 bg-gold/5 p-3 text-xs text-gold-light/80 leading-relaxed">
                  <span className="font-bold text-gold-light">Real result:</span> "You're at 11 units. One more = $1,500 bonus. 3 days left. The Ramirez deal is warm — here's a follow-up text."
                </div>
              </div>
            </FadeIn>

            {/* Moat 4: Memory That Outlasts Your CRM */}
            <FadeIn delay={150}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/40 p-6 backdrop-blur transition-all hover:border-gold/30 h-full flex flex-col">
                <div className="mb-3 text-3xl">🔄</div>
                <h3 className="mb-2 font-display text-lg font-black text-white">6-month memory. Zero data entry.</h3>
                <p className="text-sm leading-relaxed text-ash mb-3 flex-1">
                  CRM data goes stale. Your agent remembers every customer, every objection, every close — automatically. Six months later, a customer walks back in and your agent knows exactly what worked last time.
                </p>
                <div className="rounded-xl border border-gold/10 bg-gold/5 p-3 text-xs text-gold-light/80 leading-relaxed">
                  <span className="font-bold text-gold-light">Real result:</span> "Stephen Cunningham is back. Last visit: March. Objection was payment. You closed him with the 36-month reframe. He bought a RAV4 XLE at $499/mo."
                </div>
              </div>
            </FadeIn>

            {/* Moat 5: The 2AM Test */}
            <FadeIn delay={200}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/40 p-6 backdrop-blur transition-all hover:border-gold/30 h-full flex flex-col">
                <div className="mb-3 text-3xl">🕐</div>
                <h3 className="mb-2 font-display text-lg font-black text-white">Passes the 2 AM test. Every time.</h3>
                <p className="text-sm leading-relaxed text-ash mb-3 flex-1">
                  Message your agent at 2 AM. Sunday morning. Christmas Eve. It responds — no ticket, no queue, no business hours. Your closer doesn't clock out. Neither does your agent.
                </p>
                <div className="rounded-xl border border-gold/10 bg-gold/5 p-3 text-xs text-gold-light/80 leading-relaxed">
                  <span className="font-bold text-gold-light">Real result:</span> A lead submitted at 11:47 PM. Agent followed up at 11:48 PM. Deal closed at 12:15 AM. The rep was asleep. The agent wasn't.
                </div>
              </div>
            </FadeIn>

            {/* Moat 6: Floor-Tested Plays */}
            <FadeIn delay={250}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/40 p-6 backdrop-blur transition-all hover:border-gold/30 h-full flex flex-col">
                <div className="mb-3 text-3xl">🎯</div>
                <h3 className="mb-2 font-display text-lg font-black text-white">Real plays. Real floor. Real closes.</h3>
                <p className="text-sm leading-relaxed text-ash mb-3 flex-1">
                  Every objection handler comes from actual deals — not theory. "This play worked on a RAV4 XLE last Tuesday." We know because Thul was there.
                </p>
                <div className="rounded-xl border border-gold/10 bg-gold/5 p-3 text-xs text-gold-light/80 leading-relaxed">
                  <span className="font-bold text-gold-light">Real result:</span> Customer: "$499/mo is too high." Agent gives 3 plays. Reframe to $115/wk wins. Close rate on price objections: 64%.
                </div>
              </div>
            </FadeIn>

            {/* Moat 7: Voice Clone — Sounds like YOU */}
            <FadeIn delay={300}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/40 p-6 backdrop-blur transition-all hover:border-gold/30 h-full flex flex-col">
                <div className="mb-3 text-3xl">🗣️</div>
                <h3 className="mb-2 font-display text-lg font-black text-white">Sounds like YOU. Not a bot.</h3>
                <p className="text-sm leading-relaxed text-ash mb-3 flex-1">
                  After 50 deals, your agent doesn't just know your scripts — it learns your voice. Your phrases. Your cadence. Your closing style. Competitors give you a generic bot. We clone you.
                </p>
                <div className="rounded-xl border border-gold/10 bg-gold/5 p-3 text-xs text-gold-light/80 leading-relaxed">
                  <span className="font-bold text-gold-light">Real result:</span> Thul's agent writes follow-ups that his own manager couldn't tell apart from Thul. "Hey John — that RAV4 you looked at? Payment came in lower than I thought. Give me 2 minutes Monday."
                </div>
              </div>
            </FadeIn>

            {/* Moat 8: Your Data Stays Yours */}
            <FadeIn delay={350}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/40 p-6 backdrop-blur transition-all hover:border-gold/30 h-full flex flex-col">
                <div className="mb-3 text-3xl">🔒</div>
                <h3 className="mb-2 font-display text-lg font-black text-white">Your data is YOURS. Forever.</h3>
                <p className="text-sm leading-relaxed text-ash mb-3 flex-1">
                  Your scripts. Your pay plan. Your customer conversations. Export anytime. Delete anytime. We never train on your data — unlike every free AI that vacuums up your business and sells it back to you.
                </p>
                <div className="rounded-xl border border-gold/10 bg-gold/5 p-3 text-xs text-gold-light/80 leading-relaxed">
                  <span className="font-bold text-gold-light">Real result:</span> Chatbots trained on customer data get their own customers' objections quoted back to competitors. Your closer's playbook stays YOUR competitive advantage. Always.
                </div>
              </div>
            </FadeIn>

            {/* Moat 9: Pricing as a Weapon */}
            <FadeIn delay={400}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/40 p-6 backdrop-blur transition-all hover:border-gold/30 lg:col-span-3">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="text-4xl md:text-5xl shrink-0">⚡</div>
                  <div>
                    <h3 className="mb-2 font-display text-lg font-black text-white">$29.99/mo. One deal pays for 10 years.</h3>
                    <p className="text-sm leading-relaxed text-ash">
                      Competitors charge $500+/mo for single-industry SDRs. We charge $29.99 for all 18 industries + personal life. Why? Because Thul's a working rep who knows what closers can actually afford. Not a SaaS company maximizing ARPU. <span className="font-bold text-gold-light">14-day free trial. No credit card. Cancel in one click.</span>
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={400}>
            <p className="mt-10 text-center text-lg font-bold text-gold-light">
              That's not a feature list. That's the company.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* HOW IT WORKS — 3 steps to deploy your agent */}
      <section className="relative overflow-hidden loud-bg-alt border-t border-white/5">
        <div className="grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/10 px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  How it works
                </span>
              </div>
              <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
                Your agent is live
                <br />
                <span className="text-shine font-black">in 5 minutes.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <FadeIn delay={100}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/50 p-7 backdrop-blur transition-all hover:border-deal/30">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-deal/15 font-display text-xl font-black text-deal-light">
                    1
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-deal/30 to-transparent" />
                </div>
                <h3 className="mb-3 font-display text-xl font-black text-white">
                  Tell us about you
                </h3>
                <p className="text-sm leading-relaxed text-ash">
                  Your industry. Your pay plan. Your scripts. Your goals. Your agent learns your business <span className="font-semibold text-bone">and</span> your life — dentist appointments, school pickups, the stuff that falls through the cracks.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-deal/20 bg-deal/5 px-3 py-1 text-[10px] font-semibold text-deal-light">
                  &lt; 2 minutes
                </div>
              </div>
            </FadeIn>

            {/* Step 2 */}
            <FadeIn delay={200}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/50 p-7 backdrop-blur transition-all hover:border-deal/30">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-deal/15 font-display text-xl font-black text-deal-light">
                    2
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-deal/30 to-transparent" />
                </div>
                <h3 className="mb-3 font-display text-xl font-black text-white">
                  Deploy on Telegram
                </h3>
                <p className="text-sm leading-relaxed text-ash">
                  One click. Your agent goes live on Telegram — the app you already use. No new dashboard to learn. No software to install. Just open Telegram and start talking to your closer.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-deal/20 bg-deal/5 px-3 py-1 text-[10px] font-semibold text-deal-light">
                  Instant
                </div>
              </div>
            </FadeIn>

            {/* Step 3 */}
            <FadeIn delay={300}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/50 p-7 backdrop-blur transition-all hover:border-deal/30">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-deal/15 font-display text-xl font-black text-deal-light">
                    3
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-deal/30 to-transparent" />
                </div>
                <h3 className="mb-3 font-display text-xl font-black text-white">
                  Start closing. Start living.
                </h3>
                <p className="text-sm leading-relaxed text-ash">
                  Your agent handles follow-ups, remembers every customer, drafts your responses, tracks your commissions — <span className="font-semibold text-bone">and</span> books your dentist appointment. You focus on the floor.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-deal/20 bg-deal/5 px-3 py-1 text-[10px] font-semibold text-deal-light">
                  Day 1 value
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>


      {/* TUTORIAL VIDEO */} 
      <section id="tutorial" className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-20">
          <FadeIn>
            <div className="mb-8 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  Watch the walkthrough
                </span>
              </div>
              <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
                See exactly how it works
                <span className="text-shine font-black"> in under 2 minutes.</span>
              </h2>
            </div>
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(16,185,129,0.12)]">
              <video
                src="/demo-90s.mp4?v=2"
                controls
                poster="/images/video-poster.jpg"
                className="w-full"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="mt-4 text-center text-sm text-ash">
              From sign-up to your first closed deal — everything you need in under 2 minutes.
            </p>
          </FadeIn>
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
                    I used to drop follow-ups all the time.{" "}
                    <span className="text-shine">
                      Now my agent handles it
                    </span>{" "}
                    while I&rsquo;m working the floor. Haven&rsquo;t lost a lead since.
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

          {/* ── Full-width beta testimonials — 2 rows × 3 ────────────────── */}
          <FadeIn delay={200}>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Alex M. — Insurance */}
              <div className="loud-card group relative overflow-hidden rounded-2xl p-6">
                <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)" }} />
                <div className="relative">
                  <div className="mb-3 font-display text-3xl font-black leading-none text-shine">&ldquo;</div>
                  <p className="text-sm leading-relaxed text-ash">
                    The objection killer alone is worth it. Customer said my rate was too high — agent gave me three plays ranked by close %. Closed him 20 minutes later.
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 font-display text-[10px] font-black text-gold-light">AM</div>
                    <div>
                      <div className="text-[12px] font-bold text-white">Alex M.</div>
                      <div className="text-[10px] text-muted">Insurance Agent · Tampa, FL</div>
                    </div>
                    <div className="ml-auto rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[9px] font-semibold text-gold-light">BETA</div>
                  </div>
                </div>
              </div>

              {/* Sarah K. — Real Estate */}
              <div className="loud-card group relative overflow-hidden rounded-2xl p-6">
                <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)" }} />
                <div className="relative">
                  <div className="mb-3 font-display text-3xl font-black leading-none text-shine">&ldquo;</div>
                  <p className="text-sm leading-relaxed text-ash">
                    I used to spend Sunday nights writing follow-ups. Now I paste the name and it writes three versions. My reply rate doubled in two weeks.
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 font-display text-[10px] font-black text-gold-light">SK</div>
                    <div>
                      <div className="text-[12px] font-bold text-white">Sarah K.</div>
                      <div className="text-[10px] text-muted">Real Estate Agent · Miami, FL</div>
                    </div>
                    <div className="ml-auto rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[9px] font-semibold text-gold-light">BETA</div>
                  </div>
                </div>
              </div>

              {/* David R. — Solar */}
              <div className="loud-card group relative overflow-hidden rounded-2xl p-6">
                <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)" }} />
                <div className="relative">
                  <div className="mb-3 font-display text-3xl font-black leading-none text-shine">&ldquo;</div>
                  <p className="text-sm leading-relaxed text-ash">
                    I don&rsquo;t do math in my head on a kitchen table anymore. I tell the agent the system size and it spits out the commission, dealer fee, and monthly. Done.
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 font-display text-[10px] font-black text-gold-light">DR</div>
                    <div>
                      <div className="text-[12px] font-bold text-white">David R.</div>
                      <div className="text-[10px] text-muted">Solar Sales · Orlando, FL</div>
                    </div>
                    <div className="ml-auto rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[9px] font-semibold text-gold-light">BETA</div>
                  </div>
                </div>
              </div>

              {/* Marcus J. — SaaS */}
              <div className="loud-card group relative overflow-hidden rounded-2xl p-6">
                <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)" }} />
                <div className="relative">
                  <div className="mb-3 font-display text-3xl font-black leading-none text-shine">&ldquo;</div>
                  <p className="text-sm leading-relaxed text-ash">
                    I run MEDDIC on every deal without thinking about it now. The agent scores my opportunities and tells me which discovery questions I&rsquo;m missing. Pipeline actually moves.
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 font-display text-[10px] font-black text-gold-light">MJ</div>
                    <div>
                      <div className="text-[12px] font-bold text-white">Marcus J.</div>
                      <div className="text-[10px] text-muted">SaaS AE · Austin, TX</div>
                    </div>
                    <div className="ml-auto rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[9px] font-semibold text-gold-light">BETA</div>
                  </div>
                </div>
              </div>

              {/* Lisa T. — Medical Devices */}
              <div className="loud-card group relative overflow-hidden rounded-2xl p-6">
                <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)" }} />
                <div className="relative">
                  <div className="mb-3 font-display text-3xl font-black leading-none text-shine">&ldquo;</div>
                  <p className="text-sm leading-relaxed text-ash">
                    Getting past the gatekeeper used to be my whole morning. Now the agent preps my intro for the specific surgeon and protocol. I walk in knowing exactly what to lead with.
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 font-display text-[10px] font-black text-gold-light">LT</div>
                    <div>
                      <div className="text-[12px] font-bold text-white">Lisa T.</div>
                      <div className="text-[10px] text-muted">Medical Devices · Chicago, IL</div>
                    </div>
                    <div className="ml-auto rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[9px] font-semibold text-gold-light">BETA</div>
                  </div>
                </div>
              </div>

              {/* Carlos V. — Mortgage */}
              <div className="loud-card group relative overflow-hidden rounded-2xl p-6">
                <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)" }} />
                <div className="relative">
                  <div className="mb-3 font-display text-3xl font-black leading-none text-shine">&ldquo;</div>
                  <p className="text-sm leading-relaxed text-ash">
                    Rate objection used to kill my pipeline. Now the agent runs the break-even calc in seconds and shows them why waiting costs more. Three refis saved this month because of it.
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 font-display text-[10px] font-black text-gold-light">CV</div>
                    <div>
                      <div className="text-[12px] font-bold text-white">Carlos V.</div>
                      <div className="text-[10px] text-muted">Mortgage Broker · Phoenix, AZ</div>
                    </div>
                    <div className="ml-auto rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[9px] font-semibold text-gold-light">BETA</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

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
              <h2 className="font-display text-2xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl md:text-6xl">
                Every deal.
                <span className="text-shine font-black"> Every stage. Every dollar.</span>
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
                <h2 className="font-display text-2xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl md:text-6xl">
                  Built on the sales floor.
                  <span className="text-shine"> Not in a boardroom.</span>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-ash md:text-xl">
                  My name is Thul. I sell Toyotas at Sun Toyota in Florida. I
                  built Closers Assist because I needed an employee — not
                  another tool. Something that knows my pay
                  plan, my scripts, my objections, my customers.{" "}
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
              <h2 className="font-display text-2xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl md:text-6xl">
                One agent. Eighteen industries.
                <span className="text-shine font-black"> Zero compromises.</span>
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
              <h2 className="font-display text-2xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl md:text-6xl">
                A brain. A playbook.
                <span className="text-shine font-black"> Your voice.</span>
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
              <p className="text-[15px] leading-relaxed text-white/90">
                  Every tier gets full capability.{" "}
                  <span className="font-bold text-[#F97316]">
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
      {/* PRICING — Vera's Plan */} 
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
                Two ways to get
                <br />
                <span className="text-shine font-black">your closer.</span>
              </h2>
              <p className="mt-4 text-lg text-ash">
                Self-serve SaaS or a dedicated AI employee. Same agent — different level of hands-on.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1: SaaS Self-Serve */}
            <FadeIn delay={0}>
              <TiltCard maxTilt={4} scale={1.01}>
                <div className="loud-card rounded-2xl p-8">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[1.5px] text-ash">
                    SaaS · Self-Serve
                  </div>
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className="font-display text-5xl font-black text-white">$29.99</span>
                    <span className="text-sm text-ash">/ mo</span>
                  </div>
                  <ul className="mb-6 space-y-3 text-sm text-ash">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-deal" strokeWidth={2.5} />
                      <span>Deploy from your dashboard in 5 minutes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-deal" strokeWidth={2.5} />
                      <span>Full Skills Marketplace + all integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-deal" strokeWidth={2.5} />
                      <span>Email support · 24-hour response</span>
                    </li>
                  </ul>
                  <Link href="/pricing" className="inline-block rounded-xl border-2 border-white/[0.08] px-6 py-3 text-sm font-bold text-bone transition-all hover:border-deal/30 hover:bg-deal/[0.04] hover:text-white">
                    Get Started
                  </Link>
                </div>
              </TiltCard>
            </FadeIn>

            {/* Card 2: Dedicated Agent */}
            <FadeIn delay={100}>
              <TiltCard maxTilt={4} scale={1.01}>
                <div className="loud-card rounded-2xl p-8 ring-2 ring-deal shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                    Dedicated Agent · White-Glove
                  </div>
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className="font-display text-5xl font-black text-mega">$3K–$5K</span>
                    <span className="text-sm text-ash">/ mo</span>
                  </div>
                  <ul className="mb-6 space-y-3 text-sm text-ash">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-deal" strokeWidth={2.5} />
                      <span><strong className="text-white">Everything in SaaS</strong> — plus done-for-you onboarding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-deal" strokeWidth={2.5} />
                      <span>Custom scripts, CRM integration, team rollout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-deal" strokeWidth={2.5} />
                      <span>Priority support · 48-hour setup · Private Slack</span>
                    </li>
                  </ul>
                  <Link href="/enterprise" className="btn-loud inline-block rounded-xl px-6 py-3 text-sm">
                    Deploy My Agent
                  </Link>
                </div>
              </TiltCard>
            </FadeIn>
          </div>

          {/* Shared features */}
          <FadeIn delay={200}>
            <div className="mt-10 text-center">
              <p className="text-sm text-ash mb-4">Both tiers include —</p>
              <div className="inline-flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-bone/80">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-deal" strokeWidth={2.5} /> Unique personality</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-deal" strokeWidth={2.5} /> Cross-session memory</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-deal" strokeWidth={2.5} /> Morning briefs & deal tracking</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-deal" strokeWidth={2.5} /> Built on the floor</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-deal" strokeWidth={2.5} /> Your data stays yours</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7.25 — COMPARISON TABLE */}
      <section className="relative overflow-hidden border-t border-iron loud-bg-alt">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80&auto=format&fit=crop)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Floating orb */}
        <div className="absolute top-[20%] right-[5%] w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 60%)" }} />

        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-12 max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  Head to head
                </span>
              </div>
              <h2 className="font-display text-2xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl">
                Your CRM tracks deals.
                <span className="text-deal"> We close them.</span>
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
              <div className="grid grid-cols-4 border-b border-iron bg-white/[0.03]">
                <div className="p-5 text-xs font-medium uppercase tracking-widest text-muted" />
                <div className="border-l border-iron p-5 text-center">
                  <span className="text-sm font-semibold text-ash">Your CRM</span>
                </div>
                <div className="border-l border-iron p-5 text-center">
                  <span className="text-sm font-semibold text-ash">Generic AI</span>
                </div>
                <div className="border-l border-iron bg-deal/[0.06] p-5 text-center">
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
                "Flat pricing. No per-deal cut.",
              ].map((row, i) => (
                <div
                  key={row}
                  className={`grid grid-cols-4 transition-colors hover:bg-white/[0.02] ${
                    i < 5 ? "border-b border-iron" : ""
                  }`}
                >
                  <div className="p-5 text-sm font-medium text-bone">{row}</div>
                  <div className="flex items-center justify-center border-l border-iron p-5">
                    <X className="h-5 w-5 text-red-400/60" strokeWidth={2} />
                  </div>
                  <div className="flex items-center justify-center border-l border-iron p-5">
                    <X className="h-5 w-5 text-red-400/60" strokeWidth={2} />
                  </div>
                  <div className="flex items-center justify-center border-l border-iron bg-deal/[0.06] p-5">
                    <Check className="h-5 w-5 text-deal" strokeWidth={2.5} />
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

      {/* 7.28 — FAQ */}
      <FAQ />

      {/* 7.29 — Trust Strip */}
      <TrustStrip />

      {/* 7.3 — ENTERPRISE CTA */}
      <section className="relative overflow-hidden">
        <div
          className="relative border-y border-deal/20"
          style={{
            background: "linear-gradient(180deg, #050506 0%, #0a0a0e 100%)",
          }}
        >
          {/* Ambient glows */}
          <div
            className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 60%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 right-0 h-48 w-72 rounded-full blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)",
            }}
            aria-hidden
          />

          <FadeIn>
            <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-20 text-center md:flex-row md:gap-12 md:py-24 md:text-left">
              {/* Left: badge + copy */}
              <div className="flex-1 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-light shadow-[0_0_8px_#FBBF24]" />
                  <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                    Enterprise
                  </span>
                </div>

                <h2 className="font-display text-3xl font-black leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl">
                  Need a dedicated AI closer
                  <br />
                  for your{" "}
                  <span className="text-shine font-black">whole floor?</span>
                </h2>

                <p className="text-lg leading-relaxed text-ash">
                  Done-for-you onboarding. Custom scripts. CRM integration.
                  <br />
                  <span className="font-semibold text-bone">
                    $5K/mo · 48-hour setup · White-glove rollout
                  </span>
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/enterprise"
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-[#050506] shadow-[0_4px_20px_rgba(251,191,36,0.4)] transition-all hover:shadow-[0_6px_28px_rgba(251,191,36,0.6)]"
                    style={{
                      background:
                        "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
                    }}
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                  <Link
                    href="/enterprise"
                    className="rounded-xl border border-deal/40 px-6 py-3 text-sm font-bold text-deal-light transition-all hover:border-deal hover:bg-deal/10"
                  >
                    Book a Call →
                  </Link>
                </div>
              </div>

              {/* Right: stat cards */}
              <div className="flex-shrink-0 space-y-4">
                <div className="flex gap-4">
                  <div className="rounded-2xl border border-white/8 bg-black/60 p-5 text-center backdrop-blur">
                    <div className="font-display text-3xl font-black text-deal">
                      $5K
                    </div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-ash">
                      / mo
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-black/60 p-5 text-center backdrop-blur">
                    <div className="font-display text-3xl font-black text-gold-light">
                      48h
                    </div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-ash">
                      Setup
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-deal/20 bg-black/60 p-5 text-center backdrop-blur">
                  <div className="font-display text-2xl font-black text-white">
                    Done-for-you
                  </div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-deal-light">
                    Custom scripts · CRM · Rollout
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7.4 — NEWSLETTER: From the Floor */}
      <NewsletterSection />

      {/* 7.5 — FOUNDERS CIRCLE */}
      <FoundersCircle formspreeId="mwvargdv" />

      {/* 8 — FINAL CTA */}
      <section className="relative overflow-hidden loud-bg">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 60%)" }} />
        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center md:py-36">
          <FadeIn>
            <h2 className="font-display text-5xl font-black leading-[0.95] tracking-[-0.03em] text-white md:text-7xl">
              Your agent is waiting.
              <br />
              <span className="text-shine font-black">Deploy yours in 5 minutes.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mx-auto mt-7 max-w-xl text-lg text-ash md:text-xl">
              An AI employee that handles your deals AND your life. Month to month. No setup fees. No contracts.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="mt-10 max-w-md mx-auto">
              <EmailCapture
                placeholder="your@email.com"
                buttonText="Deploy My Agent"
              />
              <p className="mt-4 text-sm text-muted">No credit card. Cancel anytime. 14-day free trial.</p>
            </div>
          </FadeIn>
        </div>
      </section>
      <MobileCTABar />
    </>
  );
}
