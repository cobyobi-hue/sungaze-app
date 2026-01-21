/**
 * Canonical app base URL helper.
 *
 * Why: `window.location.origin` differs across environments (Vercel previews, PWA,
 * Capacitor WebView origins like https://localhost). For Supabase Auth redirects,
 * we want a stable, allowlisted URL.
 */
export function getAppBaseUrl(): string {
  // Prefer a stable env var (configure in Vercel + local dev).
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;

  // In the browser, fall back to the current origin (useful for local dev).
  const fallback = typeof window !== 'undefined' ? window.location.origin : '';

  const raw = (envUrl && envUrl.trim()) ? envUrl.trim() : fallback;
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

export function joinUrl(base: string, path: string): string {
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}



