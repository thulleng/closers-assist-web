"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowLeft, Camera, CheckCircle2, Loader2, Pencil, X } from "lucide-react";
import Link from "next/link";

type DraftFields = {
  customer_name: string | null;
  vehicle: string | null;
  stock_number: string | null;
  deal_type: "half_mini" | "full_mini" | "full_deal" | "street_purchase" | null;
  front_gross: number | null;
  back_gross: number | null;
  pack: number | null;
  sold_date: string | null;
  salesperson: string | null;
};

type ConfidenceMap = Partial<Record<keyof DraftFields, number>>;

type PayPreview = {
  gross_pay: number;
  units: number;
  month_units: number;
  month_gross_pay: number;
  units_to_next: number | null;
  next_bonus: number | null;
  headline: string;
} | null;

type Draft = {
  draft_id: string;
  fields: DraftFields;
  confidence: ConfidenceMap;
  needs: { field: keyof DraftFields | "doc_kind"; reason: string; message: string }[];
  question: string | null;
  auto_confirmable: boolean;
  pay_preview: PayPreview;
};

type MonthState = {
  month: string;
  units: number;
  gross_pay: number;
  headline: string;
  deal_count: number;
};

const DEAL_TYPE_LABEL: Record<string, string> = {
  half_mini: "half mini",
  full_mini: "full mini",
  full_deal: "full deal",
  street_purchase: "street purchase",
};

