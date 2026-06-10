"use client";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import AdBanner from "../components/AdBanner";
import ToolMeta from "../components/ToolMeta";
import Footer from "../components/Footer";
import UpgradeModal from "../components/UpgradeModal";
import { useUserData, canUseReport, incrementReportCount, recordToolUse, getReportCount, getReportLimit, setPremium } from "../lib/userData";
import { BarChart2, Download, Loader2, ChevronDown } from "lucide-react";

const REPORT_TYPES = [
  { value: "weekly",  label: "週次レポート",        desc: "先週のデータを週次サマリーに" },
  { value: "monthly", label: "月次経営レポート",    desc: "経営層向けの月次まとめ" },
  { value: "custom",  label: "フリーフォーマット",  desc: "AIが最適な形式を判断" },
];

const SAMPLES = [
  { label: "売上データ（例）", value: `売上: 1,250万円（先月比+12%）\n新規顧客: 23社\n解約: 2社\n広告費: 80万円\nCAC: 3.5万円\nLTV: 42万円` },
  { label: "KPIデータ（例）", value: `訪問者数: 45,230\nCVR: 2.3%\nCV数: 1,040\n売上: 520万円\n目標達成率: 87%\n前月比: +5.2%` },
];

function renderTables(text: string) {
  const lines = text.split("\n");
  const out: string[] = [];
  let i = 0;
  const isRow = (l: string) => /^\s*\|.*\|\s*$/.test(l);
  const isSep = (l: string) => /^\s*\|?[\s:\-|]+\|?\s*$/.test(l) && l.includes("-");
  const cells = (l: string) =>
    l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => c.trim());

  while (i < lines.length) {
    if (isRow(lines[i]) && i + 1 < lines.length && isSep(lines[i + 1])) {
      const head = cells(lines[i]);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isRow(lines[i])) { rows.push(cells(lines[i])); i++; }
      const th = head.map(h => `<th style="text-align:left;padding:8px 12px;border-bottom:1px solid #2a2a3d;color:#a78bfa;font-weight:600;font-size:13px">${h}</th>`).join("");
      const body = rows.map(r =>
        `<tr>${r.map(c => `<td style="padding:8px 12px;border-bottom:1px solid #1f1f2e;color:#c4c3e0;font-size:14px">${c}</td>`).join("")}</tr>`
      ).join("");
      out.push(`<table style="width:100%;border-collapse:collapse;margin:0.75rem 0;background:#15151f;border:1px solid #2a2a3d;border-radius:8px;overflow:hidden"><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table>`);
    } else {
      out.push(lines[i]); i++;
    }
  }
  return out.join("\n");
}

