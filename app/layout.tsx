import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import CursorGlow from "@/components/CursorGlow";
import ScrollRevealObserver from "@/components/ScrollRevealObserver";
import SandboxChat from "@/components/SandboxChat";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Deal Clozr — The AI agent every closer owns.",
    template: "%s · Deal Clozr",
  },
  description:
    "Car. Home. Policy. Panel. Plan. One AI agent, every industry, zero restrictions. Built by a working rep — not a SaaS company. $29.99/rep/mo.",
  metadataBase: new URL("https://dealclozr.com"),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Deal Clozr — The AI agent every closer owns.",
    description:
      "One AI agent, every industry, zero restrictions. Built by a working rep.",
    url: "https://dealclozr.com",
    siteName: "Deal Clozr",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Deal Clozr — The AI agent every closer owns.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deal Clozr — The AI agent every closer owns.",
    description: "One AI agent, every industry, zero restrictions.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#10B981",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body className="bg-pit text-bone font-sans antialiased">
        <CursorGlow />
        <ScrollRevealObserver />
        <Nav />
        <main className="min-h-screen pb-[60px] md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
        <SandboxChat />
      </body>
    </html>
  );
}
