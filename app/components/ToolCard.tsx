"use client";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

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
    <Link href={href} style={{ textDecoration: "none" }}>
      <div style={{
        background: "var(--bg2)", border: "1px solid var(--border)",
        borderRadius: 12, padding: "1.25rem",
        transition: "border-color 0.2s, transform 0.2s",
        cursor: "pointer", height: "100%", display: "flex", flexDirection: "column", gap: 10,
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = color;
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={20} color={color} />
          </div>
          {badge && (
            <span style={{ fontSize: 11, background: `${color}22`, color, padding: "2px 10px", borderRadius: 99, fontWeight: 600 }}>
              {badge}
            </span>
          )}
        </div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 15, margin: "0 0 4px", color: "var(--text)" }}>{title}</p>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>{description}</p>
        </div>
      </div>
    </Link>
  );
}