function parseMarkdown(text: string) {
  return renderTables(text)
    .replace(/^## (.+)$/gm, '<h2 style="font-size:22px;font-weight:700;margin:1.5rem 0 0.75rem;color:#f0eeff">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:16px;font-weight:600;margin:1.25rem 0 0.5rem;color:#a78bfa">$1</h3>')
    .replace(/^\*\*(.+)\*\*$/gm, '<strong>$1</strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li style="margin:4px 0;color:#c4c3e0">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, (m) => `<ul style="padding-left:1.25rem;margin:0.5rem 0">${m}</ul>`)
    .replace(/(<\/table>)\n+/g, "$1")
    .replace(/\n*(<table)/g, "$1")
    .replace(/\n\n/g, '<br/><br/>');
}

export default function ReportPage() {
  const [data, setData] = useState("");
  const [reportType, setReportType] = useState("weekly");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [error, setError] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("premium") === "success") {
      setPremium(true);
      window.history.replaceState(null, "", "/report");
    }
  }, []);

  async function generate() {
    if (!data.trim()) return;
    if (!canUseReport()) { setShowUpgrade(true); return; }
    setLoading(true); setError(""); setReport("");
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, reportType, companyName }),
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setReport(json.report);
      incrementReportCount();
      recordToolUse("/report", "AIレポート自動生成");
    } catch (e) {
      setError("生成に失敗しました。もう一度お試しください。");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function downloadReport() {
    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "report.md"; a.click();
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Nav />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2.5rem 1.5rem" }}>

        {/* ページヘッダー */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(124,109,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BarChart2 size={24} color="var(--accent)" />
          </div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>AIレポート自動生成</h1>
            <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>データを貼るだけでプロ品質のレポートを作成</p>
          </div>
        </div>

        <ToolMeta href="/report" color="#7c6dfa" />

        <AdBanner size="banner" />

        {/* 入力フォーム */}
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", marginTop: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {/* レポート種別 */}
            <div>
              <label style={{ fontSize: 13, color: "var(--muted)", display: "block", marginBottom: 6 }}>レポート種別</label>
              <div style={{ position: "relative" }}>
                <select
                  value={reportType}
                  onChange={e => setReportType(e.target.value)}
                  style={{ width: "100%", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 36px 10px 12px", color: "var(--text)", fontSize: 14, appearance: "none", cursor: "pointer" }}
                >
                  {REPORT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <ChevronDown size={16} color="var(--muted)" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                {REPORT_TYPES.find(t => t.value === reportType)?.desc}
              </p>
            </div>
            {/* 会社名 */}
            <div>
              <label style={{ fontSize: 13, color: "var(--muted)", display: "block", marginBottom: 6 }}>会社名（任意）</label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="株式会社〇〇"
                style={{ width: "100%", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px", color: "var(--text)", fontSize: 14 }}
              />
            </div>
          </div>

          {/* サンプルデータ */}
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 13, color: "var(--muted)", display: "block", marginBottom: 6 }}>データを入力（テキスト・CSV・数字何でもOK）</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              {SAMPLES.map(s => (
                <button key={s.label} onClick={() => setData(s.value)}
                  style={{ fontSize: 12, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 12px", color: "var(--muted)", cursor: "pointer" }}>
                  {s.label}
                </button>
              ))}
            </div>
            <textarea
              value={data}
              onChange={e => setData(e.target.value)}
              placeholder={"例：\n売上: 1,250万円（先月比+12%）\n新規顧客: 23社\n広告費: 80万円"}
              rows={8}
              style={{ width: "100%", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "12px", color: "var(--text)", fontSize: 14, resize: "vertical", fontFamily: "monospace" }}
            />
          </div>

          <button
            onClick={generate}
            disabled={loading || !data.trim()}
            style={{ width: "100%", background: data.trim() && !loading ? "var(--accent)" : "#333", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 16, fontWeight: 700, cursor: data.trim() && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            {loading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />生成中...</> : "レポートを生成する →"}
          </button>
          <FreeQuota />
        </div>

        {/* エラー */}
        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "1rem", marginTop: "1rem", color: "#fca5a5" }}>
            {error}
          </div>
        )}

        {/* 生成結果 */}
        {report && (
          <div style={{ marginTop: "1.5rem" }}>
            <AdBanner size="banner" />
            <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", marginTop: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>生成されたレポート</h2>
                <button onClick={downloadReport}
                  style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 14px", color: "var(--text)", cursor: "pointer", fontSize: 13 }}>
                  <Download size={14} />ダウンロード
                </button>
              </div>
              <div
                style={{ lineHeight: 1.8, fontSize: 15 }}
                dangerouslySetInnerHTML={{ __html: parseMarkdown(report) }}
              />
            </div>
          </div>
        )}

        <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
      </div>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
      <Footer />
    </div>
  );
}

function FreeQuota() {
  const { mounted } = useUserData();
  if (!mounted) return null;
  const used = getReportCount();
  const limit = getReportLimit();
  const left = Math.max(0, limit - used);
  return (
    <p style={{ fontSize: 12, color: left === 0 ? "#fca5a5" : "var(--muted)", textAlign: "center", marginTop: 10 }}>
      {left > 0
        ? <>今月の無料生成 残り <strong style={{ color: "var(--text)" }}>{left}</strong> / {limit} 回</>
        : <>今月の無料枠を使い切りました（来月リセット）</>}
    </p>
  );
}
