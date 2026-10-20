"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Download, Share, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "dc_install_dismissed";
const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;

/**
 * Home-screen install nudge.
 * - Chrome/Android: uses beforeinstallprompt
 * - iOS Safari: shows the Share -> Add to Home Screen instruction (no API exists)
 * - Never shown when already installed, or within 14 days of a dismissal.
 */
export default function InstallPrompt() {
  const pathname = usePathname();
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    if (standalone) return;

    const dismissedAt = Number(window.localStorage.getItem(DISMISS_KEY) || 0);
    if (dismissedAt && Date.now() - dismissedAt < FOURTEEN_DAYS) return;

    const ua = window.navigator.userAgent;
    const iosDevice = /iphone|ipad|ipod/i.test(ua);
    const iosSafari = iosDevice && /safari/i.test(ua) && !/crios|fxios/i.test(ua);

    if (iosSafari) {
      setIsIos(true);
      setVisible(true);
      return;
    }

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  const install = async () => {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice.outcome === "accepted") setVisible(false);
    else dismiss();
  };

  // Only nudge on app surfaces, never on marketing pages.
  const onAppSurface = pathname?.startsWith("/dashboard");
  if (!visible || !onAppSurface) return null;

  return (
    <div className="fixed inset-x-3 bottom-[72px] z-[60] rounded-2xl border border-white/10 bg-[#0b0b0d] p-4 shadow-2xl md:bottom-4 md:left-auto md:right-4 md:w-80">
      <button
        onClick={dismiss}
        aria-label="Dismiss install prompt"
        className="absolute right-3 top-3 rounded-full p-1 text-white/40 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>

      <p className="pr-6 text-sm font-medium text-bone">Keep Deal Clozr one tap away</p>
      <p className="mt-1 text-xs leading-relaxed text-white/50">
        {isIos
          ? "Tap Share, then Add to Home Screen. It opens full screen, like an app."
          : "Add it to your home screen. Opens full screen, no address bar."}
      </p>

      {isIos ? (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/70">
          <Share className="h-4 w-4 text-emerald-400" />
          <span>Share → Add to Home Screen</span>
        </div>
      ) : (
        <button
          onClick={install}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-black"
        >
          <Download className="h-4 w-4" />
          Add to home screen
        </button>
      )}
    </div>
  );
}
