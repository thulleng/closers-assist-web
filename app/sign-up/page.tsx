"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Zap, Check, ArrowRight, Mail, Loader2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function SignUpPage() {
  return (
    <Suspense fallback={<SignUpFallback />}>
      <SignUpForm />
    </Suspense>
  );
}

function SignUpFallback() {
  return (
    <main className="relative overflow-hidden loud-bg min-h-screen flex items-center justify-center">
      <div className="grid-pattern opacity-30" />
      <div className="relative mx-auto max-w-lg px-6 py-20 text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03]">
          <Loader2 className="h-8 w-8 text-muted animate-spin" />
        </div>
      </div>
    </main>
  );
}

function SignUpForm() {
  const searchParams = useSearchParams();
  const plan = searchParams ? searchParams.get("plan") ?? "free" : "free";
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("auto");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/register-free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, industry }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="relative overflow-hidden loud-bg min-h-screen flex items-center justify-center">
        <div className="grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-lg px-6 py-20 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-deal/20">
            <Check className="h-8 w-8 text-deal" strokeWidth={3} />
          </div>
          <h1 className="font-display text-3xl font-black text-white mb-4">
            You&rsquo;re in.
          </h1>
          <p className="text-lg text-ash mb-2">
            Check your email for the magic link.
          </p>
          <p className="text-sm text-muted mb-8">
            Click it to activate your free Deal Clozr agent. It ships in about 5 minutes.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-deal pulse-ring" />
            <span className="text-xs font-bold uppercase tracking-wider text-deal-light">
              50 free messages this month
            </span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden loud-bg min-h-screen">
      <div className="grid-pattern opacity-40" />
      <div className="relative mx-auto max-w-xl px-6 py-16 md:py-24">
        <FadeIn>
          <div className="text-center mb-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5">
              <Zap className="h-3.5 w-3.5 text-gold-light" />
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                Free — no credit card
              </span>
            </div>
            <h1 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white">
              Try Deal Clozr
              <br />
              <span className="text-shine font-black">free for life.</span>
            </h1>
            <p className="mt-4 text-ash text-sm max-w-md mx-auto">
              50 messages/month. Pick any industry. Your agent ships in 5 minutes.
              Upgrade anytime when you&rsquo;re ready to close faster.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-bone mb-1.5">
                  Your email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" strokeWidth={2} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@dealership.com"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white placeholder:text-muted focus:border-deal/50 focus:outline-none focus:ring-1 focus:ring-deal/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-bone mb-1.5">
                  Your industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 px-4 text-sm text-white focus:border-deal/50 focus:outline-none focus:ring-1 focus:ring-deal/30 transition-all appearance-none"
                >
                  <option value="auto" className="bg-zinc-900">Auto</option>
                  <option value="real-estate" className="bg-zinc-900">Real Estate</option>
                  <option value="insurance" className="bg-zinc-900">Insurance</option>
                  <option value="mortgage" className="bg-zinc-900">Mortgage</option>
                  <option value="solar" className="bg-zinc-900">Solar</option>
                  <option value="hvac" className="bg-zinc-900">HVAC</option>
                  <option value="roofing" className="bg-zinc-900">Roofing</option>
                  <option value="pest-control" className="bg-zinc-900">Pest Control</option>
                  <option value="home-security" className="bg-zinc-900">Home Security</option>
                  <option value="retail" className="bg-zinc-900">Retail</option>
                  <option value="recruiting" className="bg-zinc-900">Recruiting</option>
                  <option value="medical" className="bg-zinc-900">Medical Device</option>
                  <option value="financial-advisors" className="bg-zinc-900">Financial Advisors</option>
                  <option value="project-manager" className="bg-zinc-900">Project Management</option>
                  <option value="rental" className="bg-zinc-900">Rental / Property</option>
                  <option value="saas" className="bg-zinc-900">SaaS</option>
                  <option value="telecom" className="bg-zinc-900">Telecom</option>
                  <option value="other-sales" className="bg-zinc-900">Other Sales</option>
                </select>
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-deal to-emerald-500 py-3.5 text-sm font-bold text-pit shadow-[0_8px_24px_rgba(16,185,129,0.3)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.45)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Shipping your agent…
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Deploy My Free Agent
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted">
                No credit card. Cancel anytime.{" "}
                <Link href="/privacy" className="text-ash hover:text-white underline underline-offset-2">
                  Privacy
                </Link>
                {" · "}
                <Link href="/terms" className="text-ash hover:text-white underline underline-offset-2">
                  Terms
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="text-lg font-bold text-deal-light">50</div>
              <div className="text-xs text-muted mt-0.5">messages / month</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="text-lg font-bold text-deal-light">18</div>
              <div className="text-xs text-muted mt-0.5">industries to pick from</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="text-lg font-bold text-deal-light">5 min</div>
              <div className="text-xs text-muted mt-0.5">to ship your agent</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="text-lg font-bold text-deal-light">$0</div>
              <div className="text-xs text-muted mt-0.5">forever</div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-ash">
            Ready to upgrade?{" "}
            <Link href="/pricing" className="text-deal-light hover:text-deal font-semibold">
              See plans →
            </Link>
          </p>
        </FadeIn>
      </div>
    </main>
  );
}
