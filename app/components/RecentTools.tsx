"use client";
import Link from "next/link";
import { History, ArrowRight } from "lucide-react";
import { useUserData, getHistory } from "../lib/userData";
import { getTool } from "../lib/tools";

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "たった今";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}分前`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}時間前`;
  const d = Math.floor(h / 24);
  return `${d}日前`;
}

export default function RecentTools() {
  const { mounted } = useUserData();
  if (!mounted) return null;

  const history = getHistory().slice(0, 6);
  if (history.length === 0) return null;

  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem 3rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
        <div style={{ width: 4, height: 24, borderRadius: 2, background: "linear-gradient(180deg, #f59e0b, #fbbf24)" }} />
        <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 8 }}>
          <History size={20} color="#f59e0b" />
          最近使ったツール
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {history.map(h => {
          const tool = getTool(h.href);
          const color = tool?.color || "var(--accent)";
          const Icon = tool?.icon;
          return (
            <Link key={h.href} href={h.href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "var(--bg2)", border: "1px solid var(--border)",
                  borderRadius: 12, padding: "0.85rem 1rem", transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10, background: `${color}18`,
                  border: `1px solid ${color}30`, display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0,
                }}>
                  {Icon && <Icon size={18} style={{ color }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {h.title}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--muted)", margin: "2px 0 0" }}>{timeAgo(h.ts)}</p>
                </div>
                <ArrowRight size={14} color="var(--muted)" style={{ flexShrink: 0 }} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
