import Link from "next/link";

const LINKS: [string, string][] = [
  ["ツール一覧", "/#tools"],
  ["活用ガイド", "/blog"],
  ["お気に入り", "/favorites"],
  ["プライバシーポリシー", "/privacy"],
  ["利用規約", "/terms"],
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: "3rem", padding: "2rem 1.5rem" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", flexWrap: "wrap", gap: 16,
        alignItems: "center", justifyContent: "space-between",
      }}>
        <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>
          © 2025 AIツール集 — 無料で使えるAIツールサービス
        </p>
        <nav style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
          {LINKS.map(([label, href]) => (
            <Link key={href} href={href} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
