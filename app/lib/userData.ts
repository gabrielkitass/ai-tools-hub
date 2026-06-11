"use client";
import { useEffect, useState } from "react";
import { TOOL_SEEDS } from "./tools";
import { bumpUsage } from "./stats";

const K = {
  fav: "aih_favorites",
  ratings: "aih_ratings",
  usage: "aih_usage",
  history: "aih_history",
  total: "aih_total",
  report: "aih_report",
  premium: "aih_premium",
};

const EVENT = "aih-userdata-change";
const BASE_TOTAL = 1240;
const FREE_LIMIT = 5;
const HISTORY_CAP = 12;

function emit() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(EVENT));
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return v == null ? fallback : (JSON.parse(v) as T);
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / privacy mode — ignore */
  }
  emit();
}

/* ---------- Favorites ---------- */
export function getFavorites(): string[] {
  return read<string[]>(K.fav, []);
}
export function isFavorite(href: string): boolean {
  return getFavorites().includes(href);
}
export function toggleFavorite(href: string): void {
  const cur = getFavorites();
  write(K.fav, cur.includes(href) ? cur.filter(h => h !== href) : [...cur, href]);
}

/* ---------- Ratings ---------- */
export function getMyRating(href: string): number {
  return read<Record<string, number>>(K.ratings, {})[href] || 0;
}
export function setRating(href: string, value: number): void {
  const cur = read<Record<string, number>>(K.ratings, {});
  cur[href] = value;
  write(K.ratings, cur);
}
export function getDisplayRating(href: string): { avg: number; count: number } {
  const seed = TOOL_SEEDS[href] || { avg: 4.5, count: 50 };
  const my = getMyRating(href);
  if (!my) return { avg: Math.round(seed.avg * 10) / 10, count: seed.count };
  const count = seed.count + 1;
  const avg = (seed.avg * seed.count + my) / count;
  return { avg: Math.round(avg * 10) / 10, count };
}

/* ---------- Usage / history / total ---------- */
export type HistoryItem = { href: string; title: string; ts: number };

export function getToolUsage(href: string): number {
  return read<Record<string, number>>(K.usage, {})[href] || 0;
}
export function getTotalUsage(): number {
  return read<number>(K.total, BASE_TOTAL);
}
export function getHistory(): HistoryItem[] {
  return read<HistoryItem[]>(K.history, []);
}

export function recordToolUse(href: string, title: string): void {
  const usage = read<Record<string, number>>(K.usage, {});
  usage[href] = (usage[href] || 0) + 1;
  write(K.usage, usage);

  const hist = getHistory().filter(h => h.href !== href);
  hist.unshift({ href, title, ts: Date.now() });
  write(K.history, hist.slice(0, HISTORY_CAP));

  write(K.total, getTotalUsage() + 1);

  // Bump the shared real-time counter in Supabase (fire-and-forget).
  void bumpUsage();
}

/* ---------- Report monthly limit ---------- */
function curMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}`;
}
export function getReportCount(): number {
  const r = read<{ month: string; count: number }>(K.report, { month: curMonth(), count: 0 });
  return r.month === curMonth() ? r.count : 0;
}
export function getReportLimit(): number {
  return FREE_LIMIT;
}
export function canUseReport(): boolean {
  return isPremium() || getReportCount() < FREE_LIMIT;
}
export function incrementReportCount(): void {
  const m = curMonth();
  const r = read<{ month: string; count: number }>(K.report, { month: m, count: 0 });
  const count = r.month === m ? r.count + 1 : 1;
  write(K.report, { month: m, count });
}

/* ---------- Premium ---------- */
export function isPremium(): boolean {
  return read<boolean>(K.premium, false);
}
export function setPremium(value: boolean): void {
  write(K.premium, value);
}

/* ---------- Reactive hook ---------- */
export function useUserData() {
  const [mounted, setMounted] = useState(false);
  const [, setVersion] = useState(0);
  useEffect(() => {
    setMounted(true);
    const h = () => setVersion(v => v + 1);
    window.addEventListener(EVENT, h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener(EVENT, h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return { mounted };
}
