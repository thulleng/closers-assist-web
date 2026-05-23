"use client";

import { useState } from "react";
import { Plus, X, Loader2, CheckCircle2, Car, DollarSign, Hash, Share2, Image as ImageIcon } from "lucide-react";

type DealTypeOption = {
  value: string;
  label: string;
  description: string;
  color: string;
};

const DEAL_TYPES: DealTypeOption[] = [
  { value: "half_mini", label: "Half Mini", description: "Back-end only, no gross", color: "bg-blue-500/15 text-blue-400" },
  { value: "full_mini", label: "Full Mini", description: "Minimum commission deal", color: "bg-purple-500/15 text-purple-400" },
  { value: "full_deal", label: "Full Deal", description: "Front + back gross", color: "bg-deal/15 text-deal" },
  { value: "street_purchase", label: "Street Purchase", description: "No units, flat commission", color: "bg-ash/10 text-ash" },
];

interface QuickDealLoggerProps {
  /** Trigger re-fetch after logging a deal */
  onDealLogged?: () => void;
}

export default function QuickDealLogger({ onDealLogged }: QuickDealLoggerProps) {
  const [open, setOpen] = useState(false);
  const [dealType, setDealType] = useState("full_deal");
  const [customerName, setCustomerName] = useState("");
  const [frontGross, setFrontGross] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDealData, setLastDealData] = useState<{ customer: string; type: string; commission: string; units: string } | null>(null);

  const DEAL_TYPE_LABELS: Record<string, string> = {
    half_mini: "Half Mini",
    full_mini: "Full Mini",
    full_deal: "Full Deal",
    street_purchase: "Street Purchase",
  };

  const DEAL_TYPE_UNITS: Record<string, string> = {
    half_mini: "0.5",
    full_mini: "1",
    full_deal: "1",
    street_purchase: "0",
  };

  const reset = () => {
    setDealType("full_deal");
    setCustomerName("");
    setFrontGross("");
    setNotes("");
    setError(null);
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setError("Customer name is required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload: Record<string, unknown> = {
        customer_name: customerName.trim(),
        deal_type: dealType,
        notes: notes.trim() || undefined,
      };

      if (dealType === "full_deal") {
        const gross = parseFloat(frontGross);
        if (isNaN(gross) || gross <= 0) {
          setError("Front gross is required for Full Deal");
          setSaving(false);
          return;
        }
        payload.front_gross = gross;
      }

      const res = await fetch("/api/deals/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to log deal");
      }

      setSaved(true);

      // Save deal data for share card
      const estimatedComm = dealType === "full_deal"
        ? Math.round(parseFloat(frontGross) * 0.25).toString()
        : dealType === "full_mini" ? "200"
        : dealType === "half_mini" ? "100"
        : "0";

      setLastDealData({
        customer: customerName.trim(),
        type: DEAL_TYPE_LABELS[dealType] || dealType,
        commission: estimatedComm,
        units: DEAL_TYPE_UNITS[dealType] || "1",
      });

      setTimeout(() => {
        reset();
        setOpen(false);
        onDealLogged?.();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-deal/30 bg-deal/[0.04] hover:bg-deal/[0.08] hover:border-deal/50 px-5 py-4 text-sm font-bold text-deal-light transition-all active:scale-[0.98]"
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} />
          Log a Deal
        </button>
      )}

      {/* Form card */}
      {open && (
        <div className="rounded-2xl border border-deal/30 bg-gradient-to-b from-deal/[0.06] to-black/40 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-deal" strokeWidth={2.2} />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-deal">Log a Deal</span>
            </div>
            <button
              onClick={() => { reset(); setOpen(false); }}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-ash hover:text-white transition-colors"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Deal Type */}
            <div>
              <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Deal Type</label>
              <div className="grid grid-cols-2 gap-2">
                {DEAL_TYPES.map((dt) => (
                  <button
                    key={dt.value}
                    type="button"
                    onClick={() => setDealType(dt.value)}
                    className={`text-left px-3 py-2.5 rounded-xl border text-sm transition-all ${
                      dealType === dt.value
                        ? "border-deal/60 bg-deal/10 text-deal font-semibold"
                        : "border-white/10 bg-white/[0.03] text-ash hover:border-white/20 hover:text-bone"
                    }`}
                  >
                    <div className="text-[13px] font-bold">{dt.label}</div>
                    <div className="text-[10px] text-muted mt-0.5">{dt.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Name */}
            <div>
              <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Kevin Michael"
                className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all"
                autoFocus
              />
            </div>

            {/* Front Gross (only for full_deal) */}
            {dealType === "full_deal" && (
              <div>
                <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Front Gross ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" strokeWidth={2} />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={frontGross}
                    onChange={(e) => setFrontGross(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-white/20 bg-white/[0.06] pl-9 pr-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Notes (optional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Customer traded in a 2020 Camry"
                className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={saving || saved}
              className="btn-loud w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              {saving ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
              ) : saved ? (
                <><CheckCircle2 className="h-4 w-4" /> Logged!</>
              ) : (
                <><Plus className="h-4 w-4" /> Log Deal</>
              )}
            </button>

            {/* Share Card — appears after successfully logging */}
            {saved && lastDealData && (
              <div className="rounded-xl border border-deal/20 bg-deal/[0.04] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Share2 className="h-4 w-4 text-deal" strokeWidth={2.2} />
                  <span className="text-[11px] font-bold uppercase tracking-[1px] text-deal">Share this close</span>
                </div>
                <p className="text-xs text-ash mb-3">
                  Post this to Instagram, Facebook, or Twitter. Your customers see you winning.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const params = new URLSearchParams({
                        customer: lastDealData.customer,
                        commission: lastDealData.commission,
                        type: lastDealData.type,
                        units: lastDealData.units,
                        rep: "Thul Leng",
                      });
                      const url = `/api/share-card?${params.toString()}`;
                      window.open(url, "_blank");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-deal/20 hover:bg-deal/30 border border-deal/30 px-3 py-2.5 text-xs font-bold text-deal-light transition-all active:scale-[0.98]"
                  >
                    <ImageIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Share Card
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const text = `Just closed ${lastDealData.customer} — ${lastDealData.type} 🏆\n\nGot my AI closer at dealclozr.com`;
                      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                      window.open(url, "_blank");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2.5 text-xs font-bold text-bone transition-all active:scale-[0.98]"
                  >
                    <Share2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Post
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}
