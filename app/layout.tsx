import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIツール集 | 無料で使えるAIツール",
  description: "無料で使えるAIツール集。レポート自動生成、文章要約、翻訳、アイデア出しなど多数のAIツールを提供。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
