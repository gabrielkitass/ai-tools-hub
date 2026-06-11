"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const KEY = "aih_privacy_warn_hidden";

export default function PrivacyWarning() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(localStorage.getItem(KEY) === "1");
  }, []);

  if (hidden) return null;

  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      background: "#f59e0b10", border: "1px solid #f59e0b40",
      color: "#f59e0b", fontSize: 13, borderRadius: 8,
      padding: "10px 14px", marginTop: "1.5rem", lineHeight: 1.6,
    }}>
      <span style={{ flex: 1 }}>
        ⚠️ 機密情報・個人情報・社外秘データは入力しないでください。入力内容はAI処理のため外部サーバーに送信されます。
      </span>
      <button
        onClick={() => { localStorage.setItem(KEY, "1"); setHidden(true); }}
        aria-label="閉じる"
        style={{ background: "transparent", border: "none", color: "#f59e0b", cursor: "pointer", display: "flex", padding: 0, flexShrink: 0 }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
