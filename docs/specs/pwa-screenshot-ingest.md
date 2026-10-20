# SPEC — PWA Shell + Screenshot Ingest + Commission Audit

**Owner:** Thul
**Builder:** Naomi
**Repo:** `~/closers-assist-web` (deploys dealclozr.com)
**Status:** **Phase 0 built & verified locally** on branch `feat/pwa-shell` (2026-10-20). Phases 1–2 ready to build. No native app. No App Store.
**Created:** 2026-10-20

---

## 1. Why this exists

Reps did not adopt the Telegram agent. Diagnosis: empty state + data entry + value lands at payday.

This spec attacks all three, in this order:

1. **PWA shell** — removes "it's not an app" friction in ~1 day. No store, no review.
2. **Screenshot ingest** — kills data entry. Rep photographs the desk sheet, gets a number back.
3. **Commission audit** — creates the first-run "holy shit" moment: *"payroll shorted you $412 in August."*

**Success metric:** 10 auto reps text/upload a deal 14 days in a row → then, and only then, we consider native.

**Explicit non-goals:** native iOS/Android, App Store listing, offline-first ledger syncing, manager visibility into rep data.

---

## 2. What already exists (do not rebuild)

| Asset | Path | State |
|---|---|---|
| PWA manifest | `public/manifest.json` | Exists, **broken icons** (points at `favicon.svg` only) |
| PNG icons | `public/icon-192.png`, `public/icon-512.png` | Exist, not referenced by manifest |
| Apple meta | `app/layout.tsx` L38–L50, viewport L76 | Partial |
| Service worker | — | **Missing** |
| Telegram photo → vision | `app/api/telegram/webhook/route.ts` L72–79, L491–525 | Working (Anthropic vision, base64) |
| VIN decode | `lib/vin-decode.ts` | Working (NHTSA) |
| SMS via Twilio | `app/api/sms/webhook/route.ts` | Working, **text only — no MMS** |
| WhatsApp webhook | `app/api/whatsapp/webhook/route.ts` | Working, text only |
| Deal write API | `app/api/deals/log/route.ts` | Working — see §7 |
| Deal list API | `app/api/deals/list/route.ts` | Working |
| Shared message engine | `lib/handleUserMessage.ts` | Working — tables: `agent_profiles`, `agent_memory`, `deals` |
| Crons | `app/api/cron/{morning-brief,unit-watchdog,weekly-learning}` | Working |

Deal row shape (`deals`):
`user_id, customer_name, deal_type (half_mini|full_mini|full_deal|street_purchase), vehicle, front_gross, commission, units, sold_date, notes`

---

## 3. Phase 0 — PWA shell (1 day)

**Branch:** `feat/pwa-shell`. Preview deploy only. Do not merge to production without Thul's explicit go.

### 3.1 Manifest — replace `public/manifest.json`

```json
{
  "name": "Deal Clozr",
  "short_name": "Deal Clozr",
  "id": "/dashboard",
  "start_url": "/dashboard",
  "scope": "/",
  "display": "standalone",
  "display_override": ["standalone", "minimal-ui"],
  "orientation": "portrait",
  "background_color": "#050506",
  "theme_color": "#050506",
  "description": "Never forget a commission again.",
  "categories": ["business", "productivity", "finance"],
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "shortcuts": [
    { "name": "Log a deal", "url": "/dashboard?action=log" },
    { "name": "My month", "url": "/dashboard" },
    { "name": "Text my agent", "url": "/sms" }
  ]
}
```

Generate a true maskable 512 if the existing `icon-512.png` has content inside the safe zone (80% radius). If not, pad it — maskable icons get cropped to a circle on Android.

### 3.2 iOS meta — `app/layout.tsx`

iOS ignores most of the manifest. Add:

```ts
export const metadata: Metadata = {
  // ...existing
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Deal Clozr",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};
export const viewport: Viewport = {
  themeColor: "#050506",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,        // prevents input zoom on iOS; do NOT set user-scalable=no
};
```

Add `public/apple-touch-icon.png` at 180×180 (opaque, no transparency — iOS renders transparency as black).

### 3.3 Service worker — `public/sw.js` + `components/ServiceWorkerRegister.tsx`

Keep it deliberately dumb. **Network-first for everything except static assets and the app shell.**

```js
const CACHE = "dc-v1";
const SHELL = ["/", "/dashboard", "/icon-192.png", "/icon-512.png", "/manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;                 // never cache writes
  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/")) return;         // never cache money data
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(request, copy));
        return res;
      })
      .catch(() => caches.match(request).then((r) => r || caches.match("/dashboard")))
  );
});
// push handled in Phase 3
```

