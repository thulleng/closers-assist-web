"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { t, type Lang } from "@/lib/translations";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  tl: (key: string) => string;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "es" || saved === "fr") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const tl = (key: string): string => {
    const entry = t[key];
    if (!entry) return key;
    const val = entry[lang];
    return typeof val === "string" ? val : key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, tl }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
