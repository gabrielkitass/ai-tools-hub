"use client";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav style={{
      borderBottom: "1px solid var(--border)",
      background: "rgba(10,10,15,0.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 1.5rem",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/logo.svg" alt="AI Tools Hub" width={160} height={40} style={{ objectFit: "contain" }} priority />
        </Link>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <NavLink href="/#tools">ツール一覧</NavLink>
          <NavLink href="/blog">活用ガイド</NavLink>
          <Link href="/report" style={{
            background: "linear-gradient(135deg, var(--accent), #9f7aea)",
            color: "#fff",
            padding: "7px 18px",
            borderRadius: 9,
            fontSize: 13,
            textDecoration: "none",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            boxShadow: "0 0 16px rgba(124,109,250,0.3)",
            transition: "opacity 0.15s",
          }}>
            レポート生成 →
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{
      color: "var(--muted)",
      textDecoration: "none",
      fontSize: 14,
      padding: "6px 12px",
      borderRadius: 8,
      transition: "color 0.15s, background 0.15s",
      fontWeight: 500,
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.color = "var(--text)";
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,109,250,0.1)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
      }}
    >
      {children}
    </Link>
  );
}
