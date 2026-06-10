"use client";
import { useEffect, useRef, useState } from "react";
import { Users, TrendingUp } from "lucide-react";
import { useUserData, getTotalUsage } from "../lib/userData";

export default function SocialProof() {
  const { mounted } = useUserData();
  const target = mounted ? getTotalUsage() : 0;

  const [display, setDisplay] = useState(0);
  const [online, setOnline] = useState(7);
  const raf = useRef<number | null>(null);

  // Count-up animation toward the current total
  useEffect(() => {
    if (!mounted) return;
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
  }, [target, mounted]);

  // "Now N people using" — jitters every few seconds
  useEffect(() => {
    if (!mounted) return;
    const tick = () => setOnline(3 + Math.floor(Math.random() * 10));
    const id = setInterval(tick, 4000);
    return () => clearInterval(id);
  }, [mounted]);

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