Register in a client component mounted in `app/layout.tsx`, guarded by `"serviceWorker" in navigator` and `process.env.NODE_ENV === "production"`.

**Rule: no API response ever enters the cache.** A stale commission number is worse than no number.

### 3.4 Install prompt — `components/InstallPrompt.tsx`

`beforeinstallprompt` does not fire on iOS. Ship a small bottom sheet:

- **Android/Chrome:** capture `beforeinstallprompt`, show custom "Add Deal Clozr to your home screen" button → `prompt()`.
- **iOS Safari:** detect `navigator.userAgent` + `!window.MatchMedia("(display-mode: standalone)").matches` → show the two-step: *Share → Add to Home Screen* with a small arrow graphic.
- **Dismissal:** `localStorage.dc_install_dismissed` — never nag more than once per 14 days.
- **Never show** if already standalone.

### 3.5 Acceptance (Phase 0)

- Lighthouse → installable PWA, no manifest errors.
- iPhone Safari → share → Add to Home Screen → launches with no URL bar, correct icon, black status bar.
- Android Chrome → install prompt appears → launches standalone.
- Kill Wi-Fi after one load → app shell still opens, shows last-rendered dashboard, API calls fail gracefully ("Can't reach the ledger — retry").

---

## 4. Phase 1 — Screenshot ingest (3–5 days)

The whole point: **a rep should never type a deal again.**

### 4.1 Entry points (all three, one pipeline)

| Surface | Change | Effort |
|---|---|---|
| PWA camera/upload | New `/dashboard/log` screen: big "Photo the desk sheet" button (`<input type="file" accept="image/*" capture="environment">`) + paste + drag-drop | S |
| Telegram photo | Already works — route through the new ingest instead of raw vision → chat | S |
| SMS/MMS | Extend `app/api/sms/webhook/route.ts`: read `NumMedia`, `MediaUrl0..n`, fetch with Twilio auth (`TWILIO_ACCOUNT_SID`/`TWILIO_AUTH_TOKEN`), run same pipeline, reply via `sendSMS` | M |

MMS caveat: US/Canada only, carrier-dependent, images may be compressed. PWA camera and Telegram are the primary surfaces; MMS is a convenience door.

### 4.2 Pipeline

```
image
  → vision extract (Anthropic, reuse the call pattern in telegram/webhook L498)
  → strict JSON + per-field confidence
  → classify doc_kind
  → validate against deal schema
  → HIGH confidence + all required fields  → write draft, one-line confirm reply
  → LOW confidence or missing field        → ask ONE question
  → rep confirms/edits                     → deterministic pay engine → deals insert
```

**Extraction prompt contract** (return JSON only, no prose):

```json
{
  "doc_kind": "desk_sheet|buyers_order|pay_sheet|crm_screenshot|pay_stub|other",
  "customer_name": { "value": "J. Smith", "confidence": 0.93 },
  "vehicle": { "value": "2026 Camry SE", "confidence": 0.88 },
  "stock_number": { "value": "T44821", "confidence": 0.71 },
  "deal_type": { "value": "full_deal", "confidence": 0.64 },
  "front_gross": { "value": 2140, "confidence": 0.81 },
  "back_gross": { "value": null, "confidence": 0 },
  "pack": { "value": 0, "confidence": 0.9 },
  "sold_date": { "value": "2026-08-14", "confidence": 0.77 },
  "salesperson": { "value": "T. Leng", "confidence": 0.95 },
  "raw_text": "…transcribed lines…"
}
```

Rules for the prompt:
- Never guess a number. Missing → `null` + confidence 0.
- `deal_type` inference: explicit "mini"/"half" language wins; gross ≤ mini floor → `full_mini` candidate flagged LOW, always confirm.
- Multiple deals on one sheet → return `deals: []` array, not one.
- Never compute commission. Never compute units. **Extraction only.**

### 4.3 Confirm UX (the make-or-break screen)

One line + two buttons. Not a form.

> **Smith · Camry SE · full deal · $2,140 front**
> Gross pay $535 · units 1.0 · month 12.5 → **$750 tier unlocked**
> `[ Confirm ]` `[ Edit ]`

- **Confirm** → writes deal, replies with updated month total.
- **Edit** → only the fields that were low-confidence or null, pre-filled, one screen, big touch targets.
- If `deal_type` is uncertain: *"Mini or full?"* — two buttons. Never a dropdown.
- Dedupe: if same customer + same sold_date exists → *"Already logged Aug 14 — add anyway?"*

