"use client";

import { useLang } from "@/lib/LangContext";
import type { ReactNode } from "react";

/**
 * HomepageClientWrapper provides `tl()` to all children.
 * Use this to wrap any server-rendered page that needs translations.
 */
export function T({ k }: { k: string }) {
  const { tl } = useLang();
  return <>{tl(k)}</>;
}

/**
 * Helper hook for client component sections of pages
 */
export { useLang };
