"use client";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import Nav from "../components/Nav";
import ToolCard from "../components/ToolCard";
import { TOOLS } from "../lib/tools";
import { useUserData, getFavorites } from "../lib/userData";

export default function FavoritesPage() {
  const { mounted } = useUserData();
  const favHrefs = mounted ? getFavorites() : [];
  const favTools = TOOLS.filter(t => favHrefs.includes(t.href));

  return (
    <div className="grid-bg" style={{ minHeight: "100vh" }}>
      <Nav />

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.5rem" }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: "rgba(236,72,153,0.12)",
            border: "1px solid rgba(236,72,153,0.3)", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Heart size={22} fill="#ec4899" color="#ec4899" />
          </div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>お気に入り</h1>
            <p style={{ fontSize: 14, color: "var(--muted)", margin: "2px 0 0" }}>
              よく使うツールをここにまとめて素早くアクセス
            </p>
          </div>
        </div>

        <div style={{ marginTop: "2rem" }}>
          {!mounted ? null : favTools.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "4rem 1.5rem",
              background: "var(--bg2)", border: "1px dashed var(--border)", borderRadius: 16,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 99, margin: "0 auto 1.25rem",
                background: "var(--bg3)", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Heart size={26} color="var(--muted)" />
              </div>
              <p style={{ fontSize: 16, fontWeight: 700, margin: "0 0 0.5rem" }}>まだお気に入りがありません</p>
              <p style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 1.5rem", lineHeight: 1.7 }}>
                各ツールの <Heart size={13} style={{ display: "inline", verticalAlign: "middle" }} color="#ec4899" /> ボタンを押すと、ここに表示されます。
              </p>
              <Link href="/#tools" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, var(--accent), #9f7aea)", color: "#fff",
                padding: "11px 24px", borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: "none",
              }}>
                ツール一覧を見る <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 14 }}>
              {favTools.map(t => <ToolCard key={t.href} {...t} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
