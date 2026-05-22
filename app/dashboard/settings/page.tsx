"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Settings2,
  Check,
  Loader2,
  AlertCircle,
  CreditCard,
  Calendar,
  DollarSign,
  Shield,
  User,
  Mail,
  Clock,
  Zap,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubscriptionData {
  plan: "starter-monthly" | "starter-yearly" | "pro-yearly" | null;
  status: string;
  currentPeriodEnd: string | null;
  customerEmail: string | null;
  customerName: string | null;
}

// ─── Pricing lookup ───────────────────────────────────────────────────────────

const PLAN_INFO: Record<string, { label: string; price: string; interval: string }> = {
  "starter-monthly":  { label: "Starter",  price: "$29.99",   interval: "month" },
  "starter-yearly":   { label: "Starter",  price: "$287.88",  interval: "year" },
  "pro-yearly":       { label: "Pro",      price: "$5,997",   interval: "year" },
};

const PRICE_IDS = {
  starterMonthly: "price_1RLEM6JzG6xU26F96sBv1eYL",
  starterYearly:  "price_1RLENvJzG6xU26F9hnmQIXfZ",
  proYearly:      "price_1RLEOzJzG6xU26F9bRfiLqRB",
};

// ─── Field components ──────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">
      {children}
    </label>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.1em] text-ash">
        {title}
      </h2>
      {children}
    </div>
  );
}

function StatBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-deal/10">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted">{label}</div>
        <div className="text-sm font-semibold text-white truncate">{value}</div>
      </div>
    </div>
  );
}

// ─── Membership Tab ───────────────────────────────────────────────────────────

function MembershipTab() {
  const [sub, setSub] = useState<SubscriptionData | null>(null);
  const [profile, setProfile] = useState<{ first_name: string; last_name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      // Load subscription
      const { data: subData } = await supabase
        .from("subscriptions")
        .select("price_id, status, current_period_end, customer_email")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      // Map price_id to plan
      let plan: SubscriptionData["plan"] = null;
      if (subData?.price_id) {
        if (subData.price_id === PRICE_IDS.starterMonthly) plan = "starter-monthly";
        else if (subData.price_id === PRICE_IDS.starterYearly) plan = "starter-yearly";
        else if (subData.price_id === PRICE_IDS.proYearly) plan = "pro-yearly";
      }

      setSub({
        plan,
        status: subData?.status || "none",
        currentPeriodEnd: subData?.current_period_end || null,
        customerEmail: subData?.customer_email || user.email || null,
        customerName: null,
      });

      // Load profile
      const { data: pData } = await supabase
        .from("agent_profiles")
        .select("first_name, last_name")
        .eq("user_id", user.id)
        .single();

      setProfile({
        first_name: pData?.first_name || "",
        last_name: pData?.last_name || "",
        email: user.email || "",
      });

      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-deal" />
      </div>
    );
  }

  const planInfo = sub?.plan ? PLAN_INFO[sub.plan] : null;
  const isActive = sub?.status === "active" || sub?.status === "trialing";
  const periodEnd = sub?.currentPeriodEnd
    ? new Date(sub.currentPeriodEnd).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const onCancel = async () => {
    if (!confirm("Cancel your subscription? You'll lose access at the end of the billing period.")) return;
    // Open customer portal or send cancellation request
    window.location.href = "/api/billing/portal";
  };

  return (
    <div className="space-y-5">
      {/* Plan Card */}
      <SectionCard title="Plan">
        {planInfo ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-deal/20 bg-deal/[0.04] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-deal/15">
                  <Zap className="h-5 w-5 text-deal" />
                </div>
                <div>
                  <div className="font-bold text-white">{planInfo.label}</div>
                  <div className="text-xs text-ash">
                    {planInfo.price}/{planInfo.interval}
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-deal/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-deal">
                <span className="h-1.5 w-1.5 rounded-full bg-deal" />
                {isActive ? "Active" : sub?.status}
              </span>
            </div>

            <div className="space-y-2">
              {periodEnd && (
                <StatBox
                  icon={<Calendar className="h-4 w-4 text-deal" />}
                  label="Next billing date"
                  value={periodEnd}
                />
              )}
              <StatBox
                icon={<CreditCard className="h-4 w-4 text-deal" />}
                label="Payment method"
                value="Visa ending in ••••"
              />
            </div>

            <div className="flex gap-3">
              <Link
                href="/api/billing/portal"
                className="flex-1 rounded-xl border border-white/20 bg-white/[0.06] py-2.5 text-center text-xs font-semibold text-ash transition-colors hover:border-white/30 hover:text-white"
              >
                Update payment
              </Link>
              <button
                onClick={onCancel}
                className="flex-1 rounded-xl border border-red-500/30 bg-red-500/10 py-2.5 text-center text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/20"
              >
                Cancel plan
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🔒</div>
            <p className="text-sm text-ash mb-1 font-medium">No active plan</p>
            <p className="text-xs text-muted mb-5">
              Your agent won't work without a subscription
            </p>
            <Link
              href="/pricing"
              className="btn-loud inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-xs font-bold"
            >
              Choose a plan <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        )}
      </SectionCard>

      {/* Profile */}
      <SectionCard title="Profile">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-deal to-emerald-400 text-sm font-bold text-black">
              {profile?.first_name?.charAt(0) || "?"}
              {profile?.last_name?.charAt(0) || ""}
            </div>
            <div>
              <div className="font-semibold text-white">
                {profile?.first_name || "Set your name"}
              </div>
              <div className="text-xs text-ash">{profile?.email}</div>
            </div>
          </div>

          <Link
            href="/dashboard/auto?tab=settings"
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ash transition-colors hover:border-white/20 hover:text-white"
          >
            <span>Edit profile details</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionCard>

      {/* Billing History */}
      <SectionCard title="Billing History">
        <div className="text-center py-6">
          <p className="text-xs text-muted">
            No past invoices yet. Your first bill will appear here.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Agent Settings Tab (existing content, extracted) ─────────────────────────

