// Workaround for Next.js 15.3.9 dev-overlay bug:
// `next/dist/client/components/react-dev-overlay/.../preferences.js` calls
// `localStorage.getItem` during SSR via `getInitialScale`/`useDevToolsScale`,
// which throws because localStorage doesn't exist on the server. We provide
// a no-op shim so the dev overlay's getItem returns null and falls back to
// defaults. Production has no dev overlay, so this has no effect there.
export async function register() {
  if (typeof globalThis.localStorage === "undefined") {
    const store = new Map<string, string>();
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => { store.set(k, String(v)); },
        removeItem: (k: string) => { store.delete(k); },
        clear: () => { store.clear(); },
        key: () => null,
        length: 0,
      },
    });
  }
}
