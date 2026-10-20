"use client";

import { useEffect } from "react";

/**
 * Registers the Deal Clozr service worker in production only.
 * Dev registration causes stale-chunk confusion with Next.js HMR.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Silent — an install failure must never break the app.
      });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
