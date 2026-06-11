"use client";
import Nav from "./components/Nav";
import ToolCard from "./components/ToolCard";
import SocialProof from "./components/SocialProof";
import RecentTools from "./components/RecentTools";
import { TOOLS } from "./lib/tools";
import { Sparkles, Zap, Shield, ArrowRight } from "lucide-react";

const tools = TOOLS;

const stats = [
  { value: "8種類", label: "AIツール" },
  { value: "基本無料", label: "登録不要" },
  { value: "Claude", label: "AI搭載" },
  { value: "日本語", label: "完全対応" },
];

export default function Home() {
  return (
    <div className="grid-bg" style={{ minHeight: "100vh" }}>
      <Nav />

      {/* Hero */}
      <section className="hero-section" style={{ maxWidth: 1100, margin: "0 auto", padding: "6rem 1.5rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Glow blobs */}
        <div className="glow-blob" style={{ width: 600, height: 600, background: "var(--accent)", top: -200, left: "50%", transform: "translateX(-50%)", opacity: 0.12 }} />
        <div className="glow-blob" style={{ width: 300, height: 300, background: "#ec4899", top: 50, left: "10%", opacity: 0.08 }} />
        <div className="glow-blob" style={{ width: 300, height: 300, background: "#06b6d4", top: 50, right: "10%", opacity: 0.08 }} />

        <div style={{ position: "relative" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(124,109,250,0.12)",
            border: "1px solid rgba(124,109,250,0.35)",
            borderRadius: 99,
            padding: "5px 16px",
            fontSize: 13,
            color: "var(--accent2)",
            marginBottom: "1.75rem",
            fontWeight: 600,
          }}>
            <Sparkles size={13} />
            基本無料 · 登録不要 · 今すぐ使える
          </div>

          {/* Differentiation badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: "1.75rem" }}>
            {["🔒 入力データは保存されません", "⚡ Claude AI搭載", "🇯🇵 日本語完全対応", "🏢 業種問わず使える"].map(b => (
              <span key={b} style={{
                fontSize: 12, color: "var(--text-2)",
                background: "var(--bg2)", border: "1px solid var(--border)",
                borderRadius: 99, padding: "5px 14px", fontWeight: 500,
              }}>
                {b}
              </span>
            ))}
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: "var(--fs-hero)",
            fontWeight: "var(--fw-black)" as React.CSSProperties["fontWeight"],
            lineHeight: "var(--lh-tight)",
            margin: "0 0 1.25rem",
            letterSpacing: "var(--ls-hero)",
          }}>
            仕事が10倍速くなる
            <br />
            <span className="gradient-text">AIツール集</span>
          </h1>

          <p style={{ fontSize: 18, color: "var(--muted)", maxWidth: 520, margin: "0 auto 2rem", lineHeight: 1.7 }}>
            レポート生成・翻訳・文章作成など、<br />
            日々の業務に使える無料AIツールを一カ所に。
          </p>

          <SocialProof />


          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: "3.5rem" }}>
            <a href="#tools" style={{
              background: "var(--gradient-brand)",
              color: "#fff",
              padding: "13px 28px",
              borderRadius: 11,
              fontSize: 16,
              textDecoration: "none",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 24px rgba(124,109,250,0.4)",
              letterSpacing: "-0.01em",
            }}>
              <Zap size={16} />
              ツールを使ってみる
            </a>
            <a href="/report" style={{
              background: "rgba(124,109,250,0.1)",
              color: "var(--accent2)",
              padding: "13px 28px",
              borderRadius: 11,
              fontSize: 16,
              textDecoration: "none",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(124,109,250,0.25)",
              letterSpacing: "-0.01em",
            }}>
              レポート生成を試す <ArrowRight size={15} />
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{
            display: "inline-flex",
            gap: 0,
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            overflow: "hidden",
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: "14px 28px",
                borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
                textAlign: "center",
              }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: "var(--text)", letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.75rem" }}>
          <div style={{ width: 4, height: 24, borderRadius: 2, background: "linear-gradient(180deg, var(--accent), #c084fc)" }} />
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
            無料AIツール一覧
          </h2>
          <span style={{
            fontSize: 12,
            color: "var(--muted)",
            background: "var(--bg3)",
            border: "1px solid var(--border)",
            padding: "2px 10px",
            borderRadius: 99,
            fontWeight: 600,
          }}>
            全{tools.length}種類
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 14 }}>
          {tools.map(t => <ToolCard key={t.href} {...t} />)}
        </div>
      </section>

      {/* Recent tools */}
      <RecentTools />

      {/* Features */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 14,
        }}>
          {[
            { icon: Zap, color: "#f59e0b", title: "即座に結果が出る", desc: "入力後わずか数秒でAIが回答。業務の待ち時間をゼロに。" },
            { icon: Shield, color: "#10b981", title: "登録不要・基本無料", desc: "アカウント作成なしで今すぐ使える。クレジットカード不要。" },
            { icon: Sparkles, color: "#7c6dfa", title: "最新AI Claude搭載", desc: "Anthropic社の最新モデルで高精度な日本語出力を実現。" },
          ].map((f, i) => (
            <div key={i} style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "1.5rem",
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: `${f.color}18`,
                border: `1px solid ${f.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <f.icon size={20} color={f.color} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 5px", letterSpacing: "-0.01em" }}>{f.title}</p>
                <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(124,109,250,0.15) 0%, rgba(192,132,252,0.1) 100%)",
          border: "1px solid rgba(124,109,250,0.3)",
          borderRadius: 20,
          padding: "3rem 2.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div className="glow-blob" style={{ width: 400, height: 200, background: "var(--accent)", top: -50, left: "50%", transform: "translateX(-50%)", opacity: 0.15 }} />
          <div style={{ position: "relative" }}>
            <p style={{ fontSize: 13, color: "var(--accent2)", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              人気No.1ツール
            </p>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
              AIレポート生成を試す
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: "2rem", fontSize: 16, maxWidth: 480, margin: "0 auto 2rem", lineHeight: 1.7 }}>
              CSVや売上データを貼るだけで、<br />経営報告書・週次レポートを自動作成
            </p>
            <a href="/report" style={{
              background: "var(--gradient-brand)",
              color: "#fff",
              padding: "13px 32px",
              borderRadius: 11,
              fontSize: 16,
              textDecoration: "none",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 24px rgba(124,109,250,0.4)",
            }}>
              無料で試す <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: "2.5rem" }}>
            {["🔒 データ非保存", "✅ 基本無料", "🤖 Claude AI", "📱 スマホ対応", "🇯🇵 日本語対応"].map(b => (
              <span key={b} style={{
                fontSize: 12, color: "var(--muted)",
                border: "1px solid var(--border)", borderRadius: 99, padding: "4px 12px",
              }}>
                {b}
              </span>
            ))}
          </div>
          <div className="footer-cols" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: "2.5rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.75rem" }}>
                <div style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, var(--accent), #c084fc)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Sparkles size={14} color="#fff" />
                </div>
                <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>AIツール集</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, maxWidth: 280, margin: 0 }}>
                中小企業・製造業の経営者・管理職向けに、実務で使える無料AIツールを提供しています。
              </p>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem", letterSpacing: "0.03em" }}>ツール</p>
              {[
                ["レポート生成", "/report"],
                ["文章要約", "/summarize"],
                ["多言語翻訳", "/translate"],
                ["AIチャット", "/chat"],
              ].map(([label, href]) => (
                <a key={href} href={href} style={{ display: "block", fontSize: 13, color: "var(--muted)", textDecoration: "none", marginBottom: "0.5rem" }}>
                  {label}
                </a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem", letterSpacing: "0.03em" }}>コンテンツ</p>
              {[
                ["活用ガイド", "/blog"],
                ["アイデア出し", "/idea"],
                ["文章リライト", "/writing"],
                ["SEOツール", "/seo"],
              ].map(([label, href]) => (
                <a key={href} href={href} style={{ display: "block", fontSize: 13, color: "var(--muted)", textDecoration: "none", marginBottom: "0.5rem" }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>© 2025 AIツール集 — 無料で使えるAIツールサービス</p>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <a href="/privacy" style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>プライバシーポリシー</a>
              <a href="/terms" style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>利用規約</a>
              <p style={{ fontSize: 12, color: "var(--border)", margin: 0 }}>Powered by Claude AI</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
