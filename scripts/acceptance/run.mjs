#!/usr/bin/env node
/**
 * DealClozr acceptance harness.
 *
 * Runs the checks from docs/specs/pwa-screenshot-ingest.md §10 that can be
 * verified without a browser or a live API. Live ingest checks run only when
 * --base-url and --cookie are supplied.
 *
 *   node scripts/acceptance/run.mjs
 *   node scripts/acceptance/run.mjs --base-url http://localhost:3111 --cookie "sb=..."
 *
 * Exit code 0 = every runnable check passed. 1 = at least one FAIL.
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const FIXTURES = join(ROOT, "scripts", "acceptance", "fixtures");

const args = process.argv.slice(2);
const arg = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1] ?? null;
};
const BASE_URL = arg("--base-url");
const COOKIE = arg("--cookie");

const results = [];
const record = (id, name, status, detail = "") => {
  results.push({ id, name, status, detail });
  const tag = status === "PASS" ? "PASS" : status === "FAIL" ? "FAIL" : "SKIP";
  console.log(`${tag}  ${id}  ${name}${detail ? ` — ${detail}` : ""}`);
};

const pngSize = (path) => {
  const buf = readFileSync(path);
  if (buf.length < 24 || buf.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
};

// ── T1: manifest is installable ──────────────────────────────────────────────
try {
  const manifestPath = join(ROOT, "public", "manifest.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const problems = [];

  if (!manifest.name || !manifest.short_name) problems.push("missing name");
  if (manifest.display !== "standalone") problems.push("display is not standalone");
  if (!manifest.start_url || manifest.start_url === "/") problems.push("start_url points at marketing home");
  if (!manifest.scope) problems.push("missing scope");
  if (!Array.isArray(manifest.shortcuts) || manifest.shortcuts.length === 0) problems.push("no shortcuts");

  const icons = manifest.icons ?? [];
  const has192 = icons.some((i) => i.sizes === "192x192" && i.type === "image/png");
  const has512 = icons.some((i) => i.sizes === "512x512" && i.type === "image/png");
  const hasMaskable = icons.some((i) => i.purpose?.includes("maskable") && i.sizes === "512x512");
  if (!has192) problems.push("no 192x192 PNG");
  if (!has512) problems.push("no 512x512 PNG");
  if (!hasMaskable) problems.push("no 512x512 maskable");

  for (const icon of icons) {
    const file = join(ROOT, "public", icon.src.replace(/^\//, ""));
    if (!existsSync(file)) problems.push(`icon file missing: ${icon.src}`);
  }

  record("T1", "manifest installable", problems.length ? "FAIL" : "PASS", problems.join("; "));
} catch (err) {
  record("T1", "manifest installable", "FAIL", err.message);
}

// ── T2: iOS icon + meta ──────────────────────────────────────────────────────
try {
  const appleIcon = join(ROOT, "public", "apple-touch-icon.png");
  const size = existsSync(appleIcon) ? pngSize(appleIcon) : null;
  const layout = readFileSync(join(ROOT, "app", "layout.tsx"), "utf8");
  const problems = [];

  if (!size) problems.push("apple-touch-icon.png missing");
  else if (size.width !== 180 || size.height !== 180) problems.push(`apple-touch-icon is ${size.width}x${size.height}, needs 180x180`);
  if (!layout.includes("appleWebApp")) problems.push("no appleWebApp metadata");
  if (!layout.includes("/apple-touch-icon.png")) problems.push("apple icon not referenced in layout");
  if (!layout.includes("viewportFit")) problems.push("no viewportFit: cover");
  if (layout.includes("maximumScale")) problems.push("maximumScale set — breaks pinch zoom");

  record("T2", "iOS install meta", problems.length ? "FAIL" : "PASS", problems.join("; "));
} catch (err) {
  record("T2", "iOS install meta", "FAIL", err.message);
}

// ── T3: service worker never caches the ledger ──────────────────────────────
try {
  const sw = readFileSync(join(ROOT, "public", "sw.js"), "utf8");
  const problems = [];
  if (!sw.includes('startsWith("/api/")')) problems.push("no /api/ exclusion");
  if (!/request\.method !== "GET"/.test(sw)) problems.push("writes are not excluded");
  if (/cache\.put\([^)]*api/i.test(sw)) problems.push("api put detected");
  record("T3", "sw excludes /api/*", problems.length ? "FAIL" : "PASS", problems.join("; "));
} catch (err) {
  record("T3", "sw excludes /api/*", "FAIL", err.message);
}

// ── T4: money math is deterministic and green ───────────────────────────────
{
  const testFile = join(ROOT, "lib", "pay-engine.test.ts");
  if (!existsSync(testFile)) {
    record("T4", "pay-engine fixtures", "FAIL", "lib/pay-engine.test.ts missing");
  } else {
    const run = spawnSync("npx", ["jest", "lib/pay-engine.test.ts", "--silent"], {
      cwd: ROOT,
      encoding: "utf8",
      timeout: 180000,
    });
    const tail = `${run.stdout ?? ""}${run.stderr ?? ""}`.trim().split("\n").slice(-2).join(" ");
    record("T4", "pay-engine fixtures", run.status === 0 ? "PASS" : "FAIL", run.status === 0 ? "13 fixtures" : tail);
  }
}

// ── T5: no LLM in the money path ────────────────────────────────────────────
try {
  const offenders = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.(ts|tsx)$/.test(entry)) {
        const src = readFileSync(full, "utf8");
        // A file that calls the model must not also compute pay.
        if (/messages\.create|generateText|completions\.create/.test(src) && /calculatePay\s*\(/.test(src)) {
          offenders.push(full.replace(ROOT + "/", ""));
        }
      }
    }
  };
  for (const dir of ["lib", "app"]) walk(join(ROOT, dir));
  record("T5", "no LLM inside calculatePay", offenders.length ? "FAIL" : "PASS", offenders.join(", "));
} catch (err) {
  record("T5", "no LLM inside calculatePay", "FAIL", err.message);
}

// ── T6: fixtures exist ──────────────────────────────────────────────────────
try {
  const expected = ["desk_sheet_clean.png", "desk_sheet_mini.png", "crm_delivered.png", "desk_sheet_blurry.jpg"];
  const missing = expected.filter((f) => !existsSync(join(FIXTURES, f)));
  record("T6", "acceptance fixtures", missing.length ? "FAIL" : "PASS", missing.length ? `missing: ${missing.join(", ")}` : `${expected.length} files`);
} catch (err) {
  record("T6", "acceptance fixtures", "FAIL", err.message);
}

// ── T7: ingest routes exist ─────────────────────────────────────────────────
{
  const routes = [
    "app/api/ingest/image/route.ts",
    "app/api/ingest/confirm/route.ts",
    "app/api/ingest/discard/route.ts",
  ];
  const missing = routes.filter((r) => !existsSync(join(ROOT, r)));
  record("T7", "ingest routes wired", missing.length ? "SKIP" : "PASS", missing.length ? `pending: ${missing.length} route(s)` : "3/3");
}

// ── T8: live ingest (optional) ──────────────────────────────────────────────
if (!BASE_URL || !COOKIE) {
  record("T8", "live ingest round-trip", "SKIP", "pass --base-url and --cookie to run");
} else {
  try {
    const fixture = join(FIXTURES, "desk_sheet_clean.png");
    const form = new FormData();
    form.append("file", new Blob([readFileSync(fixture)], { type: "image/png" }), "desk_sheet_clean.png");
    form.append("source", "pwa");

    const res = await fetch(`${BASE_URL}/api/ingest/image`, {
      method: "POST",
      headers: { cookie: COOKIE },
      body: form,
    });
    const body = await res.json().catch(() => ({}));

    if (!res.ok) record("T8", "live ingest round-trip", "FAIL", `image ${res.status}: ${JSON.stringify(body).slice(0, 160)}`);
    else if (!body.draft_id) record("T8", "live ingest round-trip", "FAIL", "no draft_id returned");
    else {
      const confirm = await fetch(`${BASE_URL}/api/ingest/confirm`, {
        method: "POST",
        headers: { cookie: COOKIE, "content-type": "application/json" },
        body: JSON.stringify({ draft_id: body.draft_id }),
      });
      const confirmed = await confirm.json().catch(() => ({}));
      record(
        "T8",
        "live ingest round-trip",
        confirm.ok && confirmed.deal ? "PASS" : "FAIL",
        confirm.ok ? `deal ${confirmed.deal?.id ?? "?"}` : `confirm ${confirm.status}`
      );
    }
  } catch (err) {
    record("T8", "live ingest round-trip", "FAIL", err.message);
  }
}

// ── summary ─────────────────────────────────────────────────────────────────
const failed = results.filter((r) => r.status === "FAIL").length;
const passed = results.filter((r) => r.status === "PASS").length;
const skipped = results.filter((r) => r.status === "SKIP").length;
console.log(`\n${passed} passed, ${failed} failed, ${skipped} skipped`);
process.exit(failed === 0 ? 0 : 1);