### 4.4 Code shape

- `lib/ingest/extract.ts` — vision call + JSON parse + Zod schema validate. Retries once on malformed JSON.
- `lib/ingest/classify.ts` — doc_kind rules + which fields are required per kind.
- `app/api/ingest/image/route.ts` — `POST multipart(file, source, caption?)` → `{ draft_id, doc_kind, fields, confidence, needs: [] }`
- `app/api/ingest/confirm/route.ts` — `POST { draft_id, patches }` → deal + `month_state`
- `lib/pay-engine.ts` — see §6 (deterministic, pure)
- Table `deal_drafts` (§8) holds unconfirmed extractions for 72h, then expires.

---

## 5. Phase 2 — Commission audit (the adoption unlock, 3 days)

This is the feature that makes a rep care on day one, and the feature a GM will pay for.

### 5.1 Flow (first run, 15 minutes, operator-assisted)

1. **"Load my last 90 days"** — upload one or many: pay sheets, CRM delivered list screenshots, desk sheets. Bulk drop.
2. Pipeline extracts every deal, groups by customer+date, dedupes.
3. Diff against what's in `deals` for the period.
4. Output, in this order:

```
Found 27 deals in your docs. 24 match. 3 didn't.

  Aug 14  Smith, J.     Camry SE     full    $2,140 front   → $535    NOT LOGGED
  Aug 22  Ortiz, M.     RAV4 XLE     mini    —              → $400    NOT LOGGED
  Aug 29  Bell, D.      Tundra       half    —              → $200    NOT LOGGED

Estimated uncollected: $1,135
3 deals · 2.5 units → puts you at 15.0 and unlocks the $1,000 retro tier.

[ Add all 3 to my ledger ]   [ Review each ]
```

5. One tap adds them. **Rep now has a number, a reason, and a screenshot to take to the office.**

### 5.2 Rules

- Never assert "you were underpaid." Say **"these deals aren't in your ledger."** The rep decides what it means. Legal + trust.
- Always show the source image thumbnail next to each extracted line — the receipt is the point.
- Audit runs on the **rep's own** docs. No manager view. Ever. (See §7.)
- If docs are illegible: *"2 sheets were too blurry — retake?"* Never silently drop.

---

## 6. Deterministic pay engine — non-negotiable

**The LLM never computes money.** It extracts. `lib/pay-engine.ts` computes, in pure TypeScript, from a versioned plan config.

```ts
calculatePay(plan: PayPlan, deals: Deal[]): {
  commission: number; units: number; tierBonus: number;
  spiffs: number; extras: number; grossPay: number;
  drawApplied: number; netToRep: number; tierProgress: {…};
}
```

### 6.1 Plan config (auto) — seed fixture is Thul's real Sun Toyota plan

```json
{
  "industry": "auto",
  "minis": { "full": 400, "half": 200 },
  "draw": 2600,
  "commission": { "type": "percent_front_gross", "rate": 0.25, "cap": null },
  "pack_on_full_deals": 0,
  "unit_rules": { "full_deal": 1, "full_mini": 1, "half_mini": 0.5, "street_purchase": 0 },
  "tiers": [
    { "units": 11, "bonus": 500,  "retro_pct": 25 },
    { "units": 13, "bonus": 750,  "retro_pct": 25 },
    { "units": 15, "bonus": 1000, "retro_pct": 30 },
    { "units": 17, "bonus": 1500, "retro_pct": 30 },
    { "units": 20, "bonus": 2000, "retro_pct": 35 }
  ],
  "extras": { "street_buy": 500, "cxi_4_8": 250, "survey_5_0": 50, "review": 20 },
  "spiffs": []
}
```

### 6.2 Required test fixtures (`lib/pay-engine.test.ts`)

| Case | Expect |
|---|---|
| 4 full + 3 half minis | units **5.5** (not 7) |
| 15 units reached | $1,000 bonus + 30% retro applies to all commission |
| 11 units, then 13 | retro recomputes, not additive double-pay |
| Zero-gross mini | flat $400, units 1 — never rejected |
| Street purchase | counts 0 units, adds $500 separately |
| Half mini + $1,000 spiff | $200 + $500 (half the spiff) = $700 |
| Commission > draw | net = commission − draw |
| Commission < draw | net 0, carry negative into next month |

These fixtures are the contract. If a test fails, the build is wrong — not the test.

### 6.3 Plan versioning

Every deal stores `pay_plan_id`. Editing a plan **never** recalculates closed history. New plan → new row → `effective_from`. Reps lose trust the first time a past check silently changes.

