"use client";

import { useEffect, useState } from "react";

type ScoreboardEntry = {
  initials: string;
  name: string;
  action: string;
  highlight: string;
  amount: string;
  ago: string;
  color: "green" | "amber" | "purple" | "blue" | "pink";
};

const INITIAL_ENTRIES: ScoreboardEntry[] = [
  {
    initials: "KM",
    name: "Kevin M.",
    action: "closed a",
    highlight: "Camry",
    amount: "+$2,500",
    ago: "2m ago",
    color: "green",
  },
  {
    initials: "SM",
    name: "Sarah M.",
    action: "closed a listing",
    highlight: "$485K",
    amount: "+$12,125",
    ago: "8m ago",
    color: "amber",
  },
  {
    initials: "JT",
    name: "Jake T.",
    action: "signed",
    highlight: "11.4 kW solar",
    amount: "+$3,420",
    ago: "14m ago",
    color: "purple",
  },
  {
    initials: "AP",
    name: "Alex P.",
    action: "closed Enterprise ARR",
    highlight: "$240K",
    amount: "+$36,000",
    ago: "22m ago",
    color: "blue",
  },
];

const ROTATING_ENTRIES: ScoreboardEntry[] = [
  {
    initials: "MC",
    name: "Marcus C.",
    action: "wrote",
    highlight: "Auto + Home bundle",
    amount: "+$630",
    ago: "31m ago",
    color: "blue",
  },
  {
    initials: "JR",
    name: "Jamie R.",
    action: "closed a",
    highlight: "sectional $8,420",
    amount: "+$842",
    ago: "38m ago",
    color: "purple",
  },
  {
    initials: "PG",
    name: "Patrick G.",
    action: "flipped a",
    highlight: "half mini → full",
    amount: "+$2,500",
    ago: "44m ago",
    color: "green",
  },
  {
    initials: "VT",
    name: "Vu T.",
    action: "closed a",
    highlight: "Tacoma",
    amount: "+$1,850",
    ago: "52m ago",
    color: "green",
  },
];

const COLOR_CLASSES: Record<ScoreboardEntry["color"], string> = {
  green: "bg-deal/15 text-deal",
  amber: "bg-warn/15 text-warn",
  purple: "bg-purple-500/15 text-purple-400",
  blue: "bg-blue-500/15 text-blue-400",
  pink: "bg-pink-500/15 text-pink-400",
};

export default function LiveScoreboard() {
  const [entries, setEntries] = useState<ScoreboardEntry[]>(INITIAL_ENTRIES);
  const [rotationIdx, setRotationIdx] = useState(0);

  // Every 4s, shift in a new entry from the top and drop the bottom
  useEffect(() => {
    const interval = setInterval(() => {
      setEntries((prev) => {
        const next = ROTATING_ENTRIES[rotationIdx % ROTATING_ENTRIES.length];
        return [next, ...prev.slice(0, 3)];
      });
      setRotationIdx((i) => i + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [rotationIdx]);

  return (
    <div className="rounded-xl border border-iron bg-slate p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-deal" />
        </span>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[1.5px] text-deal">
          Live scoreboard
        </span>
        <span className="ml-auto font-mono text-[11px] text-muted">
          last 60 min
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {entries.map((entry, i) => (
          <div
            key={`${entry.initials}-${entry.ago}-${i}`}
            className="flex items-center gap-3 rounded-lg border border-iron bg-pit px-3 py-2.5 text-[13px] animate-fade-in"
          >
            <span
              className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-medium ${COLOR_CLASSES[entry.color]}`}
            >
              {entry.initials}
            </span>
            <span className="flex-1 text-bone">
              <span className="text-ash">{entry.name}</span> {entry.action}{" "}
              <span className="text-bone">{entry.highlight}</span>
            </span>
            <span className="font-mono font-medium text-deal">
              {entry.amount}
            </span>
            <span className="hidden text-[11px] text-muted sm:inline">
              {entry.ago}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
