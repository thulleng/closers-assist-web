# Closers Assist — Marketing Site

The AI agent every closer owns. Car. Home. Policy. Panel. Plan.

Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Deploys to Vercel in 30 seconds.

---

## Quick start (local)

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

That's it. You'll see the homepage with the live ROI calculator.

---

## Project structure

```
closers-assist-web/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, nav, footer)
│   ├── page.tsx                # Homepage (9 sections)
│   ├── globals.css             # Tailwind + dark mode base
│   ├── pricing/page.tsx        # Pricing (billing toggle, tiers, FAQ)
│   ├── founder/page.tsx        # Founder story (tightened v2)
│   ├── how-it-works/page.tsx   # Placeholder — full page pending
│   ├── industries/
│   │   ├── page.tsx            # 7-industry hub
│   │   └── auto/page.tsx       # Auto vertical (fully built)
│   ├── marketplace/page.tsx    # Placeholder
│   └── blog/page.tsx           # Placeholder
├── components/
│   ├── Nav.tsx                 # Sticky nav
│   ├── Footer.tsx              # Footer
│   ├── RoiCalculator.tsx       # Live ROI calc (client component)
│   └── ComingSoon.tsx          # Reusable placeholder
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── tailwind.config.ts          # Brand tokens (Deal Green, Pit Black, etc.)
├── tsconfig.json
├── next.config.js
├── postcss.config.js
└── package.json
```

---

## Brand tokens (Tailwind)

All defined in `tailwind.config.ts`:

| Token | Hex | Use |
|---|---|---|
| `pit` | `#0A0A0B` | Page background |
| `slate` | `#141417` | Cards, surfaces |
| `iron` | `#2A2A2F` | Borders, dividers |
| `bone` | `#F5F5F4` | Primary text |
| `ash` | `#A1A1AA` | Secondary text |
| `muted` | `#52525B` | Tertiary text, micro-copy |
| `deal` | `#10B981` | Accent — CTAs, key numbers |
| `deal-hover` | `#059669` | Button hover |
| `warn` | `#F59E0B` | Warnings |
| `alert` | `#E11D2E` | Errors, alerts |

Usage: `className="bg-pit text-bone border-iron"`, etc.

---

## Deploy to Vercel

The fastest path:

1. Push this repo to GitHub (new repo — don't reuse the old drivemindai-website repo).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — just click Deploy.
4. Add custom domain `closersassist.com` in Vercel project settings.
5. Update GoDaddy DNS: add the A record + CNAME Vercel gives you.

Total time: ~5 minutes. Free tier is more than enough for the marketing site.

**Note:** The GoDaddy VPS you have in cart is for the *app* (dashboards, agent runtime, Stripe). The marketing site lives on Vercel — don't put them on the same box. Keep marketing on the fastest, cheapest stack.

---

## What's built vs. what's pending

### ✅ Fully built
- Homepage (9 sections, live ROI calculator)
- Pricing (3 tiers, monthly/annual toggle, guarantee, FAQ, final CTA)
- Founder story (v2, 272 words)
- Industries hub (7 cards)
- Auto industry page (full copy)
- All shared components (Nav, Footer, ROI calc)
- Brand system + Tailwind tokens
- SEO metadata (titles, descriptions, OpenGraph, Twitter cards)
- `robots.txt`, `sitemap.xml`

### 🟡 Scaffolded (placeholder pages)
- `/how-it-works` — full copy exists in copy deck, port when ready
- `/marketplace` — copy exists, port when launch is closer
- `/blog` — pending MDX CMS decision
- `/industries/real-estate`, `/insurance`, `/solar`, `/saas`, `/medical`, `/retail` — hero copy exists, full pages pending

### ⏳ Not started (next sessions)
- Favicon + OG image
- Email capture form (trial signup → pick: Resend, Loops, or ConvertKit)
- Real imagery / Dennis video slot on homepage
- Analytics (Vercel Analytics free, or Plausible)
- MDX blog integration

---

## Environment variables

None required for the marketing site. The app layer (coming later) will need:
- `ANTHROPIC_API_KEY`
- `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`
- `JWT_SECRET`

---

## Commands

```bash
npm run dev      # Dev server on :3000
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # ESLint
```

---

Built by Thul. Shaped with Lana. New Port Richey, FL.
