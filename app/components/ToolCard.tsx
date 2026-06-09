"use client";
import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

type ToolCardProps = {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  color?: string;
};

export default function ToolCard({ href, icon: Icon, title, description, badge, color = "var(--accent)" }: ToolCardProps) {
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div
        style={{
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "1.25rem",
          transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = color;
          el.style.transform = "translateY(-3px)";
          el.style.boxShadow = `0 8px 32px ${color}25`;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = "var(--border)";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Subtle top gradient line */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
          opacity: 0,
          transition: "opacity 0.2s",
        }} className="card-top-line" />

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <Icon size={21} color={color} />
          </div>
          {badge && (
            <span style={{
              fontSize: 11,
              background: `${color}20`,
              color,
              padding: "3px 10px",
              borderRadius: 99,
              fontWeight: 700,
              border: `1px solid ${color}30`,
              letterSpacing: "0.02em",
            }}>
              {badge}
            </span>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 5px", color: "var(--text)", letterSpacing: "-0.01em" }}>
            {title}
          </p>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.65 }}>
            {description}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4, color, fontSize: 12, fontWeight: 600 }}>
          使ってみる <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  );
}
