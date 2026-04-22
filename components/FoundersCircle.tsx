"use client";

import { useState } from "react";
import { ArrowRight, Star, Lock, MessageSquare, Award } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const INDUSTRIES = [
  "Automotive",
  "Real Estate",
  "Insurance",
  "Solar",
  "SaaS",
  "Medical Devices",
  "Retail (Big Ticket)",
  "Pest Control",
  "HVAC",
  "Roofing",
  "Home Security",
  "Mortgage & Lending",
  "Financial Advisors",
  "Recruiting & Staffing",
  "Telecom & Cell Towers",
  "Rental",
];

const BENEFITS = [
  {
    icon: Star,
    title: "3 months free",
    body: "Full access, no credit card. Use it on live deals before you ever pay.",
  },
  {
    icon: Lock,
    title: "Lifetime founder pricing",
    body: "Your rate locks the day you join. Prices go up — yours never will.",
  },
  {
    icon: MessageSquare,
    title: "Direct line to the product",
    body: "Your feedback ships. You talk to Thul directly, not a support ticket.",
  },
  {
    icon: Award,
    title: "Founding member status",
    body: "Recognized in-app as a founding member. First in, forever credited.",
  },
];

export default function FoundersCircle({ formspreeId }: { formspreeId: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    industry: "",
    role: "",
    why: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.industry || !form.role) return;
    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/20 bg-white/8 px-4 py-3.5 text-[15px] text-white placeholder:text-ash backdrop-blur focus:border-deal focus:outline-none focus:ring-1 focus:ring-deal disabled:opacity-50";

  return (
    <section id="founders-circle" className="relative overflow-hidden">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(16,185,129,0.08) 0%, rgba(10,10,14,0.98) 40%, rgba(10,10,14,1) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Header */}
        <FadeIn>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
              Limited spots
            </span>
          </div>
          <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
            Founders Circle
          </h2>
          <p className="mt-3 text-xl font-semibold text-gold-light">
            Help us build Closers Assist
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ash">
            We&rsquo;re looking for industry pros to test, use, and help improve Closers
            Assist. Get 3 months free + lifetime discounted pricing as a founding member.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Benefits */}
          <FadeIn delay={100}>
            <div className="flex flex-col gap-6">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-deal/25 bg-deal/10">
                    <b.icon className="h-5 w-5 text-deal" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="font-semibold text-bone">{b.title}</div>
                    <div className="mt-0.5 text-sm leading-relaxed text-ash">{b.body}</div>
                  </div>
                </div>
              ))}

              {/* Scroll CTA */}
              <a
                href="#founders-form"
                className="btn-loud group mt-2 inline-flex w-fit items-center gap-2 rounded-xl px-7 py-4 text-[15px] font-bold"
              >
                Apply for Founders Circle
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </a>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={200}>
            {status === "success" ? (
              <div className="loud-card rounded-2xl p-8 text-center">
                <div className="mb-3 text-3xl">🤝</div>
                <h3 className="mb-2 text-xl font-bold text-bone">Application received.</h3>
                <p className="text-ash">
                  Thul reviews every application personally. You&rsquo;ll hear back within
                  48 hours.
                </p>
              </div>
            ) : (
              <form
                id="founders-form"
                onSubmit={handleSubmit}
                className="loud-card flex flex-col gap-4 rounded-2xl p-7"
              >
                <div className="mb-1">
                  <div className="text-xs font-bold uppercase tracking-widest text-deal">
                    Founders Circle Application
                  </div>
                  <p className="mt-1 text-sm text-ash">
                    All fields required except the last one.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-ash">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      required
                      disabled={status === "loading"}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-ash">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                      disabled={status === "loading"}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-ash">
                    Industry
                  </label>
                  <select
                    value={form.industry}
                    onChange={(e) => update("industry", e.target.value)}
                    required
                    disabled={status === "loading"}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Select your industry
                    </option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-ash">
                    Current Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sales Rep, Sales Manager, Dealership Owner"
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                    required
                    disabled={status === "loading"}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-ash">
                    Why do you want in?{" "}
                    <span className="text-muted">(optional)</span>
                  </label>
                  <textarea
                    placeholder="What problem are you trying to solve? What does your floor look like right now?"
                    value={form.why}
                    onChange={(e) => update("why", e.target.value)}
                    disabled={status === "loading"}
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">
                    Something went wrong. Try again or email thul@closersassist.com.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !form.name || !form.email || !form.industry || !form.role}
                  className="btn-loud button-glow inline-flex items-center justify-center gap-2 rounded-xl py-4 text-[15px] font-bold disabled:opacity-50"
                >
                  {status === "loading" ? "Submitting…" : "Apply for Founders Circle →"}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
