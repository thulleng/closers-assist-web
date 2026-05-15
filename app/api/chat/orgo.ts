// Orgo proxy — bridges Vercel chat route → Orgo cloud VMs.

const ORGO_API = "https://www.orgo.ai/api";
const orgoKey = () => process.env.ORGO_API_KEY ?? "";

async function orgoFetch(path: string, method = "GET", body?: Record<string, unknown>) {
  const key = orgoKey();
  if (!key) return { ok: false, error: "ORGO_API_KEY not configured" };
  try {
    const res = await fetch(`${ORGO_API}${path}`, {
      method,
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const json: Record<string, unknown> = await res.json();
    if (res.ok && !json.error) return { ok: true, data: json };
    return { ok: false, error: (json.error as string) ?? `HTTP ${res.status}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// All functions return { error?: string, ... } — check `error` to detect failure.

export async function orgoBash(computerId: string, command: string) {
  const r = await orgoFetch(`/computers/${computerId}/bash`, "POST", { command });
  if (r.ok) return r.data as Record<string, unknown>;
  return { error: (r as { error: string }).error };
}

export async function orgoScreenshot(computerId: string) {
  const r = await orgoFetch(`/computers/${computerId}/screenshot`);
  if (r.ok) return r.data as { image: string };
  return { error: (r as { error: string }).error };
}

export async function orgoClick(computerId: string, x: number, y: number, b = "left") {
  const r = await orgoFetch(`/computers/${computerId}/click`, "POST", { x, y, button: b });
  return r.ok ? { ok: true } : { ok: false, error: (r as { error: string }).error };
}

export async function orgoType(computerId: string, text: string) {
  const r = await orgoFetch(`/computers/${computerId}/type`, "POST", { text });
  return r.ok ? { ok: true } : { ok: false, error: (r as { error: string }).error };
}

export async function orgoGetComputer(computerId: string) {
  const r = await orgoFetch(`/computers/${computerId}`);
  return r.ok ? (r.data as Record<string, unknown>) : { error: (r as { error: string }).error };
}

export async function orgoCloneComputer(computerId: string) {
  const r = await orgoFetch(`/computers/${computerId}/clone`, "POST");
  return r.ok ? { id: (r.data as { id: string }).id } : { error: (r as { error: string }).error };
}
