"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown, User, X } from "lucide-react";

type Deal = {
  id: string;
  customer_name: string;
  deal_type: string;
  vehicle?: string;
  front_gross?: number;
  commission?: number;
  sold_date: string;
  status?: string;
};

export default function DealSelector({
  onSelect,
  selectedDealId,
  onClear,
}: {
  onSelect: (deal: Deal) => void;
  selectedDealId?: string | null;
  onClear: () => void;
}) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/me/deals", {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.deals) setDeals(d.deals.filter((d: Deal) => d.status !== "closed" && d.status !== "lost"));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = deals.find((d) => d.id === selectedDealId);

  const typeLabel = (t: string) =>
    t === "full_deal" ? "Full" : t === "full_mini" ? "Mini" : t === "half_mini" ? "Half" : t === "street_purchase" ? "Street" : t;

  if (deals.length === 0 && !selected) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-lg border border-iron bg-slate px-3 py-1.5 text-xs text-bone transition-colors hover:border-deal/40"
        >
          {selected ? (
            <>
              <User className="h-3 w-3 text-deal" strokeWidth={2.5} />
              <span>{selected.customer_name}</span>
              {selected.vehicle && (
                <span className="text-muted">· {selected.vehicle}</span>
              )}
              <span className="rounded bg-deal/15 px-1.5 py-0.5 text-[10px] font-semibold text-deal">
                {typeLabel(selected.deal_type)}
              </span>
            </>
          ) : (
            <>
              <User className="h-3 w-3 text-ash" strokeWidth={2} />
              <span className="text-ash">Pick a deal...</span>
            </>
          )}
          <ChevronDown className={`h-3 w-3 text-muted transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={2} />
        </button>
        {selected && (
          <button
            onClick={onClear}
            className="flex h-6 w-6 items-center justify-center rounded-md border border-iron bg-slate text-muted transition-colors hover:text-bone hover:border-white/25"
            aria-label="Clear deal selection"
          >
            <X className="h-3 w-3" strokeWidth={2.5} />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 w-72 rounded-xl border border-iron bg-pit shadow-2xl">
          <div className="max-h-60 overflow-y-auto p-1">
            {deals.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  onSelect(d);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                  d.id === selectedDealId
                    ? "bg-deal/15 text-deal"
                    : "text-bone hover:bg-slate"
                }`}
              >
                <User className="h-3 w-3 flex-shrink-0" strokeWidth={2} />
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium">{d.customer_name}</div>
                  {d.vehicle && (
                    <div className="truncate text-[11px] text-ash">{d.vehicle}</div>
                  )}
                </div>
                <span className="flex-shrink-0 rounded bg-deal/15 px-1.5 py-0.5 text-[10px] font-semibold text-deal">
                  {typeLabel(d.deal_type)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
