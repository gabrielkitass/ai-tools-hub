"use client";
import { useState } from "react";
import { Heart, Star } from "lucide-react";
import {
  useUserData, isFavorite, toggleFavorite,
  getMyRating, setRating, getDisplayRating, getToolUsage,
} from "../lib/userData";

export default function ToolMeta({ href, color = "var(--accent)" }: { href: string; color?: string }) {
  const { mounted } = useUserData();
  const [hover, setHover] = useState(0);

  const fav = mounted && isFavorite(href);
  const my = mounted ? getMyRating(href) : 0;
  const { avg, count } = getDisplayRating(href);
  const uses = mounted ? getToolUsage(href) : 0;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap",
      marginBottom: "1.5rem", padding: "0.85rem 1.1rem",
      background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12,
    }}>
      {/* Favorite */}
      <button
        onClick={() => toggleFavorite(href)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          background: fav ? "rgba(236,72,153,0.12)" : "var(--bg3)",
          border: `1px solid ${fav ? "rgba(236,72,153,0.4)" : "var(--border)"}`,
          borderRadius: 99, padding: "6px 14px", cursor: "pointer",
          color: fav ? "#ec4899" : "var(--muted)", fontSize: 13, fontWeight: 600,
          transition: "all 0.15s",
        }}
      >
        <Heart size={15} fill={fav ? "#ec4899" : "none"} color={fav ? "#ec4899" : "var(--muted)"} />
        {fav ? "お気に入り済み" : "お気に入り"}
      </button>

      {/* Rating */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <div style={{ display: "flex", gap: 2 }} onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map(n => {
            const active = (hover || my) >= n;
            return (
              <Star
                key={n}
                size={19}
                onMouseEnter={() => setHover(n)}
                onClick={() => setRating(href, n)}
                style={{ cursor: "pointer", transition: "transform 0.1s" }}
                fill={active ? "#fbbf24" : "none"}
                color={active ? "#fbbf24" : "var(--muted)"}
              />
            );
          })}
        </div>
        <span style={{ fontSize: 13, color: "var(--muted)", marginLeft: 4 }}>
          <strong style={{ color: "var(--text)" }}>{avg}</strong>
          <span style={{ opacity: 0.6 }}> （{count}件）</span>
        </span>
        {mounted && my > 0 && (
          <span style={{ fontSize: 12, color, marginLeft: 4 }}>· 評価済み</span>
        )}
      </div>

      {/* Personal usage */}
      {mounted && uses > 0 && (
        <span style={{ fontSize: 13, color: "var(--muted)", marginLeft: "auto" }}>
          あなたはこのツールを <strong style={{ color: "var(--text)" }}>{uses}回</strong> 使いました
        </span>
      )}
    </div>
  );
}
