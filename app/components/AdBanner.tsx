"use client";

type AdBannerProps = {
  slot?: string;
  size?: "leaderboard" | "rectangle" | "banner";
};

// AdSense未設定のため非表示。設定後にここへ <ins> タグを差し込む
export default function AdBanner({}: AdBannerProps) {
  return null;
}
