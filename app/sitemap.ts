import { MetadataRoute } from "next";

const BASE = "https://dealclozr.com";

const staticRoutes = [
  "/",
  "/how-it-works",
  "/industries",
  "/pricing",
  "/compare",
  "/founder",
  "/blog",
  "/enterprise",
  "/demo",
  "/referral",
  "/marketplace",
  "/contact",
  "/invest",
  "/telegram",
  "/login",
  "/sign-up",
  "/onboarding",
  "/terms",
  "/privacy",
  "/success",
];

const industries = [
  "auto",
  "real-estate",
  "insurance",
  "solar",
  "saas",
  "medical",
  "retail",
  "pest-control",
  "hvac",
  "roofing",
  "home-security",
  "mortgage",
  "financial-advisors",
  "recruiting",
  "telecom",
  "rental",
  "project-manager",
  "other-sales",
];

const blogPosts = [
  "how-i-built-this",
  "mini-that-pays",
  "service-lane-plays",
  "sun-toyota-pilot",
  "three-buyers-on-the-lot",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes.map((path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" || path === "/blog" ? "weekly" as const : "monthly" as const,
      priority: path === "/" ? 1.0 : path.startsWith("/industries") ? 0.7 : 0.8,
    })),
    ...industries.map((industry) => ({
      url: `${BASE}/industries/${industry}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: `${BASE}/blog/${post}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return routes;
}
