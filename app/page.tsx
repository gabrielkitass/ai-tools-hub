"use client";
import Nav from "./components/Nav";
import AdBanner from "./components/AdBanner";
import ToolCard from "./components/ToolCard";
import {
  FileText, MessageSquare, Languages, Lightbulb,
  BarChart2, PenLine, Mail, Search, Sparkles
} from "lucide-react";

const tools = [
  { href: "/report",    icon: BarChart2,     title: "AIレポート自動生成",      description: "CSV・データを貼るだけで経営報告書・週報を自動作成",    badge: "人気No.1", color: "#7c6dfa" },
  { href: "/summarize", icon: FileText,      title: "文章要約",                description: "長い文章を3行・箇条書きに瞬時に要約",                    color: "#06b6d4" },
  { href: "/translate", icon: Languages,     title: "多言語翻訳",              description: "日→英・ポルトガル語・ベトナム語など10言語対応",           color: "#10b981" },
  { href: "/chat",      icon: MessageSquare, title: "AIチャット",              description: "何でも聞けるAIアシスタント（日本語対応）",                color: "#f59e0b" },
  { href: "/idea",      icon: Lightbulb,     title: "アイデア出し",            description: "テーマを入力するだけで企画・キャッチコピーを生成",        color: "#ec4899" },
  { href: "/writing",   icon: PenLine,       title: "文章リライト・校正",      description: "ビジネス文書・メールを自然な日本語に整える",              color: "#8b5cf6" },
  { href: "/email",     icon: Mail,          title: "メール文面作成",          description: "状況を入力するだけでプロのメール文面を自動生成",          color: "#f97316" },
  { href: "/seo",       icon: Search,        title: "SEOタイトル・見出し生成", description: "キーワードから検索上位を狙えるタイトルを自動生成",        color: "#14b8a6" },
];

export default function Home() {
  return (
    <div className="grid-bg" style={{ minHeight: "100vh" }}>
      <Nav />
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 1.5rem 3rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(124,109,250,0.15)", border: "1px solid rgba(124,109,250,0.3)", borderRadius: 99, padding: "4px 14px", fontSize: 13, color: "var(--accent2)", marginBottom: "1.5rem" }}>
          <Sparkles size={13} />
          完全無料・登録不要でAIが使えます
        </div>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 1rem", letterSpacing: "-0.02em" }}>
          仕事が10倍速くなる<br />
          <span style={{ color: "var(--accent2)" }}>AIツール集</span>
        </h1>
        <p style={{ fontSize: 18, color: "var(--muted)", maxWidth: 500, margin: "0 auto 2rem" }}>
          レポート生成・翻訳・文章作成など、日々の業務に使える無料AIツールを一カ所に。
        </p>
        <a href="#tools" style={{ background: "var(--accent)", color: "#fff", padding: "12px 28px", borderRadius: 10, fontSize: 16, textDecoration: "none", fontWeight: 700, display: "inline-block" }}>
          ツールを使ってみる →
        </a>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
        <AdBanner size="leaderboard" />
      </div>

      <section id="tools" style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: "1.5rem" }}>
          無料AIツール一覧
          <span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 400, marginLeft: 12 }}>全{tools.length}種類</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {tools.map(t => <ToolCard key={t.href} {...t} />)}
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
        <AdBanner size="leaderboard" />
      </div>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem 5rem", textAlign: "center" }}>
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 16, padding: "3rem 2rem" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: "0.75rem" }}>AIレポート生成を試す</h2>
          <p style={{ color: "var(--muted)", marginBottom: "1.5rem", fontSize: 16 }}>CSVや売上データを貼るだけで、経営報告書・週次レポートを自動作成</p>
          <a href="/report" style={{ background: "var(--accent)", color: "#fff", padding: "12px 32px", borderRadius: 10, fontSize: 16, textDecoration: "none", fontWeight: 700 }}>
            無料で試す →
          </a>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "1.5rem", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
        © 2025 AIツール集 — 無料で使えるAIツールサービス
      </footer>
    </div>
  );
}
