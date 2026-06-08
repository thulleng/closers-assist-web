"use client";

import dynamic from "next/dynamic";
import { ComponentType, LazyExoticComponent } from "react";

// Heavy client components — loaded only when they enter viewport
// Falls back to a minimal placeholder to keep initial bundle small

export const LazyDemoChat = dynamic(
  () => import("@/components/DemoChat"),
  { ssr: false }
);

export const LazyLiveScoreboard = dynamic(
  () => import("@/components/LiveScoreboard"),
  { ssr: false }
);

export const LazyReviewsSection = dynamic(
  () => import("@/components/ReviewsSection"),
  { ssr: false }
);

export const LazyFAQ = dynamic(
  () => import("@/components/FAQ"),
  { ssr: false }
);

export const LazyRoiCalculator = dynamic(
  () => import("@/components/RoiCalculator"),
  { ssr: false }
);

export const LazyPhoneMockup = dynamic(
  () => import("@/components/PhoneMockup"),
  { ssr: false }
);

export const LazyTrustStrip = dynamic(
  () => import("@/components/TrustStrip"),
  { ssr: false }
);

export const LazyMobileCTABar = dynamic(
  () => import("@/components/MobileCTABar"),
  { ssr: false }
);

export const LazyNewsletterSection = dynamic(
  () => import("@/components/NewsletterSection"),
  { ssr: false }
);

export const LazyFloatingParticles = dynamic(
  () => import("@/components/FloatingParticles"),
  { ssr: false }
);

export const LazyDoraDemoChat = dynamic(
  () => import("@/components/DoraDemoChat"),
  { ssr: false }
);
