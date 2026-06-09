"use client";

type AdBannerProps = {
  slot?: string;
  size?: "leaderboard" | "rectangle" | "banner";
};

export default function AdBanner({ size = "leaderboard" }: AdBannerProps) {
  const dims = {
    leaderboard: { width: "100%", height: 90, label: "広告 728×90" },
    rectangle:   { width: 300,    height: 250, label: "広告 300×250" },
    banner:      { width: "100%", height: 60,  label: "広告 468×60" },
  }[size];

  return (
    <div style={{
      width: dims.width, height: dims.height,
      background: "var(--bg2)", border: "1px dashed var(--border)",
      borderRadius: 8, display: "flex", alignItems: "center",
      justifyContent: "center", color: "var(--muted)", fontSize: 12,
      margin: "1rem auto",
    }}>
      {/* Google AdSense: <script> タグをここに差し込む */}
      {dims.label}（AdSense設定後に広告が表示されます）
    </div>
  );
}
