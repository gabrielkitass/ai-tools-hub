"use client";
import { useEffect, useRef, useState } from "react";
import { Users, TrendingUp } from "lucide-react";
import { fetchStats, onStatsChange } from "../lib/stats";

export default function SocialProof() {
  const [mounted, setMounted] = useState(false);
  const [target, setTarget] = useState(0);
  const [display, setDisplay] = useState(0);
  const [online, setOnline] = useState(0);
  const raf = useRef<number | null>(null);

  // Load shared stats from Supabase on mount, refresh periodically,
  // and react to live bumps triggered after a tool is used.
  useEffect(() => {
    setMounted(true);
    let alive = true;
    const load = async () => {
      const s = await fetchStats();
      if (alive && s) {
        setTarget(s.total_count);
        setOnline(s.active_users);
      }
    };
    load();
    const id = setInterval(load, 30000);
    const off = onStatsChange(s => {
      setTarget(s.total_count);
      setOnline(s.active_users);
    });
    return () => { alive = false; clearInterval(id); off(); };
  }, []);

  // Count-up animation toward the current total
  useEffect(() => {
    const from = display;
    const to = target;
    if (from === to) return;
    const start = performance.now();
    const dur = 900;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 18, flexWrap: "wrap", justifyContent: "center",
      background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 99,
      padding: "8px 20px", marginBottom: "2rem",
    }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--muted)" }}>
        <TrendingUp size={15} color="var(--accent2)" />
        累計利用回数
        <strong style={{
          color: "var(--text)", fontSize: 15, fontVariantNumeric: "tabular-nums",
          minWidth: 56, display: "inline-block", textAlign: "right",
        }}>
          {mounted ? display.toLocaleString() : "—"}
        </strong>
        回
      </span>

      <span style={{ width: 1, height: 16, background: "var(--border)" }} />

      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--muted)" }}>
        <span style={{
          width: 8, height: 8, borderRadius: 99, background: "#10b981",
          boxShadow: "0 0 0 3px rgba(16,185,129,0.2)", flexShrink: 0,
        }} />
        <Users size={15} color="#10b981" />
        今
        <strong style={{ color: "var(--text)" }}>{mounted ? online : "—"}</strong>
        人が利用中
      </span>
    </div>
  );
}
