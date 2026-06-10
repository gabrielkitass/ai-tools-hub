"use client";
import { useState } from "react";
import { X, Crown, Check, Loader2 } from "lucide-react";
import { getReportLimit } from "../lib/userData";

export default function UpgradeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function startCheckout() {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
      } else {
        setError(json.error || "決済の開始に失敗しました");
        setLoading(false);
      }
    } catch {
      setError("通信エラーが発生しました");
      setLoading(false);
    }
  }

  const perks = [
    "レポート生成 無制限",
    "全AIツールの利用制限なし",
    "優先処理で高速生成",
    "広告非表示",
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(5,5,10,0.7)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative", width: "100%", maxWidth: 420,
          background: "var(--bg2)", border: "1px solid rgba(124,109,250,0.4)",
          borderRadius: 18, padding: "2rem", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div className="glow-blob" style={{ width: 300, height: 160, background: "var(--accent)", top: -60, left: "50%", transform: "translateX(-50%)", opacity: 0.18 }} />

        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14, background: "var(--bg3)",
            border: "1px solid var(--border)", borderRadius: 8, padding: 6,
            cursor: "pointer", color: "var(--muted)", display: "flex",
          }}
        >
          <X size={16} />
        </button>

        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, margin: "0 auto 1rem",
            background: "linear-gradient(135deg, var(--accent), #c084fc)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 24px rgba(124,109,250,0.4)",
          }}>
            <Crown size={28} color="#fff" />
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 0.5rem", letterSpacing: "-0.02em" }}>
            今月の無料枠を使い切りました
          </h2>
          <p style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 1.5rem", lineHeight: 1.7 }}>
            無料プランは月{getReportLimit()}回までレポートを生成できます。<br />
            プレミアムなら無制限でご利用いただけます。
          </p>

          <div style={{
            background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 12,
            padding: "1.25rem", marginBottom: "1.5rem", textAlign: "left",
          }}>
            {perks.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < perks.length - 1 ? 10 : 0 }}>
                <span style={{
                  width: 20, height: 20, borderRadius: 99, background: "rgba(16,185,129,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Check size={13} color="#10b981" />
                </span>
                <span style={{ fontSize: 14, color: "var(--text)" }}>{p}</span>
              </div>
            ))}
          </div>

          <button
            onClick={startCheckout}
            disabled={loading}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "linear-gradient(135deg, var(--accent), #9f7aea)", color: "#fff",
              padding: "14px", borderRadius: 11, fontSize: 16, fontWeight: 700, border: "none",
              cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 24px rgba(124,109,250,0.4)",
            }}
          >
            {loading
              ? <><Loader2 size={17} style={{ animation: "spin 1s linear infinite" }} />処理中...</>
              : <><Crown size={17} />プレミアムにアップグレード</>}
          </button>
          {error && (
            <p style={{ fontSize: 12, color: "#fca5a5", margin: "0.75rem 0 0" }}>{error}</p>
          )}
          <p style={{ fontSize: 12, color: "var(--muted)", margin: "0.85rem 0 0" }}>
            月額980円（税込）・ いつでも解約可能
          </p>
        </div>
      </div>
    </div>
  );
}
