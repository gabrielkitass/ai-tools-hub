const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type Stats = { total_count: number; active_users: number };

export const STATS_EVENT = "aih-stats-change";

// Read the shared counter + active users (events in the last 30 min) directly from Supabase.
export async function fetchStats(): Promise<Stats | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_stats`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`,
        "Content-Type": "application/json",
      },
      body: "{}",
    });
    if (!res.ok) return null;
    return (await res.json()) as Stats;
  } catch {
    return null;
  }
}

// Bump the shared counter via our API route, then broadcast the new numbers.
export async function bumpUsage(tool?: string): Promise<void> {
  try {
    const res = await fetch("/api/stats/increment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool: tool ?? null }),
    });
    if (!res.ok) return;
    const data = (await res.json()) as Stats;
    if (typeof window !== "undefined" && typeof data.total_count === "number") {
      window.dispatchEvent(new CustomEvent<Stats>(STATS_EVENT, { detail: data }));
    }
  } catch {
    /* network/offline — ignore */
  }
}

export function onStatsChange(cb: (s: Stats) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<Stats>).detail);
  window.addEventListener(STATS_EVENT, handler);
  return () => window.removeEventListener(STATS_EVENT, handler);
}
