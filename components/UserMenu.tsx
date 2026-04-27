"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/lib/hooks/useUser";

function getInitials(fullName: string | undefined, email: string): string {
  if (fullName) {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    if (parts[0].length >= 2) return parts[0].slice(0, 2).toUpperCase();
    return parts[0][0].toUpperCase();
  }
  const prefix = email.split("@")[0];
  return prefix.slice(0, 2).toUpperCase();
}

export default function UserMenu() {
  const { user, loading } = useUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (loading) return null;
  if (!user) return null;

  const initials = getInitials(
    user.user_metadata?.full_name as string | undefined,
    user.email ?? ""
  );

  async function handleSignOut() {
    setOpen(false);
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-xs font-bold text-white ring-offset-black transition-all hover:ring-2 hover:ring-emerald-400/50"
        aria-label="User menu"
      >
        {initials}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">
          <div className="px-3 py-2 text-xs text-zinc-500 truncate">
            {user.email}
          </div>
          <div className="border-t border-zinc-800" />
          <Link
            href="/dashboard/auto"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/settings"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            Settings
          </Link>
          <div className="border-t border-zinc-700" />
          <button
            onClick={handleSignOut}
            className="block w-full px-4 py-2.5 text-left text-sm text-zinc-200 hover:bg-zinc-800 transition-colors rounded-b-xl"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