---

## 7. Privacy and trust (this is a feature, not a policy)

The #1 reason a rep won't log deals: **fear the manager sees it.**

- `deals` and `deal_drafts` are per-`user_id`. RLS on, no store/manager read path.
- No aggregate view, no leaderboard, no admin dashboard of rep data. Not now, not "just for support."
- Images: store `deal_evidence` thumbnail for 30 days, then delete; keep extracted JSON. Never train on customer data.
- Every screen that writes states it once, calmly: *"Private to you."* No badge, no seal, no explanation paragraph.
- If a store plan is ever sold (§ later), it gets an **opt-in, rep-visible** aggregation — the rep sees exactly what the store sees.

---

## 8. Data model

```sql
create table if not exists pay_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  industry text not null default 'auto',
  name text not null default 'My plan',
  config jsonb not null,
  source_doc_path text,
  effective_from date not null default current_date,
  created_at timestamptz not null default now()
);
create index on pay_plans (user_id, effective_from desc);

create table if not exists deal_drafts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null check (source in ('pwa','telegram','sms','whatsapp')),
  doc_kind text,
  fields jsonb not null,
  confidence jsonb not null,
  raw_text text,
  status text not null default 'pending' check (status in ('pending','confirmed','discarded','expired')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '72 hours'
);
create index on deal_drafts (user_id, status);

create table if not exists deal_evidence (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  deal_id uuid references deals(id) on delete set null,
  doc_kind text,
  storage_path text,
  extracted jsonb not null,
  created_at timestamptz not null default now()
);

alter table deals add column if not exists source text not null default 'manual';
alter table deals add column if not exists pay_plan_id uuid references pay_plans(id);
alter table deals add column if not exists evidence_id uuid references deal_evidence(id);
```

RLS: enable on all three, policy `user_id = auth.uid()` for select/insert/update/delete. Service-role only for webhooks that run before a link exists.

---

## 9. API contracts

| Method | Path | Body | Returns |
|---|---|---|---|
| POST | `/api/ingest/image` | multipart `file`, `source`, `caption?` | `{ draft_id, doc_kind, fields, confidence, needs[] }` |
| POST | `/api/ingest/confirm` | `{ draft_id, patches? }` | `{ deal, month_state }` |
| POST | `/api/ingest/discard` | `{ draft_id }` | `{ ok: true }` |
| POST | `/api/audit/run` | `{ from, to, files[] }` | `{ matched, unlogged[], est_uncollected, unit_delta }` |
| GET | `/api/deals/list` | existing | existing |
| POST | `/api/deals/log` | existing | existing |

All new routes: `runtime = "nodejs"`, `dynamic = "force-dynamic"`, session auth (no shared secret), rate limit 20 ingests/hour/user.

---

## 10. Acceptance tests

1. **Install** — iPhone + Android, home-screen launch, standalone, correct icon, no URL bar.
2. **Extract** — 5 real desk sheets (redacted): ≥4/5 produce correct customer, vehicle, deal_type, front_gross. Zero fabricated numbers across all 5.
3. **Ambiguity** — a blurry photo asks exactly one question, never renders a blank form.
4. **Audit** — 3 pay sheets vs ledger → shortfall correct to the dollar, and every asserted gap links to its source image.
5. **Money path** — pay-engine fixtures all green; grep proves no `calculatePay` call inside any LLM completion path.
6. **Privacy** — logged-in rep A cannot fetch rep B's deals via any route, including drafts/evidence.
7. **Offline** — airplane mode: shell loads, writes fail with a clear retry, nothing stale is presented as current.

---

## 11. Build order (Naomi)

1. `feat/pwa-shell` — manifest, apple meta, sw.js, install prompt. Preview URL. **1 day.**
2. `feat/ingest-image` — extract.ts, drafts table, confirm UI, PWA camera screen. **3 days.**
3. `feat/ingest-sms` — Twilio MMS into the same pipeline. **0.5 day.**
4. `feat/audit` — bulk upload, diff, shortfall screen. **3 days.**
5. `feat/pay-engine-tests` — fixtures from §6.2 must be green before #4 ships.

**Rules:** branch + preview URL only. No production merge without Thul. No pay math in prompts. No manager views.

---

## 12. Gate to native

Build the native app only when **all three** are true:

- 10 reps have sent a deal on 14 consecutive days
- ≥60% of deals arrive by photo, not typing
- Reps ask for a lock-screen widget (that request, not our guess, defines v1)

Otherwise the app is a tombstone with a nice icon.
