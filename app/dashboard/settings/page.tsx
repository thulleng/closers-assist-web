"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Settings2, Check, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// ─── Option sets (mirrors onboarding) ────────────────────────────────────────

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

// ─── Field components ─────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">
      {children}
    </label>
  );
}

function PillGrid({
  options,
  value,
  onChange,
}: {
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

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.1em] text-ash">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Form state ───────────────────────────────────────────────────────────────

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
  agentName: "",
  coachingStyle: "",
  agentFocus: "",
  customGoals: "",
  draw: "",
  commissionPct: "",
  miniFlat: "",
  volumeBonus: "",
  cxiBonus: "",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // ── Load existing profile ──────────────────────────────────────────────────

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

  // ── Save ───────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("Not signed in.");
      setSaving(false);
      return;
    }

    const { error: upsertError } = await supabase
      .from("agent_profiles")
      .upsert(
        {
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
        },
        { onConflict: "user_id" }
      );

    if (upsertError) {
      setError(upsertError.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }

    setSaving(false);
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-deal" />
      </div>
    );
  }

  return (
    <>
      {/* Top bar */}
      <section className="border-b border-iron bg-slate">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-ash transition-colors hover:text-bone"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Dashboard
          </Link>
          <div className="flex items-center gap-2 text-deal">
            <Settings2 className="h-4 w-4" strokeWidth={2} />
            <span className="font-mono text-xs font-medium uppercase tracking-widest">
              Agent Settings
            </span>
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Agent Settings</h1>
          <p className="mt-1 text-sm text-ash">
            Changes take effect on your next conversation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Agent Personality */}
          <SectionCard title="Agent Personality">
            <div className="space-y-5">
              <div>
                <FieldLabel>Agent Name</FieldLabel>
                <input
                  type="text"
                  value={form.agentName}
                  onChange={(e) => set("agentName", e.target.value)}
                  placeholder="Closer"
                  className={inputCls}
                />
                <p className="mt-1.5 text-xs text-muted">What your AI calls itself in conversations.</p>
              </div>

              <div>
                <FieldLabel>Coaching Style</FieldLabel>
                <PillGrid
                  options={COACHING_STYLES}
                  value={form.coachingStyle}
                  onChange={(v) => set("coachingStyle", v)}
                />
              </div>

              <div>
                <FieldLabel>Primary Focus</FieldLabel>
                <PillGrid
                  options={FOCUS_OPTIONS}
                  value={form.agentFocus}
                  onChange={(v) => set("agentFocus", v)}
                />
              </div>

              <div>
                <FieldLabel>My #1 Goal This Month</FieldLabel>
                <input
                  type="text"
                  value={form.customGoals}
                  onChange={(e) => set("customGoals", e.target.value)}
                  placeholder="e.g. Hit 15 units, Break my personal record"
                  className={inputCls}
                />
              </div>
            </div>
          </SectionCard>

          {/* Pay Plan */}
          <SectionCard title="Pay Plan">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel>Monthly Draw ($)</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    value={form.draw}
                    onChange={(e) => set("draw", e.target.value)}
                    placeholder="0"
                    className={inputCls}
                  />
                </div>
                <div>
                  <FieldLabel>Commission Split (%)</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={form.commissionPct}
                    onChange={(e) => set("commissionPct", e.target.value)}
                    placeholder="25"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel>Mini / Flat Rate ($)</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    value={form.miniFlat}
                    onChange={(e) => set("miniFlat", e.target.value)}
                    placeholder="200"
                    className={inputCls}
                  />
                </div>
                <div>
                  <FieldLabel>Volume Bonus ($)</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    value={form.volumeBonus}
                    onChange={(e) => set("volumeBonus", e.target.value)}
                    placeholder="500"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel>CSI / CXI Bonus ($)</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    value={form.cxiBonus}
                    onChange={(e) => set("cxiBonus", e.target.value)}
                    placeholder="300"
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="btn-loud w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
            ) : saved ? (
              <><Check className="h-4 w-4" strokeWidth={3} /> Saved</>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