function money(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

function unitsStr(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export default function LogPage() {
  const [phase, setPhase] = useState<"idle" | "uploading" | "draft" | "editing" | "done">("idle");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [edits, setEdits] = useState<DraftFields | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [month, setMonth] = useState<MonthState | null>(null);
  const [dragging, setDragging] = useState(false);
  const [duplicate, setDuplicate] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const send = useCallback(async (file: File) => {
    setError(null);
    setDuplicate(null);
    setPhase("uploading");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("source", "pwa");
    try {
      const res = await fetch("/api/ingest/image", { method: "POST", body: fd });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Couldn't read that photo.");
      setDrafts(body.drafts ?? []);
      setActiveIndex(0);
      setPhase("draft");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setPhase("idle");
    }
  }, []);

  const onFile = useCallback(
    (file: File | null | undefined) => {
      if (file) send(file);
    },
    [send]
  );

  const active = drafts[activeIndex] ?? null;

  const confirm = useCallback(async (draft: Draft, patches?: Record<string, unknown>, force = false) => {
    setConfirming(true);
    setError(null);
    try {
      const res = await fetch("/api/ingest/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft_id: draft.draft_id, patches, force }),
      });
      const body = await res.json();
      if (res.status === 409 && body.duplicate) {
        // Not an error — a question. The rep decides.
        setDuplicate(body.error || "Already logged — add anyway?");
        return;
      }
      if (!res.ok) throw new Error(body.error || "Couldn't confirm.");
      setDuplicate(null);
      setMonth(body.month_state);
      if (drafts.length > activeIndex + 1) {
        setActiveIndex(activeIndex + 1);
        setEdits(null);
      } else {
        setPhase("done");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setConfirming(false);
    }
  }, [drafts.length, activeIndex]);

  const discard = useCallback(async (draftId: string) => {
    try {
      await fetch("/api/ingest/discard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft_id: draftId }),
      });
    } catch {}
    if (drafts.length > activeIndex + 1) {
      setActiveIndex(activeIndex + 1);
      setEdits(null);
    } else {
      setPhase("idle");
      setDrafts([]);
    }
  }, [drafts.length, activeIndex]);

  const startEdit = useCallback(() => {
    if (active) setEdits({ ...active.fields });
    setPhase("editing");
  }, [active]);

  const commitEdit = useCallback(async () => {
    if (!active || !edits) return;
    const patches: Record<string, unknown> = {};
    for (const k of Object.keys(edits) as (keyof DraftFields)[]) {
      if (edits[k] !== active.fields[k]) patches[k] = edits[k];
    }
    await confirm(active, Object.keys(patches).length ? patches : undefined, false);
  }, [active, edits, confirm]);

  // ── idle: big photo button + paste + drag-drop ─────────────────────────────
  if (phase === "idle") {
    return (
      <div className="mx-auto max-w-[520px] px-4 pb-20 pt-6">
        <Link href="/dashboard" className="mb-6 flex items-center gap-2 text-sm text-ash hover:text-bone">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <div className="text-center">
          <div className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[1.5px] text-neon-green">
            Log a deal
          </div>
          <h1 className="text-2xl font-bold text-bone">Photo the desk sheet.</h1>
          <p className="mt-2 text-sm text-muted">
            Snap the paper, get a number back. No typing.
          </p>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); onFile(e.dataTransfer.files?.[0]); }}
          className={`mt-8 rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
            dragging ? "border-deal/60 bg-deal/10" : "border-deal/30 bg-deal/[0.04]"
          }`}
        >
          <Camera className="mx-auto h-10 w-10 text-deal" strokeWidth={1.5} />
          <p className="mt-3 text-sm font-bold text-deal-light">Tap to photograph the desk sheet</p>
          <p className="mt-1 text-xs text-muted">or paste / drag a screenshot here</p>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="btn-loud mt-5 w-full rounded-xl py-3 text-sm font-bold"
          >
            Open camera
          </button>
        </div>

        <button
          onClick={() => fileRef.current?.click()}
          className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-bone hover:border-white/20"
        >
          Choose photo
        </button>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}
        <p className="mt-6 text-center text-xs text-muted">Private to you. Nothing you photograph is shared.</p>
      </div>
    );
  }

  // ── uploading ─────────────────────────────────────────────────────────────
  if (phase === "uploading") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <Loader2 className="h-8 w-8 animate-spin text-deal" />
        <p className="mt-4 text-sm text-muted">Reading the paperwork…</p>
      </div>
    );
  }

  // ── done ──────────────────────────────────────────────────────────────────
  if (phase === "done") {
    return (
      <div className="mx-auto max-w-[520px] px-4 pb-20 pt-10">
        <div className="glass-panel p-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-neon-green" />
          <h2 className="mt-3 text-xl font-bold text-bone">Logged.</h2>
          {month && (
            <p className="mt-2 font-mono text-sm text-ash">
              {month.headline}
            </p>
          )}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => { setPhase("idle"); setDrafts([]); setMonth(null); }}
              className="btn-loud flex-1 rounded-xl py-3 text-sm font-bold"
            >
              Log another
            </button>
            <Link
              href="/dashboard"
              className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-bone hover:border-white/20"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── editing: only low-confidence / null fields ────────────────────────────
  if (phase === "editing" && active && edits) {
    const editable = active.needs
      .filter((n) => n.field !== "doc_kind")
      .map((n) => n.field as keyof DraftFields);
    return (
      <div className="mx-auto max-w-[520px] px-4 pb-20 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <button onClick={() => setPhase("draft")} className="flex items-center gap-1 text-sm text-ash hover:text-bone">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <span className="text-xs text-muted">Edit the unclear bits only</span>
        </div>

        <div className="glass-panel space-y-4 p-5">
          {(["deal_type", "customer_name", "vehicle", "front_gross", "sold_date"] as (keyof DraftFields)[]).map((f) => {
            const needsEdit = editable.includes(f);
            const label = f.replace(/_/g, " ");
            if (f === "deal_type") {
              return (
                <div key={f} className={needsEdit ? "" : "opacity-60"}>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Deal type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["half_mini", "full_mini", "full_deal", "street_purchase"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setEdits({ ...edits, deal_type: t })}
                        className={`rounded-xl border px-3 py-2.5 text-sm ${
                          edits.deal_type === t
                            ? "border-deal/60 bg-deal/10 text-deal font-semibold"
                            : "border-white/10 bg-white/[0.03] text-ash"
                        }`}
                      >
                        {DEAL_TYPE_LABEL[t]}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }
            if (f === "front_gross") {
              return (
                <div key={f} className={needsEdit ? "" : "opacity-60"}>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Front gross ($)</label>
                  <input
                    type="number"
                    value={edits.front_gross ?? ""}
                    onChange={(e) => setEdits({ ...edits, front_gross: e.target.value ? Number(e.target.value) : null })}
                    placeholder="0"
                    className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white text-sm"
                  />
                </div>
              );
            }
            return (
              <div key={f} className={needsEdit ? "" : "opacity-60"}>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.1em] text-ash">{label}</label>
                <input
                  type={f === "sold_date" ? "date" : "text"}
                  value={(edits[f] as string) ?? ""}
                  onChange={(e) => setEdits({ ...edits, [f]: e.target.value || null })}
                  className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white text-sm"
                />
              </div>
            );
          })}

          {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}

          <button
            onClick={commitEdit}
            disabled={confirming}
            className="btn-loud w-full rounded-xl py-3 text-sm font-bold disabled:opacity-50"
          >
            {confirming ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Save & confirm"}
          </button>
        </div>
      </div>
    );
  }

  // ── draft: the one-line confirm ───────────────────────────────────────────
  if (phase === "draft" && active) {
    const f = active.fields;
    const p = active.pay_preview;
    return (
      <div className="mx-auto max-w-[520px] px-4 pb-20 pt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-neon-green">
            {drafts.length > 1 ? `Deal ${activeIndex + 1} of ${drafts.length}` : "Confirm this deal"}
          </span>
          <button onClick={() => discard(active.draft_id)} className="text-sm text-ash hover:text-red-400">
            Not a deal
          </button>
        </div>

        <div className="glass-panel p-5">
          <div className="text-lg font-bold text-bone">
            {f.customer_name ?? "Unknown customer"}
            {f.vehicle ? ` · ${f.vehicle}` : ""}
          </div>
          <div className="mt-1 text-sm text-ash">
            {f.deal_type ? DEAL_TYPE_LABEL[f.deal_type] : "—"}
            {f.front_gross != null ? ` · ${money(f.front_gross)} front` : ""}
            {f.sold_date ? ` · ${f.sold_date}` : ""}
          </div>

          {active.question && (
            <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-300">
              {active.question}
            </div>
          )}

          {p && (
            <div className="mt-4 rounded-xl bg-deal/[0.06] p-4 font-mono text-sm text-deal-light">
              {p.headline}
            </div>
          )}

          {duplicate && (
            <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-300">
              <div>{duplicate}</div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => active && confirm(active, undefined, true)}
                  disabled={confirming}
                  className="flex-1 rounded-lg bg-amber-400/20 px-3 py-2 text-xs font-bold text-amber-200 disabled:opacity-50"
                >
                  Add anyway
                </button>
                <button
                  onClick={() => { setDuplicate(null); discard(active.draft_id); }}
                  className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-ash"
                >
                  Skip
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => confirm(active)}
              disabled={confirming}
              className="btn-loud flex-1 rounded-xl py-3 text-sm font-bold disabled:opacity-50"
            >
              {confirming ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Confirm"}
            </button>
            <button
              onClick={startEdit}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-bone hover:border-white/20"
            >
              <Pencil className="h-4 w-4" /> Edit
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted">Private to you.</p>
      </div>
    );
  }

  return null;
}
