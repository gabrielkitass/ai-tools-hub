"use client";
import { useState } from "react";
import Nav from "../components/Nav";
import AdBanner from "../components/AdBanner";
import ToolMeta from "../components/ToolMeta";
import Footer from "../components/Footer";
import PrivacyWarning from "../components/PrivacyWarning";
import IconSeo from "../components/icons/IconSeo";
import { recordToolUse } from "../lib/userData";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  

  async function run() {
    if (!input.trim()) return;
    setLoading(true); setResult("");
    const res = await fetch("/api/ai-tool", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool: "seo", input, options: {} }),
    });
    const json = await res.json();
    setResult(json.result || "エラーが発生しました");
    if (json.result) recordToolUse("/seo", "SEOタイトル・見出し生成");
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Nav />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#14b8a622", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconSeo size={24} style={{ color: "#14b8a6" }} />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>SEOタイトル・見出し生成</h1>
        </div>
        <p style={{ fontSize: 12, color: "var(--muted)", margin: "-1.25rem 0 1.5rem" }}>
          登録不要・完全無料 | 入力データは保存されません | Claude AI搭載
        </p>
        <ToolMeta href="/seo" color="#14b8a6" />
        <AdBanner size="banner" />
        <PrivacyWarning />
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", marginTop: "1.5rem" }}>
          
          <textarea
            value={input} onChange={e => setInput(e.target.value)}
            placeholder="メインキーワードを入力してください..." rows={7}
            style={{ width: "100%", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: 12, color: "var(--text)", fontSize: 14, resize: "vertical" }}
          />
          <button onClick={run} disabled={loading || !input.trim()}
            style={{ width: "100%", background: input.trim() && !loading ? "#14b8a6" : "#333", color: "#fff", border: "none", borderRadius: 10, padding: 14, fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />処理中...</> : "実行する →"}
          </button>
        </div>
        {result && (
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", marginTop: "1.5rem", whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
            <AdBanner size="banner" />
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: "1rem", marginTop: "1rem" }}>結果</h2>
            {result}
          </div>
        )}
        <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
      </div>
      <Footer />
    </div>
  );
}
