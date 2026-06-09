"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Nav() {
  return (
    <nav style={{ borderBottom: "1px solid var(--border)", background: "rgba(10,10,15,0.9)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Sparkles size={20} color="var(--accent)" />
          <span style={{ fontWeight: 700, fontSize: 18, color: "var(--text)" }}>AIツール集</span>
        </Link>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <Link href="/#tools" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 14 }}>ツール一覧</Link>
          <Link href="/blog" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 14 }}>活用ガイド</Link>
          <Link href="/report" style={{ background: "var(--accent)", color: "#fff", padding: "6px 16px", borderRadius: 8, fontSize: 14, textDecoration: "none", fontWeight: 600 }}>レポート生成</Link>
        </div>
      </div>
    </nav>
  );
}
