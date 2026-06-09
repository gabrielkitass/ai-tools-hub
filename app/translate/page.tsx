"use client";
import { useState } from "react";
import Nav from "../components/Nav";
import AdBanner from "../components/AdBanner";
import { Languages, Loader2 } from "lucide-react";

export default function Page() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [lang, setLang] = useState("英語");

  async function run() {
    if (!input.trim()) return;
    setLoading(true); setResult("");
    const res = await fetch("/api/ai-tool", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool: "translate", input, options: { lang } }),
    });
    const json = await res.json();
    setResult(json.result || "エラーが発生しました");
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Nav />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#10b98122", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Languages size={24} color="#10b981" />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>多言語翻訳</h1>
        </div>
        <AdBanner size="banner" />
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", marginTop: "1.5rem" }}>
          
      <div style={{marginBottom:8}}>
        <label style={{fontSize:13,color:"var(--muted)",display:"block",marginBottom:6}}>翻訳先言語</label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {["英語","ポルトガル語","ベトナム語","中国語","韓国語"].map(l => (
            <button key={l} onClick={() => setLang(l)}
              style={{padding:"6px 14px",borderRadius:8,fontSize:13,cursor:"pointer",
                background: lang===l ? "var(--accent)" : "var(--bg3)",
                color: lang===l ? "#fff" : "var(--muted)",
                border: "1px solid var(--border)"}}>
              {l}
            </button>
          ))}
        </div>
      </div>
          <textarea
            value={input} onChange={e => setInput(e.target.value)}
            placeholder="翻訳したいテキストを入力してください..." rows={7}
            style={{ width: "100%", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: 12, color: "var(--text)", fontSize: 14, resize: "vertical" }}
          />
          <button onClick={run} disabled={loading || !input.trim()}
            style={{ width: "100%", background: input.trim() && !loading ? "#10b981" : "#333", color: "#fff", border: "none", borderRadius: 10, padding: 14, fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
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
    </div>
  );
}
