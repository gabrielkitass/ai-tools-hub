"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS: [string, string][] = [
  ["ツール一覧", "/#tools"],
  ["お気に入り", "/favorites"],
  ["活用ガイド", "/blog"],
];

const ctaStyle: React.CSSProperties = {
  background: "var(--gradient-brand)",
  color: "#fff",
  padding: "7px 18px",
  borderRadius: 9,
  fontSize: 13,
  textDecoration: "none",
  fontWeight: 700,
  letterSpacing: "-0.01em",
  boxShadow: "0 0 16px rgba(124,109,250,0.3)",
  transition: "opacity 0.15s",
};

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      borderBottom: "1px solid var(--border)",
      background: "var(--glass-bg)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      fontFamily: "var(--font-sans)",
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
        <Link href="/" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/logo.svg" alt="Work AI Hub" width={160} height={40} style={{ objectFit: "contain", maxWidth: "44vw", height: "auto" }} priority />
        </Link>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {NAV_ITEMS.map(([label, href]) => (
            <NavLink key={href} href={href}>{label}</NavLink>
          ))}
          <Link href="/report" style={ctaStyle}>レポート生成 →</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-toggle"
          aria-label="メニューを開く"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="nav-mobile">
          {NAV_ITEMS.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                color: "var(--text-2)",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 500,
                padding: "12px 8px",
                borderRadius: 8,
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/report"
            onClick={() => setOpen(false)}
            style={{ ...ctaStyle, textAlign: "center", padding: "12px 18px", fontSize: 15, marginTop: 4 }}
          >
            レポート生成 →
          </Link>
        </div>
      )}
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