const COACHING_STYLES = [
  { value: "direct",      label: "Direct & blunt" },
  { value: "motivating",  label: "Motivating & energetic" },
  { value: "analytical",  label: "Calm & analytical" },
  { value: "mentor",      label: "Mentor-style" },
];

const FOCUS_OPTIONS = [
  { value: "closing-rate",       label: "Closing rate" },
  { value: "follow-up",          label: "Follow-up discipline" },
  { value: "objection-handling", label: "Objection handling" },
  { value: "product-knowledge",  label: "Product knowledge" },
  { value: "prospecting",        label: "Prospecting" },
];

function PillGrid({ options, value, onChange }: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${
              active
                ? "border-deal/60 bg-deal/10 text-deal"
                : "border-white/15 bg-white/[0.04] text-ash hover:border-white/25 hover:text-bone"
            }`}
          >
            {active && <Check size={13} strokeWidth={3} className="shrink-0" />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

interface FormState {
  agentName: string;
  coachingStyle: string;
  agentFocus: string;
  customGoals: string;
  draw: string;
  commissionPct: string;
  miniFlat: string;
  volumeBonus: string;
  cxiBonus: string;
}

const EMPTY: FormState = {
  agentName: "", coachingStyle: "", agentFocus: "",
  customGoals: "", draw: "", commissionPct: "",
  miniFlat: "", volumeBonus: "", cxiBonus: "",
};

function AgentSettingsTab() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data } = await supabase
        .from("agent_profiles")
        .select("agent_name, coaching_style, agent_focus, custom_goals, draw, commission_pct, mini_flat, volume_bonus, cxi_bonus")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setForm({
          agentName:     data.agent_name     ?? "",
          coachingStyle: data.coaching_style ?? "",
          agentFocus:    data.agent_focus    ?? "",
          customGoals:   data.custom_goals   ?? "",
          draw:          data.draw           != null ? String(data.draw)           : "",
          commissionPct: data.commission_pct != null ? String(data.commission_pct) : "",
          miniFlat:      data.mini_flat      != null ? String(data.mini_flat)      : "",
          volumeBonus:   data.volume_bonus   != null ? String(data.volume_bonus)   : "",
          cxiBonus:      data.cxi_bonus      != null ? String(data.cxi_bonus)      : "",
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Not signed in."); setSaving(false); return; }

    const { error: upsertError } = await supabase
      .from("agent_profiles")
      .upsert({
        user_id:        user.id,
        agent_name:     form.agentName     || "Closer",
        coaching_style: form.coachingStyle || "direct",
        agent_focus:    form.agentFocus    || "closing-rate",
        custom_goals:   form.customGoals,
        draw:           parseFloat(form.draw)          || 0,
        commission_pct: parseFloat(form.commissionPct) || 0,
        mini_flat:      parseFloat(form.miniFlat)      || 0,
        volume_bonus:   parseFloat(form.volumeBonus)   || 0,
        cxi_bonus:      parseFloat(form.cxiBonus)      || 0,
        updated_at:     new Date().toISOString(),
      }, { onConflict: "user_id" });

    if (upsertError) {
      setError(upsertError.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-deal" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SectionCard title="Agent Personality">
        <div className="space-y-5">
          <div>
            <FieldLabel>Agent Name</FieldLabel>
            <input type="text" value={form.agentName}
              onChange={(e) => set("agentName", e.target.value)}
              placeholder="Closer" className={inputCls} />
            <p className="mt-1.5 text-xs text-muted">What your AI calls itself.</p>
          </div>
          <div>
            <FieldLabel>Coaching Style</FieldLabel>
            <PillGrid options={COACHING_STYLES} value={form.coachingStyle}
              onChange={(v) => set("coachingStyle", v)} />
          </div>
          <div>
            <FieldLabel>Primary Focus</FieldLabel>
            <PillGrid options={FOCUS_OPTIONS} value={form.agentFocus}
              onChange={(v) => set("agentFocus", v)} />
          </div>
          <div>
            <FieldLabel>My #1 Goal This Month</FieldLabel>
            <input type="text" value={form.customGoals}
              onChange={(e) => set("customGoals", e.target.value)}
              placeholder="e.g. Hit 15 units" className={inputCls} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Pay Plan">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Monthly Draw ($)</FieldLabel>
              <input type="number" min="0" value={form.draw}
                onChange={(e) => set("draw", e.target.value)}
                placeholder="0" className={inputCls} />
            </div>
            <div>
              <FieldLabel>Commission Split (%)</FieldLabel>
              <input type="number" min="0" max="100" value={form.commissionPct}
                onChange={(e) => set("commissionPct", e.target.value)}
                placeholder="25" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Mini / Flat Rate ($)</FieldLabel>
              <input type="number" min="0" value={form.miniFlat}
                onChange={(e) => set("miniFlat", e.target.value)}
                placeholder="200" className={inputCls} />
            </div>
            <div>
              <FieldLabel>Volume Bonus ($)</FieldLabel>
              <input type="number" min="0" value={form.volumeBonus}
                onChange={(e) => set("volumeBonus", e.target.value)}
                placeholder="500" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>CSI / CXI Bonus ($)</FieldLabel>
              <input type="number" min="0" value={form.cxiBonus}
                onChange={(e) => set("cxiBonus", e.target.value)}
                placeholder="300" className={inputCls} />
            </div>
          </div>
        </div>
      </SectionCard>

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <button type="submit" disabled={saving}
        className="btn-loud w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed">
        {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
        : saved ? <><Check className="h-4 w-4" strokeWidth={3} /> Saved</>
        : "Save Changes"}
      </button>
    </form>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [tab, setTab] = useState<"membership" | "settings">("membership");

  return (
    <>
      {/* Top bar */}
      <section className="border-b border-iron bg-slate">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/dashboard"
            className="flex items-center gap-2 text-sm text-ash transition-colors hover:text-bone">
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Dashboard
          </Link>
          <div className="flex items-center gap-2 text-deal">
            <Settings2 className="h-4 w-4" strokeWidth={2} />
            <span className="font-mono text-xs font-medium uppercase tracking-widest">
              Settings
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="mt-1 text-sm text-ash">
            Manage your account, plan, and agent preferences.
          </p>
        </div>

        {/* Tab bar */}
        <div className="mb-6 flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
          <button
            onClick={() => setTab("membership")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              tab === "membership"
                ? "bg-deal text-pit shadow-sm"
                : "text-ash hover:text-white"
            }`}
          >
            <span className="hidden sm:inline">Membership & Billing</span>
            <span className="sm:hidden">Plan</span>
          </button>
          <button
            onClick={() => setTab("settings")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              tab === "settings"
                ? "bg-deal text-pit shadow-sm"
                : "text-ash hover:text-white"
            }`}
          >
            Agent Settings
          </button>
        </div>

        {tab === "membership" ? <MembershipTab /> : <AgentSettingsTab />}
      </div>
    </>
  );
}
