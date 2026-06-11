import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://work-ai-hub.com"),
  title: {
    default: "Work AI Hub | 無料で使えるAIツール",
    template: "%s | Work AI Hub",
  },
  description: "無料で使えるAIツール集。レポート自動生成、文章要約、翻訳、アイデア出しなど多数のAIツールを提供。",
  applicationName: "Work AI Hub",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Work AI Hub",
    title: "Work AI Hub | 無料で使えるAIツール",
    description: "無料で使えるAIツール集。レポート自動生成、文章要約、翻訳、アイデア出しなど多数のAIツールを提供。",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work AI Hub | 無料で使えるAIツール",
    description: "無料で使えるAIツール集。レポート自動生成、文章要約、翻訳、アイデア出しなど多数のAIツールを提供。",
  },
  verification: {
    google: "google60ae625e75b13fa0",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6008746783658658"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
