import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
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
    default: "Closers Assist — The AI agent every closer owns.",
    template: "%s · Closers Assist",
  },
  description:
    "Car. Home. Policy. Panel. Plan. One AI agent, every industry, zero restrictions. Built by a working rep — not a SaaS company. $29.99/rep/mo.",
  metadataBase: new URL("https://closersassist.com"),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Closers Assist — The AI agent every closer owns.",
    description:
      "One AI agent, every industry, zero restrictions. Built by a working rep.",
    url: "https://closersassist.com",
    siteName: "Closers Assist",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "Closers Assist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Closers Assist — The AI agent every closer owns.",
    description: "One AI agent, every industry, zero restrictions.",
    images: ["/icon-512.png"],
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
        <Nav />
        <main className="min-h-screen pb-16 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
