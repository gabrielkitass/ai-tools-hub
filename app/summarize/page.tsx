"use client";
import { useState } from "react";
import Nav from "../components/Nav";
import AdBanner from "../components/AdBanner";
import ToolMeta from "../components/ToolMeta";
import Footer from "../components/Footer";
import PrivacyWarning from "../components/PrivacyWarning";
import IconSummarize from "../components/icons/IconSummarize";
import { recordToolUse } from "../lib/userData";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [style, setStyle] = useState("bullets");

  async function run() {
    if (!input.trim()) return;
    setLoading(true); setResult("");
    try {
      const res = await fetch("/api/ai-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "summarize", input, options: { style } }),
      });
      const json = await res.json();
      setResult(json.result || json.error || "エラーが発生しました");
      if (json.result) recordToolUse("/summarize", "文章要約");
    } catch {
      setResult("通信エラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Nav />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#06b6d422", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconSummarize size={24} style={{ color: "#06b6d4" }} />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>文章要約</h1>
        </div>
        <p style={{ fontSize: 12, color: "var(--muted)", margin: "-1.25rem 0 1.5rem" }}>
          登録不要・基本無料 | 入力データは保存されません | Claude AI搭載
        </p>
        <ToolMeta href="/summarize" color="#06b6d4" />
        <AdBanner size="banner" />
        <PrivacyWarning />
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", marginTop: "1.5rem" }}>
          
      <div style={{marginBottom:8}}>
        <label style={{fontSize:13,color:"var(--muted)",display:"block",marginBottom:6}}>出力形式</label>
        <div style={{display:"flex",gap:8}}>
          {["bullets","short"].map(s => (
            <button key={s} onClick={() => setStyle(s)}
              style={{padding:"6px 16px",borderRadius:8,fontSize:13,cursor:"pointer",
                background: style===s ? "var(--accent)" : "var(--bg3)",
                color: style===s ? "#fff" : "var(--muted)",
                border: "1px solid var(--border)"}}>
              {s==="bullets" ? "箇条書き5点" : "3行まとめ"}
            </button>
          ))}
        </div>
      </div>
          <textarea
            value={input} onChange={e => setInput(e.target.value)}
            placeholder="要約したい文章を入力してください..." rows={7}
            style={{ width: "100%", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: 12, color: "var(--text)", fontSize: 14, resize: "vertical" }}
          />
          <button onClick={run} disabled={loading || !input.trim()}
            style={{ width: "100%", background: input.trim() && !loading ? "#06b6d4" : "#333", color: "#fff", border: "none", borderRadius: 10, padding: 14, fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
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
