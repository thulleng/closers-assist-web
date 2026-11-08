import { permanentRedirect } from "next/navigation";

// Team and dealership plans moved to KlaroDev on 2026-11-08.
// DealClozr sells one thing now: a single rep's agent.
export default function EnterprisePage() {
  permanentRedirect("https://klarodev.com");
}
